-- ==============================================================================
-- FINAL MIGRATION: SECURITY & RLS (SEGURIDAD A NIVEL DE FILA)
-- Descripción: Implementación completa de seguridad 'cero confianza' (Zero Trust).
-- ==============================================================================

-- 1. DESHABILITAR RLS TEMPORALMENTE (Para evitar bloqueos durante la migración)
ALTER TABLE companies DISABLE ROW LEVEL SECURITY;
ALTER TABLE company_members DISABLE ROW LEVEL SECURITY;
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE invoices DISABLE ROW LEVEL SECURITY;
ALTER TABLE user_payment_methods DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS transactions DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS time_entries DISABLE ROW LEVEL SECURITY;

-- 2. LIMPIEZA TOTAL DE POLÍTICAS (Eliminar basura anterior)
DO $$ 
DECLARE 
    r RECORD;
BEGIN 
    FOR r IN (SELECT policyname, tablename FROM pg_policies WHERE schemaname = 'public') LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON ' || r.tablename;
    END LOOP;
END $$;


-- 3. FUNCIONES DE SISTEMA (SECURITY DEFINER)
-- Estas funciones se ejecutan con permisos de "superusuario" para evitar
-- el problema de "recursión infinita" de RLS cuando tablas se consultan entre sí.

-- A) Verificar si SOY MIEMBRO de una empresa (Lectura segura de company_members)
CREATE OR REPLACE FUNCTION is_member_of(check_company_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM company_members 
    WHERE company_id = check_company_id AND user_id = auth.uid()
  );
$$;

-- B) Verificar si SOY DUEÑO de una empresa (Lectura segura de companies)
CREATE OR REPLACE FUNCTION is_owner_of(check_company_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM companies 
    WHERE id = check_company_id AND owner_id = auth.uid()
  );
$$;


-- 4. HABILITAR RLS (ACTIVAR EL "CANDADO")
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_payment_methods ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS time_entries ENABLE ROW LEVEL SECURITY;


-- 5. APLICAR NUEVAS POLÍTICAS DE SEGURIDAD (Reglas de acceso)

-- === A. TABLA COMPANIES ===
-- Regla 1: Los Dueños pueden hacer TODO (Ver, Editar, Borrar)
CREATE POLICY "Owners Full Access" ON companies
FOR ALL USING (owner_id = auth.uid());

-- Regla 2: Los Miembros solo pueden VER (Select)
CREATE POLICY "Members View Only" ON companies
FOR SELECT USING (is_member_of(id));

-- Regla 3: Permitir crear empresas (Insert) a cualquier usuario autenticado
CREATE POLICY "Auth Users Create Companies" ON companies
FOR INSERT WITH CHECK (auth.role() = 'authenticated'); -- El owner_id se asigna al crear


-- === B. TABLA COMPANY_MEMBERS ===
-- Regla 1: Los Dueños de la empresa pueden GESTIONAR miembros (Ver, Añadir, Borrar)
CREATE POLICY "Owners Manage Members" ON company_members
FOR ALL USING (is_owner_of(company_id));

-- Regla 2: Un usuario puede VER su propia membresía
CREATE POLICY "Users View Own Membership" ON company_members
FOR SELECT USING (user_id = auth.uid());


-- === C. TABLA PROFILES ===
-- Regla 1: Cada usuario tiene control total de SU perfil (y solo el suyo)
CREATE POLICY "Users Manage Own Profile" ON profiles
FOR ALL USING (id = auth.uid());


-- === D. TABLA INVOICES (Facturas) ===
-- Regla 1: Ver y gestionar solo mis propias facturas (o las que creé)
CREATE POLICY "Manage Own Invoices" ON invoices
FOR ALL USING (user_id = auth.uid());

-- Opcional: Si los miembros deben ver facturas de la empresa, descomentar:
-- CREATE POLICY "Members View Company Invoices" ON invoices
-- FOR SELECT USING (company_id IS NOT NULL AND is_member_of(company_id));


-- === E. TABLA TRANSACTIONS (Movimientos) ===
-- Si existe, aplicar regla de propiedad básica
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'transactions') THEN
        EXECUTE 'CREATE POLICY "Manage Own Transactions" ON transactions FOR ALL USING (user_id = auth.uid())';
    END IF;
END $$;


-- === F. TABLA PAYMENT METHODS ===
CREATE POLICY "Manage Own Payment Methods" ON user_payment_methods
FOR ALL USING (user_id = auth.uid());


-- ==============================================
-- FIX: SEGURIDAD TOTAL (RLS EN TODAS LAS TABLAS)
-- ==============================================

-- 1. Reset Total: Deshabilitar temporalmente
ALTER TABLE companies DISABLE ROW LEVEL SECURITY;
ALTER TABLE company_members DISABLE ROW LEVEL SECURITY;
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE invoices DISABLE ROW LEVEL SECURITY;
ALTER TABLE user_payment_methods DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS transactions DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS time_entries DISABLE ROW LEVEL SECURITY;

-- 2. Limpieza de Políticas Antiguas (Todas)
DO $$ 
DECLARE 
    r RECORD;
BEGIN 
    FOR r IN (SELECT policyname, tablename FROM pg_policies WHERE schemaname = 'public') LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON ' || r.tablename;
    END LOOP;
END $$;


-- 3. Crear Funciones de Sistema "Bypass" (Security Definer)
-- Estas son necesarias para evitar la recursión infinita en consultas complejas

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

-- 4. Habilitar RLS en TODO
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_payment_methods ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS time_entries ENABLE ROW LEVEL SECURITY;


-- 5. Aplicar Políticas Finales

-- A) COMPANIES
CREATE POLICY "Access Companies" ON companies
FOR ALL USING (
  owner_id = auth.uid() OR is_member_of(id)
);

-- B) MEMBERS
CREATE POLICY "Access Members" ON company_members
FOR ALL USING (
  user_id = auth.uid() OR is_owner_of(company_id)
);

-- C) PROFILES
CREATE POLICY "Access Own Profile" ON profiles
FOR ALL USING (id = auth.uid());

-- D) INVOICES
CREATE POLICY "Access Own Invoices" ON invoices
FOR ALL USING (user_id = auth.uid());

-- E) PAYMENT METHODS
CREATE POLICY "Access Own Payment Methods" ON user_payment_methods
FOR ALL USING (user_id = auth.uid());

-- F) TRANSACTIONS (Si existe, bloquear o permitir solo al dueño)
-- Asumimos que tiene user_id. Si no tiene, esto fallará, así que lo envolvemos.
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'transactions') THEN
        EXECUTE 'CREATE POLICY "Access Own Transactions" ON transactions FOR ALL USING (user_id = auth.uid())';
    END IF;
END $$;

-- G) TIME ENTRIES (Si existe)
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'time_entries') THEN
        EXECUTE 'CREATE POLICY "Access Own Time Entries" ON time_entries FOR ALL USING (user_id = auth.uid())';
    END IF;
END $$;

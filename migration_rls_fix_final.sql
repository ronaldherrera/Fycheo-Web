-- ==============================================
-- FIX: RLS FINAL (Funciones Definer Duales)
-- ==============================================

-- 1. Reset Total: Deshabilitar temporalmente para limpiar
ALTER TABLE companies DISABLE ROW LEVEL SECURITY;
ALTER TABLE company_members DISABLE ROW LEVEL SECURITY;
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;

-- 2. Limpieza de Políticas Antiguas
DROP POLICY IF EXISTS "Users can see own profile" ON profiles;
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON profiles;
DROP POLICY IF EXISTS "Ver perfiles propios y de compañeros" ON profiles;
DROP POLICY IF EXISTS "Editar propio perfil" ON profiles;
DROP POLICY IF EXISTS "Acceso a perfiles" ON profiles;

DROP POLICY IF EXISTS "Owners can view and edit their companies" ON companies;
DROP POLICY IF EXISTS "Members can view their companies" ON companies;
DROP POLICY IF EXISTS "Dueños gestionan empresas" ON companies;
DROP POLICY IF EXISTS "Miembros ven empresas" ON companies;
DROP POLICY IF EXISTS "Dueños ven sus empresas" ON companies;
DROP POLICY IF EXISTS "Miembros leen empresas" ON companies;
DROP POLICY IF EXISTS "Acces Companies" ON companies;

DROP POLICY IF EXISTS "View members of my companies" ON company_members;
DROP POLICY IF EXISTS "Ver miembros de mis empresas" ON company_members;
DROP POLICY IF EXISTS "Gestionar miembros" ON company_members;
DROP POLICY IF EXISTS "Acceso a membresías" ON company_members;
DROP POLICY IF EXISTS "Ver membresias" ON company_members;
DROP POLICY IF EXISTS "Access Members" ON company_members;


-- 3. Crear Funciones "Bypass" (Rompen el ciclo de RLS)
-- Estas funciones se ejecutan con privilegios de sistema (Security Definer)

-- A) Para que la Tabla Companies sepa si soy miembro (lee company_members sin RLS)
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

-- B) Para que la Tabla Members sepa si soy dueño de la empresa (lee companies sin RLS)
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

-- 4. Habilitar RLS
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;


-- 5. Aplicar Políticas Finales

-- COMPANIES
-- Dueño entra directo OR Miembro usa funcion bypass
CREATE POLICY "Access Companies" ON companies
FOR ALL USING (
  owner_id = auth.uid() OR is_member_of(id)
);

-- MEMBERS
-- Soy yo mismo OR Soy el dueño (usando funcion bypass)
CREATE POLICY "Access Members" ON company_members
FOR ALL USING (
  user_id = auth.uid() OR is_owner_of(company_id)
);

-- PROFILES
-- Simplificado: Ver el propio
CREATE POLICY "Access Own Profile" ON profiles
FOR ALL USING (id = auth.uid());

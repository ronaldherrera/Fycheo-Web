-- ==============================================
-- FIX: RESET TOTAL DE RLS (NUCLEAR OPTION)
-- ==============================================

-- 1. Deshabilitar RLS temporalmente (Esto "apaga" el error de recursión)
ALTER TABLE companies DISABLE ROW LEVEL SECURITY;
ALTER TABLE company_members DISABLE ROW LEVEL SECURITY;
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;

-- 2. Borrar TODAS las políticas conocidas (Limpieza profunda)
DROP POLICY IF EXISTS "Users can see own profile" ON profiles;
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON profiles;
DROP POLICY IF EXISTS "Ver perfiles propios y de compañeros" ON profiles;
DROP POLICY IF EXISTS "Editar propio perfil" ON profiles;
DROP POLICY IF EXISTS "Acceso a perfiles" ON profiles; -- V3

DROP POLICY IF EXISTS "Owners can view and edit their companies" ON companies;
DROP POLICY IF EXISTS "Members can view their companies" ON companies;
DROP POLICY IF EXISTS "Dueños gestionan empresas" ON companies;
DROP POLICY IF EXISTS "Miembros ven empresas" ON companies;

DROP POLICY IF EXISTS "View members of my companies" ON company_members;
DROP POLICY IF EXISTS "Ver miembros de mis empresas" ON company_members;
DROP POLICY IF EXISTS "Gestionar miembros" ON company_members;
DROP POLICY IF EXISTS "Acceso a membresías" ON company_members; -- V3

-- 3. Habilitar RLS de nuevo (Estado limpio)
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 4. Recrear Funciones Helper (Asegurando que no use recurisón)
CREATE OR REPLACE FUNCTION get_my_company_ids()
RETURNS SETOF uuid
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  -- Esta función es segura, solo lee IDs
  SELECT company_id FROM company_members WHERE user_id = auth.uid();
$$;

-- 5. Políticas MÍNIMAS VIABLES (Sin cruces complejos para empezar)

-- A) Profiles: Cada uno ve el suyo. PUNTO.
CREATE POLICY "Ver propio perfil" ON profiles
FOR ALL USING (id = auth.uid());

-- B) Companies: Dueños ven sus empresas.
CREATE POLICY "Dueños ven sus empresas" ON companies
FOR ALL USING (owner_id = auth.uid());

-- C) Company Members: Usuarios ven sus propias membresías + Dueños ven todo
CREATE POLICY "Ver membresias" ON company_members
FOR SELECT USING (
  user_id = auth.uid() OR
  company_id IN (SELECT id FROM companies WHERE owner_id = auth.uid())
);

-- D) [CRÍTICO] Permitir que Dashboard lea empresas si eres miembro
-- Esta era la linea que causaba recursión antes. Vamos a usar la función DEFINER.
CREATE POLICY "Miembros leen empresas" ON companies
FOR SELECT USING (
  id IN (SELECT get_my_company_ids())
);

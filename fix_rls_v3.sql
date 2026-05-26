-- ==============================================
-- FIX: RECURSIÓN INFINITA (V3 - SOLUCIÓN DEFINITIVA)
-- ==============================================

-- 1. Limpieza TOTAL de políticas (Borrado preventivo)
-- Profiles
DROP POLICY IF EXISTS "Ver perfiles propios y de compañeros" ON profiles;
DROP POLICY IF EXISTS "Editar propio perfil" ON profiles;
DROP POLICY IF EXISTS "Users can see own profile" ON profiles;
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON profiles;

-- Companies
DROP POLICY IF EXISTS "Dueños gestionan empresas" ON companies;
DROP POLICY IF EXISTS "Miembros ven empresas" ON companies;
DROP POLICY IF EXISTS "Owners can view and edit their companies" ON companies;
DROP POLICY IF EXISTS "Members can view their companies" ON companies;

-- Company Members
DROP POLICY IF EXISTS "Ver miembros de mis empresas" ON company_members;
DROP POLICY IF EXISTS "Gestionar miembros" ON company_members;
DROP POLICY IF EXISTS "View members of my companies" ON company_members;


-- 2. Función Auxiliar (Security Definer)
-- Importante: Esta función lee company_members.
-- NO debemos usarla en la política de company_members para evitar bucles.
CREATE OR REPLACE FUNCTION get_my_company_ids()
RETURNS SETOF uuid
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT company_id FROM company_members WHERE user_id = auth.uid();
$$;


-- 3. Crear Políticas (Sin bucles)

-- A) COMPANY_MEMBERS (La clave del arreglo)
-- Un usuario puede ver una fila de membresía SI:
-- 1. Es SU propia membresía (user_id = auth.uid())
-- 2. O es el DUEÑO de la empresa (verificando tabla companies)
-- (Quitamos la parte recursiva de "ver compañeros" por ahora para estabilizar)
CREATE POLICY "Acceso a membresías" ON company_members
FOR ALL USING (
  user_id = auth.uid() OR
  company_id IN (
    SELECT id FROM companies WHERE owner_id = auth.uid()
  )
);

-- B) COMPANIES
-- Aquí SI podemos usar la función, porque la función lee members, no companies.
CREATE POLICY "Dueños gestionan empresas" ON companies
FOR ALL USING (owner_id = auth.uid());

CREATE POLICY "Miembros ven empresas" ON companies
FOR SELECT USING (
  id IN (SELECT get_my_company_ids())
);

-- C) PROFILES
-- Aquí también podemos usar la función.
-- Ver propio perfil O perfiles de gente en mis empresas
CREATE POLICY "Acceso a perfiles" ON profiles
FOR SELECT USING (
  id = auth.uid() OR
  id IN (
    SELECT user_id FROM company_members WHERE company_id IN (SELECT get_my_company_ids())
  )
);

CREATE POLICY "Editar propio perfil" ON profiles
FOR UPDATE USING (id = auth.uid());

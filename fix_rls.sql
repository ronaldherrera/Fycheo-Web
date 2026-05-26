-- ==============================================
-- FIX: RECURSIÓN INFINITA EN POLÍTICAS RLS (V2 - IDEMPOTENTE)
-- ==============================================

-- 1. Función Auxiliar (Security Definer) para romper el ciclo
CREATE OR REPLACE FUNCTION get_my_company_ids()
RETURNS SETOF uuid
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT company_id FROM company_members WHERE user_id = auth.uid();
$$;

-- 2. Limpiar políticas antiguas Y nuevas (para evitar errores "already exists")

-- Profiles
DROP POLICY IF EXISTS "Users can see own profile" ON profiles;
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON profiles;
DROP POLICY IF EXISTS "Ver perfiles propios y de compañeros" ON profiles;
DROP POLICY IF EXISTS "Editar propio perfil" ON profiles;

-- Companies
DROP POLICY IF EXISTS "Owners can view and edit their companies" ON companies;
DROP POLICY IF EXISTS "Members can view their companies" ON companies;
DROP POLICY IF EXISTS "Dueños gestionan empresas" ON companies;
DROP POLICY IF EXISTS "Miembros ven empresas" ON companies;

-- Company Members
DROP POLICY IF EXISTS "View members of my companies" ON company_members;
DROP POLICY IF EXISTS "Ver miembros de mis empresas" ON company_members;
DROP POLICY IF EXISTS "Gestionar miembros" ON company_members;


-- 3. Re-aplicar políticas seguras

-- A) PROFILES: Ver tu propio perfil Y el de tus compañeros de empresa
CREATE POLICY "Ver perfiles propios y de compañeros" ON profiles
FOR SELECT USING (
  id = auth.uid() OR
  id IN (
    SELECT user_id FROM company_members WHERE company_id IN (SELECT get_my_company_ids())
  )
);

CREATE POLICY "Editar propio perfil" ON profiles
FOR UPDATE USING (id = auth.uid());

-- B) COMPANIES: Dueños (total) y Miembros (lectura)
CREATE POLICY "Dueños gestionan empresas" ON companies
FOR ALL USING (owner_id = auth.uid());

CREATE POLICY "Miembros ven empresas" ON companies
FOR SELECT USING (
  id IN (SELECT get_my_company_ids())
);

-- C) COMPANY_MEMBERS: Ver miembros de tus empresas
CREATE POLICY "Ver miembros de mis empresas" ON company_members
FOR SELECT USING (
  company_id IN (SELECT get_my_company_ids())
);

-- Permitir a Dueños/Managers gestionar miembros
CREATE POLICY "Gestionar miembros" ON company_members
FOR ALL USING (
  company_id IN (SELECT id FROM companies WHERE owner_id = auth.uid()) OR
  company_id IN (SELECT get_my_company_ids())
);

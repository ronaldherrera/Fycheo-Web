-- ==============================================
-- FIX: DESHABILITAR MODELO DE SEGURIDAD (TEMPORAL)
-- ==============================================
-- Esto permitirá que la Web funcione inmediatamente mientras
-- depuramos las reglas de seguridad con más calma.

-- 1. Desactivar RLS (Row Level Security)
ALTER TABLE companies DISABLE ROW LEVEL SECURITY;
ALTER TABLE company_members DISABLE ROW LEVEL SECURITY;
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;

-- 2. Eliminar todas las políticas existentes (Limpieza)
DROP POLICY IF EXISTS "Acces Companies" ON companies;
DROP POLICY IF EXISTS "Access Members" ON company_members;
DROP POLICY IF EXISTS "Access Own Profile" ON profiles;
-- (Y cualquier otra que haya quedado)

-- ¡Listo! Ahora todos los datos son accesibles para cualquier usuario logueado.
-- No es ideal para prod, pero perfecto para desarrollar ahora mismo.

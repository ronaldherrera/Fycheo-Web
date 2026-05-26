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
ALTER TABLE IF EXISTS tasks DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS shifts DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS absences DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS teams DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS ephemeral_messages DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS company_holidays DISABLE ROW LEVEL SECURITY;

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
ALTER TABLE IF EXISTS tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS shifts ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS absences ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS ephemeral_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS company_holidays ENABLE ROW LEVEL SECURITY;


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


-- === G. TABLA TIME ENTRIES ===
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'time_entries') THEN
        EXECUTE 'CREATE POLICY "Manage Own Time Entries" ON time_entries FOR ALL USING (user_id = auth.uid())';
        EXECUTE 'CREATE POLICY "Members View Company Time Entries" ON time_entries FOR SELECT TO authenticated USING (is_member_of(company_id))';
    END IF;
END $$;


-- === H. TABLA TASKS ===
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'tasks') THEN
        EXECUTE 'CREATE POLICY "Tasks: ver tareas propias o de empresa" ON tasks FOR SELECT USING (assigned_to = auth.uid() OR created_by = auth.uid() OR is_member_of(company_id))';
        EXECUTE 'CREATE POLICY "Tasks: crear tarea (admin/hr/manager)" ON tasks FOR INSERT WITH CHECK (created_by = auth.uid() AND (is_owner_of(company_id) OR EXISTS (SELECT 1 FROM company_members WHERE user_id = auth.uid() AND company_id = tasks.company_id AND role IN (''admin'', ''hr'', ''manager'') AND accepted = true)))';
        EXECUTE 'CREATE POLICY "Tasks: actualizar tareas" ON tasks FOR UPDATE USING (assigned_to = auth.uid() OR created_by = auth.uid() OR (is_owner_of(company_id) OR EXISTS (SELECT 1 FROM company_members WHERE user_id = auth.uid() AND company_id = tasks.company_id AND role IN (''admin'', ''hr'', ''manager'') AND accepted = true)))';
        EXECUTE 'CREATE POLICY "Tasks: borrar tarea" ON tasks FOR DELETE USING (created_by = auth.uid() OR (is_owner_of(company_id) OR EXISTS (SELECT 1 FROM company_members WHERE user_id = auth.uid() AND company_id = tasks.company_id AND role IN (''admin'', ''hr'') AND accepted = true)))';
    END IF;
END $$;


-- === I. TABLA SHIFTS ===
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'shifts') THEN
        EXECUTE 'CREATE POLICY "Admins and HR can view all shifts of their company" ON shifts FOR SELECT USING (is_owner_of(company_id) OR EXISTS (SELECT 1 FROM company_members WHERE user_id = auth.uid() AND company_id = shifts.company_id AND role IN (''admin'', ''hr'')))';
        EXECUTE 'CREATE POLICY "Admins and HR can manage all shifts of their company" ON shifts FOR ALL USING (is_owner_of(company_id) OR EXISTS (SELECT 1 FROM company_members WHERE user_id = auth.uid() AND company_id = shifts.company_id AND role IN (''admin'', ''hr'')))';
        EXECUTE 'CREATE POLICY "Managers can view shifts of their team" ON shifts FOR SELECT USING (EXISTS (SELECT 1 FROM company_members me JOIN company_members target ON me.team_id = target.team_id WHERE me.user_id = auth.uid() AND me.role = ''manager'' AND target.user_id = shifts.employee_id AND target.company_id = shifts.company_id))';
        EXECUTE 'CREATE POLICY "Managers can manage shifts of their team" ON shifts FOR ALL USING (EXISTS (SELECT 1 FROM company_members me JOIN company_members target ON me.team_id = target.team_id WHERE me.user_id = auth.uid() AND me.role = ''manager'' AND target.user_id = shifts.employee_id AND target.company_id = shifts.company_id))';
        EXECUTE 'CREATE POLICY "Employees can view their own shifts" ON shifts FOR SELECT USING (auth.uid() = employee_id)';
    END IF;
END $$;


-- === J. TABLA ABSENCES ===
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'absences') THEN
        EXECUTE 'CREATE POLICY "Admins and HR can manage absences" ON absences FOR ALL USING (is_owner_of(company_id) OR EXISTS (SELECT 1 FROM company_members WHERE user_id = auth.uid() AND company_id = absences.company_id AND role IN (''admin'', ''hr'')))';
        EXECUTE 'CREATE POLICY "Managers can view team absences" ON absences FOR SELECT USING (EXISTS (SELECT 1 FROM company_members me JOIN company_members target ON me.team_id = target.team_id WHERE me.user_id = auth.uid() AND me.role = ''manager'' AND target.user_id = absences.employee_id AND target.company_id = absences.company_id))';
        EXECUTE 'CREATE POLICY "Employees can view their own absences" ON absences FOR SELECT USING (auth.uid() = employee_id)';
    END IF;
END $$;


-- === K. TABLA TEAMS ===
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'teams') THEN
        EXECUTE 'CREATE POLICY "Users can view teams of their company" ON teams FOR SELECT USING (is_member_of(company_id))';
        EXECUTE 'CREATE POLICY "Admins and HR can manage teams" ON teams FOR ALL USING (is_owner_of(company_id) OR EXISTS (SELECT 1 FROM company_members WHERE user_id = auth.uid() AND company_id = teams.company_id AND role IN (''admin'', ''hr'')))';
    END IF;
END $$;


-- === L. TABLA EPHEMERAL MESSAGES ===
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'ephemeral_messages') THEN
        EXECUTE 'CREATE POLICY "Chat: ver propios mensajes" ON ephemeral_messages FOR SELECT USING ((sender_id = auth.uid() OR receiver_id = auth.uid()) AND expires_at > now())';
        EXECUTE 'CREATE POLICY "Chat: enviar mensaje" ON ephemeral_messages FOR INSERT WITH CHECK (sender_id = auth.uid() AND EXISTS (SELECT 1 FROM company_members cm WHERE cm.user_id = auth.uid() AND cm.company_id = company_id AND cm.accepted = true) AND EXISTS (SELECT 1 FROM company_members cm2 WHERE cm2.user_id = receiver_id AND cm2.company_id = company_id AND cm2.accepted = true))';
        EXECUTE 'CREATE POLICY "Chat: borrar al leer" ON ephemeral_messages FOR DELETE USING (receiver_id = auth.uid() OR sender_id = auth.uid())';
    END IF;
END $$;


-- === M. TABLA COMPANY HOLIDAYS ===
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'company_holidays') THEN
        EXECUTE 'CREATE POLICY "Los usuarios pueden ver los festivos de su empresa" ON company_holidays FOR SELECT USING (is_member_of(company_id))';
        EXECUTE 'CREATE POLICY "Solo admin/hr pueden gestionar festivos" ON company_holidays FOR ALL USING (is_owner_of(company_id) OR EXISTS (SELECT 1 FROM company_members cm WHERE cm.company_id = company_holidays.company_id AND cm.user_id = auth.uid() AND cm.role IN (''admin'', ''hr'')))';
    END IF;
END $$;


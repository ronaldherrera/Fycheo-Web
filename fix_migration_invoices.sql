-- Asegurar que la tabla existe y tiene el nombre correcto 'invoices'
-- Si por error se creó como 'facturas', intentar renombrarla (opcional, pero seguro)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'facturas') THEN
        ALTER TABLE facturas RENAME TO invoices;
    END IF;
END $$;

-- 1. Añadir columna 'type' si no existe
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='invoices' AND column_name='type') THEN
        ALTER TABLE invoices ADD COLUMN type TEXT DEFAULT 'invoice' CHECK (type IN ('invoice', 'ticket'));
    END IF;
END $$;

-- 2. Backfill de datos (Actualizar registros antiguos)
UPDATE invoices SET type = 'invoice' WHERE concept LIKE '%Recarga%' AND type IS NULL;
UPDATE invoices SET type = 'ticket' WHERE concept LIKE '%Alta Empresa%' AND type IS NULL;
UPDATE invoices SET type = 'invoice' WHERE type IS NULL;

-- 3. Regenerar Políticas RLS (Borrando previas para evitar error 42710)
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own invoices" ON invoices;
DROP POLICY IF EXISTS "Users can insert own invoices" ON invoices;

CREATE POLICY "Users can view own invoices" ON invoices
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own invoices" ON invoices
    FOR INSERT WITH CHECK (auth.uid() = user_id);

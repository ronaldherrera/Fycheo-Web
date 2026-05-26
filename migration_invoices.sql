-- Create invoices table
CREATE TABLE IF NOT EXISTS invoices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    invoice_number TEXT NOT NULL,
    concept TEXT NOT NULL,
    amount_net DECIMAL(10,2) NOT NULL, -- Base imponible
    amount_vat DECIMAL(10,2) NOT NULL, -- IVA
    amount_total DECIMAL(10,2) NOT NULL, -- Total
    status TEXT DEFAULT 'paid', -- paid, refunded, pending
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Añadir columna type si no existe (Idempotente vía DO block)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='invoices' AND column_name='type') THEN
        ALTER TABLE invoices ADD COLUMN type TEXT DEFAULT 'invoice' CHECK (type IN ('invoice', 'ticket'));
    END IF;
END $$;

-- Backfill para datos existentes (si los hubiera)
UPDATE invoices SET type = 'invoice' WHERE concept LIKE '%Recarga%' AND type IS NULL;
UPDATE invoices SET type = 'ticket' WHERE concept LIKE '%Alta Empresa%' AND type IS NULL;
UPDATE invoices SET type = 'invoice' WHERE type IS NULL; -- Fallback por defecto

-- RLS policies (simple for now, user can see own invoices)
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own invoices" ON invoices
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own invoices" ON invoices
    FOR INSERT WITH CHECK (auth.uid() = user_id);

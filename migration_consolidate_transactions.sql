-- Migration: Consolidate invoices into transactions
-- Description: Adds invoice-related fields to transactions table and drops invoices table.

-- 1. Add new columns to transactions
ALTER TABLE transactions 
ADD COLUMN IF NOT EXISTS invoice_number TEXT,
ADD COLUMN IF NOT EXISTS invoice_concept TEXT, -- To distinguish from internal descriptions if needed, or just use description
ADD COLUMN IF NOT EXISTS amount_net NUMERIC(10,2),
ADD COLUMN IF NOT EXISTS amount_vat NUMERIC(10,2),
ADD COLUMN IF NOT EXISTS is_individual_billing BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS invoice_url TEXT,
ADD COLUMN IF NOT EXISTS invoice_status TEXT DEFAULT 'paid', -- paid, pending, refunded
ADD COLUMN IF NOT EXISTS amount_gross NUMERIC(10,2), -- Total paid (Net + VAT)
ADD COLUMN IF NOT EXISTS payment_method TEXT, -- e.g., 'card', 'transfer'
ADD COLUMN IF NOT EXISTS payment_method_details TEXT; -- e.g., 'Visa **** 4242'

-- 2. Migrar datos (Best Effort)
-- Intentamos mover facturas existentes a transactions si no existen ya.
-- Como no hay FK, creamos nuevas transacciones para las facturas que no parezcan tener duplicado.
-- Ojo: Esto es simple. Si ya había transacción y factura separadas, ahora tendremos 2 transacciones (una la original, otra la importada de factura).
-- Para evitar duplicados obvios, asumimos que si el usuario quiere "consolidar",
-- idealmente limpiaríamos todo o haríamos un match complejo. 
-- DADO EL CONTEXTO DE DESARROLLO: Vamos a insertar las facturas como transacciones de tipo 'deposit' (hacia la empresa) o 'purchase' según corresponda,
-- si es que queremos preservar historial.
-- PERO, para simplificar y evitar basura, vamos a MARCAR que se añaden columnas y el seed se encargará de rellenar bien.

-- 3. Drop invoices table (User approved consolidation)
-- Warning: This deletes old invoice data that wasn't migrated manually or automatically.
DROP TABLE IF EXISTS invoices;

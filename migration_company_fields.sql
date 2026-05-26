-- Migration: Add extra fields to companies table
ALTER TABLE companies ADD COLUMN IF NOT EXISTS location text;
ALTER TABLE companies ADD COLUMN IF NOT EXISTS sector text;
ALTER TABLE companies ADD COLUMN IF NOT EXISTS tax_id text;       -- CIF/NIF
ALTER TABLE companies ADD COLUMN IF NOT EXISTS fiscal_name text;  -- Razón Social
ALTER TABLE companies ADD COLUMN IF NOT EXISTS fiscal_address text; -- Dirección Fiscal

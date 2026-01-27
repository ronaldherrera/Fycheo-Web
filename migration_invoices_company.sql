-- Migration: Add company_id to invoices
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS company_id uuid REFERENCES companies(id);

-- Add is_individual_billing column to invoices table
ALTER TABLE invoices 
ADD COLUMN IF NOT EXISTS is_individual_billing BOOLEAN DEFAULT FALSE;

-- Update existing records based on current company settings (best effort backfill)
UPDATE invoices
SET is_individual_billing = companies.individual_billing
FROM companies
WHERE invoices.company_id = companies.id;

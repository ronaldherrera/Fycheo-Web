-- Add wallet_balance to companies table
ALTER TABLE companies 
ADD COLUMN IF NOT EXISTS wallet_balance numeric(10, 2) DEFAULT 0.00;

-- Optional: Update existing with 0
UPDATE companies SET wallet_balance = 0.00 WHERE wallet_balance IS NULL;

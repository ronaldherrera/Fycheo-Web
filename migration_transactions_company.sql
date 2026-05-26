-- Migration: Add company_id support to transactions table
-- To support individual company wallets

-- 1. Add company_id column (nullable initially to support user transactions)
ALTER TABLE transactions 
ADD COLUMN IF NOT EXISTS company_id UUID REFERENCES companies(id);

-- 2. Add index for faster queries
CREATE INDEX IF NOT EXISTS idx_transactions_company_id ON transactions(company_id);

-- 3. Extend type check constraint if needed (e.g. 'invoice', 'transfer')
-- Note: Postgres constraints are hard to modify, we'll assume the text check allows arbitrary if not enforced strictly, 
-- or we rely on application logic. If strictly enforced:
ALTER TABLE transactions DROP CONSTRAINT IF EXISTS transactions_type_check;
ALTER TABLE transactions ADD CONSTRAINT transactions_type_check 
CHECK (type IN ('deposit', 'purchase', 'refund', 'transfer', 'withdrawal'));

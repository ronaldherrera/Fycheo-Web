-- Add individual_billing flag to companies
ALTER TABLE companies 
ADD COLUMN IF NOT EXISTS individual_billing boolean DEFAULT false;

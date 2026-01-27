-- Add fiscal fields to profiles
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='tax_id') THEN
        ALTER TABLE profiles ADD COLUMN tax_id TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='fiscal_name') THEN
        ALTER TABLE profiles ADD COLUMN fiscal_name TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='fiscal_address') THEN
        ALTER TABLE profiles ADD COLUMN fiscal_address TEXT;
    END IF;
END $$;

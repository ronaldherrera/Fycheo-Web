-- Add job_title to profiles if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='job_title') THEN
        ALTER TABLE profiles ADD COLUMN job_title TEXT;
    END IF;
END $$;

-- Create payment methods table
CREATE TABLE IF NOT EXISTS user_payment_methods (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    card_brand TEXT NOT NULL, -- visa, mastercard, amex
    last4 TEXT NOT NULL,
    exp_month INTEGER NOT NULL,
    exp_year INTEGER NOT NULL,
    is_default BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE user_payment_methods ENABLE ROW LEVEL SECURITY;

-- Policies for payment methods
DROP POLICY IF EXISTS "Users can view own payment methods" ON user_payment_methods;
CREATE POLICY "Users can view own payment methods" ON user_payment_methods
    FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own payment methods" ON user_payment_methods;
CREATE POLICY "Users can insert own payment methods" ON user_payment_methods
    FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own payment methods" ON user_payment_methods;
CREATE POLICY "Users can update own payment methods" ON user_payment_methods
    FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own payment methods" ON user_payment_methods;
CREATE POLICY "Users can delete own payment methods" ON user_payment_methods
    FOR DELETE USING (auth.uid() = user_id);

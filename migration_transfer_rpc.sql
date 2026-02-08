-- ==============================================================================
-- MIGRATION: RPC FOR TRANSFERRING COMPANY BALANCE TO OWNER
-- ==============================================================================

-- Function to safely transfer company balance to owner and disable individual billing
-- It runs in a transaction to ensure atomicity.

DROP FUNCTION IF EXISTS transfer_company_balance_to_owner(UUID);

CREATE OR REPLACE FUNCTION transfer_company_balance_to_owner(company_uuid UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER -- Runs with privileges of creator (admin) to bypass RLS if needed for updates
SET search_path = public
AS $$
DECLARE
    v_company_balance NUMERIC;
    v_owner_id UUID;
    v_company_name TEXT;
BEGIN
    -- 1. Lock and Get Company Data
    -- We lock the row to prevent concurrent updates while we process this
    SELECT wallet_balance, owner_id, name INTO v_company_balance, v_owner_id, v_company_name
    FROM companies
    WHERE id = company_uuid
    FOR UPDATE; 

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Empresa no encontrada';
    END IF;

    -- Handle null balance locally
    v_company_balance := COALESCE(v_company_balance, 0);

    IF v_company_balance <= 0 THEN
        -- If no balance to transfer, just ensure the flag is disabled
        UPDATE companies SET individual_billing = false WHERE id = company_uuid;
        RETURN;
    END IF;

    -- 2. Update Company: Zero out balance and disable individual billing
    UPDATE companies 
    SET wallet_balance = 0, 
        individual_billing = false 
    WHERE id = company_uuid;

    -- 3. Update Owner Profile: Add the balance
    UPDATE profiles
    SET wallet_balance = COALESCE(wallet_balance, 0) + v_company_balance
    WHERE id = v_owner_id;

    -- 4. Record Transaction for User
    -- We assume transactions table exists and links to user_id
    INSERT INTO transactions (user_id, amount, type, description)
    VALUES (
        v_owner_id, 
        v_company_balance, 
        'deposit', 
        'Transferencia de saldo por desactivación de facturación individual - ' || v_company_name
    );

END;
$$;

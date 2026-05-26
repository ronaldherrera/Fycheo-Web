DO $$
DECLARE
    -- 👇 TU EMAIL AQUÍ 👇
    v_target_email TEXT := '3drealitylook@gmail.com'; 
    v_user_id UUID;
BEGIN
    SELECT id INTO v_user_id FROM auth.users WHERE email = v_target_email LIMIT 1;
    
    -- 1. Resetear Wallet Personal
    UPDATE profiles
    SET wallet_balance = (
        SELECT COALESCE(SUM(CASE 
            WHEN type IN ('deposit', 'refund') THEN amount 
            WHEN type IN ('purchase', 'withdrawal') THEN -amount 
            ELSE 0 
        END), 0)
        FROM transactions
        WHERE user_id = v_user_id AND company_id IS NULL
    )
    WHERE id = v_user_id;

    -- 2. Resetear Wallets de Empresa (si existen)
    UPDATE companies
    SET wallet_balance = (
        SELECT COALESCE(SUM(CASE 
            WHEN type IN ('deposit', 'refund') THEN amount 
            WHEN type IN ('purchase', 'withdrawal') THEN -amount 
            ELSE 0 
        END), 0)
        FROM transactions
        WHERE company_id = companies.id
    )
    WHERE owner_id = v_user_id;
    
    RAISE NOTICE '✅ Saldos sincronizados para %', v_target_email;
END $$;

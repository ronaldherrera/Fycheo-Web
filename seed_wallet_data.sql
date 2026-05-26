-- Simulación de Movimientos para el Wallet (Completa)
-- Ejecuta esto en el Editor SQL de Supabase

DO $$
DECLARE
    v_user_id UUID;
    v_company_id UUID;
BEGIN
    -- 1. Obtener un usuario y una empresa existentes
    SELECT id INTO v_user_id FROM auth.users LIMIT 1;
    SELECT id INTO v_company_id FROM companies WHERE owner_id = v_user_id LIMIT 1;

    IF v_user_id IS NULL THEN
        RAISE NOTICE 'No se encontró ningún usuario para asociar los datos.';
        RETURN;
    END IF;

    -- 2. Limpiar datos de prueba (opcional)
    -- DELETE FROM transactions WHERE description LIKE '%[TEST]%';
    -- DELETE FROM invoices WHERE concept LIKE '%[TEST]%';

    -- CASO A: Recarga de Saldo (Tarjeta)
    -- Crea TRANSACCIÓN (Para el Wallet) y FACTURA (Documento Legal)
    INSERT INTO transactions (user_id, company_id, amount, type, description, created_at)
    VALUES (v_user_id, v_company_id, 50.00, 'deposit', '[TEST] Recarga de Saldo (Tarjeta)', NOW() - INTERVAL '1 day');
    
    INSERT INTO invoices (user_id, company_id, amount_net, amount_vat, amount_total, type, status, invoice_number, concept, created_at, is_individual_billing)
    VALUES (v_user_id, v_company_id, 41.32, 8.68, 50.00, 'invoice', 'paid', 'TEST-INV-001', '[TEST] Recarga de Saldo (Tarjeta)', NOW() - INTERVAL '1 day', true);


    -- CASO B: Pago de Suscripción (Gasto)
    -- Solo TRANSACCIÓN (Gasto interno)
    INSERT INTO transactions (user_id, company_id, amount, type, description, created_at)
    VALUES (v_user_id, v_company_id, 29.99, 'purchase', '[TEST] Suscripción Plan Pro Mensual', NOW() - INTERVAL '2 days');


    -- CASO C: Transferencia Interna (Corrección: Sin Factura, es movimiento interno)
    -- Solo TRANSACCIÓN
    INSERT INTO transactions (user_id, company_id, amount, type, description, created_at)
    VALUES (v_user_id, NULL, 125.50, 'deposit', '[TEST] Transferencia de saldo por desactivación de facturación', NOW() - INTERVAL '3 days');


    -- CASO D: Reembolso (Factura Rectificativa)
    -- Crea TRANSACCIÓN y FACTURA (Rectificativa)
    INSERT INTO transactions (user_id, company_id, amount, type, description, created_at)
    VALUES (v_user_id, v_company_id, 29.99, 'refund', '[TEST] Reembolso suscripción cobrada por error', NOW() - INTERVAL '4 days');
    
    INSERT INTO invoices (user_id, company_id, amount_net, amount_vat, amount_total, type, status, invoice_number, concept, created_at, is_individual_billing)
    VALUES (v_user_id, v_company_id, 24.79, 5.20, 29.99, 'invoice', 'refunded', 'TEST-REF-001', '[TEST] Reembolso suscripción', NOW() - INTERVAL '4 days', true);


    -- CASO E: Compra de Créditos Extra
    -- Solo TRANSACCIÓN
    INSERT INTO transactions (user_id, company_id, amount, type, description, created_at)
    VALUES (v_user_id, v_company_id, 15.00, 'withdrawal', '[TEST] Compra de paquete de 50 SMS', NOW() - INTERVAL '5 hours');

END $$;

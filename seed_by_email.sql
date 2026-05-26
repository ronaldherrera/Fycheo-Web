-- SCRIPT REFINADO: FLUJO REAL DE CONTRATACIÓN
-- Simula: 1. Recarga (Entra dinero) -> 2. Pago Plan (Sale dinero del wallet)
-- CAMBIA EL EMAIL ABAJO

DO $$
DECLARE
    -- 👇👇👇 PON TU EMAIL AQUÍ 👇👇👇
    v_target_email TEXT := '3drealitylook@gmail.com'; 
    -- 👆👆👆 👆👆👆 👆👆👆
    
    v_user_id UUID;
    v_company_id UUID;
    v_now TIMESTAMP;
BEGIN
    SELECT id INTO v_user_id FROM auth.users WHERE email = v_target_email LIMIT 1;
    SELECT id INTO v_company_id FROM companies WHERE owner_id = v_user_id LIMIT 1;
    v_now := NOW();

    IF v_user_id IS NULL THEN
        RAISE NOTICE '❌ ERROR: No se encontró el usuario.';
        RETURN;
    END IF;

    -- PASO 1: Recarga de Saldo (Para tener fondos)
    -- Tipo: DEPOSIT (Ingreso) | Color: VERDE | Factura: SÍ
    -- PASO 1: Recarga de Saldo (Para tener fondos)
    -- Tipo: DEPOSIT (Ingreso) | Color: VERDE | Factura: SÍ
    -- Ahora TODO va en transactions
    INSERT INTO transactions (
        user_id, 
        company_id, 
        amount, 
        type, 
        description, 
        created_at,
        -- Campos de factura
        invoice_number,
        amount_net,
        amount_vat,
        is_individual_billing,
        invoice_status
    )
    VALUES (
        v_user_id, 
        v_company_id, 
        28.93, 
        'deposit', 
        'Recarga de Saldo (Tarjeta)', 
        v_now - INTERVAL '10 minutes',
        -- Datos factura
        'INV-REC-001',
        28.93,
        6.07,
        true,
        'paid'
    );


    -- PASO 2: Pago del Plan (Usando el saldo recargado)
    -- Tipo: PURCHASE (Gasto) | Color: ROJO | Factura: NO (Ya se facturó la recarga)
    INSERT INTO transactions (user_id, company_id, amount, type, description, created_at)
    VALUES (v_user_id, v_company_id, 29.99, 'purchase', 'Suscripción Plan Pro (Mensual)', v_now - INTERVAL '5 minutes');


    -- PASO 3: Transferencia Interna (Desactivación)
    -- Tipo: DEPOSIT (Ingreso interno) | Color: VERDE | Factura: NO (Movimiento interno)
    -- El filtro 'transferencia' ocultará el botón de descarga
    INSERT INTO transactions (user_id, company_id, amount, type, description, created_at)
    VALUES (v_user_id, NULL, 120.00, 'deposit', 'Transferencia de saldo por desactivación de facturación', v_now - INTERVAL '1 hour');

    RAISE NOTICE '✅ Datos creados correctamente para %', v_target_email;
END $$;

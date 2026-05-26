-- SCRIPT UNIFICADO: Corrección de Schema + Simulación de Datos
-- Ejecuta TODO este script en tu Editor SQL de Supabase

-- 1. CORRECCIÓN DE SCHEMA (Añadir columna faltante si no existe)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='invoices' AND column_name='is_individual_billing') THEN
        ALTER TABLE invoices ADD COLUMN is_individual_billing BOOLEAN DEFAULT FALSE;
        RAISE NOTICE 'Columna is_individual_billing añadida correctamente.';
    ELSE
        RAISE NOTICE 'La columna is_individual_billing ya existe.';
    END IF;
END $$;

-- 2. SIMULACIÓN DE DATOS (Seed)
DO $$
DECLARE
    v_user_id UUID;
    v_company_id UUID;
BEGIN
    -- Obtener usuario y empresa
    SELECT id INTO v_user_id FROM auth.users LIMIT 1;
    SELECT id INTO v_company_id FROM companies WHERE owner_id = v_user_id LIMIT 1;

    IF v_user_id IS NULL THEN
        RAISE NOTICE 'No se encontró usuario.';
        RETURN;
    END IF;

    -- CASO A: Recarga de Saldo (Tarjeta) -> Transacción + Factura
    INSERT INTO transactions (user_id, company_id, amount, type, description, created_at)
    VALUES (v_user_id, v_company_id, 50.00, 'deposit', '[TEST] Recarga de Saldo (Tarjeta)', NOW() - INTERVAL '1 day');
    
    INSERT INTO invoices (user_id, company_id, amount_net, amount_vat, amount_total, type, status, invoice_number, concept, created_at, is_individual_billing)
    VALUES (v_user_id, v_company_id, 41.32, 8.68, 50.00, 'invoice', 'paid', 'TEST-INV-001', '[TEST] Recarga de Saldo (Tarjeta)', NOW() - INTERVAL '1 day', true);


    -- CASO B: Pago de Suscripción -> Solo Transacción (Gasto interno)
    INSERT INTO transactions (user_id, company_id, amount, type, description, created_at)
    VALUES (v_user_id, v_company_id, 29.99, 'purchase', '[TEST] Suscripción Plan Pro Mensual', NOW() - INTERVAL '2 days');


    -- CASO C: Transferencia Interna -> Solo Transacción (Movimiento de fondos)
    INSERT INTO transactions (user_id, company_id, amount, type, description, created_at)
    VALUES (v_user_id, NULL, 125.50, 'deposit', '[TEST] Transferencia de saldo por desactivación de facturación', NOW() - INTERVAL '3 days');


    -- CASO D: Reembolso -> Transacción + Factura Rectificativa
    INSERT INTO transactions (user_id, company_id, amount, type, description, created_at)
    VALUES (v_user_id, v_company_id, 29.99, 'refund', '[TEST] Reembolso suscripción cobrada por error', NOW() - INTERVAL '4 days');
    
    INSERT INTO invoices (user_id, company_id, amount_net, amount_vat, amount_total, type, status, invoice_number, concept, created_at, is_individual_billing)
    VALUES (v_user_id, v_company_id, 24.79, 5.20, 29.99, 'invoice', 'refunded', 'TEST-REF-001', '[TEST] Reembolso suscripción', NOW() - INTERVAL '4 days', true);


    -- CASO E: Compra Paquete SMS -> Solo Transacción
    INSERT INTO transactions (user_id, company_id, amount, type, description, created_at)
    VALUES (v_user_id, v_company_id, 15.00, 'withdrawal', '[TEST] Compra de paquete de 50 SMS', NOW() - INTERVAL '5 hours');

    RAISE NOTICE 'Datos de prueba insertados correctamente.';

END $$;

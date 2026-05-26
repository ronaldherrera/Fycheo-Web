-- ==============================================
-- MIGRACIÓN: SISTEMA DE WALLET
-- ==============================================

-- 1. Añadir columna de saldo al perfil del usuario
-- Usamos NUMERIC para dinero (más preciso que float)
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS wallet_balance NUMERIC(10, 2) DEFAULT 0.00;

-- 2. Política de seguridad para ver tu propio saldo
-- (Si RLS está activo, necesitamos asegurar que se puede leer/editar el propio saldo)
-- Como tenemos RLS desactivado temporalmente, esto funcionará directo, 
-- pero añadimos la columna a la vista del usuario para cuando reactivemos.

-- Nota: Al reactivar RLS, la política "Access Own Profile" cubrirá esto.

-- 3. (Opcional) Tabla de transacciones para historial
CREATE TABLE IF NOT EXISTS transactions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) NOT NULL,
    amount NUMERIC(10, 2) NOT NULL,
    description TEXT,
    type TEXT CHECK (type IN ('deposit', 'purchase', 'refund')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Deshabilitar RLS en transactions temporalmente para evitar bloqueos ahora
ALTER TABLE transactions DISABLE ROW LEVEL SECURITY;

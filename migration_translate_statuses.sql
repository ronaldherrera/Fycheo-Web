-- Migración: Traducir estados de facturas a español

-- 1. Actualizar registros existentes
UPDATE invoices SET status = 'pagado' WHERE status = 'paid';
UPDATE invoices SET status = 'pendiente' WHERE status = 'pending';
UPDATE invoices SET status = 'fallido' WHERE status = 'failed';
UPDATE invoices SET status = 'reembolsado' WHERE status = 'refunded';

-- 2. Actualizar registros nulos o desconocidos a 'pagado' (por seguridad)
UPDATE invoices SET status = 'pagado' WHERE status NOT IN ('pagado', 'pendiente', 'fallido', 'reembolsado');

-- 3. Cambiar el valor por defecto de la columna
ALTER TABLE invoices ALTER COLUMN status SET DEFAULT 'pagado';

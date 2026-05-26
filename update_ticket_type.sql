-- Corrige el tipo de documento para "tiket de prueba"
-- Mueve de 'invoice' (Factura) a 'ticket' (Ticket)

UPDATE invoices 
SET type = 'ticket' 
WHERE concept ILIKE '%tiket de prueba%' 
AND type = 'invoice';

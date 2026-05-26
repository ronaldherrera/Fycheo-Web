-- Migración: Configuración de Storage para Logos

-- 1. Crear el bucket 'company-logos'
-- Nota: La creación de buckets a menudo requiere hacerla desde la UI de Supabase si la extensión de storage-api no está totalmente expuesta a SQL,
-- pero intentamos hacerlo vía SQL estándar de Supabase Storage.
INSERT INTO storage.buckets (id, name, public)
VALUES ('company-logos', 'company-logos', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Políticas de Seguridad (RLS) para 'company-logos'

-- Política: Cualquiera puede ver (SELECT) los logos (Público)
CREATE POLICY "Logos son públicos"
ON storage.objects FOR SELECT
USING ( bucket_id = 'company-logos' );

-- Política: Usuarios autenticados pueden subir (INSERT) logos
CREATE POLICY "Usuarios autenticados pueden subir logos"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'company-logos'
  AND auth.role() = 'authenticated'
);

-- Política: Usuarios pueden actualizar sus propios logos (Opcional, simplificado a auth users por ahora)
CREATE POLICY "Usuarios pueden actualizar logos"
ON storage.objects FOR UPDATE
USING ( bucket_id = 'company-logos' AND auth.role() = 'authenticated' );

-- Política: Usuarios pueden borrar (Opcional)
CREATE POLICY "Usuarios pueden borrar logos"
ON storage.objects FOR DELETE
USING ( bucket_id = 'company-logos' AND auth.role() = 'authenticated' );

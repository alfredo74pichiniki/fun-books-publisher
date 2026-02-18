-- TABLA DE SUSCRIPTORES --
-- Copia y pega esto en el SQL Editor de Supabase

CREATE TABLE IF NOT EXISTS fbp_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- ID único
  email TEXT NOT NULL,                           -- Email del cliente
  book_id TEXT NOT NULL,                         -- Libro descargado
  source TEXT DEFAULT 'bonus_landing',           -- Origen (por si hay más fuentes)
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),       -- Fecha de suscripción
  UNIQUE(email, book_id)                         -- Evitar duplicados mismo libro/email
);

-- Habilitar seguridad (opcional pero recomendado)
ALTER TABLE fbp_subscribers ENABLE ROW LEVEL SECURITY;

-- Política: Solo el servicio (backend) puede insertar/leer
-- (Como usas service_role_key en la API, esto no restringe al backend, pero protege acceso público)
CREATE POLICY "Servicio total acceso" ON fbp_subscribers
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

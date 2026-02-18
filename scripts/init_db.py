
import os
import requests
import json
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv(r"C:\Users\alfre\super-agent-factory\.env")

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    print("❌ Error: Faltan credenciales de Supabase en el .env")
    exit(1)

# Endpoint para ejecutar SQL (usando la API REST de Supabase)
# Nota: Supabase no expone raw SQL por REST por defecto sin una función, 
# pero podemos usar la API de postgrest si la tabla existiera. 
# Para crear tablas, lo mejor es usar la librería de supabase o un comando directo si tenemos acceso.
# Dado que es un entorno Python, intentaremos usar la librería 'supabase' si está, o requests para llamar a la API SQL si está habilitada (extensions).
# Como fallback seguro, usaré la "SQL Editor" API si estuviera disponible, pero lo más robusto aquí es instruirte a ti o usar 'postgres' connection.
# Espérame, tengo la connection string de postgres en tu .env!
# DATABASE_URL=postgresql://postgres:k!R9YDXESd$$82@db.sfclrzjoiusausfkjyum.supabase.co:5432/postgres

import psycopg2

DB_CONNECTION_STRING = "postgresql://postgres:k!R9YDXESd$$82@db.sfclrzjoiusausfkjyum.supabase.co:5432/postgres"

SQL_COMMANDS = [
    """
    CREATE TABLE IF NOT EXISTS fbp_subscribers (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email TEXT NOT NULL,
        book_id TEXT NOT NULL,
        source TEXT DEFAULT 'bonus_landing',
        subscribed_at TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE(email, book_id)
    );
    """,
    """
    COMMENT ON TABLE fbp_subscribers IS 'Almacena suscriptores de Fun Books Publisher desde landing pages';
    """
]

try:
    print("🔌 Conectando a Supabase PostgreSQL...")
    conn = psycopg2.connect(DB_CONNECTION_STRING)
    cur = conn.cursor()
    
    for cmd in SQL_COMMANDS:
        cur.execute(cmd)
        print("✅ Comando ejecutado OK.")
        
    conn.commit()
    cur.close()
    conn.close()
    print("🎉 Tabla 'fbp_subscribers' creada exitosamente nivel Dios.")

except Exception as e:
    print(f"❌ Error conectando o ejecutando SQL: {e}")

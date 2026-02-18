
import os
from supabase import create_client, Client
from dotenv import load_dotenv

# Cargar variables
load_dotenv(r"C:\Users\alfre\super-agent-factory\.env")

url: str = os.environ.get("SUPABASE_URL")
# Usamos SERVICE_ROLE_KEY para tener permisos de admin (bypass RLS)
key: str = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")

if not url or not key:
    print("❌ Faltan credenciales en el .env")
    exit(1)

print(f"🔌 Conectando a Supabase: {url}...")

# Inicializar cliente
supabase: Client = create_client(url, key)

# Intento crear tabla vía RPC (Stored Procedure) si existiera una función 'exec_sql'.
# Supabase por defecto NO expone una forma de ejecutar DDL (CREATE TABLE) vía API REST cliente.
# Necesitamos usar la API de postgres direct (que falló por DNS) 
# O esperar que el usuario lo haga.

# PERO, podemos VERIFICAR si la conexión funciona haciendo un select simple.
try:
    # Intentamos leer la tabla (si existe)
    response = supabase.table("fbp_subscribers").select("*").limit(1).execute()
    print("✅ Conexión exitosa via HTTP API.")
    print("ℹ️ Resultado consulta tabla: ", response)
except Exception as e:
    print(f"⚠️ Error al consultar tabla (probablemente no existe): {e}")

    # Si estamos aquí, es que la tabla NO existe y no podemos crearla vía cliente estándar.
    # Pero voy a intentar usar el rest endpoint de pg_meta si tuviera acceso, 
    # pero eso requiere token de usuario logueado en dashboard, no service key del proyecto.
    
    print("\n🚨 IMPORTANTE: La API de Supabase NO permite crear tablas sin SQL directo.")
    print("Como el acceso SQL directo falló (DNS), DEBES ejecutar el SQL manualmente en el Dashboard.")

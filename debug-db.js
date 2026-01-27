
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Cargar variables de entorno del proyecto Web
dotenv.config({ path: 'd:/Mis Desarrollos/Fycheo/Fycheo-Web/.env.local' });
dotenv.config({ path: 'd:/Mis Desarrollos/Fycheo/Fycheo-Web/.env' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Faltan variables de entorno SUPABASE_URL o SUPABASE_KEY");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
    console.log("Probando conexión a Supabase...");
    
    // 1. Probar fetch simple
    const { data, error } = await supabase.from('companies').select('*').limit(1);
    
    if (error) {
        console.error("Error al obtener companies:", error);
    } else {
        console.log("Éxito al obtener companies. Registros encontrados:", data.length);
        console.log(data);
    }
}

testConnection();

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

function parseEnv(filePath) {
    if (!fs.existsSync(filePath)) return {};
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    const config = {};
    lines.forEach(line => {
        const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
        if (match) {
            let key = match[1];
            let value = match[2] || '';
            if (value.length > 0 && value.startsWith('"') && value.endsWith('"')) {
                value = value.substring(1, value.length - 1);
            } else if (value.length > 0 && value.startsWith("'") && value.endsWith("'")) {
                value = value.substring(1, value.length - 1);
            }
            config[key] = value.trim();
        }
    });
    return config;
}

const config = { ...parseEnv('./.env'), ...parseEnv('./.env.local') };
const supabaseUrl = config.VITE_SUPABASE_URL;
const supabaseKey = config.VITE_SUPABASE_SERVICE_ROLE_KEY || config.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function inspectPolicies() {
    console.log("Obteniendo políticas RLS para sent_emails...");
    // Ejecutar consulta SQL a través de un RPC genérico si existe, o consultar pg_policies
    // Como no tenemos un ejecutor SQL genérico, podemos intentar consultar la información de RLS mediante consulta directa si la RLS lo permite.
    // O mejor, miremos si podemos listar las tablas y sus políticas.
    // Espera, no se puede consultar pg_policies directamente con supabase-js a menos que usemos una llamada raw o RPC.
    // Pero podemos comprobar si RLS está bloqueando las operaciones intentando hacer un insert/update con la clave ANON vs SERVICE_ROLE.
    
    console.log("Comprobando comportamiento con ANON_KEY...");
    const anonClient = createClient(supabaseUrl, config.VITE_SUPABASE_ANON_KEY);
    
    const { data: anonData, error: anonError } = await anonClient
        .from('sent_emails')
        .update({ tracking_status: 'opened' })
        .eq('id', '1b1e6740-8c0b-4baa-a954-80899ed904b7');
        
    if (anonError) {
        console.log("❌ ANON_KEY falló al hacer UPDATE (esperado si RLS está activo):", anonError.message);
    } else {
        console.log("✅ ANON_KEY pudo hacer UPDATE en sent_emails. RLS podría estar desactivado o permitirlo.");
    }
}

inspectPolicies();

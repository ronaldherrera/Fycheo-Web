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

async function testRpc() {
    const emailId = 'aa073d17-9c70-4e44-a279-4095448c79f2'; // ID del correo de prueba
    console.log("Probando primera llamada a RPC append_email_open...");
    
    await supabase.rpc('append_email_open', {
        email_id: emailId,
        open_time: new Date().toISOString()
    });

    console.log("Esperando 1 segundo para la segunda llamada...");
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log("Probando segunda llamada a RPC append_email_open...");
    await supabase.rpc('append_email_open', {
        email_id: emailId,
        open_time: new Date().toISOString()
    });
    
    // Verificar si se actualizó el registro y cuántas aperturas hay
    const { data: email, error: readError } = await supabase
        .from('sent_emails')
        .select('*')
        .eq('id', emailId)
        .single();
        
    if (readError) {
        console.error("Error al leer el correo actualizado:", readError);
    } else {
        console.log("Estado actual del correo en base de datos:");
        console.log("Tracking Status:", email.tracking_status);
        console.log("Opened At:", email.opened_at);
        console.log("Opens Data length:", email.opens_data?.length);
        console.log("Opens Data:", email.opens_data);
    }
}

testRpc();

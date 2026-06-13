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

async function resetEmail() {
    const emailId = '1b1e6740-8c0b-4baa-a954-80899ed904b7';
    console.log("Restableciendo correo a estado 'sent'...");
    const { error } = await supabase
        .from('sent_emails')
        .update({
            tracking_status: 'sent',
            opened_at: null,
            opens_data: []
        })
        .eq('id', emailId);
        
    if (error) {
        console.error("Error al restablecer:", error);
    } else {
        console.log("✅ Correo restablecido con éxito.");
    }
}

resetEmail();

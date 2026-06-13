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

async function inspectEmails() {
    console.log("Obteniendo los últimos correos de sent_emails...");
    const { data, error } = await supabase
        .from('sent_emails')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);
    
    if (error) {
        console.error("Error al obtener sent_emails:", error);
    } else {
        console.log("Últimos correos encontrados:");
        data.forEach(email => {
            console.log("--------------------------------------------------");
            console.log("ID:", email.id);
            console.log("Created At:", email.created_at);
            console.log("To:", email.to_email);
            console.log("Subject:", email.subject);
            console.log("Tracking Status:", email.tracking_status);
            console.log("Opened At:", email.opened_at);
            console.log("Opens Data:", email.opens_data);
            console.log("Recipients:", email.recipients);
        });
    }
}

inspectEmails();

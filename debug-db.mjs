
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rpegpsxexyzyxrgpkbpj.supabase.co';
const supabaseKey = 'sb_publishable_r5e6hp2h-KT7Qyg_qAyh9Q_p_HiLPYd'; // Esta key parece sospechosa (sb_publishable?), normalmente es eyJ... 
// Verificaré si funciona. Si falla auth, es la key.

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
    console.log("Probando conexión a Supabase:", supabaseUrl);
    
    // 1. Probar fetch simple a tabla pública para ver si conecta
    // Como no sabemos tablas, probamos companies directo
    const { data, error } = await supabase.from('companies').select('*').limit(1);
    
    if (error) {
        console.error("Error al obtener companies:", JSON.stringify(error, null, 2));
    } else {
        console.log("Éxito al obtener companies. Registros:", data.length);
        console.log(data);
    }
}

testConnection();

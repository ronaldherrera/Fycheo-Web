import { createClient } from '@supabase/supabase-js';
import readline from 'readline';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  console.error("❌ Error: Falta VITE_SUPABASE_URL en el archivo .env");
  process.exit(1);
}

if (!serviceRoleKey) {
  console.error("❌ Error: Falta SUPABASE_SERVICE_ROLE_KEY en el archivo .env. Añádela para generar enlaces sin enviar correos.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Introduce el correo electrónico del usuario a recuperar: ', async (email) => {
  if (!email || !email.trim()) {
    console.error("❌ Error: Debes introducir un correo electrónico válido.");
    rl.close();
    process.exit(1);
  }

  const targetEmail = email.trim();
  console.log(`Generando enlace de restablecimiento para: ${targetEmail}...`);

  try {
    const { data, error } = await supabase.auth.admin.generateLink({
      type: 'recovery',
      email: targetEmail,
      options: {
        // Redirigir a la web local con el parámetro de origen de la app
        redirectTo: 'http://localhost:3002/restablecer-contraseña?origin=app'
      }
    });

    if (error) {
      throw error;
    }

    console.log("\n=======================================================");
    console.log("✅ ENLACE GENERADO CON ÉXITO");
    console.log("=======================================================");
    console.log("Copia y pega la siguiente URL directamente en tu navegador:");
    console.log("\n" + data.properties.action_link + "\n");
    console.log("=======================================================");

  } catch (err) {
    console.error("❌ Error al generar el enlace:", err.message || err);
  } finally {
    rl.close();
  }
});


import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Manual env parser to avoid dependency on dotenv if not installed
function loadEnv(filePath) {
    if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf-8');
        content.split('\n').forEach(line => {
            const match = line.match(/^([^=]+)=(.*)$/);
            if (match) {
                const key = match[1].trim();
                const value = match[2].trim().replace(/^["']|["']$/g, ''); // Remove quotes
                if (!process.env[key]) {
                    process.env[key] = value;
                }
            }
        });
    }
}

// Load envs
const __dirname = path.resolve();
loadEnv(path.join(__dirname, '.env.local'));
loadEnv(path.join(__dirname, '.env'));

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY; 
// Note: ANON KEY uses RLS. The script simulates a "Client" action.
// If RLS allows Authenticated users to INSERT, we need to sign in first.

if (!supabaseUrl || !supabaseKey) {
    console.error("❌ Error: VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY not found in .env files");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function simulatePayment() {
    console.log("🚀 Iniciando Simulación de Pago Real...");

    const email = '3drealitylook@gmail.com'; 
    const amountNet = 100.00;
    const vatRate = 0.21;
    const vat = amountNet * vatRate;
    const total = amountNet + vat;

    console.log(`👤 Usuario: ${email}`);
    console.log(`💰 Importe Neto: ${amountNet}€`);
    console.log(`🧾 IVA (21%): ${vat.toFixed(2)}€`);
    console.log(`💳 Total Cargo Tarjeta: ${total.toFixed(2)}€`);

    // 1. Sign In to get User ID (and behave as the user for RLS)
    // NOTE: This requires the user's password. Since we don't have it, we might fail if RLS is strict.
    // However, migration_consolidate_transactions.sql added policies?
    // "Users can insert own invoices" (on invoices table).
    // Transactions table: "ALTER TABLE transactions DISABLE ROW LEVEL SECURITY;" (from migration_wallet.sql).
    // If RLS is DISABLED on transactions, we can insert without Auth if we have the User ID.
    // But better to fetch User ID first. We need SERVICE_ROLE_KEY to fetch user by email without password.
    // Let's check if SERVICE_ROLE_KEY is in env.
    
    let serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Often named this
    let adminClient = null;

    if (serviceKey) {
        console.log("🔑 Usando Service Role Key para operaciones administrativas...");
        adminClient = createClient(supabaseUrl, serviceKey);
    } else {
        console.warn("⚠️ No se encontró SUPABASE_SERVICE_ROLE_KEY. Intentando búsqueda limitada...");
    }

    // Try to get user ID
    let userId = null;
    let companyId = null;

    try {
        // If we have admin client, use it to find user by email
        if (adminClient) {
             const { data, error } = await adminClient.auth.admin.listUsers();
             const user = data.users.find(u => u.email === email);
             if (user) userId = user.id;
        } else {
            // Fallback: Try to "Sign In" with a known dummy password? No.
            // Assumption: The user ran `seed_by_email` which uses `auth.users` select.
            // We can't select from auth.users with anon key.
            // WE WILL ASK THE USER TO PROVIDE THE ID IF WE FAIL, or hardcode it if known.
            // Let's try to query 'profiles' if public?
            // "profiles" usually has RLS "Users can view own profile".
            // We are stuck without Auth.
            
            // HACK: For development, we can try to guess or use a hardcoded ID if the user provided one before?
            // No.
            
            // Let's assume the user has SERVICE_ROLE_KEY in .env. If not, script aborts.
            if (!serviceKey) throw new Error("Necesito SUPABASE_SERVICE_ROLE_KEY en .env para buscar el usuario por email.");
        }

        if (!userId) throw new Error("Usuario no encontrado: " + email);
        console.log(`✅ ID Usuario encontrado: ${userId}`);

        // Get Company (Optional, for personal wallet company_id is null)
        // Personal Wallet Simulation
        console.log("🔄 Ejecutando Recarga de Wallet Personal...");

        // 2. Insert Transaction
        const { error: txError } = await (adminClient || supabase).from('transactions').insert({
            user_id: userId,
            company_id: null,
            amount: amountNet, // NETO
            type: 'deposit',
            description: `Simulacion Pago Tarjeta - ${amountNet}€`,
            
            // Invoice Data
            invoice_number: `SIM-${Date.now()}`,
            invoice_concept: `Recarga Saldo (Simulada) - ${amountNet}€`,
            amount_net: amountNet,
            amount_vat: vat,
            amount_total: total,
            invoice_status: 'paid',
            is_individual_billing: true
        });

        if (txError) throw txError;
        console.log("✅ Transacción insertada correctamente.");

        // 3. Update Balance (Simulating Trigger)
        // Fetch current balance first to be nice
        const { data: profile } = await (adminClient || supabase).from('profiles').select('wallet_balance').eq('id', userId).single();
        const currentBal = profile?.wallet_balance || 0;
        const newBal = Number(currentBal) + Number(amountNet);

        const { error: balError } = await (adminClient || supabase).from('profiles').update({ wallet_balance: newBal }).eq('id', userId);
        if (balError) throw balError;

        console.log(`✅ Saldo actualizado: ${currentBal}€ -> ${newBal}€`);
        console.log("🎉 Simulación COMPLETADA con éxito.");

    } catch (e) {
        console.error("❌ Error en la simulación:", e.message);
        console.error("Asegúrate de tener SUPABASE_SERVICE_ROLE_KEY en tu .env si no estás logueado.");
    }
}

simulatePayment();

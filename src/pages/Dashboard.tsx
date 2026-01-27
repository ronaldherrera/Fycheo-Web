import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Building2, Users, CreditCard, ArrowUpRight, Plus, ExternalLink, MapPin, Briefcase, Check, ArrowLeft, ArrowRight, Upload, Loader2, X } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useToast } from '../context/ToastContext';

interface CompanySummary {
    id: string;
    name: string;
    plan: string;
    members_count: number;
    created_at: string;
    location?: string;
    logo_url?: string;
}

interface NewCompanyData {
    name: string;
    location: string;
    sector: string;
    tax_id: string; // NIF/CIF
    fiscal_name: string;
    fiscal_address: string;
    logo_url: string;
}

const initialCompanyData: NewCompanyData = {
    name: '',
    location: '',
    sector: '',
    tax_id: '',
    fiscal_name: '',
    fiscal_address: '',
    logo_url: ''
};

export const Dashboard = () => {
    const { toast, error: toastError, success: toastSuccess } = useToast();

    // Estados principales
    const [companies, setCompanies] = useState<CompanySummary[]>([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const [balance, setBalance] = useState(0);
    const [uploading, setUploading] = useState(false);

    // Estados Wizard
    const [showNewCompanyModal, setShowNewCompanyModal] = useState(false);
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<NewCompanyData>(initialCompanyData);
    const [selectedPlan, setSelectedPlan] = useState('basic');
    const [creating, setCreating] = useState(false);

    // Estados Facturas
    const [invoices, setInvoices] = useState<any[]>([]);

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;
            setUser(user);

            // 1. Obtener Saldo del Perfil
            const { data: profile } = await supabase
                .from('profiles')
                .select('wallet_balance')
                .eq('id', user.id)
                .single();
            
            if (profile) setBalance(profile.wallet_balance || 0);

            // 2. Obtener empresas
            // 2. Obtener empresas con miembros
            const { data: companiesData } = await supabase
                .from('companies')
                .select(`
                    *,
                    company_members (
                        role
                    )
                `);
            
            if (companiesData) {
                const mapped = companiesData.map((c: any) => {
                    // Contar solo los que NO son admin (o son employee)
                    // Asumimos que el gestor es 'admin' u 'owner'.
                    // El usuario pide "solo los que tienen la app vinculada", se entiende rol 'employee'.
                    const employeeCount = c.company_members?.filter((m: any) => m.role === 'employee').length || 0;
                    
                    return {
                        id: c.id,
                        name: c.name,
                        plan: c.plan,
                        members_count: employeeCount,
                        location: c.location || '',
                        created_at: c.created_at,
                        logo_url: c.logo_url
                    };
                });
                setCompanies(mapped);
            }

            // 3. Obtener facturas
            const { data: invoicesData } = await supabase
                .from('invoices')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });
            
            if (invoicesData) setInvoices(invoicesData);

        } catch (error) {
            console.error("Error loading dashboard", error);
        } finally {
            setLoading(false);
        }
    };

    const handleNextStep = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name) {
            toastError("El nombre de la empresa es obligatorio");
            return;
        }
        setStep(2);
    };

    const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        
        const file = e.target.files[0];
        setUploading(true);

        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('company-logos')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data } = supabase.storage.from('company-logos').getPublicUrl(filePath);
            
            setFormData(prev => ({ ...prev, logo_url: data.publicUrl }));
            // toastSuccess("Logo subido correctamente"); // Opcional
        } catch (error) {
            console.error('Error uploading logo:', error);
            toastError("Error al subir el logo");
        } finally {
            setUploading(false);
        }
    };

    const handleCreateCompany = async () => {
        setCreating(true);

        const prices: Record<string, number> = {
            'basic': 29,
            'pro': 49,
            'ultimate': 99
        };
        const cost = prices[selectedPlan] || 29;

        try {
            if (balance < cost) {
                toastError(`Saldo insuficiente. Necesitas ${cost}€ y tienes ${balance}€.`);
                setCreating(false);
                return;
            }

            const { data: { user } } = await supabase.auth.getUser();
            if(!user) return;
    
            // 1. Crear empresa con datos extendidos
            const { data: company, error: createError } = await supabase
                .from('companies')
                .insert({
                    name: formData.name,
                    plan: selectedPlan,
                    owner_id: user.id,
                    // Campos nuevos (asegurar que existen en BD o fallará si no se corrió la migración)
                    location: formData.location,
                    sector: formData.sector,
                    tax_id: formData.tax_id,
                    fiscal_name: formData.fiscal_name || formData.name,
                    fiscal_address: formData.fiscal_address,
                    logo_url: formData.logo_url
                })
                .select()
                .single();
    
            if (createError) throw createError;
    
            // 2. Auto-añadirme como admin
            const { error: memberError } = await supabase
                .from('company_members')
                .insert({
                    company_id: company.id,
                    user_id: user.id,
                    role: 'admin'
                });
                
            // if (memberError) console.warn("Member warn", memberError);

            // 3. Descontar saldo
            const newBalance = balance - cost;
            const { error: balanceError } = await supabase
                .from('profiles')
                .update({ wallet_balance: newBalance })
                .eq('id', user.id);

            if (balanceError) console.error("Error updating balance", balanceError);

            // 4. Generar Factura de Consumo (Suscripción)
            await supabase.from('invoices').insert({
                user_id: user.id,
                company_id: company.id,
                invoice_number: `FY-${new Date().toISOString().slice(0,10).replace(/-/g,'')}-${Math.random().toString(36).substring(2,6).toUpperCase()}`,
                concept: `Alta Empresa ${formData.name} - Plan ${selectedPlan.toUpperCase()}`,
                amount_net: cost,
                amount_vat: 0, 
                amount_total: cost,
                status: 'pagado',
                type: 'ticket'
            });
    
            // Reset y recargar
            setShowNewCompanyModal(false);
            setFormData(initialCompanyData);
            setStep(1);
            toastSuccess("¡Empresa y configuración creada con éxito!");
            loadDashboardData();
            
        } catch (err: any) {
            console.error(err);
            toastError('Error al crear empresa: ' + err.message);
        } finally {
            setCreating(false);
        }
    };

    // Estados Recarga
    const [showRechargeModal, setShowRechargeModal] = useState(false);
    const [recharging, setRecharging] = useState(false);
    const [rechargeAmount, setRechargeAmount] = useState(100);

    const handleRecharge = async () => {
        if (rechargeAmount < 10 || rechargeAmount > 5000) {
            toastError("La cantidad debe estar entre 10€ y 5.000€");
            return;
        }

        setRecharging(true);

        try {
            // 1. Simular retardo de pasarela de pago
            await new Promise(resolve => setTimeout(resolve, 2000));

            const { data: { user } } = await supabase.auth.getUser();
            if(!user) return;
            
            // 2. Actualizar saldo (Solo se suma el NETO)
            const newBalance = balance + rechargeAmount;

            const { error } = await supabase
                .from('profiles')
                .update({ wallet_balance: newBalance })
                .eq('id', user.id);

            if (error) throw error;

            // 3. Generar Factura de Recarga
            const vat = rechargeAmount * 0.21;
            const total = rechargeAmount + vat;

            await supabase.from('invoices').insert({
                user_id: user.id,
                invoice_number: `FY-${new Date().toISOString().slice(0,10).replace(/-/g,'')}-${Math.random().toString(36).substring(2,6).toUpperCase()}`,
                concept: `Recarga de Saldo - ${rechargeAmount}€`,
                amount_net: rechargeAmount,
                amount_vat: vat,
                amount_total: total,
                status: 'paid',
                type: 'invoice'
            });

            toastSuccess(`¡Pago completado! Se han añadido ${rechargeAmount}€ a tu saldo.`);
            setBalance(newBalance); 
            setShowRechargeModal(false);
            loadDashboardData(); // Recargar para ver factura nueva
        } catch (error: any) {
            console.error(error);
            toastError("Error al procesar el pago: " + error.message);
        } finally {
            setRecharging(false);
        }
    }

    const totalEmployees = companies.reduce((acc, curr) => acc + curr.members_count, 0);

    const plans = [
        { id: 'basic', name: 'Básico', price: 29, features: ['Hasta 5 empleados', 'Gestión básica', 'Soporte email'] },
        { id: 'pro', name: 'Pro', price: 49, features: ['Hasta 20 empleados', 'Gestión avanzada', 'Soporte prioritario', 'Control horario app'] },
        { id: 'ultimate', name: 'Ultimate', price: 99, features: ['Empleados ilimitados', 'Suite completa', 'Gestor dedicado', 'API Access'] },
    ];

    return (
        <div className="pt-8 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                 <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Hola, {user?.user_metadata?.full_name || 'Gestor'} 👋</h1>
                    <p className="text-slate-400">Bienvenido a tu panel de control global.</p>
                 </div>
                 <Button 
                    onClick={() => setShowRechargeModal(true)} 
                    className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25 border-0 px-6"
                >
                    <Plus className="w-5 h-5 mr-2" /> Recargar Saldo
                </Button>
            </div>

            {/* Modal Recarga de Saldo */}
            {showRechargeModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
                    <div className="bg-surface-dark rounded-2xl shadow-2xl border border-white/10 max-w-md w-full p-8 animate-in fade-in zoom-in duration-200">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-white">Recargar Saldo</h2>
                            <Button variant="ghost" size="icon" onClick={() => setShowRechargeModal(false)}>✕</Button>
                        </div>
                        
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Cantidad a Recargar (Neto)</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-3.5 text-slate-500">€</span>
                                    <input 
                                        type="number"
                                        min="10"
                                        max="5000"
                                        step="1"
                                        value={rechargeAmount}
                                        onChange={(e) => setRechargeAmount(Math.max(0, parseInt(e.target.value) || 0))}
                                        className="w-full pl-8 pr-4 py-3 rounded-xl bg-background-dark border border-white/10 text-white text-lg font-bold focus:ring-2 focus:ring-primary/50 outline-none"
                                    />
                                </div>
                                <p className="text-xs text-slate-500 mt-2">Mínimo 10€, Máximo 5.000€</p>
                            </div>

                            <div className="bg-white/5 rounded-xl p-4 space-y-2 text-sm">
                                <div className="flex justify-between text-slate-300">
                                    <span>Subtotal (Saldo Añadido)</span>
                                    <span>{rechargeAmount.toFixed(2)}€</span>
                                </div>
                                <div className="flex justify-between text-slate-300">
                                    <span>IVA (21%)</span>
                                    <span>{(rechargeAmount * 0.21).toFixed(2)}€</span>
                                </div>
                                <div className="border-t border-white/10 py-2 mt-2 flex justify-between font-bold text-white text-base">
                                    <span>Total a Pagar</span>
                                    <span>{(rechargeAmount * 1.21).toFixed(2)}€</span>
                                </div>
                            </div>

                            <Button 
                                onClick={handleRecharge} 
                                disabled={recharging || rechargeAmount < 10 || rechargeAmount > 5000}
                                className="w-full h-12 text-base shadow-glow"
                            >
                                {recharging ? 'Procesando Pago...' : `Pagar ${(rechargeAmount * 1.21).toFixed(2)}€`}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-surface-dark/50 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary/20 rounded-xl text-primary">
                            <Building2 className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-400 font-medium">Organizaciones</p>
                            <h3 className="text-2xl font-bold text-white">{companies.length}</h3>
                        </div>
                    </div>
                </div>
                
                <div className="bg-surface-dark/50 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                     <div className="flex items-center gap-4">
                        <div className="p-3 bg-emerald-500/20 rounded-xl text-emerald-500">
                            <Users className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-400 font-medium">Empleados Totales</p>
                            <h3 className="text-2xl font-bold text-white">{totalEmployees}</h3>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-blue-500/20 to-cyan-600/10 border border-blue-500/20 rounded-2xl p-6 relative overflow-hidden group">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-500/20 rounded-xl text-blue-400">
                                <CreditCard className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm text-blue-300 font-medium">Saldo Wallet</p>
                                <h3 className="text-2xl font-bold text-white">{balance.toFixed(2)}€</h3>
                            </div>
                        </div>
                    </div>

            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Companies List */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-white">Mis Organizaciones</h2>
                         <Button variant="outline" className="text-sm h-9" onClick={() => { setStep(1); setShowNewCompanyModal(true); }}>
                            <Plus className="w-4 h-4 mr-2" />Nueva Organización
                        </Button>
                    </div>

                    <div className="grid gap-4">
                        {companies.length === 0 ? (
                             <div className="bg-surface-dark/30 border border-white/5 rounded-2xl p-8 text-center">
                                <p className="text-slate-400 mb-4">No tienes organizaciones registradas aún.</p>
                                <Button onClick={() => { setStep(1); setShowNewCompanyModal(true); }}>
                                    Crear mi Primera Organización
                                </Button>
                             </div>
                        ) : (
                            companies.map((company) => {
                                const prices: Record<string, number> = { 'basic': 29, 'pro': 49, 'ultimate': 99 };
                                const price = prices[company.plan] || 0;
                                const nextPayment = (() => {
                                    if (!company.created_at) return 'N/A';
                                    const created = new Date(company.created_at);
                                    const now = new Date();
                                    let nextDate = new Date(now.getFullYear(), now.getMonth(), created.getDate());
                                    if (nextDate < now) {
                                        nextDate.setMonth(nextDate.getMonth() + 1);
                                    }
                                    return nextDate.toLocaleDateString();
                                })();

                                return (
                                <div key={company.id} className="bg-surface-dark border border-white/5 hover:border-primary/50 transition-all rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between group gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-start gap-4 mb-2">
                                            {/* Logo o Avatar */}
                                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-purple-500/20 border border-white/10 flex items-center justify-center overflow-hidden shrink-0">
                                                {company.logo_url ? (
                                                    <img src={company.logo_url} alt={company.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <span className="text-xl font-bold text-white tracking-tighter">
                                                        {company.name.substring(0, 2).toUpperCase()}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="flex flex-col gap-1">
                                                <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{company.name}</h3>
                                                <div className="flex items-center text-xs text-slate-500 font-medium uppercase tracking-wide">
                                                    <MapPin className="w-3 h-3 mr-1" />
                                                    {company.location}
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-6 mt-3">
                                            <div className="flex items-center gap-2 text-sm text-slate-400 bg-white/5 px-2 py-1 rounded-lg">
                                                <Users className="w-4 h-4 text-emerald-500" />
                                                <span><strong className="text-white">{company.members_count}</strong> Empleados</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-slate-400 bg-white/5 px-2 py-1 rounded-lg">
                                                <Briefcase className="w-4 h-4 text-purple-400" />
                                                <span><strong className="text-white">1</strong> Managers</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="text-right flex flex-col items-end gap-3 w-full sm:w-auto border-t sm:border-t-0 border-white/5 pt-4 sm:pt-0">
                                        <div className="text-xs text-slate-400 flex flex-col items-end gap-1">
                                            <div className="flex items-center gap-2">
                                                <span className="uppercase font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded text-[10px] tracking-wider">
                                                    Plan {company.plan}
                                                </span>
                                                <span className="text-white font-medium">{price}€/mes</span>
                                            </div>
                                            <span className="opacity-70">Próx. cargo: {nextPayment}</span>
                                        </div>

                                        <Button 
                                            variant="ghost" 
                                            className="w-full sm:w-auto border border-white/10 hover:border-primary/50 hover:bg-primary/10 text-white"
                                            onClick={() => window.open('http://localhost:5174', '_blank')}
                                        >
                                            Gestionar Organización <ArrowUpRight className="w-4 h-4 ml-2" />
                                        </Button>
                                    </div>
                                </div>
                            )})
                        )}
                    </div>
                </div>

                {/* Sidebar / Quick Actions */}
                <div className="space-y-6">
                     <div className="bg-surface-dark border border-white/10 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-white">Previsión de Gastos</h3>
                            {(() => {
                                const totalNextMonth = companies.reduce((acc, c) => {
                                    const prices: Record<string, number> = { 'basic': 29, 'pro': 49, 'ultimate': 99 };
                                    return acc + (prices[c.plan] || 0);
                                }, 0);
                                const isCovered = balance >= totalNextMonth;
                                
                                return (
                                    <span className={`text-xs font-bold px-2 py-0.5 rounded border ${isCovered ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
                                        {isCovered ? 'CUBIERTO' : 'ATENCIÓN'}
                                    </span>
                                );
                            })()}
                        </div>
                        
                        {(() => {
                            const totalNextMonth = companies.reduce((acc, c) => {
                                const prices: Record<string, number> = { 'basic': 29, 'pro': 49, 'ultimate': 99 };
                                return acc + (prices[c.plan] || 0);
                            }, 0);
                            const missing = Math.max(0, totalNextMonth - balance);
                            const isCovered = balance >= totalNextMonth;

                            return (
                                <div className="space-y-5">
                                    <div className="space-y-1">
                                        <div className="flex justify-between text-sm text-slate-400">
                                            <span>Renovación mensual</span>
                                            <span>{totalNextMonth.toFixed(2)}€</span>
                                        </div>
                                        <div className="flex justify-between text-sm text-slate-400">
                                            <span>Saldo en Wallet</span>
                                            <span className={isCovered ? 'text-emerald-400' : 'text-amber-400'}>{balance.toFixed(2)}€</span>
                                        </div>
                                        <div className="pt-2 border-t border-white/5 flex justify-between items-center mt-2">
                                            <span className="text-white font-medium">Estado</span>
                                            {isCovered ? (
                                                <span className="text-emerald-400 text-sm font-bold flex items-center gap-1">
                                                    <Check className="w-4 h-4" /> Pagos al día
                                                </span>
                                            ) : (
                                                <span className="text-amber-400 text-sm font-bold flex items-center gap-1">
                                                    falta {missing.toFixed(2)}€
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {!isCovered && (
                                        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3">
                                            <p className="text-amber-200 text-xs mb-3 leading-relaxed">
                                                Tu saldo es insuficiente para las próximas renovaciones. Recarga ahora para evitar interrupciones.
                                            </p>
                                            <Button 
                                                size="sm" 
                                                onClick={() => { setRechargeAmount(Math.max(10, Math.ceil(missing))); setShowRechargeModal(true); }}
                                                className="w-full bg-amber-600 hover:bg-amber-700 text-white border-0"
                                            >
                                                Recargar Saldo
                                            </Button>
                                        </div>
                                    )}

                                    {companies.length === 0 && totalNextMonth === 0 && (
                                        <p className="text-xs text-slate-500 italic text-center">No hay suscripciones activas.</p>
                                    )}
                                </div>
                            );
                        })()}

                        <div className="mt-6 pt-4 border-t border-white/5">
                            <Button 
                                variant="ghost" 
                                className="w-full text-xs text-slate-400 hover:text-white"
                                onClick={() => window.open('https://fycheo.com/help', '_blank')}
                            >
                                Centro de Ayuda <ExternalLink className="w-3 h-3 ml-2" />
                            </Button>
                        </div>
                     </div>

                     <div className="bg-surface-dark/30 border border-white/5 rounded-2xl p-6">
                        <h3 className="text-lg font-bold text-white mb-4">Últimos Movimientos</h3>
                        <div className="space-y-4">
                            {invoices.length === 0 ? (
                                <p className="text-slate-500 text-sm">No hay actividad reciente.</p>
                            ) : (
                                invoices.slice(0, 3).map((inv: any) => {
                                    const isRecharge = inv.concept.toLowerCase().includes('recarga');
                                    return (
                                        <div key={inv.id} className="flex items-center justify-between text-sm p-3 hover:bg-white/5 rounded-lg transition-colors group">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isRecharge ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-400'}`}>
                                                    {isRecharge ? <Plus className="w-4 h-4" /> : <ArrowRight className="w-4 h-4 -rotate-45" />}
                                                </div>
                                                <div>
                                                    <p className="text-white font-medium truncate max-w-[140px]" title={inv.concept}>
                                                        {isRecharge ? 'Recarga de Saldo' : 'Pago de Servicio'}
                                                    </p>
                                                    <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">
                                                        {new Date(inv.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className={`font-bold block ${isRecharge ? 'text-emerald-400' : 'text-white'}`}>
                                                    {isRecharge ? '+' : '-'}{Math.abs(inv.amount_net).toFixed(2)}€
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                        <Button variant="link" className="w-full mt-4 text-slate-400 text-xs hover:text-white transition-colors" onClick={() => window.location.href='/billing?tab=ticket'}>
                            Ver facturación completa →
                        </Button>
                     </div>
                </div>
            </div>

            {/* Modal Wizard Nueva Empresa */}
            {showNewCompanyModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-surface-dark rounded-2xl shadow-2xl border border-white/10 max-w-2xl w-full flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in duration-200">
                        {/* Header Wizard */}
                        <div className="p-8 border-b border-white/10 pb-4">
                             <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-white">Nueva Organización</h2>
                                <Button variant="ghost" size="icon" onClick={() => setShowNewCompanyModal(false)}>✕</Button>
                             </div>
                             
                             {/* Stepper Visual */}
                             <div className="flex items-center gap-4 text-sm font-medium">
                                <div className={`flex items-center gap-2 ${step >= 1 ? 'text-primary' : 'text-slate-500'}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 1 ? 'border-primary bg-primary/20' : 'border-slate-600'}`}>1</div>
                                    <span>Datos Organización</span>
                                </div>
                                <div className="h-0.5 w-12 bg-white/10"></div>
                                <div className={`flex items-center gap-2 ${step >= 2 ? 'text-primary' : 'text-slate-500'}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 2 ? 'border-primary bg-primary/20' : 'border-slate-600'}`}>2</div>
                                    <span>Selección Plan</span>
                                </div>
                             </div>
                        </div>

                        {/* Content Wizard */}
                        <div className="flex-1 overflow-y-auto p-8">
                            {step === 1 ? (
                                <form id="step1-form" onSubmit={handleNextStep} className="space-y-6">
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold text-white/90 border-b border-white/5 pb-2">Información General</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-300 mb-1">Nombre Comercial <span className="text-red-400">*</span></label>
                                                <div className="relative">
                                                    <Building2 className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                                                    <input 
                                                        type="text" required
                                                        value={formData.name}
                                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-background-dark border border-white/10 text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all placeholder:text-slate-600"
                                                        placeholder="Ej. Tech Solutions SL"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-300 mb-1">Sector / Industria</label>
                                                <div className="relative">
                                                    <Briefcase className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                                                    <input 
                                                        type="text"
                                                        value={formData.sector}
                                                        onChange={(e) => setFormData({...formData, sector: e.target.value})}
                                                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-background-dark border border-white/10 text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all placeholder:text-slate-600"
                                                        placeholder="Ej. Tecnología, Hostelería..."
                                                    />
                                                </div>
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-slate-300 mb-1">Ubicación / Sede Principal</label>
                                                <div className="relative">
                                                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                                                    <input 
                                                        type="text"
                                                        value={formData.location}
                                                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                                                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-background-dark border border-white/10 text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all placeholder:text-slate-600"
                                                        placeholder="Ej. Madrid, Barcelona..."
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4 pt-2">
                                        <h3 className="text-lg font-semibold text-white/90 border-b border-white/5 pb-2">Datos Fiscales (Opcional)</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-300 mb-1">Razón Social</label>
                                                <input 
                                                    type="text"
                                                    value={formData.fiscal_name}
                                                    onChange={(e) => setFormData({...formData, fiscal_name: e.target.value})}
                                                    className="w-full px-4 py-3 rounded-xl bg-background-dark border border-white/10 text-white focus:ring-2 focus:ring-primary/50 outline-none placeholder:text-slate-600"
                                                    placeholder="Si es diferente al comercial"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-300 mb-1">NIF / CIF</label>
                                                <input 
                                                    type="text"
                                                    value={formData.tax_id}
                                                    onChange={(e) => setFormData({...formData, tax_id: e.target.value})}
                                                    className="w-full px-4 py-3 rounded-xl bg-background-dark border border-white/10 text-white focus:ring-2 focus:ring-primary/50 outline-none placeholder:text-slate-600"
                                                    placeholder="Ej. B12345678"
                                                />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-slate-300 mb-1">Dirección Fiscal Completa</label>
                                                <input 
                                                    type="text"
                                                    value={formData.fiscal_address}
                                                    onChange={(e) => setFormData({...formData, fiscal_address: e.target.value})}
                                                    className="w-full px-4 py-3 rounded-xl bg-background-dark border border-white/10 text-white focus:ring-2 focus:ring-primary/50 outline-none placeholder:text-slate-600"
                                                    placeholder="Calle, Número, CP, Ciudad..."
                                                />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-slate-300 mb-1">Logo de la Empresa</label>
                                                <div className="flex items-center gap-4">
                                                    <div className="relative w-16 h-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden shrink-0 group">
                                                        {formData.logo_url ? (
                                                            <>
                                                                <img 
                                                                    src={formData.logo_url} 
                                                                    alt="Preview" 
                                                                    className="w-full h-full object-cover"
                                                                />
                                                                <button 
                                                                    type="button"
                                                                    onClick={() => setFormData({...formData, logo_url: ''})}
                                                                    className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                                                >
                                                                    <X className="w-5 h-5 text-white" />
                                                                </button>
                                                            </>
                                                        ) : (
                                                            <Building2 className="w-8 h-8 text-slate-500" />
                                                        )}
                                                        {uploading && (
                                                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                                                <Loader2 className="w-5 h-5 text-primary animate-spin" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex-1">
                                                        <label className={`
                                                            inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-colors cursor-pointer
                                                            ${uploading ? 'bg-slate-800 border-white/10 text-slate-500 cursor-not-allowed' : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white'}
                                                        `}>
                                                            <input 
                                                                type="file" 
                                                                className="hidden" 
                                                                accept="image/*"
                                                                onChange={handleLogoUpload}
                                                                disabled={uploading}
                                                            />
                                                            <Upload className="w-4 h-4" />
                                                            {uploading ? 'Subiendo...' : 'Subir Imagen'}
                                                        </label>
                                                        <p className="text-xs text-slate-500 mt-2">Recomendado: 400x400px. Máx 2MB.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            ) : (
                                <div className="space-y-6">
                                    <div className="text-center mb-6">
                                        <p className="text-slate-400">Selecciona el plan que mejor se adapte a tu equipo.</p>
                                        <p className="text-sm text-emerald-400 mt-1">Saldo disponible: {balance.toFixed(2)}€</p>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {plans.map(plan => (
                                            <div 
                                                key={plan.id}
                                                onClick={() => setSelectedPlan(plan.id)}
                                                className={`cursor-pointer relative p-4 rounded-xl border-2 transition-all duration-200 ${selectedPlan === plan.id ? 'border-primary bg-primary/10 shadow-glow' : 'border-white/10 bg-surface-dark hover:border-white/30'}`}
                                            >
                                                {selectedPlan === plan.id && (
                                                    <div className="absolute -top-3 -right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white shadow-lg">
                                                        <Check className="w-4 h-4" />
                                                    </div>
                                                )}
                                                <h4 className="font-bold text-white text-lg">{plan.name}</h4>
                                                <div className="flex items-baseline gap-1 my-2">
                                                    <span className="text-2xl font-bold text-white">{plan.price}€</span>
                                                    <span className="text-xs text-slate-400">/mes</span>
                                                </div>
                                                <ul className="space-y-2 mt-4">
                                                    {plan.features.map((feat, i) => (
                                                        <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                                                            <Check className="w-3 h-3 text-primary shrink-0 mt-0.5" />
                                                            {feat}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="text-center mt-6">
                                <a 
                                    href="/plan-details" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-sm text-primary hover:text-primary/80 inline-flex items-center gap-1 transition-colors"
                                >
                                    Ver comparativa completa de planes
                                    <ExternalLink className="w-3 h-3" />
                                </a>
                            </div>
                        </div>

                        {/* Footer Wizard */}
                        <div className="p-6 border-t border-white/10 bg-surface-dark/50 flex justify-between items-center gap-4">
                            {step === 1 ? (
                                <>
                                    <Button variant="ghost" onClick={() => setShowNewCompanyModal(false)}>
                                        Cancelar
                                    </Button>
                                    <div className="flex-1"></div>
                                    <Button form="step1-form" type="submit" className="group">
                                        Siguiente Paso <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button variant="ghost" onClick={() => setStep(1)}>
                                        <ArrowLeft className="w-4 h-4 mr-2" /> Atrás
                                    </Button>
                                    <div className="flex-1"></div>
                                    
                                    {(() => {
                                        const planPrice = plans.find(p => p.id === selectedPlan)?.price || 0;
                                        const hasBalance = balance >= planPrice;
                                        const missing = planPrice - balance;

                                        return hasBalance ? (
                                            <Button 
                                                onClick={handleCreateCompany} 
                                                disabled={creating}
                                                className="min-w-[150px]"
                                            >
                                                {creating ? 'Procesando...' : `Pagar ${planPrice}€ y Crear`}
                                            </Button>
                                        ) : (
                                            <Button 
                                                onClick={() => { 
                                                    setRechargeAmount(Math.max(10, Math.ceil(missing))); 
                                                    setShowRechargeModal(true); 
                                                }}
                                                className="min-w-[150px] bg-red-500 hover:bg-red-600 border-0"
                                            >
                                                Recargar {Math.max(10, Math.ceil(missing))}€ (Falta Saldo)
                                            </Button>
                                        );
                                    })()}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

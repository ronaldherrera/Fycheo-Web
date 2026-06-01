import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Users, MapPin, Plus, ArrowUpRight, X, Wallet, AlertTriangle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useToast } from '../context/ToastContext';
import { cn } from '../lib/utils';
import { RechargeModal } from '../components/RechargeModal';

interface Company {
    id: string;
    name: string;
    plan: string;
    members_count: number;
    created_at: string;
    location?: string;
    logo_url?: string;
    sector?: string;
    fiscal_name?: string;
    tax_id?: string;
    wallet_balance?: number;
    individual_billing?: boolean;
}

interface NewCompanyData {
    name: string;
    location: string;
    sector: string;
    tax_id: string;
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

export const Companies = () => {
    const { error: toastError, success: toastSuccess } = useToast();
    const [companies, setCompanies] = useState<Company[]>([]);
    const [loading, setLoading] = useState(true);

    // Wizard Create Company
    const [showNewCompanyModal, setShowNewCompanyModal] = useState(false);
    const [formData, setFormData] = useState<NewCompanyData>(initialCompanyData);
    const [creating, setCreating] = useState(false);
    const [uploading, setUploading] = useState(false);

    // Recharge Modal
    const [rechargingCompany, setRechargingCompany] = useState<Company | null>(null);

    useEffect(() => {
        loadCompanies();
    }, []);

    const loadCompanies = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { data: companiesData } = await supabase
                .from('companies')
                .select(`
                    *,
                    company_members ( 
                        user_id,
                        role 
                    )
                `);
            
            if (companiesData) {
                // Filtrar solo las empresas donde el usuario actual es dueño o tiene un rol administrativo
                const managedCompanies = companiesData.filter((c: any) => {
                    const isOwner = c.owner_id === user.id;
                    const myMember = c.company_members?.find((m: any) => m.user_id === user.id);
                    const isAdmin = myMember && ['admin', 'hr', 'manager'].includes(myMember.role);
                    return isOwner || isAdmin;
                });

                const mapped = managedCompanies.map((c: any) => ({
                    id: c.id,
                    name: c.name,
                    plan: c.plan,
                    members_count: c.company_members?.filter((m: any) => m.role === 'employee').length || 0,
                    location: c.location || '',
                    created_at: c.created_at,
                    logo_url: c.logo_url,
                    sector: c.sector,
                    fiscal_name: c.fiscal_name,
                    tax_id: c.tax_id,
                    wallet_balance: c.wallet_balance,
                    individual_billing: c.individual_billing
                }));
                setCompanies(mapped);
            }
        } catch (error) {
            console.error("Error loading companies", error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        const file = e.target.files[0];
        setUploading(true);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}.${fileExt}`;
            const { error: uploadError } = await supabase.storage.from('company-logos').upload(fileName, file);
            if (uploadError) throw uploadError;
            const { data } = supabase.storage.from('company-logos').getPublicUrl(fileName);
            setFormData(prev => ({ ...prev, logo_url: data.publicUrl }));
        } catch (error) {
            toastError("Error al subir logo");
        } finally {
            setUploading(false);
        }
    };

    const handleCreateCompany = async () => {
        setCreating(true);
        // NOTA: Simplificado sin coste de wallet por brevedad, asumir llamada a API real o replicar lógica completa de Dashboard si se requiere cobro.
        // Aquí replicamos la inserción básica.
        try {
             const { data: { user } } = await supabase.auth.getUser();
             if(!user) return;

             const { data: company, error: createError } = await supabase
                .from('companies')
                .insert({
                    name: formData.name,
                    plan: 'basic', // Default plan if selector removed
                    owner_id: user.id,
                    location: formData.location,
                    sector: formData.sector,
                    tax_id: formData.tax_id,
                    fiscal_name: formData.fiscal_name || formData.name,
                    fiscal_address: formData.fiscal_address,
                    logo_url: formData.logo_url
                })
                .select().single();

            if (createError) throw createError;

            await supabase.from('company_members').insert({
                company_id: company.id,
                user_id: user.id,
                role: 'admin'
            });

            toastSuccess("Empresa creada con éxito");
            setShowNewCompanyModal(false);
            setFormData(initialCompanyData);
            loadCompanies();
        } catch (error: any) {
            toastError("Error: " + error.message);
        } finally {
            setCreating(false);
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center text-white">Cargando...</div>;

    return (
        <div className="pt-8 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col min-[900px]:flex-row min-[900px]:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Mis Organizaciones</h1>
                    <p className="text-slate-400">Gestiona tus empresas y configuraciones</p>
                </div>
                <Button onClick={() => setShowNewCompanyModal(true)} className="bg-primary hover:bg-primary-dark">
                    <Plus className="w-5 h-5 mr-2" /> Nueva Organización
                </Button>
            </div>

            <div className="space-y-4">
                {companies.map(company => {
                    const prices: Record<string, number> = { 'basic': 29, 'pro': 49, 'ultimate': 99 };
                    const price = prices[company.plan] || 0;

                    return (
                        <div key={company.id} className="group relative bg-surface-dark border border-white/10 rounded-xl overflow-hidden flex flex-col hover:border-primary/50 transition-all">
                            
                            {/* Warning Banner */}
                            {company.individual_billing && (company.wallet_balance || 0) < price && (
                                <div className="w-full bg-amber-500/10 border-b border-amber-500/20 px-6 py-2 flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-amber-500">
                                        <AlertTriangle className="w-4 h-4" />
                                        <span className="text-xs font-bold">ATENCIÓN: Tu saldo es insuficiente para las próximas renovaciones.</span>
                                    </div>
                                    <Button 
                                        size="sm"
                                        className="h-6 text-xs bg-amber-500 text-black hover:bg-amber-600 border-0"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setRechargingCompany(company);
                                        }}
                                    >
                                        Recargar
                                    </Button>
                                </div>
                            )}

                            <div className="p-4 md:p-6 flex flex-col min-[1250px]:flex-row min-[1250px]:items-center justify-between gap-6">
                                
                                {/* Identidad de la Empresa */}
                                <div className="flex items-center gap-4 flex-1 min-w-0">
                                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/20 border border-white/10 flex items-center justify-center overflow-hidden shrink-0">
                                        {company.logo_url ? (
                                            <img src={company.logo_url} alt={company.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="text-2xl font-bold text-white tracking-tighter">
                                                {company.name.substring(0, 2).toUpperCase()}
                                            </span>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white leading-tight mb-1">{company.name}</h3>
                                        <div className="flex items-center text-xs text-slate-500 uppercase tracking-wide gap-2">
                                            <span className="bg-white/5 px-2 py-0.5 rounded text-slate-400 border border-white/5">Plan {company.plan}</span>
                                            {company.sector && <span>• {company.sector}</span>}
                                        </div>
                                    </div>
                                </div>

                                {/* Detalles / Métricas (Escritorio > 1024px) */}
                                <div className="flex items-center border-l border-r border-white/5 px-6 hidden min-[1250px]:flex">
                                    <div className="flex items-center gap-8">
                                        {company.individual_billing && (
                                            <div className="flex flex-col gap-0.5 w-24">
                                                <div className="flex items-center gap-1.5 text-slate-500">
                                                    <Wallet className="w-3.5 h-3.5" />
                                                    <span className="text-xs uppercase font-bold">Wallet</span>
                                                </div>
                                                <div>
                                                    <span className={cn(
                                                        "block w-full text-center px-2 py-0.5 rounded text-xs font-medium border truncate",
                                                        (company.wallet_balance || 0) < price
                                                            ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                                                            : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                                                    )}>
                                                        {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(company.wallet_balance || 0)}
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                        <div className="flex flex-col gap-0.5 w-28">
                                            <div className="flex items-center gap-1.5 text-slate-500">
                                                <MapPin className="w-3.5 h-3.5" />
                                                <span className="text-xs uppercase font-bold">Ubicación</span>
                                            </div>
                                            <div className="text-slate-300">
                                                <span className="truncate block">{company.location || 'N/A'}</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-0.5 w-36">
                                            <div className="flex items-center gap-1.5 text-slate-500">
                                                <Users className="w-3.5 h-3.5" />
                                                <span className="text-xs uppercase font-bold">Equipo</span>
                                            </div>
                                            <div className="text-slate-300">
                                                <span className="whitespace-nowrap block">{company.members_count} Empleados</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Detalles Saldo Móvil (Tablet/Móvil < 1024px) */}
                                {/* Detalles + Acciones Móvil (Tablet/Móvil < 1250px) */}
                                <div className="min-[1250px]:hidden flex flex-col min-[825px]:flex-row justify-between gap-4 border-t border-white/5 pt-4 mt-4 w-full">
                                    {/* Detalles Horizontal */}
                                    <div className="flex items-center gap-6 overflow-x-auto pb-1 flex-1 hide-scrollbar w-full">
                                        {company.individual_billing && (
                                            <div className="space-y-1 shrink-0">
                                                <span className="text-slate-500 text-xs uppercase font-bold block">Wallet</span>
                                                <span className={cn(
                                                    "inline-block px-3 py-1 rounded text-sm font-medium border",
                                                    (company.wallet_balance || 0) < price
                                                        ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                                                        : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                                                )}>
                                                    {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(company.wallet_balance || 0)}
                                                </span>
                                            </div>
                                        )}
                                        <div className="space-y-1 shrink-0">
                                            <span className="text-slate-500 text-xs uppercase font-bold block">Ubicación</span>
                                            <span className="text-white text-sm block truncate">{company.location || 'N/A'}</span>
                                        </div>
                                        <div className="space-y-1 shrink-0">
                                            <span className="text-slate-500 text-xs uppercase font-bold block">Equipo</span>
                                            <span className="text-white text-sm block">{company.members_count} Empleados</span>
                                        </div>
                                    </div>

                                    {/* Acciones: Horizontal en <825, Vertical en >=825 */}
                                    <div className="flex flex-row min-[825px]:flex-col gap-2 shrink-0 border-t min-[825px]:border-t-0 min-[825px]:border-l border-white/5 pt-4 min-[825px]:pt-0 min-[825px]:pl-4 w-full min-[825px]:w-auto">
                                        <Button 
                                            variant="outline" 
                                            className="justify-center border-white/10 hover:bg-primary/10 hover:border-primary/50 text-slate-300 hover:text-white h-8 text-xs px-3 w-full flex-1 min-[825px]:flex-none"
                                            onClick={() => window.open('http://localhost:5174', '_blank')}
                                        >
                                            <ArrowUpRight className="w-3 h-3 mr-2" /> 
                                            Manager
                                        </Button>
                                        <Button 
                                            variant="ghost" 
                                            className="justify-center text-slate-400 hover:text-white hover:bg-white/5 h-8 text-xs px-3 w-full flex-1 min-[825px]:flex-none"
                                            onClick={() => window.location.href = `/companies/${company.id}`}
                                        >
                                            Gestionar
                                        </Button>
                                    </div>
                                </div>

                                {/* Acciones Desktoop (> 1250px) */}
                                <div className="hidden min-[1250px]:flex flex-col gap-2 pt-0 w-auto shrink-0">
                                    <Button 
                                        variant="outline" 
                                        className="w-full justify-center border-white/10 hover:bg-primary/10 hover:border-primary/50 text-slate-300 hover:text-white"
                                        onClick={() => window.open('http://localhost:5174', '_blank')}
                                    >
                                        <ArrowUpRight className="w-4 h-4 mr-2" /> 
                                        Manager
                                    </Button>
                                    
                                    <Button 
                                        variant="ghost" 
                                        className="w-full justify-center text-slate-400 hover:text-white hover:bg-white/5"
                                        onClick={() => window.location.href = `/companies/${company.id}`}
                                    >
                                        Gestionar
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

             {/* Modal Wizard (Simplificado) */}
            {showNewCompanyModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-surface-dark rounded-2xl border border-white/10 max-w-2xl w-full flex flex-col max-h-[90vh] overflow-hidden">
                        <div className="p-6 border-b border-white/10 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-white">Nueva Organización</h2>
                            <Button variant="ghost" size="icon" onClick={() => setShowNewCompanyModal(false)}><X className="w-5 h-5" /></Button>
                        </div>
                        
                        <div className="p-6 overflow-y-auto">
                            {/* Solo Paso 1 para simplificar esta demo, idealmente reutilizar Wizard completo */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm text-slate-400 mb-1">Nombre</label>
                                    <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                     <div>
                                        <label className="block text-sm text-slate-400 mb-1">Sector</label>
                                        <input type="text" value={formData.sector} onChange={e => setFormData({...formData, sector: e.target.value})} className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary" />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-slate-400 mb-1">Ubicación</label>
                                        <input type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm text-slate-400 mb-1">Logo</label>
                                    <input type="file" onChange={handleLogoUpload} className="text-sm text-slate-400" />
                                    {uploading && <span className="text-xs text-primary ml-2">Subiendo...</span>}
                                    {formData.logo_url && <img src={formData.logo_url} className="h-10 w-10 object-cover rounded mt-2" />}
                                </div>
                                
                                <Button onClick={handleCreateCompany} className="w-full mt-4" disabled={creating || !formData.name}>
                                    {creating ? 'Creando...' : 'Crear Organización'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Modal Recharge (Real Stripe) */}
            {rechargingCompany && (
                <RechargeModal
                    isOpen={!!rechargingCompany}
                    onClose={() => setRechargingCompany(null)}
                    onSuccess={() => {
                        loadCompanies();
                        setRechargingCompany(null);
                    }}
                    companyId={rechargingCompany.id}
                    walletName={rechargingCompany.name}
                    walletImage={rechargingCompany.logo_url}
                    initialAmount={100}
                />
            )}
        </div>
    );
};

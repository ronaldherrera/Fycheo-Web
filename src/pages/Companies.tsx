import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Building2, Users, Briefcase, MapPin, Plus, ArrowUpRight, Loader2, X, Upload, MoreVertical, Settings, Trash2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useToast } from '../context/ToastContext';

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
    const [user, setUser] = useState<any>(null);

    // Wizard Create Company
    const [showNewCompanyModal, setShowNewCompanyModal] = useState(false);
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<NewCompanyData>(initialCompanyData);
    const [selectedPlan, setSelectedPlan] = useState('basic');
    const [creating, setCreating] = useState(false);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        loadCompanies();
    }, []);

    const loadCompanies = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;
            setUser(user);

            const { data: companiesData } = await supabase
                .from('companies')
                .select(`
                    *,
                    company_members ( role )
                `);
            
            if (companiesData) {
                const mapped = companiesData.map((c: any) => ({
                    id: c.id,
                    name: c.name,
                    plan: c.plan,
                    members_count: c.company_members?.filter((m: any) => m.role === 'employee').length || 0,
                    location: c.location || '',
                    created_at: c.created_at,
                    logo_url: c.logo_url,
                    sector: c.sector,
                    fiscal_name: c.fiscal_name,
                    tax_id: c.tax_id
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
                    plan: selectedPlan,
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
            setStep(1);
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
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Mis Organizaciones</h1>
                    <p className="text-slate-400">Gestiona tus empresas y configuraciones</p>
                </div>
                <Button onClick={() => setShowNewCompanyModal(true)} className="bg-primary hover:bg-primary-dark">
                    <Plus className="w-5 h-5 mr-2" /> Nueva Organización
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {companies.map(company => (
                    <div key={company.id} className="bg-surface-dark border border-white/10 rounded-2xl p-6 hover:border-primary/50 transition-all group relative">
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                             <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white">
                                <Settings className="w-4 h-4" />
                             </Button>
                        </div>

                        <div className="flex items-start gap-4 mb-4">
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/20 border border-white/10 flex items-center justify-center overflow-hidden shrink-0">
                                {company.logo_url ? (
                                    <img src={company.logo_url} alt={company.name} className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-xl font-bold text-white tracking-tighter">
                                        {company.name.substring(0, 2).toUpperCase()}
                                    </span>
                                )}
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white leading-tight mb-1">{company.name}</h3>
                                <div className="flex items-center text-xs text-slate-500 uppercase tracking-wide">
                                    <span className="bg-white/5 px-2 py-0.5 rounded text-slate-400 border border-white/5">Plan {company.plan}</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3 mb-6">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-slate-400 flex items-center gap-2"><MapPin className="w-4 h-4" /> Ubicación</span>
                                <span className="text-white">{company.location || 'N/A'}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-slate-400 flex items-center gap-2"><Briefcase className="w-4 h-4" /> Sector</span>
                                <span className="text-white">{company.sector || 'N/A'}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-slate-400 flex items-center gap-2"><Users className="w-4 h-4" /> Empleados</span>
                                <span className="text-white font-medium">{company.members_count}</span>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-white/5 flex gap-2">
                             <Button 
                                variant="outline" 
                                className="flex-1 text-xs"
                                onClick={() => window.open('http://localhost:5174', '_blank')}
                            >
                                <ArrowUpRight className="w-4 h-4 mr-2" /> Ir al Manager
                            </Button>
                        </div>
                    </div>
                ))}
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
        </div>
    );
};

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { User as UserIcon, Shield, LogOut, Lock, Key, CreditCard, Plus, Trash2, Smartphone, FileText, Loader2, X } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

interface PaymentMethod {
    id: string;
    brand: string;
    last4: string;
    exp_month: number;
    exp_year: number;
    is_default: boolean;
}

export const Account = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<any>(null);
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
    const [isEditingJob, setIsEditingJob] = useState(false);
    const [jobTitle, setJobTitle] = useState('');
    const [isEditingFiscal, setIsEditingFiscal] = useState(false);
    const [fiscalData, setFiscalData] = useState({
        fiscal_name: '',
        tax_id: '',
        fiscal_address: ''
    });

    // Estados para gestión de tarjetas
    const [showAddCard, setShowAddCard] = useState(false);
    const [addingCard, setAddingCard] = useState(false);
    const [newCard, setNewCard] = useState({
        brand: 'visa',
        last4: '',
        exp_month: '',
        exp_year: ''
    });

    useEffect(() => {
        const getSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                navigate('/register');
                return;
            }
            setUser(session.user);
            
            // Cargar perfil y metadatos
            if (session.user.user_metadata) {
                 setProfile(session.user.user_metadata);
                 setJobTitle(session.user.user_metadata.job_title || '');
                 setFiscalData({
                     fiscal_name: session.user.user_metadata.fiscal_name || '',
                     tax_id: session.user.user_metadata.tax_id || '',
                     fiscal_address: session.user.user_metadata.fiscal_address || ''
                 });
            }

            // Cargar métodos de pago reales
            const { data: methods } = await supabase
                .from('user_payment_methods')
                .select('*')
                .eq('user_id', session.user.id);
                
            if (methods && methods.length > 0) {
                setPaymentMethods(methods);
            } else {
                 setPaymentMethods([]);
            }

            setLoading(false);
        };
        getSession();
    }, [navigate]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/');
    };

    const handleAddCard = async (e: React.FormEvent) => {
        e.preventDefault();
        setAddingCard(true);

        // Validación básica
        if (!newCard.last4 || !newCard.exp_month || !newCard.exp_year) {
            alert("Por favor completa todos los campos");
            setAddingCard(false);
            return;
        }

        try {
            const { data, error } = await supabase
                .from('user_payment_methods')
                .insert({
                    user_id: user.id,
                    brand: newCard.brand,
                    last4: newCard.last4, // En producción no guardaríamos esto directo sin tokenización real
                    exp_month: parseInt(newCard.exp_month),
                    exp_year: parseInt(newCard.exp_year),
                    is_default: paymentMethods.length === 0 // Si es la primera, es default
                })
                .select()
                .single();

            if (error) throw error;

            setPaymentMethods(prev => [...prev, data]);
            setShowAddCard(false);
            setNewCard({ brand: 'visa', last4: '', exp_month: '', exp_year: '' });
        } catch (error) {
            console.error('Error adding card:', error);
            alert("Error al guardar la tarjeta");
        } finally {
            setAddingCard(false);
        }
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center text-white">Cargando...</div>;
    }

    return (
        <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-white">Mi Cuenta</h1>
                <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
                    <LogOut className="w-4 h-4" /> Cerrar Sesión
                </Button>
            </div>

            {/* Perfil */}
            <div className="bg-surface-dark/50 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8">
                 <h2 className="text-xl font-semibold text-white flex items-center gap-2 mb-6">
                    <UserIcon className="h-5 w-5 text-primary" />
                    Información Personal
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                         <label className="block text-sm font-medium text-slate-400 mb-1">Nombre Completo</label>
                         <div className="text-white text-lg font-medium">{profile?.full_name || 'Sin nombre'}</div>
                    </div>
                    <div>
                         <label className="block text-sm font-medium text-slate-400 mb-1">Correo Electrónico</label>
                         <div className="text-white text-lg font-medium">{user?.email}</div>
                    </div>
                    <div>
                         <label className="block text-sm font-medium text-slate-400 mb-1">Teléfono</label>
                         <div className="text-white text-lg font-medium">{profile?.phone || 'No especificado'}</div>
                    </div>
                     <div>
                         <label className="block text-sm font-medium text-slate-400 mb-1">Tipo de Perfil</label>
                         <div className="inline-flex items-center rounded-full bg-primary/20 px-3 py-1 text-sm font-medium text-primary capitalize">
                            {profile?.profile_type || 'Usuario'}
                         </div>
                    </div>
                    <div>
                         <label className="block text-sm font-medium text-slate-400 mb-1">ID de Usuario</label>
                         <div className="text-white text-sm font-mono bg-white/5 rounded px-2 py-1 inline-block">{user?.id}</div>
                    </div>
                     <div>
                         <label className="block text-sm font-medium text-slate-400 mb-1">Cargo / Puesto</label>
                         {isEditingJob ? (
                             <div className="flex gap-2">
                                <input 
                                    type="text" 
                                    value={jobTitle} 
                                    onChange={(e) => setJobTitle(e.target.value)} 
                                    className="bg-background border border-white/10 rounded px-2 py-1 text-white text-sm focus:border-primary outline-none"
                                />
                                <Button size="sm" onClick={async () => {
                                    const { error } = await supabase.auth.updateUser({
                                        data: { job_title: jobTitle }
                                    });
                                    if (!error) setIsEditingJob(false);
                                }}>Guardar</Button>
                             </div>
                         ) : (
                             <div 
                                className="text-white text-lg font-medium cursor-pointer hover:text-primary transition-colors flex items-center gap-2 group"
                                onClick={() => setIsEditingJob(true)}
                             >
                                {jobTitle || 'Añadir cargo...'}
                                <span className="text-xs text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">(Editar)</span>
                             </div>
                         )}
                    </div>
                </div>
            </div>

            {/* Información Fiscal */}
            <div className="bg-surface-dark/50 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8">
                 <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" />
                        Información Fiscal
                    </h2>
                    <Button variant="outline" size="sm" onClick={async () => {
                        if (isEditingFiscal) {
                            const { error } = await supabase.auth.updateUser({
                                data: { ...fiscalData }
                            });
                            if (!error) setIsEditingFiscal(false);
                        } else {
                            setIsEditingFiscal(true);
                        }
                    }}>
                        {isEditingFiscal ? 'Guardar' : 'Editar'}
                    </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="md:col-span-2">
                         <label className="block text-sm font-medium text-slate-400 mb-1">Razón Social / Nombre Facturación</label>
                         {isEditingFiscal ? (
                            <input 
                                type="text" 
                                value={fiscalData.fiscal_name} 
                                onChange={(e) => setFiscalData({...fiscalData, fiscal_name: e.target.value})} 
                                className="w-full bg-background border border-white/10 rounded px-3 py-2 text-white focus:border-primary outline-none"
                                placeholder="Nombre de la empresa o autónomo"
                            />
                         ) : (
                            <div className="text-white text-lg font-medium">{fiscalData.fiscal_name || 'No definido'}</div>
                         )}
                    </div>
                    <div>
                         <label className="block text-sm font-medium text-slate-400 mb-1">NIF / CIF</label>
                         {isEditingFiscal ? (
                            <input 
                                type="text" 
                                value={fiscalData.tax_id} 
                                onChange={(e) => setFiscalData({...fiscalData, tax_id: e.target.value.toUpperCase()})} 
                                className="w-full bg-background border border-white/10 rounded px-3 py-2 text-white focus:border-primary outline-none"
                                placeholder="12345678X"
                            />
                         ) : (
                            <div className="text-white text-lg font-medium">{fiscalData.tax_id || 'No definido'}</div>
                         )}
                    </div>
                    <div>
                         <label className="block text-sm font-medium text-slate-400 mb-1">Dirección Fiscal</label>
                         {isEditingFiscal ? (
                            <input 
                                type="text" 
                                value={fiscalData.fiscal_address} 
                                onChange={(e) => setFiscalData({...fiscalData, fiscal_address: e.target.value})} 
                                className="w-full bg-background border border-white/10 rounded px-3 py-2 text-white focus:border-primary outline-none"
                                placeholder="Calle, Número, Ciudad..."
                            />
                         ) : (
                            <div className="text-white text-lg font-medium">{fiscalData.fiscal_address || 'No definida'}</div>
                         )}
                    </div>
                </div>
            </div>

            {/* Métodos de Pago */}
            <div className="bg-surface-dark/50 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8">
                 <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                        <CreditCard className="h-5 w-5 text-primary" />
                        Métodos de Pago
                    </h2>
                    <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={() => setShowAddCard(true)}>
                        <Plus className="w-4 h-4" /> Añadir Tarjeta
                    </Button>
                </div>

                <div className="space-y-4">
                    {paymentMethods.length === 0 && (
                        <p className="text-slate-400 text-sm">No tienes métodos de pago guardados.</p>
                    )}
                    {paymentMethods.map(method => (
                        <div key={method.id} className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-8 bg-white/10 rounded flex items-center justify-center">
                                    <span className="font-bold text-xs uppercase text-slate-300">{method.brand}</span>
                                </div>
                                <div>
                                    <div className="text-white font-medium flex items-center gap-2">
                                        •••• {method.last4}
                                        {method.is_default && (
                                            <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">Por defecto</span>
                                        )}
                                    </div>
                                    <div className="text-sm text-slate-400">Caduca {method.exp_month}/{method.exp_year}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                {!method.is_default && (
                                    <button className="text-sm text-slate-400 hover:text-white px-3 py-1" onClick={() => setPaymentMethods(prev => prev.map(p => ({...p, is_default: p.id === method.id})))}>
                                        Hacer default
                                    </button>
                                )}
                                <button className="p-2 text-slate-400 hover:text-red-400 transition-colors">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Seguridad */}
             <div className="bg-surface-dark/50 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2 mb-6">
                    <Shield className="h-5 w-5 text-primary" />
                    Seguridad y Acceso
                </h2>
                
                <div className="space-y-6">
                    <div className="flex items-center justify-between py-4 border-b border-white/5">
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <Key className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-white font-medium">Contraseña</h3>
                                <p className="text-sm text-slate-400">Cambia tu contraseña periódicamente</p>
                            </div>
                        </div>
                        <Button variant="outline" onClick={() => alert("Simulación: Cambiar Contraseña")}>Modificar</Button>
                    </div>

                    <div className="flex items-center justify-between py-4 border-b border-white/5">
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-purple-500/10 rounded-lg">
                                <Smartphone className="w-5 h-5 text-purple-400" />
                            </div>
                            <div>
                                <h3 className="text-white font-medium">Autenticación en 2 pasos</h3>
                                <p className="text-sm text-slate-400">Aumenta la seguridad de tu cuenta</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-slate-500 mr-2">Próximamente</span>
                            <div className="w-10 h-6 bg-slate-700 rounded-full relative cursor-not-allowed opacity-50">
                                <div className="absolute left-1 top-1 w-4 h-4 bg-slate-400 rounded-full"></div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between py-4">
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-red-500/10 rounded-lg">
                                <LogOut className="w-5 h-5 text-red-400" />
                            </div>
                            <div>
                                <h3 className="text-white font-medium">Sesiones Activas</h3>
                                <p className="text-sm text-slate-400">Cierra sesión en todos los demás dispositivos</p>
                            </div>
                        </div>
                        <Button variant="outline" className="text-red-400 hover:text-red-300 border-red-900/50 hover:border-red-500/50 hover:bg-red-500/10" onClick={handleLogout}>
                            Cerrar Sesiones
                        </Button>
                    </div>
                </div>
            </div>

            {/* Modal Añadir Tarjeta */}
            {showAddCard && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-surface-dark border border-white/10 rounded-2xl p-6 w-full max-w-md relative">
                        <button 
                            onClick={() => setShowAddCard(false)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-white"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <CreditCard className="w-5 h-5 text-primary" />
                            Añadir Tarjeta
                        </h2>

                        <form onSubmit={handleAddCard} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Número de Tarjeta (Simulado: Últimos 4)</label>
                                <input
                                    type="text"
                                    maxLength={4}
                                    placeholder="4242"
                                    value={newCard.last4}
                                    onChange={(e) => setNewCard({...newCard, last4: e.target.value.replace(/\D/g,'')})}
                                    className="w-full bg-background border border-white/10 rounded px-3 py-2 text-white focus:border-primary outline-none"
                                />
                                <p className="text-xs text-slate-500 mt-1">Por seguridad, en este modo demo solo guardamos los últimos 4 dígitos.</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-1">Mes Exp.</label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="12"
                                        placeholder="MM"
                                        value={newCard.exp_month}
                                        onChange={(e) => setNewCard({...newCard, exp_month: e.target.value})}
                                        className="w-full bg-background border border-white/10 rounded px-3 py-2 text-white focus:border-primary outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-1">Año Exp.</label>
                                    <input
                                        type="number"
                                        min={new Date().getFullYear()}
                                        max={new Date().getFullYear() + 20}
                                        placeholder="YYYY"
                                        value={newCard.exp_year}
                                        onChange={(e) => setNewCard({...newCard, exp_year: e.target.value})}
                                        className="w-full bg-background border border-white/10 rounded px-3 py-2 text-white focus:border-primary outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Marca</label>
                                <select 
                                    value={newCard.brand}
                                    onChange={(e) => setNewCard({...newCard, brand: e.target.value})}
                                    className="w-full bg-background border border-white/10 rounded px-3 py-2 text-white focus:border-primary outline-none"
                                >
                                    <option value="visa">Visa</option>
                                    <option value="mastercard">Mastercard</option>
                                    <option value="amex">American Express</option>
                                </select>
                            </div>

                            <Button 
                                type="submit" 
                                className="w-full mt-4" 
                                disabled={addingCard}
                            >
                                {addingCard ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                        Guardando...
                                    </>
                                ) : 'Guardar Tarjeta'}
                            </Button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

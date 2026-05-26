import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ArrowLeft, Building2, Users, Loader2, Plus, Wallet, Download, Upload, MapPin, Copy, ArrowDownLeft, ArrowUpRight, ArrowRightLeft } from 'lucide-react';
import { WarningModal } from '../components/ui/WarningModal';
import { Button } from '../components/ui/Button';
import { useToast } from '../context/ToastContext';
import { cn } from '../lib/utils';
import { useDebounce } from '../hooks/useDebounce';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { RechargeModal } from '../components/RechargeModal';

interface CompanyDetails {
    id: string;
    name: string;
    fiscal_name: string;
    tax_id: string;
    location: string;
    sector: string;
    logo_url: string;
    plan: string;
    owner_id: string;
    wallet_balance?: number;
    individual_billing?: boolean;
    fiscal_address?: string;
}

interface Member {
    id: string;
    user_id: string;
    role: string;
    email?: string; // Join with profiles
    full_name?: string;
}

interface Transaction {
    id: string;
    amount: number;
    type: 'deposit' | 'purchase' | 'refund' | 'transfer' | 'withdrawal';
    description: string;
    created_at: string;
    invoice_number?: string;
    invoice_status?: string;
    amount_gross?: number;
    amount_vat?: number;
    payment_method?: string;
    payment_method_details?: string;
    companies?: {
        id: string;
        name: string;
    };
}

export const CompaniesSettings = () => {
    const { companyId } = useParams();
    const navigate = useNavigate();
    const { success, error: toastError } = useToast();
    
    const [loading, setLoading] = useState(true);
    const [company, setCompany] = useState<CompanyDetails | null>(null);
    const [members, setMembers] = useState<Member[]>([]);
    const [activeTab, setActiveTab] = useState<'team' | 'wallet' | 'settings'>('team');
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);

    // Form States
    const [name, setName] = useState('');
    const [fiscalName, setFiscalName] = useState('');
    const [taxId, setTaxId] = useState('');
    const [location, setLocation] = useState('');
    const [sector, setSector] = useState('');
    
    // Billing State
    const [individualBilling, setIndividualBilling] = useState(false);
    const [fiscalAddress, setFiscalAddress] = useState('');
    const [showDisableBillingModal, setShowDisableBillingModal] = useState(false);

    // Wallet State
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [transactionsLoading, setTransactionsLoading] = useState(false);
    
    // Recharge State
    const [showRechargeModal, setShowRechargeModal] = useState(false);
    const [hasWalletHistory, setHasWalletHistory] = useState(false);

    // Debounced values for auto-save
    const debouncedName = useDebounce(name, 1000);
    const debouncedSector = useDebounce(sector, 1000);
    const debouncedLocation = useDebounce(location, 1000);
    const debouncedTaxId = useDebounce(taxId, 1000);
    const debouncedFiscalName = useDebounce(fiscalName, 1000);
    const debouncedFiscalAddress = useDebounce(fiscalAddress, 1000);

    // Auto-save Effect
    useEffect(() => {
        if (!company || loading) return;

        // Check if values actually changed from initial company data to avoid initial save
        const hasChanges = 
            debouncedName !== (company.name || '') ||
            debouncedSector !== (company.sector || '') ||
            debouncedLocation !== (company.location || '') ||
            debouncedTaxId !== (company.tax_id || '') ||
            debouncedFiscalName !== (company.fiscal_name || '') ||
            debouncedFiscalAddress !== (company.fiscal_address || '') ||
            individualBilling !== (company.individual_billing || false);

        if (hasChanges) {
            handleSaveGeneral();
        }
    }, [
        debouncedName, 
        debouncedSector, 
        debouncedLocation, 
        debouncedTaxId, 
        debouncedFiscalName, 
        debouncedFiscalAddress,
        individualBilling
    ]);

    useEffect(() => {
        if(companyId) loadCompanyData();
    }, [companyId]);

    useEffect(() => {
        if(companyId && activeTab === 'wallet') loadTransactions();
    }, [companyId, activeTab]);

    // Realtime Subscription
    useEffect(() => {
        if (!companyId) return;

        const channel = supabase
            .channel(`company-wallet-${companyId}`)
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'transactions' },
                (payload: any) => {
                    // Client-side filtering just in case, though RLS should handle it
                    if (payload.new && payload.new.company_id === companyId) {

                        loadTransactions();
                        loadCompanyData(); 
                    }
                }
            )
            .on(
                'postgres_changes',
                { event: 'UPDATE', schema: 'public', table: 'companies', filter: `id=eq.${companyId}` },
                (_payload) => {
                    loadCompanyData();
                }
            )
            .subscribe((_status) => {

            });

        return () => {
            supabase.removeChannel(channel);
        };
    }, [companyId]);

    // Handle Stripe Redirects (Robustness)
    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const redirectStatus = query.get('redirect_status');
        
        console.log("Stripe Redirect Check:", redirectStatus);

        if (redirectStatus === 'succeeded') {
            // Clean URL
            window.history.replaceState({}, document.title, window.location.pathname);
            
            // Trigger success flow manually to avoid closure issues
            success("Saldo recargado correctamente. Actualizando...");
            
            // Polling logic inline
            // Simple delay to allow backend to process webhook
            setTimeout(() => {
                loadCompanyData();
                loadTransactions();
            }, 1000);
        }
    }, []);

    const getTypeConfig = (type: string) => {
        const t = type?.toLowerCase();
        switch (t) {
            case 'deposit':
            case 'refund':
                return { label: 'Ingreso', icon: ArrowDownLeft, color: 'text-emerald-500', isIncome: true };
            case 'purchase':
            case 'withdrawal':
                return { label: 'Gasto', icon: ArrowUpRight, color: 'text-red-500', isIncome: false };
            case 'transfer':
                return { label: 'Transferencia', icon: ArrowRightLeft, color: 'text-blue-500', isIncome: false }; 
            default:
                return { label: 'Gasto', icon: Wallet, color: 'text-slate-400', isIncome: false };
        }
    };



    const loadCompanyData = async () => {
        try {
            // Load Company
            const { data: companyData, error: err } = await supabase
                .from('companies')
                .select('*')
                .eq('id', companyId)
                .single();
            
            if (err) throw err;
            setCompany(companyData);
            
            // Init Form
            setName(companyData.name || '');
            setFiscalName(companyData.fiscal_name || '');
            setTaxId(companyData.tax_id || '');
            setLocation(companyData.location || '');
            setSector(companyData.sector || '');
            setIndividualBilling(companyData.individual_billing || false);
            setFiscalAddress(companyData.fiscal_address || '');

            // Load Members
            const { data: membersData } = await supabase
                .from('company_members')
                .select(`
                    *,
                    profiles:user_id ( full_name, email )
                `)
                .eq('company_id', companyId);

            if (membersData) {
                const mappedMembers = membersData.map((m: any) => ({
                    id: m.id,
                    user_id: m.user_id,
                    role: m.role,
                    email: m.profiles?.email,
                    full_name: m.profiles?.full_name
                }));
                setMembers(mappedMembers);
            }

            // Check for wallet history to keep tab visible
            const { count } = await supabase
                .from('transactions')
                .select('*', { count: 'exact', head: true })
                .eq('company_id', companyId);
            
            if (count && count > 0) {
                setHasWalletHistory(true);
            }

        } catch (error: any) {
            console.error(error);
            toastError(error.message || "Error cargando datos de la organización");
            navigate('/companies');
        } finally {
            setLoading(false);
        }
    };



    const loadTransactions = async () => {

        try {
            const { data, error } = await supabase
                .from('transactions')
                .select('*, companies(id, name)')
                .eq('company_id', companyId)
                .order('created_at', { ascending: false });
            
            if (error) throw error;
            setTransactions(data || []);
        } catch (err: any) {
            console.error(err);
            toastError("Error cargando transacciones");
        } finally {
            setTransactionsLoading(false);
        }
    };

    const handleSimulateSubscription = async () => {
        if (!companyId || !company) return;
        const amount = -29.00;
        
        // Verificar saldo suficiente (simulación local ya que triggers están desactivados)
        const currentBalance = company.wallet_balance || 0;
        if (currentBalance + amount < 0) {
            toastError(`Saldo insuficiente (${currentBalance.toFixed(2)}€) para realizar la operación.`);
            return;
        }

        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error("No autenticado");

            const simInvoiceNum = `REC-${Math.floor(100000 + Math.random() * 900000)}`;

            const { error: txError } = await supabase.from('transactions').insert({
                company_id: companyId,
                user_id: user.id,
                amount: amount,
                type: 'purchase',
                description: 'Cuota Mensual Plan Pro (Simulada)',
                payment_method: 'wallet',
                invoice_number: simInvoiceNum,
                created_at: new Date().toISOString()
            });
            if (txError) throw txError;

            // Manual Balance Update (since triggers disabled)
           const newBalance = (company.wallet_balance || 0) + amount;
           const { error: balError } = await supabase.from('companies').update({ wallet_balance: newBalance }).eq('id', companyId);
           if (balError) throw balError;

            success(`Simulación completada: ${amount}€`);
            loadTransactions();
            loadCompanyData();
        } catch (err: any) {
            toastError("Error simulando gasto: " + err.message);
        }
    };

    const [user, setUser] = useState<any>(null);

    const handleDownload = async (docItem: any) => {
        try {
            // Asegurar que tenemos el usuario para los datos fiscales (igual que en Billing.tsx)
            let currentUser = user;
            if (!currentUser) {
                const { data: { user: authUser } } = await supabase.auth.getUser();
                currentUser = authUser;
                setUser(authUser);
            }

            const doc = new jsPDF();
            // Note: In invoices list, we might have 'recharge' invoices too.
            // Check based on type or context. logic:
            const isRecharge = docItem.type === 'deposit' || docItem.type === 'refund';
            const isRefund = docItem.type === 'refund';

            // --- HEADER ---
            doc.setFontSize(20);
            doc.setTextColor(40, 40, 40);
            
            let title = 'FACTURA';
            let docNumLabel = 'Nº Factura';
            let fileNamePrefix = 'Factura';

            // Detectar transferencia de desactivación en el PDF
            const descriptionRawPDF = (docItem.description || '').toLowerCase();
            const isTransferPDF = docItem.type === 'transfer' && (
                descriptionRawPDF.includes('transferencia') || 
                descriptionRawPDF.includes('traspaso') ||
                descriptionRawPDF.includes('desactivación')
            );

            if (isRecharge) {
                title = isRefund ? 'FACTURA RECTIFICATIVA' : 'FACTURA RECARGA';
            } else if (isTransferPDF) {
                title = 'COMPROBANTE DE TRANSFERENCIA';
                docNumLabel = 'Referencia';
                fileNamePrefix = 'Transferencia';
            } else {
                title = 'TICKET / RECIBO';
                docNumLabel = 'Referencia';
                fileNamePrefix = 'Ticket';
            }
            
            doc.text(title, 14, 22);
            
            // --- DATOS DE FYCHEO ---
            doc.setFontSize(10);
            doc.setTextColor(100, 100, 100);
            doc.text(`Fycheo Inc.`, 14, 30);
            doc.text(`NIF: B-12345678`, 14, 35);
            doc.text(`C/ Innovación 101, Madrid`, 14, 40);
            
            // --- DATOS DE LA FACTURA ---
            doc.text(`Fecha: ${new Date(docItem.created_at).toLocaleDateString()}`, 130, 30);
            const invoiceNum = docItem.invoice_number || docItem.id.split('-')[0].toUpperCase();
            doc.text(`${docNumLabel}: ${invoiceNum}`, 130, 35);

            if (docItem.payment_method) {
                let methodLabel = docItem.payment_method;
                
                if (methodLabel === 'card' && docItem.payment_method_details) {
                     if (docItem.payment_method_details.includes('****')) {
                         methodLabel = docItem.payment_method_details;
                     } else {
                         methodLabel = 'Con Tarjeta';
                     }
                } else if (methodLabel === 'card') {
                     methodLabel = 'Con Tarjeta';
                } else {
                     methodLabel = methodLabel.charAt(0).toUpperCase() + methodLabel.slice(1);
                }
                
                doc.text(`Método: ${methodLabel}`, 130, 40);
            }
            


            // --- DATOS DEL CLIENTE ---
            doc.line(14, 45, 196, 45); // Separator
            
            doc.setFontSize(11);
            doc.setTextColor(0, 0, 0);
            doc.text("Datos del Cliente:", 14, 55);
            
            doc.setFontSize(10);
            doc.setTextColor(80, 80, 80);
            
            // Priorizar datos fiscales específicos (Igual que en Billing.tsx)
            const fiscalName = currentUser?.user_metadata?.fiscal_name || currentUser?.user_metadata?.full_name || currentUser?.email || 'N/D';
            const fiscalId = currentUser?.user_metadata?.tax_id || 'N/D';
            const fiscalAddr = currentUser?.user_metadata?.fiscal_address || 'N/D';

            doc.text(`Razón Social: ${fiscalName}`, 14, 62);
            doc.text(`NIF/CIF: ${fiscalId}`, 14, 67);
            doc.text(`Dirección: ${fiscalAddr}`, 14, 72);
            doc.text(`ID Wallet: ${currentUser?.id || 'N/D'}`, 14, 77);

            if (company?.name) {
                 doc.text(`Organización: ${company.name}`, 14, 82);
            }
            
            // --- CÁLCULOS ---
            // Usar importe bruto con Math.abs para evitar negativos en tickets de gasto
            const gross = Math.abs(docItem.amount_gross || docItem.amount_total || docItem.amount);
            let vat = 0;
            let net = gross;

            if (isRecharge && !isTransferPDF) {
                if (docItem.amount_vat !== undefined && docItem.amount_vat !== null) {
                    vat = Math.abs(docItem.amount_vat);
                } else {
                    vat = gross - (gross / 1.21);
                }
                net = gross - vat;
            } else {
                vat = 0;
                net = gross;
            }

            // --- TABLA ---
            // Clean concept
            let conceptLines = docItem.invoice_concept || docItem.description || docItem.concept || 'Movimiento';
            const descriptionRaw = (conceptLines || '').toLowerCase();
            if (isRecharge && (descriptionRaw.includes('recarga') || descriptionRaw.includes('stripe'))) {
                conceptLines = 'Recarga de Saldo';
            }

            const head = [['Concepto', 'Base Imponible', 'IVA', 'Total']];
            const body = [[
                conceptLines,
                `${Number(net).toFixed(2)}€`,
                `${Number(vat).toFixed(2)}€`,
                `${Number(gross).toFixed(2)}€`
            ]];

            autoTable(doc, {
                startY: 85,
                head: head,
                body: body,
                headStyles: { fillColor: isRefund ? [220, 38, 38] : [37, 99, 235] },
                styles: { fontSize: 10, cellPadding: 4 },
                columnStyles: {
                    0: { cellWidth: 80 },
                    1: { halign: 'right' },
                    2: { halign: 'right' },
                    3: { halign: 'right', fontStyle: 'bold' }
                }
            });
            
            // --- TOTAL ---
            const finalY = (doc as any).lastAutoTable.finalY + 10;
            
            doc.setFillColor(245, 245, 245);
            doc.rect(130, finalY, 60, 20, 'F');
            
            doc.setFontSize(12);
            doc.setTextColor(0, 0, 0);
            doc.text(`Total a Pagar:`, 135, finalY + 13);
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            // Formatear el total para que siempre se vea el signo si es negativo
            const totalStr = Number(gross).toFixed(2);
            doc.text(`${totalStr} €`, 185, finalY + 13, { align: 'right' });

            // Footer
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(8);
            doc.setTextColor(150, 150, 150);
            doc.text("Gracias por confiar en Fycheo.", 105, 280, { align: 'center' });
            
            doc.save(`${fileNamePrefix}_${invoiceNum}.pdf`);
            success("Documento descargado correctamente");
            
        } catch (err: any) {
            console.error(err);
            toastError("Error al generar el PDF");
        }
    };

    // Manual handleRecharge removed in favor of RechargeModal
    const handleRechargeSuccess = () => {

        // Remove explicit close, let RechargeModal handle it via onClose prop, just like Billing.tsx
        // setShowRechargeModal(false); 
        
        try {
            success("Saldo recargado correctamente. Actualizando...");
        } catch (e) {
            console.error("Error showing success toast:", e);
        }
        
        // Polling más agresivo (10 intentos cada 1s) para asegurar actualización (Igual que Billing.tsx)
        // Single update with delay
        setTimeout(() => {
            loadCompanyData();
            loadTransactions();
        }, 2500);
    };

    const handleSaveGeneral = async () => {
        setSaving(true);
        try {
            const { error } = await supabase
                .from('companies')
                .update({
                    name,
                    fiscal_name: fiscalName,
                    tax_id: taxId,
                    location,
                    sector,
                    individual_billing: individualBilling,
                    fiscal_address: fiscalAddress
                })
                .eq('id', companyId);

            if (error) throw error;
            if (error) throw error;
            
            // Update local company state to prevent stale closure issues and ensure "hasChanges" logic works correctly
            if (company) {
                setCompany({
                    ...company,
                    name,
                    fiscal_name: fiscalName,
                    tax_id: taxId,
                    location,
                    sector,
                    individual_billing: individualBilling,
                    fiscal_address: fiscalAddress
                });
            }
        } catch (err: any) {
            console.error("Auto-save error:", err);
            toastError("Error al guardar: " + err.message);
        } finally {
            setSaving(false);
        }
    };



    if (loading) return <div className="p-8 text-white">Cargando configuración...</div>;
    if (!company) return <div className="p-8 text-white">Organización no encontrada</div>;

    return (
        <div className="pt-8 pb-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8">
            
            {/* Recharge Modal (Stripe) */}
            <RechargeModal 
                isOpen={showRechargeModal}
                onClose={() => setShowRechargeModal(false)}
                onSuccess={handleRechargeSuccess}
                companyId={companyId}
                walletName={company?.name}
                walletImage={company?.logo_url}
                initialAmount={100}
            />

            {/* Disable Billing Warning Modal */}
            {/* Disable Billing Warning Modal */}
            <WarningModal
                isOpen={showDisableBillingModal}
                onClose={() => setShowDisableBillingModal(false)}
                onConfirm={async () => {
                    try {
                        setSaving(true);
                        // Registrar movimiento de salida/transferencia si hay saldo
                        const currentBalance = company.wallet_balance || 0;
                        if (currentBalance > 0) {
                            const { data: { user } } = await supabase.auth.getUser();
                            if (user) {
                                await supabase.from('transactions').insert({
                                    company_id: companyId,
                                    user_id: user.id,
                                    amount: -currentBalance, // Negativo para la empresa
                                    type: 'transfer',
                                    description: 'Transferencia de saldo al Wallet General (Desactivación)',
                                    created_at: new Date().toISOString()
                                });
                            }
                        }

                        // Call Secure RPC to transfer balance and disable billing
                        const { error } = await supabase.rpc(
                            'transfer_company_balance_to_owner', 
                            { company_uuid: companyId }
                        );

                        if (error) throw error;
                        
                        success("Facturación individual desactivada y saldo transferido");
                        setIndividualBilling(false);
                        setShowDisableBillingModal(false);
                        loadCompanyData(); // Refresh to show 0 balance and update history
                        loadTransactions();
                    } catch (err: any) {
                        toastError("Error: " + err.message);
                    } finally {
                        setSaving(false);
                    }
                }}
                title="¿Desactivar Facturación?"
                confirmText="Confirmar y Transferir"
            >
                <div>
                    <p className="text-sm text-slate-300 leading-relaxed">
                        Esta organización tiene <span className="text-white font-bold">{new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(company.wallet_balance || 0)}</span> de saldo disponible.
                    </p>
                    <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                        Al desactivar la facturación individual, este saldo se transferirá automáticamente a tu <strong>Wallet General</strong> y la organización dejará de tener su propia contabilidad.
                    </p>
                </div>
            </WarningModal>
            {/* Header */}
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="text-slate-400 hover:text-white">
                    <ArrowLeft className="w-5 h-5" />
                </Button>
                <div>
                     <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        {company.name} <span className="text-slate-500 text-base font-normal">/ Configuración</span>
                     </h1>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/10 space-x-6 overflow-x-auto">
                <button 
                    onClick={() => setActiveTab('team')}
                    className={cn(
                        "pb-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap",
                        activeTab === 'team' ? "border-primary text-primary" : "border-transparent text-slate-400 hover:text-white"
                    )}
                >
                    <Users className="w-4 h-4" /> Equipo
                </button>

                {(individualBilling || hasWalletHistory) && (
                    <button 
                        onClick={() => setActiveTab('wallet')}
                        className={cn(
                            "pb-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap",
                            activeTab === 'wallet' ? "border-primary text-primary" : "border-transparent text-slate-400 hover:text-white"
                        )}
                    >
                        <Wallet className="w-4 h-4" /> Wallet
                    </button>
                )}

                <button 
                    onClick={() => setActiveTab('settings')}
                    className={cn(
                        "pb-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap",
                        activeTab === 'settings' ? "border-primary text-primary" : "border-transparent text-slate-400 hover:text-white"
                    )}
                >
                    <Building2 className="w-4 h-4" /> Configuración
                </button>
            </div>

            {/* Content */}
            <div className="bg-surface-dark border border-white/10 rounded-2xl p-6 md:p-8 min-h-[400px]">
                
                {/* TEAM TAB (First) */}
                {activeTab === 'team' && (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-semibold text-white">Miembros del Equipo</h3>
                            <Button variant="outline" size="sm">Invitar Miembro</Button>
                        </div>
                        <div className="space-y-2">
                            {members.map(member => (
                                <div key={member.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                                            {(member.full_name || member.email || 'U').charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-white">{member.full_name || 'Usuario'}</div>
                                            <div className="text-xs text-slate-400">{member.email}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className={cn(
                                            "text-xs px-2 py-0.5 rounded uppercase font-bold tracking-wider",
                                            member.role === 'admin' ? "bg-purple-500/20 text-purple-300" : "bg-emerald-500/20 text-emerald-300"
                                        )}>
                                            {member.role}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* WALLET & BILLING TAB (Unified) */}
                {/* WALLET TAB (Simple + Simulación) */}
                {activeTab === 'wallet' && (
                   <div className="space-y-6">
                        {/* Balance Widget */}
                        {/* Balance Widget - Only show if billing is active */}
                        {individualBilling && (
                            <div className="bg-surface-dark/50 backdrop-blur-md border border-white/10 rounded-xl p-4 min-w-[280px]">
                                <div className="flex flex-col md:flex-row gap-3 justify-between items-end">
                                    <div>
                                        <p className="text-xs text-slate-400 font-medium">Saldo Disponible</p>
                                        <p className="text-2xl font-bold text-white mt-0.5">
                                            {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(company.wallet_balance || 0)}
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button 
                                            onClick={handleSimulateSubscription}
                                            variant="outline"
                                            className="border-white/10 text-slate-300 hover:text-white hover:bg-white/5 text-xs h-9"
                                        >
                                            Simular Mensualidad
                                        </Button>
                                        <Button 
                                            onClick={() => setShowRechargeModal(true)}
                                            className="bg-blue-600 hover:bg-blue-700 text-white border-0 shadow-sm shadow-blue-600/20 px-4 py-2 h-9 text-sm rounded-lg flex items-center justify-center"
                                        >
                                            <Plus className="w-4 h-4 mr-1.5" />
                                            Recargar
                                        </Button>
                                    </div>
                                </div>
                                <div className="mt-3 pt-3 border-t border-white/5 flex flex-col gap-1">
                                    <p className="text-sm font-medium text-slate-300">Wallet de {company.name}</p>
                                    <div className="flex items-center gap-2 text-xs text-slate-500 font-mono break-all cursor-pointer hover:text-white transition-colors group"
                                        onClick={() => {
                                            if (company?.id) navigator.clipboard.writeText(company.id).then(() => success("ID copiado"));
                                        }}
                                    >
                                        <span className="opacity-70 shrink-0">ID:</span>
                                        <span>{company.id}</span>
                                        <Copy className="w-3 h-3 ml-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Recent Transactions (Simple) */}
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-white">Últimos Movimientos</h3>
                            </div>
                            <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-white/5 text-slate-400 text-sm">
                                        <th className="p-4 font-medium">Fecha</th>
                                        <th className="p-4 font-medium">Concepto</th>
                                        <th className="p-4 font-medium">Tipo</th>
                                        <th className="p-4 font-medium">Organización / Origen</th>
                                        <th className="p-4 font-medium text-right">Importe</th>
                                        <th className="p-4 font-medium text-right">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {transactionsLoading ? (
                                        <tr><td colSpan={6} className="p-8 text-center text-slate-500"><Loader2 className="w-6 h-6 animate-spin mx-auto mb-2"/>Cargando...</td></tr>
                                    ) : transactions.slice(0, 10).map((tx) => {
                                         const typeConfig = getTypeConfig(tx.type);
                                         
                                         const descriptionRaw = (tx.description || '').toLowerCase();
                                         const isTransfer = descriptionRaw.includes('transferencia') || 
                                                          descriptionRaw.includes('traspaso') || 
                                                          descriptionRaw.includes('desactivación') ||
                                                          descriptionRaw.includes('desactivacion');
                                                          
                                         // Override visual para transferencias (aunque sea deposit)
                                         if (isTransfer) {
                                             typeConfig.label = 'Transferencia';
                                             typeConfig.icon = ArrowRightLeft;
                                             typeConfig.color = 'text-blue-500';
                                         }

                                         // Permitir descarga si tiene factura, es recarga/gasto, O es una transferencia de desactivación explicita
                                         const allowDownload = !!tx.invoice_number || (['deposit', 'refund', 'purchase', 'withdrawal'].includes(tx.type)) || (tx.type === 'transfer' && isTransfer);
                                         
                                         // Limpiar Concepto para la tabla
                                         let displayDescription = tx.description;
                                         if ((tx.type === 'deposit' || tx.type === 'refund') && (descriptionRaw.includes('recarga') || descriptionRaw.includes('stripe'))) {
                                             displayDescription = 'Recarga de Wallet';
                                         }

                                         return (
                                            <tr key={tx.id} className="text-sm transition-colors group hover:bg-white/5">
                                                <td className="p-4 text-slate-300 w-[120px]">
                                                    {new Date(tx.created_at).toLocaleDateString()}
                                                    <div className="text-xs text-slate-500">{new Date(tx.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                                                </td>
                                                <td className="p-4 text-white font-medium max-w-xs truncate" title={displayDescription}>
                                                    {displayDescription}
                                                </td>
                                                <td className="p-4">
                                                    <span className={cn(
                                                    "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border uppercase tracking-wider",
                                                    isTransfer 
                                                        ? "bg-blue-500/10 text-blue-500 border-blue-500/20" 
                                                        : (typeConfig.isIncome ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-white/5 text-slate-400 border-white/10")
                                                )}>
                                                        {/* Invertir icono horizontalmente si es transferencia de salida */}
                                                        <typeConfig.icon className={cn(
                                                            "w-3 h-3 mr-1.5", 
                                                            isTransfer && (tx.amount >= 0 ? "text-emerald-500" : "text-red-500"),
                                                            isTransfer && tx.amount < 0 && "-scale-x-100"
                                                        )} />
                                                        {typeConfig.label}
                                                    </span>
                                                </td>
                                                <td className="p-4">
                                                    {tx.companies?.name ? (
                                                        <span className="font-medium text-slate-300">
                                                            {tx.companies.name}
                                                        </span>
                                                    ) : (
                                                        <span className="text-slate-400 italic">Wallet General</span>
                                                    )}
                                                </td>
                                                <td className={cn(
                                                    "p-4 font-bold text-right",
                                                    typeConfig.isIncome ? "text-emerald-400" : "text-red-400"
                                                )}>
                                                    {typeConfig.isIncome ? '+' : '-'}{new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(tx.amount)}
                                                </td>
                                                <td className="p-4 text-right">
                                                    {allowDownload ? (
                                                        <Button 
                                                            variant="ghost" 
                                                            size="sm"
                                                            onClick={() => handleDownload(tx)}
                                                            className="hover:text-primary hover:bg-primary/10 text-slate-400"
                                                            title="Descargar Recibo"
                                                        >
                                                            <Download className="w-4 h-4" />
                                                        </Button>
                                                    ) : <span className="text-slate-600 text-xs">-</span>}
                                                </td>
                                            </tr>
                                         );
                                    })}
                                </tbody>
                            </table>
                        </div>
                        </div>
                   </div>
                )}




                {/* SETTINGS TAB (Fourth - Consolidated) */}
                {activeTab === 'settings' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        
                        {/* 1. Identity & General Info (Consolidated) */}
                        <section className="bg-surface-dark border border-white/5 rounded-xl p-6 md:p-8 space-y-8">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-white">Identidad y Detalles</h3>
                                    <p className="text-sm text-slate-400">Gestiona la imagen y datos principales de tu organización.</p>
                                </div>

                                {saving && <span className="text-xs text-slate-500 animate-pulse">Guardando...</span>}
                            </div>

                            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                                {/* Left: Logo */}
                                <div className="flex flex-col items-center lg:items-start gap-4 min-w-[150px]">
                                    <div className="relative group">
                                        <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 flex items-center justify-center overflow-hidden shadow-2xl relative">
                                            {uploading && (
                                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20">
                                                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                                                </div>
                                            )}
                                            {company.logo_url ? (
                                                <img src={company.logo_url} alt="Logo" className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="text-4xl font-bold text-white/20">
                                                    {(name || company.name).substring(0, 2).toUpperCase()}
                                                </span>
                                            )}
                                        </div>
                                        <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-2xl z-10">
                                            <Upload className="w-8 h-8 text-white" />
                                            <input 
                                                type="file" 
                                                accept="image/*" 
                                                className="hidden" 
                                                onChange={async (e) => {
                                                    const file = e.target.files?.[0];
                                                    if (!file) return;
                                                    setUploading(true);
                                                    try {
                                                        const fileExt = file.name.split('.').pop();
                                                        const fileName = `${companyId}-${Date.now()}.${fileExt}`;
                                                        const { error: upErr } = await supabase.storage.from('company-logos').upload(fileName, file);
                                                        if (upErr) throw upErr;
                                                        const { data: { publicUrl } } = supabase.storage.from('company-logos').getPublicUrl(fileName);
                                                        
                                                        // Update local and DB
                                                        const { error: dbErr } = await supabase.from('companies').update({ logo_url: publicUrl }).eq('id', companyId);
                                                        if (dbErr) throw dbErr;
                                                        
                                                        setCompany(prev => prev ? { ...prev, logo_url: publicUrl } : null);
                                                        success("Logo actualizado");
                                                    } catch (err: any) {
                                                        toastError("Error al subir el logo");
                                                    } finally {
                                                        setUploading(false);
                                                    }
                                                }}
                                            />
                                        </label>
                                    </div>
                                    <p className="text-xs text-slate-500 text-center lg:text-left">
                                        Click para cambiar logo.<br/>Recomendado: 512x512px
                                    </p>
                                </div>

                                {/* Right: Form Fields */}
                                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-300">Nombre Comercial</label>
                                        <input 
                                            value={name}
                                            onChange={e => setName(e.target.value)}
                                            className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                                            placeholder="Ej. Mi Empresa S.L."
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-300">Sector / Industria</label>
                                        <input 
                                            value={sector}
                                            onChange={e => setSector(e.target.value)}
                                            className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                                            placeholder="Ej. Tecnología, Retail..."
                                        />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-sm font-medium text-slate-300">Ubicación Principal</label>
                                        <div className="relative">
                                            <input 
                                                value={location}
                                                onChange={e => setLocation(e.target.value)}
                                                className="w-full bg-black/20 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                                                placeholder="Ej. Calle Principal 1, Madrid"
                                            />
                                            <MapPin className="w-5 h-5 text-slate-500 absolute left-3 top-3.5" />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </section>

                        {/* 2. Billing Settings (Moved Up) */}
                        <section className="bg-surface-dark border border-white/5 rounded-xl p-6 md:p-8 space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-white">Configuración de Facturación</h3>
                                <p className="text-sm text-slate-400">Controla cómo se factura esta organización.</p>
                            </div>
                            
                            <div className="bg-black/20 border border-white/10 rounded-xl p-5 md:p-6 transition-all">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-base font-bold text-white">Facturación Individual</h3>
                                            {individualBilling && <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/20">ACTIVO</span>}
                                        </div>
                                        <p className="text-sm text-slate-400 max-w-lg">
                                            Al activar esta opción, la empresa tendrá su propio Wallet y facturación separada de tu cuenta general.
                                        </p>
                                    </div>
                                    <div 
                                        onClick={() => {
                                            if (individualBilling === true && (company?.wallet_balance || 0) > 0) {
                                                setShowDisableBillingModal(true);
                                            } else {
                                                setIndividualBilling(!individualBilling);
                                            }
                                        }}
                                        className={cn(
                                            "w-14 h-8 rounded-full p-1 cursor-pointer transition-colors relative shrink-0",
                                            individualBilling ? "bg-primary" : "bg-slate-700"
                                        )}
                                    >
                                        <div className={cn(
                                            "w-6 h-6 rounded-full bg-white transition-transform shadow-md",
                                            individualBilling ? "translate-x-6" : "translate-x-0"
                                        )} />
                                    </div>
                                </div>
                                
                                {individualBilling && (
                                    <div className="mt-6 pt-6 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-top-2">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-300">Razón Social</label>
                                            <input 
                                                value={fiscalName}
                                                onChange={e => setFiscalName(e.target.value)}
                                                className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary outline-none"
                                                placeholder={name}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-300">Dirección Fiscal</label>
                                            <input 
                                                value={fiscalAddress}
                                                onChange={e => setFiscalAddress(e.target.value)}
                                                className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary outline-none"
                                                placeholder="Dirección Completa"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-300">NIF / CIF</label>
                                            <input 
                                                value={taxId}
                                                onChange={e => setTaxId(e.target.value.toUpperCase())}
                                                className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary outline-none"
                                                placeholder="Ej. B12345678"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* 3. Plan (Moved Down) */}
                        <section className="bg-surface-dark border border-white/5 rounded-xl p-6 md:p-8 space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-white">Plan y Suscripción</h3>
                                <p className="text-sm text-slate-400">Gestiona las capacidades de tu organización.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {['basic', 'pro', 'enterprise'].map(plan => {
                                    const isActive = company.plan === plan;
                                    return (
                                        <div key={plan} className={cn(
                                            "relative border rounded-xl p-5 flex flex-col justify-between min-h-[160px] transition-all duration-300",
                                            isActive 
                                                ? "border-primary bg-primary/5 shadow-[0_0_20px_rgba(59,130,246,0.1)]" 
                                                : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/[0.07]"
                                        )}>
                                            {isActive && (
                                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                                    PLAN ACTUAL
                                                </div>
                                            )}
                                            
                                            <div>
                                                <div className="flex items-center justify-between mb-2">
                                                    <h4 className="text-lg font-bold text-white capitalize">{plan}</h4>
                                                    {plan === 'basic' && <span className="text-slate-400 font-mono">29€</span>}
                                                    {plan === 'pro' && <span className="text-slate-400 font-mono">49€</span>}
                                                    {plan === 'enterprise' && <span className="text-slate-400 font-mono">Custom</span>}
                                                </div>
                                                <p className="text-xs text-slate-400 leading-relaxed">
                                                    {plan === 'basic' && "Ideal para startups y pequeños equipos."}
                                                    {plan === 'pro' && "Potencia para empresas en crecimiento."}
                                                    {plan === 'enterprise' && "Soluciones a medida para corporaciones."}
                                                </p>
                                            </div>

                                            <Button 
                                                size="sm" 
                                                variant={isActive ? "secondary" : "outline"}
                                                className={cn(
                                                    "w-full mt-4",
                                                    isActive 
                                                        ? "bg-primary/20 text-primary hover:bg-primary/30 border-transparent cursor-default" 
                                                        : "hover:bg-white/10"
                                                )}
                                                disabled={isActive || saving}
                                                onClick={async () => {
                                                    if (!isActive && confirm(`¿Cambiar al plan ${plan}?`)) {
                                                        setSaving(true);
                                                        try {
                                                            const { error } = await supabase.from('companies').update({ plan }).eq('id', companyId);
                                                            if (error) throw error;
                                                            success("Plan actualizado");
                                                            loadCompanyData();
                                                        } catch(e: any) {
                                                            toastError(e.message);
                                                        } finally {
                                                            setSaving(false);
                                                        }
                                                    }
                                                }}
                                            >
                                                {isActive ? "Activo" : "Seleccionar"}
                                            </Button>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>

                        {/* 4. Danger Zone (Last) */}
                        <section className="bg-red-500/5 border border-red-500/20 rounded-xl p-6 md:p-8 space-y-4">
                            <div>
                                <h3 className="text-lg font-semibold text-red-500">Zona de Peligro</h3>
                                <p className="text-sm text-red-400/70">Estas acciones son irreversibles. Ten cuidado.</p>
                            </div>
                            
                            <div className="flex items-center justify-between bg-red-500/5 p-4 rounded-lg border border-red-500/10">
                                <div className="space-y-0.5">
                                    <div className="text-white font-medium">Eliminar Organización</div>
                                    <div className="text-xs text-slate-400">Se eliminarán todos los datos, empleados y facturas.</div>
                                </div>
                                <Button 
                                    variant="outline"
                                    size="sm"
                                    className="bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white border-red-500/20"
                                    onClick={() => {
                                        if (confirm("¿ESTÁS SEGURO? Esta acción no se puede deshacer.")) {
                                            // Handle Delete Logic (Simplified for now)
                                            toastError("Contacta con soporte para eliminar organizaciones con actividad económica.");
                                        }
                                    }}
                                >
                                    Eliminar
                                </Button>
                            </div>
                        </section>

                    </div>
                )}
            </div>


        </div>
    );
};

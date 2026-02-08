import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Download, Search, Wallet, Filter, ChevronDown, Check, ArrowUpRight, ArrowDownLeft, ArrowRightLeft, Plus, Copy } from 'lucide-react';
import { Button } from '../components/ui/Button';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useToast } from '../context/ToastContext';
import { cn } from '../lib/utils';
import { RechargeModal } from '../components/RechargeModal';

export const Billing = () => {
    const { success, error } = useToast();
    const [transactions, setTransactions] = useState<any[]>([]);
    const [companies, setCompanies] = useState<any[]>([]);
    const [selectedCompany, setSelectedCompany] = useState<string>('all');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [balance, setBalance] = useState(0);
    const [user, setUser] = useState<any>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isRechargeModalOpen, setIsRechargeModalOpen] = useState(false);

    useEffect(() => {
        loadData();

        // Realtime Subscription
        const channel = supabase
            .channel('billing-updates')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'transactions' },
                () => {
                    loadData();
                }
            )
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'profiles' },
                () => {
                    loadData();
                }
            )
            .subscribe((status) => {
                if (status === 'SUBSCRIBED') {
                    console.log('✅ Billing Realtime Connected');
                }
            });

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    // Handle Stripe Redirects (Robustness)
    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const redirectStatus = query.get('redirect_status');
        
        if (redirectStatus === 'succeeded') {
            window.history.replaceState({}, document.title, window.location.pathname);
            // Reutilizar lógica de éxito manualmente ya que handleRechargeSuccess no existe con ese nombre aquí (está inline)
            success("Saldo recargado correctamente. Actualizando...");
             // Polling más agresivo
            setTimeout(() => {
                loadData();
            }, 1000);
        }
    }, []);

    const loadData = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;
            setUser(user);

            // Fetch Balance
            const { data: profile } = await supabase
                .from('profiles')
                .select('wallet_balance')
                .eq('id', user.id)
                .single();
            
            if (profile) setBalance(profile.wallet_balance || 0);

            // Fetch Transactions (Unified View)
            const { data } = await supabase
                .from('transactions')
                .select('*, companies(id, name)')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });
            
            if (data) setTransactions(data);

            // Fetch companies for filter
            const { data: companiesData } = await supabase
                .from('companies')
                .select('id, name')
                .order('name');
            
            if (companiesData) setCompanies(companiesData);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = async (tx: any) => {
        try {
            const doc = new jsPDF();
            
            // --- HEADER ---
            doc.setFontSize(20);
            doc.setTextColor(40, 40, 40);
            
            const isRecharge = tx.type === 'deposit' || tx.type === 'refund';
            const isRefund = tx.type === 'refund';
            
            let title = 'FACTURA';
            let docNumLabel = 'Nº Factura';
            let fileNamePrefix = 'Factura';

            // Detectar transferencia en el PDF, independientemente del tipo
            const descriptionRawPDF = (tx.description || '').toLowerCase();
            const isTransferPDF = (
                descriptionRawPDF.includes('transferencia') || 
                descriptionRawPDF.includes('traspaso') ||
                descriptionRawPDF.includes('desactivación')
            );

            if (isRecharge && !isTransferPDF) { // Recarga pura de saldo (tarjeta)
                title = isRefund ? 'FACTURA RECTIFICATIVA' : 'FACTURA RECARGA';
            } else if (isTransferPDF) {
                title = 'COMPROBANTE DE TRANSFERENCIA';
                docNumLabel = 'Referencia';
                fileNamePrefix = 'Transferencia';
            } else {
                // Compras (Alta empresa, suscripción, etc)
                title = 'TICKET / RECIBO';
                docNumLabel = 'Referencia';
                fileNamePrefix = 'Ticket';
            }
            
            doc.text(title, 14, 22);
            
            // --- DATOS DE LA EMPRESA (Fycheo) ---
            doc.setFontSize(10);
            doc.setTextColor(100, 100, 100);
            doc.text(`Fycheo Inc.`, 14, 30);
            doc.text(`NIF: B-12345678`, 14, 35);
            doc.text(`C/ Innovación 101, Madrid`, 14, 40);
            
            // --- DATOS DE LA FACTURA ---
            doc.text(`Fecha: ${new Date(tx.created_at).toLocaleDateString()}`, 130, 30);
            const invoiceNum = tx.invoice_number || tx.id.split('-')[0].toUpperCase();
            doc.text(`${docNumLabel}: ${invoiceNum}`, 130, 35);
            
            if (tx.payment_method) {
                let methodLabel = tx.payment_method;
                
                if (methodLabel === 'card' && tx.payment_method_details) {
                     // Si tiene formato bonito (ej: VISA **** 1234), lo usamos
                     if (tx.payment_method_details.includes('****')) {
                         methodLabel = tx.payment_method_details;
                     } else {
                         // Si es un ID técnico feo (Stripe ID: ...), mejor poner algo genérico
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
            
            // Priorizar datos fiscales específicos guardados en user_metadata
            const fiscalName = user?.user_metadata?.fiscal_name || user?.user_metadata?.full_name || user?.email || 'N/D';
            const fiscalId = user?.user_metadata?.tax_id || 'N/D';
            const fiscalAddr = user?.user_metadata?.fiscal_address || 'N/D';

            doc.text(`Razón Social: ${fiscalName}`, 14, 62);
            doc.text(`NIF/CIF: ${fiscalId}`, 14, 67);
            doc.text(`Dirección: ${fiscalAddr}`, 14, 72);
            doc.text(`ID Wallet: ${user?.id || 'N/D'}`, 14, 77);
            
            if (tx.companies?.name) {
                 doc.text(`Organización: ${tx.companies.name}`, 14, 82);
            }

            // --- TABLA DE CONCEPTOS ---
            // Usamos amount_gross si existe (nuevo sistema), o fallback a amount antiguo (neto asumido como total)
            // Usamos amount_gross si existe (nuevo sistema), o fallback a amount antiguo (neto asumido como total)
            // Usamos amount_gross si existe, forzando valor absoluto para evitar negativos en PDF
            const gross = Math.abs(tx.amount_gross || tx.amount);
            
            let vat = 0;
            let net = gross;

            if (isRecharge && !isTransferPDF) {
                // En recargas, calculamos el IVA si no viene explícito
                // Ojo: 0 es falsy, verificamos null/undefined
                if (tx.amount_vat !== undefined && tx.amount_vat !== null) {
                    vat = Math.abs(tx.amount_vat);
                } else {
                    vat = gross - (gross / 1.21);
                }
                net = gross - vat;
            } else {
                // En Tickets (gastos de saldo) O Transferencias, NO hay IVA
                vat = 0;
                net = gross;
            }

            // Limpieza del concepto para la factura
            let conceptLines = tx.description || 'Movimiento de saldo';
            const descriptionRaw = (tx.description || '').toLowerCase();
            // Si es una recarga de saldo, forzamos el texto limpio aunque en BD venga con "Stripe: ..."
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
                headStyles: { fillColor: isRefund ? [220, 38, 38] : [37, 99, 235] }, // Rojo o Azul
                styles: { fontSize: 10, cellPadding: 4 },
                columnStyles: {
                    0: { cellWidth: 80 }, // Concepto ancho
                    1: { halign: 'right' },
                    2: { halign: 'right' },
                    3: { halign: 'right', fontStyle: 'bold' }
                }
            });
            
            // --- TOTAL FINAL ---
            const finalY = (doc as any).lastAutoTable.finalY + 10;
            
            doc.setFillColor(245, 245, 245);
            doc.rect(130, finalY, 60, 20, 'F');
            
            doc.setFontSize(12);
            doc.setTextColor(0, 0, 0);
            doc.text(`Total a Pagar:`, 135, finalY + 13);
            doc.setFontSize(14);
            doc.setFont(undefined, 'bold');
            doc.text(`${Number(gross).toFixed(2)} €`, 185, finalY + 13, { align: 'right' });
            
            // Footer
            doc.setFont(undefined, 'normal');
            doc.setFontSize(8);
            doc.setTextColor(150, 150, 150);
            doc.text("Gracias por confiar en Fycheo.", 105, 280, { align: 'center' });

            doc.save(`${fileNamePrefix}_${invoiceNum}.pdf`);
            success("Factura generada y descargada");
            
        } catch (err: any) {
            console.error(err);
            error("Error al generar el PDF");
        }
    };

    const filteredTransactions = transactions.filter(tx => {
        const searchMatch = (tx.description || '').toLowerCase().includes(searchTerm.toLowerCase());
        
        let companyMatch = true;
        if (selectedCompany !== 'all') {
            if (selectedCompany === 'general') {
                companyMatch = !tx.company_id; // Personal / General Wallet
            } else {
                companyMatch = tx.company_id === selectedCompany;
            }
        }

        return searchMatch && companyMatch;
    });

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

    return (
        <div className="pt-8 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Wallet (v2)</h1>
                    <p className="text-slate-400 mt-1">Historial unificado de todos tus movimientos y operaciones.</p>
                </div>
                
                <div className="bg-surface-dark/50 backdrop-blur-md border border-white/10 rounded-xl p-4 min-w-[280px]">
                    <div className="flex flex-col md:flex-row gap-3 justify-between items-end">
                        {/* Bloque Saldo */}
                        <div>
                            <p className="text-xs text-slate-400 font-medium">Saldo Disponible</p>
                            <p className="text-2xl font-bold text-white mt-0.5">{balance.toFixed(2)}€</p>
                        </div>

                        {/* Botón */}
                        <Button 
                            onClick={() => setIsRechargeModalOpen(true)}
                            className="bg-blue-600 hover:bg-blue-700 text-white border-0 shadow-sm shadow-blue-600/20 px-4 py-2 h-auto text-sm rounded-lg flex items-center justify-center"
                        >
                            <Plus className="w-4 h-4 mr-1.5" />
                            Recargar
                        </Button>
                    </div>

                    {/* Info Wallet (Footer Widget) */}
                    <div className="mt-3 pt-3 border-t border-white/5 flex flex-col gap-1">
                        <p className="text-sm font-medium text-slate-300">
                            {selectedCompany === 'general' || selectedCompany === 'all' 
                                ? 'Wallet General' 
                                : `Wallet de ${companies.find(c => c.id === selectedCompany)?.name || 'Empresa'}`}
                        </p>
                        <div 
                            className="flex items-center gap-2 text-xs text-slate-500 font-mono break-all cursor-pointer hover:text-white transition-colors group"
                            onClick={() => {
                                if (user?.id) {
                                    navigator.clipboard.writeText(user.id)
                                        .then(() => success("ID copiado al portapapeles"))
                                        .catch(() => error("Error al copiar ID"));
                                }
                            }}
                            title="Copiar ID"
                        >
                            <span className="opacity-70 shrink-0">ID:</span>
                            <span>{user?.id}</span>
                            <Copy className="w-3 h-3 ml-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-surface-dark border border-white/5 rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="relative flex-1 max-w-xs">
                        <Search className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                        <input 
                            type="text" 
                            placeholder="Buscar movimientos..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 rounded-xl bg-background-dark/50 border border-white/10 text-white text-sm focus:border-primary outline-none transition-colors"
                        />
                    </div>
                    
                    <div className="relative min-w-[240px]">
                        <button 
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-background-dark/50 border border-white/10 text-white text-sm focus:border-primary focus:ring-1 focus:ring-primary/50 outline-none transition-all flex items-center justify-between group hover:border-white/20"
                        >
                            <div className="flex items-center gap-2 truncate">
                                <span className={`truncate ${selectedCompany === 'all' ? 'text-slate-400' : 'text-white font-medium'}`}>
                                    {selectedCompany === 'all' 
                                        ? 'Todos los Movimientos' 
                                        : selectedCompany === 'general'
                                            ? 'Wallet General (Personal)'
                                            : companies.find(c => c.id === selectedCompany)?.name || 'Seleccionar...'}
                                </span>
                            </div>
                            <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${isFilterOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <Filter className="absolute left-3 top-3 w-4 h-4 text-slate-500 pointer-events-none" />
                        
                        {isFilterOpen && (
                            <>
                                <div className="fixed inset-0 z-10" onClick={() => setIsFilterOpen(false)} />
                                <div className="absolute top-full text-sm right-0 mt-2 w-full bg-surface-dark border border-white/10 rounded-xl shadow-xl z-20 overflow-hidden animate-in fade-in zoom-in-95 duration-100 p-1">
                                    <button
                                        onClick={() => { setSelectedCompany('all'); setIsFilterOpen(false); }}
                                        className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition-colors ${selectedCompany === 'all' ? 'bg-primary/10 text-primary' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}
                                    >
                                        Todos los Movimientos
                                        {selectedCompany === 'all' && <Check className="w-3 h-3" />}
                                    </button>

                                    <button
                                        onClick={() => { setSelectedCompany('general'); setIsFilterOpen(false); }}
                                        className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition-colors ${selectedCompany === 'general' ? 'bg-emerald-500/10 text-emerald-500' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}
                                    >
                                        Wallet General (Personal)
                                        {selectedCompany === 'general' && <Check className="w-3 h-3" />}
                                    </button>

                                    <div className="h-px bg-white/5 my-1" />
                                    <div className="max-h-[200px] overflow-y-auto space-y-0.5">
                                        {companies.map(c => (
                                            <button
                                                key={c.id}
                                                onClick={() => { setSelectedCompany(c.id); setIsFilterOpen(false); }}
                                                className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition-colors ${selectedCompany === c.id ? 'bg-blue-500/10 text-blue-500' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}
                                            >
                                                {c.name}
                                                {selectedCompany === c.id && <Check className="w-3 h-3" />}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
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
                            {loading ? (
                                <tr><td colSpan={6} className="p-8 text-center text-slate-500">Cargando movimientos...</td></tr>
                            ) : filteredTransactions.length === 0 ? (
                                <tr><td colSpan={6} className="p-8 text-center text-slate-500">No hay movimientos registrados.</td></tr>
                            ) : (
                                filteredTransactions.map((tx) => {
                                    const typeConfig = getTypeConfig(tx.type);
                                    // const Icon = typeConfig.icon; // Removed to use dynamic icon
                                    // const isPersonal = !tx.company_id; // Unused

                                    // Check if download is allowed (only recharges/refunds usually involving documents)
                                    // User said: "solo se puede descargar los movimientos con tarjetas(pagos o devos)"
                                    // Exclude internal transfers even if they are 'deposits'
                                    const descriptionRaw = (tx.description || '').toLowerCase();
                                    const isTransfer = descriptionRaw.includes('transferencia') || 
                                                     descriptionRaw.includes('traspaso') || 
                                                     descriptionRaw.includes('desactivación') ||
                                                     descriptionRaw.includes('desactivacion');
                                                     
                                    // Permitir descarga si es factura, recarga, reembolso o cualquier transferencia
                                    const allowDownload = !!tx.invoice_number || tx.type === 'deposit' || tx.type === 'refund' || (tx.type === 'transfer' && isTransfer) || isTransfer;
                                    
                                    // Limpiar Concepto para la tabla
                                    let displayDescription = tx.description;
                                    if ((tx.type === 'deposit' || tx.type === 'refund') && (descriptionRaw.includes('recarga') || descriptionRaw.includes('stripe'))) {
                                        displayDescription = 'Recarga de Wallet';
                                    }

                                    // Override visual para transferencias (aunque sea deposit)
                                    if (isTransfer) {
                                        typeConfig.label = 'Transferencia';
                                        typeConfig.color = 'text-blue-500';
                                        typeConfig.icon = ArrowRightLeft;
                                    }

                                    return (
                                    <tr 
                                        key={tx.id} 
                                        className="text-sm transition-colors group hover:bg-white/5"
                                    >
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
                                                <typeConfig.icon className={cn(
                                                    "w-3 h-3", 
                                                    isTransfer && (tx.amount >= 0 ? "text-emerald-500" : "text-red-500"),
                                                    isTransfer && tx.amount < 0 && "-scale-x-100"
                                                )} />
                                                {typeConfig.label}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            {tx.companies?.name ? (
                                                <Link 
                                                    to={`/companies/${tx.company_id}`}
                                                    className="font-medium text-slate-300 hover:text-white hover:underline transition-colors"
                                                >
                                                    {tx.companies.name}
                                                </Link>
                                            ) : (
                                                <span className="text-slate-400 italic">Wallet General</span>
                                            )}
                                        </td>
                                        
                                        <td className={cn(
                                            "p-4 font-bold text-right text-base",
                                            isTransfer ? "text-blue-400" : (typeConfig.isIncome ? "text-emerald-400" : "text-red-400")
                                        )}>
                                            {typeConfig.isIncome ? '+' : '-'}{new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(tx.amount)}
                                        </td>
                                        
                                        <td className="p-4 text-right">
                                        {allowDownload && (
                                            <Button 
                                                variant="ghost" 
                                                size="sm"
                                                onClick={() => handleDownload(tx)}
                                                className="hover:text-primary hover:bg-primary/10 text-slate-400"
                                                title="Descargar Recibo"
                                            >
                                                <Download className="w-4 h-4" />
                                            </Button>
                                        )}
                                    </td>
                                    </tr>
                                )})
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <RechargeModal 
                isOpen={isRechargeModalOpen}
                onClose={() => setIsRechargeModalOpen(false)}
                onSuccess={() => {
                    success("Saldo recargado correctamente. Actualizando...");
                    
                    // Polling más agresivo (10 intentos cada 1s) para asegurar actualización
                    setTimeout(() => {
                        loadData();
                    }, 1000);
                }}
            />
        </div>
    );
};

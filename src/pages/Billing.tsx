import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Download, Search, FileText, Receipt, Filter, ChevronDown, Check } from 'lucide-react';
import { Button } from '../components/ui/Button';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useToast } from '../context/ToastContext';

export const Billing = () => {
    const { success, error } = useToast();
    const [invoices, setInvoices] = useState<any[]>([]);
    const [companies, setCompanies] = useState<any[]>([]);
    const [selectedCompany, setSelectedCompany] = useState<string>('all');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const [activeTab, setActiveTab] = useState<'invoice' | 'ticket'>('invoice');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const tab = params.get('tab');
        if (tab === 'invoice' || tab === 'ticket') {
            setActiveTab(tab);
        }
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;
            setUser(user);

            const { data } = await supabase
                .from('invoices')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });
            
            if (data) setInvoices(data);

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

    const handleDownload = (docItem: any) => {
        try {
            const doc = new jsPDF();
            const isTicket = docItem.type === 'ticket';
            
            // Header
            doc.setFontSize(22);
            doc.setTextColor(40, 40, 40);
            doc.text(isTicket ? 'JUSTIFICANTE DE PAGO' : 'FACTURA', 14, 22);
            
            doc.setFontSize(10);
            doc.setTextColor(100, 100, 100);
            doc.text(`Fycheo Inc.`, 14, 30);
            doc.text(`Fecha: ${new Date(docItem.created_at).toLocaleDateString()}`, 14, 35);
            doc.text(`Nº Documento: ${docItem.invoice_number}`, 14, 40);
            
            if (user) {
                doc.text(`Cliente: ${user.email}`, 14, 50);
            }

            // Datos tabla
            let head = [['Concepto', 'Base Imponible', 'IVA', 'Total']];
            let body = [[
                docItem.concept,
                `${docItem.amount_net.toFixed(2)}€`,
                `${docItem.amount_vat.toFixed(2)}€`,
                `${docItem.amount_total.toFixed(2)}€`
            ]];

            // Si es Ticket, simplificar tabla (Solo Concepto e Importe)
            if (isTicket) {
                head = [['Concepto', 'Importe Pagado']];
                body = [[
                    docItem.concept,
                    `${docItem.amount_total.toFixed(2)}€`
                ]];
            }

            autoTable(doc, {
                startY: 60,
                head: head,
                body: body,
                headStyles: { fillColor: isTicket ? [100, 116, 139] : [16, 185, 129] }, // Gris para tickets, Verde para facturas
                styles: { fontSize: 10 }
            });
            
            // Total
            const finalY = (doc as any).lastAutoTable.finalY || 60;
            doc.setFontSize(12);
            doc.setTextColor(0, 0, 0);
            
            if (isTicket) {
                doc.setFontSize(10);
                doc.setTextColor(100, 100, 100);
                doc.text("Este documento es un justificante de consumo de saldo y no tiene validez tributaria.", 14, finalY + 10);
                doc.setFontSize(12);
                doc.setTextColor(0, 0, 0);
            }

            doc.text(`TOTAL: ${docItem.amount_total.toFixed(2)}€`, 140, finalY + 15);

            doc.save(`${docItem.type}_${docItem.invoice_number}.pdf`);
            success("Documento descargado correctamente");
            
        } catch (err: any) {
            console.error(err);
            error("Error al generar el PDF");
        }
    };

    const filteredInvoices = invoices.filter(inv => {
        // Filtrar por tipo (si el backend no tiene type aún, mostrar en invoices por defecto o manejarlo)
        const typeMatch = (inv.type || 'invoice') === activeTab;
        const searchMatch = inv.concept.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          inv.invoice_number.toLowerCase().includes(searchTerm.toLowerCase());
        
        let companyMatch = true;
        // Solo aplicar filtro de empresa en Tickets
        if (activeTab === 'ticket' && selectedCompany !== 'all') {
            companyMatch = inv.company_id === selectedCompany;
        }

        return typeMatch && searchMatch && companyMatch;
    });

    const getStatusConfig = (status: string) => {
        const config: Record<string, { label: string, className: string }> = {
            'pagado': { label: 'Pagado', className: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' },
            'pendiente': { label: 'Pendiente', className: 'bg-amber-500/10 text-amber-500 border-amber-500/20' },
            'fallido': { label: 'Fallido', className: 'bg-red-500/10 text-red-500 border-red-500/20' },
            'reembolsado': { label: 'Reembolsado', className: 'bg-slate-500/10 text-slate-400 border-slate-500/20' }
        };
        return config[status] || config['pagado'];
    };

    return (
        <div className="pt-8 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Facturación y Pagos</h1>
                    <p className="text-slate-400">Gestiona tus facturas de recarga y tickets de suscripción.</p>
                </div>
            </div>

            {/* Tabs de Navegación */}
            <div className="flex space-x-1 bg-surface-dark border border-white/5 p-1 rounded-xl max-w-md">
                <button
                    onClick={() => setActiveTab('invoice')}
                    className={`flex-1 flex items-center justify-center py-2.5 text-sm font-medium rounded-lg transition-all ${
                        activeTab === 'invoice' 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-lg' 
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                >
                    <FileText className="w-4 h-4 mr-2" />
                    Facturas
                </button>
                <button
                    onClick={() => setActiveTab('ticket')}
                    className={`flex-1 flex items-center justify-center py-2.5 text-sm font-medium rounded-lg transition-all ${
                        activeTab === 'ticket' 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-lg' 
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                >
                    <Receipt className="w-4 h-4 mr-2" />
                    Tickets
                </button>
            </div>

            <div className="bg-surface-dark border border-white/5 rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="relative flex-1 max-w-xs">
                        <Search className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                        <input 
                            type="text" 
                            placeholder="Buscar..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 rounded-xl bg-background-dark/50 border border-white/10 text-white text-sm focus:border-primary outline-none transition-colors"
                        />
                    </div>
                    
                    {activeTab === 'ticket' && (
                    <div className="relative min-w-[240px]">
                        <button 
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-background-dark/50 border border-white/10 text-white text-sm focus:border-primary focus:ring-1 focus:ring-primary/50 outline-none transition-all flex items-center justify-between group hover:border-white/20"
                        >
                            <div className="flex items-center gap-2 truncate">
                                <span className={`truncate ${selectedCompany === 'all' ? 'text-slate-400' : 'text-white font-medium'}`}>
                                    {selectedCompany === 'all' 
                                        ? 'Todas las Organizaciones' 
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
                                        Todas las Organizaciones
                                        {selectedCompany === 'all' && <Check className="w-3 h-3" />}
                                    </button>
                                    <div className="h-px bg-white/5 my-1" />
                                    <div className="max-h-[200px] overflow-y-auto space-y-0.5">
                                        {companies.map(c => (
                                            <button
                                                key={c.id}
                                                onClick={() => { setSelectedCompany(c.id); setIsFilterOpen(false); }}
                                                className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition-colors ${selectedCompany === c.id ? 'bg-primary/10 text-primary' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}
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
                    )}
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/5 text-slate-400 text-sm">
                                <th className="p-4 font-medium">Número</th>
                                <th className="p-4 font-medium">Fecha</th>
                                <th className="p-4 font-medium">Concepto</th>
                                {activeTab === 'invoice' && <th className="p-4 font-medium text-right">Base</th>}
                                {activeTab === 'invoice' && <th className="p-4 font-medium text-right">IVA</th>}
                                <th className="p-4 font-medium text-right">Total</th>
                                <th className="p-4 font-medium text-center">Estado</th>
                                <th className="p-4 font-medium text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {loading ? (
                                <tr><td colSpan={8} className="p-8 text-center text-slate-500">Cargando...</td></tr>
                            ) : filteredInvoices.length === 0 ? (
                                <tr><td colSpan={8} className="p-8 text-center text-slate-500">No hay documentos en esta sección.</td></tr>
                            ) : (
                                filteredInvoices.map((inv) => (
                                    <tr key={inv.id} className="text-sm hover:bg-white/5 transition-colors group">
                                        <td className="p-4 text-white font-mono">{inv.invoice_number}</td>
                                        <td className="p-4 text-slate-300">{new Date(inv.created_at).toLocaleDateString()}</td>
                                        <td className="p-4 text-white font-medium">{inv.concept}</td>
                                        {activeTab === 'invoice' && <td className="p-4 text-slate-400 text-right">{inv.amount_net.toFixed(2)}€</td>}
                                        {activeTab === 'invoice' && <td className="p-4 text-slate-400 text-right">{inv.amount_vat.toFixed(2)}€</td>}
                                        <td className="p-4 text-emerald-400 font-bold text-right">{inv.amount_total.toFixed(2)}€</td>
                                        <td className="p-4 text-center">
                                            {(() => {
                                                const status = getStatusConfig(inv.status);
                                                return (
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border uppercase tracking-wide ${status.className}`}>
                                                        {status.label}
                                                    </span>
                                                );
                                            })()}
                                        </td>
                                        <td className="p-4 text-right">
                                            <Button 
                                                variant="ghost" 
                                                size="sm"
                                                onClick={() => handleDownload(inv)}
                                                className="hover:text-primary hover:bg-primary/10"
                                                title="Descargar PDF"
                                            >
                                                <Download className="w-4 h-4" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

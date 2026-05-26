import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Button } from '../ui/Button';
import { useToast } from '../../context/ToastContext';
import { X, Building2, CreditCard } from 'lucide-react';

interface Company {
    id: string;
    name: string;
    wallet_balance?: number;
    individual_billing?: boolean;
}

interface CompanyRechargeModalProps {
    company: Company;
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export const CompanyRechargeModal = ({ company, isOpen, onClose, onSuccess }: CompanyRechargeModalProps) => {
    const { error: toastError, success: toastSuccess } = useToast();
    const [amount, setAmount] = useState('100');
    const [recharging, setRecharging] = useState(false);

    if (!isOpen) return null;

    const handleRecharge = async () => {
        const amountNum = parseFloat(amount) || 0;
        
        if (amountNum < 10 || amountNum > 5000) {
            toastError("La cantidad debe estar entre 10€ y 5.000€");
            return;
        }

        setRecharging(true);

        try {
            // 1. Simular retardo de pasarela de pago
            await new Promise(resolve => setTimeout(resolve, 1500));

            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                toastError("No estás autenticado");
                return;
            }

            // 2. Obtener saldo actual fresco para evitar inconsistencias
            const { data: currentCompany, error: fetchError } = await supabase
                .from('companies')
                .select('wallet_balance, individual_billing')
                .eq('id', company.id)
                .single();

            if (fetchError) throw fetchError;

            const currentBalance = currentCompany?.wallet_balance || 0;
            const newBalance = currentBalance + amountNum;

            // 3. Actualizar saldo en la tabla companies
            const { error: updateError } = await supabase
                .from('companies')
                .update({ wallet_balance: newBalance })
                .eq('id', company.id);

            if (updateError) throw updateError;

            // 4. Registrar Transacción + Factura (Consolidado)
            const vat = amountNum * 0.21;
            const total = amountNum + vat;

            const { error: txError } = await supabase.from('transactions').insert({
                company_id: company.id,
                user_id: user.id, // Usuario que hace la recarga
                amount: amountNum, // Saldo efectivo añadido (Neto)
                type: 'deposit',
                description: `Recarga de Saldo - ${company.name}`,
                
                // Campos Factura
                invoice_number: `FY-${new Date().toISOString().slice(0,10).replace(/-/g,'')}-${Math.random().toString(36).substring(2,6).toUpperCase()}`,
                invoice_concept: `Recarga Saldo Empresa: ${company.name}`,
                amount_net: amountNum,
                amount_vat: vat,
                amount_total: total,
                invoice_status: 'paid',
                is_individual_billing: currentCompany?.individual_billing || false // Persist historical state
            });

            if (txError) {
                console.error('Error registrando transacción:', txError);
                // No bloqueamos el flujo principal si falló el log, pero idealmente debería ser transaccional
            }


            toastSuccess(`¡Recarga exitosa! Se han añadido ${amountNum}€ a ${company.name}.`);
            onSuccess(); // Recargar lista
            onClose();

        } catch (error: any) {
            console.error(error);
            toastError("Error al procesar el pago: " + error.message);
        } finally {
            setRecharging(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
            <div className="bg-surface-dark rounded-2xl shadow-2xl border border-white/10 max-w-md w-full p-8 animate-in fade-in zoom-in duration-200">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        <CreditCard className="w-6 h-6 text-primary" />
                        Recargar Empresa
                    </h2>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <X className="w-5 h-5" />
                    </Button>
                </div>

                <div className="bg-white/5 rounded-lg p-4 mb-6 flex items-center gap-3">
                    <div className="p-2 bg-white/5 rounded-full">
                        <Building2 className="w-5 h-5 text-slate-300" />
                    </div>
                    <div>
                        <p className="text-xs text-slate-400 uppercase font-bold">Organización</p>
                        <p className="text-white font-medium">{company.name}</p>
                    </div>
                </div>
                
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Cantidad a Recargar (Neto)</label>
                        <div className="relative">
                            <span className="absolute left-4 top-3.5 text-slate-500">€</span>
                            <input 
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                min="10"
                                max="5000"
                                value={amount}
                                onChange={(e) => {
                                    const val = e.target.value.replace(/[^0-9.]/g, ''); // Permitir decimales si se desea, aquí solo enteros simple
                                    setAmount(val);
                                }}
                                className="w-full pl-8 pr-4 py-3 rounded-xl bg-background-dark border border-white/10 text-white text-lg font-bold focus:ring-2 focus:ring-primary/50 outline-none"
                                placeholder="0"
                            />
                        </div>
                        <p className="text-xs text-slate-500 mt-2">Mínimo 10€, Máximo 5.000€</p>
                    </div>

                    <div className="bg-white/5 rounded-xl p-4 space-y-2 text-sm">
                        <div className="flex justify-between text-slate-300">
                            <span>Subtotal (Saldo Añadido)</span>
                            <span>{(parseFloat(amount) || 0).toFixed(2)}€</span>
                        </div>
                        <div className="flex justify-between text-slate-300">
                            <span>IVA (21%)</span>
                            <span>{((parseFloat(amount) || 0) * 0.21).toFixed(2)}€</span>
                        </div>
                        <div className="border-t border-white/10 py-2 mt-2 flex justify-between font-bold text-white text-base">
                            <span>Total a Pagar</span>
                            <span>{((parseFloat(amount) || 0) * 1.21).toFixed(2)}€</span>
                        </div>
                    </div>

                    <Button 
                        onClick={handleRecharge} 
                        disabled={recharging || (parseFloat(amount) || 0) < 10}
                        className="w-full h-12 text-base shadow-glow"
                    >
                        {recharging ? 'Procesando Pago...' : `Pagar ${((parseFloat(amount) || 0) * 1.21).toFixed(2)}€`}
                    </Button>
                </div>
            </div>
        </div>
    );
};

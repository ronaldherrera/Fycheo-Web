import { useState, useEffect } from 'react';
import { X, Wallet } from 'lucide-react';
import { Elements } from '@stripe/react-stripe-js';
import { getStripe } from '../lib/stripe';
import { supabase } from '../lib/supabase';
import { CheckoutForm } from './CheckoutForm';
import { Button } from './ui/Button';

interface RechargeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    initialAmount?: number;
    companyId?: string; // New Optional Prop
    walletName?: string; // New Optional Prop
    walletImage?: string; // New Optional Prop
}



export const RechargeModal = ({ isOpen, onClose, onSuccess, initialAmount, companyId, walletName }: RechargeModalProps) => {
    const [amount, setAmount] = useState<number | ''>('');
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [step, setStep] = useState<'amount' | 'payment'>('amount');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    // Actualizar amount cuando cambia initialAmount o se abre el modal
    useEffect(() => {
        if (isOpen && initialAmount) {
            setAmount(initialAmount);
        } else if (!isOpen) {
            // Resetear al cerrar si se desea, o mantener.
            // Stripe payment flow reset
        }
    }, [isOpen, initialAmount]);

    const stripePromise = getStripe();

    // Cálculos
    const netAmount = Number(amount) || 0;
    const vatAmount = netAmount * 0.21;
    const totalAmount = netAmount + vatAmount;

    const handleProceed = async () => {
        if (!netAmount || netAmount < 10) {
            setError('El monto mínimo es de 10€');
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            
            // Invocar Edge Function con el TOTAL (lo que se cobra en la tarjeta)
            // Se envía 'amount' como el Total.
            const { data, error: funcError } = await supabase.functions.invoke('create-payment-intent', {
                body: { 
                    amount: totalAmount, // Cobramos el Total (Neto + IVA)
                    email: user?.email,
                    userId: user?.id,
                    companyId: companyId // Pass companyId to backend
                }
            });

            if (funcError) throw funcError;
            if (data?.error) throw new Error(data.error);

            if (data?.clientSecret) {
                setClientSecret(data.clientSecret);
                setStep('payment');
            } else {
                throw new Error('No se recibió el secreto de pago');
            }
        } catch (err: any) {
            console.error('Payment Error:', err);
            setError(err.message || 'Error al iniciar el pago. Asegúrate de ejecutar la Edge Function.');
        } finally {
            setLoading(false);
        }
    };

    const handlePaymentSuccess = () => {
        onSuccess();
        onClose();
        setTimeout(() => {
            setStep('amount');
            setClientSecret(null);
            setAmount('');
        }, 300);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
            <div className="bg-[#18181b] w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-white/5">
                
                <div className="p-6 relative">
                    <button 
                        onClick={onClose} 
                        className="absolute right-6 top-6 text-slate-400 hover:text-white transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <h2 className="text-xl font-bold text-white mb-6">Recargar Saldo</h2>

                    {step === 'amount' ? (
                        <div className="space-y-6">
                            
                            {/* Name Info */}
                            <div className="bg-white/5 rounded-xl p-4 flex items-center gap-3 border border-white/5">
                                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0 overflow-hidden">
                                   <Wallet className="w-5 h-5 text-blue-400" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Recargando Wallet</p>
                                    <p className="text-white font-medium text-sm">
                                        {companyId ? (walletName || 'Wallet de Empresa') : 'Wallet General'}
                                    </p>
                                </div>
                            </div>

                            {/* Input Amount */}
                            <div>
                                <label className="block text-sm text-slate-400 mb-2">Cantidad a Recargar (Neto)</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">€</span>
                                    <input
                                        type="number"
                                        min="10"
                                        value={amount}
                                        onChange={(e) => { 
                                            const val = e.target.value;
                                            setAmount(val === '' ? '' : Number(val));
                                            setError(null); 
                                        }}
                                        className="w-full bg-[#27272a] border border-transparent focus:border-blue-500 rounded-xl py-4 pl-10 pr-4 text-white text-xl font-bold placeholder-slate-600 focus:outline-none transition-all"
                                        placeholder="0"
                                    />
                                </div>
                                <p className="text-xs text-slate-500 mt-2">Mínimo 10€, Máximo 5.000€</p>
                            </div>
                            
                            {/* Summary Card Removed from Step 1 */}
                            
                            {error && (
                                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                                    {error}
                                </div>
                            )}

                            <Button 
                                onClick={handleProceed}
                                disabled={loading || !netAmount || netAmount < 10}
                                className="w-full h-14 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                {loading ? 'Procesando...' : `Recargar ${netAmount.toFixed(2)}€`}
                            </Button>
                        </div>
                    ) : (
                        <div className="animate-in slide-in-from-right-10 fade-in duration-300">
                             {clientSecret && stripePromise && (
                                <Elements stripe={stripePromise} options={{ 
                                    clientSecret,
                                    appearance: {
                                        theme: 'night',
                                        variables: {
                                            colorPrimary: '#2563eb', // blue-600
                                            colorBackground: '#27272a', 
                                            colorText: '#f4f4f5',
                                            borderRadius: '12px',
                                        }
                                    }
                                }}>
                                    <CheckoutForm 
                                        amount={totalAmount} 
                                        netAmount={netAmount}
                                        vatAmount={vatAmount}
                                        onSuccess={handlePaymentSuccess}
                                        onCancel={() => setStep('amount')}
                                    />
                                </Elements>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

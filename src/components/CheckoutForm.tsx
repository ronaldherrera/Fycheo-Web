import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState, FormEvent } from 'react';
import { Button } from './ui/Button';

interface CheckoutFormProps {
    amount: number;
    netAmount: number;
    vatAmount: number;
    onSuccess: () => void;
    onCancel: () => void;
}

export const CheckoutForm = ({ amount, netAmount, vatAmount, onSuccess, onCancel }: CheckoutFormProps) => {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        setLoading(true);
        setErrorMessage(null);

        try {
            const { error, paymentIntent } = await stripe.confirmPayment({
                elements,
                confirmParams: { return_url: window.location.href },
                redirect: 'if_required',
            });

            if (error) {
                setErrorMessage(error.message ?? 'Ocurrió un error desconocido.');
            } else if (paymentIntent?.status === 'succeeded') {
                onSuccess();
            } else {
                setErrorMessage('El estado del pago no es definitivo.');
            }
        } catch (e: any) {
            setErrorMessage(e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-[#27272a] rounded-xl p-4 space-y-3 border border-white/5">
                <div className="flex justify-between text-sm text-slate-400">
                    <span>Subtotal (Saldo Añadido)</span>
                    <span>{netAmount.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between text-sm text-slate-400">
                    <span>IVA (21%)</span>
                    <span>{vatAmount.toFixed(2)}€</span>
                </div>
                <div className="h-px bg-white/10 my-2" />
                <div className="flex justify-between text-base font-bold text-white">
                    <span>Total a Pagar</span>
                    <span>{amount.toFixed(2)}€</span>
                </div>
            </div>

            <div className="bg-[#27272a] p-4 rounded-xl border border-white/10">
                <PaymentElement options={{ layout: 'tabs' }} />
            </div>

            {errorMessage && (
                <div className="text-red-400 text-sm bg-red-400/10 p-4 rounded-xl border border-red-400/20">
                    {errorMessage}
                </div>
            )}

            <div className="flex gap-4 pt-2">
                <Button
                    type="button"
                    variant="ghost"
                    className="flex-1 h-14 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl text-base"
                    onClick={onCancel}
                    disabled={loading}
                >
                    Cancelar
                </Button>
                <Button
                    type="submit"
                    disabled={!stripe || loading}
                    className="flex-[2] h-14 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white border-0 rounded-xl shadow-lg shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                    {loading ? 'Procesando...' : `Pagar ${amount.toFixed(2)}€`}
                </Button>
            </div>
        </form>
    );
};

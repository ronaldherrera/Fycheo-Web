import React from 'react'; // React is needed for JSX
import { Shield } from 'lucide-react';
import { Button } from './Button';

interface WarningModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    confirmText?: string;
    cancelText?: string;
}

export const WarningModal = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    subtitle = "Acción Irreversible",
    children,
    confirmText = "Confirmar",
    cancelText = "Cancelar",
}: WarningModalProps) => {
    
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
            <div className="bg-surface-dark rounded-2xl shadow-2xl border border-red-500/20 max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                        <Shield className="w-6 h-6 text-red-500" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">{title}</h2>
                        <p className="text-sm text-red-400 font-medium">{subtitle}</p>
                    </div>
                </div>
                
                <div className="space-y-4">
                    <div className="bg-red-500/5 border border-red-500/10 rounded-xl p-4">
                        {children}
                    </div>

                    <div className="flex gap-3 pt-2">
                        <Button 
                            variant="outline" 
                            className="flex-1"
                            onClick={onClose}
                        >
                            {cancelText}
                        </Button>
                        <Button 
                            className="flex-1 bg-red-500 hover:bg-red-600 text-white border-none"
                            onClick={onConfirm}
                        >
                            {confirmText}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

import { motion } from 'framer-motion';
import { Button } from '../../components/ui/Button';
import { CheckCircle2, Clock, MapPin, Smartphone } from 'lucide-react';

export const TimeTracking = () => {
    return (
        <div className="pt-24 pb-20">
            {/* Hero Feature */}
            <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-6">
                            <Clock className="w-4 h-4 mr-2" />
                            Control Horario
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                            Fichaje preciso, desde <span className="text-primary">cualquier lugar</span>
                        </h1>
                        <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                            Permite a tu equipo fichar desde el móvil, la web o un kiosco tablet. Todo sincronizado en tiempo real y con geolocalización verificada.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button size="lg" onClick={() => window.location.href = "/register"}>
                                Ver Planes
                            </Button>
                        </div>
                    </motion.div>
                    
                    <motion.div
                         initial={{ opacity: 0, scale: 0.9 }}
                         animate={{ opacity: 1, scale: 1 }}
                         transition={{ duration: 0.5, delay: 0.2 }}
                         className="relative"
                    >
                        <div className="aspect-square bg-surface-dark border border-white/10 rounded-3xl shadow-2xl relative overflow-hidden flex items-center justify-center">
                            {/* Visual Representation */}
                            <div className="w-64 h-auto bg-background-dark rounded-2xl border border-white/5 p-4 shadow-xl">
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <div className="h-2 w-16 bg-white/20 rounded mb-2"></div>
                                        <div className="h-3 w-24 bg-white/40 rounded"></div>
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-primary/20"></div>
                                </div>
                                <div className="space-y-3">
                                    <div className="h-12 bg-primary/10 rounded-lg flex items-center px-3 border border-primary/20">
                                         <div className="w-2 h-2 rounded-full bg-green-500 mr-3"></div>
                                         <div className="text-xs text-white">Entrada registrada 09:00</div>
                                    </div>
                                    <div className="h-12 bg-surface-light/5 rounded-lg flex items-center px-3">
                                         <div className="w-2 h-2 rounded-full bg-red-500 mr-3"></div>
                                         <div className="text-xs text-slate-400">Salida pendiente</div>
                                    </div>
                                </div>
                                <div className="mt-8">
                                    <div className="w-full h-10 bg-primary/20 rounded-lg flex items-center justify-center text-primary font-bold text-sm">
                                        Deslizar para salir
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Benefits Grid */}
             <section className="py-20 bg-surface-dark/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="p-6">
                            <div className="w-12 h-12 bg-surface-dark rounded-xl flex items-center justify-center mb-4 border border-white/5">
                                <Smartphone className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">App Móvil Intuitiva</h3>
                            <p className="text-slate-400">Tus empleados podrán fichar en segundos. Disponible para iOS y Android.</p>
                        </div>
                         <div className="p-6">
                            <div className="w-12 h-12 bg-surface-dark rounded-xl flex items-center justify-center mb-4 border border-white/5">
                                <MapPin className="w-6 h-6 text-purple-500" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Geolocalización GPS</h3>
                            <p className="text-slate-400">Verifica la ubicación exacta de cada fichaje. Ideal para equipos comerciales o remotos.</p>
                        </div>
                         <div className="p-6">
                            <div className="w-12 h-12 bg-surface-dark rounded-xl flex items-center justify-center mb-4 border border-white/5">
                                <CheckCircle2 className="w-6 h-6 text-green-500" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Informes Automáticos</h3>
                            <p className="text-slate-400">Genera informes de inspección con un solo clic. Exportable a PDF y Excel.</p>
                        </div>
                    </div>
                </div>
             </section>
        </div>
    );
};

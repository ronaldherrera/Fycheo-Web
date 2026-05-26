import { motion } from 'framer-motion';
import { Button } from '../../components/ui/Button';
import { Calendar, CheckCircle2, Plane, Users } from 'lucide-react';

export const Vacations = () => {
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
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-sm font-medium mb-6">
                            <Plane className="w-4 h-4 mr-2" />
                            Gestión de Vacaciones
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                            Adiós al caos de los <span className="text-primary">Excel</span> y los emails
                        </h1>
                        <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                            Centraliza todas las solicitudes de vacaciones y ausencias. Visualiza solapamientos y aprueba con un solo clic. Tu equipo te lo agradecerá.
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
                        {/* Mock Calendar UI */}
                        <div className="aspect-[4/3] bg-surface-dark border border-white/10 rounded-3xl shadow-2xl p-6 relative overflow-hidden">
                             <div className="flex justify-between items-center mb-6">
                                 <h3 className="text-white font-bold">Agosto 2024</h3>
                                 <div className="flex space-x-2">
                                     <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10" />
                                     <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10" />
                                 </div>
                             </div>
                             <div className="grid grid-cols-7 gap-2 text-center mb-2 text-xs text-slate-500 font-medium uppercase">
                                 <div>L</div><div>M</div><div>X</div><div>J</div><div>V</div><div>S</div><div>D</div>
                             </div>
                             <div className="grid grid-cols-7 gap-2">
                                 {[...Array(31)].map((_, i) => (
                                     <div key={i} className={`aspect-square rounded-lg flex items-center justify-center text-sm ${
                                         i >= 12 && i <= 16 ? 'bg-primary/20 text-primary border border-primary/30' : 
                                         i === 24 ? 'bg-green-500/20 text-green-500 border border-green-500/30' :
                                         'bg-white/5 text-slate-400'
                                     }`}>
                                         {i + 1}
                                     </div>
                                 ))}
                             </div>
                             
                             {/* Floating Notification */}
                             <motion.div 
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.8 }}
                                className="absolute bottom-6 left-6 right-6 bg-surface-light text-background-dark p-4 rounded-xl shadow-lg flex items-center gap-4"
                             >
                                 <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">JD</div>
                                 <div className="flex-1">
                                     <p className="text-sm font-bold">Juan solicita vacaciones</p>
                                     <p className="text-xs text-slate-500">12 Ago - 16 Ago · 5 días</p>
                                 </div>
                                 <div className="flex gap-2">
                                     <button className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200"><CheckCircle2 size={16} /></button>
                                 </div>
                             </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

             <section className="py-20 bg-surface-dark/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="p-6">
                            <div className="w-12 h-12 bg-surface-dark rounded-xl flex items-center justify-center mb-4 border border-white/5">
                                <Calendar className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Calendarios de Equipo</h3>
                            <p className="text-slate-400">Visualiza de un vistazo quién está trabajando y quién está fuera. Evita quedarte sin personal.</p>
                        </div>
                         <div className="p-6">
                            <div className="w-12 h-12 bg-surface-dark rounded-xl flex items-center justify-center mb-4 border border-white/5">
                                <Users className="w-6 h-6 text-purple-500" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Saldos Actualizados</h3>
                            <p className="text-slate-400">Cada empleado puede ver cuántos días le quedan. Sin necesidad de preguntar a RRHH.</p>
                        </div>
                         <div className="p-6">
                            <div className="w-12 h-12 bg-surface-dark rounded-xl flex items-center justify-center mb-4 border border-white/5">
                                <CheckCircle2 className="w-6 h-6 text-green-500" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Personalizable</h3>
                            <p className="text-slate-400">Configura diferentes tipos de ausencia: vacaciones, enfermedad, asuntos propios, teletrabajo...</p>
                        </div>
                    </div>
                </div>
             </section>
        </div>
    );
};

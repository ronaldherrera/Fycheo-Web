import { motion } from 'framer-motion';
import { Button } from '../../components/ui/Button';
import { BarChart3, FileText, PieChart, ShieldCheck } from 'lucide-react';

export const Reports = () => {
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
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-pink-500/10 text-pink-400 text-sm font-medium mb-6">
                            <BarChart3 className="w-4 h-4 mr-2" />
                            Informes y Auditoría
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                            Tus datos, siempre <span className="text-primary">al día y seguros</span>
                        </h1>
                        <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                            Genera informes detallados para la Inspección de Trabajo en un clic. Analiza la productividad y reduce el absentismo con datos reales.
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
                         {/* Reports UI Mock */}
                         <div className="aspect-[4/3] bg-surface-dark border border-white/10 rounded-3xl shadow-2xl p-6 relative overflow-hidden flex flex-col">
                             <div className="flex justify-between items-center mb-6">
                                 <div>
                                     <h3 className="text-white font-bold text-lg">Informe Mensual</h3>
                                     <p className="text-xs text-slate-500">Octubre 2024</p>
                                 </div>
                                 <Button variant="outline" size="sm" className="h-8">Exportar PDF</Button>
                             </div>
                             
                             <div className="flex-1 space-y-6">
                                 {/* Stats Cards */}
                                 <div className="grid grid-cols-2 gap-4">
                                     <div className="bg-white/5 p-3 rounded-xl">
                                         <p className="text-xs text-slate-400 mb-1">Horas Totales</p>
                                         <p className="text-xl font-bold text-white">4,230 h</p>
                                     </div>
                                     <div className="bg-white/5 p-3 rounded-xl">
                                         <p className="text-xs text-slate-400 mb-1">Puntualidad</p>
                                         <p className="text-xl font-bold text-green-400">98.5%</p>
                                     </div>
                                 </div>
                                 
                                 {/* Chart Mock */}
                                 <div className="flex-1 bg-white/5 rounded-xl p-4 flex items-end space-x-2 relative">
                                     <div className="w-1/6 bg-primary/30 h-[40%] rounded-t-sm"></div>
                                     <div className="w-1/6 bg-primary/50 h-[60%] rounded-t-sm"></div>
                                     <div className="w-1/6 bg-primary/70 h-[80%] rounded-t-sm"></div>
                                     <div className="w-1/6 bg-primary h-[50%] rounded-t-sm"></div>
                                     <div className="w-1/6 bg-primary/60 h-[70%] rounded-t-sm"></div>
                                     <div className="w-1/6 bg-primary/40 h-[55%] rounded-t-sm"></div>
                                     
                                     {/* Tooltip */}
                                     <motion.div 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 1 }}
                                        className="absolute top-4 left-1/2 -translate-x-1/2 bg-surface-light text-background-dark py-1 px-3 rounded-lg text-xs font-bold shadow-lg"
                                     >
                                         +12% vs mes anterior
                                     </motion.div>
                                 </div>
                             </div>
                         </div>
                    </motion.div>
                </div>
            </section>

             <section className="py-20 bg-surface-dark/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="p-6">
                            <div className="w-12 h-12 bg-surface-dark rounded-xl flex items-center justify-center mb-4 border border-white/5">
                                <FileText className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">A prueba de inspecciones</h3>
                            <p className="text-slate-400">Todos los registros se guardan durante 4 años. Exporta lo que te pidan en segundos.</p>
                        </div>
                         <div className="p-6">
                            <div className="w-12 h-12 bg-surface-dark rounded-xl flex items-center justify-center mb-4 border border-white/5">
                                <PieChart className="w-6 h-6 text-purple-500" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Analítica de RRHH</h3>
                            <p className="text-slate-400">Detecta patrones de absentismo, horas extra excesivas o falta de puntualidad.</p>
                        </div>
                         <div className="p-6">
                            <div className="w-12 h-12 bg-surface-dark rounded-xl flex items-center justify-center mb-4 border border-white/5">
                                <ShieldCheck className="w-6 h-6 text-green-500" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Seguridad Bancaria</h3>
                            <p className="text-slate-400">Tus datos están encriptados y seguros en la nube. Copias de seguridad diarias.</p>
                        </div>
                    </div>
                </div>
             </section>
        </div>
    );
};

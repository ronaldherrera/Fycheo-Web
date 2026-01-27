import { motion } from 'framer-motion';
import { Button } from '../../components/ui/Button';
import { Download, Layout, MessageSquare, Smartphone } from 'lucide-react';

export const Portal = () => {
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
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-sm font-medium mb-6">
                            <Layout className="w-4 h-4 mr-2" />
                            Portal del Empleado
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                            Empodera a tu equipo con su propio <span className="text-primary">espacio digital</span>
                        </h1>
                        <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                            Dales autonomía para gestionar sus documentos, nóminas y solicitudes. Una app intuitiva que reduce la carga administrativa de RRHH.
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
                         className="relative flex justify-center"
                    >
                         {/* Phone Mockup */}
                        <div className="relative border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[500px] w-[300px] shadow-xl">
                            <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
                            <div className="h-[32px] w-[3px] bg-gray-800 absolute -left-[17px] top-[72px] rounded-l-lg"></div>
                            <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
                            <div className="h-[64px] w-[3px] bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>
                            <div className="rounded-[2rem] overflow-hidden w-full h-full bg-background-dark relative">
                                {/* App Content Mock */}
                                <div className="p-6 pt-12 text-white">
                                    <h3 className="text-xl font-bold mb-1">Hola, Ana 👋</h3>
                                    <p className="text-sm text-slate-400 mb-6">Tienes 2 tareas pendientes</p>
                                    
                                    <div className="bg-surface-dark p-4 rounded-xl border border-white/5 mb-4">
                                        <div className="text-xs text-slate-400 mb-1">Horas hoy</div>
                                        <div className="text-2xl font-bold text-primary">04:32 h</div>
                                        <div className="w-full bg-white/10 h-1 mt-3 rounded-full overflow-hidden">
                                            <div className="bg-primary w-1/2 h-full rounded-full"></div>
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-surface-dark p-4 rounded-xl border border-white/5 flex flex-col items-center justify-center gap-2 aspect-square">
                                            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400"><Download size={20} /></div>
                                            <span className="text-xs font-medium">Nóminas</span>
                                        </div>
                                        <div className="bg-surface-dark p-4 rounded-xl border border-white/5 flex flex-col items-center justify-center gap-2 aspect-square">
                                            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400"><MessageSquare size={20} /></div>
                                            <span className="text-xs font-medium">Solicitudes</span>
                                        </div>
                                    </div>
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
                                <Download className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Gestor Documental</h3>
                            <p className="text-slate-400">Comparte nóminas, contratos y políticas de empresa de forma segura. Cumple con la RGPD.</p>
                        </div>
                         <div className="p-6">
                            <div className="w-12 h-12 bg-surface-dark rounded-xl flex items-center justify-center mb-4 border border-white/5">
                                <Smartphone className="w-6 h-6 text-purple-500" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Todo en el Bolsillo</h3>
                            <p className="text-slate-400">Acceso 24/7 desde cualquier dispositivo. La oficina en la palma de su mano.</p>
                        </div>
                         <div className="p-6">
                            <div className="w-12 h-12 bg-surface-dark rounded-xl flex items-center justify-center mb-4 border border-white/5">
                                <MessageSquare className="w-6 h-6 text-green-500" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Comunicación Fluidas</h3>
                            <p className="text-slate-400">Noticias de empresa, avisos y solicitudes en un canal centralizado.</p>
                        </div>
                    </div>
                </div>
             </section>
        </div>
    );
};

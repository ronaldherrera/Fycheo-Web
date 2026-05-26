import { ArrowRight, CheckCircle2, Shield, Zap } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { motion } from 'framer-motion';

export const Home = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute top-40 right-10 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] animate-pulse delay-1000" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-primary-light text-sm font-semibold mb-6">
                🚀 La evolución del control horario
              </span>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-white leading-tight">
                Gestiona tu equipo <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
                  sin dolores de cabeza
                </span>
              </h1>
              <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                Control horario, vacaciones y gestión de turnos en una plataforma moderna que tus empleados realmente amarán usar. Cumple la ley en minutos.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Button size="lg" className="shadow-auto hover:shadow-glow-lg" onClick={() => window.location.href = "/register"}>
                  Empezar ahora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg">
                  Ver Demo en Vivo
                </Button>
              </div>
              
              <div className="mt-12 flex items-center justify-center space-x-6 text-sm text-slate-500">
                <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-green-500" /> Sin tarjeta de crédito</span>
                <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-green-500" /> Cancelación gratuita</span>
              </div>
            </motion.div>
          </div>
          
          {/* Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-20 relative mx-auto max-w-5xl"
          >
             <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-2xl blur opacity-30"></div>
             <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-background-dark">
                {/* Placeholder for App Screenshot */}
                <div className="aspect-[16/9] bg-surface-dark flex items-center justify-center text-slate-600 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-surface-dark to-background-dark opacity-50" />
                    {/* Mock UI Structure */}
                    <div className="w-full h-full p-8 flex space-x-6 opacity-80">
                         {/* Sidebar */}
                         <div className="w-64 bg-surface-dark/50 rounded-xl border border-white/5 p-4 space-y-4 hidden md:block">
                             <div className="h-8 w-3/4 bg-white/5 rounded" />
                             <div className="h-4 w-1/2 bg-white/5 rounded" />
                             <div className="h-4 w-2/3 bg-white/5 rounded" />
                         </div>
                         {/* Main Content */}
                         <div className="flex-1 space-y-6">
                             <div className="flex justify-between">
                                 <div className="h-10 w-1/3 bg-white/10 rounded-lg" />
                                 <div className="h-10 w-32 bg-primary/20 rounded-lg" />
                             </div>
                             <div className="grid grid-cols-3 gap-6">
                                 <div className="h-32 bg-surface-dark rounded-xl border border-white/5" />
                                 <div className="h-32 bg-surface-dark rounded-xl border border-white/5" />
                                 <div className="h-32 bg-surface-dark rounded-xl border border-white/5" />
                             </div>
                             <div className="h-64 bg-surface-dark rounded-xl border border-white/5" />
                         </div>
                    </div>
                </div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid Brief */}
      <section className="py-24 bg-surface-dark/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-white mb-4">Todo lo que necesitas, en un solo lugar</h2>
                <p className="text-slate-400 max-w-2xl mx-auto">Deja de usar Excel y múltiples herramientas. Fycheo centraliza toda la gestión de personas.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
                <Card className="hover:border-primary/50 transition-colors group">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-colors">
                        <Zap className="w-6 h-6 text-blue-500" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Fichaje Inteligente</h3>
                    <p className="text-slate-400 leading-relaxed">
                        Control horario desde web, app móvil o kiosco. Con geolocalización y reconocimiento facial opcional.
                    </p>
                </Card>
                <Card className="hover:border-primary/50 transition-colors group">
                    <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-purple-500/20 transition-colors">
                        <Shield className="w-6 h-6 text-purple-500" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Cumplimiento Legal</h3>
                    <p className="text-slate-400 leading-relaxed">
                        Olvídate de las multas. Cumplimos estrictamente con el registro de jornada y la ley de desconexión digital.
                    </p>
                </Card>
                <Card className="hover:border-primary/50 transition-colors group">
                    <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-green-500/20 transition-colors">
                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Vacaciones y Ausencias</h3>
                    <p className="text-slate-400 leading-relaxed">
                        Flujos de aprobación automáticos. Calendarios visuales para ver quién está fuera de un vistazo.
                    </p>
                </Card>
            </div>
        </div>
      </section>
    </div>
  );
};

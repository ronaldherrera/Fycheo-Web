
import { Check } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { motion } from 'framer-motion';

export const AlternativeSesame = () => {
  return (
    <div className="pt-24 pb-20 overflow-hidden">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20">
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
              La alternativa inteligente a <span className="text-purple-500">Sesame</span>
            </h1>
            <p className="text-xl text-slate-400 mb-10 leading-relaxed">
              Consigue las mismas funcionalidades de control horario y gestión de RRHH, pero con una interfaz más limpia y un soporte que sí responde.
            </p>
            <div className="flex justify-center gap-4">
               <Button size="lg" onClick={() => window.location.href = "/register"}>
                  Empezar ahora
               </Button>
               <Button variant="outline" size="lg" onClick={() => window.location.href = "/pricing"}>
                  Comparar Planes
               </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20">
          <div className="bg-surface-dark border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
              <div className="grid grid-cols-3 p-6 border-b border-white/5 bg-white/5">
                  <div className="col-span-1 font-bold text-slate-400">Característica</div>
                  <div className="col-span-1 font-bold text-center text-primary text-xl">Fycheo</div>
                  <div className="col-span-1 font-bold text-center text-slate-500 text-xl">Sesame</div>
              </div>
              
              {[
                  { feature: "Geolocalización GPS", fycheo: true, competitor: true },
                  { feature: "Gestor de Vacaciones", fycheo: true, competitor: true },
                  { feature: "Bolsa de Horas", fycheo: true, competitor: true },
                  { feature: "Interfaz Intuitiva", fycheo: "Premium & Simple", competitor: "Funcional" },
                  { feature: "Atención Telefónica", fycheo: "Incluido", competitor: "Limitada" },
                  { feature: "Coste Oculto", fycheo: "Ninguno", competitor: "Setup fee" },
              ].map((row, i) => (
                  <div key={i} className="grid grid-cols-3 p-6 border-b border-white/5 hover:bg-white/5 transition-colors items-center">
                      <div className="col-span-1 text-slate-300 font-medium">{row.feature}</div>
                      <div className="col-span-1 text-center font-bold text-white flex justify-center">
                          {row.fycheo === true ? <Check className="text-green-500" /> : row.fycheo}
                      </div>
                      <div className="col-span-1 text-center text-slate-500 flex justify-center">
                          {row.competitor === true ? <Check className="text-slate-500" /> : row.competitor}
                      </div>
                  </div>
              ))}
              
              <div className="p-8 text-center bg-primary/10">
                  <p className="text-white text-lg font-bold mb-2">Moderniza tu gestión de RRHH</p>
                  <p className="text-slate-400 text-sm mb-6">Moderniza tu gestión de RRHH hoy mismo.</p>
                  <Button onClick={() => window.location.href = "/register"}>Comenzar ahora</Button>
              </div>
          </div>
      </section>
      
      {/* Testimonials or "Why Switch" */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card>
                  <div className="mb-4 text-4xl">🚀</div>
                  <h3 className="text-lg font-bold text-white mb-2">Más Rápido</h3>
                  <p className="text-slate-400">Nuestra app carga al instante. Sin esperas para fichar o pedir vacaciones.</p>
              </Card>
              <Card>
                  <div className="mb-4 text-4xl">🎨</div>
                  <h3 className="text-lg font-bold text-white mb-2">Mejor Diseño</h3>
                  <p className="text-slate-400">Una experiencia visual cuidada al detalle, con modo oscuro nativo.</p>
              </Card>
          </div>
      </section>
    </div>
  );
};

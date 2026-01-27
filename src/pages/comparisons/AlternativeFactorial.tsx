
import { Check } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { motion } from 'framer-motion';

export const AlternativeFactorial = () => {
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
              La mejor alternativa a <span className="text-pink-500">Factorial</span>
            </h1>
            <p className="text-xl text-slate-400 mb-10 leading-relaxed">
              ¿Buscas un software de RRHH potente pero más sencillo y económico? Pásate a Fycheo y ahorra hasta un 40% en tu factura anual.
            </p>
            <div className="flex justify-center gap-4">
               <Button size="lg" onClick={() => window.location.href = "/register"}>
                  Empezar ahora
               </Button>
               <Button variant="outline" size="lg" onClick={() => window.location.href = "/pricing"}>
                  Ver Precios
               </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20">
          <div className="bg-surface-dark border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
              <div className="grid grid-cols-3 p-6 border-b border-white/5 bg-white/5">
                  <div className="col-span-1 font-bold text-slate-400">Funcionalidad</div>
                  <div className="col-span-1 font-bold text-center text-primary text-xl">Fycheo</div>
                  <div className="col-span-1 font-bold text-center text-slate-500 text-xl">Factorial</div>
              </div>
              
              {[
                  { feature: "Control Horario", fycheo: true, competitor: true },
                  { feature: "App Móvil (iOS/Android)", fycheo: true, competitor: true },
                  { feature: "Gestor Documental", fycheo: true, competitor: true },
                  { feature: "Precio desde", fycheo: "9€/mes", competitor: "Variable" },
                  { feature: "Soporte Prioritario", fycheo: true, competitor: "Solo pago extra" },
                  { feature: "Implementación", fycheo: "En minutos", competitor: "Semanas" },
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
                  <p className="text-white text-lg font-bold mb-2">¿Listo para el cambio?</p>
                  <p className="text-slate-400 text-sm mb-6">Migración de datos gratuita desde Factorial.</p>
                  <Button onClick={() => window.location.href = "/register"}>Crear cuenta</Button>
              </div>
          </div>
      </section>
      
      {/* Testimonials or "Why Switch" */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-12">Por qué los equipos eligen Fycheo</h2>
          <div className="grid md:grid-cols-3 gap-8">
              <Card>
                  <h3 className="text-lg font-bold text-white mb-2">Simplicidad Radical</h3>
                  <p className="text-slate-400">No necesitas un curso para usarlo. Diseñado para que cualquier empleado lo entienda al instante.</p>
              </Card>
              <Card>
                  <h3 className="text-lg font-bold text-white mb-2">Soporte Humano</h3>
                  <p className="text-slate-400">Hablamos tu idioma. Nada de bots que te dan vueltas. Respuestas rápidas y útiles.</p>
              </Card>
              <Card>
                  <h3 className="text-lg font-bold text-white mb-2">Transparencia Total</h3>
                  <p className="text-slate-400">Sin costes ocultos por implementación o mantenimiento. Lo que ves es lo que pagas.</p>
              </Card>
          </div>
      </section>
    </div>
  );
};

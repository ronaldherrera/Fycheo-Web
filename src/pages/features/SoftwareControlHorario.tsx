import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { SEOHead } from '../../components/SEOHead';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { ChevronDown, Monitor, Sparkles, ShieldCheck } from 'lucide-react';

export const SoftwareControlHorario = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    { q: "¿Qué ventajas aporta un software de control horario frente al papel?", a: "Un software automatiza los registros, elimina el riesgo de pérdida física de hojas, calcula las horas netas y horas extra al instante, y ofrece informes legalmente blindados para Inspección." },
    { q: "¿Es necesario pagar un coste de instalación o configuración?", a: "No. Con Fycheo la configuración es autogestionable y gratuita. En menos de 15 minutos puedes subir tu plantilla y estar operando sin costes adicionales." },
    { q: "¿Pueden fichar empleados que viajan o están fuera de la oficina?", a: "Sí, el software permite fichajes móviles y geolocalizados, por lo que es ideal para empleados comerciales, técnicos en ruta o teletrabajo." }
  ];

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Software de Control Horario Fycheo",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web, Mobile",
    "description": "Software sencillo de control horario y gestión de fichajes para pymes y empresas en España.",
    "offers": {
      "@type": "Offer",
      "priceCurrency": "EUR",
      "price": "TODO"
    }
  };

  return (
    <div className="bg-background-dark min-h-screen text-white pt-32 pb-20">
      <SEOHead
        title="Software de control horario para empresas | Fycheo"
        description="Fycheo es un software de control horario para registrar fichajes, gestionar empleados, vacaciones e informes desde un solo lugar de manera digital y segura."
        jsonLd={softwareSchema}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HERO */}
        <section className="text-center mb-20 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="text-primary font-bold text-xs uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
              SaaS B2B Inteligente
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 mt-4 leading-tight">
              El software de control horario que tus empleados sí usarán
            </h1>
            <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
              Consolida fichajes, gestiona calendarios de vacaciones y genera informes de jornada en segundos. Diseñado para simplificar los procesos internos de tu pyme.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button size="lg" className="shadow-glow" onClick={() => window.location.href = '/register'}>
                Empezar Prueba Gratuita
              </Button>
              <Button variant="outline" size="lg" className="border-white/10 hover:bg-white/5" onClick={() => window.location.href = '/precios'}>
                Consultar Tarifas
              </Button>
            </div>
          </motion.div>
        </section>

        {/* IMAGE PLACEHOLDER */}
        <section className="mb-24 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <ImagePlaceholder
              filename="software-control-horario-fycheo.webp"
              path="/public/images/seo/software-control-horario-fycheo.webp"
              description="Vista general del panel del manager en Fycheo, mostrando gráficos de asistencia diaria, ausencias pendientes de aprobación e informes mensuales."
              alt="Software de control horario para empresas y pymes."
              type="hero"
              aspectRatio="aspect-video"
            />
          </motion.div>
        </section>

        {/* COMPARATIVA TABLA */}
        <section className="mb-24 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">¿Por qué un software es mejor que plantillas manuales?</h2>
          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-surface-dark">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-slate-400">
                  <th className="p-5 font-semibold">Característica</th>
                  <th className="p-5 text-center">Hojas de Papel</th>
                  <th className="p-5 text-center">Fórmulas en Excel</th>
                  <th className="p-5 text-center bg-primary/10 text-white font-bold">Fycheo Software</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                <tr>
                  <td className="p-5 font-medium">Inalterabilidad de registros (Ley)</td>
                  <td className="p-5 text-center text-red-400">No (Editable)</td>
                  <td className="p-5 text-center text-red-400">No (Modificable)</td>
                  <td className="p-5 text-center text-green-400 font-bold bg-primary/5">Sí (Seguro)</td>
                </tr>
                <tr>
                  <td className="p-5 font-medium">Cómputo en tiempo real</td>
                  <td className="p-5 text-center text-red-400">No</td>
                  <td className="p-5 text-center text-red-400">No</td>
                  <td className="p-5 text-center text-green-400 font-bold bg-primary/5">Sí</td>
                </tr>
                <tr>
                  <td className="p-5 font-medium">Gestión integrada de vacaciones</td>
                  <td className="p-5 text-center text-red-400">No</td>
                  <td className="p-5 text-center text-red-400">Parcial</td>
                  <td className="p-5 text-center text-green-400 font-bold bg-primary/5">Sí</td>
                </tr>
                <tr>
                  <td className="p-5 font-medium">Exportaciones oficiales rápidas</td>
                  <td className="p-5 text-center text-red-400">Horas de trabajo</td>
                  <td className="p-5 text-center text-yellow-400">Trabajo manual</td>
                  <td className="p-5 text-center text-green-400 font-bold bg-primary/5">1 Clic</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* CARACTERÍSTICAS CLAVE */}
        <section className="mb-24 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Características del software comercial</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-surface-dark border border-white/5 rounded-2xl">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Monitor className="text-primary-light w-5 h-5" />
              </div>
              <h4 className="font-bold text-lg mb-2 text-white">Multiplataforma</h4>
              <p className="text-sm text-slate-400 leading-relaxed">Ficha desde cualquier navegador web, dispositivo móvil u ordenador de forma ágil.</p>
            </div>
            <div className="p-6 bg-surface-dark border border-white/5 rounded-2xl">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <ShieldCheck className="text-primary-light w-5 h-5" />
              </div>
              <h4 className="font-bold text-lg mb-2 text-white">Conexión de seguridad</h4>
              <p className="text-sm text-slate-400 leading-relaxed">Datos protegidos bajo infraestructura en la nube RGPD y cifrado inalterable.</p>
            </div>
            <div className="p-6 bg-surface-dark border border-white/5 rounded-2xl">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="text-primary-light w-5 h-5" />
              </div>
              <h4 className="font-bold text-lg mb-2 text-white">Incidencias y avisos</h4>
              <p className="text-sm text-slate-400 leading-relaxed">Notificaciones inmediatas cuando un empleado olvida registrar su salida o pausa.</p>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="max-w-4xl mx-auto mb-24">
          <h2 className="text-3xl font-bold text-center mb-12">Dudas habituales sobre el software</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-white/10 bg-surface-dark rounded-xl overflow-hidden transition-all duration-200">
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-semibold text-slate-200 text-sm md:text-base">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform duration-200 flex-shrink-0 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-6 pb-5 pt-2 text-slate-400 text-sm leading-relaxed border-t border-white/5">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="bg-primary/20 border border-primary/30 rounded-3xl p-12 text-center max-w-5xl mx-auto relative overflow-hidden">
          <div className="absolute -left-20 -top-20 w-60 h-60 bg-primary/10 rounded-full blur-3xl" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Lleva el control de presencia a otro nivel</h2>
          <p className="text-slate-300 text-lg mb-8 max-w-xl mx-auto">
            Olvídate del papel y de los errores manuales. Consigue trazabilidad y tranquilidad legal hoy.
          </p>
          <Button size="lg" className="shadow-glow" onClick={() => window.location.href = '/register'}>
            Registrar mi Empresa Gratis
          </Button>
        </section>
      </div>
    </div>
  );
};

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { SEOHead } from '../../components/SEOHead';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { ChevronDown, Clock, ShieldAlert, BadgeAlert, FileCheck, CheckCircle2 } from 'lucide-react';

export const ControlHorario = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    { q: "¿Qué exige exactamente la ley de control horario?", a: "La ley exige registrar diariamente la hora de entrada y salida de cada empleado, incluyendo las pausas. Debes guardar estos registros durante 4 años y tenerlos accesibles al instante." },
    { q: "¿Sirve el registro en papel para cumplir la normativa?", a: "Aunque la ley no lo prohíbe, en la práctica el papel no garantiza la inalterabilidad de los datos exigida por los inspectores y su gestión manual resulta ineficiente para la empresa." },
    { q: "¿Cómo controla Fycheo los olvidos de fichaje?", a: "El empleado puede solicitar correcciones de fichaje directamente desde su cuenta, que el mánager aprueba con un solo clic. Todo cambio queda registrado para total transparencia legal." },
    { q: "¿Es compatible con empleados en teletrabajo?", a: "Totalmente. Los empleados pueden fichar con total validez legal desde su móvil u ordenador, registrando su ubicación de forma transparente." }
  ];

  const controlHorarioSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Control Horario de Empleados | Fycheo",
    "description": "Organiza el control horario de tus empleados de manera digital con fichajes sencillos, informes y cumplimiento de la ley española.",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://fycheo.es" },
        { "@type": "ListItem", "position": 2, "name": "Control Horario", "item": "https://fycheo.es/control-horario" }
      ]
    }
  };

  return (
    <div className="bg-background-dark min-h-screen text-white pt-32 pb-20">
      <SEOHead
        title="Control horario de empleados sencillo | Fycheo"
        description="Organiza el control horario de tus empleados con fichajes digitales, informes y un panel claro para tu empresa. Cumple la ley sin papeleos."
        jsonLd={controlHorarioSchema}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HERO SECTION */}
        <section className="text-center mb-20 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="text-primary font-bold text-xs uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
              Cumplimiento Legal y Sencillez
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 mt-4 leading-tight">
              Control horario sin complicaciones para tu equipo
            </h1>
            <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
              Registra entradas, salidas y descansos diariamente. Cumple con la ley de registro de jornada de forma 100% digital sin perder tiempo en tareas administrativas.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button size="lg" className="shadow-glow" onClick={() => window.location.href = '/register'}>
                Probar Fycheo Gratis
              </Button>
              <Button variant="outline" size="lg" className="border-white/10 hover:bg-white/5" onClick={() => window.location.href = '/precios'}>
                Ver planes de precio
              </Button>
            </div>
          </motion.div>
        </section>

        {/* IMAGE BLOCK */}
        <section className="mb-24 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <ImagePlaceholder
              filename="control-horario-fycheo.webp"
              path="/public/images/seo/control-horario-fycheo.webp"
              description="Pantalla de Fycheo mostrando las entradas, salidas y horas trabajadas acumuladas de cada empleado de forma transparente."
              alt="Control horario de empleados con Fycheo."
              type="mockup"
              aspectRatio="aspect-video"
            />
          </motion.div>
        </section>

        {/* DOLOR VS SOLUCIÓN */}
        <section className="grid lg:grid-cols-2 gap-12 mb-24 max-w-5xl mx-auto">
          <div className="bg-red-950/20 border border-red-900/30 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-red-400 mb-6 flex items-center gap-2">
              <ShieldAlert /> El caos de gestionar el control horario a mano
            </h3>
            <ul className="space-y-4 text-slate-300 text-sm leading-relaxed">
              <li className="flex items-start gap-2">
                <BadgeAlert className="text-red-500 w-5 h-5 flex-shrink-0 mt-0.5" />
                <span><strong>Hojas de papel perdidas:</strong> Firmas que se olvidan apuntar a final de mes y retrasan el cómputo de las nóminas.</span>
              </li>
              <li className="flex items-start gap-2">
                <BadgeAlert className="text-red-500 w-5 h-5 flex-shrink-0 mt-0.5" />
                <span><strong>Falta de trazabilidad:</strong> Excels editables que pueden ser invalidados en una inspección de trabajo por falta de seguridad.</span>
              </li>
              <li className="flex items-start gap-2">
                <BadgeAlert className="text-red-500 w-5 h-5 flex-shrink-0 mt-0.5" />
                <span><strong>Horas extras sin control:</strong> Imposibilidad de saber el saldo real de horas acumuladas sin hacer cálculos manuales constantes.</span>
              </li>
            </ul>
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-primary-light mb-6 flex items-center gap-2">
              <FileCheck className="text-primary-light" /> La tranquilidad de automatizar con Fycheo
            </h3>
            <ul className="space-y-4 text-slate-300 text-sm leading-relaxed">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="text-primary w-5 h-5 flex-shrink-0 mt-0.5" />
                <span><strong>Fichajes en un clic:</strong> La plantilla registra su jornada de entrada, salida y pausas desde cualquier dispositivo autorizado.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="text-primary w-5 h-5 flex-shrink-0 mt-0.5" />
                <span><strong>Garantía de inalterabilidad:</strong> Registro digital encriptado y seguro que cumple rigurosamente con la normativa laboral.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="text-primary w-5 h-5 flex-shrink-0 mt-0.5" />
                <span><strong>Cálculos automáticos:</strong> El panel computa las horas netas y horas extraordinarias cruzando los horarios asignados de forma instantánea.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* BENEFICIOS DETALLADOS */}
        <section className="mb-24 text-center max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12">¿Por qué dar el salto al control de presencia digital?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-surface-dark border border-white/5 p-6 rounded-2xl">
              <Clock className="text-primary w-8 h-8 mx-auto mb-4" />
              <h4 className="font-bold text-lg mb-2 text-white">Flexibilidad horaria</h4>
              <p className="text-sm text-slate-400">Asigna horarios fijos, rotativos o flexibles a cada empleado de forma individualizada.</p>
            </div>
            <div className="bg-surface-dark border border-white/5 p-6 rounded-2xl">
              <Clock className="text-primary w-8 h-8 mx-auto mb-4" />
              <h4 className="font-bold text-lg mb-2 text-white">Informes oficiales</h4>
              <p className="text-sm text-slate-400">Exporta los reportes exigidos por ley en formato PDF o Excel en un clic y al momento.</p>
            </div>
            <div className="bg-surface-dark border border-white/5 p-6 rounded-2xl">
              <Clock className="text-primary w-8 h-8 mx-auto mb-4" />
              <h4 className="font-bold text-lg mb-2 text-white">Sencillez operativa</h4>
              <p className="text-sm text-slate-400">Reduce hasta un 90% las horas dedicadas a tareas de administración de personal de tu pyme.</p>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="max-w-4xl mx-auto mb-24">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Preguntas frecuentes</h2>
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
          <div className="absolute -right-20 -top-20 w-60 h-60 bg-primary/10 rounded-full blur-3xl" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Empieza a digitalizar tu control horario hoy</h2>
          <p className="text-slate-300 text-lg mb-8 max-w-xl mx-auto">
            Configura Fycheo en menos de 15 minutos y olvídate de los Excels e impresos manuales de una vez por todas.
          </p>
          <Button size="lg" className="shadow-glow" onClick={() => window.location.href = '/register'}>
            Comenzar Prueba Gratuita
          </Button>
          <span className="block text-xs text-slate-500 mt-4">14 días de prueba · Sin tarjeta · Soporte en español</span>
        </section>
      </div>
    </div>
  );
};

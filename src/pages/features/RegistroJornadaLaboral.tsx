import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { SEOHead } from '../../components/SEOHead';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { ChevronDown, AlertTriangle, ShieldCheck, Scale, FileText } from 'lucide-react';

export const RegistroJornadaLaboral = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    { q: "¿Qué empresas están obligadas a llevar el registro de jornada?", a: "Todas las empresas en España, sin importar su tamaño o volumen de negocio, que cuenten con trabajadores por cuenta ajena (régimen general) tienen la obligación de registrar su jornada laboral." },
    { q: "¿Qué sanciones se aplican en caso de incumplir con la ley?", a: "Las multas por infracciones graves de registro de jornada oscilan entre los 7.500 y los 10.000 euros. Las sanciones dependen de la gravedad del caso y de si hay reincidencia." },
    { q: "¿Sirve con registrar únicamente los horarios previstos en los cuadrantes?", a: "No. El registro debe reflejar la jornada real efectuada por cada empleado, no los turnos teóricos programados inicialmente." }
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Registro de Jornada Laboral Obligatorio | Fycheo",
    "description": "Guía informativa sobre la obligatoriedad de registrar la jornada laboral de tus trabajadores según la normativa de España.",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://fycheo.es" },
        { "@type": "ListItem", "position": 2, "name": "Registro de Jornada", "item": "https://fycheo.es/registro-jornada-laboral" }
      ]
    }
  };

  return (
    <div className="bg-background-dark min-h-screen text-white pt-32 pb-20">
      <SEOHead
        title="Registro de jornada laboral para empresas | Fycheo"
        description="Mantén organizado el registro de jornada laboral de tus empleados con fichajes, informes y control horario digital según la ley española."
        jsonLd={schema}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HERO */}
        <section className="text-center mb-20 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="text-primary font-bold text-xs uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
              Guía Legal e Informativa
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 mt-4 leading-tight">
              Cumplimiento del Registro de Jornada Laboral
            </h1>
            <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
              Descubre los requisitos esenciales del Real Decreto-ley 8/2019 de control horario y cómo asegurar el blindaje de tu empresa ante auditorías e inspecciones rutinarias.
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="shadow-glow" onClick={() => window.location.href = '/register'}>
                Comenzar Prueba de 14 Días
              </Button>
            </div>
          </motion.div>
        </section>

        {/* NOTA DE ADVERTENCIA LEGAL */}
        <section className="mb-16 max-w-4xl mx-auto">
          <div className="bg-yellow-950/20 border border-yellow-900/30 rounded-2xl p-6 flex gap-4 items-start">
            <AlertTriangle className="text-yellow-500 w-6 h-6 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-yellow-500 mb-1">Cláusula de exención de responsabilidad</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                La información facilitada en esta página es orientativa, tiene carácter meramente divulgativo y no constituye asesoramiento legal, jurídico o laboral profesional. Ante cualquier duda o particularidad de tu convenio colectivo, te recomendamos consultar directamente con tu asesoría o un abogado especializado.
              </p>
            </div>
          </div>
        </section>

        {/* IMAGE */}
        <section className="mb-24 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <ImagePlaceholder
              filename="registro-jornada-laboral-fycheo.webp"
              path="/public/images/seo/registro-jornada-laboral-fycheo.webp"
              description="Visualización del reporte oficial generado mensualmente por el software Fycheo, ordenando las horas netas de la jornada laboral."
              alt="Registro de jornada laboral e informes de control horario con Fycheo."
              type="mockup"
              aspectRatio="aspect-video"
            />
          </motion.div>
        </section>

        {/* REQUISITOS CLAVE */}
        <section className="grid lg:grid-cols-3 gap-8 mb-24 max-w-5xl mx-auto">
          <div className="p-6 bg-surface-dark border border-white/5 rounded-2xl">
            <Scale className="text-primary-light w-8 h-8 mb-4" />
            <h3 className="font-bold text-lg text-white mb-2">Estatuto de los Trabajadores</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              El artículo 34.9 obliga a registrar la hora de entrada y salida diaria de cada empleado, garantizando su fiabilidad.
            </p>
          </div>
          <div className="p-6 bg-surface-dark border border-white/5 rounded-2xl">
            <FileText className="text-primary-light w-8 h-8 mb-4" />
            <h3 className="font-bold text-lg text-white mb-2">Conservación de 4 años</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Las empresas deben archivar las jornadas mensuales de forma segura y accesible ante el requerimiento de inspección laboral.
            </p>
          </div>
          <div className="p-6 bg-surface-dark border border-white/5 rounded-2xl">
            <ShieldCheck className="text-primary-light w-8 h-8 mb-4" />
            <h3 className="font-bold text-lg text-white mb-2">Seguridad e inalterabilidad</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              El sistema utilizado debe garantizar que los datos registrados no sean alterados a posteriori de forma discrecional.
            </p>
          </div>
        </section>

        {/* FAQS */}
        <section className="max-w-4xl mx-auto mb-24">
          <h2 className="text-3xl font-bold text-center mb-12">Preguntas frecuentes legales</h2>
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

        {/* CTA */}
        <section className="bg-primary/20 border border-primary/30 rounded-3xl p-12 text-center max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">Garantiza el cumplimiento en tu pyme</h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto">
            Utiliza una herramienta digital segura para registrar fichajes e imprimir informes homologados.
          </p>
          <Button size="lg" className="shadow-glow" onClick={() => window.location.href = '/register'}>
            Registrar mi Empresa
          </Button>
        </section>
      </div>
    </div>
  );
};

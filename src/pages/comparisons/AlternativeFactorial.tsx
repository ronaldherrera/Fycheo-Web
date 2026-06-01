import { Check, Info } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { motion } from 'framer-motion';
import { SEOHead } from '../../components/SEOHead';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';

export const AlternativeFactorial = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Alternativa a Factorial para Pymes | Fycheo",
    "description": "Si buscas una solución sencilla y económica de control horario para tu pyme en lugar de un ERP de recursos humanos complejo, conoce Fycheo.",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://fycheo.es" },
        { "@type": "ListItem", "position": 2, "name": "Alternativa Factorial", "item": "https://fycheo.es/alternativa-factorial" }
      ]
    }
  };

  return (
    <div className="pt-32 pb-20 bg-background-dark min-h-screen text-slate-300">
      <SEOHead
        title="Alternativa a Factorial sencilla para control horario | Fycheo"
        description="¿Buscas una herramienta de control horario más sencilla y adaptada a tu pyme? Descubre Fycheo, la alternativa sin complicaciones y al grano."
        jsonLd={schema}
      />

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20 text-center">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-primary font-bold text-xs uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
              Comparativa de Soluciones
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 mt-4 leading-tight">
              Una alternativa sencilla y directa a Factorial
            </h1>
            <p className="text-xl text-slate-400 mb-10 leading-relaxed">
              Si tu pequeña o mediana empresa solo necesita llevar el control horario obligatorio, gestionar ausencias y sacar informes mensuales sin el coste ni la complejidad de un ERP completo de RRHH, Fycheo es para ti.
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="shadow-glow" onClick={() => window.location.href = "/register"}>
                Probar Fycheo Gratis
              </Button>
              <Button variant="outline" size="lg" className="border-white/10 hover:bg-white/5" onClick={() => window.location.href = "/precios"}>
                Consultar precios
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* IMAGE PLACEHOLDER */}
      <section className="mb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <ImagePlaceholder
            filename="alternativa-factorial-fycheo.webp"
            path="/public/images/seo/alternativa-factorial-fycheo.webp"
            description="Comparativa visual de interfaces: un panel simplificado enfocado únicamente en fichajes y vacaciones frente a una plataforma multi-módulo compleja."
            alt="Fycheo como alternativa sencilla para control horario."
            type="comparison"
            aspectRatio="aspect-video"
          />
        </motion.div>
      </section>

      {/* Tono prudente explicativo */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto mb-20">
        <div className="bg-surface-dark border border-white/5 p-6 rounded-2xl flex gap-3 items-start">
          <Info className="text-primary-light w-5 h-5 flex-shrink-0 mt-1" />
          <p className="text-xs text-slate-400 leading-relaxed">
            Factorial es una excelente plataforma para empresas que buscan una suite completa de nóminas, reclutamiento y evaluaciones. Sin embargo, para muchas pymes que solo necesitan registrar la jornada laboral y controlar ausencias diarias, resulta una herramienta sobredimensionada con una curva de aprendizaje y costes superiores. Fycheo se enfoca exclusivamente en la sencillez horaria.
          </p>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20">
        <div className="bg-surface-dark border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
          <div className="grid grid-cols-3 p-6 border-b border-white/5 bg-white/5 font-semibold text-slate-400 text-sm">
            <div className="col-span-1">Categoría general</div>
            <div className="col-span-1 text-center text-primary-light font-bold text-base">Fycheo</div>
            <div className="col-span-1 text-center">Suite Completa de RRHH</div>
          </div>
          
          {[
            { feature: "Control de jornada y fichajes (Legal)", fycheo: true, competitor: true },
            { feature: "App móvil de fichaje de empleados", fycheo: true, competitor: true },
            { feature: "Solicitud y aprobación de vacaciones", fycheo: true, competitor: true },
            { feature: "Configuración ágil (menos de 24 horas)", fycheo: true, competitor: "Suele requerir implantación" },
            { feature: "Curva de aprendizaje para la plantilla", fycheo: "Inmediata (2 toques)", competitor: "Media-Alta" },
            { feature: "Enfoque principal del software", fycheo: "Control horario y ausencias", competitor: "ERP Integral / Talento" },
          ].map((row, i) => (
            <div key={i} className="grid grid-cols-3 p-6 border-b border-white/5 hover:bg-white/[0.02] transition-colors items-center text-sm">
              <div className="col-span-1 text-slate-300 font-medium">{row.feature}</div>
              <div className="col-span-1 text-center font-bold text-white flex justify-center">
                {row.fycheo === true ? <Check className="text-green-500 w-5 h-5" /> : row.fycheo}
              </div>
              <div className="col-span-1 text-center text-slate-500 flex justify-center">
                {row.competitor === true ? <Check className="text-slate-600 w-5 h-5" /> : row.competitor}
              </div>
            </div>
          ))}
          
          <div className="p-8 text-center bg-primary/10">
            <p className="text-white text-lg font-bold mb-2">¿Quieres simplificar tus procesos?</p>
            <p className="text-slate-400 text-sm mb-6">Migra hoy tus registros y empieza a operar de inmediato.</p>
            <Button className="shadow-glow" onClick={() => window.location.href = "/register"}>Crear Cuenta Gratis</Button>
          </div>
        </div>
      </section>
      
      {/* Why Switch */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-12">Por qué las pymes eligen dar el salto a Fycheo</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-surface-dark border-white/5">
            <h3 className="text-lg font-bold text-white mb-2">Puesta en marcha inmediata</h3>
            <p className="text-sm text-slate-400 leading-relaxed">Sube tu plantilla y empieza a registrar fichajes en menos de 15 minutos sin ayuda de consultores externos.</p>
          </Card>
          <Card className="bg-surface-dark border-white/5">
            <h3 className="text-lg font-bold text-white mb-2">Sin funcionalidades vacías</h3>
            <p className="text-sm text-slate-400 leading-relaxed">No pagas por módulos complejos de evaluaciones de desempeño o onboarding que tu pyme no necesita en su día a día.</p>
          </Card>
          <Card className="bg-surface-dark border-white/5">
            <h3 className="text-lg font-bold text-white mb-2">Tono y soporte cercano</h3>
            <p className="text-sm text-slate-400 leading-relaxed">Soporte directo por chat o email en español con personas reales que resuelven tus dudas al instante.</p>
          </Card>
        </div>
      </section>
    </div>
  );
};

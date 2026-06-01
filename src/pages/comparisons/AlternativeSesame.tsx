import { Check, Info } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { motion } from 'framer-motion';
import { SEOHead } from '../../components/SEOHead';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';

export const AlternativeSesame = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Alternativa a Sesame para Empresas | Fycheo",
    "description": "Si buscas una herramienta sencilla y rápida para gestionar los fichajes y las ausencias de tus trabajadores, conoce a Fycheo.",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://fycheo.es" },
        { "@type": "ListItem", "position": 2, "name": "Alternativa Sesame", "item": "https://fycheo.es/alternativa-sesame" }
      ]
    }
  };

  return (
    <div className="pt-32 pb-20 bg-background-dark min-h-screen text-slate-300">
      <SEOHead
        title="Alternativa a Sesame para fichaje de empleados | Fycheo"
        description="Descubre Fycheo como alternativa a Sesame. Un software de control horario pensado para pymes que quieren simplicidad, rapidez y precio claro."
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
              Comparativas del Mercado
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 mt-4 leading-tight">
              Una alternativa enfocada en el fichaje de empleados
            </h1>
            <p className="text-xl text-slate-400 mb-10 leading-relaxed">
              Si tu prioridad es la sencillez y el fichaje diario rápido de tu plantilla, descubre Fycheo. Un software sin tarifas ocultas, de puesta en marcha ágil y soporte prioritario.
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="shadow-glow" onClick={() => window.location.href = "/register"}>
                Comenzar Gratis
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
            filename="alternativa-sesame-fycheo.webp"
            path="/public/images/seo/alternativa-sesame-fycheo.webp"
            description="Mockup de comparación: portal del empleado rápido e intuitivo para fichar en dos clics frente a pantallas multi-menú complejas."
            alt="Fycheo como alternativa para fichaje de empleados."
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
            Sesame ofrece un software excelente con funciones avanzadas de cuadrantes de turnos y métricas de productividad complejas. Sin embargo, si lo que tu empresa busca es sencillez organizativa, rapidez de uso diaria en los fichajes y precios claros sin cuotas de implementación elevadas, Fycheo se presenta como una alternativa sumamente adaptada para pymes.
          </p>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20">
        <div className="bg-surface-dark border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
          <div className="grid grid-cols-3 p-6 border-b border-white/5 bg-white/5 font-semibold text-slate-400 text-sm">
            <div className="col-span-1">Característica general</div>
            <div className="col-span-1 text-center text-primary-light font-bold text-base">Fycheo</div>
            <div className="col-span-1 text-center">Suite de Control Horario Completa</div>
          </div>
          
          {[
            { feature: "Fichaje diario (móvil, web, tablet)", fycheo: true, competitor: true },
            { feature: "Geolocalización GPS y geofencing opcional", fycheo: true, competitor: true },
            { feature: "Aprobación mensual de solicitudes", fycheo: true, competitor: true },
            { feature: "Atención al cliente en español directa", fycheo: "Sí, todos los planes", competitor: "Variable según plan" },
            { feature: "Instalación autogestionada (gratis)", fycheo: true, competitor: "Suele requerir setup fee" },
            { feature: "Enfoque de interfaz de usuario", fycheo: "Simplificada y directa", competitor: "Avanzada" },
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
            <p className="text-white text-lg font-bold mb-2">Moderniza la gestión de RRHH</p>
            <p className="text-slate-400 text-sm mb-6">Optimiza el fichaje diario de tu plantilla hoy mismo de forma limpia.</p>
            <Button className="shadow-glow" onClick={() => window.location.href = "/register"}>Comenzar ahora gratis</Button>
          </div>
        </div>
      </section>
      
      {/* Why Switch */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-12">Por qué los equipos eligen Fycheo</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="bg-surface-dark border-white/5">
            <div className="mb-4 text-4xl">🚀</div>
            <h3 className="text-lg font-bold text-white mb-2">Rapidez operativa</h3>
            <p className="text-sm text-slate-400 leading-relaxed">Nuestra app e interfaz web cargan de inmediato. Fichar o solicitar días de descanso requiere un par de toques.</p>
          </Card>
          <Card className="bg-surface-dark border-white/5">
            <div className="mb-4 text-4xl">🎨</div>
            <h3 className="text-lg font-bold text-white mb-2">Diseño y coherencia</h3>
            <p className="text-sm text-slate-400 leading-relaxed">Una experiencia visualmente cuidada al detalle, intuitiva y con modo oscuro integrado en las zonas comerciales.</p>
          </Card>
        </div>
      </section>
    </div>
  );
};

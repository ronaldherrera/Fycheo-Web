import { motion } from 'framer-motion';
import { Button } from '../../components/ui/Button';
import { SEOHead } from '../../components/SEOHead';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { FileDown, Calendar, AlertTriangle, ShieldCheck } from 'lucide-react';

export const InformesJornadaLaboral = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Informes de Jornada Laboral Oficiales | Fycheo",
    "description": "Genera los informes de registro de jornada requeridos por la Inspección de Trabajo de forma digital, rápida y blindada ante sanciones.",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://fycheo.es" },
        { "@type": "ListItem", "position": 2, "name": "Informes de Jornada", "item": "https://fycheo.es/informes-jornada-laboral" }
      ]
    }
  };

  return (
    <div className="bg-background-dark min-h-screen text-white pt-32 pb-20">
      <SEOHead
        title="Informes de jornada laboral y fichajes | Fycheo"
        description="Genera informes de jornada laboral acumulados de tu plantilla en formato oficial en un clic. Prepárate con tranquilidad ante una inspección."
        jsonLd={schema}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HERO */}
        <section className="text-center mb-20 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="text-primary font-bold text-xs uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
              Generación de Reportes en 1 Clic
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 mt-4 leading-tight">
              Informes oficiales de jornada laboral al instante
            </h1>
            <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
              Consolida automáticamente todas las entradas, salidas y pausas de tus empleados. Exporta reportes homologados en PDF o Excel listos para entregar.
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="shadow-glow" onClick={() => window.location.href = '/register'}>
                Descargar informes gratis
              </Button>
            </div>
          </motion.div>
        </section>

        {/* IMAGE */}
        <section className="mb-24 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <ImagePlaceholder
              filename="informes-jornada-laboral-fycheo.webp"
              path="/public/images/seo/informes-jornada-laboral-fycheo.webp"
              description="Visualización de la pantalla de descarga de informes de Fycheo, con filtros por empleado, departamento, fechas y desglose de horas extra."
              alt="Informes de jornada laboral e incidencias con Fycheo."
              type="mockup"
              aspectRatio="aspect-video"
            />
          </motion.div>
        </section>

        {/* DETALLE DE REPORTE */}
        <section className="grid lg:grid-cols-2 gap-12 mb-24 max-w-4xl mx-auto items-center">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">Constructor dinámico de informes a tu medida</h2>
            <p className="text-slate-400 leading-relaxed mb-6">
              Olvídate de las plantillas fijas o los meses cerrados. El generador dinámico de Fycheo te permite construir y exportar reportes cruzados a la carta de forma ágil:
            </p>
            <div className="space-y-4">
              <div className="flex gap-3">
                <FileDown className="text-primary-light w-5 h-5 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-white">Filtros temporales libres</h4>
                  <p className="text-xs text-slate-400">Construye reportes de cualquier periodo personalizado (días sueltos, semanas, semestres o años completos) al instante.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Calendar className="text-primary-light w-5 h-5 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-white">Segmentación por grupos</h4>
                  <p className="text-xs text-slate-400">Filtra la plantilla por empleado individual, por sucursal física o por departamento específico (ej: Ventas, Soporte).</p>
                </div>
              </div>
              <div className="flex gap-3">
                <ShieldCheck className="text-primary-light w-5 h-5 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-white">Columnas y datos configurables</h4>
                  <p className="text-xs text-slate-400">Elige qué campos exportar en el documento: horas extras, horas teóricas, nocturnidades, pausas o incidencias.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-surface-dark border border-white/5 p-8 rounded-2xl">
            <h3 className="text-xl font-bold text-white mb-4 flex gap-2"><AlertTriangle className="text-yellow-500" /> Evita sanciones graves</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              La ausencia de estos registros ante la visita del inspector puede considerarse una infracción grave con sanciones económicas muy costosas para una pequeña empresa.
            </p>
            <p className="text-slate-400 text-sm leading-relaxed">
              Fycheo organiza toda la información en la nube de forma segura y blindada para darte total tranquilidad organizativa.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary/20 border border-primary/30 rounded-3xl p-12 text-center max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">Automatiza tus reportes oficiales de jornada</h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto">
            Únete a los cientos de pymes que confían en Fycheo para blindarse legalmente.
          </p>
          <Button size="lg" className="shadow-glow" onClick={() => window.location.href = '/register'}>
            Probar gratis ahora
          </Button>
        </section>
      </div>
    </div>
  );
};

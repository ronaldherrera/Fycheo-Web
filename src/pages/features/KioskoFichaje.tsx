import { motion } from 'framer-motion';
import { Button } from '../../components/ui/Button';
import { SEOHead } from '../../components/SEOHead';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { Smartphone, Check, ShieldCheck, Zap } from 'lucide-react';

export const KioskoFichaje = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Kiosko de Fichaje Común | Fycheo",
    "description": "El modo Kiosko de Fycheo permite a tus empleados presenciales registrar su jornada laboral desde una tablet o portátil común de forma fácil.",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://fycheo.es" },
        { "@type": "ListItem", "position": 2, "name": "Kiosko Fichaje", "item": "https://fycheo.es/kiosko-fichaje" }
      ]
    }
  };

  return (
    <div className="bg-background-dark min-h-screen text-white pt-32 pb-20">
      <SEOHead
        title="Kiosko de fichaje para empleados | Fycheo"
        description="Ficha desde un dispositivo común en tu centro de trabajo. Modo Kiosko para tablets ideal para comercios, talleres y almacenes."
        jsonLd={schema}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HERO */}
        <section className="text-center mb-20 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="text-primary font-bold text-xs uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
              Punto de Fichaje Físico
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 mt-4 leading-tight">
              Fichaje rápido desde un único dispositivo común
            </h1>
            <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
              El modo Kiosko convierte cualquier tablet (Android o iPad) en un reloj de fichar seguro para toda tu plantilla en tu local o fábrica.
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="shadow-glow" onClick={() => window.location.href = '/register'}>
                Comenzar ahora gratis
              </Button>
            </div>
          </motion.div>
        </section>

        {/* IMAGE */}
        <section className="mb-24 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <ImagePlaceholder
              filename="kiosko-fichaje-fycheo.webp"
              path="/public/images/seo/kiosko-fichaje-fycheo.webp"
              description="Tablet (iPad/Android) instalada en la pared del centro de trabajo mostrando la pantalla de introducción de DNI de Fycheo."
              alt="Kiosko de fichaje para empleados con Fycheo."
              type="mockup"
              aspectRatio="aspect-video"
            />
          </motion.div>
        </section>

        {/* BENEFICIOS KIOSKO */}
        <section className="grid md:grid-cols-3 gap-8 mb-24 max-w-5xl mx-auto">
          <div className="p-6 bg-surface-dark border border-white/5 rounded-2xl">
            <Zap className="text-primary-light w-8 h-8 mb-4 animate-bounce" />
            <h3 className="font-bold text-lg text-white mb-2">Fichajes en 2 segundos</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              El empleado se acerca al terminal, selecciona su nombre o introduce su DNI y queda registrado al instante.
            </p>
          </div>
          <div className="p-6 bg-surface-dark border border-white/5 rounded-2xl">
            <Smartphone className="text-primary-light w-8 h-8 mb-4" />
            <h3 className="font-bold text-lg text-white mb-2">Sin usar móviles propios</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Evita problemas con empleados que no desean instalar software corporativo en sus teléfonos móviles personales.
            </p>
          </div>
          <div className="p-6 bg-surface-dark border border-white/5 rounded-2xl">
            <ShieldCheck className="text-primary-light w-8 h-8 mb-4" />
            <h3 className="font-bold text-lg text-white mb-2">Seguridad y auditoría</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Fichajes auditados en tiempo real que se sincronizan de inmediato con el panel de administración central de la empresa.
            </p>
          </div>
        </section>

        {/* LISTADO DE COMPROBACIÓN */}
        <section className="bg-surface-dark border border-white/5 rounded-2xl p-8 mb-24 max-w-3xl mx-auto">
          <h3 className="text-xl font-bold text-white mb-6 text-center">Ideal para centros con presencia física</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex gap-2 text-sm text-slate-300 items-center">
              <Check className="text-green-500 w-5 h-5 flex-shrink-0" />
              <span>Tiendas locales y comercios</span>
            </div>
            <div className="flex gap-2 text-sm text-slate-300 items-center">
              <Check className="text-green-500 w-5 h-5 flex-shrink-0" />
              <span>Restaurantes y cafeterías</span>
            </div>
            <div className="flex gap-2 text-sm text-slate-300 items-center">
              <Check className="text-green-500 w-5 h-5 flex-shrink-0" />
              <span>Talleres mecánicos y fábricas</span>
            </div>
            <div className="flex gap-2 text-sm text-slate-300 items-center">
              <Check className="text-green-500 w-5 h-5 flex-shrink-0" />
              <span>Centros de estética o academias</span>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary/20 border border-primary/30 rounded-3xl p-12 text-center max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">Prueba el modo Kiosko gratis</h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto">
            Habilita el terminal de fichaje en tu local en minutos. Sin cuotas de configuración adicionales.
          </p>
          <Button size="lg" className="shadow-glow" onClick={() => window.location.href = '/register'}>
            Crear Cuenta Gratis
          </Button>
        </section>
      </div>
    </div>
  );
};

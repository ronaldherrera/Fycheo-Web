import { motion } from 'framer-motion';
import { Button } from '../../components/ui/Button';
import { SEOHead } from '../../components/SEOHead';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { Store, Utensils, Construction, Briefcase, Check } from 'lucide-react';

export const ControlHorarioPymes = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Control Horario para Pymes | Fycheo",
    "description": "El sistema de control horario y fichajes adaptado a las necesidades y presupuestos de las pequeñas y medianas empresas (pymes) en España.",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://fycheo.es" },
        { "@type": "ListItem", "position": 2, "name": "Control Horario Pymes", "item": "https://fycheo.es/control-horario-pymes" }
      ]
    }
  };

  return (
    <div className="bg-background-dark min-h-screen text-white pt-32 pb-20">
      <SEOHead
        title="Control horario para pymes sencillo y barato | Fycheo"
        description="No necesitas un sistema complejo de recursos humanos. Fycheo ofrece control horario adaptado a pequeñas empresas, comercios y oficinas."
        jsonLd={schema}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HERO */}
        <section className="text-center mb-20 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="text-primary font-bold text-xs uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
              Pensado para Pequeños Negocios
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 mt-4 leading-tight">
              Control horario sencillo para pymes que no quieren complicarse
            </h1>
            <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
              Sin integraciones complejas ni costes de implantación astronómicos. Una solución ágil y económica diseñada para el día a día de tu negocio.
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="shadow-glow" onClick={() => window.location.href = '/register'}>
                Probar Fycheo Gratis
              </Button>
            </div>
          </motion.div>
        </section>

        {/* IMAGE */}
        <section className="mb-24 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <ImagePlaceholder
              filename="control-horario-pymes-fycheo.webp"
              path="/public/images/seo/control-horario-pymes-fycheo.webp"
              description="Trabajadores de una pequeña empresa familiar utilizando Fycheo desde el móvil de ruta y el panel web desde la oficina de forma conectada."
              alt="Control horario para pymes con Fycheo."
              type="mockup"
              aspectRatio="aspect-video"
            />
          </motion.div>
        </section>

        {/* DOLOR PYME */}
        <section className="mb-24 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Sabemos lo que cuesta llevar un pequeño negocio</h2>
          <p className="text-slate-400 leading-relaxed mb-8 max-w-2xl mx-auto">
            No tienes un departamento de RRHH dedicado ni tiempo para perseguir a los empleados a final de mes para que rellenen sus hojas de firmas. Con Fycheo lo resuelves de manera automática y a un coste mínimo.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            <div className="bg-surface-dark border border-white/5 p-6 rounded-xl">
              <Store className="text-primary-light w-8 h-8 mb-4" />
              <h4 className="font-bold text-white mb-2">Comercios y tiendas</h4>
              <p className="text-xs text-slate-400">Controla los turnos partidos y las sustituciones de manera clara y visual.</p>
            </div>
            <div className="bg-surface-dark border border-white/5 p-6 rounded-xl">
              <Utensils className="text-primary-light w-8 h-8 mb-4" />
              <h4 className="font-bold text-white mb-2">Hostelería</h4>
              <p className="text-xs text-slate-400">Fichajes rápidos en barra o entrada desde una tablet común con DNI de empleado.</p>
            </div>
            <div className="bg-surface-dark border border-white/5 p-6 rounded-xl">
              <Construction className="text-primary-light w-8 h-8 mb-4" />
              <h4 className="font-bold text-white mb-2">Servicios y reformas</h4>
              <p className="text-xs text-slate-400">Trazabilidad de fichaje de operarios de ruta con coordenadas de geolocalización.</p>
            </div>
            <div className="bg-surface-dark border border-white/5 p-6 rounded-xl">
              <Briefcase className="text-primary-light w-8 h-8 mb-4" />
              <h4 className="font-bold text-white mb-2">Oficinas y agencias</h4>
              <p className="text-xs text-slate-400">Control de presencia diario de teletrabajadores y control de vacaciones integrados.</p>
            </div>
          </div>
        </section>

        {/* BENEFICIOS PYME */}
        <section className="bg-surface-dark border border-white/5 rounded-2xl p-8 mb-24 max-w-3xl mx-auto">
          <h3 className="text-xl font-bold text-white mb-6 text-center">Por qué las pymes eligen Fycheo</h3>
          <div className="space-y-4">
            {[
              "Configuración en 15 minutos sin ayuda técnica.",
              "Precio super ajustado al número de empleados de tu plantilla.",
              "Sin contratos de permanencia de ningún tipo.",
              "Soporte humano y cercano en español por chat o email."
            ].map((beneficio, i) => (
              <div key={i} className="flex gap-3 text-sm text-slate-300 items-center">
                <Check className="text-green-500 w-5 h-5 flex-shrink-0" />
                <span>{beneficio}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary/20 border border-primary/30 rounded-3xl p-12 text-center max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">La solución que tu pyme necesita</h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto">
            Prueba Fycheo 14 días gratis sin compromiso. Configura los horarios y empieza a cumplir la normativa laboral mañana mismo.
          </p>
          <Button size="lg" className="shadow-glow" onClick={() => window.location.href = '/register'}>
            Probar gratis ahora
          </Button>
        </section>
      </div>
    </div>
  );
};

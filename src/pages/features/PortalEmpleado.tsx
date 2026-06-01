import { motion } from 'framer-motion';
import { Button } from '../../components/ui/Button';
import { SEOHead } from '../../components/SEOHead';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { Users, FileText, Calendar, Clock } from 'lucide-react';

export const PortalEmpleado = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Portal del Empleado de Control Horario | Fycheo",
    "description": "Una herramienta de autogestión para tus trabajadores. Permite registrar fichajes, revisar históricos, solicitar vacaciones y ausencias de forma ágil.",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://fycheo.es" },
        { "@type": "ListItem", "position": 2, "name": "Portal Empleado", "item": "https://fycheo.es/portal-empleado" }
      ]
    }
  };

  return (
    <div className="bg-background-dark min-h-screen text-white pt-32 pb-20">
      <SEOHead
        title="Portal del empleado sencillo y accesible | Fycheo"
        description="Fomenta la autonomía de tu plantilla con el portal del empleado. Gestión integrada de fichajes, solicitudes de vacaciones y consultas de jornada."
        jsonLd={schema}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HERO */}
        <section className="text-center mb-20 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="text-primary font-bold text-xs uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
              Autonomía para el Trabajador
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 mt-4 leading-tight">
              Portal del empleado para unificar la gestión interna
            </h1>
            <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
              Permite a tus empleados registrar entradas, solicitar sus días de vacaciones y comprobar sus turnos sin tener que consultar constantemente al departamento de administración.
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="shadow-glow" onClick={() => window.location.href = '/register'}>
                Comenzar gratis
              </Button>
            </div>
          </motion.div>
        </section>

        {/* IMAGE */}
        <section className="mb-24 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <ImagePlaceholder
              filename="portal-empleado-fycheo.webp"
              path="/public/images/seo/portal-empleado-fycheo.webp"
              description="Vista de la interfaz del Portal del Empleado de Fycheo en ordenador y móvil, mostrando las solicitudes de vacaciones y fichajes del mes."
              alt="Portal del empleado de Fycheo para fichajes y solicitudes."
              type="mockup"
              aspectRatio="aspect-video"
            />
          </motion.div>
        </section>

        {/* FUNCIONALIDADES PORTAL */}
        <section className="grid md:grid-cols-4 gap-6 mb-24 max-w-5xl mx-auto">
          <div className="p-5 bg-surface-dark border border-white/5 rounded-xl">
            <Clock className="text-primary-light w-8 h-8 mb-3" />
            <h4 className="font-bold text-white mb-1">Fichaje rápido</h4>
            <p className="text-xs text-slate-400">Registros ágiles de entrada, salida y pausas con total transparencia.</p>
          </div>
          <div className="p-5 bg-surface-dark border border-white/5 rounded-xl">
            <Calendar className="text-primary-light w-8 h-8 mb-3" />
            <h4 className="font-bold text-white mb-1">Días de descanso</h4>
            <p className="text-xs text-slate-400">Autonomía para solicitar vacaciones y ver el calendario general aprobado.</p>
          </div>
          <div className="p-5 bg-surface-dark border border-white/5 rounded-xl">
            <FileText className="text-primary-light w-8 h-8 mb-3" />
            <h4 className="font-bold text-white mb-1">Histórico diario</h4>
            <p className="text-xs text-slate-400">Revisión de las horas extraordinarias y ordinarias trabajadas del mes.</p>
          </div>
          <div className="p-5 bg-surface-dark border border-white/5 rounded-xl">
            <Users className="text-primary-light w-8 h-8 mb-3" />
            <h4 className="font-bold text-white mb-1">Comunicación de cambios</h4>
            <p className="text-xs text-slate-400">Propuestas rápidas de corrección horaria en caso de despistes.</p>
          </div>
        </section>

        {/* VENTAJAS */}
        <section className="bg-surface-dark border border-white/5 rounded-2xl p-8 mb-24 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Reduce la carga administrativa de tu empresa</h2>
          <p className="text-slate-300 text-sm leading-relaxed text-center max-w-2xl mx-auto mb-8">
            El 70% de las consultas a Recursos Humanos o contabilidad son sobre saldos de vacaciones pendientes o errores de fichajes. Centralizar esto en el portal del empleado libera tiempo productivo para la gerencia de la empresa.
          </p>
        </section>

        {/* CTA */}
        <section className="bg-primary/20 border border-primary/30 rounded-3xl p-12 text-center max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">Empieza a digitalizar tu equipo hoy</h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto">
            Configuración sin tarjeta de crédito. Habilita los perfiles de tu plantilla de forma inmediata.
          </p>
          <Button size="lg" className="shadow-glow" onClick={() => window.location.href = '/register'}>
            Crear Mi Cuenta Gratis
          </Button>
        </section>
      </div>
    </div>
  );
};

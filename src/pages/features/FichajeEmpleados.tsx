import { motion } from 'framer-motion';
import { Button } from '../../components/ui/Button';
import { SEOHead } from '../../components/SEOHead';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { CheckCircle2, ShieldCheck, AlertCircle, RefreshCw } from 'lucide-react';

export const FichajeEmpleados = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Sistema de Fichaje de Empleados | Fycheo",
    "description": "Gestiona el fichaje de tus empleados con un sistema multi-dispositivo y seguro. Evita olvidos, calcula horas extras y cumple la normativa laboral.",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://fycheo.es" },
        { "@type": "ListItem", "position": 2, "name": "Fichaje Empleados", "item": "https://fycheo.es/fichaje-empleados" }
      ]
    }
  };

  return (
    <div className="bg-background-dark min-h-screen text-white pt-32 pb-20">
      <SEOHead
        title="Fichaje de empleados sencillo | Fycheo"
        description="Organiza el fichaje de empleados en tu pyme. Evita olvidos, aprueba correcciones de jornada y exporta reportes inalterables para inspecciones."
        jsonLd={schema}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HERO */}
        <section className="text-center mb-20 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="text-primary font-bold text-xs uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
              Gestión de Presencia
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 mt-4 leading-tight">
              Controla el fichaje de tus empleados de forma clara
            </h1>
            <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
              Diferentes métodos de fichaje adaptados a la realidad de tu negocio: oficinas, fábricas, tiendas o teletrabajo. Todo unificado en un solo panel.
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="shadow-glow" onClick={() => window.location.href = '/register'}>
                Empezar Ahora Gratis
              </Button>
            </div>
          </motion.div>
        </section>

        {/* IMAGE */}
        <section className="mb-24 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <ImagePlaceholder
              filename="fichaje-empleados-fycheo.webp"
              path="/public/images/seo/fichaje-empleados-fycheo.webp"
              description="Listado de empleados en tiempo real dentro del administrador de Fycheo, mostrando su estado actual (Trabajando, En Pausa, Ausente) y la hora de su último fichaje."
              alt="Sistema de fichaje de empleados para empresas."
              type="mockup"
              aspectRatio="aspect-video"
            />
          </motion.div>
        </section>

        {/* MÉTODOS DE FICHAJE */}
        <section className="mb-24 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Un método para cada puesto de trabajo</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-surface-dark border border-white/5 rounded-2xl">
              <h3 className="font-bold text-lg text-white mb-2">Fichaje desde Web</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Ideal para empleados de oficina o administración que trabajan sentados frente a su ordenador. Fichan al iniciar el navegador en un clic.
              </p>
            </div>
            <div className="p-6 bg-surface-dark border border-white/5 rounded-2xl">
              <h3 className="font-bold text-lg text-white mb-2">Fichaje por App Móvil</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Pensado para trabajadores remotos, teletrabajo o comerciales. Habilita la geolocalización opcional para mayor seguridad.
              </p>
            </div>
            <div className="p-6 bg-surface-dark border border-white/5 rounded-2xl">
              <h3 className="font-bold text-lg text-white mb-2">Modo Kiosko en Tablet</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                La mejor opción para tiendas, locales de hostelería o talleres. Una tablet en la entrada donde el equipo introduce su DNI para fichar.
              </p>
            </div>
          </div>
        </section>

        {/* GESTIÓN DE INCIDENCIAS */}
        <section className="grid lg:grid-cols-2 gap-12 mb-24 max-w-5xl mx-auto items-center">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">¿Qué pasa si un empleado olvida fichar?</h2>
            <p className="text-slate-400 mb-6 leading-relaxed">
              Es inevitable que en el día a día algún empleado olvide registrar su salida a comer o su pausa. Con Fycheo, esto no genera horas de trabajo manual corrector:
            </p>
            <ul className="space-y-4">
              <li className="flex gap-3 text-sm text-slate-300">
                <AlertCircle className="text-yellow-500 w-5 h-5 flex-shrink-0 mt-0.5" />
                <span><strong>El empleado solicita el cambio:</strong> Envía una propuesta de corrección horaria con la justificación del error.</span>
              </li>
              <li className="flex gap-3 text-sm text-slate-300">
                <RefreshCw className="text-primary-light w-5 h-5 flex-shrink-0 mt-0.5 animate-spin" style={{ animationDuration: '4s' }} />
                <span><strong>El manager aprueba en un clic:</strong> La solicitud llega al panel de empresa y el responsable decide si validarla o editarla al momento.</span>
              </li>
              <li className="flex gap-3 text-sm text-slate-300">
                <ShieldCheck className="text-green-500 w-5 h-5 flex-shrink-0 mt-0.5" />
                <span><strong>Trazabilidad legal auditada:</strong> Toda edición queda guardada en el historial para justificar el motivo del cambio ante inspectores.</span>
              </li>
            </ul>
          </div>
          <div className="bg-surface-dark border border-white/5 rounded-2xl p-8">
            <h4 className="font-bold text-white mb-4">Métricas de control en tiempo real</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-center gap-2"><CheckCircle2 className="text-primary w-4 h-4" /> Horas extras semanales computadas.</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="text-primary w-4 h-4" /> Ausencias justificadas por baja médica o IT.</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="text-primary w-4 h-4" /> Retrasos o fichajes fuera de jornada habitual.</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="text-primary w-4 h-4" /> Solicitudes de vacaciones pendientes de validar.</li>
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary/20 border border-primary/30 rounded-3xl p-12 text-center max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">Comienza a ordenar los fichajes de tu plantilla</h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto">
            Prueba gratis Fycheo durante 14 días. Sin compromisos de permanencia de ningún tipo.
          </p>
          <Button size="lg" className="shadow-glow" onClick={() => window.location.href = '/register'}>
            Crear Mi Cuenta Gratis
          </Button>
        </section>
      </div>
    </div>
  );
};

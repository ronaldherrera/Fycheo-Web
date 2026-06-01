import { motion } from 'framer-motion';
import { Button } from '../../components/ui/Button';
import { SEOHead } from '../../components/SEOHead';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { Calendar, CheckCircle2, MessageSquare, AlertCircle } from 'lucide-react';

export const VacacionesEmpleados = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Gestión de Vacaciones y Ausencias de Empleados | Fycheo",
    "description": "Automatiza la solicitud, aprobación y control de las vacaciones y ausencias de tus trabajadores. Calendariza días libres de forma centralizada.",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://fycheo.es" },
        { "@type": "ListItem", "position": 2, "name": "Gestión de Vacaciones", "item": "https://fycheo.es/gestion-vacaciones-empleados" }
      ]
    }
  };

  return (
    <div className="bg-background-dark min-h-screen text-white pt-32 pb-20">
      <SEOHead
        title="Gestión de vacaciones de empleados sencilla | Fycheo"
        description="Organiza las vacaciones y ausencias de tu plantilla sin cadenas eternas de mensajes. Calendario unificado de equipo y control de días consumidos."
        jsonLd={schema}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HERO */}
        <section className="text-center mb-20 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="text-primary font-bold text-xs uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
              Vacaciones y Ausencias
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 mt-4 leading-tight">
              Gestiona las vacaciones del equipo sin caos de mensajes
            </h1>
            <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
              Di adiós al cruce de emails y mensajes perdidos por WhatsApp. Unifica solicitudes, saldos disponibles y cuadrantes de equipo en una vista unificada.
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="shadow-glow" onClick={() => window.location.href = '/register'}>
                Empezar Prueba Gratuita
              </Button>
            </div>
          </motion.div>
        </section>

        {/* IMAGE */}
        <section className="mb-24 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <ImagePlaceholder
              filename="gestion-vacaciones-empleados-fycheo.webp"
              path="/public/images/seo/gestion-vacaciones-empleados-fycheo.webp"
              description="Calendario de ausencias y vacaciones cruzadas del equipo de Fycheo, destacando las solicitudes pendientes de validación."
              alt="Gestión de vacaciones de empleados con Fycheo."
              type="mockup"
              aspectRatio="aspect-video"
            />
          </motion.div>
        </section>

        {/* DOLOR VS SOLUCIÓN */}
        <section className="grid lg:grid-cols-2 gap-12 mb-24 max-w-5xl mx-auto">
          <div className="p-6 bg-surface-dark border border-white/5 rounded-2xl">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <AlertCircle className="text-red-400" /> Los problemas clásicos en pymes
            </h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">•</span>
                <span>Peticiones sueltas en WhatsApp o notas de papel sobre la mesa de administración.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">•</span>
                <span>Saldos de días consumidos calculados a mano con errores inevitables.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">•</span>
                <span>Solapamientos de días libres que dejan un departamento sin personal clave.</span>
              </li>
            </ul>
          </div>
          <div className="p-6 bg-surface-dark border border-white/5 rounded-2xl">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <CheckCircle2 className="text-primary" /> El control y la claridad de Fycheo
            </h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold">•</span>
                <span>El trabajador solicita días desde su portal y los responsables reciben notificación.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold">•</span>
                <span>Saldo de vacaciones acumuladas y pendientes calculados en tiempo real.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold">•</span>
                <span>Vista general cruzada del equipo para asegurar la cobertura operativa siempre.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* CASOS DE USO */}
        <section className="mb-24 text-center max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8">Gestión unificada de todo tipo de ausencias</h2>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="bg-surface-dark border border-white/5 p-6 rounded-xl">
              <Calendar className="text-primary-light w-6 h-6 mb-3" />
              <h4 className="font-bold text-white mb-1">Vacaciones y festivos</h4>
              <p className="text-xs text-slate-400">Asigna calendarios laborales específicos por región o convenio laboral de pymes.</p>
            </div>
            <div className="bg-surface-dark border border-white/5 p-6 rounded-xl">
              <MessageSquare className="text-primary-light w-6 h-6 mb-3" />
              <h4 className="font-bold text-white mb-1">Bajas médicas o IT</h4>
              <p className="text-xs text-slate-400">Adjunta justificantes médicos directamente en la plataforma para justificar la baja.</p>
            </div>
            <div className="bg-surface-dark border border-white/5 p-6 rounded-xl">
              <CheckCircle2 className="text-primary-light w-6 h-6 mb-3" />
              <h4 className="font-bold text-white mb-1">Permisos retribuidos</h4>
              <p className="text-xs text-slate-400">Controla días por mudanza, nupcialidad, paternidad o exámenes con rapidez.</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary/20 border border-primary/30 rounded-3xl p-12 text-center max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">Centraliza tus ausencias y vacaciones</h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto">
            Configura los saldos y perfiles de tu plantilla de forma rápida y gratuita en tu periodo de prueba.
          </p>
          <Button size="lg" className="shadow-glow" onClick={() => window.location.href = '/register'}>
            Probar Fycheo Gratis
          </Button>
        </section>
      </div>
    </div>
  );
};

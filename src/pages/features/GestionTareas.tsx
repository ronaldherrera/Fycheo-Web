import { motion } from 'framer-motion';
import { Button } from '../../components/ui/Button';
import { SEOHead } from '../../components/SEOHead';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { CheckSquare, ListTodo, ClipboardList, CheckCircle2 } from 'lucide-react';

export const GestionTareas = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Gestión de Tareas de Empleados | Fycheo",
    "description": "Asigna tareas a tus empleados, planifica el trabajo diario y mantén el control del avance de los proyectos desde una plataforma sencilla.",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://fycheo.es" },
        { "@type": "ListItem", "position": 2, "name": "Gestión de Tareas", "item": "https://fycheo.es/gestion-tareas-empleados" }
      ]
    }
  };

  return (
    <div className="bg-background-dark min-h-screen text-white pt-32 pb-20">
      <SEOHead
        title="Gestión de tareas de empleados y planificación | Fycheo"
        description="Planifica la jornada diaria de tu equipo y asigna tareas de forma sencilla. Controla el estado de avance de tu pyme sin Excels ni líos."
        jsonLd={schema}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HERO */}
        <section className="text-center mb-20 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="text-primary font-bold text-xs uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
              Planificación Diaria
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 mt-4 leading-tight">
              Organiza las tareas diarias de tu equipo con facilidad
            </h1>
            <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
              No dejes el trabajo diario al azar o apuntado en libretas. Asigna tareas en segundos, comprueba el estado de avance en tiempo real y potencia la productividad de tu plantilla.
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
              filename="gestion-tareas-fycheo.webp"
              path="/public/images/seo/gestion-tareas-fycheo.webp"
              description="Pantalla de tareas de Fycheo mostrando el listado de tareas asignadas al empleado, etiquetas de prioridad y porcentaje general de finalización."
              alt="Gestión de tareas de empleados con Fycheo."
              type="mockup"
              aspectRatio="aspect-video"
            />
          </motion.div>
        </section>

        {/* BENEFICIOS */}
        <section className="grid md:grid-cols-3 gap-8 mb-24 max-w-5xl mx-auto">
          <div className="p-6 bg-surface-dark border border-white/5 rounded-2xl">
            <ListTodo className="text-primary-light w-8 h-8 mb-4" />
            <h3 className="font-bold text-lg text-white mb-2">Checklist de jornada</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Define listas de tareas indispensables que los empleados deben completar antes de finalizar su jornada diaria o turno de trabajo.
            </p>
          </div>
          <div className="p-6 bg-surface-dark border border-white/5 rounded-2xl">
            <ClipboardList className="text-primary-light w-8 h-8 mb-4" />
            <h3 className="font-bold text-lg text-white mb-2">Asignación por perfiles</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Asigna tareas a empleados concretos, centros de trabajo o departamentos enteros en segundos y evita malentendidos.
            </p>
          </div>
          <div className="p-6 bg-surface-dark border border-white/5 rounded-2xl">
            <CheckSquare className="text-primary-light w-8 h-8 mb-4" />
            <h3 className="font-bold text-lg text-white mb-2">Seguimiento visual</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Comprueba el estado de finalización de objetivos y la productividad de la empresa mediante informes visuales de tareas resueltas.
            </p>
          </div>
        </section>

        {/* VALOR PYME */}
        <section className="bg-surface-dark border border-white/5 rounded-2xl p-8 mb-24 max-w-3xl mx-auto">
          <h3 className="text-xl font-bold text-white mb-6 text-center">Planificación simplificada sin herramientas pesadas</h3>
          <div className="space-y-4 text-slate-300 text-sm">
            <div className="flex gap-2 items-center"><CheckCircle2 className="text-primary w-5 h-5 flex-shrink-0" /> Integración nativa con la jornada laboral y fichaje de empleados.</div>
            <div className="flex gap-2 items-center"><CheckCircle2 className="text-primary w-5 h-5 flex-shrink-0" /> Priorización de tareas en urgente, media o baja.</div>
            <div className="flex gap-2 items-center"><CheckCircle2 className="text-primary w-5 h-5 flex-shrink-0" /> Cero necesidad de formación previa para el equipo.</div>
            <div className="flex gap-2 items-center"><CheckCircle2 className="text-primary w-5 h-5 flex-shrink-0" /> Comentarios y feedback dentro de cada tarea resuelta.</div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary/20 border border-primary/30 rounded-3xl p-12 text-center max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">Empieza a planificar tu jornada con orden</h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto">
            Únete a las empresas que ya han erradicado el desorden administrativo con las herramientas integradas de Fycheo.
          </p>
          <Button size="lg" className="shadow-glow" onClick={() => window.location.href = '/register'}>
            Comenzar Prueba Gratuita
          </Button>
        </section>
      </div>
    </div>
  );
};

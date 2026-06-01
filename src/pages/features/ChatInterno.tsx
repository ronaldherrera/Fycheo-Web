import { motion } from 'framer-motion';
import { Button } from '../../components/ui/Button';
import { SEOHead } from '../../components/SEOHead';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { MessageSquare, Bell, Shield, CheckCircle2 } from 'lucide-react';

export const ChatInterno = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Chat Interno para Empresas | Fycheo",
    "description": "Una herramienta de comunicación interna segura para tu equipo. Envía avisos, gestiona notificaciones de jornada y mantén la coordinación laboral en un solo lugar.",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://fycheo.es" },
        { "@type": "ListItem", "position": 2, "name": "Chat Interno", "item": "https://fycheo.es/chat-interno" }
      ]
    }
  };

  return (
    <div className="bg-background-dark min-h-screen text-white pt-32 pb-20">
      <SEOHead
        title="Chat interno para empresas y comunicación | Fycheo"
        description="Fomenta la comunicación de tu plantilla de forma profesional y segura. Chat interno integrado para coordinar turnos, avisos e incidencias."
        jsonLd={schema}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HERO */}
        <section className="text-center mb-20 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="text-primary font-bold text-xs uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
              Comunicación Corporativa
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 mt-4 leading-tight">
              Chat interno profesional para conectar a tu equipo
            </h1>
            <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
              Evita mezclar la vida personal con la laboral en WhatsApp. Comunica avisos importantes, coordina cambios de turnos y resuelve dudas del día a día en un entorno seguro y corporativo.
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="shadow-glow" onClick={() => window.location.href = '/register'}>
                Empezar Gratis
              </Button>
            </div>
          </motion.div>
        </section>

        {/* IMAGE */}
        <section className="mb-24 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <ImagePlaceholder
              filename="chat-interno-fycheo.webp"
              path="/public/images/seo/chat-interno-fycheo.webp"
              description="Visualización del chat integrado de Fycheo en la app del empleado y el panel del manager, mostrando un canal grupal y mensajes directos organizados."
              alt="Chat interno para empresas en Fycheo."
              type="mockup"
              aspectRatio="aspect-video"
            />
          </motion.div>
        </section>

        {/* BENEFICIOS */}
        <section className="grid md:grid-cols-3 gap-8 mb-24 max-w-5xl mx-auto">
          <div className="p-6 bg-surface-dark border border-white/5 rounded-2xl">
            <Bell className="text-primary-light w-8 h-8 mb-4" />
            <h3 className="font-bold text-lg text-white mb-2">Anuncios oficiales</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Publica comunicados para toda la empresa o departamentos concretos y asegúrate de que todos los leen mediante notificaciones push en el móvil.
            </p>
          </div>
          <div className="p-6 bg-surface-dark border border-white/5 rounded-2xl">
            <MessageSquare className="text-primary-light w-8 h-8 mb-4" />
            <h3 className="font-bold text-lg text-white mb-2">Canales por equipos</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Crea grupos de chat para departamentos, centros de trabajo o proyectos específicos y facilita la coordinación inmediata entre compañeros.
            </p>
          </div>
          <div className="p-6 bg-surface-dark border border-white/5 rounded-2xl">
            <Shield className="text-primary-light w-8 h-8 mb-4" />
            <h3 className="font-bold text-lg text-white mb-2">Desconexión digital</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Los chats están vinculados a la jornada de trabajo. Garantiza el derecho a la desconexión limitando avisos fuera del horario laboral.
            </p>
          </div>
        </section>

        {/* DETALLE LISTADO */}
        <section className="bg-surface-dark border border-white/5 rounded-2xl p-8 mb-24 max-w-3xl mx-auto">
          <h3 className="text-xl font-bold text-white mb-6 text-center">Un paso adelante en tu comunicación</h3>
          <div className="space-y-4 text-slate-300 text-sm">
            <div className="flex gap-2 items-center"><CheckCircle2 className="text-primary w-5 h-5 flex-shrink-0" /> Mensajería instantánea integrada en la app del empleado.</div>
            <div className="flex gap-2 items-center"><CheckCircle2 className="text-primary w-5 h-5 flex-shrink-0" /> Envío de archivos y fotos (justificantes, partes de trabajo).</div>
            <div className="flex gap-2 items-center"><CheckCircle2 className="text-primary w-5 h-5 flex-shrink-0" /> Notificación automática al recibir aprobación de vacaciones.</div>
            <div className="flex gap-2 items-center"><CheckCircle2 className="text-primary w-5 h-5 flex-shrink-0" /> Control total de privacidad de datos personales de la plantilla.</div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary/20 border border-primary/30 rounded-3xl p-12 text-center max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">Mejora la comunicación de tu equipo hoy</h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto">
            Configura Fycheo y empieza a usar el chat corporativo sin complicaciones ni costes de implantación.
          </p>
          <Button size="lg" className="shadow-glow" onClick={() => window.location.href = '/register'}>
            Probar gratis ahora
          </Button>
        </section>
      </div>
    </div>
  );
};

import { motion } from 'framer-motion';
import { Button } from '../../components/ui/Button';
import { SEOHead } from '../../components/SEOHead';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { FileDown, UploadCloud, Shield, CheckCircle2 } from 'lucide-react';

export const NominasEmpleados = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Gestión de Nóminas de Empleados | Fycheo",
    "description": "Distribuye y envía las nóminas a tus empleados de forma masiva y digital. Los trabajadores las descargan y visualizan de manera segura en su app móvil.",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://fycheo.es" },
        { "@type": "ListItem", "position": 2, "name": "Nóminas Empleados", "item": "https://fycheo.es/nominas-empleados" }
      ]
    }
  };

  return (
    <div className="bg-background-dark min-h-screen text-white pt-32 pb-20">
      <SEOHead
        title="Nóminas de empleados y distribución masiva | Fycheo"
        description="Agiliza el envío mensual de las nóminas de tu plantilla. Carga masiva en un clic y descarga segura de nóminas desde la app móvil del empleado."
        jsonLd={schema}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HERO */}
        <section className="text-center mb-20 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="text-primary font-bold text-xs uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
              Distribución Digital Eficiente
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 mt-4 leading-tight">
              Envía y gestiona las nóminas del equipo en un clic
            </h1>
            <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
              Olvídate de imprimir recibos o enviarlos uno a uno por correo electrónico. Sube las nóminas del mes en bloque y repártelas a la plantilla de forma instantánea y confidencial.
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
              filename="nominas-empleados-fycheo.webp"
              path="/public/images/seo/nominas-empleados-fycheo.webp"
              description="Visualización del panel de carga de nóminas en masa en Fycheo (BulkNominas) mediante arrastrar y soltar archivos PDF y el histórico de descarga del empleado."
              alt="Gestión de nóminas de empleados con Fycheo."
              type="mockup"
              aspectRatio="aspect-video"
            />
          </motion.div>
        </section>

        {/* BENEFICIOS */}
        <section className="grid md:grid-cols-3 gap-8 mb-24 max-w-5xl mx-auto">
          <div className="p-6 bg-surface-dark border border-white/5 rounded-2xl">
            <UploadCloud className="text-primary-light w-8 h-8 mb-4 animate-pulse" />
            <h3 className="font-bold text-lg text-white mb-2">Carga masiva (Bulk)</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Sube el archivo PDF de la gestoría con las nóminas de toda tu plantilla. El software separa las páginas y las asigna automáticamente a cada trabajador en segundos.
            </p>
          </div>
          <div className="p-6 bg-surface-dark border border-white/5 rounded-2xl">
            <FileDown className="text-primary-light w-8 h-8 mb-4" />
            <h3 className="font-bold text-lg text-white mb-2">Descarga rápida móvil</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              El empleado recibe una notificación push en su smartphone al publicarse su nómina, pudiendo consultarla o descargarla en PDF directamente.
            </p>
          </div>
          <div className="p-6 bg-surface-dark border border-white/5 rounded-2xl">
            <Shield className="text-primary-light w-8 h-8 mb-4" />
            <h3 className="font-bold text-lg text-white mb-2">Seguridad y RGPD</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Las nóminas son documentos sensibles. Fycheo asegura que solo el propio empleado y los administradores autorizados puedan ver la información laboral.
            </p>
          </div>
        </section>

        {/* DETALLE LISTADO */}
        <section className="bg-surface-dark border border-white/5 rounded-2xl p-8 mb-24 max-w-3xl mx-auto">
          <h3 className="text-xl font-bold text-white mb-6 text-center">Unificación del papeleo laboral</h3>
          <div className="space-y-4 text-slate-300 text-sm">
            <div className="flex gap-2 items-center"><CheckCircle2 className="text-primary w-5 h-5 flex-shrink-0" /> Separación inteligente y automática de nóminas por empleado.</div>
            <div className="flex gap-2 items-center"><CheckCircle2 className="text-primary w-5 h-5 flex-shrink-0" /> Histórico mensual de nóminas ordenado y guardado en la nube.</div>
            <div className="flex gap-2 items-center"><CheckCircle2 className="text-primary w-5 h-5 flex-shrink-0" /> Notificación inmediata al empleado tras la publicación del PDF.</div>
            <div className="flex gap-2 items-center"><CheckCircle2 className="text-primary w-5 h-5 flex-shrink-0" /> Cero errores de envío o descuidos de privacidad corporativa.</div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary/20 border border-primary/30 rounded-3xl p-12 text-center max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">Empieza a distribuir tus nóminas de forma ágil</h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto">
            Optimiza el papeleo y ahorra horas de gestión con el módulo de nóminas de Fycheo.
          </p>
          <Button size="lg" className="shadow-glow" onClick={() => window.location.href = '/register'}>
            Crear Cuenta Gratis
          </Button>
        </section>
      </div>
    </div>
  );
};

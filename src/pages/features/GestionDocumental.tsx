import { motion } from 'framer-motion';
import { Button } from '../../components/ui/Button';
import { SEOHead } from '../../components/SEOHead';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { FolderOpen, CheckCircle2, ShieldAlert, UploadCloud } from 'lucide-react';

export const GestionDocumental = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Gestión Documental y Contratos de Empleados | Fycheo",
    "description": "Almacena los contratos, DNI, bajas y expedientes de tus empleados de manera digital, centralizada y segura bajo la RGPD.",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://fycheo.es" },
        { "@type": "ListItem", "position": 2, "name": "Gestión Documental", "item": "https://fycheo.es/contratos-y-documentacion" }
      ]
    }
  };

  return (
    <div className="bg-background-dark min-h-screen text-white pt-32 pb-20">
      <SEOHead
        title="Contratos y documentación laboral de empleados | Fycheo"
        description="Digitaliza la gestión documental de tu empresa. Almacena y organiza contratos, documentos de identidad y expedientes de tus empleados de forma segura y centralizada."
        jsonLd={schema}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HERO */}
        <section className="text-center mb-20 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="text-primary font-bold text-xs uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
              Gestión Documental en la Nube
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 mt-4 leading-tight">
              Toda la documentación laboral de tu plantilla en un solo lugar
            </h1>
            <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
              Despídete de las carpetas físicas y archivadores en la oficina. Almacena de forma segura contratos de trabajo, documentos de identidad y certificados en expedientes digitales individuales.
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="shadow-glow" onClick={() => window.location.href = '/register'}>
                Comenzar Prueba Gratuita
              </Button>
            </div>
          </motion.div>
        </section>

        {/* IMAGE */}
        <section className="mb-24 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <ImagePlaceholder
              filename="gestion-documental-fycheo.webp"
              path="/public/images/seo/gestion-documental-fycheo.webp"
              description="Vista del módulo de expedientes y gestor documental en el panel de Fycheo, mostrando carpetas por empleado con contratos firmados y bajas médicas."
              alt="Gestión documental y contratos de empleados en Fycheo."
              type="mockup"
              aspectRatio="aspect-video"
            />
          </motion.div>
        </section>

        {/* BENEFICIOS */}
        <section className="grid md:grid-cols-3 gap-8 mb-24 max-w-5xl mx-auto">
          <div className="p-6 bg-surface-dark border border-white/5 rounded-2xl">
            <FolderOpen className="text-primary-light w-8 h-8 mb-4" />
            <h3 className="font-bold text-lg text-white mb-2">Expediente digital único</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Cada empleado cuenta con su propia carpeta digital en el panel. Organiza sus datos fiscales, contratos de trabajo y altas de manera estructurada.
            </p>
          </div>
          <div className="p-6 bg-surface-dark border border-white/5 rounded-2xl">
            <UploadCloud className="text-primary-light w-8 h-8 mb-4" />
            <h3 className="font-bold text-lg text-white mb-2">Subida y organización ágil</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Tanto administradores como empleados pueden subir y organizar contratos firmados, documentos de identidad, bajas médicas y justificantes en segundos.
            </p>
          </div>
          <div className="p-6 bg-surface-dark border border-white/5 rounded-2xl">
            <ShieldAlert className="text-primary-light w-8 h-8 mb-4" />
            <h3 className="font-bold text-lg text-white mb-2">Cumplimiento estricto RGPD</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Los expedientes laborales contienen datos de alta sensibilidad. El almacenamiento de Fycheo garantiza un acceso restringido y encriptado.
            </p>
          </div>
        </section>

        {/* DETALLE LISTADO */}
        <section className="bg-surface-dark border border-white/5 rounded-2xl p-8 mb-24 max-w-3xl mx-auto">
          <h3 className="text-xl font-bold text-white mb-6 text-center">Organización y seguridad</h3>
          <div className="space-y-4 text-slate-300 text-sm">
            <div className="flex gap-2 items-center"><CheckCircle2 className="text-primary w-5 h-5 flex-shrink-0" /> Almacenamiento seguro de bajas médicas y partes de asistencia.</div>
            <div className="flex gap-2 items-center"><CheckCircle2 className="text-primary w-5 h-5 flex-shrink-0" /> Carga rápida de documentos de identidad de plantilla (DNI, NIE).</div>
            <div className="flex gap-2 items-center"><CheckCircle2 className="text-primary w-5 h-5 flex-shrink-0" /> Acceso para el empleado desde su portal o app móvil en cualquier momento.</div>
            <div className="flex gap-2 items-center"><CheckCircle2 className="text-primary w-5 h-5 flex-shrink-0" /> Alertas automáticas de vencimiento de contratos temporales.</div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary/20 border border-primary/30 rounded-3xl p-12 text-center max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">Empieza a digitalizar tus expedientes</h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto">
            Elimina el papel de tu oficina y gestiona todos tus documentos laborales con total tranquilidad legal.
          </p>
          <Button size="lg" className="shadow-glow" onClick={() => window.location.href = '/register'}>
            Registrar mi Empresa
          </Button>
        </section>
      </div>
    </div>
  );
};

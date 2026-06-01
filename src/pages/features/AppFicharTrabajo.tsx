import { motion } from 'framer-motion';
import { Button } from '../../components/ui/Button';
import { SEOHead } from '../../components/SEOHead';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { MapPin, SignalHigh, CheckSquare } from 'lucide-react';

export const AppFicharTrabajo = () => {
  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "App para Fichar en el Trabajo | Fycheo",
    "description": "Permite que tus empleados fichen desde su teléfono móvil con la aplicación de control horario Fycheo de forma rápida y legal.",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://fycheo.es" },
        { "@type": "ListItem", "position": 2, "name": "App para Fichar", "item": "https://fycheo.es/app-fichar-trabajo" }
      ]
    }
  };

  return (
    <div className="bg-background-dark min-h-screen text-white pt-32 pb-20">
      <SEOHead
        title="App para fichar en el trabajo | Fycheo"
        description="Permite que tus empleados fichen entrada, salida y pausas desde una app sencilla conectada en tiempo real al panel de la empresa."
        jsonLd={appSchema}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HERO */}
        <section className="text-center mb-20 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="text-primary font-bold text-xs uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
              Movilidad y Usabilidad
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 mt-4 leading-tight">
              Una app sencilla para fichar desde el móvil
            </h1>
            <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
              La forma más rápida para que tus empleados registren su entrada, salida y descansos. Ideal para teletrabajo, equipos en ruta y personal comercial.
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="shadow-glow" onClick={() => window.location.href = '/register'}>
                Comenzar Ahora
              </Button>
            </div>
          </motion.div>
        </section>

        {/* IMAGE */}
        <section className="mb-24 max-w-sm mx-auto">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
            <ImagePlaceholder
              filename="app-fichar-trabajo-fycheo.webp"
              path="/public/images/seo/app-fichar-trabajo-fycheo.webp"
              description="Mockup móvil del portal del empleado de Fycheo mostrando el gran botón interactivo de 'Fichar Entrada', estado de la jornada e historial reciente."
              alt="App para fichar en el trabajo desde el móvil con Fycheo."
              type="blog"
              aspectRatio="aspect-[9/16]"
            />
          </motion.div>
        </section>

        {/* DETALLE DE CARACTERÍSTICAS MÓVILES */}
        <section className="grid md:grid-cols-3 gap-8 mb-24 max-w-5xl mx-auto">
          <div className="p-6 bg-surface-dark border border-white/5 rounded-2xl">
            <MapPin className="text-primary-light w-8 h-8 mb-4" />
            <h3 className="font-bold text-lg text-white mb-2">Geolocalización opcional</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Registra las coordenadas GPS opcionales en cada fichaje para certificar la ubicación del empleado en rutas comerciales o trabajo técnico.
            </p>
          </div>
          <div className="p-6 bg-surface-dark border border-white/5 rounded-2xl">
            <SignalHigh className="text-primary-light w-8 h-8 mb-4" />
            <h3 className="font-bold text-lg text-white mb-2">Modo Offline / Sin conexión</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              ¿Sin cobertura en el almacén o sótano? Los empleados pueden fichar sin internet y los datos se sincronizan al recuperar la señal.
            </p>
          </div>
          <div className="p-6 bg-surface-dark border border-white/5 rounded-2xl">
            <CheckSquare className="text-primary-light w-8 h-8 mb-4" />
            <h3 className="font-bold text-lg text-white mb-2">Historial de fichajes</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              El trabajador dispone de total transparencia para revisar su registro histórico de entradas, salidas y horas trabajadas del mes.
            </p>
          </div>
        </section>

        {/* BENEFICIOS TRABAJADOR Y EMPRESA */}
        <section className="bg-surface-dark border border-white/5 rounded-2xl p-8 mb-24 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Ventajas compartidas</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-primary-light mb-3">Para el empleado</h4>
              <ul className="space-y-2 text-sm text-slate-300 list-disc pl-4">
                <li>Fichaje rápido en menos de 2 segundos.</li>
                <li>Gestión de ausencias y solicitudes en la misma app.</li>
                <li>Control real y transparente de sus horas trabajadas.</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-primary-light mb-3">Para la empresa</h4>
              <ul className="space-y-2 text-sm text-slate-300 list-disc pl-4">
                <li>Cero costes en terminales hardware físicos de pared.</li>
                <li>Control de presencia en tiempo real desde el panel.</li>
                <li>Garantía de cumplimiento del Estatuto de los Trabajadores.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary/20 border border-primary/30 rounded-3xl p-12 text-center max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">Habilita el fichaje móvil en tu empresa</h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto">
            Registra tu cuenta y configura los accesos móviles de tus empleados en minutos. Sin complicaciones.
          </p>
          <Button size="lg" className="shadow-glow" onClick={() => window.location.href = '/register'}>
            Crear Cuenta Gratis
          </Button>
        </section>
      </div>
    </div>
  );
};

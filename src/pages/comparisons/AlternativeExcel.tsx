import { XCircle, AlertTriangle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { motion } from 'framer-motion';
import { SEOHead } from '../../components/SEOHead';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';

export const AlternativeExcel = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Alternativa a Excel para Control Horario | Fycheo",
    "description": "Descubre por qué usar hojas de cálculo de Excel para el registro de jornada laboral puede acarrear multas y pérdidas de tiempo en pymes.",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://fycheo.es" },
        { "@type": "ListItem", "position": 2, "name": "Alternativa Excel", "item": "https://fycheo.es/alternativa-excel-control-horario" }
      ]
    }
  };

  return (
    <div className="pt-32 pb-20 bg-background-dark min-h-screen text-slate-300">
      <SEOHead
        title="Alternativa a Excel para control horario | Fycheo"
        description="Pásate del Excel a un control horario digital, seguro e inalterable. Evita multas de inspección y ahorra horas de sumas manuales de jornada."
        jsonLd={schema}
      />

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20 text-center">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-primary font-bold text-xs uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
              Excel vs Software Digital
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 mt-4 leading-tight">
              ¿Sigues llevando los fichajes con Excel?
            </h1>
            <p className="text-xl text-slate-400 mb-10 leading-relaxed">
              Las hojas de cálculo son propensas a errores, se borran accidentalmente y carecen de validez de cara a una inspección de trabajo. Pásate a un sistema digital integrado y gana tranquilidad.
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="shadow-glow" onClick={() => window.location.href = "/register"}>
                Dejar Excel Gratis
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* IMAGE PLACEHOLDER */}
      <section className="mb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <ImagePlaceholder
            filename="alternativa-excel-control-horario-fycheo.webp"
            path="/public/images/seo/alternativa-excel-control-horario-fycheo.webp"
            description="Comparación visual entre una hoja de Excel desordenada con celdas de error '#¡REF!' y celdas cruzadas frente a un dashboard de Fycheo limpio."
            alt="Alternativa a Excel para control horario de empleados."
            type="comparison"
            aspectRatio="aspect-video"
          />
        </motion.div>
      </section>

      {/* RIESGOS DE EXCEL */}
      <section className="mb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white text-center mb-12">Los riesgos reales de no digitalizar el fichaje</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-surface-dark border-white/5 flex gap-4 p-6 items-start">
            <AlertTriangle className="text-yellow-500 w-8 h-8 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Falta de inalterabilidad</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                El Estatuto de los Trabajadores exige que el sistema garantice que los registros no sean modificables. Un Excel editable no cumple con esta premisa de inalterabilidad.
              </p>
            </div>
          </Card>
          <Card className="bg-surface-dark border-white/5 flex gap-4 p-6 items-start">
            <XCircle className="text-red-500 w-8 h-8 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Fórmulas rotas y archivos corruptos</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Basta con que un empleado borre una celda o arrastre una fórmula para estropear el cómputo de horas de toda la plantilla de la empresa.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* TABLA COMPARATIVA */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto mb-24">
        <h2 className="text-3xl font-bold text-center mb-12">Tabla Excel vs Fycheo</h2>
        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-surface-dark">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-slate-400">
                <th className="p-5 font-semibold">Característica</th>
                <th className="p-5 text-center">Hoja Excel</th>
                <th className="p-5 text-center bg-primary/10 text-white font-bold">Fycheo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              <tr>
                <td className="p-5 font-medium">Validación legal inalterable</td>
                <td className="p-5 text-center text-red-500 font-bold">No</td>
                <td className="p-5 text-center text-green-400 font-bold bg-primary/5">Sí</td>
              </tr>
              <tr>
                <td className="p-5 font-medium">Fichaje desde el móvil con GPS</td>
                <td className="p-5 text-center text-red-500">No</td>
                <td className="p-5 text-center text-green-400 font-bold bg-primary/5">Sí</td>
              </tr>
              <tr>
                <td className="p-5 font-medium">Aprobación de vacaciones integrada</td>
                <td className="p-5 text-center text-red-500">No</td>
                <td className="p-5 text-center text-green-400 font-bold bg-primary/5">Sí</td>
              </tr>
              <tr>
                <td className="p-5 font-medium">Trazabilidad de correcciones</td>
                <td className="p-5 text-center text-red-500">No</td>
                <td className="p-5 text-center text-green-400 font-bold bg-primary/5">Sí (Auditado)</td>
              </tr>
              <tr>
                <td className="p-5 font-medium">Cálculo de horas netas automático</td>
                <td className="p-5 text-center text-yellow-500">Manual / Fórmulas</td>
                <td className="p-5 text-center text-green-400 font-bold bg-primary/5">Automático</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary/20 border border-primary/30 rounded-3xl p-12 text-center max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-4">Empieza a digitalizar tu control horario</h2>
        <p className="text-slate-300 mb-8 max-w-xl mx-auto">
          Prueba Fycheo gratis durante 14 días. Sube tu plantilla en un clic y despídete de las hojas de cálculo para siempre.
        </p>
        <Button size="lg" className="shadow-glow" onClick={() => window.location.href = "/register"}>
          Comenzar gratis
        </Button>
      </section>
    </div>
  );
};

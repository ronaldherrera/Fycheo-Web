import { motion } from 'framer-motion';
import { Button } from '../../components/ui/Button';
import { BarChart3, FileText, PieChart, ShieldCheck, Download, CheckCircle2, TrendingUp, AlertTriangle } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

// ── Datos de ejemplo ─────────────────────────────────────────────────────────
const empleados = [
  { nombre: 'María García', iniciales: 'MG', color: '#3175FF', horas: '173h 15m', dias: 22, ausencias: 0, extra: '+5h 15m', estado: 'ok', jornada: 'Completa' },
  { nombre: 'Carlos Ruiz',  iniciales: 'CR', color: '#10B981', horas: '160h 00m', dias: 20, ausencias: 2, extra: '—',        estado: 'ok', jornada: 'Completa' },
  { nombre: 'Lucía Pérez',  iniciales: 'LP', color: '#EC4899', horas: '88h 30m',  dias: 11, ausencias: 0, extra: '—',        estado: 'ok', jornada: 'Media jornada' },
  { nombre: 'Javier Torres',iniciales: 'JT', color: '#DE900D', horas: '145h 45m', dias: 19, ausencias: 3, extra: '-10h 15m', estado: 'alerta', jornada: 'Completa' },
  { nombre: 'Sofía Navarro',iniciales: 'SN', color: '#8B5CF6', horas: '168h 00m', dias: 21, ausencias: 1, extra: '+1h 00m', estado: 'ok', jornada: 'Completa' },
];

const barras = [
  { mes: 'Ene', horas: 168, color: 'from-blue-500/60 to-blue-600/60' },
  { mes: 'Feb', horas: 152, color: 'from-blue-500/60 to-blue-600/60' },
  { mes: 'Mar', horas: 176, color: 'from-blue-500/60 to-blue-600/60' },
  { mes: 'Abr', horas: 160, color: 'from-blue-500/60 to-blue-600/60' },
  { mes: 'May', horas: 183, color: 'from-blue-500 to-blue-400' }, // mes actual
];

// ── Componente ScaledPreview para escalar mockups a tamaño real ────────────────
const ScaledPreview = ({ 
  nativeWidth = 1024, 
  nativeHeight = 600, 
  containerHeight = 480,
  children 
}: { 
  nativeWidth?: number; 
  nativeHeight?: number; 
  containerHeight?: number;
  children: React.ReactNode 
}) => {
  const [containerWidth, setContainerWidth] = useState(800);
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(entries => {
      if (!entries || entries.length === 0) return;
      setContainerWidth(entries[0].contentRect.width);
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  const scale = containerWidth / nativeWidth;

  return (
    <div ref={ref} style={{ width: '100%', height: containerHeight, overflow: 'hidden', position: 'relative' }}>
      <div style={{
        width: nativeWidth,
        height: nativeHeight,
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        position: 'absolute',
        top: 0,
        left: 0,
      }}>
        {children}
      </div>
    </div>
  );
};

const ReportsMockup = () => {
  const [activeView, setActiveView] = useState<'tabla' | 'grafico'>('tabla');
  const maxH = Math.max(...barras.map(b => b.horas));

  return (
    <div className="bg-[#0d1117] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
      {/* Barra de título */}
      <div className="h-8 bg-[#111827] border-b border-white/5 flex items-center px-4 gap-2">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        </div>
        <div className="flex-1 mx-4 h-4 bg-white/5 rounded-full text-[9px] text-slate-500 flex items-center px-3">
          manager.fycheo.es / informes
        </div>
      </div>

      {/* Header del informe */}
      <div className="px-5 py-4 border-b border-white/5 flex items-start justify-between gap-4">
        <div>
          <div className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold mb-0.5">Informe mensual</div>
          <h3 className="text-white font-bold text-base">Mayo 2025 — Empresa Demo S.L.</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">5 empleados · 01/05/2025 – 31/05/2025</p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button className="flex items-center gap-1.5 text-[11px] px-3 py-1.5 bg-red-600/15 text-red-400 border border-red-500/25 rounded-lg font-semibold hover:bg-red-600/25 transition-colors">
            <Download className="w-3 h-3" /> PDF
          </button>
          <button className="flex items-center gap-1.5 text-[11px] px-3 py-1.5 bg-green-600/15 text-green-400 border border-green-500/25 rounded-lg font-semibold hover:bg-green-600/25 transition-colors">
            <Download className="w-3 h-3" /> Excel
          </button>
        </div>
      </div>

      {/* KPIs rápidos */}
      <div className="grid grid-cols-4 gap-3 px-5 py-4 border-b border-white/5">
        {[
          { label: 'Total horas', value: '735h 30m', icon: BarChart3, color: 'text-blue-400', bg: 'bg-blue-500/10' },
          { label: 'Puntualidad', value: '96,4%', icon: CheckCircle2, color: 'text-green-400', bg: 'bg-green-500/10' },
          { label: 'Ausencias', value: '6 días', icon: AlertTriangle, color: 'text-amber-400', bg: 'bg-amber-500/10' },
          { label: 'Horas extra', value: '+6h 15m', icon: TrendingUp, color: 'text-purple-400', bg: 'bg-purple-500/10' },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-[#161d2a] rounded-xl p-3 border border-white/5">
            <div className={`w-7 h-7 ${bg} rounded-lg flex items-center justify-center mb-2`}>
              <Icon className={`w-3.5 h-3.5 ${color}`} />
            </div>
            <div className={`text-sm font-bold ${color}`}>{value}</div>
            <div className="text-[10px] text-slate-500 mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* Tabs tabla / gráfico */}
      <div className="px-5 pt-4 flex gap-1 border-b border-white/5 pb-0">
        {(['tabla', 'grafico'] as const).map(v => (
          <button
            key={v}
            onClick={() => setActiveView(v)}
            className={`pb-3 px-3 text-xs font-semibold border-b-2 transition-colors ${
              activeView === v ? 'border-primary text-white' : 'border-transparent text-slate-500 hover:text-slate-300'
            }`}
          >
            {v === 'tabla' ? '📋 Por empleado' : '📈 Tendencia mensual'}
          </button>
        ))}
      </div>

      {activeView === 'tabla' ? (
        <div className="overflow-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-white/5">
                {['Empleado', 'Jornada', 'Total horas', 'Días', 'Ausencias', 'Horas extra', 'Estado'].map(h => (
                  <th key={h} className="px-4 py-2.5 text-left text-[10px] text-slate-500 font-semibold uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {empleados.map(({ nombre, iniciales, color, horas, dias, ausencias, extra, estado, jornada }) => (
                <tr key={nombre} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold text-white shrink-0" style={{ backgroundColor: color }}>
                        {iniciales}
                      </div>
                      <span className="text-[11px] text-white font-medium">{nombre}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2.5">
                    <span className="text-[9px] bg-white/5 text-slate-400 px-2 py-0.5 rounded-full">{jornada}</span>
                  </td>
                  <td className="px-4 py-2.5 text-[11px] text-slate-300 font-medium whitespace-nowrap">{horas}</td>
                  <td className="px-4 py-2.5 text-[11px] text-slate-400">{dias}</td>
                  <td className="px-4 py-2.5">
                    <span className={`text-[10px] font-medium ${ausencias > 0 ? 'text-amber-400' : 'text-slate-500'}`}>
                      {ausencias > 0 ? `${ausencias} días` : '—'}
                    </span>
                  </td>
                  <td className={`px-4 py-2.5 text-[11px] font-semibold ${extra.startsWith('+') ? 'text-green-400' : extra.startsWith('-') ? 'text-red-400' : 'text-slate-500'}`}>{extra}</td>
                  <td className="px-4 py-2.5">
                    <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${estado === 'ok' ? 'bg-green-500/15 text-green-400' : 'bg-amber-500/15 text-amber-400'}`}>
                      {estado === 'ok' ? '✓ Correcto' : '⚠ Revisar'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-5 py-3 border-t border-white/5 flex justify-between text-[10px] text-slate-500">
            <span>5 empleados · Generado el 27/05/2025</span>
            <span>Total empresa: <span className="text-white font-bold">735h 30m</span></span>
          </div>
        </div>
      ) : (
        <div className="p-6">
          <div className="flex items-end gap-4 h-44">
            {barras.map(({ mes, horas, color }) => (
              <div key={mes} className="flex-1 flex flex-col items-center gap-2">
                <div className="text-[10px] text-slate-400 font-semibold">{horas}h</div>
                <div
                  className={`w-full bg-gradient-to-t ${color} rounded-t-lg transition-all`}
                  style={{ height: `${(horas / maxH) * 140}px` }}
                />
                <div className="text-[10px] text-slate-500">{mes}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl">
            <TrendingUp className="w-4 h-4 text-blue-400 shrink-0" />
            <span className="text-[11px] text-blue-300">Mayo es el mes con más horas registradas (+9% vs media trimestral)</span>
          </div>
        </div>
      )}
    </div>
  );
};

export const Reports = () => {
  return (
    <div className="pt-24 pb-20">
      {/* Hero Feature */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-pink-500/10 text-pink-400 text-sm font-medium mb-6">
              <BarChart3 className="w-4 h-4 mr-2" />
              Informes y Auditoría
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              Tus datos, siempre{' '}
              <span className="text-primary">al día y seguros</span>
            </h1>
            <p className="text-lg text-slate-400 mb-8 leading-relaxed">
              Genera informes detallados para la Inspección de Trabajo con un solo clic. Exporta en PDF o Excel. Analiza la productividad del equipo con gráficas reales.
            </p>

            <div className="space-y-4 mb-10">
              {[
                { icon: FileText, title: 'A prueba de inspecciones', desc: 'Todos los registros se conservan 4 años. Exporta exactamente lo que pidan en segundos.', color: 'text-pink-400', bg: 'bg-pink-500/10' },
                { icon: PieChart, title: 'Analítica de RRHH', desc: 'Detecta patrones de absentismo, horas extra excesivas o falta de puntualidad por empleado.', color: 'text-purple-400', bg: 'bg-purple-500/10' },
                { icon: Download, title: 'Exportación instantánea', desc: 'PDF con firma digital, Excel editable o CSV para integraciones. Elige el formato que necesites.', color: 'text-blue-400', bg: 'bg-blue-500/10' },
                { icon: ShieldCheck, title: 'Datos siempre seguros', desc: 'Encriptación bancaria, copias de seguridad diarias y cumplimiento RGPD garantizado.', color: 'text-green-400', bg: 'bg-green-500/10' },
              ].map(({ icon: Icon, title, desc, color, bg }) => (
                <div key={title} className="flex items-start gap-3">
                  <div className={`w-8 h-8 ${bg} rounded-lg flex items-center justify-center shrink-0 mt-0.5`}>
                    <Icon className={`w-4 h-4 ${color}`} />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">{title}</div>
                    <div className="text-slate-400 text-sm">{desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={() => window.location.href = '/register'}>Empezar ahora</Button>
              <Button variant="outline" size="lg" onClick={() => window.location.href = '/pricing'}>Ver planes</Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full"
          >
            <ScaledPreview nativeWidth={1024} nativeHeight={600} containerHeight={480}>
              <ReportsMockup />
            </ScaledPreview>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-surface-dark/50">
        <div className="max-w-2xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-white mb-4">¿Listo para tener el control total?</h2>
          <p className="text-slate-400 mb-8">Genera tu primer informe legal en menos de 2 minutos.</p>
          <Button size="lg" className="shadow-glow" onClick={() => window.location.href = '/register'}>
            Empezar gratis 14 días
          </Button>
        </div>
      </section>
    </div>
  );
};

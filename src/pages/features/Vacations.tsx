import { motion } from 'framer-motion';
import { Button } from '../../components/ui/Button';
import { Calendar, CheckCircle2, Plane, Users, X, Check } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

// ── Datos de ejemplo ─────────────────────────────────────────────────────────
const solicitudesPendientes = [
  { nombre: 'Juan Díaz',    iniciales: 'JD', color: '#3175FF', desde: '12 Ago', hasta: '16 Ago', dias: 5 },
  { nombre: 'Rosa Campos', iniciales: 'RC', color: '#EC4899', desde: '19 Ago', hasta: '23 Ago', dias: 5 },
];

const equipo = [
  { nombre: 'María García', iniciales: 'MG', color: '#3175FF', diasUsados: 12, diasTotal: 22, vacaciones: [14, 15, 16, 17, 18] },
  { nombre: 'Carlos Ruiz',  iniciales: 'CR', color: '#10B981', diasUsados: 8,  diasTotal: 22, vacaciones: [21, 22, 23] },
  { nombre: 'Lucía Pérez',  iniciales: 'LP', color: '#EC4899', diasUsados: 5,  diasTotal: 22, vacaciones: [] },
  { nombre: 'Javier Torres',iniciales: 'JT', color: '#DE900D', diasUsados: 18, diasTotal: 22, vacaciones: [7, 8, 9, 10, 11] },
];

// Días del mes agosto (empezamos jueves → offset 3)
const OFFSET = 3; // agosto 2025 empieza en viernes (0=lun, 4=vie)
const DIAS_MES = 31;

// ── Componente ScaledPreview para escalar mockups a tamaño real ────────────────
const ScaledPreview = ({ 
  nativeWidth = 1024, 
  nativeHeight = 560, 
  containerHeight = 560,
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

const VacationsCalendarMockup = () => {
  const [solicitudes, setSolicitudes] = useState(solicitudesPendientes);

  const handleApprove = (nombre: string) => {
    setSolicitudes(prev => prev.filter(s => s.nombre !== nombre));
  };

  const getDiaClase = (dia: number) => {
    // Buscar si algún empleado está de vacaciones
    const enVacaciones = equipo.filter(e => e.vacaciones.includes(dia));
    if (enVacaciones.length > 0) return { tipo: 'vacaciones', empleado: enVacaciones[0] };
    if (dia === 25 || dia === 15) return { tipo: 'festivo', empleado: null };
    return { tipo: 'normal', empleado: null };
  };

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
          manager.fycheo.es / vacaciones
        </div>
      </div>

      <div className="p-5 grid lg:grid-cols-3 gap-5">
        {/* Columna izquierda: Calendario */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-white font-bold text-base">Agosto 2025</h3>
              <p className="text-[11px] text-slate-500">Vista de equipo</p>
            </div>
            <div className="flex gap-3 text-[10px]">
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-blue-500/40" /><span className="text-slate-400">Vacaciones</span></div>
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-red-500/40" /><span className="text-slate-400">Festivo</span></div>
            </div>
          </div>

          {/* Cabecera días */}
          <div className="grid grid-cols-7 gap-1 mb-1">
            {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map(d => (
              <div key={d} className="text-center text-[10px] text-slate-500 font-semibold py-1">{d}</div>
            ))}
          </div>

          {/* Días del calendario */}
          <div className="grid grid-cols-7 gap-1">
            {/* Offset vacío */}
            {Array(OFFSET).fill(null).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {Array(DIAS_MES).fill(null).map((_, i) => {
              const dia = i + 1;
              const info = getDiaClase(dia);
              const esFinDeSemana = (dia + OFFSET - 1) % 7 >= 5;
              return (
                <div
                  key={dia}
                  className={`aspect-square rounded-lg flex flex-col items-center justify-center text-[11px] font-medium transition-colors relative ${
                    info.tipo === 'festivo' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                    info.tipo === 'vacaciones' ? 'border' :
                    esFinDeSemana ? 'bg-white/3 text-slate-600' :
                    'bg-white/5 text-slate-400 hover:bg-white/8'
                  }`}
                  style={info.tipo === 'vacaciones' && info.empleado ? {
                    backgroundColor: info.empleado.color + '25',
                    borderColor: info.empleado.color + '50',
                    color: info.empleado.color,
                  } : {}}
                >
                  {dia}
                  {info.tipo === 'vacaciones' && info.empleado && (
                    <span className="text-[7px] leading-none mt-0.5 opacity-80">{info.empleado.iniciales}</span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Leyenda de equipo */}
          <div className="mt-4 pt-4 border-t border-white/5">
            <div className="grid grid-cols-2 gap-2">
              {equipo.map(({ nombre, iniciales, color, diasUsados, diasTotal }) => (
                <div key={nombre} className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold text-white shrink-0" style={{ backgroundColor: color }}>
                    {iniciales}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[9px] text-slate-300 truncate">{nombre}</div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${(diasUsados / diasTotal) * 100}%`, backgroundColor: color }} />
                      </div>
                      <span className="text-[8px] text-slate-500">{diasUsados}/{diasTotal}d</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Columna derecha: Solicitudes pendientes */}
        <div>
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center justify-between">
            Solicitudes pendientes
            {solicitudes.length > 0 && (
              <span className="bg-amber-500/20 text-amber-400 text-[9px] px-2 py-0.5 rounded-full font-bold">{solicitudes.length}</span>
            )}
          </div>

          {solicitudes.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-32 text-center">
              <CheckCircle2 className="w-8 h-8 text-green-400 mb-2" />
              <span className="text-[11px] text-slate-400">¡Todo aprobado!</span>
            </div>
          ) : (
            <div className="space-y-3">
              {solicitudes.map(({ nombre, iniciales, color, desde, hasta, dias }) => (
                <motion.div
                  key={nombre}
                  layout
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-[#161d2a] border border-white/5 rounded-xl p-3"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-bold text-white shrink-0" style={{ backgroundColor: color }}>
                      {iniciales}
                    </div>
                    <div>
                      <div className="text-[10px] font-semibold text-white">{nombre}</div>
                      <div className="text-[9px] text-slate-500">solicita vacaciones</div>
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-lg px-3 py-2 mb-3">
                    <div className="text-[10px] text-white font-medium">{desde} → {hasta}</div>
                    <div className="text-[9px] text-slate-500">{dias} días laborables</div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleApprove(nombre)}
                      className="flex-1 py-1.5 bg-green-500/20 text-green-400 border border-green-500/30 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1 hover:bg-green-500/30 transition-colors"
                    >
                      <Check className="w-3 h-3" /> Aprobar
                    </button>
                    <button
                      onClick={() => handleApprove(nombre)}
                      className="flex-1 py-1.5 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1 hover:bg-red-500/30 transition-colors"
                    >
                      <X className="w-3 h-3" /> Rechazar
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Resumen */}
          <div className="mt-4 pt-4 border-t border-white/5 space-y-2">
            <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Agosto en cifras</div>
            {[
              { label: 'Empleados de vacaciones', value: '4', color: 'text-blue-400' },
              { label: 'Días pendientes aprobación', value: '10', color: 'text-amber-400' },
              { label: 'Festivos nacionales', value: '2', color: 'text-red-400' },
            ].map(({ label, value, color }) => (
              <div key={label} className="flex justify-between items-center">
                <span className="text-[10px] text-slate-400">{label}</span>
                <span className={`text-[11px] font-bold ${color}`}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Vacations = () => {
  return (
    <div className="pt-24 pb-20">
      {/* Hero Feature */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-sm font-medium mb-6">
              <Plane className="w-4 h-4 mr-2" />
              Gestión de Vacaciones
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              Adiós al caos de los{' '}
              <span className="text-primary">Excel y los emails</span>
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed">
              Centraliza todas las solicitudes de vacaciones y ausencias. Visualiza solapamientos de equipo y aprueba con un solo clic. El empleado recibe la respuesta al instante en su app.
            </p>
          </motion.div>
        </div>

        {/* Mockup interactivo del calendario */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-5xl mx-auto"
        >
          <p className="text-center text-xs text-slate-500 mb-4 italic">💡 Prueba a aprobar o rechazar las solicitudes pendientes de la derecha</p>
          <ScaledPreview nativeWidth={1024} nativeHeight={560} containerHeight={560}>
            <VacationsCalendarMockup />
          </ScaledPreview>
        </motion.div>
      </section>

      {/* Benefits Grid */}
      <section className="py-20 bg-surface-dark/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Calendar, title: 'Calendarios de equipo', desc: 'Visualiza de un vistazo quién está de vacaciones y quién trabaja. Evita quedarte sin personal en fechas clave.', color: 'text-blue-400', bg: 'bg-blue-500/10' },
              { icon: Users, title: 'Saldos en tiempo real', desc: 'Cada empleado puede ver cuántos días le quedan en su app. Sin necesidad de preguntar a RRHH.', color: 'text-purple-400', bg: 'bg-purple-500/10' },
              { icon: CheckCircle2, title: 'Tipos personalizados', desc: 'Vacaciones, enfermedad, asuntos propios, teletrabajo... configura todos los tipos que necesites.', color: 'text-green-400', bg: 'bg-green-500/10' },
            ].map(({ icon: Icon, title, desc, color, bg }) => (
              <div key={title} className="p-6">
                <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className={`w-6 h-6 ${color}`} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                <p className="text-slate-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-2xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-white mb-4">¿Listo para decir adiós a los Excel?</h2>
          <p className="text-slate-400 mb-8">Importa tu equipo en minutos y empieza a gestionar vacaciones hoy mismo.</p>
          <Button size="lg" className="shadow-glow" onClick={() => window.location.href = '/register'}>
            Empezar gratis 14 días
          </Button>
        </div>
      </section>
    </div>
  );
};

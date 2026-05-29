import { ArrowRight, CheckCircle2, Clock, Users, AlertCircle, CalendarOff, FileDown, Activity, LayoutDashboard, Calendar, Settings, LogOut, ChevronRight, Building2, Megaphone, Target, TrendingUp, X } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

// ═══════════════════════════════════════════════════════════════════════════════
// COLORES EXACTOS DEL MANAGER (tailwind.config.js)
// background.dark: #0B0E14 | surface.dark: #151B2B | primary: #135bec
// surface.highlight: #1E273B | border.dark: #2A3447
// ═══════════════════════════════════════════════════════════════════════════════

// ── Datos de ejemplo ─────────────────────────────────────────────────────────
const timeline24h = [0, 0, 0, 0, 0, 0, 2, 8, 12, 14, 15, 13, 8, 10, 14, 12, 8, 5, 2, 1, 0, 0, 0, 0];
const chartData7dias = [
  { name: '21/05', fichajes: 22 },
  { name: '22/05', fichajes: 24 },
  { name: '23/05', fichajes: 21 },
  { name: '24/05', fichajes: 20 },
  { name: '25/05', fichajes: 2 },
  { name: '26/05', fichajes: 0 },
  { name: '27/05', fichajes: 23 },
];

const presentEmployees = [
  { name: 'Laura Gómez', time: '07:55' },
  { name: 'Miguel Ángel', time: '08:12' },
  { name: 'Sofía Navarro', time: '08:45' },
  { name: 'Carlos Ruiz', time: '09:02' },
];

const alertsList = [
  { name: 'Elena Sur', type: 'Vacaciones', desde: '15/06', hasta: '30/06' },
  { name: 'David Pons', type: 'Permiso', desde: '28/05', hasta: '29/05' },
];

// ── Componente ScaledPreview para escalar mockups a tamaño real ────────────────
const ScaledPreview = ({ 
  nativeWidth = 1280, 
  nativeHeight = 800, 
  containerHeight,
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
  const computedHeight = containerHeight !== undefined ? containerHeight : nativeHeight * scale;

  return (
    <div ref={ref} style={{ width: '100%', height: computedHeight, overflow: 'hidden', position: 'relative' }}>
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

// ── Mockup EXACTO del Manager Dashboard ──────────────────────────────────────
const ManagerDashboardMockup = () => {
  const [activeItem, setActiveItem] = useState('Resumen');

  const maxDensity = Math.max(...timeline24h, 1);
  const maxFichajes = Math.max(...chartData7dias.map(d => d.fichajes), 1);

  return (
    <div
      className="w-full h-full flex overflow-hidden text-white select-none"
      style={{ fontFamily: 'Manrope, sans-serif', backgroundColor: '#0B0E14', fontSize: 12 }}
    >
      {/* ── SIDEBAR real ── */}
      <div style={{ width: 256, backgroundColor: '#151B2B', borderRight: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        {/* Header logo */}
        <div style={{ height: 64, display: 'flex', alignItems: 'center', padding: '0 24px', borderBottom: '1px solid rgba(255,255,255,0.05)', justifyContent: 'space-between' }}>
          <img src="/mngr_blanco.svg" alt="Fycheo Mngr" style={{ height: 28, objectFit: 'contain' }} />
          <ChevronRight style={{ width: 16, height: 16, color: '#64748B', transform: 'rotate(180deg)' }} />
        </div>

        {/* Empresa activa */}
        <div style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: 12, display: 'flex', alignItems: 'center', gap: 12, border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(19,91,236,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid rgba(255,255,255,0.1)' }}>
              <Building2 style={{ width: 16, height: 16, color: '#135bec' }} />
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>Organizacion de pru...</div>
              <div style={{ fontSize: 10, color: '#64748B', marginTop: 2 }}>← Volver al Hub</div>
            </div>
          </div>
        </div>

        {/* Nav items — exactamente los del Sidebar real */}
        <nav style={{ flex: 1, padding: '24px 12px', display: 'flex', flexDirection: 'column', gap: 4, overflowY: 'auto' }}>
          {[
            { icon: LayoutDashboard, label: 'Resumen' },
            { icon: Users, label: 'Equipos' },
            { icon: Calendar, label: 'Turnos' },
            { icon: CalendarOff, label: 'Ausencias y Bajas' },
            { icon: FileDown, label: 'Exportación' },
            { icon: Activity, label: 'Registro Actividad' },
            { icon: Settings, label: 'Configuración' },
          ].map(({ icon: Icon, label }) => {
            const active = activeItem === label;
            return (
              <div key={label} onClick={() => setActiveItem(label)} style={{
                display: 'flex', alignItems: 'center', padding: '10px 12px', borderRadius: 8,
                background: active ? 'rgba(19,91,236,0.2)' : 'transparent',
                border: active ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
                color: active ? '#fff' : '#94A3B8', cursor: 'pointer', gap: 12, transition: 'all 0.2s'
              }}>
                <Icon style={{ width: 18, height: 18, color: active ? '#135bec' : '#94A3B8', flexShrink: 0 }} />
                <span style={{ fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap' }}>{label}</span>
              </div>
            );
          })}
        </nav>

        {/* Publicar cambios */}
        <div style={{ padding: '0 16px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', borderRadius: 8, border: '1px solid rgba(19,91,236,0.5)', color: '#60a5fa', opacity: 0.6 }}>
            <Megaphone style={{ width: 18, height: 18 }} />
            <span style={{ fontSize: 13, fontWeight: 500 }}>Sin cambios</span>
          </div>
        </div>

        {/* Profile footer */}
        <div style={{ padding: 16, borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '0 8px' }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(19,91,236,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid rgba(255,255,255,0.1)' }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#135bec' }}>G</span>
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, color: '#fff' }}>Gestro Prueba Uno</div>
              <div style={{ fontSize: 11, color: '#64748B' }}>Administrador</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', padding: '10px 12px', borderRadius: 8, color: '#64748B', gap: 12, cursor: 'default' }}>
            <LogOut style={{ width: 18, height: 18 }} />
            <span style={{ fontSize: 13, fontWeight: 500 }}>Cerrar Sesión</span>
          </div>
        </div>
      </div>

      {/* ── CONTENIDO PRINCIPAL ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
        
        {activeItem === 'Resumen' && (
          <>
            {/* Toolbar de filtros */}
            <div style={{ backgroundColor: '#151B2B', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexShrink: 0 }}>
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ background: '#1E273B', border: '1px solid #2A3447', borderRadius: 10, padding: '8px 16px', fontSize: 12, color: '#fff', display: 'flex', alignItems: 'center', gap: 8 }}>
              Toda la Organización <ChevronRight style={{ width: 14, height: 14, color: '#64748B', transform: 'rotate(90deg)' }} />
            </div>
          </div>
          <div style={{ background: '#1E273B', border: '1px solid #2A3447', borderRadius: 10, padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Calendar style={{ width: 16, height: 16, color: '#64748B' }} />
            <span style={{ fontSize: 12, color: '#fff', fontWeight: 500 }}>27/05/2026</span>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* KPIs — exactamente los 4 del Dashboard real */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {[
              { label: 'Empleados', value: '24', icon: Users, color: '#3b82f6', bg: 'rgba(59,130,246,0.1)' },
              { label: 'Fichajes (Día)', value: '21', icon: Clock, color: '#10B981', bg: 'rgba(16,185,129,0.1)' },
              { label: 'Ausencias (Día)', value: '2', icon: CalendarOff, color: '#a855f7', bg: 'rgba(168,85,247,0.1)' },
              { label: 'Alertas', value: '2', icon: AlertCircle, color: '#ef4444', bg: 'rgba(239,68,68,0.1)' },
            ].map(({ label, value, icon: Icon, color, bg }) => (
              <div key={label} style={{ background: '#151B2B', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 16, padding: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 12, color: '#94A3B8', fontWeight: 500 }}>{label}</div>
                  <div style={{ fontSize: 28, fontWeight: 700, color: '#fff', marginTop: 8 }}>{value}</div>
                </div>
                <div style={{ width: 56, height: 56, borderRadius: 16, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon style={{ width: 28, height: 28, color }} />
                </div>
              </div>
            ))}
          </div>

          {/* Área principal reorganizada según el screenshot */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Row 1: Timeline + Alertas */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 24 }}>
              {/* Timeline 24h */}
              <div style={{ background: '#151B2B', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 16, padding: 24 }}>
                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>Línea Temporal (24h)</div>
                  <div style={{ fontSize: 11, color: '#64748B', marginTop: 4 }}>Densidad de actividad por hora</div>
                </div>
                <div style={{ display: 'flex', height: 64, background: '#1e293b', borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
                  {timeline24h.map((density, hour) => {
                    const intensity = density / maxDensity;
                    return (
                      <div key={hour} style={{ flex: 1, borderRight: '1px solid rgba(15,23,42,0.5)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                        <div style={{
                          width: '100%',
                          background: 'linear-gradient(to top, #10B981, #34d399)',
                          height: density > 0 ? `${Math.max(intensity * 100, 8)}%` : '0%',
                          opacity: density > 0 ? 0.4 + intensity * 0.6 : 0,
                          borderRadius: '2px 2px 0 0',
                        }} />
                      </div>
                    );
                  })}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 10, color: '#64748B', fontWeight: 500 }}>
                  <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>23:59</span>
                </div>
              </div>

              {/* Alertas */}
              <div style={{ background: '#151B2B', border: '1px solid rgba(249,115,22,0.2)', borderRadius: 16, padding: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                  <AlertCircle style={{ width: 16, height: 16, color: '#fb923c' }} />
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#fb923c' }}>Atención Requerida</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {alertsList.map(({ name, type, desde, hasta }, i) => (
                    <div key={i} style={{ background: 'rgba(249,115,22,0.1)', borderRadius: 10, border: '1px solid rgba(249,115,22,0.2)', padding: 12 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                        <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Users style={{ width: 13, height: 13, color: '#64748B' }} />
                        </div>
                        <span style={{ fontSize: 12, fontWeight: 600, color: '#fed7aa' }}>{name}</span>
                      </div>
                      <div style={{ fontSize: 11, color: '#fdba74' }}>Solicitud: <strong>{type}</strong></div>
                      <div style={{ fontSize: 10, color: 'rgba(253,186,116,0.8)', marginTop: 2 }}>{desde} al {hasta}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Row 2: Gráfico 7 días + Productividad + Presentes */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 280px', gap: 24 }}>
              {/* Gráfico 7 días */}
              <div style={{ background: '#151B2B', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 16, padding: 24, display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 16 }}>Tendencia 7 días</div>
                <div style={{ flex: 1, position: 'relative', display: 'flex' }}>
                  {(() => {
                    const max = Math.max(...chartData7dias.map(d => d.fichajes), 4);
                    return (
                      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingBottom: 24, paddingRight: 10, fontSize: 10, color: '#64748B' }}>
                        <span>{max}</span><span>{Math.round(max * 0.75)}</span><span>{Math.round(max * 0.5)}</span><span>{Math.round(max * 0.25)}</span><span>0</span>
                      </div>
                    );
                  })()}
                  <div style={{ flex: 1, position: 'relative' }}>
                    {/* Grid lines */}
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingBottom: 24 }}>
                      {[...Array(5)].map((_, i) => <div key={i} style={{ borderBottom: '1px dashed rgba(255,255,255,0.05)', flex: i < 4 ? 1 : 0 }} />)}
                    </div>
                    {/* SVG Chart */}
                    <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 'calc(100% - 24px)', overflow: 'visible' }}>
                      <defs>
                        <linearGradient id="area-gradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="rgba(59,130,246,0.3)" />
                          <stop offset="100%" stopColor="rgba(59,130,246,0)" />
                        </linearGradient>
                      </defs>
                      {(() => {
                        const maxFichajes = Math.max(...chartData7dias.map(d => d.fichajes), 1);
                        const points = chartData7dias.map((d, i) => {
                          const x = (i / (chartData7dias.length - 1)) * 100;
                          const y = 100 - (d.fichajes / maxFichajes) * 100;
                          return `${x},${y}`;
                        });
                        const linePath = `M ${points.map((p, i) => i === 0 ? p : `L ${p}`).join(' ')}`;
                        const areaPath = `${linePath} L 100,100 L 0,100 Z`;
                        return (
                          <>
                            <path d={linePath} fill="none" stroke="#3b82f6" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                            <path d={areaPath} fill="url(#area-gradient)" />
                          </>
                        );
                      })()}
                    </svg>
                    {/* X Axis */}
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, display: 'flex', justifyContent: 'space-between', fontSize: 9, color: '#64748B', transform: 'translateY(100%)', paddingTop: 8 }}>
                      {chartData7dias.map(d => <span key={d.name}>{d.name}</span>)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Comparativa Programado vs Real */}
              <div style={{ background: '#151B2B', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 16, padding: 24 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 24 }}>Productividad: Programado vs Real</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 13 }}>
                      <span style={{ color: '#94A3B8', display: 'flex', alignItems: 'center', gap: 8 }}><Target style={{ width: 16, height: 16 }} /> Programado</span>
                      <span style={{ fontWeight: 700, color: '#fff' }}>192 hrs</span>
                    </div>
                    <div style={{ height: 16, background: '#1e293b', borderRadius: 999, overflow: 'hidden', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)' }}>
                      <div style={{ height: '100%', background: '#64748B', borderRadius: 999, width: '100%' }} />
                    </div>
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 13 }}>
                      <span style={{ color: '#94A3B8', display: 'flex', alignItems: 'center', gap: 8 }}><TrendingUp style={{ width: 16, height: 16 }} /> Fichado Real</span>
                      <span style={{ fontWeight: 700, color: '#10B981' }}>185 hrs (-7)</span>
                    </div>
                    <div style={{ height: 16, background: '#1e293b', borderRadius: 999, overflow: 'hidden', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)' }}>
                      <div style={{ height: '100%', background: '#10B981', borderRadius: 999, width: '96%' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Presentes ahora */}
              <div style={{ background: '#151B2B', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 16, padding: 24, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>Presentes Ahora</span>
                  <span style={{ background: 'rgba(16,185,129,0.1)', color: '#10B981', fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 6, border: '1px solid rgba(16,185,129,0.2)' }}>
                    {presentEmployees.length}
                  </span>
                </div>
                {presentEmployees.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {presentEmployees.map(({ name, time }) => (
                      <div key={name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: 8 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{ width: 30, height: 30, borderRadius: '50%', background: '#1E273B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Users style={{ width: 13, height: 13, color: '#64748B' }} />
                          </div>
                          <div>
                            <div style={{ fontSize: 12, fontWeight: 600, color: '#e2e8f0' }}>{name}</div>
                            <div style={{ fontSize: 10, color: '#64748B' }}>{time}</div>
                          </div>
                        </div>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 8px rgba(16,185,129,0.5)' }} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B', fontSize: 12, textAlign: 'center' }}>
                    Nadie en turno<br />actualmente.
                  </div>
                )}
              </div>
              </div>
            </div>
          </div>
        </>
        )}

        {activeItem === 'Exportación' && (
           <div style={{ flex: 1, overflowY: 'auto', padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 24, userSelect: 'none' }}>
             
             {/* Header */}
             <div>
               <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                 <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                   <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                 </div>
                 <div style={{ fontSize: 24, fontWeight: 700, color: '#fff' }}>Report Builder</div>
               </div>
               <div style={{ fontSize: 14, color: '#94A3B8', marginTop: 12 }}>Configura tu informe a medida y visualiza los datos en tiempo real antes de exportar.</div>
             </div>

             <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 24 }}>
               
               {/* Left Column (Filters) */}
               <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                 
                 {/* Origen y Filtros */}
                 <div style={{ background: '#151B2B', borderRadius: 12, padding: 24, border: '1px solid rgba(255,255,255,0.05)' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
                     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
                     <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>Origen y Filtros</div>
                   </div>

                   <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                     {[
                       { label: 'ORIGEN DE DATOS', value: 'Registro de Fichajes' },
                       { label: 'PERIODO', value: 'Este Mes' },
                       { label: 'FILTRO DE EQUIPO', value: 'Toda la Organización' },
                       { label: 'FILTRO DE EMPLEADO', value: 'Todos los Empleados' },
                     ].map(f => (
                       <div key={f.label}>
                         <div style={{ fontSize: 11, fontWeight: 600, color: '#64748B', marginBottom: 8, letterSpacing: 0.5 }}>{f.label}</div>
                         <div style={{ background: '#0B0E14', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 8, padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                           <span style={{ fontSize: 13, fontWeight: 600, color: '#e2e8f0' }}>{f.value}</span>
                           <ChevronRight style={{ width: 14, height: 14, color: '#64748B', transform: 'rotate(90deg)' }} />
                         </div>
                       </div>
                     ))}
                   </div>
                 </div>

                 {/* Columnas Visibles */}
                 <div style={{ background: '#151B2B', borderRadius: 12, padding: 24, border: '1px solid rgba(255,255,255,0.05)' }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                     <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                       <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="12" r="2"></circle><rect x="2" y="6" width="20" height="12" rx="2"></rect><line x1="12" y1="6" x2="12" y2="18"></line></svg>
                       <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>Columnas Visibles</div>
                     </div>
                     <div style={{ background: 'rgba(59,130,246,0.1)', color: '#60a5fa', fontSize: 10, fontWeight: 700, padding: '4px 8px', borderRadius: 4 }}>NINGUNA</div>
                   </div>
                   <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', marginBottom: 16 }} />
                   <div style={{ background: 'rgba(19,91,236,0.1)', border: '1px solid rgba(19,91,236,0.3)', borderRadius: 8, padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                     <span style={{ fontSize: 13, fontWeight: 600, color: '#e2e8f0' }}>Tipo</span>
                     <div style={{ width: 18, height: 18, borderRadius: 4, background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                       <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                     </div>
                   </div>
                 </div>

               </div>

               {/* Right Column (Preview) */}
               <div style={{ background: '#151B2B', borderRadius: 12, border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                 
                 {/* Previsualización Header */}
                 <div style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                     <div style={{ width: 40, height: 40, borderRadius: 8, background: '#1E273B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>
                     </div>
                     <div>
                       <div style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>Previsualización de Datos</div>
                       <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>431 registros encontrados</div>
                     </div>
                   </div>
                   <div style={{ display: 'flex', gap: 12 }}>
                     <div style={{ background: '#0B0E14', border: '1px solid rgba(255,255,255,0.05)', color: '#94A3B8', borderRadius: 8, padding: '10px 16px', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                       <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg> CSV
                     </div>
                     <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171', borderRadius: 8, padding: '10px 16px', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                       <FileDown style={{ width: 16, height: 16 }} /> PDF
                     </div>
                     <div style={{ background: '#3b82f6', color: '#fff', borderRadius: 8, padding: '10px 20px', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', boxShadow: '0 4px 12px rgba(59,130,246,0.3)' }}>
                       <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg> Exportar
                     </div>
                   </div>
                 </div>

                 {/* Preview Document Area */}
                 <div style={{ flex: 1, background: '#0B0E14', padding: 32, overflowY: 'auto', display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
                   
                   {/* Page 1 */}
                   <div style={{ width: 300, height: 420, background: '#fff', borderRadius: 4, padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 16, boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
                     {/* Doc Header */}
                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #0f172a', paddingBottom: 12 }}>
                       <div style={{ fontSize: 16, fontWeight: 800, color: '#0f172a', letterSpacing: 1 }}>FYCHEO</div>
                       <div style={{ display: 'flex', gap: 4 }}>
                         <div style={{ width: 16, height: 4, background: '#0f172a' }}></div>
                         <div style={{ width: 8, height: 4, background: '#3b82f6' }}></div>
                       </div>
                     </div>
                     {/* Doc Chart Placeholder */}
                     <div style={{ display: 'flex', justifyContent: 'center', padding: '16px 0', borderBottom: '1px solid #e2e8f0' }}>
                       <div style={{ width: '100%', height: 60, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 8 }}>
                         <div style={{ width: 24, height: 10, background: '#e2e8f0' }}></div>
                         <div style={{ width: 24, height: 50, background: '#10b981' }}></div>
                         <div style={{ width: 24, height: 20, background: '#e2e8f0' }}></div>
                       </div>
                     </div>
                     {/* Doc Table Placeholder */}
                     <div style={{ flex: 1 }}>
                       <div style={{ background: '#0f172a', height: 20, marginBottom: 8 }}></div>
                       {[1,2,3,4,5,6].map(i => (
                         <div key={i} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', padding: '4px 0', opacity: 0.5 }}>
                           <div style={{ width: '20%', height: 6, background: '#0f172a', borderRadius: 2 }}></div>
                           <div style={{ width: '15%', height: 6, background: '#94a3b8', borderRadius: 2 }}></div>
                           <div style={{ width: '15%', height: 6, background: '#94a3b8', borderRadius: 2 }}></div>
                           <div style={{ width: '10%', height: 6, background: '#94a3b8', borderRadius: 2 }}></div>
                         </div>
                       ))}
                     </div>
                   </div>

                   {/* Page 2 */}
                   <div style={{ width: 300, height: 420, background: '#fff', borderRadius: 4, padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 16, boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
                     {/* Doc Table Placeholder */}
                     <div style={{ flex: 1 }}>
                       <div style={{ background: '#0f172a', height: 20, marginBottom: 8 }}></div>
                       {[1,2,3,4,5,6,7,8,9,10,11,12].map(i => (
                         <div key={i} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', padding: '4px 0', opacity: 0.5 }}>
                           <div style={{ width: '20%', height: 6, background: '#0f172a', borderRadius: 2 }}></div>
                           <div style={{ width: '15%', height: 6, background: '#94a3b8', borderRadius: 2 }}></div>
                           <div style={{ width: '15%', height: 6, background: '#94a3b8', borderRadius: 2 }}></div>
                           <div style={{ width: '10%', height: 6, background: '#94a3b8', borderRadius: 2 }}></div>
                         </div>
                       ))}
                     </div>
                   </div>

                 </div>

               </div>

             </div>

           </div>
        )}

        {activeItem === 'Equipos' && (
           <div style={{ flex: 1, overflowY: 'auto', padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 24, userSelect: 'none' }}>
             
             {/* Header */}
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <div>
                 <div style={{ fontSize: 24, fontWeight: 700, color: '#fff' }}>Equipos</div>
                 <div style={{ fontSize: 13, color: '#94A3B8', marginTop: 8 }}>Gestiona la estructura y añade personal</div>
               </div>
               <div style={{ background: '#3b82f6', color: '#fff', padding: '10px 16px', borderRadius: 8, fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                 <span style={{ fontSize: 18, lineHeight: 1 }}>+</span> Nuevo Equipo
               </div>
             </div>

             {/* Toolbar */}
             <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 8 }}>
               <div style={{ width: 44, height: 44, borderRadius: 10, background: '#151B2B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
               </div>
               <div style={{ display: 'flex', gap: 8 }}>
                 {[
                   { label: 'Todos', color: null, active: true },
                   { label: 'Trabajando', color: '#10b981' },
                   { label: 'Ausentes', color: '#94A3B8' },
                   { label: 'Vacaciones', color: '#f59e0b' },
                   { label: 'Bajas', color: '#ef4444' },
                   { label: 'Permisos', color: '#ec4899' },
                 ].map(f => (
                   <div key={f.label} style={{ background: f.active ? '#2A3447' : '#151B2B', color: f.active ? '#fff' : '#94A3B8', padding: '10px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                     {f.color && <div style={{ width: 6, height: 6, borderRadius: '50%', background: f.color }} />}
                     {f.label}
                   </div>
                 ))}
               </div>
             </div>

             {/* Teams List */}
             <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
               {[
                 { name: 'electricidad santander', sub: 'sdfsdfsd', expanded: true },
                 { name: 'Cajas', sub: 'fgdfdfd' },
                 { name: 'Santander-Electricidad', sub: '', hasActions: true },
               ].map(team => (
                 <div key={team.name} style={{ background: '#151B2B', borderRadius: 12, display: 'flex', flexDirection: 'column', border: '1px solid rgba(255,255,255,0.02)' }}>
                   
                   {/* Card Header (Clickable) */}
                   <div style={{ padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                     <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                       <div style={{ width: 56, height: 56, borderRadius: 16, background: 'rgba(19,91,236,0.1)', border: '1px solid rgba(19,91,236,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                         <Users style={{ width: 24, height: 24, color: '#3b82f6' }} />
                       </div>
                       <div>
                         <div style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>{team.name}</div>
                         {team.sub && <div style={{ fontSize: 13, color: '#64748B', marginTop: 4 }}>{team.sub}</div>}
                       </div>
                     </div>
                     <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                       {team.hasActions && (
                         <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginRight: 8, color: '#64748B' }}>
                           <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                           <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                           <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                         </div>
                       )}
                       <div style={{ width: 32, height: 32, borderRadius: 8, background: '#1E273B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                         <ChevronRight style={{ width: 16, height: 16, color: '#94A3B8', transform: team.expanded ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />
                       </div>
                     </div>
                   </div>

                   {/* Expanded Content */}
                   {team.expanded && (
                     <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '0 24px 24px' }}>
                       
                       {/* Tabs */}
                       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                         <div style={{ display: 'flex', gap: 32, marginTop: 16 }}>
                           <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', paddingBottom: 16, borderBottom: '2px solid #3b82f6', marginBottom: -1 }}>
                             Miembros (3)
                           </div>
                           <div style={{ fontSize: 13, fontWeight: 600, color: '#64748B', paddingBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                             Tareas <span style={{ background: '#f59e0b', color: '#000', borderRadius: '50%', width: 16, height: 16, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800 }}>3</span>
                           </div>
                         </div>
                         <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(19,91,236,0.1)', border: '1px solid rgba(19,91,236,0.2)', color: '#3b82f6', padding: '6px 12px', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer', marginBottom: 8 }}>
                           <span style={{ fontSize: 16, lineHeight: 1 }}>+</span> Añadir miembro
                         </div>
                       </div>

                       {/* Members List */}
                       <div style={{ marginTop: 24 }}>
                         <div style={{ fontSize: 11, fontWeight: 700, color: '#fff', letterSpacing: 1, display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                           <ChevronRight style={{ width: 12, height: 12, color: '#64748B' }} /> RESPONSABLES (1)
                         </div>
                         
                         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                           {[
                             { initial: 'E', name: 'Empleado numer...', time: '-356:55h', role: 'Base • Fuera de turno', punt: '0% punt.', puntColor: '#ef4444' },
                             { initial: 'E', name: 'Empleado numer...', time: '-348:55h', role: 'Base • Fuera de turno', punt: '0% punt.', puntColor: '#ef4444' },
                             { initial: 'R', name: 'Ronald Simon C...', time: '+01:22h', role: 'Base • Fuera de turno', punt: '100% punt.', puntColor: '#10b981' },
                           ].map((m, i) => (
                             <div key={i} style={{ background: '#1E273B', borderRadius: 12, padding: '16px', display: 'flex', alignItems: 'center', gap: 16, border: '1px solid rgba(255,255,255,0.02)' }}>
                               <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#2A3447', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: '#94A3B8' }}>
                                 {m.initial}
                               </div>
                               <div style={{ flex: 1 }}>
                                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                   <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{m.name}</div>
                                   <div style={{ fontSize: 11, fontWeight: 600, color: '#e2e8f0' }}>{m.time}</div>
                                 </div>
                                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
                                   <div style={{ fontSize: 11, color: '#64748B' }}>{m.role}</div>
                                   <div style={{ fontSize: 10, fontWeight: 700, color: m.puntColor }}>{m.punt}</div>
                                 </div>
                               </div>
                             </div>
                           ))}
                         </div>
                       </div>
                       
                     </div>
                   )}
                 </div>
               ))}
             </div>

           </div>
        )}

        {activeItem === 'Turnos' && (
           <div style={{ flex: 1, overflowY: 'auto', padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 24, userSelect: 'none' }}>
             
             {/* Header */}
             <div>
               <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                 <div style={{ fontSize: 24, fontWeight: 700, color: '#fff' }}>Gestión de Horarios</div>
                 <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#10B981', fontSize: 10 }}>
                   <CheckCircle2 style={{ width: 12, height: 12 }} />
                   <span>Cambios guardados</span>
                 </div>
               </div>
               <div style={{ fontSize: 13, color: '#94A3B8', marginTop: 8 }}>Organiza los turnos de tu equipo</div>
             </div>

             {/* Toolbar */}
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <div style={{ background: '#1E273B', border: '1px solid #2A3447', borderRadius: 10, padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: 240, fontSize: 13, color: '#e2e8f0' }}>
                 Todos los equipos <ChevronRight style={{ width: 16, height: 16, transform: 'rotate(90deg)', color: '#64748B' }} />
               </div>
               <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', borderRadius: 10, border: '1px solid rgba(59,130,246,0.3)', color: '#60a5fa', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
                 <CalendarOff style={{ width: 16, height: 16 }} />
                 Tiempo Libre
               </div>
             </div>

             {/* Top Grid */}
             <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24 }}>
               
               {/* Left Column */}
               <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                 
                 {/* Date Navigator Card */}
                 <div style={{ background: '#151B2B', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 16, padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                   <ChevronRight style={{ width: 20, height: 20, transform: 'rotate(180deg)', color: '#64748B' }} />
                   <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                     <Calendar style={{ width: 20, height: 20, color: '#3b82f6' }} />
                     <div>
                       <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>Miércoles, 27 De Mayo</div>
                       <div style={{ fontSize: 11, color: '#64748B', marginTop: 4 }}>Horario habitual (07:00 - 21:00) • Sin trabajadores programados</div>
                     </div>
                   </div>
                   <ChevronRight style={{ width: 20, height: 20, color: '#64748B' }} />
                   <div style={{ width: 1, height: 32, background: 'rgba(255,255,255,0.05)', margin: '0 16px' }} />
                   <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#1E273B', border: '1px solid #2A3447', borderRadius: 10, padding: '10px 16px', fontSize: 13, fontWeight: 600, color: '#fff' }}>
                     <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                     Acciones del Día
                     <ChevronRight style={{ width: 14, height: 14, transform: 'rotate(90deg)' }} />
                   </div>
                 </div>

                 {/* Tipos de Jornada Card */}
                 <div style={{ background: '#151B2B', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 16, padding: 24, flex: 1 }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                     <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>Tipos de Jornada</div>
                     <div style={{ fontSize: 12, color: '#64748B' }}>Arrastra para asignar</div>
                   </div>
                   <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                     {[
                       { name: 'Mañana', time: '06:00 - 14:30', h: '8.5h', color: '#ef4444' },
                       { name: 'Tarde', time: '13:00 - 21:30', h: '8.5h', color: '#f97316' },
                       { name: 'Noche', time: '22:00 - 08:00', h: '10h', color: '#a855f7' },
                       { name: 'Partido', time: '10:00 - 13:00', h: '6.8h', color: '#10b981' },
                       { name: 'Refuerzo', time: '12:00 - 16:00', h: '4h', color: '#ec4899' },
                       { name: 'rterer', time: '09:00 - 17:00', h: '8h', color: '#3b82f6' },
                       { name: 'ergeer', time: '09:00 - 17:00', h: '8h', color: '#3b82f6' },
                       { name: 'erer', time: '09:00 - 17:00', h: '8h', color: '#3b82f6' },
                     ].map(t => (
                       <div key={t.name} style={{ background: '#1E273B', border: '1px solid #2A3447', borderRadius: 8, padding: '12px', display: 'flex', gap: 12 }}>
                         <div style={{ width: 4, borderRadius: 4, background: t.color }} />
                         <div>
                           <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{t.name}</div>
                           <div style={{ fontSize: 10, color: '#64748B', marginTop: 4 }}>{t.time} &nbsp; {t.h}</div>
                         </div>
                       </div>
                     ))}
                   </div>
                 </div>

               </div>

               {/* Right Column (Calendar) */}
               <div style={{ background: '#151B2B', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 16, padding: '24px 32px' }}>
                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                   <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>Mayo De 2026</div>
                   <div style={{ display: 'flex', gap: 16 }}>
                     <ChevronRight style={{ width: 14, height: 14, transform: 'rotate(180deg)', color: '#64748B' }} />
                     <ChevronRight style={{ width: 14, height: 14, color: '#64748B' }} />
                   </div>
                 </div>
                 <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '12px 8px', textAlign: 'center' }}>
                   {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map(d => <div key={d} style={{ fontSize: 11, fontWeight: 600, color: '#64748B', marginBottom: 16 }}>{d}</div>)}
                   {/* Blank days */}
                   <div/><div/><div/><div/>
                   {/* Days 1-31 */}
                   {Array.from({ length: 31 }, (_, i) => {
                     const day = i + 1;
                     const isSelected = day === 27;
                     const hasDot = day === 6 || day === 8 || day === 15 || day === 21 || day === 24;
                     let color = '#fff';
                     if (day === 6 || day === 8) color = '#ef4444';
                     else if (day === 15) color = '#f59e0b';
                     else if (day === 21) color = '#10b981';
                     else if (day === 24) color = '#ec4899';
                     return (
                       <div key={day} style={{ 
                         height: 36, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
                         background: isSelected ? 'rgba(19,91,236,0.1)' : 'transparent',
                         border: isSelected ? '1px solid #3b82f6' : '1px solid transparent',
                         borderRadius: '50%',
                         position: 'relative'
                       }}>
                         <span style={{ fontSize: 13, fontWeight: 700, color: isSelected ? '#3b82f6' : '#fff' }}>{day}</span>
                         {hasDot && <div style={{ fontSize: 9, color, position: 'absolute', bottom: -14 }}>2</div>}
                         {!hasDot && day < 28 && !isSelected && <div style={{ fontSize: 9, color: '#64748B', position: 'absolute', bottom: -14 }}>2</div>}
                       </div>
                     );
                   })}
                 </div>
               </div>

             </div>

             {/* Planificación de Turnos Table */}
             <div style={{ background: '#151B2B', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 16, overflow: 'hidden' }}>
               
               {/* Header Toolbar */}
               <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, fontWeight: 700, color: '#fff' }}>
                     <Calendar style={{ width: 18, height: 18, color: '#3b82f6' }} /> Planificación de Turnos
                   </div>
                   <div style={{ display: 'flex', background: 'rgba(255,255,255,0.03)', borderRadius: 6, padding: '6px 12px', gap: 16, marginLeft: 16 }}>
                     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'scaleX(-1)' }}><path d="M3 7v6h6"></path><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"></path></svg>
                     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.3 }}><path d="M21 7v6h-6"></path><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7"></path></svg>
                   </div>
                 </div>
                 <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                   <div style={{ width: 120, height: 4, background: '#1E273B', borderRadius: 2, position: 'relative' }}>
                     <div style={{ width: 12, height: 12, background: '#3b82f6', borderRadius: '50%', position: 'absolute', top: -4, left: '20%' }} />
                   </div>
                   <span style={{ fontSize: 13, fontWeight: 600, color: '#64748B' }}>+ &nbsp;&nbsp;&nbsp; 100%</span>
                 </div>
               </div>

               {/* Timeline Header */}
               <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.05)', background: '#0B0E14' }}>
                 <div style={{ width: 280, padding: '16px 20px', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
                   <div style={{ fontSize: 9, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: 1 }}>Tipo de Día</div>
                   <div style={{ fontSize: 12, fontWeight: 700, color: '#fff', marginTop: 4 }}>DÍA NORMAL</div>
                 </div>
                 <div style={{ flex: 1, display: 'flex' }}>
                   {['06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'].map(t => (
                     <div key={t} style={{ flex: 1, padding: '16px 12px', borderRight: '1px solid rgba(255,255,255,0.05)', fontSize: 10, fontWeight: 600, color: '#e2e8f0', transform: 'rotate(-45deg)', transformOrigin: 'left bottom', whiteSpace: 'nowrap', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start' }}>
                       {t}
                     </div>
                   ))}
                 </div>
               </div>

               {/* Timeline Rows */}
               {[1, 2].map(row => (
                 <div key={row} style={{ display: 'flex', borderBottom: row === 1 ? '1px solid rgba(255,255,255,0.05)' : 'none', height: 80, background: '#0B0E14' }}>
                   <div style={{ width: 280, padding: '0 20px', borderRight: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: 16 }}>
                     <div style={{ display: 'flex', flexDirection: 'column', gap: 4, color: '#64748B' }}>
                       <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'currentColor' }} />
                       <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'currentColor' }} />
                       <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'currentColor' }} />
                     </div>
                     <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#1E273B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                       <Users style={{ width: 18, height: 18, color: '#94A3B8' }} />
                     </div>
                     <div>
                       <div style={{ fontSize: 13, fontWeight: 600, color: '#e2e8f0' }}>Empleado nu...</div>
                       <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>Sin turno</div>
                     </div>
                   </div>
                   <div style={{ flex: 1, display: 'flex' }}>
                     {Array.from({ length: 16 }).map((_, i) => (
                       <div key={i} style={{ flex: 1, borderRight: '1px solid rgba(255,255,255,0.03)' }} />
                     ))}
                   </div>
                 </div>
               ))}
             </div>
             
           </div>
        )}

        {activeItem === 'Ausencias y Bajas' && (
           <div style={{ flex: 1, overflowY: 'auto', padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 24, userSelect: 'none' }}>
             
             {/* Header */}
             <div>
               <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                 <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(19,91,236,0.15)', border: '1px solid rgba(19,91,236,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                   <CalendarOff style={{ width: 22, height: 22, color: '#3b82f6' }} />
                 </div>
                 <div style={{ fontSize: 24, fontWeight: 700, color: '#fff' }}>Gestión de Ausencias y Bajas</div>
               </div>
               <div style={{ fontSize: 14, color: '#94A3B8', marginTop: 12 }}>Revisa y gestiona las solicitudes de tiempo libre y bajas médicas de tu equipo.</div>
             </div>

             {/* Tabs & Filters */}
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: 16, marginTop: 16 }}>
               <div style={{ display: 'flex', gap: 32 }}>
                 <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', position: 'relative', paddingBottom: 16, marginBottom: -17 }}>
                   Permisos Solicitados
                   <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: '#3b82f6' }} />
                 </div>
                 <div style={{ fontSize: 14, fontWeight: 600, color: '#64748B', paddingBottom: 16, marginBottom: -17 }}>
                   Bajas Asignadas
                 </div>
               </div>
               <div style={{ display: 'flex', background: '#151B2B', borderRadius: 8, border: '1px solid rgba(255,255,255,0.05)', padding: 4 }}>
                 <div style={{ padding: '6px 16px', background: '#3b82f6', color: '#fff', borderRadius: 6, fontSize: 12, fontWeight: 600 }}>Pendientes</div>
                 <div style={{ padding: '6px 16px', color: '#64748B', fontSize: 12, fontWeight: 600 }}>Aprobadas</div>
                 <div style={{ padding: '6px 16px', color: '#64748B', fontSize: 12, fontWeight: 600 }}>Denegadas</div>
                 <div style={{ padding: '6px 16px', color: '#64748B', fontSize: 12, fontWeight: 600 }}>Todas</div>
               </div>
             </div>

             {/* Cards Grid */}
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24, marginTop: 16 }}>
               {[1, 2].map(i => (
                 <div key={i} style={{ background: '#151B2B', borderRadius: 12, border: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden', padding: 24 }}>
                   {/* Top Border Indicator */}
                   <div style={{ position: 'absolute', top: 0, left: 24, right: 24, height: 3, background: '#ef4444', borderBottomLeftRadius: 3, borderBottomRightRadius: 3 }} />
                   
                   {/* Card Header */}
                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
                     <div style={{ display: 'flex', gap: 12 }}>
                       <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#1E273B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                         <Users style={{ width: 20, height: 20, color: '#64748B' }} />
                       </div>
                       <div>
                         <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>Empleado<br/>numero 2</div>
                         <div style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444', fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 12, width: 'max-content', marginTop: 8 }}>Ausencia</div>
                       </div>
                     </div>
                     <div style={{ display: 'flex', alignItems: 'center', gap: 4, border: '1px solid rgba(245,158,11,0.3)', color: '#f59e0b', fontSize: 10, fontWeight: 700, padding: '4px 8px', borderRadius: 6, background: 'rgba(245,158,11,0.05)' }}>
                       <Clock style={{ width: 12, height: 12 }} /> PENDIENTE
                     </div>
                   </div>

                   {/* Dates */}
                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
                     <div style={{ display: 'flex', gap: 8 }}>
                       <Calendar style={{ width: 14, height: 14, color: '#3b82f6', marginTop: 16 }} />
                       <div>
                         <div style={{ fontSize: 10, fontWeight: 600, color: '#64748B', textTransform: 'uppercase', marginBottom: 2 }}>Desde</div>
                         <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>25 may<br/>2026</div>
                       </div>
                     </div>
                     <div style={{ display: 'flex', gap: 8 }}>
                       <Calendar style={{ width: 14, height: 14, color: '#3b82f6', marginTop: 16 }} />
                       <div>
                         <div style={{ fontSize: 10, fontWeight: 600, color: '#64748B', textTransform: 'uppercase', marginBottom: 2 }}>Hasta</div>
                         <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>25 may<br/>2026</div>
                       </div>
                     </div>
                   </div>

                   {/* Motivo */}
                   <div style={{ marginBottom: 24 }}>
                     <div style={{ fontSize: 11, color: '#64748B', marginBottom: 8 }}>Motivo</div>
                     <div style={{ background: '#1E273B', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 8, padding: '12px 16px', fontSize: 12, color: '#94A3B8' }}>
                       Asunto familiar urgente
                     </div>
                   </div>

                   {/* Actions */}
                   <div style={{ display: 'flex', gap: 12 }}>
                     <div style={{ flex: 1, background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.2)', color: '#ef4444', borderRadius: 8, padding: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                       <X style={{ width: 14, height: 14 }} /> Denegar
                     </div>
                     <div style={{ flex: 1, background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.2)', color: '#10b981', borderRadius: 8, padding: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Aprobar
                     </div>
                   </div>
                   
                 </div>
               ))}
             </div>

           </div>
        )}

        {activeItem === 'Registro Actividad' && (
           <div style={{ flex: 1, overflowY: 'auto', padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 24, userSelect: 'none' }}>
             
             {/* Header */}
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <div>
                 <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                   <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(59,130,246,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                     <Activity style={{ width: 22, height: 22, color: '#3b82f6' }} />
                   </div>
                   <div style={{ fontSize: 24, fontWeight: 700, color: '#fff' }}>Registro de Actividad</div>
                 </div>
                 <div style={{ fontSize: 14, color: '#94A3B8', marginTop: 12 }}>Auditoría de todos los cambios importantes en los cuadrantes y equipos de la empresa.</div>
               </div>
               
               <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                 <div style={{ display: 'flex', alignItems: 'center', background: '#151B2B', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 8, padding: '10px 16px', width: 260 }}>
                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 8 }}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                   <input type="text" placeholder="Buscar acción o persona..." style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: 13, outline: 'none', width: '100%' }} />
                 </div>
                 <div style={{ width: 40, height: 40, borderRadius: 8, background: '#151B2B', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10"></polyline><polyline points="23 20 23 14 17 14"></polyline><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path></svg>
                 </div>
               </div>
             </div>

             {/* Activity List Container */}
             <div style={{ background: '#151B2B', borderRadius: 12, padding: 32, display: 'flex', flexDirection: 'column', gap: 24, border: '1px solid rgba(255,255,255,0.02)' }}>
               {[
                 { date: '24 may', time: '20:50', type: 'EQUIPO MODIFICADO', typeColor: '#eab308', target: 'Empleado numero 6', detail: 'Movió a Empleado numero 6 al equipo electricidad santander', user: 'Gestro Prueba Uno', initial: 'G' },
                 { date: '24 may', time: '18:00', type: 'AUSENCIA APROBADA', typeColor: '#eab308', detail: 'Aprobó la solicitud de vacaciones de 5 días', user: 'Gestro Prueba Uno', initial: 'G' },
                 { date: '24 may', time: '18:00', type: 'AUSENCIA APROBADA', typeColor: '#eab308', target: 'Laura Gómez', detail: 'Solicitud de vacaciones de 5 días', user: 'Gestro Prueba Uno', initial: 'G' },
                 { date: '24 may', time: '13:00', type: 'EQUIPO MODIFICADO', typeColor: '#eab308', detail: 'Movió a Juan Carlos al equipo de Tardes - Fin de Semana', user: 'Gestro Prueba Uno', initial: 'G' },
               ].map((log, i) => (
                 <div key={i} style={{ display: 'flex', gap: 32, background: '#0B0E14', borderRadius: 12, padding: 24, border: '1px solid rgba(255,255,255,0.03)' }}>
                   
                   {/* Left Date/Time */}
                   <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 60 }}>
                     <div style={{ fontSize: 13, fontWeight: 700, color: '#e2e8f0' }}>{log.date}</div>
                     <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#64748B', fontSize: 11, fontWeight: 600 }}>
                       <Clock style={{ width: 10, height: 10 }} /> {log.time}
                     </div>
                   </div>

                   {/* Main Content */}
                   <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
                     {/* Tags */}
                     <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                       <div style={{ border: `1px solid ${log.typeColor}40`, color: log.typeColor, fontSize: 10, fontWeight: 800, padding: '4px 10px', borderRadius: 12, letterSpacing: 0.5, background: `${log.typeColor}10` }}>
                         {log.type}
                       </div>
                       {log.target && (
                         <div style={{ border: '1px solid rgba(255,255,255,0.1)', color: '#94A3B8', fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 12, background: 'rgba(255,255,255,0.02)' }}>
                           Afectado: <span style={{ color: '#e2e8f0' }}>{log.target}</span>
                         </div>
                       )}
                     </div>
                     
                     {/* Detail */}
                     <div style={{ fontSize: 15, color: '#fff', fontWeight: 600 }}>
                       <span style={{ color: '#64748B', fontWeight: 400, marginRight: 8, fontSize: 13 }}>Detalle:</span>
                       {log.detail}
                     </div>

                     {/* User */}
                     <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                       <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(59,130,246,0.15)', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>
                         {log.initial}
                       </div>
                       <div style={{ fontSize: 12, color: '#64748B', fontWeight: 500 }}>
                         Realizado por <span style={{ color: '#e2e8f0', fontWeight: 600 }}>{log.user}</span>
                       </div>
                     </div>
                   </div>

                 </div>
               ))}
             </div>

           </div>
        )}

        {activeItem === 'Configuración' && (
           <div style={{ flex: 1, overflowY: 'auto', padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 24, userSelect: 'none' }}>
             
             {/* Header */}
             <div>
               <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                 <div style={{ fontSize: 24, fontWeight: 700, color: '#fff' }}>Configuración de Organización</div>
                 <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#10b981', fontSize: 11, fontWeight: 600 }}>
                   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Cambios guardados
                 </div>
               </div>
               <div style={{ fontSize: 14, color: '#94A3B8', marginTop: 8 }}>Gestiona horarios, festivos y reglas generales</div>
             </div>

             {/* Tabs */}
             <div style={{ display: 'flex', gap: 32, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
               {[
                 { label: 'Horario Laboral', icon: <Clock style={{ width: 16, height: 16 }} />, active: true },
                 { label: 'Tipos de Jornada', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg> },
                 { label: 'Festivos y Cierres', icon: <Calendar style={{ width: 16, height: 16 }} /> },
                 { label: 'General', icon: <Settings style={{ width: 16, height: 16 }} /> },
                 { label: 'Tiempo Libre', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"></path><path d="M17 4v20"></path><path d="M7 4v20"></path><path d="M22 22H2"></path></svg> },
                 { label: 'Permisos', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg> }
               ].map(t => (
                 <div key={t.label} style={{ display: 'flex', alignItems: 'center', gap: 8, paddingBottom: 16, borderBottom: t.active ? '2px solid #3b82f6' : '2px solid transparent', color: t.active ? '#3b82f6' : '#94A3B8', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>
                   {t.icon} {t.label}
                 </div>
               ))}
             </div>

             {/* Content Area */}
             <div style={{ background: '#151B2B', borderRadius: 12, border: '1px solid rgba(255,255,255,0.05)', padding: 32 }}>
               
               <div style={{ marginBottom: 24 }}>
                 <div style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>Horario Base Semanal</div>
                 <div style={{ fontSize: 13, color: '#64748B', marginTop: 4 }}>Define los días y horas de apertura habituales de la empresa.</div>
               </div>

               <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                 {[
                   { day: 'Lunes', active: true },
                   { day: 'Martes', active: true },
                   { day: 'Miércoles', active: true },
                   { day: 'Jueves', active: true },
                   { day: 'Viernes', active: true },
                   { day: 'Sábado', active: true },
                   { day: 'Domingo', active: false },
                 ].map(d => (
                   <div key={d.day} style={{ display: 'flex', alignItems: 'center', background: '#0B0E14', borderRadius: 8, padding: '16px 24px', border: '1px solid rgba(255,255,255,0.03)' }}>
                     {/* Checkbox & Day */}
                     <div style={{ display: 'flex', alignItems: 'center', gap: 16, width: 140 }}>
                       <div style={{ width: 18, height: 18, borderRadius: 4, background: d.active ? '#3b82f6' : 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                         {d.active && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                       </div>
                       <div style={{ fontSize: 14, fontWeight: 700, color: d.active ? '#fff' : '#64748B' }}>{d.day}</div>
                     </div>

                     {/* Time Inputs */}
                     {d.active ? (
                       <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                         <div style={{ display: 'flex', alignItems: 'center', background: '#151B2B', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 8, padding: '8px 12px', gap: 12 }}>
                           <span style={{ fontSize: 13, color: '#e2e8f0', fontWeight: 600 }}>07:00</span>
                           <Clock style={{ width: 14, height: 14, color: '#64748B' }} />
                         </div>
                         <div style={{ fontSize: 13, color: '#64748B', fontWeight: 600 }}>a</div>
                         <div style={{ display: 'flex', alignItems: 'center', background: '#151B2B', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 8, padding: '8px 12px', gap: 12 }}>
                           <span style={{ fontSize: 13, color: '#e2e8f0', fontWeight: 600 }}>21:00</span>
                           <Clock style={{ width: 14, height: 14, color: '#64748B' }} />
                         </div>
                       </div>
                     ) : (
                       <div style={{ fontSize: 13, color: '#64748B', fontWeight: 600, padding: '8px 12px' }}>
                         Cerrado
                       </div>
                     )}
                   </div>
                 ))}
               </div>

             </div>

           </div>
        )}

      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// APP DE EMPLEADOS — Fiel al DashboardScreen.tsx real
// Colores del código: bg-primary=#135bec, bg-amber-500, bg-slate-600/700, bg-pink-500
// Fondo: bg-surface-dark rounded-3xl (el timer section)
// ═══════════════════════════════════════════════════════════════════════════════
const AppEmpleadoMockup = () => {
  const todayEntries = [
    { type: 'clock-in', label: 'Trabajando', hora: '08:47', color: '#135bec', icon: 'login', desc: null },
    { type: 'break-start', label: 'Descanso', hora: '11:00', color: '#f59e0b', icon: 'coffee', desc: null },
    { type: 'break-end', label: 'Trabajando', hora: '11:20', color: '#135bec', icon: 'login', desc: null },
  ];

  return (
    <div className="flex items-center justify-center py-4">
      <div className="relative">
        <div className="absolute -inset-4 rounded-full blur-2xl" style={{ background: 'radial-gradient(ellipse, rgba(19,91,236,0.25) 0%, transparent 70%)' }} />

        {/* Cuerpo del teléfono */}
        <div style={{ position: 'relative', border: '12px solid #1e293b', background: '#1e293b', borderRadius: '2.5rem', height: 580, width: 280, boxShadow: '0 25px 60px rgba(0,0,0,0.6)' }}>
          {/* Notch */}
          <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 110, height: 16, background: '#1e293b', borderRadius: '0 0 14px 14px', zIndex: 20 }} />
          {/* Botones laterales */}
          <div style={{ position: 'absolute', left: -15, top: 65, width: 3, height: 30, background: '#1e293b', borderRadius: '3px 0 0 3px' }} />
          <div style={{ position: 'absolute', left: -15, top: 108, width: 3, height: 44, background: '#1e293b', borderRadius: '3px 0 0 3px' }} />
          <div style={{ position: 'absolute', right: -15, top: 130, width: 3, height: 60, background: '#1e293b', borderRadius: '0 3px 3px 0' }} />

          {/* Pantalla — fondo real de la app: bg-background-dark del Fycheo-App */}
          <div style={{ borderRadius: '2rem', overflow: 'hidden', width: '100%', height: '100%', background: '#0f172a', display: 'flex', flexDirection: 'column', fontFamily: 'Inter, sans-serif' }}>

            {/* Status bar */}
            <div style={{ height: 32, background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 20px 0' }}>
              <span style={{ fontSize: 11, color: '#fff', fontWeight: 700 }}>9:41</span>
              <div style={{ width: 20, height: 10, border: '1.5px solid rgba(255,255,255,0.6)', borderRadius: 3, padding: 1 }}>
                <div style={{ width: '80%', height: '100%', background: '#10B981', borderRadius: 2 }} />
              </div>
            </div>

            {/* Header de la app real */}
            <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {/* Logo real de la app */}
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(19,91,236,0.15)', border: '2px solid rgba(19,91,236,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 10, fontWeight: 800, color: '#135bec' }}>F</span>
                </div>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>Fycheo</span>
              </div>
              {/* Avatar del usuario */}
              <div style={{ width: 36, height: 36, borderRadius: '50%', border: '2px solid rgba(19,91,236,0.3)', background: 'rgba(19,91,236,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#135bec' }}>CR</span>
              </div>
            </header>

            {/* Sección de botones rápidos — exacta del código real */}
            <div style={{ padding: '0 16px', flexShrink: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#64748B', letterSpacing: 1 }}>Mar, 27 may</span>
                  <span style={{ fontSize: 10, color: '#64748B', opacity: 0.9 }}>09:41</span>
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <div style={{ padding: '6px 10px', borderRadius: 10, background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.2)', fontSize: 10, color: '#818cf8', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span style={{ fontSize: 12 }}>💬</span> Compañeros (4)
                  </div>
                  <div style={{ padding: '6px 10px', borderRadius: 10, background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.2)', fontSize: 10, color: '#fbbf24', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span style={{ fontSize: 12 }}>✅</span> Tareas (3)
                  </div>
                </div>
              </div>
            </div>

            {/* Timer Section — exacta: bg-surface-dark rounded-3xl */}
            <div style={{ margin: '0 16px', borderRadius: 24, padding: '24px 16px', background: '#1e293b', border: '1px solid rgba(100,116,139,0.2)', display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
              <p style={{ fontSize: 11, color: '#94A3B8', fontWeight: 500, marginBottom: 8 }}>Tiempo en este estado</p>
              <h1 style={{ fontSize: 40, fontWeight: 900, letterSpacing: '-2px', color: '#fff', margin: 0, fontVariantNumeric: 'tabular-nums' }}>04:32:17</h1>
              <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', marginTop: 6, color: '#135bec', marginBottom: 4 }}>TRABAJANDO</p>
              <p style={{ fontSize: 10, color: '#64748B', display: 'flex', alignItems: 'center', gap: 4 }}>
                <span>🏢</span> Fichando en: <strong style={{ color: '#94A3B8' }}>Empresa Demo S.L.</strong>
              </p>
            </div>

            {/* Botones de acción — 2x2 grid exacto del código real */}
            <div style={{ margin: '16px auto', width: 'calc(100% - 32px)', maxWidth: 260, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, flexShrink: 0 }}>
              {/* ENTRADA — bg-primary, opacity-50 cuando no se puede */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '16px 12px', borderRadius: 12, background: '#135bec', opacity: 0.5, cursor: 'not-allowed', boxShadow: '0 8px 24px rgba(19,91,236,0.2)' }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🔑</div>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#fff', letterSpacing: 1 }}>ENTRADA</span>
              </div>
              {/* SALIDA — bg-slate-600, activo */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '16px 12px', borderRadius: 12, background: '#475569', cursor: 'pointer', boxShadow: '0 0 0 4px rgba(148,163,184,0.2)' }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🚪</div>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#fff', letterSpacing: 1 }}>SALIDA</span>
              </div>
              {/* DESCANSO — bg-amber-500, activo */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '16px 12px', borderRadius: 12, background: '#f59e0b', cursor: 'pointer', boxShadow: '0 8px 24px rgba(245,158,11,0.2)' }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>☕</div>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#fff', letterSpacing: 1 }}>DESCANSO</span>
              </div>
              {/* PERMISO — bg-pink-500, activo */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '16px 12px', borderRadius: 12, background: '#ec4899', cursor: 'pointer', boxShadow: '0 8px 24px rgba(236,72,153,0.25)' }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>📝</div>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#fff', letterSpacing: 1 }}>PERMISO</span>
              </div>
            </div>

            {/* Actividad del Día — exacta del código real */}
            <div style={{ flex: 1, padding: '0 16px 16px', overflow: 'hidden' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, padding: '0 4px' }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: 1 }}>Actividad del Día Actual</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#135bec' }}>Actualizar</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {todayEntries.map(({ label, hora, color, desc }, i) => (
                  <div key={i} style={{ background: '#1e293b', border: `1px solid ${color}40`, borderRadius: 12, padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: color }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 11, fontWeight: 600, color: '#fff' }}>{label}</div>
                      {desc && <div style={{ fontSize: 10, color: '#64748B' }}>{desc}</div>}
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8' }}>{hora}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// EXPORT — exacto del Manager (Export.tsx)
// ═══════════════════════════════════════════════════════════════════════════════
const ExportMockup = () => {
  const rows = [
    { nombre: 'María García', tipo: 'Entrada trabajo', fecha: '27/05/2025', hora: '08:03', empresa: 'Demo S.L.' },
    { nombre: 'Carlos Ruiz',  tipo: 'Entrada trabajo', fecha: '27/05/2025', hora: '08:47', empresa: 'Demo S.L.' },
    { nombre: 'Lucía Pérez',  tipo: 'Inicio descanso', fecha: '27/05/2025', hora: '11:00', empresa: 'Demo S.L.' },
    { nombre: 'Lucía Pérez',  tipo: 'Entrada trabajo', fecha: '27/05/2025', hora: '11:20', empresa: 'Demo S.L.' },
    { nombre: 'Javier Torres',tipo: 'Salida trabajo',  fecha: '26/05/2025', hora: '17:05', empresa: 'Demo S.L.' },
  ];

  return (
    <div style={{ background: '#0B0E14', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, overflow: 'hidden', fontFamily: 'Manrope, sans-serif' }}>
      {/* Barra de browser */}
      <div style={{ height: 32, background: '#151B2B', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', padding: '0 16px', gap: 8 }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(239,68,68,0.6)' }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(245,158,11,0.6)' }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(16,185,129,0.6)' }} />
        <div style={{ flex: 1, marginLeft: 16, height: 16, background: 'rgba(255,255,255,0.05)', borderRadius: 999, display: 'flex', alignItems: 'center', padding: '0 12px' }}>
          <span style={{ fontSize: 9, color: '#64748B' }}>manager.fycheo.es / exportacion</span>
        </div>
      </div>

      <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>Exportación de Datos</div>
            <div style={{ fontSize: 12, color: '#64748B', marginTop: 4 }}>Empresa Demo S.L. · 01/05/2025 – 27/05/2025</div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 10, cursor: 'pointer' }}>
              <FileDown style={{ width: 14, height: 14, color: '#f87171' }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: '#f87171' }}>PDF Oficial</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: 10, cursor: 'pointer' }}>
              <FileDown style={{ width: 14, height: 14, color: '#34d399' }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: '#34d399' }}>Excel</span>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div style={{ display: 'flex', gap: 8, padding: 16, background: '#151B2B', borderRadius: 12, border: '1px solid rgba(255,255,255,0.05)', flexWrap: 'wrap' }}>
          {[
            { label: 'Desde', value: '01/05/2025' },
            { label: 'Hasta', value: '27/05/2025' },
            { label: 'Empleado', value: 'Todos' },
            { label: 'Tipo', value: 'Todos los fichajes' },
          ].map(({ label, value }) => (
            <div key={label} style={{ flex: 1, minWidth: 120 }}>
              <div style={{ fontSize: 10, color: '#64748B', marginBottom: 4, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>{label}</div>
              <div style={{ background: '#1E273B', border: '1px solid #2A3447', borderRadius: 8, padding: '8px 12px', fontSize: 12, color: '#fff', display: 'flex', justifyContent: 'space-between' }}>
                {value} <ChevronRight style={{ width: 12, height: 12, color: '#64748B', transform: 'rotate(90deg)' }} />
              </div>
            </div>
          ))}
        </div>

        {/* Tabla de registros — igual que Export.tsx real */}
        <div style={{ background: '#151B2B', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 12, overflow: 'hidden' }}>
          <div style={{ display: 'flex', padding: '10px 16px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            {['Empleado', 'Tipo de registro', 'Fecha', 'Hora', 'Empresa'].map((h, i) => (
              <div key={h} style={{ flex: i === 1 ? 2 : 1, fontSize: 10, color: '#64748B', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>{h}</div>
            ))}
          </div>
          {rows.map((r, i) => (
            <div key={i} style={{ display: 'flex', padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)', alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#1E273B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: '#135bec' }}>
                    {r.nombre.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span style={{ fontSize: 12, color: '#e2e8f0', fontWeight: 500 }}>{r.nombre}</span>
                </div>
              </div>
              <div style={{ flex: 2 }}>
                <span style={{ fontSize: 11, color: '#94A3B8', background: 'rgba(255,255,255,0.04)', padding: '3px 8px', borderRadius: 6 }}>{r.tipo}</span>
              </div>
              <div style={{ flex: 1, fontSize: 12, color: '#94A3B8' }}>{r.fecha}</div>
              <div style={{ flex: 1, fontSize: 12, fontWeight: 700, color: '#135bec' }}>{r.hora}</div>
              <div style={{ flex: 1, fontSize: 11, color: '#64748B' }}>{r.empresa}</div>
            </div>
          ))}
          <div style={{ padding: '10px 16px', display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#64748B', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <span>5 registros · Mostrando mayo 2025</span>
            <span>Total fichajes: <strong style={{ color: '#fff' }}>5</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// MODAL DEMO
// ═══════════════════════════════════════════════════════════════════════════════
const DemoModal = ({ onClose }: { onClose: () => void }) => {
  const [tab, setTab] = useState<'manager' | 'app' | 'exportacion'>('manager');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-black/85 backdrop-blur-md"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', duration: 0.4 }}
          className="relative w-full max-w-6xl rounded-2xl overflow-hidden shadow-2xl"
          style={{ backgroundColor: '#0B0E14', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <div>
              <h2 className="text-white font-bold text-lg" style={{ fontFamily: 'Manrope, sans-serif' }}>Vista previa de Fycheo</h2>
              <p className="text-sm mt-0.5" style={{ color: '#64748B' }}>Exactamente lo que verás al activar tu cuenta</p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
              style={{ background: 'rgba(255,255,255,0.05)', color: '#64748B' }}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 px-6 pt-4">
            {([
              { id: 'manager', label: '🖥️ Panel Manager' },
              { id: 'app', label: '📱 App Empleados' },
              { id: 'exportacion', label: '📥 Exportación' },
            ] as const).map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className="px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                style={{
                  background: tab === id ? '#135bec' : 'transparent',
                  color: tab === id ? '#fff' : '#64748B',
                  fontFamily: 'Manrope, sans-serif',
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Contenido */}
          <div className="p-6">
            <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
              {tab === 'manager' && (
                <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <ScaledPreview nativeWidth={1280} nativeHeight={800}>
                    <ManagerDashboardMockup />
                  </ScaledPreview>
                </div>
              )}
              {tab === 'app' && <AppEmpleadoMockup />}
              {tab === 'exportacion' && (
                <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <ScaledPreview nativeWidth={1024} nativeHeight={700}>
                    <ExportMockup />
                  </ScaledPreview>
                </div>
              )}
            </motion.div>
          </div>

          {/* Footer */}
          <div className="px-6 pb-5 pt-4 flex items-center justify-between" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <p style={{ fontSize: 13, color: '#64748B' }}>14 días gratis · Sin tarjeta de crédito</p>
            <Button onClick={() => window.location.href = '/register'}>
              Crear cuenta gratis <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// HOME
// ═══════════════════════════════════════════════════════════════════════════════
export const Home = () => {
  const [activeTab, setActiveTab] = useState<'manager' | 'app' | 'exportacion'>('manager');
  const [showDemo, setShowDemo] = useState(false);

  return (
    <div className="overflow-hidden">
      {showDemo && <DemoModal onClose={() => setShowDemo(false)} />}

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-24 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full animate-pulse" style={{ background: 'rgba(19,91,236,0.15)', filter: 'blur(100px)' }} />
          <div className="absolute top-40 right-10 w-96 h-96 rounded-full animate-pulse" style={{ background: 'rgba(139,92,246,0.12)', filter: 'blur(120px)', animationDelay: '1s' }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-primary-light text-sm font-semibold mb-6">
                🚀 Control horario moderno para empresas españolas
              </span>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-white leading-tight">
                Gestiona tu equipo{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
                  sin dolores de cabeza
                </span>
              </h1>
              <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                Fichaje inteligente, vacaciones, turnos e informes legales en una plataforma que tus empleados amarán usar. Cumple el RD 8/2019 en minutos.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Button size="lg" className="shadow-glow hover:shadow-glow-lg" onClick={() => window.location.href = '/register'}>
                  Empezar gratis 14 días <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" onClick={() => setShowDemo(true)}>
                  Ver Demo en Vivo <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
                <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />Sin tarjeta de crédito</span>
                <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />Cancelación gratuita</span>
                <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />Soporte en español</span>
              </div>
            </motion.div>
          </div>

          {/* ── Hero: Manager real en browser ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16 relative mx-auto max-w-5xl"
          >
            <div className="absolute -inset-1 rounded-2xl blur opacity-20" style={{ background: 'linear-gradient(to right, #135bec, #7c3aed)' }} />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
              {/* Barra de browser */}
              <div style={{ height: 32, background: '#151B2B', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', padding: '0 16px', gap: 8, flexShrink: 0 }}>
                <div style={{ display: 'flex', gap: 6 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(239,68,68,0.6)' }} />
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(245,158,11,0.6)' }} />
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(16,185,129,0.6)' }} />
                </div>
                <div style={{ flex: 1, marginLeft: 16, height: 16, background: 'rgba(255,255,255,0.05)', borderRadius: 999, display: 'flex', alignItems: 'center', padding: '0 12px' }}>
                  <span style={{ fontSize: 9, color: '#64748B' }}>manager.fycheo.es</span>
                </div>
              </div>
              <div>
                <ScaledPreview nativeWidth={1280} nativeHeight={800}>
                  <ManagerDashboardMockup />
                </ScaledPreview>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-12 border-y border-white/5 bg-surface-dark/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '< 15 min', label: 'Para configurar tu empresa' },
              { value: '100%', label: 'Cumplimiento RD 8/2019' },
              { value: '0 papel', label: 'Todo digital y seguro' },
              { value: '5★', label: 'Valoración de clientes' },
            ].map(({ value, label }) => (
              <div key={label}>
                <div className="text-3xl font-extrabold text-white mb-1">{value}</div>
                <div className="text-sm text-slate-400">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Demo interactiva ── */}
      <section id="demo-section" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-primary-light text-sm font-semibold mb-4">
              Vista previa real
            </span>
            <h2 className="text-4xl font-bold text-white mb-4">Así funciona Fycheo</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Estas son las pantallas reales. Sin renderizados genéricos — exactamente lo que verás al activar tu cuenta.
            </p>
          </div>

          <div className="flex justify-center mb-10">
            <div className="inline-flex rounded-xl p-1 gap-1" style={{ background: '#151B2B', border: '1px solid rgba(255,255,255,0.08)' }}>
              {([
                { id: 'manager', label: '🖥️ Panel Manager', desc: 'Para responsables de RRHH' },
                { id: 'app', label: '📱 App Empleados', desc: 'Lo que ve cada trabajador' },
                { id: 'exportacion', label: '📥 Exportación', desc: 'Informes y cumplimiento' },
              ] as const).map(({ id, label, desc }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className="px-4 py-2.5 rounded-lg text-sm font-semibold transition-all"
                  style={{
                    background: activeTab === id ? '#135bec' : 'transparent',
                    color: activeTab === id ? '#fff' : '#64748B',
                    fontFamily: 'Manrope, sans-serif',
                  }}
                >
                  <div>{label}</div>
                  <div style={{ fontSize: 10, fontWeight: 400, opacity: 0.7, marginTop: 2 }}>{desc}</div>
                </button>
              ))}
            </div>
          </div>

          <motion.div key={activeTab} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            {activeTab === 'manager' && (
              <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)' }}>
                <ScaledPreview nativeWidth={1280} nativeHeight={800}>
                  <ManagerDashboardMockup />
                </ScaledPreview>
              </div>
            )}
            {activeTab === 'app' && <AppEmpleadoMockup />}
            {activeTab === 'exportacion' && (
              <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)' }}>
                <ScaledPreview nativeWidth={1024} nativeHeight={700}>
                  <ExportMockup />
                </ScaledPreview>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── Features Grid ── */}
      <section className="py-24 bg-surface-dark/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Todo lo que necesitas, en un solo lugar</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Deja de usar Excel y múltiples herramientas. Fycheo centraliza toda la gestión de personas.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Clock, color: '#3b82f6', bg: 'rgba(59,130,246,0.1)', title: 'Fichaje desde cualquier lugar', desc: 'Web, app móvil o tablet kiosco. Geolocalización verificada y registros en tiempo real.', href: '/features/time-tracking' },
              { icon: Calendar, color: '#10B981', bg: 'rgba(16,185,129,0.1)', title: 'Vacaciones y ausencias', desc: 'Flujos de aprobación automáticos. Calendario visual con solapamientos de equipo.', href: '/features/vacations' },
              { icon: Users, color: '#a855f7', bg: 'rgba(168,85,247,0.1)', title: 'Portal del empleado', desc: 'App donde cada trabajador gestiona sus datos, documentos y solicitudes.', href: '/features/portal' },
              { icon: FileDown, color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', title: 'Exportación legal', desc: 'PDF oficial para Inspección de Trabajo. Excel y CSV con un clic. 100% conforme RD 8/2019.', href: '/features/reports' },
              { icon: CalendarOff, color: '#ec4899', bg: 'rgba(236,72,153,0.1)', title: 'Ausencias y bajas', desc: 'Gestiona IT, permisos y bajas. Integración con los partes médicos.', href: '/features/vacations' },
              { icon: TrendingUp, color: '#06b6d4', bg: 'rgba(6,182,212,0.1)', title: 'Analítica en tiempo real', desc: 'Dashboards con KPIs, línea temporal de actividad y comparativa programado vs real.', href: '/features/reports' },
            ].map(({ icon: Icon, color, bg, title, desc, href }) => (
              <a key={title} href={href} className="group block rounded-2xl p-6 transition-all hover:-translate-y-0.5" style={{ background: 'rgba(21,27,43,0.5)', border: '1px solid rgba(255,255,255,0.05)' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(19,91,236,0.4)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110" style={{ background: bg }}>
                  <Icon style={{ width: 20, height: 20, color }} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
                <div className="mt-4 flex items-center text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#135bec' }}>
                  Ver más <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Final ── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(19,91,236,0.08) 0%, transparent 70%)' }} />
        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Listo para empezar en{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">15 minutos</span>
          </h2>
          <p className="text-slate-400 text-lg mb-10 leading-relaxed">
            Sin instalaciones, sin complicaciones. Crea tu cuenta, añade a tu equipo y empieza a fichar hoy mismo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="shadow-glow hover:shadow-glow-lg px-10" onClick={() => window.location.href = '/register'}>
              Crear cuenta gratis <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" onClick={() => window.location.href = '/pricing'}>Ver precios</Button>
          </div>
          <p className="mt-6 text-slate-500 text-sm">14 días gratis · Sin tarjeta de crédito · Soporte en español</p>
        </div>
      </section>
    </div>
  );
};

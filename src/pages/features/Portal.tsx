import { motion } from 'framer-motion';
import { Button } from '../../components/ui/Button';
import { Download, MessageSquare, Smartphone, FileText, Bell, ChevronRight, Clock } from 'lucide-react';
import { useState } from 'react';

// ── Mockup app del empleado ──────────────────────────────────────────────────
const PortalAppMockup = () => {
  const [screen, setScreen] = useState<'home' | 'docs' | 'solicitudes'>('home');

  return (
    <div className="flex items-center justify-center py-4">
      <div className="relative">
        <div className="absolute -inset-4 bg-gradient-to-br from-purple-600/30 via-blue-500/20 to-transparent rounded-full blur-2xl" />
        <div className="relative border-[#1e293b] bg-[#1e293b] border-[12px] rounded-[2.5rem] h-[540px] w-[270px] shadow-2xl shadow-black/60">
          <div className="w-[110px] h-[16px] bg-[#1e293b] top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute z-20" />
          <div className="h-[30px] w-[3px] bg-[#1e293b] absolute -left-[15px] top-[65px] rounded-l-lg" />
          <div className="h-[44px] w-[3px] bg-[#1e293b] absolute -left-[15px] top-[108px] rounded-l-lg" />
          <div className="h-[60px] w-[3px] bg-[#1e293b] absolute -right-[15px] top-[130px] rounded-r-lg" />

          <div className="rounded-[2rem] overflow-hidden w-full h-full bg-[#0d1117] flex flex-col">
            {/* Status bar */}
            <div className="h-8 flex items-center justify-between px-5 pt-1 shrink-0">
              <span className="text-[10px] text-white font-semibold">9:41</span>
              <div className="w-5 h-2.5 border border-white/60 rounded-sm p-px">
                <div className="w-4/5 h-full bg-green-400 rounded-sm" />
              </div>
            </div>

            {/* Pantalla activa */}
            <div className="flex-1 overflow-hidden px-4 pb-0 flex flex-col">
              {screen === 'home' && (
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-3 h-full">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[13px] font-bold text-white">Hola, Ana 👋</div>
                      <div className="text-[9px] text-slate-400">Empresa Demo S.L.</div>
                    </div>
                    <div className="relative">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-[11px] font-bold text-white">AM</div>
                      <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center text-[7px] text-white font-bold">2</div>
                    </div>
                  </div>

                  {/* Balance horas */}
                  <div className="bg-[#161d2a] rounded-2xl p-3 border border-white/5">
                    <div className="text-[9px] text-slate-400 mb-1.5 uppercase tracking-wider font-semibold">Balance Mayo 2025</div>
                    <div className="flex justify-between items-end">
                      <div>
                        <div className="text-[18px] font-bold text-white leading-none">88h 30m</div>
                        <div className="text-[9px] text-slate-400 mt-0.5">Trabajadas este mes</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[12px] font-bold text-green-400">+2h 30m</div>
                        <div className="text-[9px] text-slate-500">Horas extra</div>
                      </div>
                    </div>
                    <div className="mt-2.5 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-purple-500 to-blue-400 rounded-full" style={{ width: '55%' }} />
                    </div>
                    <div className="flex justify-between mt-1 text-[8px] text-slate-600">
                      <span>0h</span><span>160h objetivo</span>
                    </div>
                  </div>

                  {/* Accesos rápidos */}
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { icon: Download, label: 'Mis nóminas', badge: 0, color: 'text-purple-400', bg: 'bg-purple-500/15', screen: 'docs' as const },
                      { icon: MessageSquare, label: 'Solicitudes', badge: 1, color: 'text-blue-400', bg: 'bg-blue-500/15', screen: 'solicitudes' as const },
                      { icon: Clock, label: 'Mis fichajes', badge: 0, color: 'text-green-400', bg: 'bg-green-500/15', screen: 'home' as const },
                      { icon: Bell, label: 'Avisos', badge: 1, color: 'text-amber-400', bg: 'bg-amber-500/15', screen: 'home' as const },
                    ].map(({ icon: Icon, label, badge, color, bg, screen: s }) => (
                      <button
                        key={label}
                        onClick={() => s !== 'home' ? setScreen(s) : null}
                        className="bg-[#161d2a] rounded-xl p-3 border border-white/5 flex flex-col items-center gap-1.5 hover:border-white/10 transition-colors"
                      >
                        <div className={`w-9 h-9 ${bg} rounded-xl flex items-center justify-center relative`}>
                          <Icon className={`w-4 h-4 ${color}`} />
                          {badge > 0 && (
                            <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full flex items-center justify-center text-[7px] text-white font-bold">{badge}</div>
                          )}
                        </div>
                        <span className="text-[9px] text-slate-300 font-medium text-center leading-tight">{label}</span>
                      </button>
                    ))}
                  </div>

                  {/* Notificación reciente */}
                  <div className="bg-[#161d2a] rounded-xl p-3 border border-white/5 flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Bell className="w-3 h-3 text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-semibold text-white leading-tight">Nómina de mayo disponible</div>
                      <div className="text-[9px] text-slate-500 mt-0.5">Hace 2 horas</div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0 mt-0.5" />
                  </div>
                </motion.div>
              )}

              {screen === 'docs' && (
                <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-3 h-full">
                  <div className="flex items-center gap-2">
                    <button onClick={() => setScreen('home')} className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center">
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 rotate-180" />
                    </button>
                    <div className="text-[12px] font-bold text-white">Mis documentos</div>
                  </div>
                  <div className="space-y-2">
                    {[
                      { nombre: 'Nómina Mayo 2025', tipo: 'PDF', fecha: '01/06/2025', nuevo: true },
                      { nombre: 'Nómina Abril 2025', tipo: 'PDF', fecha: '01/05/2025', nuevo: false },
                      { nombre: 'Contrato laboral', tipo: 'PDF', fecha: '15/01/2024', nuevo: false },
                      { nombre: 'Política vacaciones', tipo: 'PDF', fecha: '01/01/2025', nuevo: false },
                    ].map(({ nombre, tipo, fecha, nuevo }) => (
                      <div key={nombre} className="bg-[#161d2a] rounded-xl p-3 border border-white/5 flex items-center gap-2">
                        <div className="w-8 h-8 bg-red-500/15 rounded-lg flex items-center justify-center shrink-0">
                          <FileText className="w-3.5 h-3.5 text-red-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[10px] font-medium text-white truncate">{nombre}</div>
                          <div className="text-[8px] text-slate-500">{tipo} · {fecha}</div>
                        </div>
                        {nuevo && <span className="text-[7px] bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded-full font-bold shrink-0">NUEVO</span>}
                        <Download className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {screen === 'solicitudes' && (
                <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-3 h-full">
                  <div className="flex items-center gap-2">
                    <button onClick={() => setScreen('home')} className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center">
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 rotate-180" />
                    </button>
                    <div className="text-[12px] font-bold text-white">Mis solicitudes</div>
                  </div>
                  <div className="space-y-2">
                    {[
                      { tipo: 'Vacaciones', fechas: '14–18 Jul', estado: 'Aprobada', color: 'text-green-400', bg: 'bg-green-500/15' },
                      { tipo: 'Teletrabajo', fechas: '1–2 Jun', estado: 'Pendiente', color: 'text-amber-400', bg: 'bg-amber-500/15' },
                      { tipo: 'Vacaciones', fechas: '23–27 Dic', estado: 'Pendiente', color: 'text-amber-400', bg: 'bg-amber-500/15' },
                    ].map(({ tipo, fechas, estado, color, bg }) => (
                      <div key={fechas} className="bg-[#161d2a] rounded-xl p-3 border border-white/5">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="text-[10px] font-semibold text-white">{tipo}</div>
                            <div className="text-[9px] text-slate-400 mt-0.5">{fechas}</div>
                          </div>
                          <span className={`text-[9px] ${bg} ${color} px-2 py-0.5 rounded-full font-semibold`}>{estado}</span>
                        </div>
                      </div>
                    ))}
                    <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl text-[11px] font-bold text-white">
                      + Nueva solicitud
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Navegación inferior */}
            <div className="h-14 border-t border-white/5 bg-[#0d1117] flex items-center justify-around px-4 shrink-0">
              {[
                { icon: Clock, label: 'Fichaje', active: false },
                { icon: Download, label: 'Docs', active: screen === 'docs' },
                { icon: MessageSquare, label: 'Solicitudes', active: screen === 'solicitudes' },
                { icon: Bell, label: 'Perfil', active: false },
              ].map(({ icon: Icon, label, active }) => (
                <div key={label} className={`flex flex-col items-center gap-0.5 ${active ? 'text-blue-400' : 'text-slate-500'}`}>
                  <Icon className="w-4 h-4" />
                  <span className="text-[8px] font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Portal = () => {
  return (
    <div className="pt-24 pb-20">
      {/* Hero Feature */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-sm font-medium mb-6">
              <Smartphone className="w-4 h-4 mr-2" />
              Portal del Empleado
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              Empodera a tu equipo con su propio{' '}
              <span className="text-primary">espacio digital</span>
            </h1>
            <p className="text-lg text-slate-400 mb-8 leading-relaxed">
              Cada empleado tiene su propio portal donde consultar nóminas, hacer solicitudes y ver su balance de horas. Reduce el 80% de las consultas a RRHH.
            </p>

            <div className="space-y-4 mb-10">
              {[
                { icon: Download, title: 'Nóminas siempre disponibles', desc: 'El empleado descarga sus nóminas al instante. Sin emails, sin esperas.', color: 'text-purple-400', bg: 'bg-purple-500/10' },
                { icon: MessageSquare, title: 'Solicitudes desde el móvil', desc: 'Vacaciones, teletrabajo o permisos. El responsable las aprueba con un clic.', color: 'text-blue-400', bg: 'bg-blue-500/10' },
                { icon: Bell, title: 'Notificaciones push', desc: 'Avisos de empresa, aprobaciones y recordatorios en tiempo real.', color: 'text-amber-400', bg: 'bg-amber-500/10' },
                { icon: FileText, title: 'Documentos de empresa', desc: 'Contratos, políticas y comunicados en un repositorio privado y seguro.', color: 'text-green-400', bg: 'bg-green-500/10' },
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

            <p className="text-xs text-slate-500 mb-6 italic">💡 Toca "Docs" o "Solicitudes" en la app de abajo para explorar las pantallas</p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={() => window.location.href = '/register'}>Empezar ahora</Button>
              <Button variant="outline" size="lg" onClick={() => window.location.href = '/pricing'}>Ver planes</Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <PortalAppMockup />
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-surface-dark/50">
        <div className="max-w-2xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-white mb-4">Tu equipo te lo agradecerá</h2>
          <p className="text-slate-400 mb-8">Menos llamadas, menos emails, más tiempo para lo que importa.</p>
          <Button size="lg" className="shadow-glow" onClick={() => window.location.href = '/register'}>
            Empezar gratis 14 días
          </Button>
        </div>
      </section>
    </div>
  );
};

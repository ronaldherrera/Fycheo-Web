import { motion } from 'framer-motion';
import { Button } from '../../components/ui/Button';
import { CheckCircle2, Clock, MapPin, Smartphone, Shield, Zap } from 'lucide-react';

const AppFichajeDemo = () => (
  <div className="flex items-center justify-center py-8">
    <div className="relative">
      {/* Efecto de brillo detrás del teléfono */}
      <div className="absolute -inset-4 bg-gradient-to-br from-primary/30 via-purple-600/20 to-transparent rounded-full blur-2xl" />
      
      {/* Cuerpo del teléfono */}
      <div className="relative border-[#1e293b] bg-[#1e293b] border-[12px] rounded-[2.5rem] h-[520px] w-[260px] shadow-2xl shadow-black/60">
        {/* Notch */}
        <div className="w-[110px] h-[16px] bg-[#1e293b] top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute z-20" />
        {/* Botones laterales */}
        <div className="h-[30px] w-[3px] bg-[#1e293b] absolute -left-[15px] top-[65px] rounded-l-lg" />
        <div className="h-[44px] w-[3px] bg-[#1e293b] absolute -left-[15px] top-[108px] rounded-l-lg" />
        <div className="h-[60px] w-[3px] bg-[#1e293b] absolute -right-[15px] top-[130px] rounded-r-lg" />

        {/* Pantalla */}
        <div className="rounded-[2rem] overflow-hidden w-full h-full bg-[#0d1117] flex flex-col">
          {/* Status bar */}
          <div className="h-8 bg-[#0d1117] flex items-center justify-between px-5 shrink-0 pt-1">
            <span className="text-[10px] text-white font-semibold">9:41</span>
            <div className="flex gap-1.5 items-center">
              <svg className="w-3 h-2.5" viewBox="0 0 16 10" fill="none">
                <rect x="0" y="4" width="3" height="6" rx="0.5" fill="white" fillOpacity="0.4"/>
                <rect x="4" y="2" width="3" height="8" rx="0.5" fill="white" fillOpacity="0.6"/>
                <rect x="8" y="0" width="3" height="10" rx="0.5" fill="white" fillOpacity="0.8"/>
                <rect x="12" y="0" width="3" height="10" rx="0.5" fill="white"/>
              </svg>
              <div className="w-5 h-2.5 border border-white/60 rounded-sm p-px">
                <div className="w-4/5 h-full bg-green-400 rounded-sm" />
              </div>
            </div>
          </div>

          {/* Contenido app */}
          <div className="flex-1 px-4 pb-4 overflow-hidden flex flex-col gap-3">
            {/* Header */}
            <div className="flex items-center justify-between mt-1">
              <div>
                <div className="text-[13px] font-bold text-white">Buenos días, Carlos 👋</div>
                <div className="text-[10px] text-slate-400">Martes, 27 de mayo</div>
              </div>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-[11px] font-bold text-white">CR</div>
            </div>

            {/* Card estado actual */}
            <div className="bg-[#161d2a] rounded-2xl p-4 border border-white/5">
              <div className="flex items-center justify-between mb-3">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Estado actual</div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[10px] text-green-400 font-semibold">Activo</span>
                </div>
              </div>
              <div className="text-[22px] font-bold text-white leading-none mb-1">08:47</div>
              <div className="text-[10px] text-slate-400">Entrada registrada</div>
              
              <div className="mt-3 space-y-1">
                <div className="flex justify-between text-[9px] text-slate-500">
                  <span>Horas trabajadas hoy</span>
                  <span className="text-white font-semibold">04h 32m</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-[57%] bg-gradient-to-r from-blue-500 to-green-400 rounded-full" />
                </div>
                <div className="flex justify-between text-[9px] text-slate-600">
                  <span>0h</span>
                  <span>8h objetivo</span>
                </div>
              </div>
            </div>

            {/* Geolocalización */}
            <div className="bg-[#161d2a] rounded-xl px-3 py-2.5 border border-white/5 flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-green-500/20 flex items-center justify-center shrink-0">
                <MapPin className="w-3.5 h-3.5 text-green-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] text-white font-medium truncate">Calle Gran Vía, 45 — Madrid</div>
                <div className="text-[9px] text-slate-500">Ubicación verificada ✓</div>
              </div>
            </div>

            {/* Botón principal */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl text-white text-[12px] font-bold shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
            >
              <Clock className="w-4 h-4" />
              Registrar Salida
            </motion.button>

            {/* Historial del día */}
            <div className="bg-[#161d2a] rounded-2xl p-3 border border-white/5 flex-1">
              <div className="text-[9px] font-semibold text-slate-400 mb-2.5 uppercase tracking-wider">Registro de hoy</div>
              <div className="space-y-2.5">
                {[
                  { tipo: 'Entrada al trabajo', hora: '08:47', icono: '🟢', color: 'text-green-400' },
                  { tipo: 'Inicio pausa almuerzo', hora: '13:00', icono: '🟡', color: 'text-amber-400' },
                  { tipo: 'Fin pausa almuerzo', hora: '14:03', icono: '🔵', color: 'text-blue-400' },
                ].map(({ tipo, hora, icono, color }) => (
                  <div key={tipo} className="flex items-center gap-2">
                    <span className="text-xs shrink-0">{icono}</span>
                    <span className="text-[9px] text-slate-300 flex-1 leading-tight">{tipo}</span>
                    <span className={`text-[9px] font-semibold ${color}`}>{hora}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const TimeTracking = () => {
  return (
    <div className="pt-24 pb-20">
      {/* Hero Feature */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-6">
              <Clock className="w-4 h-4 mr-2" />
              Control Horario
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              Fichaje preciso,{' '}
              <span className="text-primary">desde cualquier lugar</span>
            </h1>
            <p className="text-lg text-slate-400 mb-8 leading-relaxed">
              Tu equipo ficha desde el móvil, la web o un kiosco tablet en segundos. Todo queda registrado con geolocalización verificada y sincronizado en tiempo real en el panel del manager.
            </p>

            <div className="space-y-4 mb-10">
              {[
                { icon: Smartphone, title: 'App iOS y Android', desc: 'Disponible para todos los dispositivos. Sin coste adicional.' },
                { icon: MapPin, title: 'Geolocalización GPS', desc: 'Verifica la ubicación exacta de cada fichaje automáticamente.' },
                { icon: Shield, title: 'Conforme al RD 8/2019', desc: 'Registro de jornada legalmente válido para inspección de trabajo.' },
                { icon: Zap, title: 'Tiempo real', desc: 'Los responsables ven el estado del equipo al instante en el Manager.' },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">{title}</div>
                    <div className="text-slate-400 text-sm">{desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={() => window.location.href = '/register'}>
                Empezar ahora
              </Button>
              <Button variant="outline" size="lg" onClick={() => window.location.href = '/pricing'}>
                Ver planes
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <AppFichajeDemo />
          </motion.div>
        </div>
      </section>

      {/* Cómo funciona paso a paso */}
      <section className="py-20 bg-surface-dark/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-white mb-4">¿Cómo funciona el fichaje?</h2>
            <p className="text-slate-400 max-w-xl mx-auto">Tres pasos. Sin formación previa. Tus empleados lo entienden solos.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                num: '01', icon: Smartphone, color: 'text-blue-400', bg: 'bg-blue-500/10',
                title: 'El empleado abre la app',
                desc: 'Desde el móvil, tablet o navegador web. Accede con su usuario y contraseña personal en 5 segundos.',
              },
              {
                num: '02', icon: Clock, color: 'text-green-400', bg: 'bg-green-500/10',
                title: 'Registra su fichaje',
                desc: 'Pulsa "Entrar" o "Salir" con un solo toque. La hora, ubicación y usuario quedan registrados automáticamente.',
              },
              {
                num: '03', icon: CheckCircle2, color: 'text-purple-400', bg: 'bg-purple-500/10',
                title: 'El manager lo ve al instante',
                desc: 'El panel del responsable se actualiza en tiempo real. Alertas automáticas por retrasos o ausencias.',
              },
            ].map(({ num, icon: Icon, color, bg, title, desc }) => (
              <div key={num} className="relative">
                <div className="text-6xl font-black text-white/3 absolute -top-4 -left-2 leading-none">{num}</div>
                <div className="relative p-6">
                  <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                  <p className="text-slate-400">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-2xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-white mb-4">¿Listo para digitalizar el fichaje?</h2>
          <p className="text-slate-400 mb-8">Configura tu empresa en menos de 15 minutos. Sin instalaciones ni hardware especial.</p>
          <Button size="lg" className="shadow-glow" onClick={() => window.location.href = '/register'}>
            Empezar gratis 14 días
          </Button>
        </div>
      </section>
    </div>
  );
};

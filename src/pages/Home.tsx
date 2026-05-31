import { CheckCircle2, Users, Calendar, LayoutDashboard, Smartphone, Bell, ChevronDown, Check, ShieldCheck, XCircle, MessageSquare, AlertTriangle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ManagerDashboardMockup, AppEmpleadoMockup, DemoModal, ScaledPreview } from '../components/Mockups';

const faqs = [
  { q: "¿Es obligatorio el control horario en España?", a: "Sí, desde mayo de 2019 el Estatuto de los Trabajadores (RD-ley 8/2019) obliga a todas las empresas a registrar la jornada laboral de sus empleados diariamente." },
  { q: "¿Fycheo cumple con la ley de control horario?", a: "Absolutamente. Fycheo está diseñado específicamente para cumplir con la normativa laboral española, generando los informes oficiales que requiere la Inspección de Trabajo en un clic." },
  { q: "¿Qué pasa si un empleado se olvida de fichar?", a: "El empleado puede solicitar una corrección de fichaje desde su app, que llegará al mánager para su aprobación con un solo clic. Todo queda auditado." },
  { q: "¿Se puede fichar desde el teléfono móvil?", a: "Sí, los empleados disponen de una app nativa para iOS y Android desde la que pueden fichar, pedir vacaciones y revisar sus turnos." },
  { q: "¿Ofrecéis fichaje por geolocalización?", a: "Sí, puedes configurar la geolocalización obligatoria al fichar, e incluso definir áreas geográficas válidas (Geofencing)." },
  { q: "¿Cómo se gestionan los turnos rotativos?", a: "Nuestro planificador avanzado te permite crear patrones de turnos y asignarlos masivamente en segundos, evitando solapamientos y excesos de jornada." },
  { q: "¿Puedo importar mis datos desde Excel?", a: "Sí, contamos con un importador masivo que te permite cargar toda tu plantilla, calendarios y saldos de vacaciones en minutos." },
  { q: "¿Los empleados pueden ver cuántos días de vacaciones les quedan?", a: "Sí, desde la app móvil cada empleado tiene acceso a su saldo actualizado de vacaciones, evitando cientos de preguntas a Recursos Humanos." },
  { q: "¿Cómo funciona la aprobación de ausencias?", a: "Cuando un empleado solicita una ausencia (vacaciones, baja, permiso), los responsables reciben una notificación y pueden aprobarla o denegarla al instante. El calendario general se actualiza automáticamente." },
  { q: "¿Puedo tener diferentes horarios para diferentes equipos?", a: "Por supuesto. Puedes crear ilimitados perfiles de horario y asignarlos a diferentes centros de trabajo, departamentos o empleados individuales." },
  { q: "¿Fycheo se integra con mi programa de nóminas (A3, Sage, etc.)?", a: "Nuestros reportes son exportables a Excel y CSV en el formato estándar compatible con el 99% del software de gestión laboral del mercado." },
  { q: "¿Qué pasa si me quedo sin internet?", a: "Nuestra app de fichaje cuenta con modo offline. Los empleados pueden fichar sin conexión y los datos se sincronizarán automáticamente al recuperar la señal." },
  { q: "¿Cómo se gestionan las horas extras?", a: "El sistema calcula automáticamente las horas extraordinarias cruzando el horario teórico con los fichajes reales, mostrando el saldo a favor o en contra." },
  { q: "¿Puedo usar una tablet como punto de fichaje en la pared?", a: "Sí, ofrecemos un modo 'Kiosco' que convierte cualquier tablet (iPad o Android) en un reloj de fichar seguro mediante PIN de empleado." },
  { q: "¿Qué nivel de soporte ofrecéis?", a: "Ofrecemos soporte técnico en español por email y chat para todos los planes, y un Key Account Manager dedicado para planes Enterprise." },
  { q: "¿Tengo que firmar permanencia?", a: "No, en nuestros planes mensuales puedes cancelar cuando quieras sin penalización. También ofrecemos planes anuales con descuentos si prefieres comprometerte a largo plazo." },
  { q: "¿Están seguros mis datos?", a: "Utilizamos infraestructura cloud de grado bancario (AWS), encriptación de extremo a extremo y cumplimos rigurosamente con la RGPD europea." },
  { q: "¿Hay un límite de empleados?", a: "Fycheo escala con tu negocio. Tenemos planes desde 5 empleados hasta grandes corporaciones con miles de trabajadores en múltiples países." },
  { q: "¿Cuánto se tarda en implementar el software?", a: "A diferencia de otros ERPs pesados, una empresa promedio configura todo y empieza a usar Fycheo en menos de 24 horas." },
  { q: "¿Puedo probarlo antes de pagar?", a: "Sí, te ofrecemos 14 días de prueba totalmente gratis y sin necesidad de introducir tu tarjeta de crédito." }
];

export const Home = () => {
  const [showDemo, setShowDemo] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Generate FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <div className="overflow-hidden bg-[#0B0E14] text-white">
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>

      {showDemo && <DemoModal onClose={() => setShowDemo(false)} />}

      {/* ── SECCIÓN 1: HERO ── */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full animate-pulse" style={{ background: 'rgba(19,91,236,0.15)', filter: 'blur(100px)' }} />
          <div className="absolute top-40 right-10 w-96 h-96 rounded-full animate-pulse" style={{ background: 'rgba(139,92,246,0.12)', filter: 'blur(120px)', animationDelay: '1s' }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-white leading-tight">
                Planifica horarios y gestiona equipos{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
                  en minutos.
                </span>
              </h1>
              <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                Crea cuadrantes, gestiona vacaciones, controla ausencias y mantén a todo tu equipo sincronizado desde una única plataforma.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Button size="lg" className="shadow-glow hover:shadow-glow-lg" onClick={() => window.location.href = '/register'}>
                  Solicitar demo
                </Button>
                <Button variant="outline" size="lg" onClick={() => setShowDemo(true)}>
                  Prueba gratuita
                </Button>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16 relative mx-auto max-w-5xl"
          >
            <div className="absolute -inset-1 rounded-2xl blur opacity-20" style={{ background: 'linear-gradient(to right, #135bec, #7c3aed)' }} />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="h-8 bg-[#151B2B] border-b border-white/5 flex items-center px-4 gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
              <ScaledPreview nativeWidth={1280} nativeHeight={800}>
                <ManagerDashboardMockup />
              </ScaledPreview>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SECCIÓN 2: PROBLEMA ── */}
      <section className="py-24 bg-[#0B0E14] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-white mb-6">Gestionar equipos no debería ser un caos.</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {[
                { title: 'Excel desactualizado', desc: 'Cuadrantes que se rompen, versiones diferentes y fórmulas que nadie entiende.', icon: XCircle, color: 'text-red-400' },
                { title: 'Cambios por WhatsApp', desc: 'Mensajes perdidos, turnos solapados y comunicación no oficial que causa fricción.', icon: XCircle, color: 'text-red-400' },
                { title: 'Errores en vacaciones', desc: 'Saldos incorrectos, falta de personal en días clave y dolores de cabeza en RRHH.', icon: XCircle, color: 'text-red-400' },
                { title: 'Falta de comunicación', desc: 'Empleados que no saben su turno hasta el último minuto, generando frustración.', icon: XCircle, color: 'text-red-400' }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-xl bg-red-950/20 border border-red-900/30">
                  <item.icon className={`w-6 h-6 flex-shrink-0 ${item.color}`} />
                  <div>
                    <h3 className="font-bold text-white mb-1">{item.title}</h3>
                    <p className="text-slate-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="relative h-full min-h-[500px]">
               <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-orange-600/20 blur-3xl rounded-full" />
               <div className="relative bg-[#151B2B] rounded-2xl border border-red-500/20 p-6 shadow-2xl h-full flex flex-col overflow-hidden">
                  
                  {/* Título de contexto */}
                  <div className="flex items-center gap-3 mb-4 relative z-40">
                     <span className="bg-red-500/20 text-red-400 text-xs font-bold px-3 py-1 rounded-full border border-red-500/30 animate-pulse">
                        EL PASADO
                     </span>
                     <h3 className="text-xl font-bold text-slate-300">Herramientas desconectadas</h3>
                  </div>
                  
                  {/* Contenedor del caos absoluto */}
                  <div className="relative flex-1 w-full mt-4">
                     
                     {/* 1. EXCEL SECUNDARIO (Fondo) */}
                     <motion.div 
                       animate={{ rotate: [-2, 0, -2] }} 
                       transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                       className="absolute top-2 left-4 w-56 bg-slate-100 rounded-lg shadow-xl overflow-hidden border border-slate-300 z-0 opacity-60 filter blur-[1px]"
                     >
                       <div className="bg-green-800 p-2 text-white text-[10px] font-bold">Cuadrante_V8_ESTESI_FINAL.xlsx</div>
                       <div className="h-20 bg-white grid grid-cols-4 gap-px bg-slate-300 border-t border-slate-300">
                         {[...Array(12)].map((_, i) => <div key={i} className="bg-white"></div>)}
                       </div>
                     </motion.div>

                     {/* 8. SLACK NOTIFICATION */}
                     <motion.div 
                       animate={{ x: [-5, 5, -5], y: [0, -5, 0], opacity: [0, 1, 1, 0], scale: [0.9, 1, 1, 0.9] }} 
                       transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", times: [0, 0.1, 0.8, 1] }}
                       className="absolute top-8 right-2 w-52 bg-[#3F0E40] text-white rounded-lg shadow-2xl overflow-hidden border border-slate-600 z-40 p-2 flex gap-2"
                     >
                       <div className="w-8 h-8 rounded bg-white p-1 flex-shrink-0 flex items-center justify-center">
                         <MessageSquare className="w-5 h-5 text-[#3F0E40]" />
                       </div>
                       <div>
                         <p className="text-[10px] font-bold">#general-tienda</p>
                         <p className="text-[9px] text-slate-300 leading-tight">"¿Alguien sabe si mañana abrimos festivo? No encuentro el Excel."</p>
                       </div>
                     </motion.div>

                     {/* 2. EMAIL URGENTE */}
                     <motion.div 
                       animate={{ rotate: [2, -2, 2], x: [0, 5, 0], opacity: [0, 0, 1, 1, 0], scale: [0.9, 0.9, 1, 1, 0.9] }} 
                       transition={{ repeat: Infinity, duration: 8, ease: "easeInOut", times: [0, 0.4, 0.5, 0.9, 1] }}
                       className="absolute top-20 right-6 w-60 bg-white rounded-lg shadow-2xl overflow-hidden border border-slate-300 z-10"
                     >
                       <div className="bg-slate-100 p-2 border-b border-slate-200 flex justify-between items-center">
                         <span className="text-slate-600 text-[10px] font-bold">Nuevo Mensaje</span>
                         <div className="flex gap-1"><div className="w-2 h-2 rounded-full bg-red-400"/><div className="w-2 h-2 rounded-full bg-yellow-400"/></div>
                       </div>
                       <div className="p-2 border-b border-slate-100">
                         <p className="text-slate-800 text-[10px] font-bold">Asunto: Fwd: RE: URGENTE Bajas</p>
                         <p className="text-slate-500 text-[9px]">De: RRHH</p>
                       </div>
                       <div className="p-3 bg-red-50 text-red-800 text-[9px] leading-relaxed">
                         "Hay un error en las nóminas, las horas extra de este mes no cuadran con el Excel de tienda. Por favor revisad manualmente los 45 empleados."
                       </div>
                     </motion.div>

                     {/* 3. EXCEL PRINCIPAL */}
                     <motion.div 
                       animate={{ rotate: [-1, 1, -1], y: [0, -5, 0] }} 
                       transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }}
                       className="absolute top-32 left-6 w-64 bg-slate-100 rounded-lg shadow-2xl overflow-hidden border border-slate-300 z-20"
                     >
                       <div className="bg-green-700 p-2 flex items-center gap-2">
                         <div className="w-4 h-4 bg-white rounded-sm flex items-center justify-center text-[10px] text-green-700 font-bold">X</div>
                         <span className="text-white text-xs font-semibold truncate">Cuadrante_Semana3.xlsx</span>
                       </div>
                       <div className="bg-slate-200 flex text-[9px] text-slate-500 border-b border-slate-300">
                         <div className="w-6 border-r border-slate-300 p-1 text-center"></div>
                         <div className="flex-1 border-r border-slate-300 p-1 text-center font-bold">A</div>
                         <div className="flex-1 border-r border-slate-300 p-1 text-center font-bold">B</div>
                         <div className="flex-1 p-1 text-center font-bold">C</div>
                       </div>
                       <div className="bg-white">
                         {[1,2,3,4].map(row => (
                           <div key={row} className="flex text-[9px] border-b border-slate-200">
                             <div className="w-6 bg-slate-200 border-r border-slate-300 p-1 text-center text-slate-500">{row}</div>
                             <div className="flex-1 border-r border-slate-200 p-1 text-slate-700">{row===2?'Ana':row===4?'Luis':'Juan'}</div>
                             <div className={`flex-1 border-r border-slate-200 p-1 ${row%2===0 ? 'bg-red-100 text-red-600 font-bold' : 'text-slate-700'}`}>{row%2===0 ? '#¡REF!' : 'Mañana'}</div>
                             <div className="flex-1 p-1 text-slate-700">Tarde</div>
                           </div>
                         ))}
                       </div>
                     </motion.div>

                     {/* 9. ERROR POPUP WINDOWS */}
                     <motion.div 
                       animate={{ scale: [0.8, 1, 1, 0.8], rotate: [0, 2, 0], opacity: [0, 1, 1, 0] }} 
                       transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 2, times: [0, 0.1, 0.8, 1] }}
                       className="absolute top-1/2 left-10 w-52 bg-slate-100 rounded shadow-2xl border border-slate-400 z-50 flex flex-col"
                       style={{ boxShadow: '10px 10px 30px rgba(0,0,0,0.5)' }}
                     >
                       <div className="bg-blue-800 text-white px-2 py-1 flex justify-between items-center text-[10px] font-bold">
                         <span>Error Crítico</span>
                         <div className="w-3 h-3 bg-red-500 flex items-center justify-center rounded-sm">x</div>
                       </div>
                       <div className="p-3 flex gap-2 items-center">
                         <AlertTriangle className="w-6 h-6 text-yellow-500 flex-shrink-0" />
                         <p className="text-slate-800 text-[9px] font-medium leading-tight">El archivo "Vacaciones_V12_Final.xlsx" está corrupto o no se puede abrir.</p>
                       </div>
                       <div className="p-2 border-t border-slate-300 flex justify-end">
                         <div className="bg-slate-300 px-3 py-1 text-[9px] rounded shadow-sm border border-slate-400 cursor-pointer text-slate-800 hover:bg-slate-400">Aceptar</div>
                       </div>
                     </motion.div>

                     {/* 4. POST-IT 2 (Superpuesto en Excel) */}
                     <motion.div 
                       animate={{ rotate: [-8, -12, -8], opacity: [0, 0, 1, 1, 0] }} 
                       transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", times: [0, 0.2, 0.3, 0.8, 1] }}
                       className="absolute top-28 left-2 w-28 bg-pink-200 shadow-xl border border-pink-300 z-30 p-2"
                     >
                       <p className="text-pink-900 text-[10px] font-handwriting leading-tight" style={{ fontFamily: 'cursive' }}>
                         Llamar a gestoría!! Multa por registro horario 😱
                       </p>
                     </motion.div>

                     {/* 11. CALENDARIO ROTO */}
                     <motion.div 
                       animate={{ rotate: [5, 3, 5], y: [-2, 2, -2], opacity: [1, 1, 0, 0, 1] }} 
                       transition={{ repeat: Infinity, duration: 9, ease: "easeInOut", times: [0, 0.3, 0.4, 0.8, 1] }}
                       className="absolute -bottom-4 right-1/4 w-32 bg-white rounded shadow-xl border border-slate-300 z-10 overflow-hidden"
                     >
                       <div className="bg-red-600 text-white text-center text-[10px] font-bold py-1">AGOSTO</div>
                       <div className="grid grid-cols-7 gap-px bg-slate-200 p-1">
                         {[...Array(31)].map((_, i) => (
                           <div key={i} className="bg-white h-4 text-center text-[6px] text-slate-500 flex items-center justify-center relative">
                             {i+1}
                             {i > 10 && i < 25 && <div className="absolute w-[120%] border-t border-red-500 transform rotate-45 origin-center"></div>}
                             {i === 15 && <div className="absolute w-full h-full border border-blue-500 rounded-full"></div>}
                           </div>
                         ))}
                       </div>
                       <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                         <div className="text-red-600 font-black text-xl transform -rotate-12 border-4 border-red-600 rounded p-1 bg-white/80">NO CUADRA</div>
                       </div>
                     </motion.div>

                     {/* 10. MANCHAS DE CAFÉ */}
                     <div className="absolute bottom-10 left-1/3 w-16 h-16 rounded-full border-[3px] border-[#8B4513] opacity-20 z-0 transform -rotate-12 scale-110 blur-[1px]"></div>
                     <div className="absolute bottom-12 left-1/3 w-12 h-12 rounded-full border-[2px] border-[#8B4513] opacity-10 z-0 transform -rotate-6 ml-2 blur-[0.5px]"></div>

                     {/* 5. WHATSAPP */}
                     <motion.div 
                       animate={{ y: [-5, 5, -5], rotate: [1, -1, 1], opacity: [0, 1, 1, 0, 0] }} 
                       transition={{ repeat: Infinity, duration: 8, ease: "easeInOut", times: [0, 0.1, 0.6, 0.7, 1] }}
                       className="absolute bottom-6 right-2 w-60 bg-[#e5ddd5] rounded-xl shadow-2xl overflow-hidden border border-slate-300 z-40"
                     >
                       <div className="bg-[#075E54] p-3 flex justify-between items-center">
                         <div className="flex items-center gap-2">
                           <div className="w-6 h-6 bg-slate-300 rounded-full flex items-center justify-center overflow-hidden">
                             <Users className="w-4 h-4 text-slate-500" />
                           </div>
                           <div>
                             <span className="text-white text-xs font-semibold block leading-tight">Grupo Trabajo (12)</span>
                             <span className="text-green-200 text-[8px]">Tú, Ana, Luis, Carlos...</span>
                           </div>
                         </div>
                       </div>
                       <div className="p-3 flex flex-col gap-2 h-36 overflow-hidden">
                         <div className="bg-white p-2 rounded-lg rounded-tl-none self-start max-w-[85%] shadow-sm relative">
                           <span className="text-[#35CD96] text-[9px] font-bold block mb-0.5">+34 600 123 456</span>
                           <p className="text-slate-700 text-[10px] leading-snug">Chicos, quién me cambia el turno de mañana? Es urgente 🙏</p>
                           <p className="text-slate-400 text-[8px] text-right mt-0.5">08:15</p>
                         </div>
                         <div className="bg-[#dcf8c6] p-2 rounded-lg rounded-tr-none self-end max-w-[85%] shadow-sm relative">
                           <p className="text-slate-700 text-[10px] leading-snug">Yo no puedo, estoy de vacaciones creo 🤔</p>
                           <p className="text-[#4fc3f7] text-[8px] text-right mt-0.5 font-bold">08:20 ✓✓</p>
                         </div>
                         <div className="bg-white p-2 rounded-lg rounded-tl-none self-start max-w-[85%] shadow-sm relative">
                           <span className="text-[#E01E5A] text-[9px] font-bold block mb-0.5">Carlos</span>
                           <p className="text-slate-700 text-[10px] leading-snug">A mí no me han pagado las horas extra del mes pasado!! 😡</p>
                         </div>
                       </div>
                     </motion.div>

                     {/* 6. POST-IT 1 */}
                     <motion.div 
                       animate={{ rotate: [3, -3, 3], scale: [1, 1.05, 1], opacity: [0, 1, 1, 0, 0] }} 
                       transition={{ repeat: Infinity, duration: 8, ease: "easeInOut", delay: 1, times: [0, 0.1, 0.5, 0.6, 1] }}
                       className="absolute bottom-20 left-6 w-36 bg-yellow-200 shadow-2xl border border-yellow-300 z-50 flex flex-col p-3"
                       style={{ boxShadow: '5px 10px 20px rgba(0,0,0,0.3)' }}
                     >
                       <div className="w-10 h-3 bg-yellow-400/50 mx-auto -mt-4 mb-2 rotate-2 opacity-80" />
                       <p className="text-slate-800 text-xs font-handwriting leading-tight transform -rotate-2" style={{ fontFamily: '"Comic Sans MS", cursive, sans-serif' }}>
                         Revisar Excel... ¿Laura estaba del 15 o del 18? Me va a matar 😭
                       </p>
                     </motion.div>

                     {/* 7. ALERTA FLOTANTE (Badge) */}
                     <motion.div 
                       animate={{ y: [0, -10, 0], scale: [1, 1.1, 1] }} 
                       transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                       className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-red-600 text-white font-black text-xl px-4 py-2 rounded-full shadow-2xl border-4 border-[#151B2B] z-50 flex items-center gap-2"
                     >
                       <Bell className="w-5 h-5 animate-wiggle" />
                       99+
                     </motion.div>

                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECCIÓN 3: SOLUCIÓN ── */}
      <section className="py-24 bg-[#0F1420]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-white mb-6">Todo tu equipo conectado.</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Una solución integral diseñada para aportar valor a cada nivel de tu organización.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#151B2B] p-8 rounded-2xl border border-white/5 hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-6">
                <LayoutDashboard className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Managers</h3>
              <ul className="space-y-3">
                <li className="flex items-start text-sm text-slate-400"><Check className="w-4 h-4 text-green-500 mr-2 mt-0.5" /> Ahorra 10+ horas semanales en planificación.</li>
                <li className="flex items-start text-sm text-slate-400"><Check className="w-4 h-4 text-green-500 mr-2 mt-0.5" /> Cero errores o solapamientos.</li>
                <li className="flex items-start text-sm text-slate-400"><Check className="w-4 h-4 text-green-500 mr-2 mt-0.5" /> Visibilidad en tiempo real de la asistencia.</li>
              </ul>
            </div>

            <div className="bg-[#151B2B] p-8 rounded-2xl border border-white/5 hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-6">
                <Smartphone className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Empleados</h3>
              <ul className="space-y-3">
                <li className="flex items-start text-sm text-slate-400"><Check className="w-4 h-4 text-green-500 mr-2 mt-0.5" /> Horarios siempre accesibles y actualizados.</li>
                <li className="flex items-start text-sm text-slate-400"><Check className="w-4 h-4 text-green-500 mr-2 mt-0.5" /> Autonomía para pedir vacaciones y cambios.</li>
                <li className="flex items-start text-sm text-slate-400"><Check className="w-4 h-4 text-green-500 mr-2 mt-0.5" /> Transparencia total sobre sus horas extra.</li>
              </ul>
            </div>

            <div className="bg-[#151B2B] p-8 rounded-2xl border border-white/5 hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Empresa</h3>
              <ul className="space-y-3">
                <li className="flex items-start text-sm text-slate-400"><Check className="w-4 h-4 text-green-500 mr-2 mt-0.5" /> Cumplimiento legal garantizado (RD 8/2019).</li>
                <li className="flex items-start text-sm text-slate-400"><Check className="w-4 h-4 text-green-500 mr-2 mt-0.5" /> Reducción drástica del absentismo y retrasos.</li>
                <li className="flex items-start text-sm text-slate-400"><Check className="w-4 h-4 text-green-500 mr-2 mt-0.5" /> Exportación directa a tu sistema de nóminas.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECCIÓN 4: FUNCIONALIDADES ── */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-white mb-6">Todo lo que necesitas para tu día a día.</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            <div>
              <h3 className="text-3xl font-bold text-white mb-4">Horarios y Turnos</h3>
              <p className="text-slate-400 text-lg mb-6 leading-relaxed">
                Asigna turnos, crea cuadrantes rotativos y asegúrate de tener la cobertura adecuada en cada momento sin romper reglas legales.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex text-slate-300"><CheckCircle2 className="text-primary w-5 h-5 mr-3 flex-shrink-0" /> Plantillas de turnos guardadas.</li>
                <li className="flex text-slate-300"><CheckCircle2 className="text-primary w-5 h-5 mr-3 flex-shrink-0" /> Copiar y pegar semanas enteras.</li>
                <li className="flex text-slate-300"><CheckCircle2 className="text-primary w-5 h-5 mr-3 flex-shrink-0" /> Alertas por exceso de horas.</li>
              </ul>
            </div>
            <div className="bg-[#151B2B] rounded-2xl border border-white/10 p-2 shadow-2xl overflow-hidden h-[400px]">
                <ScaledPreview nativeWidth={800} containerHeight={400}>
                   {/* Here we would render a mocked Turnos view or AppEmpleadoMockup based on context, for now we reuse AppEmpleado */}
                   <div className="w-full flex justify-center mt-[-40px] transform scale-75">
                      <AppEmpleadoMockup />
                   </div>
                </ScaledPreview>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center flex-col-reverse lg:flex-row-reverse">
             <div className="bg-[#151B2B] rounded-2xl border border-white/10 p-4 shadow-2xl overflow-hidden h-[400px] flex items-center justify-center">
                 {/* Visual para Vacaciones */}
                 <div className="text-slate-500 flex flex-col items-center gap-4">
                    <Calendar className="w-16 h-16 opacity-50" />
                    <span className="font-semibold text-lg">Visual de Vacaciones</span>
                    <span className="text-sm">(Captura de módulo de vacaciones)</span>
                 </div>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white mb-4">Vacaciones y Ausencias</h3>
              <p className="text-slate-400 text-lg mb-6 leading-relaxed">
                Di adiós al cruce de emails y papeles en la oficina. Aprueba vacaciones con un clic sabiendo quién más falta esos días.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex text-slate-300"><CheckCircle2 className="text-primary w-5 h-5 mr-3 flex-shrink-0" /> Saldos de días calculados automáticamente.</li>
                <li className="flex text-slate-300"><CheckCircle2 className="text-primary w-5 h-5 mr-3 flex-shrink-0" /> Notificaciones push para responsables.</li>
                <li className="flex text-slate-300"><CheckCircle2 className="text-primary w-5 h-5 mr-3 flex-shrink-0" /> Registro de bajas médicas (IT) y adjuntos.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECCIÓN 5: BENEFICIOS ── */}
      <section className="py-24 bg-[#0F1420]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-white mb-6">Resultados reales para tu negocio.</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-[#151B2B] rounded-2xl border border-white/5">
              <div className="text-4xl font-black text-primary mb-2">-40%</div>
              <h3 className="font-bold text-white mb-2">Ausentismo</h3>
              <p className="text-sm text-slate-400">La visibilidad reduce los retrasos y el absentismo no planificado.</p>
            </div>
            <div className="p-6 bg-[#151B2B] rounded-2xl border border-white/5">
              <div className="text-4xl font-black text-green-500 mb-2">+15h</div>
              <h3 className="font-bold text-white mb-2">Ahorro semanal</h3>
              <p className="text-sm text-slate-400">Tiempo que los mánagers recuperan al no tener que gestionar cuadrantes manuales.</p>
            </div>
            <div className="p-6 bg-[#151B2B] rounded-2xl border border-white/5">
              <div className="text-4xl font-black text-purple-500 mb-2">100%</div>
              <h3 className="font-bold text-white mb-2">Cumplimiento Legal</h3>
              <p className="text-sm text-slate-400">Sin miedo a inspecciones, con todos los registros guardados durante 4 años.</p>
            </div>
            <div className="p-6 bg-[#151B2B] rounded-2xl border border-white/5">
              <div className="text-4xl font-black text-yellow-500 mb-2">-90%</div>
              <h3 className="font-bold text-white mb-2">Consultas de RRHH</h3>
              <p className="text-sm text-slate-400">El empleado es autónomo para revisar sus nóminas, turnos y vacaciones.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECCIÓN 6: COMPARATIVA ── */}
      <section className="py-24 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-white mb-6">El salto evolutivo que tu empresa necesita.</h2>
          </div>
          
          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#151B2B]">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="p-6 text-slate-400 font-semibold w-1/4">Característica</th>
                  <th className="p-6 text-slate-400 font-semibold w-1/4 text-center">Excel</th>
                  <th className="p-6 text-slate-400 font-semibold w-1/4 text-center">WhatsApp</th>
                  <th className="p-6 bg-primary/10 text-primary font-bold w-1/4 text-center rounded-tr-2xl border-b-2 border-primary">Fycheo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  ['Centralización de datos', false, false, true],
                  ['Aprobación de vacaciones', false, false, true],
                  ['Cálculo automático de saldos', true, false, true],
                  ['Fichaje geolocalizado', false, false, true],
                  ['Informes legales automáticos', false, false, true],
                  ['Notificaciones instantáneas', false, true, true],
                  ['Evita solapamientos de turnos', false, false, true],
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-6 text-sm font-medium text-slate-300">{row[0]}</td>
                    <td className="p-6 text-center">{row[1] ? <Check className="w-5 h-5 mx-auto text-slate-500" /> : <XCircle className="w-5 h-5 mx-auto text-red-900/50" />}</td>
                    <td className="p-6 text-center">{row[2] ? <Check className="w-5 h-5 mx-auto text-slate-500" /> : <XCircle className="w-5 h-5 mx-auto text-red-900/50" />}</td>
                    <td className="p-6 bg-primary/5 text-center"><CheckCircle2 className="w-5 h-5 mx-auto text-primary" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── SECCIÓN 7: TESTIMONIOS ── */}
      <section className="py-24 bg-[#0F1420]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-white mb-6">Empresas que ya confían en nosotros.</h2>
            <p className="text-slate-400">Miles de empleados utilizan Fycheo a diario.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
             {[
              {
                text: "Desde que usamos Fycheo, organizar los turnos del restaurante ha dejado de ser un drama. El equipo está más contento porque sabe cuándo trabaja con semanas de antelación.",
                author: "Carlos T.",
                role: "Manager en Grupo Restauración",
                initials: "CT",
                color: "bg-blue-900 text-blue-200"
              },
              {
                text: "El dolor de cabeza de cruzar Excels con las vacaciones del equipo desapareció por completo. Y si hay Inspección, descargo el reporte legal en un clic.",
                author: "Laura M.",
                role: "Directora de RRHH",
                initials: "LM",
                color: "bg-purple-900 text-purple-200"
              },
              {
                text: "A los técnicos les encanta fichar con el móvil y GPS cuando llegan a la obra. Ya no tenemos que perseguir a nadie a final de mes para cerrar nóminas.",
                author: "David R.",
                role: "CEO en Empresa Constructora",
                initials: "DR",
                color: "bg-green-900 text-green-200"
              }
            ].map((testimonial, i) => (
                <div key={i} className="bg-[#151B2B] p-8 rounded-2xl border border-white/5 flex flex-col h-full">
                  <div className="flex text-yellow-500 mb-4">★★★★★</div>
                  <p className="text-slate-300 italic mb-8 flex-1">"{testimonial.text}"</p>
                  <div className="flex items-center gap-4 mt-auto">
                     <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${testimonial.color}`}>{testimonial.initials}</div>
                     <div>
                        <div className="text-white font-bold text-sm">{testimonial.author}</div>
                        <div className="text-slate-500 text-xs">{testimonial.role}</div>
                     </div>
                  </div>
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* ── SECCIÓN 8: FAQ SEO ── */}
      <section className="py-24 relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-white mb-4">Preguntas frecuentes</h2>
          <p className="text-slate-400">Resolvemos todas tus dudas sobre control horario y la plataforma.</p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-white/10 bg-[#151B2B] rounded-xl overflow-hidden transition-all duration-200">
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <span className="font-semibold text-slate-200 text-sm md:text-base">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform duration-200 flex-shrink-0 ${openFaq === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-6 pb-5 pt-2 text-slate-400 text-sm leading-relaxed border-t border-white/5">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECCIÓN 9: CTA FINAL ── */}
      <section className="py-32 relative overflow-hidden bg-primary">
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{ background: 'radial-gradient(circle at center, white 0%, transparent 70%)' }} />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Empieza a gestionar equipos de forma inteligente.
          </h2>
          <p className="text-blue-100 text-xl mb-12 max-w-2xl mx-auto">
            Únete a las empresas que ya han automatizado su gestión de personal. Configuración en minutos.
          </p>
          <Button size="lg" className="bg-white text-primary hover:bg-slate-50 text-lg px-12 py-6 h-auto shadow-2xl rounded-2xl font-bold" onClick={() => window.location.href = '/register'}>
            Solicitar demo
          </Button>
          <p className="mt-8 text-blue-200 text-sm">Sin compromiso · Configuración gratuita</p>
        </div>
      </section>
    </div>
  );
};

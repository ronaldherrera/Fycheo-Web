import { CheckCircle2, ChevronDown, XCircle, MessageSquare, FileText, Shield, ListTodo, ArrowRight, UploadCloud, FolderOpen, Mail, AlertTriangle, Building2, Smartphone, Clock } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { DemoModal } from '../components/Mockups';
import { ImagePlaceholder } from '../components/ui/ImagePlaceholder';
import { SEOHead } from '../components/SEOHead';
import { cn } from '../lib/utils';


const faqs = [
  { q: "¿Es obligatorio el control horario en España?", a: "Sí, desde mayo de 2019 el Estatuto de los Trabajadores (RD-ley 8/2019) obliga a todas las empresas a registrar la jornada laboral de sus empleados diariamente." },
  { q: "¿Fycheo cumple con la ley de control horario?", a: "Absolutamente. Fycheo está diseñado específicamente para cumplir con la normativa laboral española, generando los informes oficiales que requiere la Inspección de Trabajo en un clic." },
  { q: "¿Qué pasa si un empleado se olvida de fichar?", a: "El empleado puede solicitar una corrección de fichaje desde su app, que llegará al mánager para su aprobación con un solo clic. Todo queda auditado." },
  { q: "¿Se puede fichar desde el teléfono móvil?", a: "Sí, los empleados disponen de una app nativa para iOS y Android desde la que pueden fichar, pedir vacaciones y revisar sus turnos." },
  { q: "¿Ofrecéis fichaje por geolocalización?", a: "Sí, puedes configurar la geolocalización obligatoria al fichar, e incluso definir áreas geográficas válidas (Geofencing)." },
  { q: "¿Puedo usar una tablet como punto de fichaje en la pared?", a: "Sí, ofrecemos un modo 'Kiosko' que convierte cualquier tablet (iPad o Android) en un reloj de fichar seguro mediante el DNI del empleado." },
  { q: "¿Tengo que firmar permanencia?", a: "No, en nuestros planes mensuales puedes cancelar cuando quieras sin penalización. También ofrecemos planes anuales con descuentos si prefieres comprometerte a largo plazo." },
  { q: "¿Puedo probarlo antes de pagar?", a: "Sí, te ofrecemos 14 días de prueba totalmente gratis y sin necesidad de introducir tu tarjeta de crédito." }
];

// ==========================================
// SIMULACIONES INTERACTIVAS PARA LA HOME
// ==========================================

const NominasSimulation = () => {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => {
        if (prev === 0) return 1;
        if (prev === 1) return 2;
        return 0;
      });
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (step === 1) {
      setProgress(0);
      const progInterval = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            clearInterval(progInterval);
            return 100;
          }
          return p + 10;
        });
      }, 200);
      return () => clearInterval(progInterval);
    }
  }, [step]);

  return (
    <div className="w-full h-64 bg-[#111625] rounded-xl border border-white/10 p-6 flex flex-col justify-between relative overflow-hidden">
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
        </div>
        <span className="text-[10px] text-slate-500 font-mono">BulkNominas v2.1</span>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center my-4">
        {step === 0 && (
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center justify-center border-2 border-dashed border-primary/30 rounded-lg p-5 w-full cursor-pointer hover:bg-primary/5 transition-colors"
          >
            <UploadCloud className="w-8 h-8 text-primary-light mb-2 animate-bounce" />
            <p className="text-xs text-white font-semibold">Arrastra aquí el PDF de la gestoría</p>
            <p className="text-[10px] text-slate-500 mt-1">nominas_junio.pdf (4.2 MB)</p>
          </motion.div>
        )}

        {step === 1 && (
          <div className="w-full space-y-3">
            <div className="flex justify-between items-center text-xs text-slate-300">
              <span>Procesando PDF masivo...</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-primary h-full transition-all duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-[10px] text-slate-500 italic text-center animate-pulse">Separando páginas e identificando empleados por DNI...</p>
          </div>
        )}

        {step === 2 && (
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center space-y-2 w-full"
          >
            <div className="w-10 h-10 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-2">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
            </div>
            <h4 className="text-xs font-bold text-white">¡Nóminas distribuidas con éxito!</h4>
            <p className="text-[10px] text-slate-400 max-w-[280px] mx-auto">Se han asignado 12 nóminas automáticamente y se ha notificado a la plantilla.</p>
          </motion.div>
        )}
      </div>

      <div className="flex justify-between items-center text-[9px] text-slate-500 border-t border-white/5 pt-2">
        <span>Historial de subidas</span>
        <span className="text-green-400 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-400" /> Sistema listo</span>
      </div>
    </div>
  );
};

const ContratosSimulation = () => {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => {
        if (prev === 0) return 1;
        if (prev === 1) return 2;
        return 0;
      });
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (step === 1) {
      setProgress(0);
      const progInterval = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            clearInterval(progInterval);
            return 100;
          }
          return p + 20;
        });
      }, 200);
      return () => clearInterval(progInterval);
    }
  }, [step]);

  return (
    <div className="w-full h-64 bg-[#111625] rounded-xl border border-white/10 p-6 flex flex-col justify-between relative overflow-hidden">
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <div className="flex items-center space-x-2">
          <FolderOpen className="w-4 h-4 text-primary-light" />
          <span className="text-xs font-bold text-slate-300">Expediente: Ana Martínez</span>
        </div>
        <span className="bg-primary/20 text-primary-light text-[9px] px-2 py-0.5 rounded-full border border-primary/20">Activo</span>
      </div>

      <div className="flex-1 my-4 flex flex-col justify-center">
        {step === 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2 text-xs"
          >
            <p className="text-[9px] text-slate-500 font-semibold uppercase tracking-wider">Documentos del empleado</p>
            <div className="bg-slate-850 p-2.5 rounded border border-white/5 flex items-center justify-between">
              <span className="text-slate-300">DNI_Anverso.jpg</span>
              <span className="text-green-400 text-[10px]">✓ Guardado</span>
            </div>
            <div className="bg-slate-850 p-2.5 rounded border border-white/5 flex items-center justify-between">
              <span className="text-slate-400">Contrato_Trabajo_2026.pdf</span>
              <span className="text-red-400 text-[10px] animate-pulse">● Pendiente subir</span>
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-slate-900/60 p-4 rounded-lg border border-primary/20 space-y-3"
          >
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-white">Subir a Expediente</span>
              <span className="text-[9px] text-slate-400">Formato PDF</span>
            </div>
            <p className="text-[10px] text-slate-400 leading-normal">
              Subiendo documento: Contrato_Trabajo_2026.pdf
            </p>
            <div className="h-10 bg-slate-800 rounded border border-dashed border-slate-700 flex flex-col justify-center px-4 relative overflow-hidden">
              <div className="flex justify-between text-[9px] text-slate-400 mb-1 z-10">
                <span>Subiendo...</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-slate-700 h-1 rounded-full overflow-hidden z-10">
                <div className="bg-primary h-full transition-all duration-200" style={{ width: `${progress}%` }} />
              </div>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-slate-850 p-3.5 rounded border border-green-500/20 space-y-2"
          >
            <div className="flex items-center space-x-2 text-xs font-bold text-green-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Documento guardado con éxito</span>
            </div>
            <div className="text-[9px] text-slate-400 space-y-1">
              <p>• Archivo: Contrato_Trabajo_2026.pdf (1.4 MB)</p>
              <p>• Estado: Guardado en la nube y accesible para mánager</p>
              <p>• Cumplimiento: Cifrado RGPD</p>
            </div>
          </motion.div>
        )}
      </div>

      <div className="text-[9px] text-slate-500 flex justify-between items-center border-t border-white/5 pt-2">
        <span>Gestor Documental (Cifrado AES)</span>
        <span className="text-slate-400">100% seguro</span>
      </div>
    </div>
  );
};

const ChatSimulation = () => {
  const [messages, setMessages] = useState<Array<{ sender: string; text: string; time: string; self: boolean }>>([]);
  const [isTyping, setIsTyping] = useState(false);

  const script = [
    { sender: 'María (Mánager)', text: '¡Hola equipo! Acabo de subir los turnos de la semana al panel.', time: '17:45', self: false, wait: 1000 },
    { sender: 'Tú', text: '¡Hola María! Ya los he revisado. Todo correcto.', time: '17:46', self: true, wait: 2500 },
    { sender: 'Dani (Soporte)', text: 'Perfecto. Fichado y de camino a casa. ¡Buen fin de semana!', time: '17:47', self: false, wait: 3500 }
  ];

  useEffect(() => {
    let timer: any;
    let messageIndex = 0;

    const runScript = () => {
      if (messageIndex < script.length) {
        setIsTyping(true);
        timer = setTimeout(() => {
          setIsTyping(false);
          setMessages((prev) => [...prev, script[messageIndex]]);
          messageIndex++;
          if (messageIndex < script.length) {
            timer = setTimeout(runScript, script[messageIndex].wait);
          } else {
            timer = setTimeout(() => {
              setMessages([]);
              messageIndex = 0;
              runScript();
            }, 6000);
          }
        }, 1500);
      }
    };

    runScript();

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-64 bg-[#111625] rounded-xl border border-white/10 p-4 flex flex-col justify-between relative overflow-hidden">
      <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <div className="w-7 h-7 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-[10px] font-bold text-primary-light">
              FY
            </div>
            <div className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-green-500 border border-[#111625]" />
          </div>
          <div>
            <h4 className="text-[10px] font-bold text-white leading-tight">Canal General</h4>
            <p className="text-[8px] text-slate-500">12 empleados conectados</p>
          </div>
        </div>
        <MessageSquare className="w-4 h-4 text-slate-400" />
      </div>

      <div className="flex-1 my-3 overflow-y-auto space-y-2 flex flex-col justify-end text-[9px] pr-1">
        {messages.map((msg, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className={`max-w-[80%] rounded-lg p-2 ${msg.self ? 'bg-primary text-white self-end' : 'bg-slate-800 text-slate-200 self-start'}`}
          >
            {!msg.self && <p className="font-bold text-[8px] text-primary-light mb-0.5">{msg.sender}</p>}
            <p className="leading-snug">{msg.text}</p>
            <span className="text-[7px] text-slate-400 block text-right mt-0.5">{msg.time}</span>
          </motion.div>
        ))}

        {isTyping && (
          <div className="bg-slate-800 text-slate-200 rounded-lg p-2 self-start flex items-center space-x-1 w-12">
            <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        )}
      </div>

      <div className="flex items-center space-x-2 border-t border-white/5 pt-2">
        <div className="flex-1 bg-slate-900 rounded-full px-3 py-1 text-[9px] text-slate-500 border border-white/5">
          Escribe un mensaje en el canal...
        </div>
        <div className="w-5.5 h-5.5 rounded-full bg-primary flex items-center justify-center text-white cursor-pointer hover:bg-primary-dark transition-colors">
          <ArrowRight className="w-3 h-3" />
        </div>
      </div>
    </div>
  );
};

const TareasSimulation = () => {
  const [tasks, setTasks] = useState([
    { text: 'Abrir local y terminal Kiosko', checked: false },
    { text: 'Verificar stock e incidencias de turno', checked: false },
    { text: 'Enviar checklist de fin de jornada', checked: false }
  ]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTasks((prev) => {
        const next = [...prev];
        if (index < next.length) {
          next[index] = { ...next[index], checked: true };
          index++;
        } else {
          index = 0;
          return prev.map(t => ({ ...t, checked: false }));
        }
        return next;
      });
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const checkedCount = tasks.filter(t => t.checked).length;
    setProgress(Math.round((checkedCount / tasks.length) * 100));
  }, [tasks]);

  return (
    <div className="w-full h-64 bg-[#111625] rounded-xl border border-white/10 p-6 flex flex-col justify-between relative overflow-hidden">
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <div className="flex items-center space-x-2">
          <ListTodo className="w-4 h-4 text-primary-light" />
          <span className="text-xs font-bold text-slate-300">Tareas del Turno</span>
        </div>
        <span className="text-[10px] text-slate-500 font-mono">{progress}% Completado</span>
      </div>

      <div className="flex-1 my-4 flex flex-col justify-center space-y-2">
        {tasks.map((task, i) => (
          <div 
            key={i}
            className={`flex items-center space-x-3 p-2.5 rounded border transition-all duration-300 ${task.checked ? 'bg-green-500/5 border-green-500/10 text-slate-400 line-through' : 'bg-slate-800/30 border-white/5 text-slate-200'}`}
          >
            <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${task.checked ? 'bg-green-500 border-green-500 text-white' : 'border-slate-600 bg-transparent'}`}>
              {task.checked && <CheckCircle2 className="w-2.5 h-2.5 text-white" />}
            </div>
            <span className="text-[11px]">{task.text}</span>
          </div>
        ))}
      </div>

      <div className="space-y-1.5 border-t border-white/5 pt-2">
        <div className="w-full bg-slate-800 rounded-full h-1 overflow-hidden">
              <motion.div 
            className="bg-green-500 h-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    </div>
  );
};

const tabsInfo = [
  {
    id: 'nominas',
    label: 'Nóminas',
    icon: FileText,
    tag: 'Distribución Inteligente',
    title: 'Envía y organiza nóminas en bloque en segundos',
    desc: 'Sube un único PDF con todas las nóminas del mes de tu gestoría. El sistema inteligente de Fycheo identifica a cada empleado, corta el documento y notifica a cada trabajador de manera confidencial para que lo descargue desde su app.',
    benefits: [
      'Separación y asignación automática por empleado',
      'Histórico organizado y seguro en la nube',
      'Notificación push inmediata en el smartphone'
    ],
    link: '/nominas-empleados',
    ctaText: 'Ver detalles de Nóminas'
  },
  {
    id: 'contratos',
    label: 'Contratos y Documentos',
    icon: Shield,
    tag: 'Gestión Documental RGPD',
    title: 'Expedientes de plantilla digitales y gestión documental',
    desc: 'Di adiós al papel. Almacena de forma segura contratos de trabajo, documentos de identidad, bajas médicas y certificados. Organiza el expediente de tu plantilla cómodamente en la nube.',
    benefits: [
      'Digitalización completa de expedientes individuales',
      'Expediente único digitalizado para cada empleado',
      'Cumplimiento estricto de la RGPD con cifrado seguro'
    ],
    link: '/contratos-y-documentacion',
    ctaText: 'Ver detalles de Documentos'
  },
  {
    id: 'chat',
    label: 'Chat Interno',
    icon: MessageSquare,
    tag: 'Comunicación de Equipo',
    title: 'Coordinación fluida que respeta el descanso laboral',
    desc: 'Evita mezclar la vida privada con el trabajo en WhatsApp. Con el chat interno integrado, crea canales grupales por departamentos, envía mensajes directos y publica avisos importantes con confirmación de lectura.',
    benefits: [
      'Canales por equipos, sucursales o proyectos',
      'Anuncios oficiales con notificación garantizada',
      'Privacidad total sin compartir números personales'
    ],
    link: '/chat-interno',
    ctaText: 'Ver detalles del Chat'
  },
  {
    id: 'tareas',
    label: 'Gestión de Tareas',
    icon: ListTodo,
    tag: 'Productividad Diaria',
    title: 'Asigna tareas y checklists ligados al turno',
    desc: 'Optimiza el trabajo de tus equipos. Crea checklists de tareas obligatorias que el empleado debe realizar al fichar la entrada o salida (como cierres de caja o limpiezas) y monitoriza el progreso en tiempo real.',
    benefits: [
      'Checklists integrados en el flujo de fichajes',
      'Asignación individual o por departamentos',
      'Panel de control de avances para supervisores'
    ],
    link: '/gestion-tareas-empleados',
    ctaText: 'Ver detalles de Tareas'
  }
];

export const Home = () => {
  const [showDemo, setShowDemo] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('nominas');

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
      <SEOHead
        title="Fycheo | Software de control horario y fichaje para empresas"
        description="Controla fichajes, jornada laboral, vacaciones e informes con Fycheo. Un software de control horario sencillo para empresas y pymes en España."
        jsonLd={faqSchema}
      />

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
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-8 text-white leading-tight">
                Control horario sencillo para empresas que{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-light to-purple-400">
                  no quieren complicarse.
                </span>
              </h1>
              <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                Fycheo te ayuda a registrar fichajes, gestionar empleados, controlar vacaciones y tener los informes de jornada ordenados desde un solo lugar.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Button size="lg" className="shadow-glow hover:shadow-glow-lg" onClick={() => window.location.href = '/register'}>
                  Probar Fycheo Gratis
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white/10 hover:bg-white/5 text-white" 
                  onClick={() => window.location.href = '/contacto'}
                >
                  Solicitar Demo
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
            <div className="absolute -inset-1 rounded-2xl blur opacity-20 bg-gradient-to-r from-primary to-purple-500" />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <ImagePlaceholder
                filename="hero-fycheo-dashboard.webp"
                path="/public/images/seo/hero-fycheo-dashboard.webp"
                description="Mockup interactivo del dashboard principal de la empresa en Fycheo mostrando resumen de empleados activos, incidencias y cuadrantes."
                alt="Software de control horario Fycheo con dashboard de fichajes de empleados."
                type="hero"
                aspectRatio="aspect-video"
              />
            </div>
          </motion.div>
          <p className="text-center text-xs text-slate-500 mt-6 flex items-center justify-center gap-1.5">
            <span>🖥️</span> ¿Prefieres ver una demostración? 
            <a 
              href="/contacto" 
              className="text-primary-light hover:underline font-semibold flex items-center gap-1"
            >
              Solicita una demo personalizada con datos de tu sector
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </p>
        </div>
      </section>

      {/* ── SECCIÓN 2: BLOQUE DE DOLOR ── */}
      <section className="py-24 bg-[#0B0E14] relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary font-bold text-xs uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
              El problema
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-4 mb-6">Gestionar fichajes no debería ser un caos diario</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
              Si todavía controlas fichajes con Excel, papel o mensajes sueltos, sabes lo fácil que es que algo se pierda: una entrada que no se apunta, una salida mal registrada, una ausencia que nadie recuerda o un informe que hay que preparar deprisa. Fycheo nace para poner orden en todo eso.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div className="space-y-6">
              {[
                { title: 'Excels rotos e inaccesibles', desc: 'Cuadrantes compartidos que se corrompen y fórmulas de horas extra que fallan.', icon: XCircle, color: 'text-red-400' },
                { title: 'Cadenas de mensajes y WhatsApp', desc: 'Mensajes de cambio de turno perdidos y comunicación no oficial desorganizada.', icon: XCircle, color: 'text-red-400' },
                { title: 'Errores en vacaciones acumuladas', desc: 'Falta de cuadrante cruzado y disputas internas por saldos de ausencias erróneos.', icon: XCircle, color: 'text-red-400' },
                { title: 'Ausencia de validez legal', desc: 'Registros en papel fácilmente modificables que pueden acarrear sanciones de inspección.', icon: XCircle, color: 'text-red-400' }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-xl bg-red-950/10 border border-red-900/20">
                  <item.icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${item.color}`} />
                  <div>
                    <h3 className="font-bold text-white text-sm mb-1">{item.title}</h3>
                    <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Animación interactiva del Caos de la oficina */}
            <div className="relative h-full min-h-[450px]">
               <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-orange-600/10 blur-3xl rounded-full" />
               <div className="relative bg-[#151B2B] rounded-2xl border border-white/5 p-6 shadow-2xl h-full flex flex-col overflow-hidden border-red-500/20">
                  <div className="flex items-center gap-3 mb-4 relative z-40">
                     <span className="bg-red-500/20 text-red-400 text-[10px] font-bold px-3 py-1 rounded-full border border-red-500/30">
                        EL FORMATO TRADICIONAL
                     </span>
                     <h3 className="text-sm font-bold text-slate-300">Herramientas fragmentadas</h3>
                  </div>
                  
                  <div className="relative flex-1 w-full mt-4 min-h-[380px]">
                      {/* 1. Hoja Excel simulada (Desastrosa) */}
                      <motion.div 
                        animate={{ rotate: [-1.5, 1.5, -1.5], y: [-3, 3, -3], opacity: [0.75, 0.95, 0.75], zIndex: 10 }} 
                        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                        className="absolute top-0 left-0 w-52 bg-slate-100 rounded shadow-lg overflow-hidden border border-slate-300"
                      >
                        <div className="bg-green-800 p-1.5 text-white text-[8px] font-bold">Registro_Horario_V4_FINAL_copia.xlsx</div>
                        <div className="p-1.5 bg-white text-[7px] text-slate-700">
                          <div className="grid grid-cols-4 border-b border-slate-200 pb-0.5 font-bold">
                            <span>Emp.</span><span>Entrada</span><span>Salida</span><span>Firma</span>
                          </div>
                          <div className="grid grid-cols-4 pt-0.5 border-b border-slate-100">
                            <span>Ana M.</span><span>09:15</span><span>18:00</span><span className="text-green-600">Fichado</span>
                          </div>
                          <div className="grid grid-cols-4 pt-0.5 border-b border-slate-100 text-red-500">
                            <span>Luis T.</span><span>¿?</span><span>17:30</span><span className="font-bold">#ERROR</span>
                          </div>
                          <div className="grid grid-cols-4 pt-0.5 border-b border-slate-100 text-red-500">
                            <span>Sofia L.</span><span>09:00</span><span>18:00</span><span className="font-mono">#VALOR!</span>
                          </div>
                          <div className="grid grid-cols-4 pt-0.5 text-slate-400">
                            <span>Carlos V.</span><span>[Vacío]</span><span>[Vacío]</span><span>Falta</span>
                          </div>
                        </div>
                      </motion.div>
 
                      {/* 2. Correo de la Gestoría (Urgencia - Aparece y desaparece) */}
                      <motion.div 
                        animate={{ rotate: [1, -1, 1], y: [4, -4, 4], opacity: [0, 1, 1, 0, 0], scale: [0.8, 1, 1, 0.8, 0.8], zIndex: [10, 100, 100, 10, 10] }} 
                        transition={{ repeat: Infinity, duration: 9, ease: "easeInOut", delay: 0.5, times: [0, 0.2, 0.75, 0.9, 1] }}
                        className="absolute top-2 right-0 w-52 bg-[#1C2333] border border-red-500/30 rounded p-2.5 shadow-xl text-white"
                      >
                        <div className="flex items-center gap-1.5 text-red-400 text-[8px] font-bold mb-1 border-b border-white/5 pb-1">
                          <Mail size={10} />
                          <span>DE: gestoria@asesoria.com</span>
                        </div>
                        <h4 className="text-white text-[8px] font-bold mb-0.5">Asunto: Cierre de nóminas URGENTE</h4>
                        <p className="text-[7.5px] text-slate-400 leading-normal">
                          Faltan las firmas del mes de 4 empleados. Si no me envías el Excel hoy no podré calcular las nóminas a tiempo.
                        </p>
                      </motion.div>

                      {/* 3. WhatsApp 1 (Luis - Fichaje olvidado - Aparece y desaparece) */}
                      <motion.div 
                        animate={{ y: [-4, 4, -4], rotate: [-0.5, 0.5, -0.5], opacity: [0, 0, 1, 1, 0], scale: [0.8, 0.8, 1, 1, 0.8], zIndex: [10, 10, 100, 100, 10] }} 
                        transition={{ repeat: Infinity, duration: 11, ease: "easeInOut", delay: 1, times: [0, 0.25, 0.45, 0.8, 1] }}
                        className="absolute bottom-16 left-0 w-52 bg-[#e5ddd5] rounded-lg shadow-xl overflow-hidden border border-slate-300"
                      >
                        <div className="bg-[#075E54] p-1.5 text-white text-[8px] font-bold flex items-center gap-1">
                          <MessageSquare size={10} /> Grupo Trabajo
                        </div>
                        <div className="p-1.5 flex flex-col gap-1 text-[7.5px]">
                          <div className="bg-white p-1 rounded self-start max-w-[95%]">
                            <p className="font-bold text-green-600 leading-none mb-0.5">Luis</p>
                            <p className="text-slate-700">Oye, ayer olvidé fichar al volver de comer. Apúntame que entré a las 15:10 porfa.</p>
                          </div>
                        </div>
                      </motion.div>

                      {/* 4. WhatsApp 2 (Marta - Excel bloqueado - Aparece y desaparece) */}
                      <motion.div 
                        animate={{ y: [3, -3, 3], rotate: [0.5, -0.5, 0.5], opacity: [0, 1, 1, 0, 0], scale: [0.8, 1, 1, 0.8, 0.8], zIndex: [10, 100, 100, 10, 10] }} 
                        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut", delay: 1.5, times: [0, 0.15, 0.7, 0.85, 1] }}
                        className="absolute bottom-10 right-0 w-52 bg-[#e5ddd5] rounded-lg shadow-xl overflow-hidden border border-slate-300"
                      >
                        <div className="bg-[#075E54] p-1.5 text-white text-[8px] font-bold flex items-center gap-1">
                          <MessageSquare size={10} /> Grupo Trabajo
                        </div>
                        <div className="p-1.5 flex flex-col gap-1 text-[7.5px]">
                          <div className="bg-white p-1 rounded self-start max-w-[95%]">
                            <p className="font-bold text-green-600 leading-none mb-0.5">Marta (Admin)</p>
                            <p className="text-slate-700">Jefe, el Excel de control horario se ha bloqueado y dice que está en "Solo lectura". ¿Quién lo tiene abierto?</p>
                          </div>
                        </div>
                      </motion.div>

                      {/* 5. WhatsApp 3 (Pedro - Turno cruzado - Aparece y desaparece) */}
                      <motion.div 
                        animate={{ x: [-2, 2, -2], y: [-2, 2, -2], opacity: [0, 0, 1, 1, 0], scale: [0.8, 0.8, 1, 1, 0.8], zIndex: [10, 10, 100, 100, 10] }} 
                        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut", delay: 2, times: [0, 0.3, 0.5, 0.85, 1] }}
                        className="absolute top-28 left-36 w-48 bg-[#e5ddd5] rounded-lg shadow-md overflow-hidden border border-slate-300"
                      >
                        <div className="bg-[#075E54] p-1.5 text-white text-[7.5px] font-bold flex items-center gap-1">
                          <MessageSquare size={9} /> Pedro (Móvil)
                        </div>
                        <div className="p-1.5 text-[7.5px] bg-white">
                          <p className="text-slate-700 font-medium">Jefe, ¿me cambias el turno del sábado por el de Javi? Él dice que le da igual pero no me fía.</p>
                        </div>
                      </motion.div>
 
                      {/* 6. Post-it Amarillo (Inspección) */}
                      <motion.div 
                        animate={{ rotate: [6, 4, 6], y: [-2, 2, -2], opacity: [0.85, 1, 0.85], zIndex: 15 }}
                        transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                        className="absolute top-20 right-28 w-28 bg-yellow-100 shadow-md border border-yellow-250 p-2 text-slate-800 rotate-6"
                      >
                        <p className="text-[8px] font-bold leading-tight" style={{ fontFamily: 'sans-serif' }}>
                          ⚠️ OJO: Guardar registros 4 años. ¡Inspección el mes que viene!
                        </p>
                      </motion.div>

                      {/* 7. Post-it Rosa (Fórmulas borradas - Aparece y desaparece) */}
                      <motion.div 
                        animate={{ rotate: [-10, -8, -10], y: [2, -2, 2], opacity: [0, 1, 1, 0, 0], zIndex: [10, 100, 100, 10, 10] }}
                        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 0.8, times: [0, 0.2, 0.75, 0.9, 1] }}
                        className="absolute top-24 left-4 w-28 bg-pink-100 shadow-md border border-pink-200 p-2 text-slate-800 -rotate-8"
                      >
                        <p className="text-[8px] font-bold leading-tight">
                          ¿Quién ha tocado el Excel y ha borrado las horas extras de mayo? 😡
                        </p>
                      </motion.div>

                      {/* 8. Alerta Roja de Inspección (Borde parpadeante - Aparece y desaparece) */}
                      <motion.div 
                        animate={{ scale: [0.98, 1.02, 0.98], opacity: [0, 0, 1, 1, 0, 0], zIndex: [10, 10, 150, 150, 10, 10] }}
                        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut", delay: 3, times: [0, 0.45, 0.55, 0.85, 0.9, 1] }}
                        className="absolute -bottom-2 right-4 w-56 bg-red-950/95 border border-red-500 rounded p-2 text-red-400 z-40 shadow-2xl flex gap-2 items-start"
                      >
                        <AlertTriangle size={14} className="flex-shrink-0 mt-0.5 animate-pulse text-red-500" />
                        <div>
                          <h5 className="text-[8px] font-bold text-red-300">Riesgo de Sanción</h5>
                          <p className="text-[7px] text-red-400 leading-snug">
                            Las hojas de Excel no son inalterables ante una inspección de trabajo (multas de 7.500€).
                          </p>
                        </div>
                      </motion.div>

                      {/* 9. Notificación de Slack (NUEVO - Aparece y desaparece) */}
                      <motion.div 
                        animate={{ y: [-2, 2, -2], opacity: [0, 1, 1, 0, 0], scale: [0.8, 1, 1, 0.8, 0.8], zIndex: [10, 100, 100, 10, 10] }} 
                        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut", delay: 4, times: [0, 0.15, 0.65, 0.8, 1] }}
                        className="absolute top-28 left-4 w-52 bg-[#1A1D21] border border-[#E01E5A]/30 rounded-lg p-2.5 shadow-xl text-white"
                      >
                        <div className="flex items-center gap-1.5 text-[#E01E5A] text-[7.5px] font-bold mb-1 border-b border-white/5 pb-1">
                          <MessageSquare size={10} />
                          <span>Slack #general</span>
                        </div>
                        <h4 className="text-white text-[7.5px] font-bold mb-0.5">Socio fundador:</h4>
                        <p className="text-[7px] text-slate-400 leading-normal">
                          ¿Alguien sabe si hemos registrado la jornada de hoy? El inspector está pidiendo los informes de los últimos 3 meses YA.
                        </p>
                      </motion.div>

                      {/* 10. Recordatorio de Calendario Urgente (NUEVO - Aparece y desaparece) */}
                      <motion.div 
                        animate={{ y: [2, -2, 2], opacity: [0, 0, 1, 1, 0], scale: [0.8, 0.8, 1, 1, 0.8], zIndex: [10, 10, 100, 100, 10] }} 
                        transition={{ repeat: Infinity, duration: 9.5, ease: "easeInOut", delay: 2.5, times: [0, 0.35, 0.55, 0.85, 1] }}
                        className="absolute bottom-28 left-20 w-[190px] bg-slate-900 border border-amber-500/30 rounded p-2 shadow-xl text-amber-400"
                      >
                        <div className="flex items-center gap-1 text-[7.5px] font-bold mb-1">
                          <Clock size={10} className="text-amber-500 animate-pulse" />
                          <span>CALENDARIO: 10:00 AM (Hoy)</span>
                        </div>
                        <p className="text-[7px] text-slate-300 leading-normal">
                          🚨 <strong>Reunión Urgente:</strong> Cuadrar fichajes y horas extra del trimestre antes de enviar a la gestoría.
                        </p>
                      </motion.div>

                      {/* 11. SMS de la Gestoría (NUEVO - Aparece y desaparece) */}
                      <motion.div 
                        animate={{ x: [2, -2, 2], opacity: [0, 1, 1, 0, 0], scale: [0.8, 1, 1, 0.8, 0.8], zIndex: [10, 100, 100, 10, 10] }} 
                        transition={{ repeat: Infinity, duration: 11.5, ease: "easeInOut", delay: 5.5, times: [0, 0.2, 0.7, 0.85, 1] }}
                        className="absolute top-48 right-6 w-48 bg-slate-900 border border-blue-500/30 rounded p-2 shadow-xl text-blue-400"
                      >
                        <div className="flex items-center gap-1 text-[7.5px] font-bold mb-1">
                          <Smartphone size={10} className="text-blue-500" />
                          <span>SMS: Gestoría Laboral</span>
                        </div>
                        <p className="text-[7px] text-slate-300 leading-normal">
                          Recordatorio: Luis y Carlos tienen días sin fichajes de entrada y salida esta semana. Por favor, corrígelo.
                        </p>
                      </motion.div>

                      {/* 12. Post-it Azul (NUEVO - Fichaje kiosko - Aparece y desaparece) */}
                      <motion.div 
                        animate={{ rotate: [-5, -3, -5], y: [-1, 1, -1], opacity: [0, 0, 1, 1, 0], zIndex: [10, 10, 100, 100, 10] }}
                        transition={{ repeat: Infinity, duration: 8.5, ease: "easeInOut", delay: 3.5, times: [0, 0.25, 0.45, 0.85, 1] }}
                        className="absolute bottom-36 left-4 w-32 bg-blue-100 shadow-md border border-blue-200 p-2 text-slate-800 -rotate-3"
                      >
                        <p className="text-[8px] font-bold leading-tight">
                          ¿Quién tiene la llave del kiosko? Javi dice que no le funciona la app móvil hoy 🤔
                        </p>
                      </motion.div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* ── SECCIÓN 3: SOLUCIÓN ── */}
      <section className="py-24 bg-[#0F1420] border-t border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary font-bold text-xs uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
              La solución
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-4 mb-6">Tus empleados fichan, tú revisas y todo queda ordenado</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
              Fycheo pone fin a la dispersión de datos. Unifica la asistencia, incidencias de jornada, vacaciones y ausencias de tu equipo en un solo lugar.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-[#151B2B] p-8 rounded-2xl border border-white/5">
              <h3 className="text-lg font-bold text-white mb-3">Fichajes claros</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Tus trabajadores registran su jornada desde el móvil, ordenador o una tablet común de forma rápida y sencilla.
              </p>
            </div>
            <div className="bg-[#151B2B] p-8 rounded-2xl border border-white/5">
              <h3 className="text-lg font-bold text-white mb-3">Vacaciones unificadas</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Visualiza el calendario cruzado de ausencias para asegurar la cobertura operativa antes de validar solicitudes.
              </p>
            </div>
            <div className="bg-[#151B2B] p-8 rounded-2xl border border-white/5">
              <h3 className="text-lg font-bold text-white mb-3">Informes legales listos</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Exporta el registro mensual acumulado de la jornada en formato oficial homologado ante cualquier requerimiento de inspección.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECCIÓN: DISPOSITIVOS Y PERFILES (MÁNAGER, APP, KIOSKO) ── */}
      <section className="py-24 bg-[#0B0E14] border-b border-white/5 relative overflow-hidden">
        {/* Luces de fondo premium */}
        <div className="absolute top-1/2 right-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full pointer-events-none opacity-5" style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="text-primary font-bold text-xs uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
              Dispositivos y Perfiles
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-4 mb-6">
              Un Fycheo adaptado a cada persona y espacio de trabajo
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
              Centraliza el control de tu empresa mientras ofreces a tu plantilla la forma más cómoda de registrar su jornada laboral.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Tarjeta 1: Panel Web Manager */}
            <motion.div 
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-[#151B2B]/60 backdrop-blur-sm border border-white/5 hover:border-primary/30 p-8 rounded-2xl flex flex-col justify-between shadow-lg relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full pointer-events-none group-hover:bg-primary/10 transition-colors" />
              <div>
                <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/25 rounded-xl flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Panel Web (Mánager)</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  El centro de control administrativo para tu ordenador. Gestiona cuadrantes de turnos, aprueba solicitudes de vacaciones, distribuye nóminas y exporta informes oficiales en un solo clic.
                </p>
                <ul className="space-y-2.5 mb-8 text-left">
                  {[
                    "Cuadro de mando completo en tiempo real",
                    "Exportación legal (PDF / Excel)",
                    "Carga inteligente de nóminas y expedientes"
                  ].map((benefit, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-[11px] text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button 
                onClick={() => window.location.href = '/informes-jornada-laboral'}
                className="text-[11px] font-bold text-blue-400 hover:text-white flex items-center gap-1.5 group/btn transition-colors mt-auto self-start focus:outline-none"
              >
                Ver funciones del Mánager 
                <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </motion.div>

            {/* Tarjeta 2: App Móvil */}
            <motion.div 
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-[#151B2B]/60 backdrop-blur-sm border border-white/5 hover:border-primary/30 p-8 rounded-2xl flex flex-col justify-between shadow-lg relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full pointer-events-none group-hover:bg-primary/10 transition-colors" />
              <div>
                <div className="w-12 h-12 bg-primary/10 border border-primary/25 rounded-xl flex items-center justify-center text-primary-light mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Smartphone className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">App Móvil (Empleado)</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  Fichajes ágiles y solicitudes sobre la marcha. Diseñado para trabajadores en movilidad, comerciales o personal de oficina. Fichar con un toque, añadir notas y solicitar vacaciones.
                </p>
                <ul className="space-y-2.5 mb-8 text-left">
                  {[
                    "Fichajes con geolocalización opcional",
                    "Calendario individual de vacaciones",
                    "Buzón de nóminas y documentos en la nube"
                  ].map((benefit, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-[11px] text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary-light flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button 
                onClick={() => window.location.href = '/portal-empleado'}
                className="text-[11px] font-bold text-primary-light hover:text-white flex items-center gap-1.5 group/btn transition-colors mt-auto self-start focus:outline-none"
              >
                Ver funciones del Empleado 
                <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </motion.div>

            {/* Tarjeta 3: Kiosko */}
            <motion.div 
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-[#151B2B]/60 backdrop-blur-sm border border-white/5 hover:border-primary/30 p-8 rounded-2xl flex flex-col justify-between shadow-lg relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full pointer-events-none group-hover:bg-primary/10 transition-colors" />
              <div>
                <div className="w-12 h-12 bg-green-500/10 border border-green-500/25 rounded-xl flex items-center justify-center text-green-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Terminal Kiosko (Tablet)</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  Un punto de fichaje común para tu centro físico. Convierte cualquier tablet (Android/iPad) o PC en un reloj de fichar físico de pared. Ideal para tiendas, hostelería, talleres o fábricas.
                </p>
                <ul className="space-y-2.5 mb-8 text-left">
                  {[
                    "Fichaje rápido mediante DNI de empleado",
                    "Sin necesidad de móviles personales",
                    "Modo sin conexión a internet y anti-fraude"
                  ].map((benefit, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-[11px] text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button 
                onClick={() => window.location.href = '/kiosko-fichaje'}
                className="text-[11px] font-bold text-green-400 hover:text-white flex items-center gap-1.5 group/btn transition-colors mt-auto self-start focus:outline-none"
              >
                Ver funciones del Kiosko 
                <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SECCIÓN INTERACTIVA DE MÓDULOS PREMIUM ── */}
      <section className="py-24 bg-[#0B0E14] border-b border-white/5 relative">
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full pointer-events-none opacity-10" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)', filter: 'blur(50px)' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="text-primary font-bold text-xs uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
              Más funciones de valor
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-4 mb-6">
              Gestiona a tu equipo de forma integral en una sola app
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
              No limites tu gestión al control horario. Fycheo unifica las herramientas clave de recursos humanos que tu pyme necesita para crecer con orden y productividad.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-center max-w-6xl mx-auto">
            {/* Tabs List (Columna Izquierda / Tabs selector) */}
            <div className="lg:col-span-5 space-y-4">
              {tabsInfo.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "w-full text-left p-4.5 rounded-xl border transition-all duration-300 flex items-start gap-4 focus:outline-none",
                      isActive
                        ? "bg-[#151B2B] border-primary/30 shadow-glow-sm text-white"
                        : "bg-[#111625]/40 border-white/5 text-slate-400 hover:bg-[#111625]/80 hover:text-white"
                    )}
                  >
                    <div className={cn(
                      "p-2.5 rounded-lg transition-colors flex-shrink-0",
                      isActive ? "bg-primary text-white" : "bg-slate-800 text-slate-400"
                    )}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-bold text-sm leading-tight">{tab.label}</h3>
                        {isActive && (
                          <span className="text-[9px] font-bold text-primary-light uppercase tracking-wider bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
                            Activo
                          </span>
                        )}
                      </div>
                      <p className={cn(
                        "text-xs leading-normal line-clamp-2",
                        isActive ? "text-slate-300" : "text-slate-500"
                      )}>
                        {tab.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Tab Content (Columna Derecha) */}
            <div className="lg:col-span-7 bg-[#151B2B] rounded-2xl border border-white/5 p-8 shadow-2xl relative min-h-[480px] flex flex-col justify-between">
              <AnimatePresence mode="wait">
                {tabsInfo.map((tab) => {
                  if (tab.id !== activeTab) return null;
                  return (
                    <motion.div
                      key={tab.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.3 }}
                      className="flex-1 flex flex-col justify-between h-full space-y-8"
                    >
                      <div className="space-y-4">
                        <span className="text-primary-light text-[10px] font-bold uppercase tracking-widest bg-primary/10 px-2.5 py-1 rounded border border-primary/20">
                          {tab.tag}
                        </span>
                        <h3 className="text-xl md:text-2xl font-extrabold text-white leading-tight">
                          {tab.title}
                        </h3>
                        <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                          {tab.desc}
                        </p>

                        <div className="space-y-2.5 pt-2">
                          {tab.benefits.map((benefit, idx) => (
                            <div key={idx} className="flex gap-2 items-center text-xs text-slate-300">
                              <CheckCircle2 className="text-primary w-4 h-4 flex-shrink-0" />
                              <span>{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Simulador Interactivo */}
                      <div className="relative w-full">
                        {tab.id === 'nominas' && <NominasSimulation />}
                        {tab.id === 'contratos' && <ContratosSimulation />}
                        {tab.id === 'chat' && <ChatSimulation />}
                        {tab.id === 'tareas' && <TareasSimulation />}
                      </div>

                      {/* Botones de acción */}
                      <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-white/5 mt-auto">
                        <Button 
                          variant="primary" 
                          size="md" 
                          className="w-full sm:w-auto shadow-glow text-xs" 
                          onClick={() => window.location.href = '/register'}
                        >
                          Probar módulo gratis
                        </Button>
                        <button 
                          onClick={() => window.location.href = tab.link}
                          className="w-full sm:w-auto text-xs font-semibold text-slate-400 hover:text-white transition-colors flex items-center justify-center gap-1 py-2.5 focus:outline-none"
                        >
                          <span>{tab.ctaText}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>


      {/* ── SECCIÓN 4: BENEFICIOS COMERCIALES ── */}
      <section className="py-24 bg-[#0B0E14]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-white mb-4">Menos hojas sueltas. Menos errores. Más control.</h2>
            <p className="text-slate-400 text-sm">Los beneficios reales de implantar Fycheo en tu empresa.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              "Fichajes claros de entrada, salida y descansos diarios.",
              "Panel de control para revisar la jornada real de cada empleado.",
              "Vacaciones y ausencias organizadas sin solapamientos.",
              "Informes mensuales acumulados listos para inspecciones.",
              "Distribución de nóminas en bloque y descarga móvil segura.",
              "Contratos y expedientes digitales protegidos bajo la RGPD.",
              "Chat interno profesional para coordinar al equipo sin WhatsApp.",
              "Gestión de tareas diarias y checklists de jornada.",
              "Modo kiosko común ideal para centros de trabajo físicos.",
              "Portal del empleado sencillo de usar sin curva de aprendizaje."
            ].map((beneficio, i) => (
              <div key={i} className="flex gap-3 text-sm text-slate-300 items-center bg-[#151B2B]/50 p-4 rounded-xl border border-white/5">
                <CheckCircle2 className="text-primary w-5 h-5 flex-shrink-0" />
                <span>{beneficio}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECCIÓN 5: FUNCIONALIDADES CLAVE ── */}
      <section className="py-24 bg-[#0F1420] border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white text-center mb-16">Todo ordenado desde un único lugar</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-surface-dark border border-white/5 rounded-xl">
              <span className="text-2xl font-bold text-primary-light block mb-2">01</span>
              <h3 className="font-bold text-white mb-2">Control horario</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Registra entradas, salidas y pausas diarias de forma sencilla desde cualquier dispositivo.
              </p>
            </div>
            <div className="p-6 bg-surface-dark border border-white/5 rounded-xl">
              <span className="text-2xl font-bold text-primary-light block mb-2">02</span>
              <h3 className="font-bold text-white mb-2">Portal del empleado</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Cada persona puede consultar su información acumulada de jornada y realizar acciones básicas.
              </p>
            </div>
            <div className="p-6 bg-surface-dark border border-white/5 rounded-xl">
              <span className="text-2xl font-bold text-primary-light block mb-2">03</span>
              <h3 className="font-bold text-white mb-2">Vacaciones y ausencias</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Solicitudes de días libres centralizadas y menos conversaciones cruzadas desorganizadas.
              </p>
            </div>
            <div className="p-6 bg-surface-dark border border-white/5 rounded-xl">
              <span className="text-2xl font-bold text-primary-light block mb-2">04</span>
              <h3 className="font-bold text-white mb-2">Informes oficiales</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Revisa horas ordinarias, extraordinarias e incidencias acumuladas desde el panel de mánager.
              </p>
            </div>
            <div className="p-6 bg-surface-dark border border-white/5 rounded-xl">
              <span className="text-2xl font-bold text-primary-light block mb-2">05</span>
              <h3 className="font-bold text-white mb-2">Nóminas digitales</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Sube las nóminas del mes en bloque y repártelas a la plantilla de forma instantánea y confidencial.
              </p>
            </div>
            <div className="p-6 bg-surface-dark border border-white/5 rounded-xl">
              <span className="text-2xl font-bold text-primary-light block mb-2">06</span>
              <h3 className="font-bold text-white mb-2">Contratos y documentos</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Organiza expedientes individuales en la nube y mantén tus documentos digitales bajo cumplimiento RGPD.
              </p>
            </div>
            <div className="p-6 bg-surface-dark border border-white/5 rounded-xl">
              <span className="text-2xl font-bold text-primary-light block mb-2">07</span>
              <h3 className="font-bold text-white mb-2">Chat interno</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Coordinación instantánea del equipo y anuncios oficiales sin mezclar la vida privada en WhatsApp.
              </p>
            </div>
            <div className="p-6 bg-surface-dark border border-white/5 rounded-xl">
              <span className="text-2xl font-bold text-primary-light block mb-2">08</span>
              <h3 className="font-bold text-white mb-2">Gestión de tareas</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Asigna checklists de jornada y controla el estado de avance diario de los objetivos laborales.
              </p>
            </div>
            <div className="p-6 bg-surface-dark border border-white/5 rounded-xl">
              <span className="text-2xl font-bold text-primary-light block mb-2">09</span>
              <h3 className="font-bold text-white mb-2">Modo kiosko</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Terminal de fichaje común mediante tablet ideal para equipos y operarios presenciales.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECCIÓN 6: FAQ SEO ── */}
      <section className="py-24 relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-white mb-4">Preguntas frecuentes</h2>
          <p className="text-slate-400">Resolvemos todas tus dudas sobre control horario y la plataforma.</p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-white/10 bg-[#151B2B] rounded-xl overflow-hidden transition-all duration-200">
              <button
                aria-expanded={openFaq === i}
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

      {/* ── SECCIÓN 7: CTA FINAL ── */}
      <section className="py-24 relative overflow-hidden bg-primary">
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{ background: 'radial-gradient(circle at center, white 0%, transparent 70%)' }} />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
            Empieza a ordenar los fichajes de tu empresa con Fycheo
          </h2>
          <p className="text-blue-100 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Únete a las empresas que ya han digitalizado su registro de jornada. Configuración en menos de 15 minutos sin ayuda externa.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-white text-primary hover:bg-slate-50 text-lg px-12 py-5 h-auto shadow-2xl rounded-2xl font-bold w-full sm:w-auto" onClick={() => window.location.href = '/register'}>
              Probar Fycheo Gratis
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white/20 hover:bg-white/10 text-lg px-12 py-5 h-auto rounded-2xl font-bold w-full sm:w-auto text-white" 
              onClick={() => window.location.href = '/contacto'}
            >
              Solicitar Demo
            </Button>
          </div>
          <p className="mt-6 text-blue-200 text-xs">Periodo de prueba de 14 días · Sin tarjetas · Cancela cuando quieras</p>
        </div>
      </section>
    </div>
  );
};

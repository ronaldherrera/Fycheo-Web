import { Check, User, Building2, ChevronDown } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { SEOHead } from '../components/SEOHead';
import { trackSelectPlan } from '../lib/analytics';

const tiersCompany = [
  {
    name: 'Básico',
    id: 'tier-basic',
    href: '/register?plan=basic', 
    priceMonthly: '19€',
    priceExtra: '+ 4€ / mes por empleado extra',
    priceDetail: '(Primeros 3 empleados incluidos)',
    description: 'Perfecto para microempresas y autónomos.',
    features: [
      'Fichaje web y móvil',
      'Geolocalización básica',
      'Reportes mensuales (PDF)',
      'Soporte por email 48h',
    ],
    mostPopular: false,
  },
  {
    name: 'Pro',
    id: 'tier-pro',
    href: '/register?plan=pro', 
    priceMonthly: '49€',
    priceExtra: '+ 3€ / mes por empleado extra',
    priceDetail: '(Primeros 5 empleados incluidos)',
    description: 'Para empresas en crecimiento.',
    features: [
      'Todo lo del plan Básico',
      'Fichaje con código QR y Kiosko',
      'Gestión de vacaciones',
      'Reportes avanzados (Excel)',
      'Soporte prioritario 24h',
    ],
    mostPopular: true,
  },
  {
    name: 'Ultimate',
    id: 'tier-ultimate',
    href: '/register?plan=ultimate',
    priceMonthly: '99€',
    priceExtra: '+ 2€ / mes por empleado extra',
    priceDetail: '(Primeros 10 empleados incluidos)',
    description: 'Máximo control y capacidad.',
    features: [
      'Todo lo del plan Pro',
      'Gestión documental',
      'Turnos rotativos',
      'Soporte telefónico',
      'Consultoría inicial',
    ],
    mostPopular: false,
  },
];

const enterpriseTier = {
  name: 'Enterprise',
  id: 'tier-enterprise',
  href: 'mailto:ventas@fycheo.com',
  priceMonthly: 'Contactar',
  description: 'Soluciones a medida para grandes corporaciones.',
  features: [
    'Empleados ilimitados',
    'Todo lo del plan Ultimate',
    'API de integración (RRHH)',
    'Single Sign-On (SSO)',
    'Gestor de cuenta dedicado',
    'SLA garantizado',
  ],
};

const tiersParticular = [
  {
    name: 'Gratis',
    id: 'tier-free',
    href: '#app-download', 
    priceMonthly: '0€',
    priceExtra: undefined as string | undefined,
    priceDetail: undefined as string | undefined,
    description: 'Para uso personal básico.',
    features: [
      'Registro de jornada personal',
      'Historial de últimos 30 días',
      'Incluye publicidad',
      'Exportación simple (Texto)',
    ],
    mostPopular: false,
  },
  {
    name: 'Premium',
    id: 'tier-premium',
    href: '#app-download', 
    priceMonthly: '2€',
    priceExtra: undefined as string | undefined,
    priceDetail: undefined as string | undefined,
    description: 'Experiencia completa sin límites.',
    features: [
      'Sin publicidad',
      'Historial unificado',
      'Exportación a Excel/PDF',
      'Sincronización multi-dispositivo',
      'Badge de usuario verificado',
    ],
    mostPopular: true,
  },
];

export const Precios = () => {
  const [activeTab, setActiveTab] = useState<'particular' | 'company'>('company');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const tiers = activeTab === 'company' ? tiersCompany : tiersParticular;

  const faqs = [
    { q: "¿Tengo que introducir mi tarjeta de crédito para la prueba?", a: "No. Puedes registrarte y probar el software con todas las características del plan Pro gratis durante 14 días sin añadir ningún método de pago." },
    { q: "¿Qué ocurre cuando finaliza la prueba de 14 días?", a: "Podrás elegir uno de nuestros planes de pago para continuar usando el servicio. Si decides no continuar, tu cuenta se congelará sin coste alguno." },
    { q: "¿Puedo cambiar de plan o cancelar en cualquier momento?", a: "Sí. No tenemos contratos de permanencia. Puedes subir o bajar de plan de forma inmediata, o bien cancelar la renovación cuando lo necesites." },
    { q: "¿Cómo se realiza la facturación?", a: "Ofrecemos facturación mensual recurrente por tarjeta bancaria o transferencia bancaria según las necesidades operativas de tu empresa." }
  ];

  const pricingSchema = {
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
    <div className="py-32 relative bg-background-dark min-h-screen text-white overflow-hidden">
      <SEOHead
        title="Precios de Fycheo | Control horario para empresas y pymes"
        description="Consulta las tarifas transparentes de Fycheo. Planes escalables desde 9€/mes para pymes y autónomos. Comienza tu prueba de 14 días gratis."
        jsonLd={pricingSchema}
      />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-40 left-20 w-80 h-80 bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-600/10 rounded-full blur-[100px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-4xl text-center"
        >
          <span className="text-primary font-bold text-xs uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
            Tarifas Transparentes
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Planes flexibles adaptados a tu plantilla
          </h1>
          <p className="mt-4 text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Sin costes ocultos por puesta en marcha. Pagas únicamente por lo que tu negocio necesita para cumplir la normativa.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium px-4 py-2 rounded-full">
            🎁 Crea tu cuenta hoy y recibe <span className="font-bold text-white">50€ de saldo de bienvenida</span>
          </div>
        </motion.div>

        {/* TABS */}
        <div className="mt-8 flex justify-center">
          <div className="relative grid grid-cols-2 p-1 bg-surface-dark border border-white/10 rounded-full w-full max-w-xs">
            <button
              onClick={() => setActiveTab('particular')}
              className={`relative z-10 flex items-center justify-center gap-2 rounded-full py-2.5 text-sm font-semibold transition-all duration-300 ${
                activeTab === 'particular' ? 'text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <User size={16} />
              Particulares
            </button>
            <button
              onClick={() => setActiveTab('company')}
              className={`relative z-10 flex items-center justify-center gap-2 rounded-full py-2.5 text-sm font-semibold transition-all duration-300 ${
                activeTab === 'company' ? 'text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Building2 size={16} />
              Empresas
            </button>
            <div 
              className={`absolute inset-y-1 rounded-full bg-primary shadow-glow transition-all duration-300 ease-out w-[calc(50%-4px)] ${
                activeTab === 'particular' ? 'left-1' : 'left-[calc(50%+2px)]'
              }`}
            />
          </div>
        </div>

        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 xl:gap-x-12 justify-center">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={activeTab === 'particular' ? 'lg:last:col-span-1 lg:first:col-end-2 lg:last:col-start-3' : ''}
            >
              <Card
                variant={tier.mostPopular ? 'glass' : 'default'}
                className={`flex flex-col justify-between h-full hover:border-primary/50 transition-colors bg-surface-dark border-white/5 ${
                  tier.mostPopular ? 'border-primary/50 shadow-glow relative' : ''
                }`}
              >
                {tier.mostPopular && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold leading-6 text-white shadow-sm border border-primary/50">Recomendado</span>
                )}

                <div>
                  <div className="flex items-center justify-between gap-x-4">
                    <h3 id={tier.id} className="text-lg font-bold leading-8 text-white">
                      {tier.name}
                    </h3>
                  </div>
                  <p className="mt-4 text-xs leading-6 text-slate-400">{tier.description}</p>
                  <div className="mt-6">
                    <div className="flex items-baseline gap-x-1">
                      <span className="text-4xl font-extrabold tracking-tight text-white">{tier.priceMonthly}</span>
                      {tier.priceMonthly !== 'Contactar' && tier.priceMonthly !== '0€' && (
                        <span className="text-sm font-semibold leading-6 text-slate-400">
                          {activeTab === 'company' ? '/mes base' : '/mes'}
                        </span>
                      )}
                    </div>
                    {activeTab === 'company' && tier.priceExtra && (
                      <div className="mt-2 text-xs font-semibold text-primary-light">
                        {tier.priceExtra}
                      </div>
                    )}
                    {activeTab === 'company' && tier.priceDetail && (
                      <div className="text-[10px] text-slate-500 italic mt-0.5">
                        {tier.priceDetail}
                      </div>
                    )}
                  </div>
                  <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-slate-400">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex gap-x-3 text-xs text-slate-300">
                        <Check className="h-5 w-4 flex-none text-primary-light" aria-hidden="true" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Acción global */}
        <div className="mt-16 flex flex-col items-center justify-center gap-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="px-12 shadow-glow hover:shadow-glow-lg w-full sm:w-auto font-bold"
              onClick={() => {
                if (activeTab !== 'particular') trackSelectPlan('company', '19€+');
                window.location.href = activeTab === 'particular' ? '#app' : '/register';
              }}
            >
              {activeTab === 'particular' ? 'Descargar Aplicación' : 'Empezar Prueba Gratuita'}
            </Button>
            {activeTab === 'company' && (
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white/10 hover:bg-white/5 px-12 w-full sm:w-auto text-white font-bold" 
                onClick={() => window.location.href = '/contacto'}
              >
                Solicitar Demo
              </Button>
            )}
          </div>
          <p className="text-sm text-slate-500">Prueba gratuita de 14 días. Sin tarjeta de crédito.</p>
        </div>

        {/* Enterprise */}
        {activeTab === 'company' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 mx-auto max-w-7xl"
          >
            <div className="relative isolate overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-white/10 px-6 py-12 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-16 lg:flex lg:gap-x-20 lg:px-24">
              <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none opacity-40"></div>
              <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none opacity-40"></div>

              <div className="relative mx-auto max-w-7xl lg:grid lg:grid-cols-2 lg:gap-x-12 lg:px-8 z-10 w-full items-center">
                <div className="px-6 pb-12 pt-8 sm:pb-16 lg:col-span-1 lg:px-0 lg:pb-24 lg:pt-20 xl:col-span-1">
                  <div className="mx-auto max-w-2xl lg:mx-0">
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary-light ring-1 ring-inset ring-primary/20 mb-6">
                      Para grandes corporaciones
                    </span>
                    <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl mb-6">
                      Enterprise <span className="text-primary-light block sm:inline">Unlimited</span>
                    </h2>
                    <p className="mt-6 text-sm leading-8 text-slate-300">
                      {enterpriseTier.description} Desbloquea todo el potencial con integraciones a medida, API dedicada y soporte de SLA garantizado.
                    </p>
                    <div className="mt-10 flex items-center gap-x-6">
                      <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-200" onClick={() => window.location.href = enterpriseTier.href}>
                        Contactar con Ventas
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-1 border border-white/10 rounded-3xl bg-white/5 p-8 backdrop-blur-sm shadow-2xl">
                  <ul role="list" className="space-y-6">
                    {enterpriseTier.features.map((feature) => (
                      <li key={feature} className="flex gap-x-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/20">
                          <Check className="h-6 w-6 text-primary-light" aria-hidden="true" />
                        </div>
                        <div className="flex-1">
                          <span className="text-sm text-slate-200 font-medium leading-relaxed">{feature}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* FAQS DE PRECIOS */}
        <section className="max-w-4xl mx-auto mt-24">
          <h2 className="text-3xl font-bold text-center mb-12">Preguntas frecuentes sobre tarifas</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-white/10 bg-surface-dark rounded-xl overflow-hidden transition-all duration-200">
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
      </div>
    </div>
  );
};

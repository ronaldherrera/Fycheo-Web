
import { Check, User, Building2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { motion } from 'framer-motion';
import { useState } from 'react';

const tiersCompany = [
  {
    name: 'Básico',
    id: 'tier-basic',
    href: '/register?plan=basic', 
    priceMonthly: '9€',
    description: 'Perfecto para pequeñas empresas.',
    features: [
      'Hasta 5 empleados',
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
    priceMonthly: '29€',
    description: 'Para empresas en crecimiento.',
    features: [
      'Hasta 25 empleados',
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
    priceMonthly: '39€', // Ajustado a 40 aprox (39)
    description: 'Máximo control y capacidad.',
    features: [
      'Hasta 50 empleados',
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
    href: '#contact',
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
    href: '#app-download', // Lleva a descargar App
    priceMonthly: '0€',
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
    description: 'Experiencia completa sin límites.',
    features: [
      'Sin publicidad',
      'Historial ilimitado',
      'Exportación a Excel/PDF',
      'Sincronización multi-dispositivo',
      'Badge de usuario verificado',
    ],
    mostPopular: true,
  },
];

export const Pricing = () => {
  const [activeTab, setActiveTab] = useState<'particular' | 'company'>('company');

  const tiers = activeTab === 'company' ? tiersCompany : tiersParticular;

  return (
    <div className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background decoration */}
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
          <h2 className="text-base font-semibold leading-7 text-primary">Precios simples</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Planes flexibles para todos
          </p>
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


        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-slate-400">
          {activeTab === 'company' 
            ? "Potencia la gestión de tu equipo. Planes flexibles a tu medida." 
            : "Controla tus horas fácilmente. La mejor herramienta para profesionales."}
        </p>
        
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
                  className={`flex flex-col justify-between h-full hover:border-primary/50 transition-colors ${
                    tier.mostPopular ? 'border-primary/50 shadow-glow relative' : ''
                  }`}
                >
                    {tier.mostPopular && (
                        <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-sm font-semibold leading-6 text-white shadow-sm ring-1 ring-inset ring-primary/50">Recomendado</span>
                    )}

                  <div>
                      <div className="flex items-center justify-between gap-x-4">
                        <h3 id={tier.id} className="text-lg font-semibold leading-8 text-white">
                          {tier.name}
                        </h3>
                      </div>
                      <p className="mt-4 text-sm leading-6 text-slate-400">{tier.description}</p>
                      <p className="mt-6 flex items-baseline gap-x-1">
                        <span className="text-4xl font-bold tracking-tight text-white">{tier.priceMonthly}</span>
                        {tier.priceMonthly !== 'Contactar' && tier.priceMonthly !== '0€' && (
                           <span className="text-sm font-semibold leading-6 text-slate-400">/mes</span>
                        )}
                      </p>
                      <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-slate-400">
                        {tier.features.map((feature) => (
                          <li key={feature} className="flex gap-x-3">
                            <Check className="h-6 w-5 flex-none text-primary" aria-hidden="true" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                  </div>
                  {/* Botón eliminado de cada card */}
                </Card>
            </motion.div>
          ))}
        </div>

        {/* Botón Global de Acción */}
        <div className="mt-12 text-center">
            <Button 
                size="lg" 
                className="px-12 shadow-glow hover:shadow-glow-lg"
                onClick={() => window.location.href = activeTab === 'particular' ? '#app' : '/register'}
            >
                {activeTab === 'particular' ? 'Descargar App' : 'Empezar ahora'}
            </Button>
            <p className="mt-4 text-sm text-slate-500">Prueba gratuita de 14 días. Sin tarjeta de crédito.</p>
        </div>

        {/* Sección Enterprise */}
        {activeTab === 'company' && (
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-16 mx-auto max-w-7xl"
            >
                <div className="relative isolate overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-white/10 px-6 py-12 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-16 lg:flex lg:gap-x-20 lg:px-24">
                   {/* Decorative background blur */}
                   <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none opacity-40"></div>
                   <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none opacity-40"></div>

                   <div className="relative mx-auto max-w-7xl lg:grid lg:grid-cols-2 lg:gap-x-12 lg:px-8 z-10 w-full items-center">
                        {/* Texto e info */}
                        <div className="px-6 pb-12 pt-8 sm:pb-16 lg:col-span-1 lg:px-0 lg:pb-24 lg:pt-20 xl:col-span-1">
                            <div className="mx-auto max-w-2xl lg:mx-0">
                                <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20 mb-6">
                                    Para grandes corporaciones
                                </span>
                                <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
                                    Enterprise <span className="text-primary block sm:inline">Unlimited</span>
                                </h2>
                                <p className="mt-6 text-lg leading-8 text-slate-300">
                                    {enterpriseTier.description} Desbloquea todo el potencial con soluciones personalizadas, seguridad de grado bancario y soporte dedicado.
                                </p>
                                <div className="mt-10 flex items-center gap-x-6">
                                    <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-200" onClick={() => window.location.href = "mailto:ventas@fycheo.com"}>
                                        Contactar con Ventas
                                    </Button>
                                    <a href="#features" className="text-sm font-semibold leading-6 text-white hover:text-primary transition-colors">
                                        Más información <span aria-hidden="true">→</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Grid de Features - Corregido para evitar solapamiento */}
                        <div className="lg:col-span-1 border border-white/10 rounded-3xl bg-white/5 p-8 backdrop-blur-sm lg:mt-16 xl:mt-20 shadow-2xl">
                             <ul role="list" className="space-y-6">
                                 {enterpriseTier.features.map((feature) => (
                                    <li key={feature} className="flex gap-x-4">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/20">
                                            <Check className="h-6 w-6 text-primary" aria-hidden="true" />
                                        </div>
                                        <div className="flex-1">
                                            <span className="text-base text-slate-200 font-medium leading-relaxed">{feature}</span>
                                        </div>
                                    </li>
                                 ))}
                            </ul>
                        </div>
                   </div>
                </div>
            </motion.div>
        )}
      </div>
    </div>
  );
};

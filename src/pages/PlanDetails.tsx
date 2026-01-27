import { Check, ArrowLeft } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { motion } from 'framer-motion';

const tiersCompany = [
  {
    name: 'Básico',
    id: 'tier-basic',
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
    priceMonthly: '39€',
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

export const PlanDetails = () => {
  return (
    <div className="min-h-screen bg-background text-white p-8">
      {/* Header Minimalista */}
      <div className="max-w-7xl mx-auto mb-12 flex items-center">
        <button 
            onClick={() => window.close()} 
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
        >
            <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                <ArrowLeft className="w-5 h-5" />
            </div>
            <span className="font-medium">Volver</span>
        </button>
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Comparativa de Planes</h2>
          <p className="mt-4 text-lg text-slate-400">Detalles completos de cada suscripción para tu organización.</p>
        </div>
        
        <div className="isolate mx-auto grid max-w-md grid-cols-1 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 xl:gap-x-12 justify-center">
          {tiersCompany.map((tier, index) => (
            <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
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
                        <span className="text-sm font-semibold leading-6 text-slate-400">/mes</span>
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
                </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

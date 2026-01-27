import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Clock, Calendar, Users, BarChart3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/Button';
import { cn } from '../lib/utils';

import { supabase } from '../lib/supabase';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const location = useLocation();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
        setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cerrar menú móvil al cambiar de ruta
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const features = [
    { name: 'Control Horario', href: '/features/time-tracking', icon: Clock, desc: 'Fichaje multi-dispositivo y geolocalizado' },
    { name: 'Vacaciones y Ausencias', href: '/features/vacations', icon: Calendar, desc: 'Gestión centralizada de equipos' },
    { name: 'Portal del Empleado', href: '/features/portal', icon: Users, desc: 'App móvil para tu equipo' },
    { name: 'Informes y Legal', href: '/features/reports', icon: BarChart3, desc: 'Cumple la normativa 100%' },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b",
        isScrolled
          ? "bg-background-dark/80 backdrop-blur-xl border-white/5 shadow-lg"
          : "bg-transparent border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-light to-purple-400">
              Fycheo
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {!user ? (
                <>
                    <Link to="/" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                    Inicio
                    </Link>

                    {/* Dropdown Features */}
                    <div
                    className="relative group h-20 flex items-center"
                    onMouseEnter={() => setActiveDropdown('features')}
                    onMouseLeave={() => setActiveDropdown(null)}
                    >
                    <button className="flex items-center space-x-1 text-sm font-medium text-slate-300 group-hover:text-white transition-colors focus:outline-none">
                        <span>Funcionalidades</span>
                        <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", activeDropdown === 'features' ? 'rotate-180' : '')} />
                    </button>

                    <AnimatePresence>
                        {activeDropdown === 'features' && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full -left-1/2 w-[480px] bg-surface-dark border border-white/10 rounded-xl shadow-glass overflow-hidden p-4 grid grid-cols-2 gap-2"
                        >
                            {features.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className="flex items-start space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors group/item"
                            >
                                <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover/item:bg-primary group-hover/item:text-white transition-colors">
                                <item.icon className="w-5 h-5" />
                                </div>
                                <div>
                                <p className="text-sm font-bold text-white mb-0.5">{item.name}</p>
                                <p className="text-xs text-slate-400 leading-snug">{item.desc}</p>
                                </div>
                            </Link>
                            ))}
                        </motion.div>
                        )}
                    </AnimatePresence>
                    </div>

                    <Link to="/pricing" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                    Precios
                    </Link>
                    
                    <Link to="/blog" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                    Blog
                    </Link>
                </>
            ) : (
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Link to="/dashboard" className="text-lg font-bold text-white tracking-wide hover:text-primary transition-colors">
                        Panel de Control
                    </Link>
                </div>
            )}
          </div>

          {/* Desktop Menu - Conditional */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
               <div className="flex items-center gap-4">
                   {/* El link Panel de Control se movió al centro */}
                   <Button 
                        variant="secondary"
                        size="sm"
                        className="bg-white/10 hover:bg-white/20 text-white border-0"
                        onClick={async () => {
                            await supabase.auth.signOut();
                            window.location.href = "/";
                        }}
                   >
                     Cerrar Sesión
                   </Button>
               </div>
            ) : (
                <>
                    <Link to="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                    Iniciar Sesión
                    </Link>
                    <Button 
                        variant="primary" 
                        size="md" 
                        className="shadow-glow hover:shadow-glow-lg transition-shadow duration-300"
                        onClick={() => window.location.href = "/register"}
                    >
                    Empezar ahora
                    </Button>
                </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-300 hover:text-white focus:outline-none p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-surface-dark border-b border-white/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              <Link to="/" className="block px-3 py-3 rounded-lg text-base font-medium text-slate-300 hover:text-white hover:bg-white/5">Inicio</Link>
              <div className="py-2">
                <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Funcionalidades</p>
                {features.map((item) => (
                    <Link key={item.name} to={item.href} className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5">
                        <item.icon className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">{item.name}</span>
                    </Link>
                ))}
              </div>
              <Link to="/pricing" className="block px-3 py-3 rounded-lg text-base font-medium text-slate-300 hover:text-white hover:bg-white/5">Precios</Link>
              
              <div className="pt-4 mt-4 border-t border-white/10 flex flex-col space-y-3">
                <Link to="/login" className="block text-center text-slate-300 hover:text-white font-medium">Iniciar Sesión</Link>
                <Button className="w-full" onClick={() => window.location.href = "/register"}>Empezar ahora</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

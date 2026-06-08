import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Clock, Calendar, Users, BarChart3, Smartphone, Building2, FileSpreadsheet, BookOpen, Sparkles, Scale, MessageSquare, ListTodo, FileText, Shield } from 'lucide-react';
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

  if (location.pathname === '/restablecer-contrasena') {
    return null;
  }

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

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const menuProducto = [
    { name: 'Control Horario', href: '/control-horario', icon: Clock, desc: 'Fichaje diario ágil' },
    { name: 'Fichaje Empleados', href: '/fichaje-empleados', icon: Sparkles, desc: 'Métodos de registro' },
    { name: 'Portal del Empleado', href: '/portal-empleado', icon: Users, desc: 'Autogestión de plantilla' },
    { name: 'Vacaciones y Ausencias', href: '/gestion-vacaciones-empleados', icon: Calendar, desc: 'Calendario unificado' },
    { name: 'Nóminas', href: '/nominas-empleados', icon: FileText, desc: 'Distribución y descarga móvil' },
    { name: 'Contratos y Documentos', href: '/contratos-y-documentacion', icon: Shield, desc: 'Expedientes digitales seguros' },
    { name: 'Chat Interno', href: '/chat-interno', icon: MessageSquare, desc: 'Comunicación de equipo' },
    { name: 'Gestión de Tareas', href: '/gestion-tareas-empleados', icon: ListTodo, desc: 'Checklists de jornada' },
    { name: 'Informes', href: '/informes-jornada-laboral', icon: BarChart3, desc: 'Reportes legales PDF/Excel' },
    { name: 'Kiosko de Fichaje', href: '/kiosko-fichaje', icon: Smartphone, desc: 'Tablet común en pared' },
  ];

  const menuSoluciones = [
    { name: 'Control Horario para Pymes', href: '/control-horario-pymes', icon: Building2, desc: 'Para pymes y autónomos' },
    { name: 'Alternativa a Excel', href: '/alternativa-excel-control-horario', icon: FileSpreadsheet, desc: 'Evita errores manuales' },
  ];

  const menuRecursos = [
    { name: 'Blog de RRHH', href: '/blog', icon: BookOpen, desc: 'Artículos y guías de gestión' },
    { name: 'Guía Registro Jornada', href: '/registro-jornada-laboral', icon: Scale, desc: 'Normativa laboral obligatoria' },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b",
        isScrolled
          ? "bg-background-dark/95 backdrop-blur-xl border-white/5 shadow-lg"
          : "bg-transparent border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img src="/brand/logotipo_bg-dark.svg" alt="Fycheo" className="h-8 object-contain" />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {!user ? (
              <>
                <Link to="/" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                  Inicio
                </Link>

                {/* Dropdown Producto */}
                <div
                  className="relative group h-20 flex items-center"
                  onMouseEnter={() => setActiveDropdown('producto')}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className="flex items-center space-x-1 text-sm font-medium text-slate-300 group-hover:text-white transition-colors focus:outline-none">
                    <span>Producto</span>
                    <ChevronDown className={cn("w-3 h-3 transition-transform duration-200", activeDropdown === 'producto' ? 'rotate-180' : '')} />
                  </button>
                  <AnimatePresence>
                    {activeDropdown === 'producto' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full -left-1/2 w-[540px] bg-surface-dark border border-white/10 rounded-xl shadow-glass overflow-hidden p-4 grid grid-cols-2 gap-2"
                      >
                        {menuProducto.map((item) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors group/item"
                          >
                            <div className="p-2 bg-primary/10 rounded-lg text-primary-light group-hover/item:bg-primary group-hover/item:text-white transition-colors">
                              <item.icon className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-white mb-0.5">{item.name}</p>
                              <p className="text-[11px] text-slate-400 leading-snug">{item.desc}</p>
                            </div>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Dropdown Soluciones */}
                <div
                  className="relative group h-20 flex items-center"
                  onMouseEnter={() => setActiveDropdown('soluciones')}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className="flex items-center space-x-1 text-sm font-medium text-slate-300 group-hover:text-white transition-colors focus:outline-none">
                    <span>Soluciones</span>
                    <ChevronDown className={cn("w-3 h-3 transition-transform duration-200", activeDropdown === 'soluciones' ? 'rotate-180' : '')} />
                  </button>
                  <AnimatePresence>
                    {activeDropdown === 'soluciones' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full -left-1/3 w-[360px] bg-surface-dark border border-white/10 rounded-xl shadow-glass overflow-hidden p-4 flex flex-col gap-2"
                      >
                        {menuSoluciones.map((item) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors group/item"
                          >
                            <div className="p-2 bg-primary/10 rounded-lg text-primary-light group-hover/item:bg-primary group-hover/item:text-white transition-colors">
                              <item.icon className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-white mb-0.5">{item.name}</p>
                              <p className="text-[11px] text-slate-400 leading-snug">{item.desc}</p>
                            </div>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Dropdown Recursos */}
                <div
                  className="relative group h-20 flex items-center"
                  onMouseEnter={() => setActiveDropdown('recursos')}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className="flex items-center space-x-1 text-sm font-medium text-slate-300 group-hover:text-white transition-colors focus:outline-none">
                    <span>Recursos</span>
                    <ChevronDown className={cn("w-3 h-3 transition-transform duration-200", activeDropdown === 'recursos' ? 'rotate-180' : '')} />
                  </button>
                  <AnimatePresence>
                    {activeDropdown === 'recursos' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full -left-1/2 w-[480px] bg-surface-dark border border-white/10 rounded-xl shadow-glass overflow-hidden p-4 grid grid-cols-2 gap-2"
                      >
                        {menuRecursos.map((item) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors group/item"
                          >
                            <div className="p-2 bg-primary/10 rounded-lg text-primary-light group-hover/item:bg-primary group-hover/item:text-white transition-colors">
                              <item.icon className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-white mb-0.5">{item.name}</p>
                              <p className="text-[11px] text-slate-400 leading-snug">{item.desc}</p>
                            </div>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link to="/precios" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                  Precios
                </Link>
              </>
            ) : (
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <Link to="/dashboard" className="text-base font-bold text-white tracking-wide hover:text-primary-light transition-colors">
                  Panel de Control
                </Link>
              </div>
            )}
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
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
                  Probar Fycheo
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
            className="md:hidden bg-surface-dark border-b border-white/10 overflow-y-auto max-h-[85vh]"
          >
            <div className="px-4 pt-2 pb-6 space-y-4">
              <Link to="/" className="block px-3 py-2 rounded-lg text-base font-semibold text-slate-300 hover:text-white hover:bg-white/5">Inicio</Link>
              
              <div>
                <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Producto</p>
                <div className="grid grid-cols-1 gap-1">
                  {menuProducto.map((item) => (
                    <Link key={item.name} to={item.href} className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5">
                      <item.icon className="w-4 h-4 text-primary-light" />
                      <span className="text-sm font-medium">{item.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Soluciones</p>
                <div className="grid grid-cols-1 gap-1">
                  {menuSoluciones.map((item) => (
                    <Link key={item.name} to={item.href} className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5">
                      <item.icon className="w-4 h-4 text-primary-light" />
                      <span className="text-sm font-medium">{item.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Recursos</p>
                <div className="grid grid-cols-1 gap-1">
                  {menuRecursos.map((item) => (
                    <Link key={item.name} to={item.href} className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5">
                      <item.icon className="w-4 h-4 text-primary-light" />
                      <span className="text-sm font-medium">{item.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <Link to="/precios" className="block px-3 py-2 rounded-lg text-base font-semibold text-slate-300 hover:text-white hover:bg-white/5">Precios</Link>
              
              <div className="pt-4 border-t border-white/10 flex flex-col space-y-3">
                {user ? (
                  <>
                    <Link to="/dashboard" className="block text-center text-slate-300 hover:text-white font-medium py-2 bg-white/5 rounded-lg">Panel de Control</Link>
                    <Button className="w-full" onClick={async () => {
                      await supabase.auth.signOut();
                      window.location.href = "/";
                    }}>Cerrar Sesión</Button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="block text-center text-slate-300 hover:text-white font-medium py-2">Iniciar Sesión</Link>
                    <Button className="w-full" onClick={() => window.location.href = "/register"}>Probar Fycheo</Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

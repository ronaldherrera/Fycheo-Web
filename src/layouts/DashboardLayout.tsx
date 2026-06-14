import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import {
  LayoutDashboard,
  Building2,
  CreditCard,
  User,
  LogOut,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';
import { cn } from '../lib/utils';

export const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isValidating, setIsValidating] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) {
                    navigate('/login');
                    return;
                }

                setIsValidating(false);
            } catch (err) {
                console.error("Error al validar el rol de usuario:", err);
                await supabase.auth.signOut();
                navigate('/login');
            }
        };

        checkAuth();
    }, [navigate]);

    const navigation = [
        { name: 'Resumen', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Mis Organizaciones', href: '/companies', icon: Building2 },
        { name: 'Facturación', href: '/billing', icon: CreditCard },
        { name: 'Mi Cuenta', href: '/account', icon: User },
    ];

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/');
    };

    if (isValidating) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-background-dark text-white">
                <div className="relative w-16 h-16">
                    <div className="absolute inset-0 rounded-full border-4 border-white/10"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-l-primary border-t-primary animate-spin"></div>
                </div>
                <p className="mt-4 text-slate-400 font-medium animate-pulse">Verificando credenciales...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background-dark flex">
            {/* Sidebar Desktop */}
            <aside 
                className={cn(
                    "hidden md:flex flex-col w-64 border-r border-white/5 bg-surface-dark/50 backdrop-blur-xl fixed h-full transition-all duration-300 z-50",
                    !isSidebarOpen && "w-20"
                )}
            >
                <div className={cn(
                    "h-16 flex items-center border-b border-white/5 shrink-0 transition-all duration-300 relative",
                    isSidebarOpen ? "justify-between px-6" : "justify-center px-0"
                )}>
                    <Link to="/dashboard" className="flex items-center shrink-0 relative">
                        <img 
                            src="https://www.fycheo.es/brand/logotipo_bg-dark.svg" 
                            alt="Fycheo" 
                            className={cn(
                                "h-8 object-contain transition-all duration-300 ease-in-out origin-left",
                                isSidebarOpen ? "opacity-100 max-w-[150px] scale-100" : "opacity-0 max-w-0 scale-90 pointer-events-none overflow-hidden"
                            )} 
                        />
                        <img 
                            src="https://www.fycheo.es/brand/favicon.png" 
                            alt="Fycheo" 
                            className={cn(
                                "h-8 w-8 object-contain transition-all duration-300 ease-in-out origin-center absolute left-1/2 -translate-x-1/2",
                                isSidebarOpen ? "opacity-0 max-w-0 scale-90 pointer-events-none overflow-hidden" : "opacity-100 max-w-[32px] scale-100"
                            )} 
                        />
                    </Link>
                    <button 
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
                        className={cn(
                            "text-slate-400 hover:text-white transition-all duration-300 shrink-0 z-10",
                            isSidebarOpen 
                                ? "absolute right-4 top-1/2 -translate-y-1/2 bg-white/5 hover:bg-white/10 rounded-full p-1 border border-white/5" 
                                : "absolute right-0 translate-x-1/2 top-1/2 -translate-y-1/2 bg-surface-dark border border-white/10 rounded-full p-1 shadow-md hover:bg-white/5 hover:scale-105"
                        )}
                    >
                        <ChevronRight size={isSidebarOpen ? 16 : 14} className={cn("transition-transform duration-300", isSidebarOpen && "rotate-180")} />
                    </button>
                </div>

                <nav className="flex-1 py-6 px-3 space-y-1">
                    {navigation.map((item) => {
                        const isActive = location.pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={cn(
                                    "flex items-center px-3 py-2.5 rounded-lg transition-all group",
                                    isActive 
                                        ? "bg-primary/20 text-white" 
                                        : "text-slate-400 hover:bg-white/5 hover:text-white",
                                    !isSidebarOpen && "justify-center"
                                )}
                            >
                                <item.icon className={cn("w-5 h-5 shrink-0", isActive ? "text-primary" : "group-hover:text-primary transition-colors")} />
                                <span className={cn(
                                    "font-medium transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden text-left flex-1",
                                    isSidebarOpen ? "ml-3 opacity-100 max-w-[150px]" : "ml-0 opacity-0 max-w-0 pointer-events-none"
                                )}>
                                    {item.name}
                                </span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-white/5">
                    <button 
                        onClick={handleLogout}
                        className={cn(
                            "flex items-center w-full px-3 py-2.5 rounded-lg text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors group",
                            !isSidebarOpen && "justify-center"
                        )}
                    >
                        <LogOut className="w-5 h-5 shrink-0" />
                        <span className={cn(
                            "font-medium transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden text-left flex-1",
                            isSidebarOpen ? "ml-3 opacity-100 max-w-[150px]" : "ml-0 opacity-0 max-w-0 pointer-events-none"
                        )}>
                            Cerrar Sesión
                        </span>
                    </button>
                </div>
            </aside>

            {/* Mobile Header & Overlay */}
             <div className="md:hidden fixed top-0 w-full z-50 bg-surface-dark border-b border-white/5 px-4 h-16 flex items-center justify-between">
                <Link to="/dashboard" className="flex items-center">
                    <img src="/brand/logotipo_bg-dark.svg" alt="Fycheo" className="h-8 object-contain" />
                </Link>
                <button onClick={() => setIsSidebarOpen(true)} className="text-white p-2">
                    <Menu />
                </button>
             </div>

             {/* Mobile Sidebar */}
             {isSidebarOpen && (
                <div className="md:hidden fixed inset-0 z-50 flex">
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />
                    <div className="relative w-64 bg-surface-dark h-full shadow-2xl flex flex-col p-4">
                        <div className="flex justify-end mb-4">
                             <button onClick={() => setIsSidebarOpen(false)} className="text-slate-400"><X /></button>
                        </div>
                        <nav className="flex-1 space-y-1">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    onClick={() => setIsSidebarOpen(false)}
                                    className={cn(
                                        "flex items-center px-3 py-3 rounded-lg transition-all",
                                        location.pathname === item.href
                                            ? "bg-primary/20 text-white" 
                                            : "text-slate-400 hover:bg-white/5 hover:text-white"
                                    )}
                                >
                                    <item.icon className="w-5 h-5 mr-3" />
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                         <div className="mt-auto pt-4 border-t border-white/5">
                            <button onClick={handleLogout} className="flex items-center w-full px-3 py-3 text-slate-400 hover:text-red-400">
                                <LogOut className="w-5 h-5 mr-3" /> Cerrar Sesión
                            </button>
                        </div>
                    </div>
                </div>
             )}

            {/* Main Content */}
            <main className={cn(
                "flex-1 transition-all duration-300 p-4 md:p-8 pt-20 md:pt-8 w-full",
                isSidebarOpen ? "md:ml-64" : "md:ml-20"
            )}>
                <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

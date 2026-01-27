import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { 
  LayoutDashboard, 
  Building2, 
  CreditCard, 
  User, 
  LifeBuoy, 
  LogOut, 
  Menu, 
  X,
  ChevronRight
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from '../components/ui/Button';

export const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        supabase.auth.getUser().then(({ data: { user } }) => {
            if (!user) navigate('/login');
            setUser(user);
        });
    }, [navigate]);

    const navigation = [
        { name: 'Resumen', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Mis Organizaciones', href: '/companies', icon: Building2 },
        { name: 'Facturación', href: '/billing', icon: CreditCard }, 
        { name: 'Mi Cuenta', href: '/account', icon: User },
        { name: 'Ayuda', href: '/support', icon: LifeBuoy },
    ];

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-background-dark flex">
            {/* Sidebar Desktop */}
            <aside 
                className={cn(
                    "hidden md:flex flex-col w-64 border-r border-white/5 bg-surface-dark/50 backdrop-blur-xl fixed h-full transition-all duration-300 z-50",
                    !isSidebarOpen && "w-20"
                )}
            >
                <div className="h-16 flex items-center px-6 border-b border-white/5 justify-between">
                    <Link to="/dashboard" className={cn("text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-light to-purple-400 truncate transition-all", !isSidebarOpen && "w-0 opacity-0")}>
                        Fycheo
                    </Link>
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-slate-400 hover:text-white">
                        {isSidebarOpen ? <ChevronRight className="rotate-180" /> : <ChevronRight />}
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
                                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                                )}
                            >
                                <item.icon className={cn("w-5 h-5 shrink-0", isActive ? "text-primary" : "group-hover:text-primary transition-colors")} />
                                <span className={cn("ml-3 font-medium transition-all", !isSidebarOpen && "opacity-0 w-0 hidden")}>
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
                        <span className={cn("ml-3 font-medium transition-all", !isSidebarOpen && "opacity-0 w-0 hidden")}>Cerrar Sesión</span>
                    </button>
                </div>
            </aside>

            {/* Mobile Header & Overlay */}
             <div className="md:hidden fixed top-0 w-full z-50 bg-surface-dark border-b border-white/5 px-4 h-16 flex items-center justify-between">
                <Link to="/dashboard" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-light to-purple-400">
                    Fycheo
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

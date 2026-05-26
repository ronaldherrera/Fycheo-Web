
import { Instagram, Twitter, Linkedin, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
    return (
        <footer className="bg-surface-dark border-t border-white/5 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
                    <div className="lg:col-span-2">
                        <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-light to-purple-400 mb-6 block">
                            Fycheo
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-sm">
                            La plataforma de gestión de RRHH que tu equipo realmente usará. Control horario, vacaciones y gestión de talento en una sola app fácil de usar.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"><Twitter size={18} /></a>
                            <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"><Linkedin size={18} /></a>
                            <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"><Instagram size={18} /></a>
                        </div>
                    </div>
                    
                    <div>
                        <h4 className="text-white font-bold mb-6">Plataforma</h4>
                        <ul className="space-y-3 text-sm text-slate-400">
                            <li><Link to="/features/time-tracking" className="hover:text-primary transition-colors">Control Horario</Link></li>
                            <li><Link to="/features/vacations" className="hover:text-primary transition-colors">Vacaciones y Ausencias</Link></li>
                            <li><Link to="/features/portal" className="hover:text-primary transition-colors">Portal del Empleado</Link></li>
                            <li><Link to="/features/shift-management" className="hover:text-primary transition-colors">Gestión de Turnos</Link></li>
                            <li><Link to="/pricing" className="hover:text-primary transition-colors">Precios</Link></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 className="text-white font-bold mb-6">Recursos</h4>
                         <ul className="space-y-3 text-sm text-slate-400">
                            <li><Link to="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
                            <li><Link to="/help" className="hover:text-primary transition-colors">Centro de Ayuda</Link></li>
                            <li><Link to="/compare" className="hover:text-primary transition-colors">Comparativas</Link></li>
                            <li><Link to="/alternativas/factorial" className="hover:text-primary transition-colors">Alternativa a Factorial</Link></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 className="text-white font-bold mb-6">Legal</h4>
                        <ul className="space-y-3 text-sm text-slate-400">
                            <li><Link to="/legal/privacy" className="hover:text-primary transition-colors">Privacidad</Link></li>
                            <li><Link to="/legal/terms" className="hover:text-primary transition-colors">Términos de Uso</Link></li>
                            <li><Link to="/legal/cookies" className="hover:text-primary transition-colors">Cookies</Link></li>
                            <li><Link to="/legal/security" className="hover:text-primary transition-colors">Seguridad</Link></li>
                        </ul>
                    </div>
                </div>
                
                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
                    <p>
                        © {new Date().getFullYear()} Fycheo. Hecho con <Heart className="inline w-4 h-4 text-red-500 mx-1" /> en España.
                    </p>
                    <div className="mt-4 md:mt-0">
                         <span className="flex items-center space-x-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            <span>Todos los sistemas operativos</span>
                         </span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

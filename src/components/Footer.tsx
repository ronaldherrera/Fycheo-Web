import { Instagram, Twitter, Linkedin, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-surface-dark border-t border-white/5 pt-16 pb-8 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Columna Branding */}
          <div className="lg:col-span-2">
            <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-light to-purple-400 mb-6 block">
              Fycheo
            </Link>
            <p className="text-sm leading-relaxed mb-6 max-w-sm">
              Software sencillo de control horario y fichaje para empresas que quieren cumplir con el registro de jornada sin complicarse en su gestión diaria.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors" aria-label="Twitter"><Twitter size={18} /></a>
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors" aria-label="LinkedIn"><Linkedin size={18} /></a>
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors" aria-label="Instagram"><Instagram size={18} /></a>
            </div>
          </div>
          
          {/* Columna Producto */}
          <div>
            <h4 className="text-white font-bold mb-6 text-sm">Producto</h4>
            <ul className="space-y-3 text-xs">
              <li><Link to="/control-horario" className="hover:text-primary-light transition-colors">Control Horario</Link></li>
              <li><Link to="/fichaje-empleados" className="hover:text-primary-light transition-colors">Fichaje Empleados</Link></li>
              <li><Link to="/portal-empleado" className="hover:text-primary-light transition-colors">Portal del Empleado</Link></li>
              <li><Link to="/gestion-vacaciones-empleados" className="hover:text-primary-light transition-colors">Vacaciones y Ausencias</Link></li>
              <li><Link to="/nominas-empleados" className="hover:text-primary-light transition-colors">Nóminas</Link></li>
              <li><Link to="/contratos-y-documentacion" className="hover:text-primary-light transition-colors">Contratos y Documentos</Link></li>
              <li><Link to="/chat-interno" className="hover:text-primary-light transition-colors">Chat Interno</Link></li>
              <li><Link to="/gestion-tareas-empleados" className="hover:text-primary-light transition-colors">Gestión de Tareas</Link></li>
              <li><Link to="/informes-jornada-laboral" className="hover:text-primary-light transition-colors">Informes de Jornada</Link></li>
              <li><Link to="/kiosko-fichaje" className="hover:text-primary-light transition-colors">Kiosko de Fichaje</Link></li>
            </ul>
          </div>
          
          {/* Columna Soluciones y Comparativas */}
          <div>
            <h4 className="text-white font-bold mb-6 text-sm">Soluciones y Comparativas</h4>
            <ul className="space-y-3 text-xs">
              <li><Link to="/control-horario-pymes" className="hover:text-primary-light transition-colors">Control Horario Pymes</Link></li>
              <li><Link to="/alternativa-excel-control-horario" className="hover:text-primary-light transition-colors">Alternativa a Excel</Link></li>
              <li><Link to="/alternativa-factorial" className="hover:text-primary-light transition-colors">Comparativa con Factorial</Link></li>
              <li><Link to="/alternativa-sesame" className="hover:text-primary-light transition-colors">Comparativa con Sesame</Link></li>
            </ul>
          </div>
          
          {/* Columna Recursos y Legal */}
          <div>
            <h4 className="text-white font-bold mb-6 text-sm">Recursos y Legal</h4>
            <ul className="space-y-3 text-xs">
              <li><Link to="/blog" className="hover:text-primary-light transition-colors">Blog de RRHH</Link></li>
              <li><Link to="/registro-jornada-laboral" className="hover:text-primary-light transition-colors">Guía Registro de Jornada</Link></li>
              <li><Link to="/precios" className="hover:text-primary-light transition-colors">Precios y Tarifas</Link></li>
              <li><Link to="/legal/privacy" className="hover:text-primary-light transition-colors">Política de Privacidad</Link></li>
              <li><Link to="/legal/terms" className="hover:text-primary-light transition-colors">Términos de Uso</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Fila inferior */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} Fycheo. Hecho con <Heart className="inline w-3 h-3 text-red-500 mx-1" /> en España.
          </p>
          <div className="mt-4 md:mt-0 flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            <span>Todos los sistemas operativos activos</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

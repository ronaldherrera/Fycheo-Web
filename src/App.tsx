import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { DashboardLayout } from './layouts/DashboardLayout';

import { Home } from './pages/Home';
import { Precios } from './pages/Precios';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { ResetPassword } from './pages/ResetPassword';
import { Account } from './pages/Account';
import { Dashboard } from './pages/Dashboard';

import { Billing } from './pages/Billing';
import { PlanDetails } from './pages/PlanDetails';
import { Companies } from './pages/Companies';
import { CompaniesSettings } from './pages/CompaniesSettings';

// Nuevas características comerciales
import { ControlHorario } from './pages/features/ControlHorario';
import { SoftwareControlHorario } from './pages/features/SoftwareControlHorario';
import { AppFicharTrabajo } from './pages/features/AppFicharTrabajo';
import { FichajeEmpleados } from './pages/features/FichajeEmpleados';
import { RegistroJornadaLaboral } from './pages/features/RegistroJornadaLaboral';
import { ControlHorarioPymes } from './pages/features/ControlHorarioPymes';
import { PortalEmpleado } from './pages/features/PortalEmpleado';
import { VacacionesEmpleados } from './pages/features/VacacionesEmpleados';
import { InformesJornadaLaboral } from './pages/features/InformesJornadaLaboral';
import { KioskoFichaje } from './pages/features/KioskoFichaje';
import { ChatInterno } from './pages/features/ChatInterno';
import { GestionTareas } from './pages/features/GestionTareas';
import { NominasEmpleados } from './pages/features/NominasEmpleados';
import { Contacto } from './pages/Contacto';
import { GestionDocumental } from './pages/features/GestionDocumental';

// Comparativas
import { AlternativeFactorial } from './pages/comparisons/AlternativeFactorial';
import { AlternativeSesame } from './pages/comparisons/AlternativeSesame';
import { AlternativeExcel } from './pages/comparisons/AlternativeExcel';

// Blog
import { BlogIndex } from './pages/blog/BlogIndex';
import { BlogPost } from './pages/blog/BlogPost';

// Legales
import { Privacy } from './pages/legal/Privacy';
import { Terms } from './pages/legal/Terms';

import { ToastProvider } from './context/ToastContext';
import { ScrollToTop } from './components/ScrollToTop';

function App() {
  return (
    <ToastProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Layout Público */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/precios" element={<Precios />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/restablecer-contrasena" element={<ResetPassword />} />
            
            {/* Nuevas páginas comerciales en español */}
            <Route path="/control-horario" element={<ControlHorario />} />
            <Route path="/software-control-horario" element={<SoftwareControlHorario />} />
            <Route path="/app-fichar-trabajo" element={<AppFicharTrabajo />} />
            <Route path="/fichaje-empleados" element={<FichajeEmpleados />} />
            <Route path="/registro-jornada-laboral" element={<RegistroJornadaLaboral />} />
            <Route path="/control-horario-pymes" element={<ControlHorarioPymes />} />
            <Route path="/portal-empleado" element={<PortalEmpleado />} />
            <Route path="/gestion-vacaciones-empleados" element={<VacacionesEmpleados />} />
            <Route path="/informes-jornada-laboral" element={<InformesJornadaLaboral />} />
            <Route path="/kiosko-fichaje" element={<KioskoFichaje />} />
            <Route path="/chat-interno" element={<ChatInterno />} />
            <Route path="/gestion-tareas-empleados" element={<GestionTareas />} />
            <Route path="/nominas-empleados" element={<NominasEmpleados />} />
            <Route path="/contratos-y-documentacion" element={<GestionDocumental />} />
            <Route path="/contacto" element={<Contacto />} />
            
            {/* Comparativas */}
            <Route path="/alternativa-factorial" element={<AlternativeFactorial />} />
            <Route path="/alternativa-sesame" element={<AlternativeSesame />} />
            <Route path="/alternativa-excel-control-horario" element={<AlternativeExcel />} />
            
            {/* Blog */}
            <Route path="/blog" element={<BlogIndex />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            
            {/* Páginas Legales */}
            <Route path="/legal/privacy" element={<Privacy />} />
            <Route path="/legal/terms" element={<Terms />} />
            
            {/* Redirecciones de compatibilidad y soporte para SEO/Tráfico antiguo */}
            <Route path="pricing" element={<Navigate to="/precios" replace />} />
            <Route path="features/time-tracking" element={<Navigate to="/control-horario" replace />} />
            <Route path="features/vacations" element={<Navigate to="/gestion-vacaciones-empleados" replace />} />
            <Route path="features/portal" element={<Navigate to="/portal-empleado" replace />} />
            <Route path="features/reports" element={<Navigate to="/informes-jornada-laboral" replace />} />
            <Route path="alternativas/factorial" element={<Navigate to="/alternativa-factorial" replace />} />
            <Route path="alternativas/sesame" element={<Navigate to="/alternativa-sesame" replace />} />
            <Route path="features/*" element={<Navigate to="/" replace />} />
          </Route>

          {/* Rutas Independientes (Sin layout estándar) */}
          <Route path="/plan-details" element={<PlanDetails />} />

          {/* Layout Privado (Dashboard) - Mantenido 100% Intacto */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/companies/:companyId" element={<CompaniesSettings />} />
            <Route path="/account" element={<Account />} />
            <Route path="/billing" element={<Billing />} />
          </Route>
          
          {/* Fallback global */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ToastProvider>
  );
}

export default App;

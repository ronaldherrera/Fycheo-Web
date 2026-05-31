import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { DashboardLayout } from './layouts/DashboardLayout';

import { Home } from './pages/Home';
import { Pricing } from './pages/Pricing';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { ResetPassword } from './pages/ResetPassword';
import { Account } from './pages/Account';
import { Dashboard } from './pages/Dashboard';

import { Billing } from './pages/Billing';
import { PlanDetails } from './pages/PlanDetails';
import { Companies } from './pages/Companies';
import { CompaniesSettings } from './pages/CompaniesSettings';

import { TimeTracking } from './pages/features/TimeTracking';
import { Vacations } from './pages/features/Vacations';
import { Portal } from './pages/features/Portal';
import { Reports } from './pages/features/Reports';

import { AlternativeFactorial } from './pages/comparisons/AlternativeFactorial';
import { AlternativeSesame } from './pages/comparisons/AlternativeSesame';

import { BlogIndex } from './pages/blog/BlogIndex';
import { BlogPost } from './pages/blog/BlogPost';

import { Privacy } from './pages/legal/Privacy';
import { Terms } from './pages/legal/Terms';

import { ToastProvider } from './context/ToastContext';

function App() {
  return (
    <ToastProvider>
      <Router>
        <Routes>
          {/* Layout Público */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="restablecer-contraseña" element={<ResetPassword />} />
            <Route path="restablecer-contrasena" element={<ResetPassword />} />
            
            <Route path="features/time-tracking" element={<TimeTracking />} />
            <Route path="features/vacations" element={<Vacations />} />
            <Route path="features/portal" element={<Portal />} />
            <Route path="features/reports" element={<Reports />} />
            
            <Route path="alternativas/factorial" element={<AlternativeFactorial />} />
            <Route path="alternativas/sesame" element={<AlternativeSesame />} />
            
            <Route path="blog" element={<BlogIndex />} />
            <Route path="blog/:id" element={<BlogPost />} />
            
            <Route path="legal/privacy" element={<Privacy />} />
            <Route path="legal/terms" element={<Terms />} />
            
            <Route path="features/*" element={<Home />} /> 
          </Route>

          {/* Rutas Independientes (Sin layout estándar) */}
          <Route path="/plan-details" element={<PlanDetails />} />

          {/* Layout Privado (Dashboard) */}
          <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/companies" element={<Companies />} />
              <Route path="/companies/:companyId" element={<CompaniesSettings />} />
              <Route path="/account" element={<Account />} />
              <Route path="/billing" element={<Billing />} />
          </Route>
        </Routes>
      </Router>
    </ToastProvider>
  )
}

export default App

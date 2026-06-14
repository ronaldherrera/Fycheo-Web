import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { trackSignUp } from '../lib/analytics';
// import { useSearchParams } from 'react-router-dom'; // Eliminado
import { CheckCircle2, AlertCircle, Building2, User, Briefcase, Heart, Eye, EyeOff, Check, X, ChevronDown } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export const Register = () => {
  // const [searchParams] = useSearchParams(); // Ya no se usa
  // const plan = searchParams.get('plan') || 'basic'; // Eliminado
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Password logic
  const [showPassword, setShowPassword] = useState(false);
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    uppercase: false,
    number: false,
    special: false
  });

  useEffect(() => {
    setPasswordRequirements({
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    });
  }, [password]);

  // Nuevos campos
  // Prefijos comunes (se puede ampliar)
  const COUNTRY_CODES = [
    { code: '+34', label: '🇪🇸 +34' },
    { code: '+1', label: '🇺🇸 +1' },
    { code: '+44', label: '🇬🇧 +44' },
    { code: '+33', label: '🇫🇷 +33' },
    { code: '+49', label: '🇩🇪 +49' },
    { code: '+39', label: '🇮🇹 +39' },
    { code: '+351', label: '🇵🇹 +351' },
    { code: '+52', label: '🇲🇽 +52' },
    { code: '+54', label: '🇦🇷 +54' },
    { code: '+57', label: '🇨🇴 +57' },
    { code: '+56', label: '🇨🇱 +56' },
    { code: '+51', label: '🇵🇪 +51' },
  ];

  const [phonePrefix, setPhonePrefix] = useState('+34');
  const [profileType, setProfileType] = useState<'company' | 'freelancer' | 'agency' | 'organization'>('company');
  
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState(''); // Empresa / Marca / Gestoría / ONG
  const [phone, setPhone] = useState('');
  
  // Campos específicos
  const [employeesCount, setEmployeesCount] = useState(''); // Empresa
  const [activitySector, setActivitySector] = useState(''); // Autónomo
  const [clientsCount, setClientsCount] = useState(''); // Gestoría
  const [membersCount, setMembersCount] = useState(''); // Organización

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      setLoading(false);
      return;
    }

    try {
      const fullPhone = `${phonePrefix} ${phone}`;

      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role: 'admin', // Gestor de la cuenta (Web)
            profile_type: profileType,
            full_name: fullName,
            phone: fullPhone,
            
            // Mapeo condicional
            company_name: companyName, // Se usa para todos como nombre de entidad
            
            // Campos específicos
            employees_count: profileType === 'company' ? employeesCount : null,
            activity_sector: profileType === 'freelancer' ? activitySector : null,
            clients_count: profileType === 'agency' ? clientsCount : null,
            members_count: profileType === 'organization' ? membersCount : null,
          }
        }
      });

      if (signUpError) throw signUpError;

      // Cerrar sesión inmediatamente para forzar confirmación de email
      await supabase.auth.signOut();

      if (data.user) {
        trackSignUp(profileType);
        setSuccess(true);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Error al registrarse");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <Card className="max-w-md w-full p-8 text-center space-y-6 border-primary/20 bg-surface-dark/50 backdrop-blur-sm">
          <div className="mx-auto w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center">
             <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-white">¡Cuenta creada!</h2>
          <p className="text-slate-400">
             Tu cuenta ha sido registrada correctamente.
             <br/><br/>
             <span className="font-semibold text-white">Es obligatorio confirmar tu correo electrónico.</span>
             <br/>
             Por favor, revisa tu bandeja de entrada y pulsa en el enlace de confirmación antes de iniciar sesión.
          </p>
          
          <div className="space-y-3">
            <Button 
              className="w-full"
              onClick={() => window.location.href = '/login'}
            >
              Ir a Iniciar Sesión
            </Button>
            
            <Button 
              variant="outline"
              className="w-full border-white/10 text-slate-300 hover:bg-white/5 hover:text-white"
              onClick={() => window.location.href = '/'}
            >
              Volver al Inicio
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center pt-32 pb-12 px-4 sm:px-6 lg:px-8 relative">
       {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-lg pointer-events-none -z-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/20 rounded-full blur-[80px]" />
      </div>

      <Card className="max-w-2xl w-full space-y-8 p-8 border-white/10 bg-surface-dark/80 backdrop-blur-md shadow-2xl">
        <div>
          <h2 className="text-center text-3xl font-bold tracking-tight text-white">
            Crea tu cuenta
          </h2>
          <p className="mt-2 text-center text-sm text-slate-400">
            Empieza a gestionar tu equipo hoy
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium px-4 py-2 rounded-full w-fit mx-auto">
            🎁 <span className="text-slate-300">Recibirás</span> <span className="font-bold text-white">50€ de saldo</span> <span className="text-slate-300">al registrarte</span>
          </div>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleRegister}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Selector de Perfil - Full Width */}
            <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-300 mb-3 text-center md:text-left">
                    ¿Qué tipo de perfil eres?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <button
                        type="button"
                        onClick={() => setProfileType('company')}
                        className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                            profileType === 'company' 
                                ? 'bg-primary/20 border-primary text-white' 
                                : 'bg-white/5 border-transparent text-slate-400 hover:bg-white/10'
                        }`}
                    >
                        <Building2 className="mb-2 h-5 w-5" />
                        <span className="text-xs font-medium">Empresa</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setProfileType('freelancer')}
                        className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                            profileType === 'freelancer' 
                                ? 'bg-primary/20 border-primary text-white' 
                                : 'bg-white/5 border-transparent text-slate-400 hover:bg-white/10'
                        }`}
                    >
                        <User className="mb-2 h-5 w-5" />
                        <span className="text-xs font-medium">Autónomo</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setProfileType('agency')}
                        className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                            profileType === 'agency' 
                                ? 'bg-primary/20 border-primary text-white' 
                                : 'bg-white/5 border-transparent text-slate-400 hover:bg-white/10'
                        }`}
                    >
                        <Briefcase className="mb-2 h-5 w-5" />
                        <span className="text-xs font-medium">Gestoría</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setProfileType('organization')}
                        className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                            profileType === 'organization' 
                                ? 'bg-primary/20 border-primary text-white' 
                                : 'bg-white/5 border-transparent text-slate-400 hover:bg-white/10'
                        }`}
                    >
                        <Heart className="mb-2 h-5 w-5" />
                        <span className="text-xs font-medium">ONG</span>
                    </button>
                </div>
            </div>

            {/* Datos Personales */}
            <div className="md:col-span-1">
              <label htmlFor="full-name" className="block text-sm font-medium text-slate-300">
                Nombre Completo
              </label>
              <input
                id="full-name"
                name="full-name"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-1 block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 px-3"
                placeholder="Juan Pérez"
              />
            </div>
            
            <div className="md:col-span-1">
              <label htmlFor="phone" className="block text-sm font-medium text-slate-300">
                Teléfono
              </label>
              <div className="mt-1 flex rounded-md shadow-sm ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary bg-white/5 overflow-hidden">
                  <div className="relative flex items-center bg-white/5 border-r border-white/10 w-[105px]">
                    <select
                        id="country"
                        name="country"
                        value={phonePrefix}
                        onChange={(e) => setPhonePrefix(e.target.value)}
                        className="h-full w-full appearance-none border-0 bg-transparent py-0 pl-3 pr-8 text-slate-300 focus:ring-0 sm:text-sm [&>option]:bg-slate-900 [&>option]:text-white font-medium"
                    >
                        {COUNTRY_CODES.map((country) => (
                            <option key={country.code} value={country.code}>
                                {country.label}
                            </option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" />
                  </div>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="block w-full flex-1 border-0 bg-transparent py-1.5 pl-3 text-white placeholder:text-slate-500 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="600 000 000"
                  />
              </div>
            </div>

            {/* Datos Entidad */}
            <div className="md:col-span-1">
              <label htmlFor="company-name" className="block text-sm font-medium text-slate-300">
                {profileType === 'company' ? 'Nombre de la Empresa' : 
                 profileType === 'freelancer' ? 'Nombre Comercial (Opcional)' : 
                 profileType === 'agency' ? 'Nombre de la Gestoría' :
                 'Nombre de la Organización'}
              </label>
              <input
                id="company-name"
                name="company-name"
                type="text"
                required={profileType !== 'freelancer'}
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="mt-1 block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 px-3"
                placeholder={
                    profileType === 'agency' ? 'Gestoría López' : 
                    profileType === 'organization' ? 'Asociación...' : 
                    'Mi Empresa S.L.'
                }
              />
            </div>

            {/* Campos Específicos - Ocupan el espacio restante en la fila de entidad */}
             <div className="md:col-span-1">
                {profileType === 'company' && (
                    <>
                      <label htmlFor="employees-count" className="block text-sm font-medium text-slate-300">
                        Número de Empleados
                      </label>
                      <select
                        id="employees-count"
                        name="employees-count"
                        required
                        value={employeesCount}
                        onChange={(e) => setEmployeesCount(e.target.value)}
                        className="mt-1 block w-full rounded-md border-0 bg-white/5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 px-3 [&>option]:bg-slate-900 [&>option]:text-white"
                      >
                        <option value="" disabled>Selecciona una opción</option>
                        <option value="1-10">1 - 10</option>
                        <option value="11-50">11 - 50</option>
                        <option value="51-250">51 - 250</option>
                        <option value="250+">+250</option>
                      </select>
                    </>
                )}

                {profileType === 'freelancer' && (
                    <>
                      <label htmlFor="activity-sector" className="block text-sm font-medium text-slate-300">
                        Sector de Actividad
                      </label>
                      <input
                        id="activity-sector"
                        name="activity-sector"
                        type="text"
                        required
                        value={activitySector}
                        onChange={(e) => setActivitySector(e.target.value)}
                        className="mt-1 block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 px-3"
                        placeholder="Ej. Diseño Gráfico, Abogacía..."
                      />
                    </>
                )}

                {profileType === 'agency' && (
                    <>
                      <label htmlFor="clients-count" className="block text-sm font-medium text-slate-300">
                        Nº de Clientes a Gestionar
                      </label>
                      <select
                        id="clients-count"
                        name="clients-count"
                        required
                        value={clientsCount}
                        onChange={(e) => setClientsCount(e.target.value)}
                        className="mt-1 block w-full rounded-md border-0 bg-white/5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 px-3 [&>option]:bg-slate-900 [&>option]:text-white"
                      >
                        <option value="" disabled>Selecciona cantidad</option>
                        <option value="1-5">1 - 5</option>
                        <option value="6-20">6 - 20</option>
                        <option value="21-50">21 - 50</option>
                        <option value="50+">+50</option>
                      </select>
                    </>
                )}

                {profileType === 'organization' && (
                    <>
                      <label htmlFor="members-count" className="block text-sm font-medium text-slate-300">
                        Nº de Voluntarios / Empleados
                      </label>
                      <select
                        id="members-count"
                        name="members-count"
                        required
                        value={membersCount}
                        onChange={(e) => setMembersCount(e.target.value)}
                        className="mt-1 block w-full rounded-md border-0 bg-white/5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 px-3 [&>option]:bg-slate-900 [&>option]:text-white"
                      >
                        <option value="" disabled>Selecciona una opción</option>
                        <option value="1-20">1 - 20</option>
                        <option value="21-100">21 - 100</option>
                        <option value="100+">+100</option>
                      </select>
                    </>
                )}
            </div>

            {/* Datos Cuenta - Full Width para Email, Split para Password */}
            <div className="md:col-span-2">
              <label htmlFor="email-address" className="block text-sm font-medium text-slate-300">
                Correo electrónico
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 px-3"
                placeholder="tu@email.com"
              />
            </div>

            <div className="md:col-span-1 relative">
              <label htmlFor="password" className="block text-sm font-medium text-slate-300">
                Contraseña
              </label>
              <div className="relative mt-1">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 pr-10 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 px-3"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
              </div>
              
              {/* Checklist de Contraseña */}
              <div className="mt-2 space-y-1">
                <p className="text-xs font-medium text-slate-500 mb-1">La contraseña debe tener:</p>
                <div className="grid grid-cols-2 gap-1">
                    <div className={`flex items-center gap-1 text-xs ${passwordRequirements.length ? 'text-green-500' : 'text-slate-500'}`}>
                        {passwordRequirements.length ? <Check className="w-3 h-3" /> : <div className="w-3 h-3 rounded-full border border-slate-600" />}
                        Mín. 8 caracteres
                    </div>
                    <div className={`flex items-center gap-1 text-xs ${passwordRequirements.uppercase ? 'text-green-500' : 'text-slate-500'}`}>
                        {passwordRequirements.uppercase ? <Check className="w-3 h-3" /> : <div className="w-3 h-3 rounded-full border border-slate-600" />}
                        Mayúscula
                    </div>
                    <div className={`flex items-center gap-1 text-xs ${passwordRequirements.number ? 'text-green-500' : 'text-slate-500'}`}>
                         {passwordRequirements.number ? <Check className="w-3 h-3" /> : <div className="w-3 h-3 rounded-full border border-slate-600" />}
                        Número
                    </div>
                     <div className={`flex items-center gap-1 text-xs ${passwordRequirements.special ? 'text-green-500' : 'text-slate-500'}`}>
                         {passwordRequirements.special ? <Check className="w-3 h-3" /> : <div className="w-3 h-3 rounded-full border border-slate-600" />}
                        Símbolo
                    </div>
                </div>
              </div>
            </div>
            
             <div className="md:col-span-1">
              <label htmlFor="confirm-password" className="block text-sm font-medium text-slate-300">
                Confirmar Contraseña
              </label>
              <div className="relative mt-1">
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 px-3"
                  />
              </div>
              
              {/* Validación Coincidencia */}
              {confirmPassword.length > 0 && (
                <div className={`mt-1.5 flex items-center gap-1.5 text-xs font-medium ${password === confirmPassword ? 'text-green-500' : 'text-red-400'}`}>
                    {password === confirmPassword ? (
                        <>
                            <Check className="w-3 h-3" /> Las contraseñas coinciden
                        </>
                    ) : (
                        <>
                            <X className="w-3 h-3" /> Las contraseñas no coinciden
                        </>
                    )}
                </div>
              )}
            </div>
          </div>

          {error && (
            <div className="rounded-md bg-red-500/10 p-4 ring-1 ring-red-500/50 flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <div>
            <Button
              type="submit"
              className="w-full flex justify-center py-2.5"
              disabled={loading}
              variant="primary"
            >
              {loading ? 'Creando cuenta...' : 'Registrarse y Continuar'}
            </Button>
          </div>
          
          <div className="text-center text-xs text-slate-500">
             Al registrarte aceptas nuestros <a href="#" className="underline hover:text-white">Términos</a> y <a href="#" className="underline hover:text-white">Privacidad</a>.
          </div>
        </form>
      </Card>
    </div>
  );
};

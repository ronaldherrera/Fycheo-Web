import { useState, useEffect, useMemo } from 'react';
import { supabase } from '../lib/supabase';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff, Check, X, AlertCircle, CheckCircle2, ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const origin = searchParams.get('origin'); // "app" u otro valor

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Estados de verificación de la sesión de restablecimiento
  const [isValidating, setIsValidating] = useState(true);
  const [hasSession, setHasSession] = useState(false);

  // Temporizador para redirección automática
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    // 1. Verificar si hay una sesión activa de Supabase
    // Supabase procesa el hash de la URL (access_token) automáticamente al inicializarse.
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setHasSession(true);
      }
      setIsValidating(false);
    };

    // 2. Suscribirse a los cambios de estado de autenticación (por si se demora en procesar)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" || session) {
        setHasSession(true);
      }
      setIsValidating(false);
    });

    checkSession();

    // Pequeño timeout de seguridad por si el hash tarda un poco más en ser procesado por el SDK
    const timer = setTimeout(() => {
      setIsValidating(false);
    }, 1500);

    return () => {
      subscription.unsubscribe();
      clearTimeout(timer);
    };
  }, []);

  // Determinar dinámicamente las URLs de redirección según el entorno
  const urls = useMemo(() => {
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    return {
      app: isLocal ? 'http://localhost:3000' : 'https://app.fycheo.es',
      webLogin: '/login'
    };
  }, []);

  // Iniciar la cuenta atrás tras el éxito si el origen es la App
  useEffect(() => {
    if (success && origin === 'app' && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (success && origin === 'app' && countdown === 0) {
      window.location.href = urls.app;
    }
  }, [success, countdown, origin, urls]);

  // Validaciones de la contraseña
  const passwordRequirements = useMemo(() => {
    return {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
    };
  }, [password]);

  const canSubmit = useMemo(() => {
    const okPass = passwordRequirements.length && passwordRequirements.uppercase && passwordRequirements.number;
    const okConfirm = password === confirmPassword;
    return okPass && okConfirm && !loading && hasSession;
  }, [passwordRequirements, password, confirmPassword, loading, hasSession]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setLoading(true);
    setError(null);

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: password
      });

      if (updateError) throw updateError;

      // Cerrar sesión local en la Web tras restablecer contraseña
      await supabase.auth.signOut();

      setSuccess(true);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Error al actualizar la contraseña. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  if (isValidating) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-white/10"></div>
          <div className="absolute inset-0 rounded-full border-4 border-l-primary border-t-primary animate-spin"></div>
        </div>
        <p className="mt-4 text-slate-400 font-medium animate-pulse">Verificando enlace de recuperación...</p>
      </div>
    );
  }

  if (!hasSession && !success) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-32 pb-12 px-4 sm:px-6 lg:px-8 relative bg-slate-900">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-lg pointer-events-none -z-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-[80px]" />
        </div>

        <Card className="max-w-md w-full p-8 text-center space-y-6 border-red-500/20 bg-surface-dark/80 backdrop-blur-md shadow-2xl">
          <div className="mx-auto w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center">
            <AlertCircle className="w-10 h-10 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-white">Enlace inválido o expirado</h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            El enlace de recuperación de contraseña ha expirado o ya ha sido utilizado.
            Por favor, solicita uno nuevo desde tu aplicación móvil o portal de acceso.
          </p>
          <div className="pt-2 space-y-3">
            <Button
              className="w-full flex justify-center items-center gap-2"
              onClick={() => {
                if (origin === 'app') {
                  window.location.href = urls.app;
                } else {
                  navigate('/login');
                }
              }}
            >
              <span>Volver a Iniciar Sesión</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-32 pb-12 px-4 sm:px-6 lg:px-8 relative bg-slate-900">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-lg pointer-events-none -z-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px]" />
        </div>

        <Card className="max-w-md w-full p-8 text-center space-y-6 border-primary/20 bg-surface-dark/80 backdrop-blur-md shadow-2xl">
          <div className="mx-auto w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-white">Contraseña restablecida</h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Tu contraseña ha sido actualizada con éxito y la sesión anterior ha sido cerrada por seguridad.
          </p>

          {origin === 'app' ? (
            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
              <p className="text-slate-300 text-xs font-medium">
                Redirigiendo de vuelta a la Aplicación de Empleados en...
              </p>
              <div className="text-3xl font-extrabold text-primary mt-2 animate-bounce">
                {countdown}
              </div>
            </div>
          ) : null}

          <div className="space-y-3 pt-2">
            {origin === 'app' ? (
              <Button
                className="w-full flex justify-center items-center gap-2"
                onClick={() => window.location.href = urls.app}
              >
                <span>Abrir Aplicación Móvil</span>
                <ExternalLink className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                className="w-full flex justify-center items-center gap-2"
                onClick={() => navigate('/login')}
              >
                <span>Ir a Iniciar Sesión</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}

            {origin === 'app' && (
              <Button
                variant="outline"
                className="w-full border-white/10 text-slate-300 hover:bg-white/5 hover:text-white"
                onClick={() => navigate('/login')}
              >
                Ir al Panel Web de Administración
              </Button>
            )}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center pt-32 pb-12 px-4 sm:px-6 lg:px-8 relative bg-slate-900">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-lg pointer-events-none -z-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/20 rounded-full blur-[80px]" />
      </div>

      <div className="max-w-md w-full space-y-8">
        <div className="flex flex-col items-center">
          <img src="/fycheo_blanco.svg" alt="Fycheo" className="h-12 w-auto object-contain mb-8" />
          <h2 className="text-center text-3xl font-extrabold text-white">
            Restablecer Contraseña
          </h2>
          <p className="mt-2 text-center text-sm text-slate-400">
            Introduce tu nueva contraseña de acceso a continuación
          </p>
        </div>

        <Card className="p-8 border-white/10 bg-surface-dark/80 backdrop-blur-md shadow-2xl">
          <form className="space-y-6" onSubmit={handleResetPassword}>
            {error && (
              <div className="rounded-md bg-red-500/10 p-4 ring-1 ring-red-500/50 flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-red-400" />
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="new-password" className="block text-sm font-medium text-slate-300">
                Nueva Contraseña
              </label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  id="new-password"
                  name="new-password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 placeholder:text-slate-500"
                  placeholder="Mínimo 8 caracteres"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              {/* Lista de Requisitos de Contraseña */}
              <div className="mt-3 space-y-1">
                <p className="text-xs font-semibold text-slate-500">La contraseña debe tener:</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 pt-1">
                  <div className={`flex items-center gap-1.5 text-xs ${passwordRequirements.length ? 'text-green-500' : 'text-slate-500'}`}>
                    {passwordRequirements.length ? <Check className="w-3.5 h-3.5" /> : <div className="w-3 h-3 rounded-full border border-slate-600" />}
                    Mín. 8 caracteres
                  </div>
                  <div className={`flex items-center gap-1.5 text-xs ${passwordRequirements.uppercase ? 'text-green-500' : 'text-slate-500'}`}>
                    {passwordRequirements.uppercase ? <Check className="w-3.5 h-3.5" /> : <div className="w-3 h-3 rounded-full border border-slate-600" />}
                    Mayúscula
                  </div>
                  <div className={`flex items-center gap-1.5 text-xs ${passwordRequirements.number ? 'text-green-500' : 'text-slate-500'}`}>
                    {passwordRequirements.number ? <Check className="w-3.5 h-3.5" /> : <div className="w-3 h-3 rounded-full border border-slate-600" />}
                    Número
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="confirm-new-password" className="block text-sm font-medium text-slate-300">
                Confirmar Nueva Contraseña
              </label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  id="confirm-new-password"
                  name="confirm-new-password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full pl-10 rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 placeholder:text-slate-500"
                  placeholder="Repite la contraseña"
                />
              </div>

              {confirmPassword.length > 0 && (
                <div className={`mt-2 flex items-center gap-1.5 text-xs font-semibold ${password === confirmPassword ? 'text-green-500' : 'text-red-400'}`}>
                  {password === confirmPassword ? (
                    <>
                      <Check className="w-3.5 h-3.5" /> Las contraseñas coinciden
                    </>
                  ) : (
                    <>
                      <X className="w-3.5 h-3.5" /> Las contraseñas no coinciden
                    </>
                  )}
                </div>
              )}
            </div>

            <div>
              <Button
                type="submit"
                className="w-full flex justify-center items-center"
                disabled={!canSubmit}
                isLoading={loading}
              >
                Restablecer Contraseña
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

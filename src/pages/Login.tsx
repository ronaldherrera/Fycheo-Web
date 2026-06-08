import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Mail, Lock, AlertCircle, CheckCircle2, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isRecovering, setIsRecovering] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    if (isRecovering) {
      try {
        const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        const resetUrl = isLocal
          ? 'http://localhost:3002/restablecer-contrasena'
          : 'https://fycheo.es/restablecer-contrasena';

        const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
          redirectTo: resetUrl,
        });

        if (resetError) throw resetError;

        setSuccessMessage('Si el correo electrónico está registrado, recibirás un enlace para restablecer tu contraseña en unos minutos.');
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Error al enviar el correo de recuperación.');
      } finally {
        setLoading(false);
      }
      return;
    }

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (signInError) throw signInError;

      if (data.user) {
        window.location.href = '/dashboard';
      }
    } catch (err: any) {
      console.error(err);
      setError('Credenciales incorrectas o error al iniciar sesión.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          {isRecovering ? 'Recuperar contraseña' : 'Iniciar sesión en Fycheo'}
        </h2>
        <p className="mt-2 text-center text-sm text-slate-400">
          {isRecovering ? (
            <span>Ingresa tu correo para recibir un enlace de recuperación</span>
          ) : (
            <>
              ¿No tienes cuenta?{' '}
              <Link to="/register" className="font-medium text-primary hover:text-primary-light transition-colors">
                Regístrate gratis
              </Link>
            </>
          )}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="bg-surface-dark py-8 px-4 shadow-glass border-white/10 sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="rounded-md bg-red-500/10 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-400">{error}</h3>
                  </div>
                </div>
              </div>
            )}

            {successMessage && (
              <div className="rounded-md bg-emerald-500/10 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400" aria-hidden="true" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-emerald-400">{successMessage}</h3>
                  </div>
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300">
                Correo electrónico
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-500" aria-hidden="true" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 placeholder:text-slate-500"
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            {!isRecovering && (
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-300">
                  Contraseña
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-500" aria-hidden="true" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-10 rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 placeholder:text-slate-500"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              {!isRecovering ? (
                <>
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-slate-600 bg-white/5 text-primary focus:ring-primary ring-offset-slate-900"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-300">
                      Recordarme
                    </label>
                  </div>

                  <div className="text-sm">
                    <button
                      type="button"
                      onClick={() => {
                        setIsRecovering(true);
                        setError(null);
                        setSuccessMessage(null);
                      }}
                      className="font-medium text-primary hover:text-primary-light transition-colors bg-transparent border-0 outline-none p-0 cursor-pointer"
                    >
                      ¿Olvidaste tu contraseña?
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-sm w-full text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setIsRecovering(false);
                      setError(null);
                      setSuccessMessage(null);
                    }}
                    className="font-medium text-primary hover:text-primary-light transition-colors bg-transparent border-0 outline-none p-0 cursor-pointer"
                  >
                    ¿Ya recuerdas tu contraseña? Iniciar sesión
                  </button>
                </div>
              )}
            </div>

            <div>
              <Button
                type="submit"
                className="w-full flex justify-center py-2 px-4"
                disabled={loading}
              >
                {loading 
                  ? (isRecovering ? 'Enviando...' : 'Iniciando sesión...') 
                  : (isRecovering ? 'Enviar Enlace de Recuperación' : 'Iniciar Sesión')}
                {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

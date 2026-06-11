import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Mail, Building2, User, MessageSquare, CheckCircle2, Phone } from 'lucide-react';

export const Contacto = () => {
  const [form, setForm] = useState({ name: '', email: '', company: '', phone: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    try {
      const { error: dbError } = await supabase.from('contact_messages').insert({
        name: form.name,
        email: form.email,
        company: form.company || null,
        phone: form.phone || null,
        message: form.message || null,
      });

      if (dbError) throw dbError;

      setSent(true);
    } catch {
      setError('Hubo un problema al enviar. Inténtalo de nuevo.');
    } finally {
      setSending(false);
    }
  };

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [k]: e.target.value }));

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-950 py-24 px-6">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-2xl mx-auto text-center">
          <span className="inline-block text-xs font-semibold bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full mb-4">
            Contacto
          </span>
          <h1 className="text-4xl font-black tracking-tight mb-4">
            Hablemos sobre tu empresa
          </h1>
          <p className="text-lg text-slate-400">
            Cuéntanos qué necesitas y te mostramos cómo Fycheo puede ayudarte. Respuesta garantizada en menos de 24h.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">

        {/* Info lateral */}
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-bold mb-2">¿Por qué contactar con nosotros?</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Somos un equipo pequeño y resolvemos personalmente cada consulta. No bots, no respuestas genéricas.
            </p>
          </div>

          {[
            { icon: Mail,      title: 'Respuesta rápida',   desc: 'Te respondemos en menos de 24 horas laborables.' },
            { icon: Building2, title: 'Demo personalizada',  desc: 'Te preparamos una demo con los datos de tu sector.' },
            { icon: Phone,     title: 'Llamada sin compromiso', desc: 'Podemos hablar por teléfono si lo prefieres.' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                <Icon size={18} className="text-primary" />
              </div>
              <div>
                <p className="font-semibold text-sm">{title}</p>
                <p className="text-slate-400 text-sm mt-0.5">{desc}</p>
              </div>
            </div>
          ))}

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-2">También en</p>
            <a href="mailto:hola@fycheo.es" className="text-primary hover:underline text-sm font-medium">
              hola@fycheo.es
            </a>
          </div>
        </div>

        {/* Formulario */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
          {sent ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 py-12 text-center">
              <CheckCircle2 size={48} className="text-emerald-400" />
              <h3 className="text-xl font-bold">¡Mensaje recibido!</h3>
              <p className="text-slate-400 text-sm">
                Nos pondremos en contacto contigo muy pronto.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-400 font-medium flex items-center gap-1.5 mb-1.5">
                    <User size={12} /> Nombre *
                  </label>
                  <input required value={form.name} onChange={set('name')}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-primary/50 transition-colors"
                    placeholder="Tu nombre" />
                </div>
                <div>
                  <label className="text-xs text-slate-400 font-medium flex items-center gap-1.5 mb-1.5">
                    <Building2 size={12} /> Empresa
                  </label>
                  <input value={form.company} onChange={set('company')}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-primary/50 transition-colors"
                    placeholder="Tu empresa" />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-400 font-medium flex items-center gap-1.5 mb-1.5">
                  <Mail size={12} /> Email *
                </label>
                <input required type="email" value={form.email} onChange={set('email')}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-primary/50 transition-colors"
                  placeholder="tu@empresa.com" />
              </div>

              <div>
                <label className="text-xs text-slate-400 font-medium flex items-center gap-1.5 mb-1.5">
                  <Phone size={12} /> Teléfono
                </label>
                <input type="tel" value={form.phone} onChange={set('phone')}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-primary/50 transition-colors"
                  placeholder="+34 600 000 000" />
              </div>

              <div>
                <label className="text-xs text-slate-400 font-medium flex items-center gap-1.5 mb-1.5">
                  <MessageSquare size={12} /> Mensaje
                </label>
                <textarea value={form.message} onChange={set('message')} rows={4}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-primary/50 transition-colors resize-none"
                  placeholder="¿En qué podemos ayudarte?" />
              </div>

              {error && <p className="text-red-400 text-sm">{error}</p>}

              <button type="submit" disabled={sending}
                className="w-full bg-primary hover:bg-primary/90 disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2">
                {sending
                  ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Enviando...</>
                  : 'Enviar mensaje'}
              </button>

              <p className="text-xs text-slate-600 text-center">
                Al enviar aceptas nuestra política de privacidad.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

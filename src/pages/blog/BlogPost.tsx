
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '../../components/ui/Button';

// Mock data fetcher - in real app would use ID
const getPost = (_id: string) => ({
    title: "Nueva Ley de Control Horario 2024: Guía Completa",
    category: "Normativa",
    date: "12 Oct 2024",
    author: "María López",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1200",
    content: `
        <p class="mb-6 font-semibold text-lg text-white">El control horario sigue siendo una asignatura pendiente para muchas empresas españolas. Con las nuevas actualizaciones normativas, es crucial estar al día para evitar sanciones.</p>
        
        <h2 class="text-2xl font-bold text-white mb-4 mt-8">¿Qué cambia en 2024?</h2>
        <p class="mb-4">La Inspección de Trabajo ha endurecido los criterios para considerar válido un registro de jornada. Ya no sirven los cuadrantes hechos a mano en papel con la misma firma repetida.</p>
        <p class="mb-4">Ahora se exige:</p>
        <ul class="list-disc pl-6 mb-6 space-y-2">
            <li>Garantizar la <strong>fiabilidad e invariabilidad</strong> de los datos.</li>
            <li>El registro debe ser <strong>objetivo</strong>.</li>
            <li>Debe estar disponible inmediatamente ante una inspección.</li>
        </ul>

        <h2 class="text-2xl font-bold text-white mb-4 mt-8">Digitalización obligatoria</h2>
        <p class="mb-4">Aunque la ley no prohíbe explícitamente el papel, en la práctica es casi imposible cumplir con los requisitos de invariabilidad y trazabilidad sin un sistema digital.</p>
        
        <div class="bg-primary/10 border-l-4 border-primary p-4 my-8 rounded-r-lg">
            <p class="font-bold text-primary mb-1">Dato Clave</p>
            <p class="text-sm">El 80% de las sanciones por control horario se deben a registros incompletos o manipulables.</p>
        </div>

        <h2 class="text-2xl font-bold text-white mb-4 mt-8">Cómo te ayuda Fycheo</h2>
        <p class="mb-4">Nuestro software está diseñado específicamente para cumplir con el Estatuto de los Trabajadores. Cada fichaje queda registrado y encriptado, garantizando su validez legal.</p>
    `
});

export const BlogPost = () => {
  const { id } = useParams();
  const post = getPost(id || "1");

  return (
    <div className="pt-24 pb-20">
      <article className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <Link to="/blog" className="inline-flex items-center text-slate-400 hover:text-white mb-8 transition-colors">
              <ArrowLeft size={20} className="mr-2" /> Volver al Blog
          </Link>

          {/* Article Header */}
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5 }}
             className="text-center mb-12"
          >
              <div className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-bold mb-6">
                  {post.category}
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  {post.title}
              </h1>
              <div className="flex items-center justify-center text-sm text-slate-400 space-x-6">
                  <span className="flex items-center"><Calendar size={16} className="mr-2" /> {post.date}</span>
                  <span className="flex items-center"><User size={16} className="mr-2" /> {post.author}</span>
              </div>
          </motion.div>

          {/* Featured Image */}
          <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.5, delay: 0.2 }}
             className="aspect-video rounded-3xl overflow-hidden mb-12 shadow-2xl border border-white/5"
          >
              <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </motion.div>

          {/* Content */}
          <div className="grid lg:grid-cols-12 gap-12">
              <div className="lg:col-span-8">
                  <div 
                    className="prose prose-invert prose-lg max-w-none text-slate-300"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
              </div>
              
              {/* Sidebar */}
              <div className="lg:col-span-4 space-y-8">
                  <div className="bg-surface-dark border border-white/5 rounded-2xl p-6 sticky top-24">
                      <h3 className="text-white font-bold mb-4">Compartir</h3>
                      <div className="flex space-x-4 mb-8">
                          <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"><Twitter size={20} /></button>
                          <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"><Linkedin size={20} /></button>
                          <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"><Facebook size={20} /></button>
                          <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"><Share2 size={20} /></button>
                      </div>
                      
                      <div className="border-t border-white/5 pt-6">
                          <h3 className="text-white font-bold mb-2">Prueba Fycheo Hoy</h3>
                          <p className="text-sm text-slate-400 mb-4">Cumple la normativa hoy mismo.</p>
                          <Button className="w-full" onClick={() => window.location.href = "/register"}>Empezar ahora</Button>
                      </div>
                  </div>
              </div>
          </div>
      </article>
    </div>
  );
};

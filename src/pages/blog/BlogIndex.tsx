
import { motion } from 'framer-motion';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const BLOG_POSTS = [
  {
    id: 1,
    title: "Nueva Ley de Control Horario 2024: Guía Completa",
    excerpt: "Todo lo que necesitas saber para cumplir con la normativa y evitar multas de hasta 7.500€.",
    category: "Normativa",
    date: "12 Oct 2024",
    author: "María López",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    title: "Teletrabajo y productividad: ¿Cómo medirlo?",
    excerpt: "Consejos prácticos para gestionar equipos remotos sin caer en el micromanagement.",
    category: "Productividad",
    date: "08 Oct 2024",
    author: "Carlos Ruiz",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1593642632823-8f78536709c6?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    title: "5 Errores comunes al gestionar las vacaciones",
    excerpt: "Evita los conflictos en tu empresa con una mejor planificación de ausencias.",
    category: "Gestión RRHH",
    date: "01 Oct 2024",
    author: "Ana García",
    readTime: "3 min",
    image: "https://images.unsplash.com/photo-1473186578169-214801679f78?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 4,
    title: "Por qué Excel ya no sirve para control horario",
    excerpt: "Los riesgos de seguridad y errores manuales que estás asumiendo sin saberlo.",
    category: "Tecnología",
    date: "25 Sep 2024",
    author: "David M.",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
  }
];

export const BlogIndex = () => {
  return (
    <div className="pt-24 pb-20">
      {/* Header */}
         <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16 text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    Blog de <span className="text-primary">Recursos Humanos</span>
                </h1>
                <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                    Noticias, consejos y estrategias para gestores de equipos modernos.
                </p>
            </motion.div>
         </section>

      {/* Blog Grid */}
         <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                 {BLOG_POSTS.map((post, index) => (
                     <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                     >
                         <Card variant="outline" className="h-full flex flex-col overflow-hidden hover:border-primary/50 transition-colors group p-0">
                             <div className="aspect-video relative overflow-hidden">
                                 <img 
                                    src={post.image} 
                                    alt={post.title} 
                                    className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                                 />
                                 <div className="absolute top-4 left-4 bg-background-dark/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wider border border-white/10">
                                     {post.category}
                                 </div>
                             </div>
                             
                             <div className="p-6 flex-1 flex flex-col">
                                 <div className="flex items-center text-xs text-slate-500 mb-4 space-x-4">
                                     <span className="flex items-center"><Calendar size={14} className="mr-1" /> {post.date}</span>
                                     <span className="flex items-center"><User size={14} className="mr-1" /> {post.author}</span>
                                 </div>
                                 <h2 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                                     <Link to={`/blog/${post.id}`}>{post.title}</Link>
                                 </h2>
                                 <p className="text-sm text-slate-400 mb-6 flex-1 line-clamp-3">
                                     {post.excerpt}
                                 </p>
                                 <Link to={`/blog/${post.id}`} className="inline-flex items-center text-primary font-bold text-sm hover:underline">
                                     Leer artículo <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                 </Link>
                             </div>
                         </Card>
                     </motion.div>
                 ))}
             </div>
             
             <div className="mt-16 text-center">
                 <Button variant="outline" size="lg">Cargar más artículos</Button>
             </div>
         </section>
    </div>
  );
};

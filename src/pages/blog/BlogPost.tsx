import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Share2, Facebook, Twitter, Linkedin, ChevronDown } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { BLOG_POSTS } from '../../data/blogPosts';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { SEOHead } from '../../components/SEOHead';
import { useState, useEffect } from 'react';

export const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const post = BLOG_POSTS.find((p) => p.slug === slug);

  useEffect(() => {
    // Si no se encuentra el post, redirige al listado principal del blog
    if (!post) {
      navigate('/blog', { replace: true });
    }
  }, [post, navigate]);

  if (!post) {
    return null;
  }

  // Schema estructurado BlogPosting para buscadores
  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "datePublished": post.date,
    "dateModified": post.date,
    "author": {
      "@type": "Organization",
      "name": "Fycheo",
      "url": "https://fycheo.es"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Fycheo",
      "logo": {
        "@type": "ImageObject",
        "url": "https://fycheo.es/images/seo/logo-fycheo-schema.png"
      }
    },
    "image": `https://fycheo.es${post.imagePath}`,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://fycheo.es/blog/${post.slug}`
    }
  };

  return (
    <div className="pt-32 pb-20 bg-background-dark min-h-screen text-slate-300">
      <SEOHead
        title={`${post.title} | Blog Fycheo`}
        description={post.excerpt}
        ogType="article"
        jsonLd={blogPostingSchema}
      />

      <article className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <Link to="/blog" className="inline-flex items-center text-slate-400 hover:text-white mb-8 transition-colors text-sm font-medium">
          <ArrowLeft size={16} className="mr-2" /> Volver al Blog
        </Link>

        {/* Article Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary-light text-xs font-bold mb-6 border border-primary/30 uppercase tracking-wider">
            {post.category}
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight max-w-3xl mx-auto">
            {post.title}
          </h1>
          <div className="flex items-center justify-center text-xs text-slate-400 space-x-6">
            <span className="flex items-center"><Calendar size={14} className="mr-2 text-primary-light" /> {post.date}</span>
            <span className="flex items-center"><User size={14} className="mr-2 text-primary-light" /> {post.author}</span>
            <span className="bg-white/5 px-2 py-0.5 rounded text-slate-500">{post.readTime}</span>
          </div>
        </motion.div>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-2xl overflow-hidden mb-12 border border-white/10 shadow-2xl"
        >
          <ImagePlaceholder
            filename={post.imageFilename}
            path={post.imagePath}
            description={post.imageDesc}
            alt={post.imageAlt}
            type="blog"
            aspectRatio="aspect-video"
            className="border-0 rounded-none bg-black/30"
          />
        </motion.div>

        {/* Content & Sidebar Layout */}
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Main Body */}
          <div className="lg:col-span-8 space-y-6">
            <div
              className="prose prose-invert prose-blue max-w-none text-slate-300 leading-relaxed font-body
                prose-headings:text-white prose-headings:font-bold prose-headings:mt-8 prose-headings:mb-4
                prose-h2:text-2xl prose-h3:text-xl
                prose-p:mb-6 prose-p:leading-relaxed
                prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-6 prose-ul:space-y-2
                prose-strong:text-white prose-strong:font-bold
                prose-a:text-primary-light prose-a:font-semibold hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* FAQs del Artículo */}
            {post.faqs && post.faqs.length > 0 && (
              <div className="border-t border-white/10 pt-12 mt-12">
                <h3 className="text-2xl font-bold text-white mb-6">Preguntas frecuentes sobre el tema</h3>
                <div className="space-y-4">
                  {post.faqs.map((faq, i) => (
                    <div key={i} className="border border-white/5 bg-surface-dark rounded-xl overflow-hidden transition-all duration-200">
                      <button
                        className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      >
                        <span className="font-semibold text-slate-200 text-sm">{faq.q}</span>
                        <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 flex-shrink-0 ${openFaq === i ? 'rotate-180' : ''}`} />
                      </button>
                      {openFaq === i && (
                        <div className="px-6 pb-5 pt-2 text-slate-400 text-sm leading-relaxed border-t border-white/5 bg-black/10">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-surface-dark border border-white/5 rounded-2xl p-6 sticky top-24 shadow-xl">
              <h3 className="text-white font-bold mb-4 text-base">Compartir artículo</h3>
              <div className="flex space-x-3 mb-8">
                <button aria-label="Compartir en Twitter" className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors border border-white/5"><Twitter size={18} /></button>
                <button aria-label="Compartir en LinkedIn" className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors border border-white/5"><Linkedin size={18} /></button>
                <button aria-label="Compartir en Facebook" className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors border border-white/5"><Facebook size={18} /></button>
                <button aria-label="Copiar Enlace" className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors border border-white/5"><Share2 size={18} /></button>
              </div>

              <div className="border-t border-white/10 pt-6">
                <span className="text-[10px] font-bold tracking-widest text-primary-light uppercase block mb-1">Pruébalo gratis</span>
                <h3 className="text-white font-bold mb-2 text-lg">Cumple la ley hoy mismo</h3>
                <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                  Automatiza el registro de jornada sin Excels ni papeles. Habilita fichajes desde móvil, web o tablet.
                </p>
                <Button className="w-full shadow-glow hover:shadow-glow-lg transition-shadow" onClick={() => window.location.href = "/register"}>
                  Probar Fycheo Gratis
                </Button>
                <span className="text-[10px] text-slate-500 text-center block mt-3">Prueba de 14 días · Sin tarjeta de crédito</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

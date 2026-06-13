import { motion } from 'framer-motion';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { SEOHead } from '../../components/SEOHead';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import type { BlogPostData } from '../../data/blogPosts';

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const formatBlogDate = (iso: string) => {
  if (!iso) return '';
  const [y, m, d] = iso.split('-').map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
};

const mapRow = (row: any): BlogPostData => ({
  slug:          row.slug,
  title:         row.title,
  excerpt:       row.excerpt,
  category:      row.category,
  date:          formatBlogDate(row.date),
  author:        row.author,
  readTime:      row.read_time,
  imageFilename: row.image_filename,
  imagePath:     row.image_path,
  imageDesc:     row.image_desc,
  imageAlt:      row.image_alt,
  content:       row.content,
  faqs:          row.faqs ?? [],
});

export const BlogIndex = () => {
  const [posts, setPosts] = useState<BlogPostData[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('date', { ascending: false })
      .then(({ data }) => {
        setPosts((data ?? []).map(mapRow));
        setLoading(false);
      });
  }, []);

  const loadMore = () => setVisibleCount(prev => Math.min(prev + 3, posts.length));

  const blogIndexSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Blog de Fycheo",
    "description": "Artículos, guías y noticias sobre control horario, normativa laboral y gestión de equipos para pymes.",
    "publisher": {
      "@type": "Organization",
      "name": "Fycheo",
      "logo": { "@type": "ImageObject", "url": "https://fycheo.es/images/seo/logo-fycheo-schema.png" }
    },
    "blogPost": posts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "datePublished": post.date,
      "author": { "@type": "Organization", "name": "Fycheo" },
      "url": `https://fycheo.es/blog/${post.slug}`
    }))
  };

  if (loading) {
    return (
      <div className="pt-32 pb-20 bg-background-dark min-h-screen text-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 bg-background-dark min-h-screen text-white">
      <SEOHead
        title="Blog de Recursos Humanos y Control Horario | Fycheo"
        description="Recursos, guías y consejos prácticos para pymes y responsables de RRHH sobre control horario, normativa de registro de jornada en España y ausencias."
        jsonLd={blogIndexSchema}
      />

      {/* Header */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-primary font-bold text-xs uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
            Recursos y Guías
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 mt-4">
            Blog de <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-light to-purple-400">Recursos Humanos</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Consejos y estrategias prácticas para empresas que quieren cumplir con el registro de jornada sin dolores de cabeza.
          </p>
        </motion.div>
      </section>

      {/* Blog Grid */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {posts.length === 0 ? (
          <p className="text-center text-slate-500 py-20">No hay artículos publicados todavía.</p>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.slice(0, visibleCount).map((post, index) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                >
                  <Card variant="outline" className="h-full flex flex-col overflow-hidden hover:border-primary/50 transition-colors group p-0 bg-surface-dark border-white/5">
                    <div className="aspect-video relative overflow-hidden">
                      <ImagePlaceholder
                        filename={post.imageFilename}
                        path={post.imagePath}
                        description={post.imageDesc}
                        alt={post.imageAlt}
                        type="blog"
                        aspectRatio="aspect-video"
                        className="border-0 rounded-none bg-black/40"
                      />
                      <div className="absolute top-4 left-4 bg-background-dark/80 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider border border-white/10 z-10">
                        {post.category}
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center text-xs text-slate-500 mb-4 space-x-4">
                        <span className="flex items-center"><Calendar size={14} className="mr-1" /> {post.date}</span>
                        <span className="flex items-center"><User size={14} className="mr-1" /> {post.author}</span>
                      </div>
                      <h2 className="text-xl font-bold text-white mb-3 group-hover:text-primary-light transition-colors leading-tight">
                        <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                      </h2>
                      <p className="text-sm text-slate-400 mb-6 flex-1 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                      <Link to={`/blog/${post.slug}`} className="inline-flex items-center text-primary-light font-bold text-sm hover:text-white transition-colors">
                        Leer artículo <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {visibleCount < posts.length && (
              <div className="mt-16 text-center">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/10 text-white hover:bg-white/5"
                  onClick={loadMore}
                >
                  Cargar más artículos
                </Button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

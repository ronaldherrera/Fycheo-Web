import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  jsonLd?: Record<string, any>;
}

export const SEOHead = ({
  title,
  description,
  canonical,
  ogType = 'website',
  ogImage = 'https://fycheo.es/images/seo/og-fycheo.webp',
  jsonLd,
}: SEOHeadProps) => {
  useEffect(() => {
    // 1. Modificar Title
    document.title = title;

    // 2. Modificar Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // 3. Modificar Canonical Link
    const cleanCanonical = canonical || `https://fycheo.es${window.location.pathname.replace(/\/$/, '') || '/'}`;
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', cleanCanonical);

    // 4. Modificar Open Graph Tags
    const updateOrCreateMeta = (property: string, content: string, isProperty = true) => {
      const attributeName = isProperty ? 'property' : 'name';
      let metaTag = document.querySelector(`meta[${attributeName}="${property}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute(attributeName, property);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', content);
    };

    updateOrCreateMeta('og:title', title);
    updateOrCreateMeta('og:description', description);
    updateOrCreateMeta('og:type', ogType);
    updateOrCreateMeta('og:image', ogImage);
    updateOrCreateMeta('og:url', cleanCanonical);

    // 5. Modificar Twitter Tags
    updateOrCreateMeta('twitter:card', 'summary_large_image', false);
    updateOrCreateMeta('twitter:title', title, false);
    updateOrCreateMeta('twitter:description', description, false);
    updateOrCreateMeta('twitter:image', ogImage, false);

    // 6. Gestionar JSON-LD
    let scriptJsonLd = document.querySelector('script[type="application/ld+json"]#dynamic-seo-jsonld');
    if (scriptJsonLd) {
      scriptJsonLd.remove();
    }

    if (jsonLd) {
      scriptJsonLd = document.createElement('script');
      scriptJsonLd.setAttribute('type', 'application/ld+json');
      scriptJsonLd.setAttribute('id', 'dynamic-seo-jsonld');
      scriptJsonLd.innerHTML = JSON.stringify(jsonLd);
      document.head.appendChild(scriptJsonLd);
    }

    return () => {
      // Limpieza opcional del script JSON-LD dinámico cuando el componente se desmonte
      const scriptToRemove = document.querySelector('script[type="application/ld+json"]#dynamic-seo-jsonld');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [title, description, canonical, ogType, ogImage, jsonLd]);

  return null; // Este componente solo modifica el DOM y no renderiza nada en el layout
};

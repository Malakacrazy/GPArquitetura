/**
 * SEO Hook Module
 *
 * Custom React hook for managing page-level SEO metadata.
 * Dynamically updates document title, meta tags, Open Graph,
 * Twitter Cards, and JSON-LD structured data.
 *
 * @module hooks/useSEO
 * @since 1.0.0
 *
 * Features:
 * - Dynamic document title updates
 * - Meta description and keywords
 * - Canonical URL management
 * - Open Graph protocol support
 * - Twitter Card metadata
 * - JSON-LD structured data injection
 * - Cleanup on component unmount
 *
 * Exports:
 * - useSEO: Main hook for SEO management
 * - SEO_CONFIG: Pre-configured settings per page
 * - createProjectJsonLd: Schema.org CreativeWork generator
 * - createBreadcrumbJsonLd: Schema.org BreadcrumbList generator
 *
 * @example
 * ```tsx
 * import { useSEO, SEO_CONFIG } from '../hooks/useSEO';
 *
 * function AboutPage() {
 *   useSEO(SEO_CONFIG.about);
 *   return <AboutContent />;
 * }
 * ```
 */
import { useEffect } from 'react';

/**
 * SEO properties for page configuration
 */
interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogType?: 'website' | 'article' | 'profile';
  ogImage?: string;
  ogImageAlt?: string;
  noindex?: boolean;
  jsonLd?: Record<string, unknown>;
}

/** Base URL for all canonical and OG URLs */
const BASE_URL = 'https://gparquitetura.vercel.app';
/** Default Open Graph image path */
const DEFAULT_IMAGE = `${BASE_URL}/images/og-image.png`;
/** Site name used in titles and OG tags */
const SITE_NAME = 'GP Arquitetura';

/**
 * React hook for managing page SEO metadata
 *
 * Updates document head with title, meta tags, Open Graph,
 * Twitter Cards, and optional JSON-LD structured data.
 * Cleans up page-specific JSON-LD on unmount.
 *
 * @param props - SEO configuration object
 * @param props.title - Page title (appended with site name)
 * @param props.description - Meta description
 * @param props.keywords - Optional comma-separated keywords
 * @param props.canonical - Optional canonical path (e.g., "/about")
 * @param props.ogType - Open Graph type (default: "website")
 * @param props.ogImage - Open Graph image URL
 * @param props.ogImageAlt - Alt text for OG image
 * @param props.noindex - If true, prevents search indexing
 * @param props.jsonLd - Optional JSON-LD structured data object
 *
 * @example
 * ```tsx
 * useSEO({
 *   title: 'Sobre Nós',
 *   description: 'Conheça a GP Arquitetura...',
 *   canonical: '/about'
 * });
 * ```
 */
export const useSEO = ({
  title,
  description,
  keywords,
  canonical,
  ogType = 'website',
  ogImage = DEFAULT_IMAGE,
  ogImageAlt = 'GP Arquitetura - Escritório de Arquitetura em São Paulo',
  noindex = false,
  jsonLd,
}: SEOProps) => {
  useEffect(() => {
    // Update document title
    const fullTitle = `${title} | ${SITE_NAME}`;
    document.title = fullTitle;

    // Helper function to update or create meta tag
    const setMetaTag = (name: string, content: string, property?: boolean) => {
      const attribute = property ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Helper function to update or create link tag
    const setLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // Primary Meta Tags
    setMetaTag('title', fullTitle);
    setMetaTag('description', description);
    if (keywords) {
      setMetaTag('keywords', keywords);
    }
    setMetaTag('robots', noindex ? 'noindex, nofollow' : 'index, follow');

    // Canonical URL
    const canonicalUrl = canonical ? `${BASE_URL}${canonical}` : BASE_URL;
    setLinkTag('canonical', canonicalUrl);

    // Open Graph
    setMetaTag('og:type', ogType, true);
    setMetaTag('og:url', canonicalUrl, true);
    setMetaTag('og:title', fullTitle, true);
    setMetaTag('og:description', description, true);
    setMetaTag('og:image', ogImage, true);
    setMetaTag('og:image:alt', ogImageAlt, true);
    setMetaTag('og:site_name', SITE_NAME, true);
    setMetaTag('og:locale', 'pt_BR', true);

    // Twitter Card
    setMetaTag('twitter:card', 'summary_large_image', true);
    setMetaTag('twitter:url', canonicalUrl, true);
    setMetaTag('twitter:title', fullTitle, true);
    setMetaTag('twitter:description', description, true);
    setMetaTag('twitter:image', ogImage, true);
    setMetaTag('twitter:image:alt', ogImageAlt, true);

    // JSON-LD Structured Data
    if (jsonLd) {
      // Remove existing JSON-LD for this page
      const existingScript = document.querySelector('script[data-page-jsonld]');
      if (existingScript) {
        existingScript.remove();
      }

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-page-jsonld', 'true');
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    // Cleanup function
    return () => {
      // Remove page-specific JSON-LD on unmount
      const pageScript = document.querySelector('script[data-page-jsonld]');
      if (pageScript) {
        pageScript.remove();
      }
    };
  }, [title, description, keywords, canonical, ogType, ogImage, ogImageAlt, noindex, jsonLd]);
};

/**
 * Pre-configured SEO settings for each page
 *
 * Contains optimized title, description, and keywords for all
 * main pages. Use with useSEO hook for consistent SEO across the site.
 *
 * @example
 * ```tsx
 * useSEO(SEO_CONFIG.home);
 * useSEO(SEO_CONFIG.portfolio);
 * ```
 */
export const SEO_CONFIG = {
  home: {
    title: 'Arquitetura e Design de Interiores em São Paulo',
    description: 'GP Arquitetura é um escritório de arquitetura em São Paulo especializado em projetos residenciais, comerciais e design de interiores. Transformamos espaços com elegância e funcionalidade.',
    keywords: 'arquitetura, design de interiores, arquiteto São Paulo, projeto arquitetônico, GP Arquitetura, Giulia Parente',
    canonical: '/',
  },
  about: {
    title: 'Sobre Nós',
    description: 'Conheça a GP Arquitetura e nossa equipe de profissionais apaixonados por criar espaços únicos e funcionais. Nossa história, valores e compromisso com a excelência em arquitetura.',
    keywords: 'sobre GP Arquitetura, equipe arquitetura, Giulia Parente arquiteta, escritório arquitetura São Paulo',
    canonical: '/about',
  },
  library: {
    title: 'Biblioteca',
    description: 'Explore nossa biblioteca de referências em arquitetura, design de interiores e livros que inspiram nosso trabalho.',
    keywords: 'biblioteca arquitetura, livros design, referências arquitetônicas, inspiração design',
    canonical: '/about/library',
  },
  portfolio: {
    title: 'Portfólio',
    description: 'Explore nosso portfólio de projetos arquitetônicos. Residências, apartamentos, espaços comerciais e projetos de design de interiores desenvolvidos pela GP Arquitetura.',
    keywords: 'portfólio arquitetura, projetos residenciais, projetos comerciais, design interiores, obras arquitetura São Paulo',
    canonical: '/portfolio',
  },
  portfolio3d: {
    title: 'Visualização Arquitetônica',
    description: 'Serviços de renderização e visualização 3D para projetos arquitetônicos. Transforme suas ideias em imagens realistas antes da construção.',
    keywords: 'renderização 3D, visualização arquitetônica, render arquitetura, imagens 3D, tour virtual',
    canonical: '/3d-visualization',
  },
  contact: {
    title: 'Contato',
    description: 'Entre em contato com a GP Arquitetura. Estamos prontos para transformar seu projeto em realidade. Agende uma consulta ou solicite um orçamento.',
    keywords: 'contato arquitetura, orçamento projeto, consulta arquiteto, GP Arquitetura contato',
    canonical: '/contact',
  },
  privacy: {
    title: 'Política de Privacidade',
    description: 'Política de privacidade da GP Arquitetura. Saiba como tratamos seus dados pessoais e protegemos sua privacidade.',
    keywords: 'política privacidade, LGPD, proteção dados, GP Arquitetura',
    canonical: '/privacy',
    noindex: true,
  },
  tos: {
    title: 'Termos de Serviço',
    description: 'Termos de serviço e condições de uso do site GP Arquitetura.',
    keywords: 'termos serviço, condições uso, GP Arquitetura',
    canonical: '/tos',
    noindex: true,
  },
  notFound: {
    title: 'Página Não Encontrada',
    description: 'A página que você está procurando não foi encontrada. Retorne à página inicial da GP Arquitetura.',
    canonical: '/404',
    noindex: true,
  },
};

/**
 * Creates JSON-LD structured data for a project
 *
 * Generates Schema.org CreativeWork markup for portfolio projects.
 * Improves search engine understanding of project content.
 *
 * @param project - Project data object
 * @param project.name - Project name/title
 * @param project.description - Project description
 * @param project.image - Featured image URL
 * @param project.slug - URL slug for the project
 * @param project.category - Project category/type
 * @param project.datePublished - Optional ISO date string
 * @returns JSON-LD object for Schema.org CreativeWork
 *
 * @example
 * ```tsx
 * const jsonLd = createProjectJsonLd({
 *   name: 'Casa Alphaville',
 *   description: 'Residência contemporânea...',
 *   image: '/images/casa-alphaville.jpg',
 *   slug: 'casa-alphaville',
 *   category: 'Residencial'
 * });
 * useSEO({ ...config, jsonLd });
 * ```
 */
export const createProjectJsonLd = (project: {
  name: string;
  description: string;
  image: string;
  slug: string;
  category: string;
  datePublished?: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: project.name,
  description: project.description,
  image: project.image,
  url: `${BASE_URL}/portfolio/${project.slug}`,
  author: {
    '@type': 'Organization',
    name: 'GP Arquitetura',
  },
  datePublished: project.datePublished || new Date().toISOString().split('T')[0],
  genre: project.category,
  isPartOf: {
    '@type': 'WebSite',
    name: 'GP Arquitetura',
    url: BASE_URL,
  },
});

/**
 * Creates JSON-LD breadcrumb structured data
 *
 * Generates Schema.org BreadcrumbList markup for navigation.
 * Helps search engines understand site hierarchy.
 *
 * @param items - Array of breadcrumb items
 * @param items[].name - Display name for the breadcrumb
 * @param items[].url - Relative URL path
 * @returns JSON-LD object for Schema.org BreadcrumbList
 *
 * @example
 * ```tsx
 * const breadcrumbs = createBreadcrumbJsonLd([
 *   { name: 'Home', url: '/' },
 *   { name: 'Portfólio', url: '/portfolio' },
 *   { name: 'Casa Alphaville', url: '/portfolio/casa-alphaville' }
 * ]);
 * ```
 */
export const createBreadcrumbJsonLd = (items: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `${BASE_URL}${item.url}`,
  })),
});

export default useSEO;

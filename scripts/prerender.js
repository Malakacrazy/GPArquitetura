import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'fs';
import { resolve, dirname } from 'path';

// Routes to prerender
const routes = [
  '/',
  '/about',
  '/about/library',
  '/portfolio',
  '/3d-visualization',
  '/contact',
  '/privacy',
  '/tos'
];

// Base HTML template with proper meta tags for each route
const routeMetadata = {
  '/': {
    title: 'Studio Araci | Arquitetura e Design de Interiores em São Paulo',
    description: 'Studio Araci é um escritório de arquitetura em São Paulo especializado em projetos residenciais, comerciais e design de interiores. Transformamos espaços com elegância e funcionalidade.',
    image: '/images/hero-bg.webp'
  },
  '/about': {
    title: 'Sobre Studio Araci | Nossa História e Filosofia',
    description: 'Conheça a história, filosofia e equipe da Studio Araci. Descubra como transformamos sonhos em realidade através de projetos arquitetônicos únicos.',
    image: '/images/hero-about-us-bg.webp'
  },
  '/about/library': {
    title: 'Biblioteca | Studio Araci',
    description: 'Explore nossa biblioteca de recursos, materiais e inspirações arquitetônicas da Studio Araci.',
    image: '/images/hero-about-us-bg.webp'
  },
  '/portfolio': {
    title: 'Portfólio | Projetos Studio Araci',
    description: 'Veja nosso portfólio completo de projetos residenciais e comerciais. Conheça o trabalho da Studio Araci em São Paulo.',
    image: '/images/hero-portfolio-bg.webp'
  },
  '/3d-visualization': {
    title: 'Renderização 3D | Visualização Arquitetônica | Studio Araci',
    description: 'Serviços profissionais de renderização 3D e visualização arquitetônica. Veja seus projetos ganhar vida antes mesmo da construção.',
    image: '/images/hero-3drendering-bg.webp'
  },
  '/contact': {
    title: 'Contato | Studio Araci',
    description: 'Entre em contato com a Studio Araci. Vamos conversar sobre seu próximo projeto arquitetônico em São Paulo.',
    image: '/images/hero-contact-bg.webp'
  },
  '/privacy': {
    title: 'Política de Privacidade | Studio Araci',
    description: 'Leia nossa política de privacidade e saiba como protegemos seus dados.',
    image: '/images/og-image.png'
  },
  '/tos': {
    title: 'Termos de Serviço | Studio Araci',
    description: 'Leia nossos termos de serviço e condições de uso.',
    image: '/images/og-image.png'
  }
};

function generateHTML(route, scriptTags, cssTags) {
  const metadata = routeMetadata[route];
  const canonicalUrl = `https://studioaraci.com.br${route}`;

  return `<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-WRK33L84');</script>
    <!-- End Google Tag Manager -->

    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- Primary Meta Tags -->
    <title>${metadata.title}</title>
    <meta name="title" content="${metadata.title}" />
    <meta name="description" content="${metadata.description}" />
    <meta name="keywords" content="arquitetura, design de interiores, arquiteto São Paulo, projeto arquitetônico, renderização 3D, visualização arquitetônica, Studio Araci, Giulia Parente, arquitetura residencial, arquitetura comercial, reforma, decoração" />
    <meta name="author" content="Studio Araci - Giulia Parente" />
    <meta name="robots" content="index, follow" />
    <meta name="language" content="Portuguese" />
    <meta name="revisit-after" content="7 days" />
    <meta name="distribution" content="global" />
    <meta name="rating" content="general" />

    <!-- Canonical URL -->
    <link rel="canonical" href="${canonicalUrl}" />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:title" content="${metadata.title}" />
    <meta property="og:description" content="${metadata.description}" />
    <meta property="og:image" content="https://studioaraci.com.br${metadata.image}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="Studio Araci - Escritório de Arquitetura em São Paulo" />
    <meta property="og:site_name" content="Studio Araci" />
    <meta property="og:locale" content="pt_BR" />

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="${canonicalUrl}" />
    <meta property="twitter:title" content="${metadata.title}" />
    <meta property="twitter:description" content="${metadata.description}" />
    <meta property="twitter:image" content="https://studioaraci.com.br${metadata.image}" />
    <meta property="twitter:image:alt" content="Studio Araci - Escritório de Arquitetura em São Paulo" />

    <!-- Favicon -->
    <link rel="icon" type="image/ico" href="/favicon.ico" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="manifest" href="/site.webmanifest" />
    <meta name="theme-color" content="#9F4F39" />
    <meta name="msapplication-TileColor" content="#9F4F39" />

    <!-- Preconnect to important third-party origins -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="preconnect" href="https://www.googletagmanager.com" />
    <link rel="preconnect" href="https://cdn.sanity.io" />

    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;0,6..96,600;1,6..96,400&family=Italiana&family=Poppins:ital,wght@0,200;0,300;0,400;0,500;0,600;1,300;1,400&display=swap" rel="stylesheet" />

    <!-- Bing Webmaster Tools Verification -->
    <meta name="msvalidate.01" content="2A614E064AB65E6EFA77A9FB7A4F4FA3" />

    <!-- Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-BWV35TXN66"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-BWV35TXN66');
    </script>

    <!-- Hotjar / Contentsquare Tracking -->
    <script src="https://t.contentsquare.net/uxa/146c09594161b.js" async></script>

    <!-- JSON-LD Structured Data -->
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "ArchitecturalBusiness",
        "name": "Studio Araci",
        "alternateName": "Studio Araci - Giulia Parente",
        "url": "https://studioaraci.com.br",
        "logo": "https://studioaraci.com.br/favicon.ico",
        "description": "Studio Araci é um escritório de arquitetura em São Paulo especializado em projetos residenciais, comerciais e design de interiores.",
        "image": "https://studioaraci.com.br/images/og-image.png",
        "telephone": "+55-11-94773-9339",
        "email": "giuliaparente@studioaraci.com.br",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "São Paulo",
          "addressLocality": "São Paulo",
          "addressRegion": "SP",
          "postalCode": "01001-000",
          "addressCountry": "BR"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": -23.5505,
          "longitude": -46.6333
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "09:00",
          "closes": "18:00"
        },
        "sameAs": [
          "https://www.instagram.com/giuliaparente_arquitetura",
          "https://www.linkedin.com/in/giulia-parente",
          "https://www.pinterest.com/giuliaparentearq"
        ],
        "priceRange": "$$",
        "areaServed": {
          "@type": "Country",
          "name": "Brasil"
        }
      }
    </script>
    ${scriptTags}
    ${cssTags}

    <!-- Crawler-visible content -->
    <noscript>
      <h1>${metadata.title}</h1>
      <p>${metadata.description}</p>
      <p>Para melhor experiência, por favor habilite JavaScript em seu navegador.</p>
    </noscript>
  </head>

  <body>
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WRK33L84"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->

    <div id="root"></div>
  </body>
</html>
`;
}

async function prerender() {
  console.log('🚀 Starting prerendering process...\n');

  const distPath = resolve(process.cwd(), 'build');

  if (!existsSync(distPath)) {
    console.error('❌ Error: build directory does not exist. Run build first.');
    process.exit(1);
  }

  // Read the built index.html to extract script and CSS tags
  const builtIndexPath = resolve(distPath, 'index.html');
  const builtIndexHtml = readFileSync(builtIndexPath, 'utf-8');

  // Extract CSS link tags (stylesheet with href to /assets/)
  const cssRegex = /<link[^>]*rel="stylesheet"[^>]*href="\/assets\/[^"]*"[^>]*>/g;
  const cssMatches = builtIndexHtml.match(cssRegex) || [];
  const cssTags = cssMatches.join('\n    ');

  // Extract module script tags (with src to /assets/)
  const scriptRegex = /<script[^>]*type="module"[^>]*src="\/assets\/[^"]*"[^>]*><\/script>/g;
  const scriptMatches = builtIndexHtml.match(scriptRegex) || [];
  const scriptTags = scriptMatches.join('\n    ');

  console.log(`📦 Found ${cssMatches.length} CSS files and ${scriptMatches.length} script files\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const route of routes) {
    try {
      const html = generateHTML(route, scriptTags, cssTags);

      // Determine output path
      let outputPath;
      if (route === '/') {
        outputPath = resolve(distPath, 'index.html');
      } else {
        const routePath = resolve(distPath, route.substring(1));
        if (!existsSync(routePath)) {
          mkdirSync(routePath, { recursive: true });
        }
        outputPath = resolve(routePath, 'index.html');
      }

      writeFileSync(outputPath, html, 'utf-8');
      console.log(`✅ Prerendered: ${route} → ${outputPath}`);
      successCount++;
    } catch (error) {
      console.error(`❌ Error prerendering ${route}:`, error.message);
      errorCount++;
    }
  }

  console.log(`\n📊 Prerendering complete:`);
  console.log(`   ✅ Success: ${successCount} routes`);
  if (errorCount > 0) {
    console.log(`   ❌ Errors: ${errorCount} routes`);
  }
  console.log();
}

prerender().catch(error => {
  console.error('❌ Prerendering failed:', error);
  process.exit(1);
});

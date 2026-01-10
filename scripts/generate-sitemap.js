import { createClient } from '@sanity/client';
import { writeFileSync } from 'fs';
import { resolve } from 'path';

// Initialize Sanity client
const client = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID || 'dffchnvy',
  dataset: process.env.VITE_SANITY_DATASET || 'production',
  apiVersion: process.env.VITE_SANITY_API_VERSION || '2024-01-01',
  useCdn: false,
});

const BASE_URL = 'https://gparquitetura.vercel.app';

// Helper function to get current ISO 8601 date with timezone
function getCurrentDate() {
  return new Date().toISOString();
}

// Helper function to escape XML special characters
function escapeXml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Static pages with their priorities, change frequencies, and images
const staticPages = [
  {
    loc: '/',
    priority: 1.0,
    changefreq: 'weekly',
    lastmod: getCurrentDate(),
    image: {
      loc: '/images/hero-bg.webp',
      title: 'GP Arquitetura - Home'
    }
  },
  {
    loc: '/about',
    priority: 0.9,
    changefreq: 'monthly',
    lastmod: getCurrentDate(),
    image: {
      loc: '/images/hero-about-us-bg.webp',
      title: 'Sobre GP Arquitetura'
    }
  },
  {
    loc: '/about/library',
    priority: 0.7,
    changefreq: 'monthly',
    lastmod: getCurrentDate()
  },
  {
    loc: '/portfolio',
    priority: 0.9,
    changefreq: 'weekly',
    lastmod: getCurrentDate(),
    image: {
      loc: '/images/hero-portfolio-bg.webp',
      title: 'Portfólio GP Arquitetura'
    }
  },
  {
    loc: '/3d-visualization',
    priority: 0.8,
    changefreq: 'weekly',
    lastmod: getCurrentDate(),
    image: {
      loc: '/images/hero-3drendering-bg.webp',
      title: 'Renderização 3D - GP Arquitetura'
    }
  },
  {
    loc: '/contact',
    priority: 0.8,
    changefreq: 'monthly',
    lastmod: getCurrentDate(),
    image: {
      loc: '/images/hero-contact-bg.webp',
      title: 'Contato - GP Arquitetura'
    }
  },
  {
    loc: '/privacy',
    priority: 0.3,
    changefreq: 'yearly',
    lastmod: getCurrentDate()
  },
  {
    loc: '/tos',
    priority: 0.3,
    changefreq: 'yearly',
    lastmod: getCurrentDate()
  },
];

async function generateSitemap() {
  let projects = [];

  try {
    console.log('Fetching projects from Sanity...');

    // Fetch all projects with _updatedAt timestamp
    projects = await client.fetch(`
      *[_type == "project"] {
        "slug": slug.current,
        _updatedAt
      }
    `);

    console.log(`Found ${projects.length} projects`);
  } catch (sanityError) {
    console.warn('⚠️  Warning: Could not fetch projects from Sanity:', sanityError.message);
    console.log('Continuing with static pages only...');
    projects = [];
  }

  try {

    // Build sitemap XML
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
`;

    // Add static pages
    staticPages.forEach(page => {
      const pageName = page.loc === '/' ? 'Homepage' : page.loc.split('/').filter(Boolean).pop() || 'Page';
      sitemap += `
  <!-- ${pageName.charAt(0).toUpperCase() + pageName.slice(1)} -->
  <url>
    <loc>${BASE_URL}${page.loc}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>`;

      // Add image if available
      if (page.image) {
        sitemap += `
    <image:image>
      <image:loc>${BASE_URL}${page.image.loc}</image:loc>
      <image:title>${escapeXml(page.image.title)}</image:title>
    </image:image>`;
      }

      sitemap += `
  </url>
`;
    });

    // Add dynamic project pages
    if (projects.length > 0) {
      sitemap += `
  <!-- Portfolio Projects -->
`;
      projects.forEach(project => {
        if (!project.slug) return; // Skip projects without slug

        const lastmod = project._updatedAt
          ? new Date(project._updatedAt).toISOString()
          : getCurrentDate();

        sitemap += `  <url>
    <loc>${BASE_URL}/portfolio/${encodeURI(project.slug)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`;
      });
    }

    sitemap += `
</urlset>
`;

    // Write sitemap to public directory
    const sitemapPath = resolve(process.cwd(), 'public', 'sitemap.xml');
    writeFileSync(sitemapPath, sitemap, 'utf-8');

    console.log(`✅ Sitemap generated successfully at ${sitemapPath}`);
    console.log(`   - ${staticPages.length} static pages`);
    console.log(`   - ${projects.length} portfolio projects`);
    console.log(`   - Total: ${staticPages.length + projects.length} URLs`);

  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
}


generateSitemap();

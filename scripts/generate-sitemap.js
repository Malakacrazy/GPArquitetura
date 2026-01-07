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

// Static pages with their priorities and change frequencies
const staticPages = [
  { loc: '/', priority: 1.0, changefreq: 'weekly', lastmod: new Date().toISOString().split('T')[0] },
  { loc: '/about', priority: 0.9, changefreq: 'monthly', lastmod: new Date().toISOString().split('T')[0] },
  { loc: '/about/library', priority: 0.7, changefreq: 'monthly', lastmod: new Date().toISOString().split('T')[0] },
  { loc: '/portfolio', priority: 0.9, changefreq: 'weekly', lastmod: new Date().toISOString().split('T')[0] },
  { loc: '/3d-visualization', priority: 0.8, changefreq: 'weekly', lastmod: new Date().toISOString().split('T')[0] },
  { loc: '/contact', priority: 0.8, changefreq: 'monthly', lastmod: new Date().toISOString().split('T')[0] },
  { loc: '/privacy', priority: 0.3, changefreq: 'yearly', lastmod: new Date().toISOString().split('T')[0] },
  { loc: '/tos', priority: 0.3, changefreq: 'yearly', lastmod: new Date().toISOString().split('T')[0] },
];

async function generateSitemap() {
  try {
    console.log('Fetching projects from Sanity...');

    // Fetch all projects with _updatedAt timestamp
    const projects = await client.fetch(`
      *[_type == "project"] {
        "slug": slug.current,
        _updatedAt
      }
    `);

    console.log(`Found ${projects.length} projects`);

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
      sitemap += `
  <!-- ${page.loc === '/' ? 'Homepage' : page.loc.split('/').pop()} -->
  <url>
    <loc>${BASE_URL}${page.loc}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
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
          ? new Date(project._updatedAt).toISOString().split('T')[0]
          : new Date().toISOString().split('T')[0];

        sitemap += `  <url>
    <loc>${BASE_URL}/portfolio/${project.slug}</loc>
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

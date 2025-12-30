/**
 * Centralized asset configuration
 *
 * All media assets are stored in the /public folder and served via Vercel CDN.
 * To update an asset, replace the file in /public and update the path here if needed.
 *
 * Benefits of Vercel CDN:
 * - Automatic global CDN distribution
 * - Image optimization (when using next/image or Vercel's image optimization)
 * - Faster load times with edge caching
 * - No external dependencies on Wix/other CDNs
 */

// Base path for assets (empty string for Vercel, can be changed for other deployments)
const ASSET_BASE = '';

// =============================================================================
// IMAGES
// =============================================================================

export const images = {
  // Hero section
  hero: {
    portfolio: {
      background: `${ASSET_BASE}/images/hero-portfolio-bg.webp`,
    },
  },
} as const;

// =============================================================================
// VIDEOS
// =============================================================================

export const videos = {
  // Navigation menu background video
  navigationBackground: {
    mp4: `${ASSET_BASE}/videos/nav-bg.mp4`,
    webm: `${ASSET_BASE}/videos/nav-bg.webm`,
  },

  // Footer background video
  footerBackground: {
    mp4: `${ASSET_BASE}/videos/footer-bg.mp4`,
    webm: `${ASSET_BASE}/videos/footer-bg.webm`,
  },
} as const;

// =============================================================================
// ICONS (External CDN - Flaticon)
// These can remain external or be downloaded to /public/icons/
// =============================================================================

export const icons = {
  menu: 'https://cdn-icons-png.flaticon.com/512/13726/13726126.png',
  arrow: 'https://cdn-icons-png.flaticon.com/512/9219/9219998.png',
  whatsapp: 'https://cdn-icons-png.flaticon.com/512/3741/3741717.png',
  email: 'https://cdn-icons-png.flaticon.com/512/3894/3894024.png',
  location: 'https://cdn-icons-png.flaticon.com/512/3894/3894030.png',
  instagram: 'https://cdn-icons-png.flaticon.com/512/3741/3741664.png',
  linkedin: 'https://cdn-icons-png.flaticon.com/512/3741/3741677.png',
  pinterest: 'https://cdn-icons-png.flaticon.com/512/3741/3741684.png',
} as const;

// =============================================================================
// PRELOAD LISTS (for Loader component)
// =============================================================================

export const preloadImages = [
  images.hero.portfolio.background,
];

export const preloadVideos = [
  videos.navigationBackground.mp4,
  videos.footerBackground.mp4,
];
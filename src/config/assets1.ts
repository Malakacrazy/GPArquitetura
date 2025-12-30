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
  hero: {
    notFound: {
      src: `${ASSET_BASE}/images/hero-notFound-bg.webp`,
      alt: 'Modern interior architecture',
    },
  },
} as const;

// =============================================================================
// PRELOAD LISTS (for Loader component)
// =============================================================================

export const preloadImages = [
  images.hero.notFound.src,
];

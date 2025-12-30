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
    aboutus: {
      background: `${ASSET_BASE}/images/hero-about-us-bg.webp`,
    },
  },

  // Team section
  team: {
    giuliaparente: {
      photo: `${ASSET_BASE}/images/team/giuliaparente.webp`,
      poster: `${ASSET_BASE}/images/team/giuliaparente.webp`,
    },
  },

  // Library section - Book covers
  books: [
    {
      id: 1,
      title: 'Emotional Design: Why We Love (or Hate) Everyday Things',
      description: 'A philosophical exploration of how architecture influences our well-being and emotions, examining the deep connection between built environments and human psychology.',
      image: `${ASSET_BASE}/images/books/emotional-design.webp`,
      link: 'https://empty-shaky-74405936.figma.site',
    },
    {
      id: 2,
      title: 'Joyful: The Surprising Power of Ordinary Things to Create Extraordinary Happiness',
      description: "Peter Zumthor's reflections on the sensory and emotional power of architecture, emphasizing materiality, atmosphere, and the poetics of space.",
      image: `${ASSET_BASE}/images/books/joyful.webp`,
      link: 'https://empty-shaky-74405936.figma.site',
    },
    {
      id: 3,
      title: 'Neuroarquitetura: Projetando ambientes para os desafios contemporâneos',
      description: 'An innovative look at modern architectural theory, challenging conventional design wisdom and exploring the psychological underpinnings of spatial design.',
      image: `${ASSET_BASE}/images/books/neuroarquitetura.webp`,
      link: 'https://empty-shaky-74405936.figma.site',
    },
    {
      id: 4,
      title: 'Neuroarquitetura: a neurociência no ambiente construído',
      description: "Jane Jacobs' groundbreaking work on urban planning, advocating for vibrant, diverse neighborhoods and critiquing modernist urban renewal.",
      image: `${ASSET_BASE}/images/books/neuroarquitetura-neurociencia.webp`,
      link: 'https://empty-shaky-74405936.figma.site',
    },
    {
      id: 5,
      title: 'Manual do Arquiteto Descalço',
      description: "Jun'ichirō Tanizaki's meditation on Japanese aesthetics, exploring the beauty of darkness, subtlety, and restraint in architecture and design.",
      image: `${ASSET_BASE}/images/books/descalco.webp`,
      link: 'https://empty-shaky-74405936.figma.site',
    },
    {
      id: 6,
      title: 'The Eyes of the Skin: Architecture and the Senses',
      description: 'Exploring minimalist principles in architecture, this book demonstrates how simplicity and restraint create powerful, timeless spaces.',
      image: `${ASSET_BASE}/images/books/eyes-of-the-skin.webp`,
      link: 'https://empty-shaky-74405936.figma.site',
    },
  ],
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

  // Team member profile video
  team: {
    giuliaparente: {
      mp4: `${ASSET_BASE}/videos/team/giuliaparente.mp4`,
      webm: `${ASSET_BASE}/videos/team/giuliaparente.webm`,
    },
  },

  // Library section background video
  library: {
    mp4: `${ASSET_BASE}/videos/library-bg.mp4`,
    webm: `${ASSET_BASE}/videos/library-bg.webm`,
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

  // Expertise/statistics icons
  projects: 'https://cdn-icons-png.flaticon.com/512/3926/3926012.png',
  awards: 'https://cdn-icons-png.flaticon.com/512/3926/3926113.png',
  satisfaction: 'https://cdn-icons-png.flaticon.com/512/3926/3926067.png',
} as const;

// =============================================================================
// PRELOAD LISTS (for Loader component or performance optimization)
// =============================================================================

export const preloadImages = [
  images.hero.aboutus.background,
  images.team.giuliaparente.photo,
  ...images.books.map(book => book.image),
];

export const preloadVideos = [
  videos.navigationBackground.mp4,
  videos.team.giuliaparente.mp4,
  videos.library.mp4,
  videos.footerBackground.mp4,
];
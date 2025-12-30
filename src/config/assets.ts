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
    rendering: {
      background: `${ASSET_BASE}/images/hero-3drendering-bg.webp`,
    },
  },

  // OurExpertise carousel images
  ourExpertise: {
    interiorRendering: `${ASSET_BASE}/images/expertise-interior-rendering.webp`,
    exteriorRendering: `${ASSET_BASE}/images/expertise-exterior-rendering.webp`,
    virtualTour: `${ASSET_BASE}/images/expertise-virtual-tour.webp`,
    productBrand: `${ASSET_BASE}/images/expertise-product-brand.webp`,
  },

  // CaseStudies gallery images
  caseStudies: {
    row1: {
      aerialCampus: `${ASSET_BASE}/images/case-aerial-campus.webp`,
      coupleBalcony: `${ASSET_BASE}/images/case-couple-balcony.webp`,
    },
    row2: {
      bedroomPatio: `${ASSET_BASE}/images/case-bedroom-patio.webp`,
      modernKitchen: `${ASSET_BASE}/images/case-modern-kitchen.webp`,
      bedroomCity: `${ASSET_BASE}/images/case-bedroom-city.webp`,
    },
    row3: {
      skyscraper: `${ASSET_BASE}/images/case-skyscraper.webp`,
      forestHouse: `${ASSET_BASE}/images/case-forest-house.webp`,
    },
    row4: {
      apartmentEntrance: `${ASSET_BASE}/images/case-apartment-entrance.webp`,
      apartmentBuilding: `${ASSET_BASE}/images/case-apartment-building.webp`,
      luxuryInterior: `${ASSET_BASE}/images/case-luxury-interior.webp`,
    },
  },

  // HowItWorks section images
  howItWorks: {
    technicalSpec: `${ASSET_BASE}/images/how-technical-spec.webp`,
    workProcess: `${ASSET_BASE}/images/how-work-process.webp`,
    preview1: `${ASSET_BASE}/images/how-preview-1.webp`,
    preview2: `${ASSET_BASE}/images/how-preview-2.webp`,
    finalRenders: `${ASSET_BASE}/images/how-final-renders.webp`,
  },
} as const;

// =============================================================================
// VIDEOS
// =============================================================================

export const videos = {
  // Hero section background video
  heroRenderingBackground: {
    mp4: `${ASSET_BASE}/videos/hero-3drendering-bg.mp4`,
    webm: `${ASSET_BASE}/videos/hero-3drendering-bg.webm`,
  },

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

  // OurExpertise architectural animation video
  expertiseAnimation: {
    mp4: `${ASSET_BASE}/videos/expertise-animation.mp4`,
    webm: `${ASSET_BASE}/videos/expertise-animation.webm`,
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
  images.hero.rendering.background,
  // OurExpertise
  images.ourExpertise.interiorRendering,
  images.ourExpertise.exteriorRendering,
  images.ourExpertise.virtualTour,
  images.ourExpertise.productBrand,
  // CaseStudies - row 1
  images.caseStudies.row1.aerialCampus,
  images.caseStudies.row1.coupleBalcony,
  // CaseStudies - row 2
  images.caseStudies.row2.bedroomPatio,
  images.caseStudies.row2.modernKitchen,
  images.caseStudies.row2.bedroomCity,
  // CaseStudies - row 3
  images.caseStudies.row3.skyscraper,
  images.caseStudies.row3.forestHouse,
  // CaseStudies - row 4
  images.caseStudies.row4.apartmentEntrance,
  images.caseStudies.row4.apartmentBuilding,
  images.caseStudies.row4.luxuryInterior,
  // HowItWorks
  images.howItWorks.technicalSpec,
  images.howItWorks.workProcess,
  images.howItWorks.preview1,
  images.howItWorks.preview2,
  images.howItWorks.finalRenders,
];

export const preloadVideos = [
  videos.heroRenderingBackground.mp4,
  videos.navigationBackground.mp4,
  videos.footerBackground.mp4,
  videos.expertiseAnimation.mp4,
];
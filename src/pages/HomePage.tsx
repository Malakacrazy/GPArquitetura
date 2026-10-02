/**
 * HomePage
 *
 * Main landing page for GP Arquitetura. Features a full loading
 * experience with animated sunflower loader, followed by multiple
 * sections showcasing the studio's work and philosophy.
 *
 * @module pages/HomePage
 * @since 1.0.0
 * @route /
 *
 * Page Sections:
 * 1. Loader - Animated sunflower progress indicator
 * 2. Hero - Full-screen introduction with background image
 * 3. WhatWeDo - Services with animated card carousel
 * 4. ProjectsSection - Scroll-driven curtain reveal
 * 5. ProcessSection - Six-step workflow explanation
 * 6. FeaturedWorks - Featured projects carousel
 * 7. Footer - Contact information and links
 *
 * Loading Behavior:
 * - Loader shows during initial asset preload
 * - Navigation appears after loading completes
 * - All sections render immediately (hidden behind loader)
 *
 * SEO:
 * - Uses SEO_CONFIG.home for meta tags
 * - Primary landing page with highest priority
 *
 * @example
 * ```tsx
 * // Route definition in App.tsx
 * <Route path="/" element={<HomePage />} />
 * ```
 */
import { lazy, Suspense, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { Loader } from '../components/home/Loader';
import { Navigation } from '../components/shared/Navigation';
import { Hero } from '../components/home/Hero';
const WhatWeDo = lazy(() => import('../components/home/WhatWeDo').then((m) => ({ default: m.WhatWeDo })));
const ProjectsSection = lazy(() => import('../components/home/ProjectsSection').then((m) => ({ default: m.ProjectsSection })));
const ProcessSection = lazy(() => import('../components/home/ProcessSection').then((m) => ({ default: m.ProcessSection })));
const FeaturedWorks = lazy(() => import('../components/home/FeaturedWorks').then((m) => ({ default: m.FeaturedWorks })));
const Footer = lazy(() => import('../components/shared/Footer').then((m) => ({ default: m.Footer })));
import { useSEO, SEO_CONFIG } from '../hooks/useSEO';

/**
 * Renders the main homepage with loader and all sections
 *
 * @returns Homepage JSX element
 */
export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  // Apply SEO settings for Home page
  useSEO(SEO_CONFIG.home);

  return (
    <div className="page_wrap bg-[var(--color-background)] min-h-screen w-full font-sans selection:bg-[var(--color-primary)] selection:text-white">
      <AnimatePresence>
        {isLoading && <Loader onLoadingComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && <Navigation />}
      <Hero />
      {/* Below-the-fold sections load in separate chunks (keeps Sanity, react-slick out of the initial bundle) */}
      <Suspense fallback={<div className="min-h-screen" aria-hidden="true" />}>
        <WhatWeDo />
        <ProjectsSection />
        <ProcessSection />
        <FeaturedWorks />
        <Footer />
      </Suspense>
    </div>
  );
}

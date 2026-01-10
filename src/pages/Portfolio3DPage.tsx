/**
 * Portfolio3DPage
 *
 * 3D visualization and rendering services page. Showcases the studio's
 * capabilities in architectural visualization with case studies,
 * process explanation, and FAQ section.
 *
 * @module pages/Portfolio3DPage
 * @since 1.0.0
 * @route /3d-visualization
 *
 * Page Sections:
 * 1. Loader - Animated loading screen
 * 2. Hero - Full-screen video/image introduction
 * 3. OurExpertise - Service categories and capabilities
 * 4. OurVision - Design philosophy for 3D work
 * 5. CaseStudies - Portfolio of 3D rendering projects
 * 6. HowItWorks - Step-by-step process explanation
 * 7. FAQ - Frequently asked questions accordion
 *
 * Loading Behavior:
 * - Shows loader during asset preload
 * - Navigation appears after loading
 *
 * SEO:
 * - Custom OG image for 3D visualization
 * - Two-level breadcrumb (Home > Visualização 3D)
 *
 * @example
 * ```tsx
 * // Route definition in App.tsx
 * <Route path="/3d-visualization" element={<Portfolio3DPage />} />
 * ```
 */
import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { Loader } from '../components/portfolio3d/Loader';
import { Navigation } from '../components/shared/Navigation';
import { Hero } from '../components/portfolio3d/Hero';
import { OurExpertise } from '../components/portfolio3d/OurExpertise';
import { OurVision } from '../components/portfolio3d/OurVision';
import { CaseStudies } from '../components/portfolio3d/CaseStudies';
import { HowItWorks } from '../components/portfolio3d/HowItWorks';
import { FAQ } from '../components/portfolio3d/FAQ';
import { Footer } from '../components/shared/Footer';
import { useSEO, SEO_CONFIG, createBreadcrumbJsonLd } from '../hooks/useSEO';

/**
 * Renders the 3D visualization services page
 *
 * @returns 3D portfolio page JSX element
 */
export default function Portfolio3DPage() {
  const [isLoading, setIsLoading] = useState(true);

  // Apply SEO settings for 3D Visualization page
  useSEO({
    ...SEO_CONFIG.portfolio3d,
    ogImage: 'https://gparquitetura.vercel.app/images/hero-3drendering-bg.webp',
    jsonLd: createBreadcrumbJsonLd([
      { name: 'Home', url: '/' },
      { name: 'Visualização 3D', url: '/3d-visualization' },
    ]),
  });

  return (
    <div className="page_wrap bg-[var(--color-background)] min-h-screen w-full font-sans selection:bg-[var(--color-primary)] selection:text-white">
      <AnimatePresence>
        {isLoading && <Loader onLoadingComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && <Navigation />}
      <Hero />
      <OurExpertise />
      <OurVision />
      <CaseStudies />
      <HowItWorks />
      <FAQ />
      <Footer />
    </div>
  );
}

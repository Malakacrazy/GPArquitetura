/**
 * AboutPage
 *
 * The "About Us" page showcasing the studio's story, team, expertise,
 * and architectural reference library. Introduces visitors to the
 * people and philosophy behind GP Arquitetura.
 *
 * @module pages/AboutPage
 * @since 1.0.0
 * @route /about
 *
 * Page Sections:
 * 1. Hero - Full-screen introduction
 * 2. AboutUs - Studio philosophy and approach
 * 3. OurTeam - Team member profiles with videos
 * 4. OurExpertise - Skills and specializations
 * 5. Bookshelf - Architectural reference library preview
 * 6. WorkWithUs - Call to action / contact prompt
 *
 * SEO:
 * - Dynamic meta tags via useSEO hook
 * - Breadcrumb structured data (Home > Sobre Nós)
 *
 * @example
 * ```tsx
 * // Route definition in App.tsx
 * <Route path="/about" element={<AboutPage />} />
 * ```
 */
import { Navigation } from '../components/shared/Navigation';
import { Hero } from '../components/about/Hero';
import { AboutUs } from '../components/about/AboutUs';
import { OurTeam } from '../components/about/OurTeam';
import { OurExpertise } from '../components/about/OurExpertise';
import { Bookshelf } from '../components/about/Bookshelf';
import { WorkWithUs } from '../components/about/WorkWithUs';
import { Footer } from '../components/shared/Footer';
import { useSEO, SEO_CONFIG, createBreadcrumbJsonLd } from '../hooks/useSEO';

/**
 * Renders the About page with all sections
 *
 * @returns About page JSX element
 */
export default function AboutPage() {
  // Apply SEO settings for About page
  useSEO({
    ...SEO_CONFIG.about,
    jsonLd: createBreadcrumbJsonLd([
      { name: 'Home', url: '/' },
      { name: 'Sobre Nós', url: '/about' },
    ]),
  });

  return (
    <div className="page_wrap bg-[var(--color-background)] min-h-screen w-full font-sans selection:bg-[var(--color-primary)] selection:text-white">
      <Navigation />
      <Hero />
      <AboutUs />
      <OurTeam />
      <OurExpertise />
      <Bookshelf />
      <WorkWithUs />
      <Footer />
    </div>
  );
}

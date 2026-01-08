/**
 * PortfolioPage
 *
 * Main portfolio listing page displaying all architectural projects.
 * Supports both grid and list view modes with data fetched from Sanity CMS.
 *
 * @module pages/PortfolioPage
 * @since 1.0.0
 * @route /portfolio
 *
 * Features:
 * - Grid/List view toggle
 * - Projects fetched from Sanity CMS via useProjects hook
 * - Masonry grid layout in grid view
 * - Horizontal cards in list view
 * - Loading and error states
 * - Back to top button
 *
 * Data Flow:
 * 1. useProjects() fetches from Sanity
 * 2. adaptSanityProjects() transforms data for grid component
 * 3. ProjectsGridView or ProjectsListView renders based on toggle
 *
 * SEO:
 * - Dynamic meta tags via useSEO hook
 * - Breadcrumb structured data (Home > Portfólio)
 * - Custom OG image
 *
 * @example
 * ```tsx
 * // Route definition in App.tsx
 * <Route path="/portfolio" element={<PortfolioPage />} />
 * ```
 */
import { useState } from 'react';
import { Hero } from '../components/portfolio/Hero';
import { Navigation } from '../components/shared/Navigation';
import { GridList } from '../components/portfolio/GridList';
import { ProjectsGridView } from '../components/portfolio/ProjectsGridView';
import { ProjectsListView } from '../components/portfolio/ProjectsListView';
import { Footer } from '../components/shared/Footer';
import { BackToTop } from '../components/portfolio/BackToTop';
import { useProjects } from '../hooks/useProjects';
import { adaptSanityProjects } from '../utils/sanityAdapter';
import { useSEO, SEO_CONFIG, createBreadcrumbJsonLd } from '../hooks/useSEO';

/**
 * Renders the Portfolio listing page with grid/list toggle
 *
 * @returns Portfolio page JSX element
 */
export default function PortfolioPage() {
  const [isGridView, setIsGridView] = useState(true);
  const { projects: sanityProjects, loading, error } = useProjects();

  // Apply SEO settings for Portfolio page
  useSEO({
    ...SEO_CONFIG.portfolio,
    ogImage: 'https://gparquitetura.vercel.app/images/hero-portfolio-bg.webp',
    jsonLd: createBreadcrumbJsonLd([
      { name: 'Home', url: '/' },
      { name: 'Portfólio', url: '/portfolio' },
    ]),
  });

  // Convert Sanity projects to grid format
  const projects = adaptSanityProjects(sanityProjects);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)]">
        <p className="text-xl">Loading projects...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)]">
        <p className="text-xl text-red-500">Error loading projects. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-background)' }}>
      <Navigation />
      <Hero />
      <GridList isGridView={isGridView} setIsGridView={setIsGridView} />
      
      {isGridView ? (
        <ProjectsGridView projects={projects} />
      ) : (
        <ProjectsListView projects={projects} />
      )}
      
      <Footer />
      <BackToTop />
    </div>
  );
}

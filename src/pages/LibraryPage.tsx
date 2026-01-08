/**
 * LibraryPage
 *
 * Architectural reference library page showcasing curated books that
 * inspire the studio's design philosophy. Features detailed book
 * information with parallax image galleries.
 *
 * @module pages/LibraryPage
 * @since 1.0.0
 * @route /about/library
 *
 * Page Structure:
 * - Navigation header
 * - Title section with page introduction
 * - BookShowcase - Individual book components with slideshows
 * - Footer with contact info
 * - Back to top button
 *
 * Books Featured:
 * - 6 curated architectural reference books
 * - Each with cover image, description, and image gallery
 * - Parallax scrolling effects on images
 *
 * SEO:
 * - Three-level breadcrumb (Home > Sobre Nós > Biblioteca)
 * - Library-specific meta tags
 *
 * @example
 * ```tsx
 * // Route definition in App.tsx
 * <Route path="/about/library" element={<LibraryPage />} />
 * ```
 */
import { Navigation } from '../components/shared/Navigation';
import { Title } from '../components/library/Title';
import { BookShowcase } from '../components/library/BookShowcase';
import { Footer } from '../components/shared/Footer';
import { BackToTop } from "../components/library/BackToTop";
import { useSEO, SEO_CONFIG, createBreadcrumbJsonLd } from '../hooks/useSEO';

/**
 * Renders the architectural reference library page
 *
 * @returns Library page JSX element
 */
export default function LibraryPage() {
  // Apply SEO settings for Library page
  useSEO({
    ...SEO_CONFIG.library,
    jsonLd: createBreadcrumbJsonLd([
      { name: 'Home', url: '/' },
      { name: 'Sobre Nós', url: '/about' },
      { name: 'Biblioteca', url: '/about/library' },
    ]),
  });

  return (
    <div className="page_wrap bg-[var(--color-background)] min-h-screen w-full font-sans selection:bg-[var(--color-primary)] selection:text-white">
      <Navigation />
      <Title />
      <BookShowcase />
      <Footer />
      <BackToTop />
    </div>
  );
}

/**
 * NotFoundPage (404)
 *
 * Error page displayed when users navigate to a non-existent route.
 * Provides a friendly message and navigation back to the home page.
 *
 * @module pages/NotFoundPage
 * @since 1.0.0
 * @route /* (catch-all for undefined routes)
 *
 * Page Structure:
 * - NotFoundContent - Error message with home link
 *
 * SEO:
 * - Custom meta tags for 404 page
 * - noindex directive to prevent search indexing
 *
 * @example
 * ```tsx
 * // Route definition in App.tsx (catch-all route)
 * <Route path="*" element={<NotFoundPage />} />
 * ```
 */
import { NotFoundContent } from "../components/404/NotFoundContent";
import { useSEO, SEO_CONFIG } from '../hooks/useSEO';

/**
 * Renders the 404 Not Found error page
 *
 * @returns 404 page JSX element
 */
export default function NotFoundPage() {
  // Apply SEO settings for 404 page
  useSEO(SEO_CONFIG.notFound);

  return (
    <div className="page_wrap bg-[var(--color-background)] min-h-screen w-full font-sans selection:bg-[var(--color-primary)] selection:text-white">
      <NotFoundContent />
    </div>
  );
}

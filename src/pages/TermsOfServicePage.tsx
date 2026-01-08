/**
 * TermsOfServicePage
 *
 * Legal page displaying the studio's terms of service and usage conditions.
 * Outlines the contractual agreement between the studio and website visitors.
 *
 * @module pages/TermsOfServicePage
 * @since 1.0.0
 * @route /terms-of-service
 *
 * Page Structure:
 * - Navigation header
 * - ToS - Full terms of service content
 *
 * Legal Sections:
 * - Service description and scope
 * - User obligations and restrictions
 * - Intellectual property rights
 * - Limitation of liability
 * - Governing law (Brazilian jurisdiction)
 *
 * SEO:
 * - Terms-specific meta tags
 * - Standard indexing allowed
 *
 * @example
 * ```tsx
 * // Route definition in App.tsx
 * <Route path="/terms-of-service" element={<TermsOfServicePage />} />
 * ```
 */
import { Navigation } from "../components/shared/Navigation";
import { ToS } from "../components/legal/ToS";
import { useSEO, SEO_CONFIG } from '../hooks/useSEO';

/**
 * Renders the terms of service legal page
 *
 * @returns Terms of service page JSX element
 */
export default function TermsOfServicePage() {
  // Apply SEO settings for Terms of Service page
  useSEO(SEO_CONFIG.tos);

  return (
    <div className="page_wrap bg-[var(--color-background)] min-h-screen w-full font-sans selection:bg-[var(--color-primary)] selection:text-white">
      <Navigation />
      <ToS />
    </div>
  );
}

/**
 * PrivacyPolicyPage
 *
 * Legal page displaying the studio's privacy policy and data handling
 * practices. Required for LGPD (Brazilian data protection law) compliance.
 *
 * @module pages/PrivacyPolicyPage
 * @since 1.0.0
 * @route /privacy-policy
 *
 * Page Structure:
 * - Navigation header
 * - PrivacyPolicy - Full privacy policy content
 *
 * Legal Sections:
 * - Data collection practices
 * - Cookie usage policy
 * - User rights under LGPD
 * - Contact information for data requests
 *
 * SEO:
 * - Privacy-specific meta tags
 * - Standard indexing allowed
 *
 * @example
 * ```tsx
 * // Route definition in App.tsx
 * <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
 * ```
 */
import { Navigation } from "../components/shared/Navigation";
import { PrivacyPolicy } from "../components/legal/PrivacyPolicy";
import { useSEO, SEO_CONFIG } from '../hooks/useSEO';

/**
 * Renders the privacy policy legal page
 *
 * @returns Privacy policy page JSX element
 */
export default function PrivacyPolicyPage() {
  // Apply SEO settings for Privacy Policy page
  useSEO(SEO_CONFIG.privacy);

  return (
    <div className="page_wrap bg-[var(--color-background)] min-h-screen w-full font-sans selection:bg-[var(--color-primary)] selection:text-white">
      <Navigation />
      <PrivacyPolicy />
    </div>
  );
}

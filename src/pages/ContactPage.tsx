/**
 * ContactPage
 *
 * Contact information page with email and WhatsApp links.
 * Features a full-screen hero with large typography contact details.
 *
 * @module pages/ContactPage
 * @since 1.0.0
 * @route /contact
 *
 * Page Structure:
 * - Navigation header
 * - ContactText - Hero section with email and WhatsApp
 * - ContactFooter - Additional links and information
 *
 * Contact Methods:
 * - Email (mailto link)
 * - WhatsApp (API link with phone number)
 *
 * SEO:
 * - Custom OG image for contact page
 * - Two-level breadcrumb (Home > Contato)
 *
 * @example
 * ```tsx
 * // Route definition in App.tsx
 * <Route path="/contact" element={<ContactPage />} />
 * ```
 */
import { Navigation } from '../components/shared/Navigation';
import { ContactText } from '../components/contact/ContactText';
import { ContactFooter } from '../components/contact/ContactFooter';
import { useSEO, SEO_CONFIG, createBreadcrumbJsonLd } from '../hooks/useSEO';

/**
 * Renders the contact page with email and WhatsApp links
 *
 * @returns Contact page JSX element
 */
export default function ContactPage() {
  // Apply SEO settings for Contact page
  useSEO({
    ...SEO_CONFIG.contact,
    ogImage: 'https://gparquitetura.vercel.app/images/hero-contact-bg.webp',
    jsonLd: createBreadcrumbJsonLd([
      { name: 'Home', url: '/' },
      { name: 'Contato', url: '/contact' },
    ]),
  });

  return (
    <div className="page_wrap min-h-screen w-full font-sans selection:bg-[var(--color-primary)] selection:text-[var(--color-white)]">
      <Navigation />
      <ContactText>
        <ContactFooter />
      </ContactText>
    </div>
  );
}

import { Navigation } from '../components/shared/Navigation';
import { ContactText } from '../components/contact/ContactText';
import { ContactFooter } from '../components/contact/ContactFooter';
import { useSEO, SEO_CONFIG, createBreadcrumbJsonLd } from '../hooks/useSEO';

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

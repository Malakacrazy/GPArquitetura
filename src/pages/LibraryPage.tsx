import { Navigation } from '../components/shared/Navigation';
import { Title } from '../components/library/Title';
import { BookShowcase } from '../components/library/BookShowcase';
import { Footer } from '../components/shared/Footer';
import { BackToTop } from "../components/library/BackToTop";
import { useSEO, SEO_CONFIG, createBreadcrumbJsonLd } from '../hooks/useSEO';

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

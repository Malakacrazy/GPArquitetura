import { Navigation } from "../components/shared/Navigation";
import { ToS } from "../components/legal/ToS";
import { useSEO, SEO_CONFIG } from '../hooks/useSEO';

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

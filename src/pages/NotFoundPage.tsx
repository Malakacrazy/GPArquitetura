import { NotFoundContent } from "../components/404/NotFoundContent";
import { useSEO, SEO_CONFIG } from '../hooks/useSEO';

export default function NotFoundPage() {
  // Apply SEO settings for 404 page
  useSEO(SEO_CONFIG.notFound);

  return (
    <div className="page_wrap bg-[var(--color-background)] min-h-screen w-full font-sans selection:bg-[var(--color-primary)] selection:text-white">
      <NotFoundContent />
    </div>
  );
}

import { Navigation } from '../components/shared/Navigation';
import { Title } from '../components/library/Title';
import { BookShowcase } from '../components/library/BookShowcase';
import { Footer } from '../components/shared/Footer';
import { BackToTop } from "../components/library/BackToTop";
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Analytics } from "@vercel/analytics/react"

export default function LibraryPage() {
  return (
    <div className="page_wrap bg-[var(--color-background)] min-h-screen w-full font-sans selection:bg-[var(--color-primary)] selection:text-white">
      <SpeedInsights />
      <Analytics />
      <Navigation />
      <Title />
      <BookShowcase />
      <Footer />
      <BackToTop />
    </div>
  );
}
import { Navigation } from './components/shared/Navigation';
import { Hero } from './components/about/Hero';
import { AboutUs } from './components/about/AboutUs';
import { OurTeam } from './components/about/OurTeam';
import { OurExpertise } from './components/about/OurExpertise';
import { Bookshelf } from './components/about/Bookshelf';
import { WorkWithUs } from './components/WorkWithUs';
import { Footer } from './components/shared/Footer';
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Analytics } from "@vercel/analytics/react"

export default function App() {
  return (
    <div className="page_wrap bg-[var(--color-background)] min-h-screen w-full font-sans selection:bg-[var(--color-primary)] selection:text-white">
      <SpeedInsights />
      <Analytics />
      <Navigation />
      <Hero />
      <AboutUs />
      <OurTeam />
      <OurExpertise />
      <Bookshelf />
      <WorkWithUs />
      <Footer />
    </div>
  );
}
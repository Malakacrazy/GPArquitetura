import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { AboutUs } from './components/AboutUs';
import { OurTeam } from './components/OurTeam';
import { OurExpertise } from './components/OurExpertise';
import { Library } from './components/Library';
import { WorkWithUs } from './components/WorkWithUs';
import { Footer } from './components/Footer';
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
      <Library />
      <WorkWithUs />
      <Footer />
    </div>
  );
}
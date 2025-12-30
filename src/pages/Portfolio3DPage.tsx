import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { OurExpertise } from './components/OurExpertise';
import { OurVision } from './components/OurVision';
import { CaseStudies } from './components/CaseStudies';
import { HowItWorks } from './components/HowItWorks';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { Loader } from './components/Loader';
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Analytics } from "@vercel/analytics/react"

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  
  return (
    <div className="page_wrap bg-[var(--color-background)] min-h-screen w-full font-sans selection:bg-[var(--color-primary)] selection:text-white">
      <SpeedInsights />
      <Analytics />
      <AnimatePresence>
        {isLoading && <Loader onLoadingComplete={() => setIsLoading(false)} />}
      </AnimatePresence>
      
      {!isLoading && <Navigation />}
      <Hero />
      <OurExpertise />
      <OurVision />
      <CaseStudies />
      <HowItWorks />
      <FAQ />
      <Footer />
    </div>
  );
}
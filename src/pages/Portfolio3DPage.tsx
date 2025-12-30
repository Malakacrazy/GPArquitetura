import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { Navigation } from '../components/shared/Navigation';
import { Hero } from '../components/portfolio3d/Hero';
import { OurExpertise } from '../components/portfolio3d/OurExpertise';
import { OurVision } from '../components/portfolio3d/OurVision';
import { CaseStudies } from '../components/portfolio3d/CaseStudies';
import { HowItWorks } from '../components/portfolio3d/HowItWorks';
import { FAQ } from '../components/portfolio3d/FAQ';
import { Footer } from '../components/shared/Footer';
import { Loader } from '../components/shared/Loader';
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Analytics } from "@vercel/analytics/react"

export default function Portfolio3DPage() {
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
import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { Navigation } from '../components/shared/Navigation';
import { Hero } from '../components/home/Hero';
import { WhatWeDo } from '../components/home/WhatWeDo';
import { ProjectsSection } from '../components/home/ProjectsSection';
import { ProcessSection } from '../components/home/ProcessSection';
import { FeaturedWorks } from '../components/home/FeaturedWorks';
import { Footer } from '../components/shared/Footer';
import { Loader } from '../components/shared/Loader';
import { useSEO, SEO_CONFIG } from '../hooks/useSEO';

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  // Apply SEO settings for Home page
  useSEO(SEO_CONFIG.home);

  return (
    <div className="page_wrap bg-[var(--color-background)] min-h-screen w-full font-sans selection:bg-[var(--color-primary)] selection:text-white">
      <AnimatePresence>
        {isLoading && <Loader onLoadingComplete={() => setIsLoading(false)} />}
      </AnimatePresence>
      
      {!isLoading && <Navigation />}
      <Hero />
      <WhatWeDo />
      <ProjectsSection />
      <ProcessSection />
      <FeaturedWorks />
      <Footer />
    </div>
  );
}

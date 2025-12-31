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
import { useSEO, SEO_CONFIG, createBreadcrumbJsonLd } from '../hooks/useSEO';

export default function Portfolio3DPage() {
  const [isLoading, setIsLoading] = useState(true);
  
  // Apply SEO settings for 3D Visualization page
  useSEO({
    ...SEO_CONFIG.portfolio3d,
    ogImage: 'https://gparquitetura.vercel.app/images/hero-3drendering-bg.webp',
    jsonLd: createBreadcrumbJsonLd([
      { name: 'Home', url: '/' },
      { name: 'Visualização 3D', url: '/3d-visualization' },
    ]),
  });

  return (
    <div className="page_wrap bg-[var(--color-background)] min-h-screen w-full font-sans selection:bg-[var(--color-primary)] selection:text-white">
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

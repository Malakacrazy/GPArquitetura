import { Reveal } from '../shared/Reveal';
import { useEffect, useRef } from 'react';
import { images, videos } from '../../config/assets';

function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch(error => {
          console.log("Autoplay prevented:", error);
        });
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-full">
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        onError={(e) => {
          console.error('Video failed to load:', e);
        }}
      >
        <source src={videos.portfolio3d.heroBackground.mp4} type="video/mp4" />
        <source src={videos.portfolio3d.heroBackground.webm} type="video/webm" />
      </video>
    </div>
  );
}

export function Hero() {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-stone-900">
      {/* Background Container */}
      <div className="absolute inset-0 w-full h-full">
         {/* Fallback Image (Lowest Layer) */}
         <img
            src={images.portfolio3d.hero.background}
            alt="Hero Background"
            className="absolute inset-0 w-full h-full object-cover z-0"
         />

         {/* Video Layer */}
         <div className="absolute inset-0 z-10 w-full h-full">
            <VideoBackground />
         </div>

         {/* Dark Overlay (Highest Layer of Background) */}
         <div className="absolute inset-0 bg-black/0 z-20 pointer-events-none" />
      </div>

      {/* Content Container (Above Background) */}
      <div className="relative z-30 h-full flex flex-col justify-between px-6 md:px-12 lg:px-16 xl:px-20 py-6 md:py-8 lg:py-12 xl:py-16 text-white w-full pointer-events-none">
          {/* Header */}
          <div className="flex justify-between items-start relative pointer-events-auto">
            <Reveal>
              <span className="text-xs font-medium tracking-[0.2em] text-white uppercase">3D Visualization</span>
            </Reveal>
            <Reveal>
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight">Giulia Parente</h1>
            </Reveal>
          </div>

          {/* Bottom Section */}
          <div className="mt-auto w-full pointer-events-auto">
            <Reveal delay={0.3}>
               {/* Description and Scroll */}
               <div className="flex flex-col md:flex-row justify-between items-end gap-6 md:gap-8 lg:gap-12">
                  <h6 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-medium leading-snug max-w-5xl tracking-tight">
                     The Giulia Parente style is defined by strong, solid forms with subtle elegance, natural balance and enduring appeal
                  </h6>
                  <h6 className="text-xs md:text-sm font-bold tracking-[0.15em] uppercase whitespace-nowrap">
                     (Scroll Down)
                  </h6>
               </div>
            </Reveal>
          </div>
        </div>
    </section>
  );
}
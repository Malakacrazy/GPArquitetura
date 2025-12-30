import { AccordionItem } from '../AccordionItem';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Reveal } from '../shared/Reveal';
import { images as assetImages } from '../config/assets';

export function WhatWeDo() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const images = assetImages.carousel;

  const getCardStyle = (index: number) => {
    const position = (index - activeIndex + 3) % 3;
    if (position === 0) return { zIndex: 30, rotate: 2, x: 0, y: 0, scale: 1 };
    if (position === 1) return { zIndex: 20, rotate: -3, x: -8, y: -8, scale: 0.95 };
    return { zIndex: 10, rotate: 6, x: 8, y: 8, scale: 0.9 };
  };

  return (
    <section id="about" className="relative py-6 md:py-8 lg:py-12 xl:py-16 bg-[var(--color-background)] overflow-hidden">
      <div className="w-full px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Left side: Stacked Cards */}
          <div className="relative h-[400px] md:h-[500px] lg:h-[600px]">
            {/* Layer 1: Decorative Background Card */}
            <motion.div 
              className="absolute w-[70%] h-[85%] rounded-[2rem] shadow-lg z-0"
              style={{ backgroundColor: '#BB7154' }}
              initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
              animate={{ 
                opacity: 0.9, 
                scale: 1,
                rotate: [12, 10, 12],
                x: [24, 15, 24],
                y: [24, 32, 24] 
              }}
              transition={{
                opacity: { duration: 0.8, ease: "easeOut" },
                scale: { duration: 0.8, ease: "easeOut" },
                default: {
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            />
            
            {/* Dynamic Image Cards */}
            {images.map((img, i) => (
              <motion.div
                key={img.src}
                layout
                className="absolute w-[70%] h-[85%] rounded-[2rem] overflow-hidden shadow-xl bg-white"
                animate={getCardStyle(i)}
                transition={{ 
                  layout: { duration: 0.8, ease: [0.32, 0.72, 0, 1] },
                  duration: 0.8, 
                  ease: [0.32, 0.72, 0, 1] 
                }}
              >
                <img 
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover pointer-events-none"
                />
              </motion.div>
            ))}

            {/* Decorative Thread Line (Flipped) */}
            <img
              src={assetImages.decorations.threadLine}
              alt=""
              className="absolute top-1/2 left-1/2 w-[120%] max-w-none z-40 pointer-events-none"
              style={{ transform: 'translate(-50%, -50%) rotate(15deg) scale(1.1)' }}
            />
          </div>
          
          {/* Text Content */}
          <Reveal className="flex flex-col gap-8 md:gap-12 lg:gap-16">
            <div className="space-y-6 md:space-y-8 lg:space-y-12">
              <span className="text-xs font-medium tracking-[0.2em] text-[var(--color-primary)] mb-4 md:mb-6 font-bold uppercase">What we do</span>
              <h6 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-light text-[var(--color-text-dark)] leading-[1.1] tracking-tight">
                We offer architectural design and planning services for both residential and commercial projects.
              </h6>
            </div>
            
            <div className="space-y-4">
              <AccordionItem 
                title="Building the future cities"
                content="Tincidunt malesuada tempor quis vitae dignissim arcu. Sed aenean hendrerit at quisque dolor eequs in pellentesque."
                defaultOpen={true}
              />
              <AccordionItem 
                title="Unique and influential design"
                content="Creating distinctive architectural solutions that leave lasting impressions and define spaces with character and purpose."
              />
              <AccordionItem 
                title="Interior and exterior design"
                content="Comprehensive design services that harmonize indoor and outdoor spaces for a cohesive architectural vision."
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
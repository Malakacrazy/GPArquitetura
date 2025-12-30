import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { images, videos } from '../../config/assets';

export function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredSide, setHoveredSide] = useState<'left' | 'right' | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Curtain effect: Move left panel left, right panel right
  // Adjusted to finish at 0.7 to preserve timing with shorter height
  const xLeft = useTransform(scrollYProgress, [0.1, 0.7], ["0%", "-100%"]);
  const xRight = useTransform(scrollYProgress, [0.1, 0.7], ["0%", "100%"]);
  
  // Text Opacity - fade out as it opens
  // Adjusted to 0.35 to match relative timing
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.35], [1, 0]);
  
  // Lower part text opacity/translate - appears after opening
  // Shifted to start at 0.6 and end at 0.8
  const lowerTextOpacity = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);
  const lowerTextY = useTransform(scrollYProgress, [0.6, 0.8], [50, 0]);

  return (
    <section id="projects" ref={containerRef} className="relative h-[225vh] bg-black">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background Video - Revealed when curtain opens */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
             <source src={videos.home.projectsBackground.mp4} type="video/mp4" />
             <source src={videos.home.projectsBackground.webm} type="video/webm" />
          </video>
          <div className="absolute inset-0 bg-black/15" />
        </div>

        {/* Lower Part Text Content - Overlaid on video (Revealed later) */}
        <motion.div
          style={{ opacity: lowerTextOpacity, y: lowerTextY }}
          className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
        >
          <div className="container mx-auto px-6 md:px-12 lg:px-16 xl:px-20 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 text-white">
            {/* Content for the video revealed state can be here if distinct from initial */}
          </div>
        </motion.div>

        {/* Curtain Panels */}
        <div className="absolute inset-0 z-20 flex flex-col md:flex-row select-none">
          {/* Left Panel - Interior */}
          <motion.div 
            style={{ x: xLeft }}
            className="relative w-full md:w-1/2 h-1/2 md:h-full bg-neutral-900 overflow-hidden group"
            onMouseEnter={() => setHoveredSide('left')}
            onMouseLeave={() => setHoveredSide(null)}
          >
            <ImageWithFallback
              src={images.home.projects.interior}
              alt="Interior"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 transition-all duration-500 group-hover:bg-black/50" />

            {/* Center Text */}
            <motion.div
              style={{ opacity: textOpacity }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <h6
                className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tighter uppercase transition-all duration-500"
                style={{
                  color: hoveredSide === 'right' ? 'transparent' : 'white',
                  WebkitTextStroke: hoveredSide === 'right' ? '1px white' : '0px',
                }}
              >
                Interior
              </h6>
            </motion.div>

            {/* Bottom Text */}
            <motion.div
              style={{ opacity: textOpacity }}
              className="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-10 xl:p-12 pointer-events-none"
            >
              <div className="border-t border-white/30 pt-6 md:pt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="text-white/90 text-base md:text-lg lg:text-xl max-w-md font-light leading-relaxed">
                  Transform your vision into reality with our innovative designs, creating modern spaces that blend functionality, aesthetics, and sustainability.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Panel - Architecture */}
          <motion.div 
            style={{ x: xRight }}
            className="relative w-full md:w-1/2 h-1/2 md:h-full bg-neutral-900 overflow-hidden group"
            onMouseEnter={() => setHoveredSide('right')}
            onMouseLeave={() => setHoveredSide(null)}
          >
             <ImageWithFallback
              src={images.home.projects.architecture}
              alt="Architecture"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 transition-all duration-500 group-hover:bg-black/50" />
            
            {/* Center Text */}
            <motion.div
              style={{ opacity: textOpacity }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <h6
                className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tighter uppercase transition-all duration-500"
                style={{
                  color: hoveredSide === 'left' ? 'transparent' : 'white',
                  WebkitTextStroke: hoveredSide === 'left' ? '1px white' : '0px',
                }}
              >
                Architecture
              </h6>
            </motion.div>

            {/* Bottom Text */}
            <motion.div
              style={{ opacity: textOpacity }}
              className="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-10 xl:p-12 justify-end text-right pointer-events-none"
            >
              <div className="border-t border-white/30 pt-6 md:pt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="text-white/90 text-base md:text-lg lg:text-xl max-w-md font-light leading-relaxed text-right ml-auto">
                  Transform your vision into reality with our innovative designs, creating modern spaces that blend functionality, aesthetics, and sustainability.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

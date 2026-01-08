/**
 * OurExpertise Component (Portfolio 3D)
 *
 * Scroll-driven showcase of 3D visualization service categories.
 * Features stacked card animations with theme transitions.
 *
 * @module components/portfolio3d/OurExpertise
 * @since 1.0.0
 *
 * Services Displayed:
 * - Interior Renderings (Imagens de Interiores)
 * - Exterior Renderings (Imagens Externas)
 * - Animations (Animações)
 * - Virtual Tours (Tour Virtual)
 * - Product Visualization (Produtos)
 *
 * Animation System:
 * - Scroll-driven on desktop (300vh sticky container)
 * - Swipe/drag on mobile for card navigation
 * - Card stack effect with scale and y-offset
 * - Theme transition (light/dark) based on active card
 *
 * Layout:
 * - 3-column grid: Titles | Image Stack | Descriptions
 * - Responsive with mobile-first swipe navigation
 * - AnimatePresence for smooth text transitions
 *
 * @example
 * ```tsx
 * <OurExpertise />
 * ```
 */
import { motion, AnimatePresence, useScroll } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
import { images, videos } from '../../config/assets';

/** Light theme colors for cards 0, 1, 4 */
const lightTheme = {
  background: '#E0D2B6',
  primary: '#BB7154',
  text: '#2C2A26',
  muted: '#8B7355'
};

/** Dark theme colors for cards 2, 3 (animations, virtual tour) */
const darkTheme = {
  background: '#BB7154',
  primary: '#E0D2B6',
  text: 'white',
  muted: 'rgba(255, 255, 255, 0.7)'
};

/**
 * Renders the expertise showcase with scroll-driven animations
 *
 * @returns Expertise section JSX element
 */
export function OurExpertise() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(() => {
    // Initialize with correct value on client to prevent scroll-based index changes on mobile
    if (typeof window !== 'undefined') {
      return window.innerWidth < 1024;
    }
    return false;
  });
  const [dragKey, setDragKey] = useState(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const items = [
    {
      id: 'A',
      title: 'Imagens de Interiores',
      desc: 'Compreenda o projeto em profundidade por meio de imagens que evidenciam o layout interno, explorando texturas, mobiliário, decoração e iluminação. Uma forma precisa e sensorial de antecipar a atmosfera dos ambientes.',
      src: images.portfolio3d.ourExpertise.interiorRendering,
      type: 'image'
    },
    {
      id: 'B',
      title: 'Imagens Externas',
      desc: 'Visualize a fachada e a volumetria da edificação, permitindo análises durante o processo criativo ou a produção de imagens estratégicas para materiais de marketing e apresentação.',
      src: images.portfolio3d.ourExpertise.exteriorRendering,
      type: 'image'
    },
    {
      id: 'C',
      title: 'Animações',
      desc: 'Apresente o projeto de maneira dinâmica e envolvente por meio de animações conceituais que conduzem o observador pelos espaços, destacando ideias, fluxos e sensações que imagens estáticas não conseguem transmitir.',
      src: videos.portfolio3d.expertiseAnimation.mp4,
      webm: videos.portfolio3d.expertiseAnimation.webm,
      type: 'video'
    },
    {
      id: 'D',
      title: 'Tour Virtual',
      desc: 'Criamos experiências imersivas a partir de imagens estáticas conectadas, possibilitando um tour completo pelo projeto. Ideal tanto para o cliente final quanto para ações de marketing, com compatibilidade para óculos de realidade virtual.',
      src: images.portfolio3d.ourExpertise.virtualTour,
      type: 'image'
    },
    {
      id: 'E',
      title: 'Produtos',
      desc: 'Desenvolvemos imagens de ambientação para móveis e marcas, valorizando formas, materiais e proporções. Um recurso visual que traduz a essência de cada produto e fortalece a comunicação da marca.',
      src: images.portfolio3d.ourExpertise.productBrand,
      type: 'image'
    }
  ];

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      if (isMobile) return;
      const newIndex = Math.min(
        items.length - 1,
        Math.floor(latest * items.length)
      );
      setActiveIndex(newIndex);
    });
  }, [scrollYProgress, isMobile, items.length]);

  // Calculate stack styles based on distance from active index
  const getStackStyle = (index: number) => {
    // If it's the active item
    if (index === activeIndex) {
      return {
        zIndex: 10,
        opacity: 1,
        scale: 1.5,
        y: 0,
        x: '-50%' // Centered horizontally
      };
    }

    // If it's after the active item (future items in stack)
    if (index > activeIndex) {
      const offset = index - activeIndex;
      // Limit the stack visibility to avoid clutter
      if (offset > 4) return { opacity: 0, zIndex: 0, scale: 0, y: 0, x: '-50%' };

      return {
        zIndex: 10 - offset,
        opacity: 1, // Visible but behind
        scale: 1.5 - (offset * 0.35), // shrinking
        y: offset * 120, // push down
        x: '-50%'
      };
    }

    // If it's before (past items) - hide them or move them away
    return {
      zIndex: 0,
      opacity: 0,
      scale: 1.6,
      y: -100,
      x: '-50%'
    };
  };

  const currentTheme = (activeIndex === 2 || activeIndex === 3) ? darkTheme : lightTheme;

  return (
    <motion.section
      ref={containerRef}
      id="about"
      className={`relative h-auto lg:h-[300vh] ${(activeIndex === 2 || activeIndex === 3) ? 'bg-[var(--color-text-dark)]' : ''}`}
      animate={{ backgroundColor: currentTheme.background }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative lg:sticky top-0 h-auto lg:h-screen w-full flex flex-col justify-start lg:justify-center overflow-hidden pt-6 md:pt-12 lg:pt-16">
        <div className="w-full px-6 md:px-12 lg:px-16 xl:px-20 h-full flex flex-col justify-center">
          <motion.span
            className="text-xs font-medium tracking-[0.2em] mb-6 md:mb-0 uppercase"
            animate={{ color: currentTheme.primary }}
            transition={{ duration: 0.5 }}
          >Expertise</motion.span>

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-start flex-1 min-h-0">

            {/* Left Column: Titles */}
            <div className="lg:col-span-3 flex flex-col justify-center lg:h-full z-20 relative order-2 lg:order-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={items[activeIndex].id}
                  className="flex flex-col gap-4"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={{
                    initial: { transition: { staggerChildren: 0.02, staggerDirection: -1 } },
                    animate: { transition: { staggerChildren: 0.02 } },
                    exit: { transition: { staggerChildren: 0.02, staggerDirection: -1 } }
                  }}
                >
                  <div className="flex items-baseline gap-4 overflow-hidden -mb-16 md:mb-0">
                    <motion.span
                      variants={{
                        initial: { y: "100%" },
                        animate: { y: 0 },
                        exit: { y: "-100%" }
                      }}
                      transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                      className="text-[18px] font-bold tracking-widest uppercase block"
                      style={{ color: currentTheme.primary }}
                    >
                      {items[activeIndex].id}
                    </motion.span>

                    <h3
                      className="text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-medium leading-tight"
                      style={{ color: currentTheme.text }}
                    >
                      {items[activeIndex].title.split(' ').map((word, wordIndex) => (
                        <span key={wordIndex} className="block overflow-hidden">
                          {word.split('').map((char, charIndex) => (
                            <motion.span
                              key={charIndex}
                              variants={{
                                initial: { y: "100%" },
                                animate: { y: 0 },
                                exit: { y: "-100%" }
                              }}
                              transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                              className="inline-block"
                            >
                              {char}
                            </motion.span>
                          ))}
                        </span>
                      ))}
                    </h3>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Center Column: Image Stack */}
            <div className="lg:col-span-6 relative h-full flex justify-center items-center pointer-events-auto lg:pointer-events-none order-1 lg:order-2">
              <div className="relative w-full h-[350px] md:h-[600px] flex items-center justify-center">
                {items.map((item, index) => {
                  const offset = index - activeIndex;
                  const absOffset = Math.abs(offset);

                  return (
                    <motion.div
                      key={`${item.id}-${dragKey}`}
                      className="absolute left-1/2 top-1/2 h-[350px] md:h-[564px] w-auto aspect-[400/564] shadow-2xl origin-center cursor-grab active:cursor-grabbing"
                      style={{ touchAction: 'pan-y' }}
                      initial={false}
                      drag={isMobile && index === activeIndex ? "x" : false}
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.15}
                      dragMomentum={false}
                      dragDirectionLock={true}
                      onDragEnd={(e, { offset, velocity }) => {
                        if (!isMobile) return;
                        const swipeThreshold = 50;
                        const velocityThreshold = 500;
                        const swipe = Math.abs(offset.x) > swipeThreshold || Math.abs(velocity.x) > velocityThreshold;
                        if (swipe) {
                          if (offset.x < 0 || velocity.x < -velocityThreshold) {
                            setActiveIndex((prev) => (prev + 1) % items.length);
                          } else if (offset.x > 0 || velocity.x > velocityThreshold) {
                            setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
                          }
                        } else {
                          // Force re-render to reset position when drag ends without swipe
                          setDragKey((k) => k + 1);
                        }
                      }}
                      animate={{
                        zIndex: 10 - absOffset,
                        opacity: absOffset > 3 ? 0 : 1,
                        scale: isMobile ? 1.1 - (absOffset * 0.1) : Math.max(0, 1.25 - (absOffset * 0.35)),
                        y: isMobile ? '-50%' : `calc(-50% + ${offset * 120}px)`,
                        x: isMobile ? `calc(-50% + ${offset * 40}px)` : '-50%'
                      }}
                      transition={{
                        duration: 0.8,
                        ease: [0.32, 0.72, 0, 1]
                      }}
                    >
                      <div className="w-full h-full overflow-hidden bg-gray-200">
                        {item.type === 'video' ? (
                          <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover"
                          >
                            <source src={item.src} type="video/mp4" />
                            {'webm' in item && <source src={item.webm} type="video/webm" />}
                          </video>
                        ) : (
                          <img
                            src={item.src}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                        {/* Dark overlay for inactive items to add depth */}
                        <div
                          className="absolute inset-0 bg-black/20 transition-opacity duration-500"
                          style={{ opacity: index === activeIndex ? 0 : 0.3 }}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Descriptions */}
            <div className="lg:col-span-3 flex flex-col justify-center lg:h-full z-20 relative order-3 lg:order-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="text-base md:text-lg lg:text-xl font-light leading-relaxed mt-12 lg:mt-0 pb-6 lg:pb-0"
                  style={{ color: currentTheme.muted }}
                >
                  {items[activeIndex].desc}
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>
    </motion.section>
  );
}
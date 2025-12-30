import { motion, AnimatePresence, useScroll } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
import { images, videos } from '../../config/assets';

const lightTheme = {
  background: '#E0D2B6',
  primary: '#BB7154',
  text: '#2C2A26',
  muted: '#8B7355'
};

const darkTheme = {
  background: '#BB7154',
  primary: '#E0D2B6',
  text: 'white',
  muted: 'rgba(255, 255, 255, 0.7)'
};

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
      title: 'Interior Rendering',
      desc: 'Complete creation of an interior that reflects your worldview. If you are an architect or real estate manager, you can make details to view the room for sale and meet prospective clients by showing them every element of the decor in impressive photorealism.',
      src: images.portfolio3d.ourExpertise.interiorRendering,
      type: 'image'
    },
    {
      id: 'B',
      title: 'Exterior Rendering',
      desc: 'Previewing the exterior with the help of 3D visualization is extremely important because it can help identify deficiencies before construction begins. If there are certain nuances, they are much easier to detect and eliminate at the stage of creating a picture. All of the attention is focused on the details.',
      src: images.portfolio3d.ourExpertise.exteriorRendering,
      type: 'image'
    },
    {
      id: 'C',
      title: 'Architectural Animation',
      desc: 'Due to architectural services you can present to customers a building that is still under renovation or construction. In this way, you will be able to look into the future, created based on your ideas!',
      src: videos.portfolio3d.expertiseAnimation.mp4,
      webm: videos.portfolio3d.expertiseAnimation.webm,
      type: 'video'
    },
    {
      id: 'D',
      title: 'Virtual Tour',
      desc: 'Deliver the ultimate off-plan sales and marketing experience, allowing unbuilt environments to be explored and appreciated in real-time. Engage clients by interactively exploring the full scope of a space — changing levels, materials, day/night lighting in a live environment.',
      src: images.portfolio3d.ourExpertise.virtualTour,
      type: 'image'
    },
    {
      id: 'E',
      title: 'Product & Brand',
      desc: 'Expert in high-end, photo-realistic visualization that brings products and spaces to life. Guided by artistic vision and technical precision, we craft imagery that captures the essence of every subject - helping brands communicate identity, emotion, and design through striking, cinematic visuals',
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
          >Our Expertise</motion.span>

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
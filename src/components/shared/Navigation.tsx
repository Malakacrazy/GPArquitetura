import { Button } from '../ui/button';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { videos, icons } from '../config/assets';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isDarkSection, setIsDarkSection] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      // Get all sections
      const sections = document.querySelectorAll('section');
      const scrollPosition = window.scrollY + 100; // Offset for button position
      
      let currentIsDark = false;
      
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          // Check if section has dark background (ProcessSection has bg-[var(--color-primary)])
          const bgColor = window.getComputedStyle(section).backgroundColor;
          const classList = section.className;
          
          // ProcessSection and Services have specific backgrounds
          if (classList.includes('bg-[var(--color-primary)]')) {
            currentIsDark = true;
          } else if (classList.includes('bg-[var(--color-text-dark)]')) {
            currentIsDark = true;
          }
        }
      });
      
      setIsDarkSection(currentIsDark);
    };
    
    handleScroll(); // Check on mount
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const containerVariants = {
    hidden: { clipPath: "inset(0 100% 0 0)" },
    visible: { 
      clipPath: "inset(0 0% 0 0)",
      transition: { 
        duration: 0.6, 
        ease: [0.76, 0, 0.24, 1]
      }
    },
    exit: { 
      clipPath: "inset(0 100% 0 0)",
      transition: { 
        duration: 0.6, 
        ease: [0.76, 0, 0.24, 1],
        when: "afterChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: (delay: number) => ({
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, delay, ease: [0.25, 1, 0.5, 1] }
    }),
    exit: { 
      y: 100, 
      opacity: 0,
      transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] }
    }
  };

  return (
    <>
      {/* Vertical Navigation Bar (Sidebar) */}
      {/* Toggle Button - Always visible */}
      <Button 
        variant="ghost" 
        size="icon" 
        className={`fixed top-4 left-4 md:top-6 md:left-6 z-[60] backdrop-blur-sm rounded-xl w-10 h-10 md:w-12 md:h-12 transition-all duration-300 ${
          isOpen
            ? 'bg-[var(--color-primary)]/90 hover:bg-[var(--color-primary)] text-white'
            : isDarkSection 
            ? 'bg-[var(--color-background)]/90 hover:bg-[var(--color-background)] text-[var(--color-text-dark)]' 
            : 'bg-[var(--color-primary)]/80 hover:bg-[var(--color-primary)] text-white'
        }`}
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(false)}
        onTouchEnd={() => setIsHovered(false)}
      >
        <div className="relative w-5 h-5 md:w-6 md:h-6 flex items-center justify-center">
          {/* Dots Image - Default State (only visible when closed and not hovered) */}
          <motion.img
            src="https://cdn-icons-png.flaticon.com/512/13726/13726126.png"
            alt="menu"
            className={`absolute w-6 h-6 md:w-8 md:h-8 transition-all duration-300 ${
              isOpen || isDarkSection ? 'brightness-0' : 'brightness-0 invert'
            }`}
            initial={{ opacity: 1 }}
            animate={{ opacity: !isOpen && !isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Animated Bars - Transform to X when open */}
          <motion.div
            className="absolute inset-0 flex flex-col justify-center gap-[5px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered || isOpen ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Top bar - rotates to form top of X */}
            <motion.div
              className={`w-full h-[1.5px] rounded-full transition-colors duration-300 ${
                isOpen ? 'bg-white' : isDarkSection ? 'bg-[var(--color-text-dark)]' : 'bg-white'
              }`}
              initial={{ scaleX: 0, rotate: 0, y: 0 }}
              animate={{ 
                scaleX: isHovered || isOpen ? 1 : 0,
                rotate: isOpen ? 45 : 0,
                y: isOpen ? 6.5 : 0
              }}
              transition={{ duration: 0.3, delay: isOpen ? 0 : 0 }}
            />
            
            {/* Second bar - fades out when open */}
            <motion.div
              className={`w-full h-[1.5px] rounded-full transition-colors duration-300 ${
                isOpen ? 'bg-white' : isDarkSection ? 'bg-[var(--color-text-dark)]' : 'bg-white'
              }`}
              initial={{ scaleX: 0, opacity: 1 }}
              animate={{ 
                scaleX: isHovered || isOpen ? 1 : 0,
                opacity: isOpen ? 0 : 1
              }}
              transition={{ duration: 0.3, delay: isOpen ? 0 : 0.05 }}
            />
            
            {/* Third bar - fades out when open */}
            <motion.div
              className={`w-full h-[1.5px] rounded-full transition-colors duration-300 ${
                isOpen ? 'bg-white' : isDarkSection ? 'bg-[var(--color-text-dark)]' : 'bg-white'
              }`}
              initial={{ scaleX: 0, opacity: 1 }}
              animate={{ 
                scaleX: isHovered || isOpen ? 1 : 0,
                opacity: isOpen ? 0 : 1
              }}
              transition={{ duration: 0.3, delay: isOpen ? 0 : 0.1 }}
            />
            
            {/* Bottom bar - rotates to form bottom of X */}
            <motion.div
              className={`w-full h-[1.5px] rounded-full transition-colors duration-300 ${
                isOpen ? 'bg-white' : isDarkSection ? 'bg-[var(--color-text-dark)]' : 'bg-white'
              }`}
              initial={{ scaleX: 0, rotate: 0, y: 0 }}
              animate={{ 
                scaleX: isHovered || isOpen ? 1 : 0,
                rotate: isOpen ? -45 : 0,
                y: isOpen ? -6.5 : 0
              }}
              transition={{ duration: 0.3, delay: isOpen ? 0 : 0.15 }}
            />
          </motion.div>
        </div>
      </Button>

      {/* Expanded Navigation - Full Screen */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div 
            key="nav-overlay"
            className="fixed inset-0 z-50 bg-[var(--color-background)] overflow-hidden"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}
          >
            {/* Scrolling Marquee Background Text */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none z-0">
              <div className="flex whitespace-nowrap animate-marquee">
                <h5 className="text-[15vw] md:text-[18vw] lg:text-[20vw] uppercase font-semibold leading-none text-transparent bg-clip-text bg-gradient-to-b from-[var(--color-text-dark)]/5 from-0% to-transparent to-80% px-4 md:px-6 lg:px-8">Giulia Parente</h5>
                <h5 className="text-[15vw] md:text-[18vw] lg:text-[20vw] uppercase font-semibold leading-none text-transparent bg-clip-text bg-gradient-to-b from-[var(--color-text-dark)]/5 from-0% to-transparent to-80% px-4 md:px-6 lg:px-8">Giulia Parente</h5>
                <h5 className="text-[15vw] md:text-[18vw] lg:text-[20vw] uppercase font-semibold leading-none text-transparent bg-clip-text bg-gradient-to-b from-[var(--color-text-dark)]/5 from-0% to-transparent to-80% px-4 md:px-6 lg:px-8">Giulia Parente</h5>
              </div>
            </div>

            {/* Radial Background Gradient (Subtle Warmth) */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at center, color-mix(in srgb, var(--color-primary) 8%, transparent), transparent 70%)' }}></div>

            <div className="relative h-full overflow-y-auto pl-0 md:pl-12 lg:pl-20"> {/* Responsive padding for sidebar */}
              <div className="max-w-full md:max-w-[1400px] xl:max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 xl:px-20 pb-12 md:pb-16 h-full flex flex-col">
                {/* Main content grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 flex-1 pt-12 md:pt-16">
                  {/* Navigation Links */}
                  <div className="flex flex-col h-full border-r-0 lg:border-r border-[var(--color-text-dark)]/10 pr-0 lg:pr-12 xl:pr-16">
                    {[
                      { name: 'Home', href: '#home' },
                      { name: 'About Us', href: '#about' },
                      { name: 'Portfolio', href: '#works' },
                      { name: 'Portfolio 3D', href: '#works3d' },
                      { name: 'Contact', href: '#contact' }
                    ].map((item, index) => (
                      <motion.div 
                        key={index} 
                        className="flex-1 flex flex-col justify-center overflow-hidden border-b border-[var(--color-text-dark)]/10 last:border-0"
                        custom={0.4 + index * 0.1}
                        variants={itemVariants}
                      >
                        <a
                          href={item.name === 'Home' ? 'https://tall-wheat-94156112.figma.site' : item.name === 'About Us' ? 'https://east-steel-86104326.figma.site' : item.name === 'Portfolio' ? 'https://eye-review-83933074.figma.site' : item.name === 'Portfolio 3D' ? 'https://hot-ochre-11259604.figma.site' : item.name === 'Contact' ? 'https://long-report-95901134.figma.site' : item.href}
                          className="text-[var(--color-text-dark)] hover:text-[var(--color-accent)] transition group flex items-center justify-between py-4 md:py-5 w-full"
                          onClick={() => setIsOpen(false)}
                        >
                          <h6 className="text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-light">{item.name}</h6>
                          <div className="relative w-8 h-8 overflow-hidden">
                            {/* First Arrow - slides out on hover */}
                            <div className="absolute inset-0 transition-transform duration-500 group-hover:translate-x-8 flex items-center justify-center">
                              <img 
                                src="https://cdn-icons-png.flaticon.com/512/9219/9219998.png" 
                                alt="arrow" 
                                className="w-12 h-10 opacity-40 group-hover:opacity-100 transition-opacity duration-300 -rotate-90"
                              />
                            </div>
                            {/* Second Arrow - slides in from left on hover */}
                            <div className="absolute inset-0 -translate-x-8 transition-transform duration-500 group-hover:translate-x-0 flex items-center justify-center">
                              <img 
                                src="https://cdn-icons-png.flaticon.com/512/9219/9219998.png" 
                                alt="arrow" 
                                className="w-12 h-10 opacity-100 -rotate-90"
                              />
                            </div>
                          </div>
                        </a>
                      </motion.div>
                    ))}
                  </div>

                  {/* Right side: Get In Touch, Social Links, and Video */}
                  <div className="flex flex-col gap-8 md:gap-10 lg:gap-12">
                    {/* Top section: Get In Touch and Social Links */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
                      {/* Get In Touch */}
                      <motion.div
                        custom={0.4}
                        variants={itemVariants}
                      >
                        <h3 className="text-[var(--color-text-dark)] mb-6 md:mb-8 flex items-center gap-2 text-xl md:text-2xl font-light">
                          Get In Touch
                          <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 20 20" fill="none">
                            <path d="M5 15L15 5M15 5H5M15 5V15" stroke="currentColor" strokeWidth="1.5"/>
                          </svg>
                        </h3>
                        <div className="space-y-4 md:space-y-6 text-[var(--color-text-muted)]">
                          <div className="flex items-start gap-3 md:gap-4">
                            <img src="https://cdn-icons-png.flaticon.com/512/3741/3741717.png" alt="WhatsApp" className="h-6 w-6 md:h-8 md:w-8 mt-1 flex-shrink-0" style={{ filter: 'brightness(0) saturate(100%) invert(47%) sepia(18%) saturate(643%) hue-rotate(351deg) brightness(92%) contrast(87%)' }} />
                            <div>
                              <h6 className="mb-1 text-xs md:text-sm uppercase tracking-wider font-bold text-[var(--color-primary)]">Call us</h6>
                              <a href="tel:88812345678" className="text-[var(--color-text-dark)] text-base md:text-lg hover:text-[var(--color-accent)] transition">(888) 1234-5678</a>
                            </div>
                          </div>
                          <div className="flex items-start gap-3 md:gap-4">
                            <img src="https://cdn-icons-png.flaticon.com/512/3894/3894024.png" alt="Email" className="h-5 w-5 md:h-6 md:w-6 mt-1 flex-shrink-0" style={{ filter: 'brightness(0) saturate(100%) invert(47%) sepia(18%) saturate(643%) hue-rotate(351deg) brightness(92%) contrast(87%)' }} />
                            <div>
                              <h6 className="mb-1 text-xs md:text-sm uppercase tracking-wider font-bold text-[var(--color-primary)]">Email us</h6>
                              <a href="mailto:info@example.com" className="text-[var(--color-text-dark)] text-base md:text-lg hover:text-[var(--color-accent)] transition">info@example.com</a>
                            </div>
                          </div>
                          <div className="flex items-start gap-3 md:gap-4">
                            <img src="https://cdn-icons-png.flaticon.com/512/3894/3894030.png" alt="MapPin" className="h-5 w-5 md:h-6 md:w-6 mt-1 flex-shrink-0" style={{ filter: 'brightness(0) saturate(100%) invert(47%) sepia(18%) saturate(643%) hue-rotate(351deg) brightness(92%) contrast(87%)' }} />
                            <div>
                              <h6 className="mb-1 text-xs md:text-sm uppercase tracking-wider font-bold text-[var(--color-primary)]">Find</h6>
                              <p className="text-[var(--color-text-dark)] text-base md:text-lg">410 Sandtown, California<br />94001, USA</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>

                      {/* Social Links */}
                      <motion.div
                        custom={0.6}
                        variants={itemVariants}
                      >
                        <h3 className="text-[var(--color-text-dark)] mb-6 md:mb-8 flex items-center gap-2 text-xl md:text-2xl font-light">
                          Social Links
                          <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 20 20" fill="none">
                            <path d="M5 15L15 5M15 5H5M15 5V15" stroke="currentColor" strokeWidth="1.5"/>
                          </svg>
                        </h3>
                        <div className="space-y-3 md:space-y-4 text-[var(--color-text-dark)]">
                          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-[var(--color-accent)] transition group">
                            <div
                              className="w-6 h-6 md:w-8 md:h-8 bg-[var(--color-text-dark)] group-hover:bg-[var(--color-accent)] transition-colors"
                              style={{
                                maskImage: "url('https://cdn-icons-png.flaticon.com/512/3741/3741664.png')",
                                maskSize: 'contain',
                                maskRepeat: 'no-repeat',
                                maskPosition: 'center',
                                WebkitMaskImage: "url('https://cdn-icons-png.flaticon.com/512/3741/3741664.png')",
                                WebkitMaskSize: 'contain',
                                WebkitMaskRepeat: 'no-repeat',
                                WebkitMaskPosition: 'center'
                              }}
                            />
                            <span className="text-base md:text-lg font-light">Instagram</span>
                          </a>
                          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-[var(--color-accent)] transition group">
                            <div
                              className="w-6 h-6 md:w-8 md:h-8 bg-[var(--color-text-dark)] group-hover:bg-[var(--color-accent)] transition-colors"
                              style={{
                                maskImage: "url('https://cdn-icons-png.flaticon.com/512/3741/3741677.png')",
                                maskSize: 'contain',
                                maskRepeat: 'no-repeat',
                                maskPosition: 'center',
                                WebkitMaskImage: "url('https://cdn-icons-png.flaticon.com/512/3741/3741677.png')",
                                WebkitMaskSize: 'contain',
                                WebkitMaskRepeat: 'no-repeat',
                                WebkitMaskPosition: 'center'
                              }}
                            />
                            <span className="text-base md:text-lg font-light">LinkedIn</span>
                          </a>
                          <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-[var(--color-accent)] transition group">
                             <div
                               className="w-6 h-6 md:w-8 md:h-8 bg-[var(--color-text-dark)] group-hover:bg-[var(--color-accent)] transition-colors"
                               style={{
                                 maskImage: "url('https://cdn-icons-png.flaticon.com/512/3741/3741684.png')",
                                 maskSize: 'contain',
                                 maskRepeat: 'no-repeat',
                                 maskPosition: 'center',
                                 WebkitMaskImage: "url('https://cdn-icons-png.flaticon.com/512/3741/3741684.png')",
                                 WebkitMaskSize: 'contain',
                                 WebkitMaskRepeat: 'no-repeat',
                                 WebkitMaskPosition: 'center'
                               }}
                             />
                            <span className="text-base md:text-lg font-light">Pinterest</span>
                          </a>
                        </div>
                      </motion.div>
                    </div>

                    {/* Video */}
                    <motion.div
                      className="mt-auto"
                      custom={0.8}
                      variants={itemVariants}
                    >
                      <div className="h-48 md:h-64 lg:h-80 rounded overflow-hidden relative">
                        <video
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover"
                        >
                          <source src={videos.navigationBackground.mp4} type="video/mp4" />
                          <source src={videos.navigationBackground.webm} type="video/webm" />
                        </video>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>

            {/* Add marquee animation */}
            <style>{`
              @keyframes marquee {
                0% { transform: translateX(0); }
                100% { transform: translateX(-33.333%); }
              }
              .animate-marquee {
                animation: marquee 20s linear infinite;
              }
            `}</style>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

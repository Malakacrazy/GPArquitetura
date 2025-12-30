import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { icons } from '../config/assets';

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const book2Ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Find Book 2 section
    const findBook2 = () => {
      const sections = document.querySelectorAll('section');
      if (sections.length >= 2) {
        book2Ref.current = sections[1]; // Second section is Book 2 (0-indexed)
      }
    };

    findBook2();

    const handleScroll = () => {
      if (book2Ref.current) {
        const rect = book2Ref.current.getBoundingClientRect();
        // Show button when Book 2 section is off screen (completely scrolled past)
        setIsVisible(rect.bottom < 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          onClick={scrollToTop}
          className="fixed bottom-4 md:bottom-6 lg:bottom-8 right-4 md:right-6 lg:right-8 z-40 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 bg-[var(--color-primary)] text-[var(--color-background)]"
          aria-label="Back to top"
        >
          <ImageWithFallback
            src={icons.arrow}
            alt="Back to top"
            className="w-6 h-6 md:w-7 md:h-7 rotate-180 brightness-0 invert"
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
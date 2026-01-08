/**
 * BackToTop Component (Portfolio)
 *
 * Floating button that appears after scrolling past the GridList section.
 * Scrolls back to the GridList (view selector) when clicked.
 *
 * @module components/portfolio/BackToTop
 * @since 1.0.0
 *
 * Visibility Logic:
 * - Hidden initially
 * - Appears when GridList section scrolls off screen
 * - Detects GridList by looking for "View:" text
 *
 * Animation:
 * - Scale and fade entrance/exit
 * - 300ms easeOut transition
 * - Hover scale effect (1.1x)
 *
 * Behavior:
 * - Scrolls to GridList section (not page top)
 * - Smooth scroll behavior
 *
 * Positioning:
 * - Fixed bottom-right corner
 * - Responsive sizing (40-48px)
 * - High z-index (40) for overlay
 *
 * @example
 * ```tsx
 * <BackToTop />
 * ```
 */
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { icons } from '../../config/assets';

/**
 * Renders a floating back-to-top button for the portfolio page
 *
 * @returns Back to top button JSX element
 */
export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const gridListRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Find the GridList section
    const findGridList = () => {
      const sections = document.querySelectorAll('section');
      for (const section of sections) {
        if (section.textContent?.includes('View:')) {
          gridListRef.current = section;
          break;
        }
      }
    };

    findGridList();

    const handleScroll = () => {
      if (gridListRef.current) {
        const rect = gridListRef.current.getBoundingClientRect();
        // Show button when GridList section is off screen (completely scrolled past)
        setIsVisible(rect.bottom < 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    if (gridListRef.current) {
      gridListRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
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
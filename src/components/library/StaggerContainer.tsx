/**
 * StaggerContainer Component
 *
 * Animation wrapper that staggers the entrance of child elements.
 * Used for sequential reveal animations on page load or scroll.
 *
 * @module components/library/StaggerContainer
 * @since 1.0.0
 *
 * Animation Pattern:
 * - Parent controls stagger timing via variants
 * - Children use StaggerItem wrapper
 * - Viewport-triggered animation (once)
 *
 * Usage:
 * - Wrap content in StaggerContainer
 * - Wrap each animated item in StaggerItem
 * - Apply staggerItemVariants to StaggerItem
 *
 * Exports:
 * - StaggerContainer: Parent container component
 * - StaggerItem: Child wrapper (motion.div)
 * - staggerItemVariants: Animation variants for children
 *
 * @example
 * ```tsx
 * <StaggerContainer staggerDelay={0.15}>
 *   <StaggerItem variants={staggerItemVariants}>Item 1</StaggerItem>
 *   <StaggerItem variants={staggerItemVariants}>Item 2</StaggerItem>
 * </StaggerContainer>
 * ```
 */
import { motion } from 'motion/react';
import { ReactNode } from 'react';

/**
 * Props for the StaggerContainer component
 */
interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

/**
 * Renders a container that staggers child animations
 *
 * @param props - Component props
 * @returns Stagger container JSX element
 */
export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.1
}: StaggerContainerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
}

/** Animated child wrapper for use inside StaggerContainer */
export const StaggerItem = motion.div;

/** Animation variants for StaggerItem children */
export const staggerItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1.0]
    }
  }
};

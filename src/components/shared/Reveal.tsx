/**
 * Reveal Component
 *
 * Scroll-triggered animation wrapper that fades in and slides up content
 * when it enters the viewport. Uses Framer Motion's whileInView for
 * intersection-based triggering.
 *
 * @module components/shared/Reveal
 * @since 1.0.0
 *
 * Animation:
 * - Initial: opacity 0, translated down by yOffset
 * - Final: opacity 1, y position 0
 * - Triggers once when element is 50px into viewport
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Reveal>
 *   <h1>This content fades in on scroll</h1>
 * </Reveal>
 *
 * // With custom timing
 * <Reveal delay={0.3} duration={0.8} yOffset={50}>
 *   <Card />
 * </Reveal>
 *
 * // With additional classes
 * <Reveal className="flex gap-4">
 *   <Item />
 * </Reveal>
 * ```
 */
import { motion } from 'motion/react';
import { ReactNode } from 'react';

/**
 * Props for the Reveal component
 */
interface RevealProps {
  /** Content to animate */
  children: ReactNode;
  /** Additional CSS classes to apply to wrapper */
  className?: string;
  /** Delay before animation starts (seconds) */
  delay?: number;
  /** Animation duration (seconds) */
  duration?: number;
  /** Initial vertical offset in pixels (positive = starts below) */
  yOffset?: number;
}

/**
 * Wraps content with a scroll-triggered fade-in animation
 *
 * @param props - Component props
 * @returns Animated wrapper div
 */
export function Reveal({
  children, 
  className = "", 
  delay = 0, 
  duration = 0.6,
  yOffset = 30
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1.0] }}
    >
      {children}
    </motion.div>
  );
}

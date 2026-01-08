/**
 * ParallaxImage Component
 *
 * Scroll-driven parallax effect for images. Creates a subtle vertical
 * movement as the user scrolls past the image.
 *
 * @module components/library/ParallaxImage
 * @since 1.0.0
 *
 * Effect:
 * - Vertical translation based on scroll position
 * - Configurable intensity (default 20px)
 * - Offset from container start to end
 *
 * Implementation:
 * - Uses Framer Motion useScroll and useTransform
 * - Container ref for scroll tracking
 * - Overflow hidden to crop parallax movement
 *
 * @example
 * ```tsx
 * <ParallaxImage
 *   src="/images/book-cover.jpg"
 *   alt="Architecture book cover"
 *   intensity={30}
 *   className="h-96"
 * />
 * ```
 */
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

/**
 * Props for the ParallaxImage component
 */
interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  intensity?: number;
}

/**
 * Renders an image with scroll-driven parallax effect
 *
 * @param props - Component props
 * @returns Parallax image JSX element
 */
export function ParallaxImage({
  src,
  alt,
  className = "",
  intensity = 20
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [intensity, -intensity]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y }}
        className="w-full h-full object-cover"
      />
    </div>
  );
}

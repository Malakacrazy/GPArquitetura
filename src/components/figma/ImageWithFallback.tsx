/**
 * ImageWithFallback Component
 *
 * Enhanced img element that gracefully handles image loading errors
 * by falling back to a placeholder image. Prevents broken image icons
 * from appearing in the UI.
 *
 * @module components/figma/ImageWithFallback
 * @since 1.0.0
 *
 * Behavior:
 * - Initially attempts to load the provided src
 * - On error, switches to fallbackSrc (default: placeholder)
 * - Only triggers fallback once (prevents infinite loop if fallback also fails)
 *
 * Use Cases:
 * - Sanity CMS images that may not exist yet
 * - External URLs that may be temporarily unavailable
 * - User-generated content images
 *
 * @example
 * ```tsx
 * // Basic usage
 * <ImageWithFallback
 *   src={project.image}
 *   alt={project.title}
 *   className="w-full h-full object-cover"
 * />
 *
 * // Custom fallback
 * <ImageWithFallback
 *   src={user.avatar}
 *   alt="User avatar"
 *   fallbackSrc="/images/default-avatar.webp"
 * />
 * ```
 */
import { useState, ImgHTMLAttributes } from 'react';

/**
 * Props for the ImageWithFallback component
 * Extends standard img element attributes
 */
interface ImageWithFallbackProps extends ImgHTMLAttributes<HTMLImageElement> {
  /** Primary image source URL */
  src: string;
  /** Alt text for accessibility */
  alt: string;
  /** Fallback image URL if primary fails */
  fallbackSrc?: string;
}

/**
 * Renders an img element with automatic fallback on error
 *
 * @param props - Component props including standard img attributes
 * @returns Img element with error handling
 */
export function ImageWithFallback({
  src,
  alt,
  fallbackSrc = '/images/placeholder.webp',
  className = '',
  ...props
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallbackSrc);
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={handleError}
      className={className}
      {...props}
    />
  );
}

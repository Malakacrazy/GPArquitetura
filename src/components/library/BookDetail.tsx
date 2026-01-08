/**
 * BookDetail Component
 *
 * Detailed book display with image carousel and navigation.
 * Renders a single book's images and description with scroll controls.
 *
 * @module components/library/BookDetail
 * @since 1.0.0
 *
 * Carousel Features:
 * - Horizontal scrolling image gallery
 * - Previous/Next button navigation
 * - Smooth scroll animation
 * - Responsive image sizing (85vw mobile, 600px desktop)
 *
 * Layout:
 * - Image carousel at top
 * - Title and description below
 * - Navigation arrows aligned right
 *
 * Animation:
 * - Reveal fade-up entrance
 * - Image hover scale (1.05x)
 * - Staggered reveal for text content
 *
 * Navigation:
 * - Disabled state for first/last slide
 * - Smooth scroll to slide position
 * - Gap-aware scroll calculation
 *
 * @example
 * ```tsx
 * <BookDetail
 *   book={{
 *     id: "1",
 *     title: "Architecture Book",
 *     description: "A comprehensive guide...",
 *     images: ["/img1.jpg", "/img2.jpg"]
 *   }}
 *   index={0}
 * />
 * ```
 */
import { useState, useRef } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Reveal } from '../shared/Reveal';
import { icons } from '../../config/assets';

/**
 * Book data structure
 */
interface Book {
  id: string;
  title: string;
  description: string;
  images: readonly string[];
}

/**
 * Props for the BookDetail component
 */
interface BookDetailProps {
  book: Book;
  index: number;
}

/**
 * Renders a detailed book view with image carousel
 *
 * @param props - Component props
 * @returns Book detail section JSX element
 */
export function BookDetail({ book, index }: BookDetailProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handlePrev = () => {
    if (currentSlide > 0) {
      const newSlide = currentSlide - 1;
      setCurrentSlide(newSlide);
      scrollToSlide(newSlide);
    }
  };

  const handleNext = () => {
    if (currentSlide < book.images.length - 1) {
      const newSlide = currentSlide + 1;
      setCurrentSlide(newSlide);
      scrollToSlide(newSlide);
    }
  };

  const scrollToSlide = (slideIndex: number) => {
    if (scrollContainerRef.current) {
      const firstImage = scrollContainerRef.current.querySelector('div');
      if (firstImage) {
        const slideWidth = firstImage.offsetWidth;
        const gap = window.innerWidth >= 768 ? 16 : 12; // md:gap-4 (16px) or gap-3 (12px)
        scrollContainerRef.current.scrollTo({
          left: slideIndex * (slideWidth + gap),
          behavior: 'smooth'
        });
      }
    }
  };

  const isFirstSlide = currentSlide === 0;
  const isLastSlide = currentSlide >= book.images.length - 2;

  return (
    <Reveal variant="fadeUp" duration={0.8}>
      <section id={`book-${book.id}`} className="flex flex-col gap-6 md:gap-8 lg:gap-12">
        {/* Image Carousel */}
        <div className="w-full overflow-hidden h-[300px] md:h-[350px] lg:h-[400px]">
          <div
            ref={scrollContainerRef}
            className="flex gap-3 md:gap-4 h-full overflow-x-auto scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {book.images.map((image, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 relative h-[300px] md:h-[350px] lg:h-[400px] overflow-hidden rounded-xl w-[85vw] md:w-[600px]"
                style={{ width: idx === 0 && index === 2 ? undefined : undefined }}
              >
                <ImageWithFallback
                  src={image}
                  alt={`${book.title} ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col-reverse md:flex-row md:justify-between gap-6 md:gap-8">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            <Reveal variant="fadeRight" delay={0.2}>
              <h3 className="w-full md:max-w-xs lg:max-w-sm text-[var(--color-text-dark)] text-3xl md:text-4xl">{book.title}</h3>
            </Reveal>
            <Reveal variant="fadeUp" delay={0.3}>
              <div className="flex flex-col items-start">
                <p className="text-[var(--color-text-muted)] max-w-7xl text-justify text-base md:text-lg">{book.description}</p>
              </div>
            </Reveal>
          </div>

          {/* Navigation Arrows */}
          <Reveal variant="fadeLeft" delay={0.4}>
            <div className="flex gap-2 md:gap-3 self-start">
              <button
                onClick={handlePrev}
                disabled={isFirstSlide}
                className={`group flex justify-center gap-3 items-center text-center transition-all duration-300 leading-none cursor-pointer uppercase rounded-lg px-4 py-3 md:px-5 md:py-3.5 bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/80 active:bg-[var(--color-primary)]/70 ${
                  isFirstSlide ? 'opacity-50 pointer-events-none' : ''
                }`}
              >
                <div
                  className="w-6 h-6 md:w-8 md:h-8 rotate-90 bg-[var(--color-background)]"
                  style={{
                    maskImage: `url('${icons.arrow}')`,
                    maskSize: 'contain',
                    maskRepeat: 'no-repeat',
                    maskPosition: 'center',
                    WebkitMaskImage: `url('${icons.arrow}')`,
                    WebkitMaskSize: 'contain',
                    WebkitMaskRepeat: 'no-repeat',
                    WebkitMaskPosition: 'center'
                  }}
                />
              </button>
              <button
                onClick={handleNext}
                disabled={currentSlide >= book.images.length - 1}
                className={`group flex justify-center gap-3 items-center text-center transition-all duration-300 leading-none cursor-pointer uppercase rounded-lg px-4 py-3 md:px-5 md:py-3.5 bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/80 active:bg-[var(--color-primary)]/70 ${
                  currentSlide >= book.images.length - 1 ? 'opacity-50 pointer-events-none' : ''
                }`}
              >
                <div
                  className="w-6 h-6 md:w-8 md:h-8 -rotate-90 bg-[var(--color-background)]"
                  style={{
                    maskImage: `url('${icons.arrow}')`,
                    maskSize: 'contain',
                    maskRepeat: 'no-repeat',
                    maskPosition: 'center',
                    WebkitMaskImage: `url('${icons.arrow}')`,
                    WebkitMaskSize: 'contain',
                    WebkitMaskRepeat: 'no-repeat',
                    WebkitMaskPosition: 'center'
                  }}
                />
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </Reveal>
  );
}
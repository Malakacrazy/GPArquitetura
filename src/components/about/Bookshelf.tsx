import { ArrowRight,} from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { images, videos } from '../config/assets';

// Books data is now imported from centralized asset config
const books = images.books;

export function Bookshelf() {
  const booksRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate books for infinite scroll
  const duplicatedBooks = [...books, ...books, ...books];

  // Continuous smooth scroll effect
  useEffect(() => {
    if (isPaused) return;

    const scrollContainer = booksRef.current;
    if (!scrollContainer) return;

    let animationFrameId: number;
    const scrollSpeed = 1; // Increased speed - pixels per frame

    const scroll = () => {
      if (scrollContainer && !isPaused) {
        scrollContainer.scrollLeft += scrollSpeed;

        // Calculate the width of one set of books (280px width + 32px gap) * 6 books
        const oneSetWidth = (280 + 32) * books.length;
        
        // When we've scrolled past the first set, reset to start seamlessly
        if (scrollContainer.scrollLeft >= oneSetWidth) {
          scrollContainer.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isPaused]);

  const handlePrev = () => {
    const scrollContainer = booksRef.current;
    if (scrollContainer) {
      scrollContainer.scrollLeft -= 312; // One book width
    }
  };

  const handleNext = () => {
    const scrollContainer = booksRef.current;
    if (scrollContainer) {
      scrollContainer.scrollLeft += 312; // One book width
    }
  };

  return (
    <section style={{ backgroundColor: 'var(--color-background)' }}>
      {/* Header with margins */}
      <div className="px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24 pt-8 md:pt-12 lg:pt-16">
        <div className="relative w-full mx-auto">
          <motion.div 
            className="flex justify-between items-center mb-8 md:mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="text-xs font-medium tracking-[0.2em] text-[var(--color-primary)] font-bold uppercase">Library</span>
            <a 
              href="https://empty-shaky-74405936.figma.site"
              className="group relative mx-2 my-2 inline-block text-sm uppercase tracking-wider text-[var(--color-text-dark)] no-underline"
            >
              <span className="absolute inset-0 bg-[var(--color-primary)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
              <span className="relative z-10 block px-6 py-3 transition-colors duration-300 text-[var(--color-text-dark)] group-hover:text-[var(--color-background)] uppercase text-xs flex items-center gap-2">
                <h6 >SEE ALL BOOKS</h6>
              </span>
              <span className="absolute left-[-8px] right-[-8px] top-0 h-[1px] bg-[var(--color-text-dark)] transition-all duration-300 group-hover:left-0 group-hover:right-0 group-hover:bg-[var(--color-primary)]"></span>
              <span className="absolute left-[-8px] right-[-8px] bottom-0 h-[1px] bg-[var(--color-text-dark)] transition-all duration-300 group-hover:left-0 group-hover:right-0 group-hover:bg-[var(--color-primary)]"></span>
              <span className="absolute bottom-[-8px] top-[-8px] left-0 w-[1px] bg-[var(--color-text-dark)] transition-all duration-300 group-hover:bottom-0 group-hover:top-0 group-hover:bg-[var(--color-primary)]"></span>
              <span className="absolute bottom-[-8px] top-[-8px] right-0 w-[1px] bg-[var(--color-text-dark)] transition-all duration-300 group-hover:bottom-0 group-hover:top-0 group-hover:bg-[var(--color-primary)]"></span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Books Carousel - Full Width Edge-to-Edge */}
      <div className="relative overflow-hidden pb-8 md:pb-12 lg:pb-16" style={{ height: '555px', backgroundColor: 'var(--color-background)' }}>
        {/* Video Background - Full Width */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            mixBlendMode: 'multiply',
            opacity: 0.75
          }}
        >
          <source src={videos.library.mp4} type="video/mp4" />
          <source src={videos.library.webm} type="video/webm" />
        </video>
        
        {/* Book Cards with left margin only */}
        <div className="relative w-full h-full flex items-start">
          <div className="w-full px-6 md:px-12 lg:px-16 xl:px-20">
            <div 
              ref={booksRef}
              className="overflow-x-auto"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              <style>{`
                .overflow-x-auto::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              <div className="flex gap-6 md:gap-8 lg:gap-12 min-w-max">
                {duplicatedBooks.map((book, index) => (
                  <a 
                    key={`${book.id}-${index}`}
                    href={book.link}
                    className="group cursor-pointer rounded-lg transition-all duration-300 block no-underline bg-[var(--color-primary)]/50 hover:!bg-[var(--color-primary)] p-5 shadow-sm"
                    style={{ 
                      width: '280px'
                    }}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                  >
                    {/* Book Cover */}
                    <div 
                      className="relative mb-5 overflow-hidden rounded-sm shadow-lg transition-all duration-500 group-hover:shadow-2xl"
                      style={{ 
                        backgroundColor: 'var(--color-accent)',
                        aspectRatio: '3/4'
                      }}
                    >
                      <img
                        src={book.image}
                        alt={book.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                        style={{ backgroundColor: 'var(--color-primary)' }}
                      />
                    </div>

                    {/* Book Info */}
                    <div>
                      <h6 
                        className="mb-3 transition-colors duration-300 font-bold line-clamp-2 uppercase"
                        style={{ color: 'var(--color-text-dark)' }}
                      >
                        {book.title}
                      </h6>
                      <p 
                        className="leading-relaxed line-clamp-3"
                        style={{ color: 'white' }}
                      >
                        {book.description}
                      </p>
                      <button
                        className="mt-4 flex items-center gap-2 transition-all duration-300 group/btn"
                        style={{ color: 'white' }}
                      >
                        <span className="text-sm uppercase font-bold underline">READ MORE</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                      </button>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
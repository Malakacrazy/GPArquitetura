import React from 'react';
import { motion } from 'motion/react';
import { images } from '../../config/assets';

export function NotFoundContent() {
  return (
    <main className="min-h-screen w-full">
      <section className="min-h-screen w-full flex flex-col lg:flex-row lg:h-screen lg:overflow-hidden">
        {/* Left Content */}
        <div className="flex flex-col justify-between p-8 md:p-12 lg:w-1/2 lg:p-16 xl:p-20 min-h-[50vh] lg:min-h-full bg-[var(--color-background)]">
          {/* Top Section */}
          <motion.div
            className="flex flex-col items-start gap-8 lg:gap-12 xl:gap-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <p className="max-w-md lg:max-w-lg xl:max-w-xl text-2xl leading-relaxed text-[var(--color-text-muted)]">
              The page you&apos;re looking does not exist or has been removed. Let&apos;s take you back in the right direction.
            </p>

            <a
              href="/"
              className="relative inline-block group mb-10 lg:mb-0"
            >
              {/* Background on hover */}
              <span className="absolute inset-0 bg-[var(--color-primary)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              
              {/* Button text */}
              <span className="relative z-10 block px-5 py-3 md:px-6 md:py-3.5 lg:px-7 lg:py-4 xl:px-8 xl:py-4 text-xs uppercase tracking-wider text-[var(--color-text-dark)] group-hover:text-[var(--color-background)] transition-colors duration-300 font-medium">
                GO BACK TO HOME
              </span>
              
              {/* Borders with crop mark effect */}
              <span className="absolute -left-1.5 -right-1.5 md:-left-2 md:-right-2 top-0 h-px bg-[var(--color-text-dark)] group-hover:left-0 group-hover:right-0 group-hover:bg-[var(--color-primary)] transition-all duration-300"></span>
              <span className="absolute -left-1.5 -right-1.5 md:-left-2 md:-right-2 bottom-0 h-px bg-[var(--color-text-dark)] group-hover:left-0 group-hover:right-0 group-hover:bg-[var(--color-primary)] transition-all duration-300"></span>
              <span className="absolute -top-1.5 -bottom-1.5 md:-top-2 md:-bottom-2 left-0 w-px bg-[var(--color-text-dark)] group-hover:top-0 group-hover:bottom-0 group-hover:bg-[var(--color-primary)] transition-all duration-300"></span>
              <span className="absolute -top-1.5 -bottom-1.5 md:-top-2 md:-bottom-2 right-0 w-px bg-[var(--color-text-dark)] group-hover:top-0 group-hover:bottom-0 group-hover:bg-[var(--color-primary)] transition-all duration-300"></span>
            </a>
          </motion.div>

          {/* Bottom Section - Large heading */}
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl uppercase leading-[0.95] tracking-tight text-[var(--color-text-dark)] break-words"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          >
            404 page
            <br />
            not found
          </motion.h1>
        </div>

        {/* Right Image */}
        <div className="relative w-full h-[50vh] md:h-[45vh] lg:w-1/2 lg:h-full overflow-hidden flex items-center justify-center bg-[var(--color-background)] p-4 lg:p-8 xl:p-12">
          <motion.img
            src={images.notFound.hero.src}
            loading="eager"
            alt={images.notFound.hero.alt}
            className="w-full h-full object-cover"
            initial={{ scale: 1.1, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </section>
    </main>
  );
}

/**
 * Hero Component (About Page)
 *
 * Full-screen hero section for the About page with background image,
 * section label, brand name, and inspirational tagline.
 *
 * @module components/about/Hero
 * @since 1.0.0
 *
 * Layout:
 * - Full viewport height (100vh)
 * - Background image with 40% dark overlay
 * - "Sobre Nós" label top-left
 * - "Giulia Parente" brand top-right
 * - Tagline and scroll indicator at bottom
 *
 * @example
 * ```tsx
 * <Hero />
 * ```
 */
import { Reveal } from '../shared/Reveal';
import { images } from '../../config/assets';
import { BrandLogo } from '../shared/BrandLogo';

/**
 * Renders the About page hero section
 *
 * @returns Hero section JSX element
 */
export function Hero() {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${images.about.hero.background}')`
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Content Container */}
        <div className="relative z-10 h-full flex flex-col justify-between px-6 md:px-12 lg:px-16 xl:px-20 py-6 md:py-8 lg:py-12 xl:py-16 text-white">
          {/* Header */}
          <div className="flex justify-between items-start relative z-40">
            <Reveal>
              <span className="text-xs font-medium tracking-[0.2em] text-white uppercase">SObre Nós</span>
            </Reveal>
            <Reveal>
              <h1><span className="sr-only">Studio Araci</span><BrandLogo tone="branco" /></h1>
            </Reveal>
          </div>

          {/* Bottom Section */}
          <div className="mt-auto w-full">
            <Reveal delay={0.3}>
               {/* Description and Scroll */}
               <div className="flex flex-col md:flex-row justify-between items-end gap-6 md:gap-8 lg:gap-12">
                  <div className="max-w-5xl">
                    <h2 className="heading-sub text-xl md:text-2xl lg:text-3xl xl:text-4xl font-medium leading-snug tracking-tight">
                       Há mais em um espaço do que aquilo que os olhos alcançam.
                    </h2>
                    <p className="mt-3 md:mt-4 text-base md:text-lg lg:text-xl font-normal leading-snug">
                       Cada ambiente guarda possibilidades. Algumas estão na maneira como desejamos viver. Outras, naquilo que queremos construir, oferecer ou valorizar. O Studio Araci existe para dar forma a essas possibilidades.
                    </p>
                  </div>
                  <p className="heading-sub text-xs md:text-sm font-bold tracking-[0.15em] uppercase whitespace-nowrap">
                     (Rolar para Baixo)
                  </p>
               </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
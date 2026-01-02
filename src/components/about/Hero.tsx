import { Reveal } from '../shared/Reveal';
import { images } from '../../config/assets';

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
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight">Giulia Parente</h1>
            </Reveal>
          </div>

          {/* Bottom Section */}
          <div className="mt-auto w-full">
            <Reveal delay={0.3}>
               {/* Description and Scroll */}
               <div className="flex flex-col md:flex-row justify-between items-end gap-6 md:gap-8 lg:gap-12">
                  <h6 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-medium leading-snug max-w-5xl tracking-tight">
                     Seu espaço, sua assinatura: tudo começa no que você sente
                  </h6>
                  <h6 className="text-xs md:text-sm font-bold tracking-[0.15em] uppercase whitespace-nowrap">
                     (Rolar para Baixo)
                  </h6>
               </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
import { Reveal } from '../shared/Reveal';
import { urlFor } from '../../sanity/client';

interface ProjectHeroProps {
  title: string;
  heroImage?: any;
}

export function ProjectHero({ title, heroImage }: ProjectHeroProps) {
  const getBackgroundUrl = () => {
    if (!heroImage) return '';
    if (typeof heroImage === 'string') return heroImage;
    if (heroImage?._type === 'image') return urlFor(heroImage).width(1920).url();
    return '';
  };

  const backgroundUrl = getBackgroundUrl();

  return (
    <section id="home" className="relative h-screen flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: backgroundUrl ? `url('${backgroundUrl}')` : 'none',
          backgroundColor: backgroundUrl ? 'transparent' : 'var(--color-accent)'
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="relative z-10 h-full flex flex-col justify-between px-6 md:px-12 lg:px-16 xl:px-20 py-6 md:py-8 lg:py-12 xl:py-16 text-white">
          <div className="flex justify-end items-center">
            <Reveal>
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight">
                Giulia Parente
              </h1>
            </Reveal>
          </div>

          <div className="mt-auto w-full">
            <Reveal delay={0.3}>
              <div className="flex flex-col md:flex-row justify-between items-end gap-6 md:gap-8 lg:gap-12">
                <h2 className="text-6xl max-w-5xl md:text-8xl lg:text-[10rem] leading-[0.8] tracking-tighter uppercase mix-blend-difference">
                  {title}
                </h2>
                <h6 className="text-xs md:text-sm font-bold tracking-[0.15em] uppercase whitespace-nowrap">
                  (Scroll Down)
                </h6>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { images, videos, icons } from '../../config/assets';

export function OurTeam() {
  const [isBioOpen, setIsBioOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playPromiseRef = useRef<Promise<void> | null>(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      playPromiseRef.current = videoRef.current.play();
      playPromiseRef.current?.then(() => {
        setIsVideoPlaying(true);
      }).catch((error) => {
        // Ignore play errors, they're usually benign
        console.log('Video play interrupted:', error);
      });
    }
  };

  const handleMouseLeave = () => {
    setIsVideoPlaying(false);
    if (videoRef.current && playPromiseRef.current) {
      playPromiseRef.current.then(() => {
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
      }).catch(() => {
        // Play was interrupted, no need to pause
      });
    } else if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <section className="px-6 md:px-12 lg:px-16 xl:px-20 py-6 md:py-8 lg:py-12 xl:py-16 relative">
      <div className="mx-auto relative w-full">
          <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
            {/* Our Team Label - Shows first on mobile */}
            <div className="block md:hidden order-1 text-xs tracking-[0.3em]" style={{ color: 'var(--color-primary)' }}>
              NOSSO TIME
            </div>

            {/* Portrait Image */}
            <motion.div
              className="aspect-[3/4] overflow-hidden relative group cursor-pointer order-2 md:order-none"
              style={{
                backgroundImage: `url(${images.about.team.giuliaparente.photo})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
              onClick={() => setIsBioOpen(true)}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <video
                ref={videoRef}
                playsInline
                loop
                muted
                preload="auto"
                poster={images.about.team.giuliaparente.poster}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isVideoPlaying ? 'opacity-100' : 'opacity-0'}`}
              >
                <source src={videos.about.team.giuliaparente.mp4} type="video/mp4" />
                <source src={videos.about.team.giuliaparente.webm} type="video/webm" />
              </video>
              {/* Hover Overlay */}
              <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
                <div className="p-4 md:p-6 lg:p-8 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 text-base md:text-lg" style={{ backgroundColor: 'var(--color-primary)', opacity: 0.95 }}>
                  <div className="transform opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    <p className="mb-4" style={{ color: 'white' }}>
                      A inquietação diante da falta de pessoalidade nos projetos e da repetição de elementos na arquitetura brasileira despertou em mim o desejo de aprofundar meus estudos e resgatar a criatividade como ferramenta de escuta, colocando o cliente — sua história, emoções e vivências — no centro de todo o processo criativo.
                    </p>
                    <div className="flex items-center gap-0.5" style={{ color: 'white' }}>
                      <span className="underline">Saiba mais</span>
                      <img
                        src={icons.arrow}
                        alt="arrow"
                        width="28"
                        height="24"
                        className="transition-transform group-hover:translate-x-1"
                        style={{ transform: 'rotate(-90deg)', filter: 'invert(1)' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Quote and Info */}
            <motion.div 
              className="flex flex-col justify-center relative order-3 md:order-none"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            >
              {/* Our Team - Top Right on desktop only */}
              <div className="hidden md:block absolute top-0 right-0 text-xs tracking-[0.3em]" style={{ color: 'var(--color-primary)' }}>
                NOSSO TIME
              </div>
              
              {/* Decorative Line */}
              <div className="w-12 h-px mb-8" style={{ backgroundColor: 'var(--color-text-dark)' }}></div>
              
              {/* Quote */}
              <blockquote className="mb-8 md:mb-12 lg:mb-16" style={{ color: 'var(--color-text-dark)' }}>
                <p className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-relaxed">
                  "Quando o ambiente faz você se sentir estável, equilibrado e seguro, é mais provável que se sinta confiante para assumir riscos conscientes e explorar novas possibilidades."
                </p>
              </blockquote>
              
              {/* Name and Title */}
              <div>
                <div className="text-base md:text-lg lg:text-xl" style={{ color: 'var(--color-text-dark)' }}>Giulia Parente, <h6 className="inline" style={{ color: 'var(--color-primary)' }}>Founder</h6></div>
              </div>
            </motion.div>
          </div>
      </div>

      {/* Bio Panel */}
      <div 
        className={`fixed inset-0 z-40 transition-all duration-500 ${
          isBioOpen ? 'backdrop-blur-sm bg-black/20 pointer-events-auto' : 'pointer-events-none'
        }`}
        onClick={() => setIsBioOpen(false)}
      >
        <div 
          className={`fixed top-0 left-0 h-full w-full md:w-4/5 shadow-2xl transition-transform duration-700 ease-in-out ${
            isBioOpen ? 'translate-x-0 pointer-events-auto' : '-translate-x-full pointer-events-none'
          }`}
          style={{ backgroundColor: 'var(--color-background)' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsBioOpen(false)}
            className="absolute top-8 right-8 z-10 backdrop-blur-sm rounded-xl w-10 h-10 md:w-12 md:h-12 transition-all duration-300 bg-[var(--color-primary)]/90 hover:bg-[var(--color-primary)]"
          >
            <div className="relative w-5 h-5 md:w-6 md:h-6 flex items-center justify-center mx-auto">
              <motion.div
                className="absolute inset-0 flex flex-col justify-center gap-[5px]"
              >
                {/* Top bar - rotates to form top of X */}
                <motion.div
                  className="w-full h-[1.5px] rounded-full bg-white"
                  animate={{ 
                    rotate: 45,
                    y: 6.5
                  }}
                />
                
                {/* Second bar - fades out when open */}
                <motion.div
                  className="w-full h-[1.5px] rounded-full bg-white"
                  animate={{ 
                    opacity: 0
                  }}
                />
                
                {/* Third bar - fades out when open */}
                <motion.div
                  className="w-full h-[1.5px] rounded-full bg-white"
                  animate={{ 
                    opacity: 0
                  }}
                />
                
                {/* Bottom bar - rotates to form bottom of X */}
                <motion.div
                  className="w-full h-[1.5px] rounded-full bg-white"
                  animate={{ 
                    rotate: -45,
                    y: -6.5
                  }}
                />
              </motion.div>
            </div>
          </button>

          <div className="h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-[var(--color-background)] [&::-webkit-scrollbar-thumb]:bg-[var(--color-primary)] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-[var(--color-accent)]">
            <div className="grid grid-cols-1 md:grid-cols-2 h-full">
              {/* Left: Image */}
              <div className="relative h-full min-h-[400px] md:min-h-0" style={{ backgroundColor: 'var(--color-accent)' }}>
                <img
                  src={images.about.team.giuliaparente.photo}
                  alt="Giulia"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Right: Bio Content */}
              <div className="p-6 md:p-12 lg:p-16 xl:p-20">
                <h2 className="text-4xl md:text-5xl mb-4" style={{ color: 'var(--color-text-dark)' }}>
                  Giulia Parente
                </h2>
                <h6 className="mb-4 text-lg md:text-xl" style={{ color: 'var(--color-primary)' }}>
                  Founder
                </h6>

                <div className="space-y-4 md:space-y-6 text-justify text-base md:text-lg" style={{ color: 'var(--color-text-muted)' }}>
                  <p>
                    Arquiteta e urbanista formada pela Universidade Paulista (UNIP) e pós-graduada em Design Emocional pelo Centro Universitário Belas Artes, Giulia Parente está à frente do Studio Giulia Parente desde 2022, com atuação na Região Metropolitana de São Paulo.
                  </p>
                  <p>
                    Com foco em arquitetura de interiores residencial e comercial, seu trabalho é pautado pelos princípios da neuroarquitetura e da psicoarquitetura, explorando a relação entre espaço, emoções e bem-estar. Cada projeto é desenvolvido de forma sensível e personalizada, considerando não apenas a estética, mas principalmente a saúde emocional do cliente e a maneira como ele vivencia os ambientes.
                  </p>
                  <p>
                    Acreditando que os espaços influenciam diretamente o comportamento, as sensações e a qualidade de vida, Giulia busca criar interiores que acolhem, conectam e traduzem a essência de quem os habita, unindo funcionalidade, identidade e significado.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
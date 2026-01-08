/**
 * OurExpertise Component
 *
 * Statistics showcase section highlighting the studio's achievements
 * with animated number counters and descriptive icons.
 *
 * @module components/about/OurExpertise
 * @since 1.0.0
 *
 * Statistics Displayed:
 * - 130+ Projects Completed
 * - 2+ Competition Participations
 * - 98% Client Satisfaction
 *
 * Layout:
 * - 3-column grid on desktop
 * - 2-column on tablet
 * - Single column on mobile
 * - Large area indicator at bottom (7,910 m²)
 *
 * Animation:
 * - Header fades in on scroll
 * - Statistics cards have staggered delays (0, 0.15s, 0.3s)
 * - Bottom indicator animates with 0.3s delay
 *
 * @example
 * ```tsx
 * <OurExpertise />
 * ```
 */
import { Building2, Award, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { icons } from '../../config/assets';

/**
 * Statistics item configuration
 */
interface Statistic {
  number: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const statistics: Statistic[] = [
  {
    number: "130+",
    label: "Projetos Concluídos",
    description: "Entrega bem-sucedida de espaços residenciais, comerciais e públicos",
    icon: Building2
  },
  {
    number: "2+",
    label: "Participações em Competições",
    description: "Reconhecimento pela excelência em design e sustentabilidade",
    icon: Award
  },
  {
    number: "98%",
    label: "Satisfação dos Clientes",
    description: "Consistentemente Superando expectativas e construindo relacionamentos duradouros",
    icon: Star
  }
];

export function OurExpertise() {
  return (
    <section className="bg-[var(--color-primary)] px-6 md:px-12 lg:px-16 xl:px-20 py-6 md:py-8 lg:py-12 xl:py-16">
      <div className="relative mx-auto w-full">
          <motion.div 
            className="mb-8 md:mb-12 lg:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="text-xs font-medium tracking-[0.2em] text-[var(--color-accent)] mb-4 md:mb-6 uppercase">Nossas Conquistas</span>
            <h6 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light leading-[1.1] w-full text-white">
              Criamos ambientes que não apenas funcionam, mas que fazem sentido para quem vive neles
            </h6>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
            {statistics.map((stat, index) => {
              const Icon = stat.icon;
              // Determine icon URL based on stat label
              let iconUrl = icons.projects; // default
              if (stat.label === "Projects Completed") {
                iconUrl = icons.projects;
              } else if (stat.label === "Awards Won") {
                iconUrl = icons.awards;
              } else if (stat.label === "Client Satisfaction") {
                iconUrl = icons.satisfaction;
              }
              
              return (
                <motion.div 
                  key={index} 
                  className="text-center"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.15 }}
                >
                  <div className="flex flex-col items-center">
                    <img src={iconUrl} alt="" className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 mb-4 md:mb-6" style={{ filter: 'brightness(0) saturate(100%) invert(77%) sepia(20%) saturate(826%) hue-rotate(359deg) brightness(95%) contrast(88%)' }} />
                    <div className="mb-2 text-xl md:text-2xl text-white">{stat.number}</div>
                  </div>
                  <div className="mb-2 text-xl md:text-2xl text-white">{stat.label}</div>
                  <p className="text-white/70 text-base md:text-lg">{stat.description}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Big Indicator */}
          <motion.div 
            className="mt-8 md:mt-12 lg:mt-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          >
            <div className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-[var(--color-accent)]" style={{ lineHeight: '1.2' }}>
              7,910 m² projetados com foco em bem-estar e funcionalidade
            </div>
          </motion.div>
      </div>
    </section>
  );
}
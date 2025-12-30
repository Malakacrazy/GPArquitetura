import { Building2, Award, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { icons } from '../config/assets';

interface Statistic {
  number: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const statistics: Statistic[] = [
  {
    number: "150+",
    label: "Projects Completed",
    description: "Successfully delivered residential, commercial, and public spaces",
    icon: Building2
  },
  {
    number: "25+",
    label: "Awards Won",
    description: "Recognition for design excellence and sustainability",
    icon: Award
  },
  {
    number: "98%",
    label: "Client Satisfaction",
    description: "Consistently exceeding expectations and building lasting relationships",
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
            <span className="text-xs font-medium tracking-[0.2em] text-[var(--color-accent)] mb-4 md:mb-6 uppercase">Our Expertise</span>
            <h6 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-light leading-[1.1] w-full text-white">
              Delivering excellence through measurable results
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
              124,673,491 m² of urban projects
            </div>
          </motion.div>
      </div>
    </section>
  );
}
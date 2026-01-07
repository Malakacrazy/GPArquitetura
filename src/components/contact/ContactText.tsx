import React from 'react';
import { motion } from "motion/react";
import { images, icons } from '../../config/assets';

export const ContactText = ({ children }: { children?: React.ReactNode }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <>
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="fixed inset-0 -z-10"
      >
        <img 
          src={images.contact.hero.background}
          alt="Modern architecture background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </motion.div>

      <div className="relative z-10 flex flex-col min-h-screen">
      <motion.main 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex-grow flex flex-col justify-center items-center px-4 py-12 contact-two-hero-text text-center relative z-10"
      >
      <motion.div variants={itemVariants} className="contact-two-hero-heading mb-2">
        <h1 className="text-[15vw] md:text-[18vw] lg:text-[20vw] leading-none font-normal tracking-wide text-[var(--color-accent)]">
          CONTATO
        </h1>
      </motion.div>
      
      <motion.div variants={itemVariants} className="contact-two-hero-paragraph max-w-xl mx-auto mb-8">
        <p className="text-center text-[var(--color-white)]/60 text-base md:text-lg leading-relaxed font-light">
          Seu espaço pode refletir quem você é e como você se sente. <br />
          Vamos conversar e transformar essa intenção em arquitetura.
        </p>
      </motion.div>
      
      <div className="flex flex-col items-center gap-6 mt-2 w-full">
        <motion.a
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          href="mailto:giulia.parente@gparquitetura.com"
          className="contact-two-hero-link inline-block transition-colors duration-300 hover:text-[var(--color-accent)]"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-[var(--color-white)] tracking-wide transition-colors duration-300 hover:text-[var(--color-accent)] break-all">
            giulia.parente@gparquitetura.com
          </h2>
        </motion.a>
        
        <motion.div variants={itemVariants} className="w-full h-px bg-[var(--color-white)]/20 max-w-lg"></motion.div>
        
        <motion.a
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          href="https://api.whatsapp.com/send?phone=5511947739339"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-two-hero-phone inline-block group transition-colors duration-300"
        >
          <h3 className="flex items-center justify-center gap-3 md:gap-5 text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-[var(--color-white)] tracking-wide group-hover:text-[var(--color-accent)] transition-colors duration-300">
            <div
              className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 bg-white group-hover:bg-[var(--color-accent)] transition-colors duration-300"
              style={{
                maskImage: `url('${icons.whatsapp}')`,
                maskSize: "contain",
                maskRepeat: "no-repeat",
                maskPosition: "center",
                WebkitMaskImage: `url('${icons.whatsapp}')`,
                WebkitMaskSize: "contain",
                WebkitMaskRepeat: "no-repeat",
                WebkitMaskPosition: "center"
              }}
            />
            (11) 94773-9339
          </h3>
        </motion.a>
      </div>
    </motion.main>
      {children}
      </div>
    </>
  );
};

import React from "react";
import { motion } from "framer-motion";

interface ProjectSidebarProps {
  title: string;
  architect?: string;
  startYear?: number;
  completionYear?: number;
  location?: string;
  area?: string;
  photographer?: string;
}

export const ProjectSidebar = ({ 
  title, 
  architect, 
  startYear, 
  completionYear, 
  location, 
  area, 
  photographer 
}: ProjectSidebarProps) => {
  return (
    <motion.aside 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full md:w-64 lg:w-72 flex-shrink-0 text-sm md:sticky md:top-12 h-fit"
    >
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-4 md:mb-6 tracking-wide">{title}</h1>

      <div className="w-8 h-px bg-[var(--color-text-dark)] mb-6 md:mb-8"></div>

      <div className="space-y-4 md:space-y-6 font-light text-[var(--color-text-muted)] text-xs leading-relaxed mb-8 md:mb-10">
        {architect && (
          <div>
            <h6 className="font-bold text-[var(--color-text-dark)] mb-1 text-xl md:text-2xl">Autor</h6>
            <p className="text-base md:text-lg">{architect}</p>
          </div>
        )}
        {startYear && (
          <div>
            <h6 className="font-bold text-[var(--color-text-dark)] mb-1 text-xl md:text-2xl">Data de início</h6>
            <p className="text-base md:text-lg">{startYear}</p>
          </div>
        )}
        {completionYear && (
          <div>
            <h6 className="font-bold text-[var(--color-text-dark)] mb-1 text-xl md:text-2xl">Data de conclusão</h6>
            <p className="text-base md:text-lg">{completionYear}</p>
          </div>
        )}
        {location && (
          <div>
            <h6 className="font-bold text-[var(--color-text-dark)] mb-1 text-xl md:text-2xl">Localização</h6>
            <p className="text-base md:text-lg">{location}</p>
          </div>
        )}
        {area && (
          <div>
            <h6 className="font-bold text-[var(--color-text-dark)] mb-1 text-xl md:text-2xl">Área</h6>
            <p className="text-base md:text-lg">{area}</p>
          </div>
        )}
        {photographer && (
          <div>
            <h6 className="font-bold text-[var(--color-text-dark)] mb-1 text-xl md:text-2xl">Fotógrafo</h6>
            <p className="text-base md:text-lg">{photographer}</p>
          </div>
        )}
      </div>
    </motion.aside>
  );
};

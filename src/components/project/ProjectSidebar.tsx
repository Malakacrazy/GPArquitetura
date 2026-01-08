/**
 * ProjectSidebar Component
 *
 * Sticky sidebar displaying project metadata on detail pages.
 * Shows key information like architect, dates, location, and credits.
 *
 * @module components/project/ProjectSidebar
 * @since 1.0.0
 *
 * Layout:
 * - Sticky positioning on desktop (follows scroll)
 * - Full width on mobile
 * - Fixed width (256-288px) on desktop
 *
 * Displayed Fields:
 * - Title (large heading)
 * - Autor (Architect name)
 * - Data de início (Start year)
 * - Data de conclusão (Completion year)
 * - Localização (Location)
 * - Área (Area in square meters)
 * - Fotógrafo (Photographer credit)
 *
 * Animation:
 * - Slides in from left on viewport entry
 * - 800ms duration with easeOut
 *
 * @example
 * ```tsx
 * <ProjectSidebar
 *   title="Casa Moderna"
 *   architect="Giulia Parente"
 *   startYear={2022}
 *   completionYear={2023}
 *   location="São Paulo, SP"
 *   area="350m²"
 *   photographer="Studio XYZ"
 * />
 * ```
 */
import React from "react";
import { motion } from "framer-motion";

/**
 * Props for the ProjectSidebar component
 */
interface ProjectSidebarProps {
  title: string;
  architect?: string;
  startYear?: number;
  completionYear?: number;
  location?: string;
  area?: string;
  photographer?: string;
}

/**
 * Renders the project sidebar with metadata
 *
 * @param props - Component props
 * @returns Sidebar JSX element
 */
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

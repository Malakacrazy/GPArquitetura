import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { urlFor } from "../sanity/client";
import { useRelatedProjects } from "../hooks/useProjects";

interface OtherProjectsProps {
  currentProjectSlug: string;
}

export const OtherProjects = ({ currentProjectSlug }: OtherProjectsProps) => {
  const { projects, loading, error } = useRelatedProjects(currentProjectSlug, 3);

  // Helper to get image URL
  const getImageUrl = (image: any) => {
    if (!image) return '';
    if (typeof image === 'string') return image;
    if (image?._type === 'image') return urlFor(image).width(800).url();
    return '';
  };

  if (loading) {
    return (
      <section className="w-full bg-[var(--color-background)] px-6 md:px-12 lg:px-16 xl:px-20 py-6 md:py-8 lg:py-12 xl:py-16">
        <p className="text-center text-[var(--color-text-muted)]">Loading projects...</p>
      </section>
    );
  }

  if (error || !projects || projects.length === 0) {
    return null; // Don't show section if no projects
  }

  return (
    <section className="w-full bg-[var(--color-background)] px-6 md:px-12 lg:px-16 xl:px-20 py-6 md:py-8 lg:py-12 xl:py-16">
      {/* Header */}
      <div className="flex flex-row justify-between items-center mb-8 md:mb-12 gap-6 md:gap-8">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-xs text-[var(--color-primary)] font-medium tracking-[0.2em] uppercase"
        >
          Other Projects
        </motion.span>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link 
            to="/" 
            className="group relative mx-2 my-2 inline-block text-sm uppercase tracking-wider text-[var(--color-text-dark)] no-underline text-center"
          >
            <span className="absolute inset-0 bg-[var(--color-primary)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
            <h6 className="relative z-10 block px-6 py-3 transition-colors duration-300 group-hover:text-[var(--color-background)] uppercase text-xs">
              See All Projects
            </h6>
            <span className="absolute left-[-8px] right-[-8px] top-0 h-[1px] bg-[var(--color-text-dark)] transition-all duration-300 group-hover:left-0 group-hover:right-0 group-hover:bg-[var(--color-primary)]"></span>
            <span className="absolute left-[-8px] right-[-8px] bottom-0 h-[1px] bg-[var(--color-text-dark)] transition-all duration-300 group-hover:left-0 group-hover:right-0 group-hover:bg-[var(--color-primary)]"></span>
            <span className="absolute bottom-[-8px] top-[-8px] left-0 w-[1px] bg-[var(--color-text-dark)] transition-all duration-300 group-hover:bottom-0 group-hover:top-0 group-hover:bg-[var(--color-primary)]"></span>
            <span className="absolute bottom-[-8px] top-[-8px] right-0 w-[1px] bg-[var(--color-text-dark)] transition-all duration-300 group-hover:bottom-0 group-hover:top-0 group-hover:bg-[var(--color-primary)]"></span>
          </Link>
        </motion.div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
        {projects.map((project, index) => (
          <Link 
            key={project._id}
            to={`/project/${project.slug.current}`}
            className="block no-underline"
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer hover:bg-[var(--color-primary)] hover:p-6 md:hover:p-8 transition-all duration-500"
            >
              {/* Image */}
              <div className="aspect-square overflow-hidden bg-[var(--color-accent)] mb-6 md:mb-8">
                <img 
                  src={getImageUrl(project.thumbnailImage)} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="space-y-3 md:space-y-4">
                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold tracking-tight group-hover:text-[var(--color-background)] transition-colors duration-500">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-base md:text-lg text-[var(--color-text-muted)] group-hover:text-[var(--color-background)] leading-relaxed max-w-md transition-colors duration-500">
                  {project.shortDescription || 'A showcase of architectural excellence'}
                </p>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
};

import { useState } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Project } from '../../types/project';
import { motion } from 'framer-motion';
import { urlFor } from '../../sanity/client';

const getImageUrl = (image: any) => {
  if (typeof image === 'string') return image;
  if (image?._type === 'image') return urlFor(image).width(800).url();
  return image;
};

interface ProjectsListViewProps {
  projects: Project[];
}

export function ProjectsListView({ projects }: ProjectsListViewProps) {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  // Check if image should be on left or right of cursor
  const imageWidth = 320; // 80 * 4 (w-80 = 320px)
  const offset = 20; // Distance from cursor
  const shouldShowLeft = mousePosition.x + imageWidth + offset > window.innerWidth;

  return (
    <div className="relative space-y-0 px-6 md:px-12 lg:px-16 xl:px-20" style={{ backgroundColor: 'var(--color-background)' }}>
      {/* Table Header - Hidden on mobile, shown on large screens */}
      <motion.div 
        className="hidden lg:block pb-6 text-xs font-medium tracking-[0.2em] uppercase"
        style={{ color: 'var(--color-primary)' }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="grid grid-cols-12 gap-x-6">
          <p className="col-span-8">Projeto</p>
          <p className="col-span-2">Ano</p>
          <p className="col-span-2">Local</p>
        </div>
      </motion.div>

      {/* Project Rows */}
      <ul>
        {projects.map((project, index) => (
          <motion.li 
            key={project.id} 
            className="border-b"
            style={{ borderColor: 'var(--color-text-muted)' }}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
              duration: 0.5, 
              ease: "easeOut",
              delay: index * 0.08
            }}
          >
            <a
              href={project.link}
              className="grid grid-cols-1 lg:grid-cols-12 gap-x-6 py-6 cursor-pointer transition-colors duration-300 block"
              style={{ backgroundColor: hoveredProject === project.id ? 'var(--color-accent)' : 'var(--color-background)' }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              onMouseMove={handleMouseMove}
            >
              <span className="block lg:col-span-8">
                <span 
                  className="mr-3 transition-colors duration-300"
                  style={{ color: hoveredProject === project.id ? '#ffffff' : 'var(--color-text-dark)' }}
                >
                  {project.title}
                </span>
                <span
                  className="hidden sm:inline transition-colors duration-300"
                  style={{ color: hoveredProject === project.id ? '#ffffff' : 'var(--color-text-muted)' }}
                >
                  {project.description || project.shortDescription || ''}
                </span>
              </span>

              <span 
                className="hidden lg:block lg:col-span-2 transition-colors duration-300"
                style={{ color: hoveredProject === project.id ? '#ffffff' : 'var(--color-text-dark)' }}
              >
                {project.year}
              </span>

              <span 
                className="hidden lg:block lg:col-span-2 transition-colors duration-300"
                style={{ color: hoveredProject === project.id ? '#ffffff' : 'var(--color-text-dark)' }}
              >
                {project.location}
              </span>
            </a>
          </motion.li>
        ))}
      </ul>

      {/* Hover Image Preview */}
      {hoveredProject && (
        <motion.div 
          className="fixed w-80 h-80 pointer-events-none z-50"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          style={{
            left: `${shouldShowLeft ? mousePosition.x - imageWidth - offset : mousePosition.x + offset}px`,
            top: `${mousePosition.y - 160}px`
          }}
        >
          <div className="relative w-full h-full rounded-lg overflow-hidden shadow-2xl">
            <ImageWithFallback
              src={getImageUrl(projects.find(p => p.id === hoveredProject)?.image || '')}
              alt={projects.find(p => p.id === hoveredProject)?.title || ''}
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      )}
    </div>
  );
}

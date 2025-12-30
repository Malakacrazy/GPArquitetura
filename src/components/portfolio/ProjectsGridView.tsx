import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Project } from '../types/project';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { urlFor } from '../sanity/client';

const getImageUrl = (image: any) => {
  if (typeof image === 'string') return image;
  if (image?._type === 'image') return urlFor(image).width(1200).url();
  return image;
};

interface ProjectsGridViewProps {
  projects: Project[];
}

export function ProjectsGridView({ projects }: ProjectsGridViewProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const heroProject = projects.find(p => p.isHero);
  const gridProjects = projects.filter(p => !p.isHero);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Calculate total container height for grid view
  const getTotalHeight = () => {
    let maxHeight = 0;
    [0, 1, 2].forEach(col => {
      const colProjects = gridProjects.filter(p => p.column === col);
      const colHeight = colProjects.reduce((sum, p) => Math.max(sum, p.translateY! + p.height), 0);
      maxHeight = Math.max(maxHeight, colHeight);
    });
    return maxHeight;
  };

  return (
    <div className="w-full overflow-hidden px-6 md:px-12 lg:px-16 xl:px-20" style={{ backgroundColor: 'var(--color-background)' }}>
      {/* Hero Image - Full Width */}
      {heroProject && (
        <motion.a 
          href={heroProject.link}
          className="group relative w-full mb-3 cursor-none overflow-hidden block"
          style={{ height: `${heroProject.height}px` }}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div 
            className="relative overflow-hidden w-full h-full transition-all duration-[1200ms] ease-out"
            style={{ clipPath: 'inset(0px round 12px)' }}
          >
            <div className="relative w-full h-full group-hover:scale-[1.03] transition-all duration-[600ms] ease-out">
              <ImageWithFallback
                src={getImageUrl(heroProject.image)}
                alt={heroProject.title}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-[1200ms] ease-out group-hover:scale-[1.015]"
              />
            </div>
          </div>
          
          {/* Hover overlay */}
          <div 
            className="absolute left-2 bottom-2 mr-2 bg-[var(--color-primary)]/50 rounded-xl p-4 pointer-events-none duration-[600ms] ease-out opacity-0 translate-y-5 translate-x-5 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0"
            style={{ backdropFilter: 'blur(20px)' }}
          >
            <p className="text-white">{heroProject.title}</p>
            <p className="text-white/80 text-xs uppercase mt-1">{heroProject.location}</p>
          </div>
        </motion.a>
      )}

      {/* Asymmetric Grid */}
      <div 
        className="w-full relative"
        style={{ height: `${getTotalHeight()}px` }}
      >
        {gridProjects.map((project, index) => (
          <div
            key={project.id}
            className="group absolute"
            style={{
              top: 0,
              left: `${project.column! * 33.33}%`,
              width: '33.33%',
              height: `${project.height}px`,
              transform: `translateY(${project.translateY}px)`,
              padding: project.column === 2 ? '0 0 12px' : '0 12px 12px 0'
            }}
          >
            <motion.a
              href={project.link}
              className="relative w-full h-full overflow-hidden block cursor-none"
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.7, 
                ease: "easeOut",
                delay: (index % 3) * 0.1
              }}
            >
              <div 
                className="relative overflow-hidden w-full h-full transition-all duration-[1200ms] ease-out"
                style={{ clipPath: 'inset(0px round 12px)' }}
              >
                <div className="relative w-full h-full group-hover:scale-[1.03] transition-all duration-[600ms] ease-out">
                  <ImageWithFallback
                    src={getImageUrl(project.image)}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-[1200ms] ease-out group-hover:scale-[1.015]"
                  />
                </div>
              </div>
              
              {/* Hover overlay */}
              <div 
                className="absolute left-2 bottom-2 mr-2 bg-[var(--color-primary)]/50 rounded-xl p-4 pointer-events-none duration-[600ms] ease-out opacity-0 translate-y-5 translate-x-5 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0"
                style={{ backdropFilter: 'blur(20px)' }}
              >
                <p className="text-white">{project.title}</p>
                <p className="text-white/80 text-xs uppercase mt-1">{project.location}</p>
              </div>
            </motion.a>
          </div>
        ))}
      </div>

      {/* VIEW Cursor Follower */}
      {isHovered && (
        <div
          className="fixed w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center pointer-events-none z-50 transition-opacity duration-300 mix-blend-difference border border-white/20"
          style={{
            left: mousePosition.x,
            top: mousePosition.y,
            transform: 'translate(-50%, -50%)',
            opacity: isHovered ? 1 : 0
          }}
        >
          <span className="text-xs font-bold tracking-[0.2em] text-white uppercase">VIEW</span>
        </div>
      )}
    </div>
  );
}

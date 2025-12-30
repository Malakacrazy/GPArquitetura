import React, { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Slider from "react-slick";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Reveal } from "./shared/Reveal";
import { useFeaturedProjects } from "../hooks/useProjects";
import { urlFor } from "../sanity/client";

export function FeaturedWorks() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const sliderRef = useRef<Slider>(null);
  const dragStart = useRef({ x: 0, y: 0 });

  // Fetch featured projects from Sanity
  const { projects: sanityProjects, loading, error } = useFeaturedProjects();

  // Transform Sanity projects to match component structure
  const projects = sanityProjects.map((project) => ({
    id: project._id,
    title: project.title,
    image: project.heroImage || project.thumbnailImage,
    link: `/project/${project.slug?.current}`
  }));

  const settings = {
    dots: false,
    infinite: projects.length > 1,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: projects.length > 1,
    autoplaySpeed: 5000,
    pauseOnHover: false,
    beforeChange: (_: number, next: number) => setCurrentSlide(next),
    arrows: false
  };

  const next = () => {
    sliderRef.current?.slickNext();
  };

  const previous = () => {
    sliderRef.current?.slickPrev();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const getImageUrl = (image: any) => {
    if (!image) return '';
    if (typeof image === 'string') return image;
    if (image?._type === 'image') return urlFor(image).width(1920).url();
    return '';
  };

  // Loading state
  if (loading) {
    return (
      <section 
        id="works" 
        className="relative min-h-screen w-full bg-stone-900 overflow-hidden flex items-center justify-center"
      >
        <p className="text-white text-xl">Loading featured works...</p>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section 
        id="works" 
        className="relative min-h-screen w-full bg-stone-900 overflow-hidden flex items-center justify-center"
      >
        <p className="text-white text-xl">Unable to load featured works</p>
      </section>
    );
  }

  // No featured projects
  if (projects.length === 0) {
    return (
      <section 
        id="works" 
        className="relative min-h-screen w-full bg-stone-900 overflow-hidden flex items-center justify-center"
      >
        <p className="text-white text-xl">No featured projects yet</p>
      </section>
    );
  }

  return (
    <section 
      id="works" 
      className="relative min-h-screen w-full bg-stone-900 overflow-hidden cursor-none"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header Overlay */}
      <div className="absolute top-0 left-0 right-0 z-30 px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24 py-8 md:py-10 lg:py-12 pointer-events-none">
        <div className="pointer-events-auto w-full">
          <Reveal>
            <div className="flex justify-between items-center w-full">
              <span className="text-xs font-medium tracking-[0.2em] text-white uppercase">Featured Works</span>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <a 
                  href="https://portfoliopage-jet.vercel.app" 
                  className="group relative mx-2 my-2 inline-block text-sm uppercase tracking-wider text-white no-underline"
                  onMouseEnter={() => setIsButtonHovered(true)}
                  onMouseLeave={() => setIsButtonHovered(false)}
                >
                  <span className="absolute inset-0 bg-[var(--color-primary)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                  <h6 className="relative z-10 block px-6 py-3 transition-colors duration-300 text-white group-hover:text-[var(--color-background)] uppercase text-[12px]">See All Projects</h6>
                  <span className="absolute left-[-8px] right-[-8px] top-0 h-[1px] bg-white transition-all duration-300 group-hover:left-0 group-hover:right-0 group-hover:bg-[var(--color-primary)]"></span>
                  <span className="absolute left-[-8px] right-[-8px] bottom-0 h-[1px] bg-white transition-all duration-300 group-hover:left-0 group-hover:right-0 group-hover:bg-[var(--color-primary)]"></span>
                  <span className="absolute bottom-[-8px] top-[-8px] left-0 w-[1px] bg-white transition-all duration-300 group-hover:bottom-0 group-hover:top-0 group-hover:bg-[var(--color-primary)]"></span>
                  <span className="absolute bottom-[-8px] top-[-8px] right-0 w-[1px] bg-white transition-all duration-300 group-hover:bottom-0 group-hover:top-0 group-hover:bg-[var(--color-primary)]"></span>
                </a>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </div>

      {isHovered && !isButtonHovered && (
        <div
          className="absolute w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center pointer-events-none z-50 transition-opacity duration-300 mix-blend-difference border border-white/20"
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

      <Slider ref={sliderRef} {...settings} className="h-screen w-full">
        {projects.map((project) => (
          <div key={project.id} className="relative h-screen w-full outline-none">
            {/* Background Image */}
            <div className="absolute inset-0">
              <ImageWithFallback
                src={getImageUrl(project.image)}
                alt={project.title}
                className="h-full w-full object-cover"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            </div>
            
            {/* Content Overlay */}
            <div
              className="absolute bottom-0 left-0 w-full h-full px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24 pt-8 md:pt-10 lg:pt-12 pb-8 md:pb-10 lg:pb-12 flex flex-col justify-end cursor-none"
              onMouseDown={(e) => {
                dragStart.current = { x: e.clientX, y: e.clientY };
              }}
              onClick={(e) => {
                const dx = e.clientX - dragStart.current.x;
                const dy = e.clientY - dragStart.current.y;
                if (Math.abs(dx) < 10 && Math.abs(dy) < 10) {
                  window.location.href = project.link;
                }
              }}
            >
               <div className="flex flex-col md:flex-row justify-between items-end w-full gap-6 md:gap-8">
                 <div>
                     <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-white mb-4 md:mb-6 leading-[1.1] whitespace-pre-line">
                       {project.title}
                     </h2>
                 </div>

                 {/* Counter and Navigation - Integrated into the design */}
                 <div className="flex flex-col items-end gap-4 md:gap-6">
                    {/* Navigation Buttons - Only show if more than 1 project */}
                    {projects.length > 1 && (
                      <div className="flex gap-3 md:gap-4 mb-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              previous();
                            }}
                            className="p-2 md:p-3 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300 cursor-pointer z-20"
                            aria-label="Previous project"
                            onMouseEnter={() => setIsButtonHovered(true)}
                            onMouseLeave={() => setIsButtonHovered(false)}
                          >
                            <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              next();
                            }}
                            className="p-2 md:p-3 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300 cursor-pointer z-20"
                            aria-label="Next project"
                            onMouseEnter={() => setIsButtonHovered(true)}
                            onMouseLeave={() => setIsButtonHovered(false)}
                          >
                            <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
                          </button>
                      </div>
                    )}

                    {/* Counter - Dynamic based on actual number */}
                    <div className="text-white/80 text-3xl md:text-4xl lg:text-5xl font-light tracking-tight">
                        {String(currentSlide + 1).padStart(2, '0')}
                        <span className="text-xl md:text-2xl opacity-50">
                          /{String(projects.length).padStart(2, '0')}
                        </span>
                    </div>
                 </div>
               </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}

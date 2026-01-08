/**
 * ProjectMainBody Component
 *
 * Main content area for project detail pages. Displays images and
 * descriptions in an alternating layout with animated transitions.
 *
 * @module components/project/ProjectMainBody
 * @since 1.0.0
 *
 * Content Structure:
 * 1. Main hero image (16:9 aspect ratio)
 * 2. First gallery grid (3 columns, square images)
 * 3. First description (Portable Text)
 * 4. Featured image (3:2 aspect ratio)
 * 5. Second gallery grid (3 columns, 4:5 portrait)
 * 6. Second description (Portable Text)
 *
 * Image Handling:
 * - Uses Sanity urlFor() for image optimization
 * - 1200px width for main/featured images
 * - 600px width for gallery thumbnails
 * - Hover zoom effect (1.05x scale)
 *
 * Animation:
 * - Fade up on viewport entry
 * - Staggered delay for gallery items (0.1s per item)
 * - 600-1000ms transition durations
 *
 * @example
 * ```tsx
 * <ProjectMainBody
 *   mainImage={project.mainImage}
 *   galleryGrid1={project.gallery1}
 *   description1={project.description1}
 *   featuredImage={project.featuredImage}
 *   galleryGrid2={project.gallery2}
 *   description2={project.description2}
 * />
 * ```
 */
import React from "react";
import { motion } from "framer-motion";
import { urlFor } from "../../sanity/client";
import { PortableText } from '@portabletext/react';

/**
 * Props for the ProjectMainBody component
 */
interface ProjectMainBodyProps {
  mainImage?: any;
  galleryGrid1?: any[];
  description1?: any;
  featuredImage?: any;
  galleryGrid2?: any[];
  description2?: any;
}

/**
 * Renders the main content body with images and descriptions
 *
 * @param props - Component props
 * @returns Main body JSX element
 */
export const ProjectMainBody = ({
  mainImage,
  galleryGrid1 = [],
  description1,
  featuredImage,
  galleryGrid2 = [],
  description2
}: ProjectMainBodyProps) => {
  return (
    <div className="flex-1 flex flex-col gap-6 md:gap-8 lg:gap-12">
      {/* Hero Image */}
      {mainImage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full aspect-[16/9] overflow-hidden bg-[var(--color-accent)]"
        >
          <img 
            src={urlFor(mainImage).width(1200).url()}
            alt="Main project image" 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
          />
        </motion.div>
      )}

      {/* First Grid */}
      {galleryGrid1.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {galleryGrid1.map((img, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="aspect-square overflow-hidden bg-[var(--color-accent)]"
            >
              <img 
                src={urlFor(img).width(600).url()} 
                alt={`Detail ${idx + 1}`} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
              />
            </motion.div>
          ))}
        </div>
      )}

      {/* Text Section 1 */}
      {description1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full text-[var(--color-text-muted)] font-light text-base md:text-lg leading-7 space-y-4 md:space-y-6 prose prose-lg max-w-none"
        >
          <PortableText value={description1} />
        </motion.div>
      )}

      {/* Featured Image */}
      {featuredImage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full aspect-[3/2] overflow-hidden bg-[var(--color-accent)]"
        >
          <img 
            src={urlFor(featuredImage).width(1200).url()}
            alt="Featured image" 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
          />
        </motion.div>
      )}

      {/* Second Grid */}
      {galleryGrid2.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {galleryGrid2.map((img, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="aspect-[4/5] overflow-hidden bg-[var(--color-accent)]"
            >
              <img 
                src={urlFor(img).width(600).url()} 
                alt={`Detail ${idx + 4}`} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
              />
            </motion.div>
          ))}
        </div>
      )}

      {/* Text Section 2 */}
      {description2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full text-[var(--color-text-muted)] font-light text-base md:text-lg leading-7 space-y-4 md:space-y-6 prose prose-lg max-w-none"
        >
          <PortableText value={description2} />
        </motion.div>
      )}
    </div>
  );
};

import React from "react";
import { motion } from "framer-motion";
import { urlFor } from "../../sanity/client";
import { PortableText } from '@portabletext/react';

interface ProjectMainBodyProps {
  mainImage?: any;
  galleryGrid1?: any[];
  description1?: any;
  featuredImage?: any;
  galleryGrid2?: any[];
  description2?: any;
}

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

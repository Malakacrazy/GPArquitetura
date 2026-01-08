/**
 * CaseStudies Component (Portfolio 3D)
 *
 * Gallery showcase of 3D rendering work samples. Features a dynamic
 * masonry-style grid with hover effects and responsive row heights.
 *
 * @module components/portfolio3d/CaseStudies
 * @since 1.0.0
 *
 * Gallery Structure:
 * - 4 rows of images with varying aspect ratios
 * - Flex-based layout with proportional widths
 * - Dynamic height changes on hover
 *
 * Image Categories:
 * - Aerial/campus views
 * - Interior residential
 * - Exterior architecture
 * - Commercial/luxury
 *
 * Interactions:
 * - Hover expands image (flex-[3])
 * - Row height adjusts to hovered image
 * - Smooth 800ms transitions
 *
 * Animation:
 * - Staggered fade-up entrance (0.05s delay per item)
 * - Scale effect on hover
 *
 * @example
 * ```tsx
 * <CaseStudies />
 * ```
 */
import { motion } from "motion/react";
import { useState } from "react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { images } from "../../config/assets";

/** Gallery images organized by rows with flex proportions and hover heights */
const galleryImages = {
  row1: [
    {
      src: images.portfolio3d.caseStudies.row1.aerialCampus,
      alt: "Aerial view of a modern campus at sunset, showcasing green spaces and innovative architecture.",
      width: "flex-[1.78]", // ~832px
      hoverHeight: "591.36px",
    },
    {
      src: images.portfolio3d.caseStudies.row1.coupleBalcony,
      alt: "Couple enjoying ocean view from a luxury balcony with modern architecture at sunset. Home.",
      width: "flex-[1]", // ~468px
      hoverHeight: "594px",
    },
  ],
  row2: [
    {
      src: images.portfolio3d.caseStudies.row2.bedroomPatio,
      alt: "Modern bedroom with sliding glass doors opening to a private patio and plunge pool.",
      width: "flex-[0.68]", // ~357px
      hoverHeight: "703.56px",
    },
    {
      src: images.portfolio3d.caseStudies.row2.modernKitchen,
      alt: "Modern kitchen island with four woven chairs, wood cabinets, and marble countertops.",
      width: "flex-[1]", // ~526px
      hoverHeight: "703.56px",
    },
    {
      src: images.portfolio3d.caseStudies.row2.bedroomCity,
      alt: "Modern bedroom with city view, featuring a plush bed and comfortable seating.",
      width: "flex-[0.75]", // ~397px
      hoverHeight: "704px",
    },
  ],
  row3: [
    {
      src: images.portfolio3d.caseStudies.row3.skyscraper,
      alt: "Modern skyscraper and historic building on a city street at sunrise.",
      width: "flex-[1]", // ~468px
      hoverHeight: "620.4px",
    },
    {
      src: images.portfolio3d.caseStudies.row3.forestHouse,
      alt: "Modern house in a forest with sunlight filtering through the trees.",
      width: "flex-[1.78]", // ~832px
      hoverHeight: "594px",
    },
  ],
  row4: [
    {
      src: images.portfolio3d.caseStudies.row4.apartmentEntrance,
      alt: "Carlisle Bay Apartments entrance; couple arriving by car.",
      width: "flex-[1.76]", // ~600px
      hoverHeight: "594px",
    },
    {
      src: images.portfolio3d.caseStudies.row4.apartmentBuilding,
      alt: "Modern apartment building with landscaped grounds and a couple strolling.",
      width: "flex-[1]", // ~340px
      hoverHeight: "594px",
    },
    {
      src: images.portfolio3d.caseStudies.row4.luxuryInterior,
      alt: "Luxury home interior design with ocean view, featuring a modern bar and seating area.",
      width: "flex-[1]", // ~340px
      hoverHeight: "704px",
    },
  ],
};

const textVariant = {
  hidden: { y: "100%" },
  visible: { y: "0%", transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] } },
};

const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const imageVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

/**
 * Individual row component for gallery display
 *
 * @param props - Row images array and row index
 * @returns Gallery row JSX element
 */
function ProjectRow({ rowImages, rowIndex }: { rowImages: any[]; rowIndex: number }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Default height for the row when nothing is hovered
  const defaultHeight = "440px"; // using md breakpoint default

  // Calculate active height based on hovered child
  const activeHeight =
    hoveredIndex !== null
      ? rowImages[hoveredIndex].hoverHeight || "594px"
      : defaultHeight;

  return (
    <div
      className="group/row flex flex-col md:flex-row gap-4 md:gap-6 w-full h-[440px] transition-all duration-800 ease-out"
      style={{ height: hoveredIndex !== null ? activeHeight : undefined }}
    >
      <style>{`
        @media (min-width: 768px) {
          .dynamic-row-${rowIndex} {
            height: 440px;
          }
        }
      `}</style>

      <div
        className={`contents md:block`}
      ></div>

      {rowImages.map((img, imgIndex) => (
        <motion.div
          key={imgIndex}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-5%" }}
          variants={imageVariant}
          custom={imgIndex}
          onMouseEnter={() => setHoveredIndex(imgIndex)}
          onMouseLeave={() => setHoveredIndex(null)}
          className={`relative overflow-hidden h-full group ${img.width} w-full transition-all duration-800 ease-out hover:flex-[3]`}
        >
          <ImageWithFallback
            src={img.src}
            alt={img.alt}
            className="w-full h-full object-cover transition-transform duration-800 group-hover:scale-100"
            loading="lazy"
          />
        </motion.div>
      ))}
    </div>
  );
}

export function CaseStudies() {
  return (
    <section className="bg-[var(--color-background)] px-6 md:px-12 lg:px-16 xl:px-20 py-6 md:py-8 lg:py-12 xl:py-16">
      <div className="relative w-full mx-auto">
        <motion.div
            className=""
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="text-xs font-medium tracking-[0.2em] text-[var(--color-primary)] mb-4 md:mb-6 uppercase">Trabalhos Recentes</span>
            <h6 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light leading-[1.1] w-full text-[var(--color-text-dark)] mb-4 md:mb-6">
              Enxergamos a arquitetura com intenção, emoção e significado
            </h6>
          </motion.div>

        <div className="space-y-4 md:space-y-6">
          {Object.entries(galleryImages).map(([key, rowImages], rowIndex) => (
             <ProjectRow key={key} rowImages={rowImages} rowIndex={rowIndex} />
          ))}
        </div>
      </div>
    </section>
  );
}
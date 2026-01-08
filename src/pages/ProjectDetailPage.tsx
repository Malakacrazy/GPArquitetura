/**
 * ProjectDetailPage
 *
 * Individual project detail page displaying full project information,
 * image galleries, and related projects. Dynamically fetches project
 * data based on URL slug parameter.
 *
 * @module pages/ProjectDetailPage
 * @since 1.0.0
 * @route /portfolio/:slug
 *
 * URL Parameters:
 * - slug: Project URL slug (e.g., "casa-alphaville")
 *
 * Page Layout:
 * - Hero section with project title and main image
 * - Two-column layout: Sidebar (metadata) + Main body (galleries/text)
 * - Related projects carousel at bottom
 *
 * Data Source:
 * - useProject(slug) fetches single project from Sanity
 * - useRelatedProjects() fetches random related projects
 *
 * SEO:
 * - Dynamic title and description from project data
 * - Project-specific JSON-LD structured data
 * - Three-level breadcrumb (Home > Portfólio > Project Name)
 * - Dynamic OG image from project hero image
 *
 * States:
 * - Loading: Animated pulse indicator
 * - Error: Error message with retry prompt
 * - Not Found: Project not found message
 *
 * @example
 * ```tsx
 * // Route definition in App.tsx
 * <Route path="/portfolio/:slug" element={<ProjectDetailPage />} />
 *
 * // Navigation to project
 * <Link to="/portfolio/casa-alphaville">View Project</Link>
 * ```
 */
import { useParams } from "react-router-dom";
import { Hero } from '../components/project/Hero';
import { Navigation } from "../components/shared/Navigation";
import { Footer } from "../components/shared/Footer";
import { ProjectSidebar } from "../components/project/ProjectSidebar";
import { ProjectMainBody } from "../components/project/ProjectMainBody";
import { OtherProjects } from "../components/project/OtherProjects";
import { useProject } from "../hooks/useProjects";
import { useSEO, createProjectJsonLd, createBreadcrumbJsonLd } from '../hooks/useSEO';

/**
 * Renders the project detail page with full project information
 *
 * @returns Project detail page JSX element
 */
const ProjectDetailPage = () => {
  const { slug } = useParams();
  const { project, loading, error } = useProject(slug || '');

  // Apply dynamic SEO for project detail page
  useSEO({
    title: project ? `${project.title} - Projeto` : 'Projeto',
    description: project?.description1 
      ? (project.description1.length > 160 
          ? project.description1.substring(0, 157) + '...' 
          : project.description1)
      : 'Explore este projeto arquitetônico desenvolvido pela GP Arquitetura.',
    keywords: `${project?.title || 'projeto'}, arquitetura, GP Arquitetura, ${project?.location || 'São Paulo'}`,
    canonical: `/portfolio/${slug}`,
    ogType: 'article',
    ogImage: project?.heroImage || 'https://gparquitetura.vercel.app/images/hero-portfolio-bg.webp',
    ogImageAlt: project?.title || 'Projeto GP Arquitetura',
    jsonLd: project ? {
      ...createProjectJsonLd({
        name: project.title,
        description: project.description1 || '',
        image: project.heroImage || '',
        slug: project.slug?.current || slug || '',
        category: 'Arquitetura',
        datePublished: project.completionYear ? `${project.completionYear}-01-01` : undefined,
      }),
      ...createBreadcrumbJsonLd([
        { name: 'Home', url: '/' },
        { name: 'Portfólio', url: '/portfolio' },
        { name: project.title, url: `/portfolio/${slug}` },
      ]),
    } : undefined,
  });

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center">
        <div className="animate-pulse text-[var(--color-text-secondary)]">Loading...</div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center">
        <div className="text-red-500">Failed to load project. Please try again.</div>
      </div>
    );
  }

  // No project found
  if (!project) {
    return (
      <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center">
        <div className="text-[var(--color-text-secondary)]">Project not found.</div>
      </div>
    );
  }

  return (
    <div className="page_wrap bg-[var(--color-background)] min-h-screen w-full font-sans selection:bg-[var(--color-primary)] selection:text-white">
      <Navigation />
      <Hero 
        title={project.title}
        architect={project.architect}
        heroImage={project.heroImage}
      />
      <main className="flex-1 w-full px-6 md:px-12 lg:px-16 xl:px-20 py-6 md:py-12 lg:py-16">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-12">
          <ProjectSidebar 
            title={project.title}
            architect={project.architect}
            startYear={project.startYear}
            completionYear={project.completionYear}
            location={project.location}
            area={project.area}
            photographer={project.photographer}
          />
          <ProjectMainBody 
            mainImage={project.mainImage}
            galleryGrid1={project.galleryGrid1}
            description1={project.description1}
            featuredImage={project.featuredImage}
            galleryGrid2={project.galleryGrid2}
            description2={project.description2}
          />
        </div>
      </main>
      <OtherProjects currentProjectSlug={project?.slug?.current || ''} />
      <Footer />
    </div>
  );
};

export default ProjectDetailPage;

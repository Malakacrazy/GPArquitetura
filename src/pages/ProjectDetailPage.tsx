import { useParams } from "react-router-dom";
import { ProjectHero } from './components/ProjectHero';
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import { ProjectSidebar } from "./components/ProjectSidebar";
import { ProjectMainBody } from "./components/ProjectMainBody";
import { OtherProjects } from "./components/OtherProjects";
import { useProject } from "./hooks/useProjects";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";

const App = () => {
  const { slug } = useParams();
  const { project, loading, error } = useProject(slug || '');

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
      <SpeedInsights />
      <Analytics />
      <Navigation />
      <ProjectHero 
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

export default App;
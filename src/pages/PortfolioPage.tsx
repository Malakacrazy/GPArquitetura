import { useState } from 'react';
import { Hero } from './components/Hero';
import { Navigation } from './components/Navigation';
import { GridList } from './components/GridList';
import { ProjectsGridView } from './components/ProjectsGridView';
import { ProjectsListView } from './components/ProjectsListView';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';
import { useProjects } from './hooks/useProjects';
import { adaptSanityProjects } from './utils/sanityAdapter';
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Analytics } from "@vercel/analytics/react"

export default function App() {
  const [isGridView, setIsGridView] = useState(true);
  const { projects: sanityProjects, loading, error } = useProjects();

  // Convert Sanity projects to grid format
  const projects = adaptSanityProjects(sanityProjects);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)]">
        <p className="text-xl">Loading projects...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)]">
        <p className="text-xl text-red-500">Error loading projects. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-background)' }}>
      <SpeedInsights />
      <Analytics />
      <Navigation />
      <Hero />
      <GridList isGridView={isGridView} setIsGridView={setIsGridView} />
      
      {isGridView ? (
        <ProjectsGridView projects={projects} />
      ) : (
        <ProjectsListView projects={projects} />
      )}
      
      <Footer />
      <BackToTop />
    </div>
  );
}
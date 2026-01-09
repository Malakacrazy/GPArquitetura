/**
 * Hooks Module Index
 *
 * Central export file for all custom React hooks.
 * Import hooks from this file for cleaner import statements.
 *
 * @module hooks
 * @since 1.0.0
 *
 * Available Exports:
 *
 * Project Hooks (from useProjects):
 * - useProjects: Fetch all projects
 * - useFeaturedProjects: Fetch featured projects
 * - useProject: Fetch single project by slug
 * - useRelatedProjects: Fetch random related projects
 *
 * SEO Hooks (from useSEO):
 * - useSEO: Manage page SEO metadata
 * - SEO_CONFIG: Pre-configured page settings
 * - createProjectJsonLd: Generate project structured data
 * - createBreadcrumbJsonLd: Generate breadcrumb structured data
 *
 * @example
 * ```tsx
 * import { useProjects, useSEO, SEO_CONFIG } from '../hooks';
 *
 * function PortfolioPage() {
 *   useSEO(SEO_CONFIG.portfolio);
 *   const { projects, loading } = useProjects();
 *   // ...
 * }
 * ```
 */
export { useProjects, useFeaturedProjects, useProject, useRelatedProjects } from './useProjects';
export { useSEO, SEO_CONFIG, createProjectJsonLd, createBreadcrumbJsonLd } from './useSEO';

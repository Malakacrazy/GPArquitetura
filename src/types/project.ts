
/**
 * Project Domain Model
 *
 * This interface defines the **canonical shape** of a Project
 * as used throughout the application.
 *
 * It intentionally merges:
 * - UI concerns (grid layout, hero behavior)
 * - CMS concerns (Sanity fields)
 * - Routing concerns (slug, link)
 *
 * This avoids excessive mapping layers between CMS → UI → Router.
 *
 * @module domain/project
 * @since 1.0.0
 */
export interface Project {
  // Existing fields
  id: number;
  title: string;
  description: string;
  location: string;
  year: string;
  image: string;
  link: string;
  
  // Grid view fields
  height?: number;
  isHero?: boolean;
  column?: number;
  translateY?: number;
  
  // Sanity fields
  _id?: string;
  slug?: {
    current: string;
  };
  thumbnailImage?: any;
  shortDescription?: string;
  architect?: string;
  startYear?: number;
  completionYear?: number;
}

/**
 * Project Type Definitions
 *
 * TypeScript interfaces for portfolio project data structures.
 * Used throughout the application for type-safe project handling.
 *
 * @module types/project
 * @since 1.0.0
 */

/**
 * Project interface representing a portfolio project
 *
 * Combines fields from both the local grid system and Sanity CMS.
 * Used in portfolio views, project details, and related projects.
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
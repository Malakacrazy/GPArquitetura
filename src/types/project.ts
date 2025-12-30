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
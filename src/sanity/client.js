/**
 * Sanity CMS Client Configuration
 *
 * Initializes and exports the Sanity client for fetching content from the CMS.
 * Includes helper functions for generating optimized image URLs.
 *
 * @module sanity/client
 * @since 1.0.0
 *
 * Environment Variables:
 * - VITE_SANITY_PROJECT_ID: Sanity project identifier
 * - VITE_SANITY_DATASET: Dataset name (production/development)
 *
 * Configuration:
 * - useCdn: true - Uses Sanity's edge CDN for faster reads
 * - apiVersion: '2024-01-01' - API version for consistent behavior
 *
 * @example
 * ```javascript
 * import { client, urlFor } from '../sanity/client';
 *
 * // Fetch data
 * const projects = await client.fetch('*[_type == "project"]');
 *
 * // Generate image URL
 * const imageUrl = urlFor(project.heroImage).width(800).url();
 * ```
 */
import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

/**
 * Sanity client instance
 *
 * Pre-configured client for making GROQ queries to Sanity CMS.
 * Uses environment variables with fallback defaults for development.
 *
 * @type {import('@sanity/client').SanityClient}
 */
export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'dffchnvy',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2024-01-01'
})

/**
 * Image URL builder instance
 * @private
 */
const builder = createImageUrlBuilder(client)

/**
 * Generates optimized image URLs from Sanity image references
 *
 * Supports chaining methods for transformations:
 * - .width(n) / .height(n) - Resize dimensions
 * - .fit('crop'|'clip'|'fill'|'max'|'min') - Fit mode
 * - .format('webp'|'jpg'|'png') - Output format
 * - .quality(n) - Compression quality (0-100)
 *
 * @param {Object} source - Sanity image reference object
 * @returns {import('@sanity/image-url').ImageUrlBuilder} Image URL builder
 *
 * @example
 * ```javascript
 * // Basic usage
 * const url = urlFor(project.heroImage).url();
 *
 * // With transformations
 * const thumbnailUrl = urlFor(project.thumbnailImage)
 *   .width(400)
 *   .height(300)
 *   .fit('crop')
 *   .format('webp')
 *   .url();
 * ```
 */
export function urlFor(source) {
  return builder.image(source)
}

/**
 * Project Hooks Module
 *
 * Custom React hooks for fetching project data from Sanity CMS.
 * Provides data fetching, loading states, and error handling for
 * portfolio projects throughout the application.
 *
 * @module hooks/useProjects
 * @since 1.0.0
 *
 * Available Hooks:
 * - useProjects() - Fetch all projects ordered by custom order field
 * - useFeaturedProjects() - Fetch only featured projects
 * - useProject(slug) - Fetch a single project by slug
 * - useRelatedProjects(currentSlug, limit) - Fetch random related projects
 *
 * Data Source: Sanity CMS (https://sanity.io)
 * API: GROQ queries via @sanity/client
 *
 * @example
 * ```jsx
 * import { useProjects, useProject } from '../hooks/useProjects';
 *
 * function Portfolio() {
 *   const { projects, loading, error } = useProjects();
 *   if (loading) return <Loader />;
 *   if (error) return <Error />;
 *   return <ProjectGrid projects={projects} />;
 * }
 * ```
 */
import { useState, useEffect } from 'react'
import { client } from '../sanity/client'

/**
 * Fetches all projects from Sanity CMS
 *
 * Returns projects ordered by the custom 'order' field (ascending).
 * Includes basic project info suitable for list/grid views.
 *
 * @returns {Object} Hook return object
 * @returns {Array} returns.projects - Array of project objects
 * @returns {boolean} returns.loading - Loading state indicator
 * @returns {Error|null} returns.error - Error object if fetch failed
 *
 * @example
 * ```jsx
 * const { projects, loading, error } = useProjects();
 * ```
 */
export function useProjects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    client
      .fetch(`*[_type == "project"] | order(order asc) {
        _id,
        title,
        slug,
        thumbnailImage,
        shortDescription,
        architect,
        location,
        featured,
        startYear,
        completionYear
      }`)
      .then((data) => {
        setProjects(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error fetching projects:', err)
        setError(err)
        setLoading(false)
      })
  }, [])

  return { projects, loading, error }
}

/**
 * Fetches only featured projects from Sanity CMS
 *
 * Returns projects where featured === true, ordered by custom 'order' field.
 * Used primarily for the FeaturedWorks carousel on the homepage.
 *
 * @returns {Object} Hook return object
 * @returns {Array} returns.projects - Array of featured project objects
 * @returns {boolean} returns.loading - Loading state indicator
 * @returns {Error|null} returns.error - Error object if fetch failed
 *
 * @example
 * ```jsx
 * const { projects, loading } = useFeaturedProjects();
 * ```
 */
export function useFeaturedProjects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    client
      .fetch(`*[_type == "project" && featured == true] | order(order asc) {
        _id,
        title,
        slug,
        heroImage,
        thumbnailImage,
        shortDescription,
        architect,
        location,
        featured
      }`)
      .then((data) => {
        setProjects(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error fetching featured projects:', err)
        setError(err)
        setLoading(false)
      })
  }, [])

  return { projects, loading, error }
}

/**
 * Fetches a single project by its URL slug
 *
 * If no slug is provided, returns the first featured project (or first by order).
 * Includes full project details: images, galleries, descriptions, and metadata.
 *
 * @param {string|undefined} slug - The project's URL slug (e.g., "casa-alphaville")
 * @returns {Object} Hook return object
 * @returns {Object|null} returns.project - The project object or null if not found
 * @returns {boolean} returns.loading - Loading state indicator
 * @returns {Error|null} returns.error - Error object if fetch failed
 *
 * @example
 * ```jsx
 * // In a route like /portfolio/:slug
 * const { slug } = useParams();
 * const { project, loading, error } = useProject(slug);
 * ```
 */
export function useProject(slug) {
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // If no slug provided, fetch the first featured project (or first by order)
    const query = slug
      ? `*[_type == "project" && slug.current == $slug][0]`
      : `*[_type == "project"] | order(featured desc, order asc)[0]`

    client
      .fetch(`${query} {
        _id,
        title,
        slug,
        architect,
        startYear,
        completionYear,
        location,
        area,
        photographer,
        heroImage,
        mainImage,
        galleryGrid1,
        featuredImage,
        galleryGrid2,
        description1,
        description2,
        shortDescription
      }`, slug ? { slug } : {})
      .then((data) => {
        setProject(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error fetching project:', err)
        setError(err)
        setLoading(false)
      })
  }, [slug])

  return { project, loading, error }
}

/**
 * Fetches random related projects, excluding the current project
 *
 * Used on project detail pages to show "Other Projects" or "Related Work".
 * Shuffles all projects and returns a limited subset for variety.
 *
 * @param {string|undefined} currentSlug - Slug of current project to exclude
 * @param {number} [limit=3] - Maximum number of projects to return
 * @returns {Object} Hook return object
 * @returns {Array} returns.projects - Array of random project objects
 * @returns {boolean} returns.loading - Loading state indicator
 * @returns {Error|null} returns.error - Error object if fetch failed
 *
 * @example
 * ```jsx
 * // Show 3 random projects excluding current one
 * const { projects } = useRelatedProjects(currentProject.slug.current, 3);
 * ```
 */
export function useRelatedProjects(currentSlug, limit = 3) {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Build query - exclude current project only if slug is provided
    const query = currentSlug
      ? `*[_type == "project" && slug.current != $currentSlug] {
          _id,
          title,
          slug,
          thumbnailImage,
          shortDescription
        }`
      : `*[_type == "project"] {
          _id,
          title,
          slug,
          thumbnailImage,
          shortDescription
        }`

    // Get all projects first, then randomize in JavaScript
    client
      .fetch(query, currentSlug ? { currentSlug } : {})
      .then((data) => {
        // Shuffle array and take first 3
        const shuffled = data.sort(() => 0.5 - Math.random())
        const selected = shuffled.slice(0, limit)
        setProjects(selected)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error fetching related projects:', err)
        setError(err)
        setLoading(false)
      })
  }, [currentSlug, limit])

  return { projects, loading, error }
}

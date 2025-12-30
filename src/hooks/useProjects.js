import { useState, useEffect } from 'react'
import { client } from '../sanity/client'

// Hook to get all projects
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

// Hook to get FEATURED projects only (for FeaturedWorks)
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

// Hook to get a single project by slug (or first featured/ordered project if no slug)
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

// Hook to get random projects (excluding current project)
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

/**
 * Blog Post Hooks Module
 *
 * Custom React hooks for fetching blog posts from Sanity CMS.
 *
 * @module hooks/usePosts
 *
 * Available Hooks:
 * - usePosts() - Fetch all posts, newest first
 * - usePost(slug) - Fetch a single post by slug
 * - useLatestPosts(currentSlug, limit) - Fetch the newest posts, excluding the current one
 */
import { useState, useEffect } from 'react'
import { client } from '../sanity/client'

const POST_LIST_FIELDS = `
  _id,
  title,
  slug,
  excerpt,
  category,
  publishedAt,
  coverImage
`

/**
 * Fetches all published posts ordered by publication date (newest first)
 *
 * @returns {{posts: Array, loading: boolean, error: Error|null}}
 */
export function usePosts() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    client
      .fetch(`*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {${POST_LIST_FIELDS}}`)
      .then((data) => {
        setPosts(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error fetching posts:', err)
        setError(err)
        setLoading(false)
      })
  }, [])

  return { posts, loading, error }
}

/**
 * Fetches a single post by its URL slug, including the full body
 *
 * @param {string} slug - The post's URL slug
 * @returns {{post: Object|null, loading: boolean, error: Error|null}}
 */
export function usePost(slug) {
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    client
      .fetch(`*[_type == "post" && slug.current == $slug][0] {
        ${POST_LIST_FIELDS},
        _updatedAt,
        body
      }`, { slug })
      .then((data) => {
        setPost(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error fetching post:', err)
        setError(err)
        setLoading(false)
      })
  }, [slug])

  return { post, loading, error }
}

/**
 * Fetches the newest posts, excluding the current one
 *
 * @param {string} [currentSlug] - Slug of the post being read
 * @param {number} [limit=3] - Maximum number of posts to return
 * @returns {{posts: Array, loading: boolean, error: Error|null}}
 */
export function useLatestPosts(currentSlug, limit = 3) {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    client
      .fetch(
        `*[_type == "post" && defined(slug.current) && slug.current != $currentSlug] | order(publishedAt desc)[0...$limit] {${POST_LIST_FIELDS}}`,
        { currentSlug: currentSlug || '', limit }
      )
      .then((data) => {
        setPosts(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error fetching latest posts:', err)
        setError(err)
        setLoading(false)
      })
  }, [currentSlug, limit])

  return { posts, loading, error }
}

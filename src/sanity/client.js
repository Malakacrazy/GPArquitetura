import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'dffchnvy',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2024-01-01'
})

// Helper to generate image URLs (using new named export)
const builder = createImageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source)
}

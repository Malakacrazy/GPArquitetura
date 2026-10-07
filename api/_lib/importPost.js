/**
 * BabyLoveGrowth article (API shape) -> Sanity post.
 *
 * Article fields used: title, slug, content_html, meta_description, hero_image_url, created_at
 * (see https://www.babylovegrowth.ai/docs/integrations/api). Everything with side effects
 * (Sanity client, image download) is injected so it can be tested.
 */
import { htmlToPost } from './htmlToPost.js'

const MAX_IMAGE_BYTES = 10 * 1024 * 1024
const EXCERPT_MAX = 160 // schema limit in studio-blog-cms/schemaTypes/post.js

export class ImportError extends Error {
  constructor(code, message) {
    super(message)
    this.code = code
  }
}

export const slugify = (text) =>
  text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 96)
    .replace(/-+$/, '')

/** The slug a BabyLoveGrowth article gets in Sanity (their slug can be empty) */
export const articleSlug = (article) => slugify(String(article.slug || article.title || ''))

/** Cuts at a word boundary so the Studio's 160-character rule holds */
export const fitExcerpt = (text) => {
  if (text.length <= EXCERPT_MAX) return text
  return text.slice(0, EXCERPT_MAX - 1).replace(/\s+\S*$/, '') + '…'
}

/** Downloads an image over HTTPS (default `download`) */
export async function downloadImage(url) {
  if (!/^https:\/\//i.test(url)) throw new ImportError('invalid_image', `Image URL must be https: ${url}`)
  const response = await fetch(url, { signal: AbortSignal.timeout(15_000) })
  if (!response.ok) throw new ImportError('image_failed', `Image download failed (${response.status}): ${url}`)
  const contentType = response.headers.get('content-type') || ''
  if (!contentType.startsWith('image/')) throw new ImportError('invalid_image', `Not an image: ${url}`)
  const buffer = Buffer.from(await response.arrayBuffer())
  if (buffer.length > MAX_IMAGE_BYTES) throw new ImportError('invalid_image', `Image over 10 MB: ${url}`)
  return { buffer, contentType, filename: new URL(url).pathname.split('/').pop() || 'image' }
}

/** Replaces every `_sanityAsset: 'image@<url>'` in the document with an uploaded asset reference */
async function uploadImages(doc, client, download) {
  const images = [doc.coverImage, ...doc.body.filter((block) => block._type === 'image')].filter(Boolean)
  const assetByUrl = new Map()
  for (const image of images) assetByUrl.set(image._sanityAsset.slice('image@'.length), null)

  await Promise.all(
    [...assetByUrl.keys()].map(async (url) => {
      const { buffer, contentType, filename } = await download(url)
      assetByUrl.set(url, (await client.assets.upload('image', buffer, { filename, contentType }))._id)
    })
  )

  for (const image of images) {
    const url = image._sanityAsset.slice('image@'.length)
    delete image._sanityAsset
    image.asset = { _type: 'reference', _ref: assetByUrl.get(url) }
  }
}

/**
 * Creates the post for an article. Never overwrites: an existing document (for example one
 * already edited in the Studio) is left exactly as it is.
 *
 * @returns {Promise<string>} the document id
 */
export async function importPost(article, { client, download = downloadImage, category }) {
  if (!article.content_html) throw new ImportError('missing_content', 'content_html is empty')
  if (!article.title) throw new ImportError('missing_title', 'title is empty')
  const slug = articleSlug(article)
  if (!slug) throw new ImportError('invalid_slug', 'Could not derive a slug')

  let doc
  try {
    doc = htmlToPost(article.content_html, {
      slug,
      title: article.title,
      excerpt: article.meta_description,
      heroImageUrl: article.hero_image_url,
      category,
      publishedAt: new Date(article.created_at || Date.now()).toISOString(),
    })
  } catch (error) {
    throw new ImportError('invalid_content', `Could not convert content_html: ${error.message}`)
  }
  doc.excerpt = fitExcerpt(doc.excerpt)
  if (!doc.excerpt) throw new ImportError('missing_excerpt', 'meta_description is empty')

  await uploadImages(doc, client, download)
  await client.createIfNotExists(doc)
  return doc._id
}

/**
 * Pulls BabyLoveGrowth articles and imports the ones the blog doesn't have yet.
 *
 * "Already has" means any of: its BabyLoveGrowth id was imported before (recorded in the
 * `blg-sync-state` document, so a post deleted in the Studio does not come back), a post
 * with the same slug exists, or a post with the same title exists. Existing posts are never
 * touched, so Studio edits survive every sync. The one exception: a post with no category at all
 * (the classifier failed when it was imported) gets one on a later run; a category is never changed.
 */
import { articleSlug, importPost } from './importPost.js'

export const STATE_ID = 'blg-sync-state'
const PAGE_SIZE = 50 // API maximum
const BACKFILL_LIMIT = 3 // posts without category retried per run, so the time budget stays safe

/** Thin client for the BabyLoveGrowth API; throws on any non-2xx so failures are loud */
export const createApi = (apiKey, fetchFn = fetch) => async (path) => {
  const response = await fetchFn(`https://api.babylovegrowth.ai/api/integrations${path}`, {
    headers: { 'X-API-Key': apiKey, 'Content-Type': 'application/json' },
    signal: AbortSignal.timeout(20_000),
  })
  if (!response.ok) throw new Error(`BabyLoveGrowth API ${response.status} on ${path.split('?')[0]}`)
  return response.json()
}

async function listArticles(api) {
  const all = []
  for (let offset = 0; ; offset += PAGE_SIZE) {
    const page = await api(`/v1/articles?limit=${PAGE_SIZE}&offset=${offset}`)
    all.push(...page)
    if (page.length < PAGE_SIZE) return all // newest first
  }
}

/**
 * @param {object} deps
 * @param {object} deps.client      Sanity client (write access)
 * @param {Function} deps.api       (path) => parsed JSON
 * @param {Function} [deps.download] image downloader (tests)
 * @param {Function} [deps.classify] (article, existingCategories) => category name or undefined
 * @param {Function} [deps.now]      ms clock
 * @param {number} [deps.budgetMs]   stop starting new articles after this long; the rest wait for the next run
 * @param {boolean} [deps.dryRun]    report what would be imported without writing
 */
export async function syncArticles({ client, api, download, classify, now = Date.now, budgetMs = 40_000, dryRun = false }) {
  const started = now()
  const [state, posts, articles] = await Promise.all([
    client.fetch('*[_id == $id][0]', { id: STATE_ID }),
    client.fetch('*[_type == "post"]{_id, title, category, excerpt}'),
    listArticles(api),
  ])

  const seen = new Set(state?.importedIds || [])
  const knownIds = new Set(posts.map((post) => post._id.replace(/^drafts\./, '')))
  const knownTitles = new Set(posts.map((post) => post.title))
  const categories = new Set(posts.map((post) => post.category).filter(Boolean))
  const alreadyInBlog = (article) => knownIds.has(`post-${articleSlug(article)}`) || knownTitles.has(article.title)

  const result = { imported: [], categorised: [], skipped: 0, pending: [], errors: [] }
  const todo = []
  let recognised = false
  for (const article of articles) {
    if (seen.has(article.id)) result.skipped++
    else if (alreadyInBlog(article)) {
      seen.add(article.id) // remember it, so deleting that post later doesn't bring it back
      recognised = true
      result.skipped++
    } else todo.push(article)
  }

  const remember = () => client.createOrReplace({ _id: STATE_ID, _type: 'blogSyncState', importedIds: [...seen] })

  if (dryRun) return { ...result, pending: todo.map((a) => `${a.id} ${articleSlug(a)}`), dryRun: true }

  for (const article of todo) {
    if (now() - started > budgetMs) {
      result.pending.push(`${article.id} ${articleSlug(article)}`)
      continue
    }
    try {
      const full = await api(`/v1/articles/${article.id}`)
      const category = await classify?.(article, [...categories])
      if (category) categories.add(category) // later articles in this run can reuse it
      result.imported.push(await importPost({ ...article, ...full }, { client, download, category }))
      seen.add(article.id)
      await remember()
    } catch (error) {
      result.errors.push(`${article.id} ${articleSlug(article)}: ${error.message}`)
    }
  }

  // Retry the category of posts that have none (a draft and its published twin count as one post)
  const byPost = new Map()
  for (const post of posts) {
    const key = post._id.replace(/^drafts\./, '')
    const group = byPost.get(key) || { ids: [], title: post.title, excerpt: post.excerpt, hasCategory: false }
    group.ids.push(post._id)
    group.hasCategory ||= Boolean(post.category)
    byPost.set(key, group)
  }
  const uncategorised = [...byPost.values()].filter((group) => !group.hasCategory).slice(0, BACKFILL_LIMIT)
  for (const group of classify ? uncategorised : []) {
    if (now() - started > budgetMs) break
    try {
      const category = await classify({ title: group.title, meta_description: group.excerpt }, [...categories])
      if (!category) continue // classifier failed or answered badly: stays blank, retried next run
      categories.add(category)
      for (const id of group.ids) await client.patch(id).set({ category }).commit()
      result.categorised.push(group.ids[0].replace(/^drafts\./, ''))
    } catch (error) {
      result.errors.push(`categorise ${group.ids[0]}: ${error.message}`)
    }
  }

  // Also persist ids that were only recognised as already present
  if (recognised) await remember()
  return result
}

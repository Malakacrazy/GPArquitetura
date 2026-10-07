/**
 * BabyLoveGrowth -> Sanity sync (Vercel serverless function, run by Vercel Cron; see vercel.json)
 *
 * GET /api/sync-babylovegrowth            imports articles the blog doesn't have yet
 * GET /api/sync-babylovegrowth?dryRun=1   lists what would be imported, writes nothing
 * Both need `Authorization: Bearer <CRON_SECRET>` (Vercel Cron sends it by itself when CRON_SECRET is set).
 *
 * Published posts trigger the existing Sanity -> Vercel deploy hook (see README), so the
 * pre-rendered HTML and sitemap follow without any extra step here.
 *
 * Environment variables (set in Vercel, never commit them):
 * - BABYLOVEGROWTH_API_KEY: API key from BabyLoveGrowth (Settings -> Publishing -> API)
 * - SANITY_BLOG_TOKEN: Sanity API token with write access (Editor) to the blog dataset
 * - CRON_SECRET: random string; protects this endpoint
 * - CLOUDFLARE_ACCOUNT_ID / CLOUDFLARE_API_TOKEN (optional): Workers AI picks each new post's category; without them posts import with none
 * - VITE_SANITY_BLOG_PROJECT_ID / VITE_SANITY_BLOG_DATASET: blog project (defaults: bdmwaevv / production)
 */
import { createClient } from '@sanity/client'
import { timingSafeEqual } from 'node:crypto'
import { createApi, syncArticles } from './_lib/syncArticles.js'
import { createClassifier } from './_lib/classifyCategory.js'

const safeEqual = (a, b) => {
  const x = Buffer.from(a)
  const y = Buffer.from(b)
  return x.length === y.length && timingSafeEqual(x, y)
}

export function createHandler(overrides = {}) {
  return async function handler(req, res) {
    const { BABYLOVEGROWTH_API_KEY: apiKey, SANITY_BLOG_TOKEN: token, CRON_SECRET: secret } = process.env
    if (!apiKey || !token || !secret) {
      console.error('BABYLOVEGROWTH_API_KEY, SANITY_BLOG_TOKEN or CRON_SECRET is not set')
      return res.status(500).json({ error: 'not_configured' })
    }

    const bearer = /^Bearer (.+)$/i.exec(req.headers?.authorization || '')?.[1] || ''
    if (!safeEqual(bearer, secret)) return res.status(401).json({ error: 'unauthorized' })
    if (req.method !== 'GET') {
      res.setHeader('Allow', 'GET')
      return res.status(405).json({ error: 'method_not_allowed' })
    }

    const client =
      overrides.client ||
      createClient({
        projectId: process.env.VITE_SANITY_BLOG_PROJECT_ID || 'bdmwaevv',
        dataset: process.env.VITE_SANITY_BLOG_DATASET || 'production',
        apiVersion: '2026-10-05',
        token,
        useCdn: false,
      })

    const { CLOUDFLARE_ACCOUNT_ID: accountId, CLOUDFLARE_API_TOKEN: apiToken } = process.env
    const classifier = accountId && apiToken ? createClassifier({ accountId, apiToken }) : undefined
    if (!classifier) console.warn('CLOUDFLARE_ACCOUNT_ID / CLOUDFLARE_API_TOKEN not set: posts import without category')

    try {
      const result = await syncArticles({
        client,
        api: overrides.api || createApi(apiKey),
        download: overrides.download,
        classify: overrides.classify || classifier,
        dryRun: req.query?.dryRun === '1',
      })
      console.log(`BabyLoveGrowth sync: ${JSON.stringify(result)}`)
      return res.status(result.errors.length ? 500 : 200).json(result)
    } catch (error) {
      console.error('BabyLoveGrowth sync failed:', error.message)
      return res.status(502).json({ error: 'sync_failed', message: error.message })
    }
  }
}

export default createHandler()

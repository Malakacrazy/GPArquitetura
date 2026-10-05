/**
 * Newsletter signup endpoint (Vercel serverless function)
 *
 * POST /api/subscribe  { email, website }
 *
 * Stores the address as a `subscriber` document in a PRIVATE dataset of the
 * blog's Sanity project, so e-mails are never readable through the public API.
 * The document _id is a hash of the e-mail, which makes repeated signups
 * idempotent without storing the address in the id.
 *
 * Environment variables (set in Vercel, never commit them):
 * - SANITY_NEWSLETTER_TOKEN: API token with write access to the dataset
 * - SANITY_NEWSLETTER_DATASET: private dataset name (default: newsletter)
 * - VITE_SANITY_BLOG_PROJECT_ID: blog project id (default: bdmwaevv)
 */
import { createClient } from '@sanity/client'
import { createHash } from 'node:crypto'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'method_not_allowed' })
  }

  const body = typeof req.body === 'string' ? safeParse(req.body) : req.body || {}
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''

  // Honeypot: real visitors never fill this hidden field. Answer as if it worked.
  if (body.website) return res.status(200).json({ ok: true })

  if (email.length > 254 || !EMAIL_PATTERN.test(email)) {
    return res.status(400).json({ error: 'invalid_email' })
  }

  const token = process.env.SANITY_NEWSLETTER_TOKEN
  if (!token) {
    console.error('SANITY_NEWSLETTER_TOKEN is not set')
    return res.status(500).json({ error: 'not_configured' })
  }

  const client = createClient({
    projectId: process.env.VITE_SANITY_BLOG_PROJECT_ID || 'bdmwaevv',
    dataset: process.env.SANITY_NEWSLETTER_DATASET || 'newsletter',
    apiVersion: '2026-10-05',
    token,
    useCdn: false,
  })

  try {
    await client.createIfNotExists({
      _id: `subscriber.${createHash('sha256').update(email).digest('hex').slice(0, 32)}`,
      _type: 'subscriber',
      email,
      source: 'blog',
      createdAt: new Date().toISOString(),
    })
    return res.status(200).json({ ok: true })
  } catch (error) {
    console.error('Newsletter signup failed:', error.message)
    return res.status(502).json({ error: 'storage_failed' })
  }
}

function safeParse(text) {
  try {
    return JSON.parse(text)
  } catch {
    return {}
  }
}

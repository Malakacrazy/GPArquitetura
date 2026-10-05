/**
 * Newsletter signup endpoint (Vercel serverless function)
 *
 * GET  /api/subscribe  -> { t, sig }  signed form token (see "Anti-spam")
 * POST /api/subscribe  { email, website, t, sig }
 *
 * Stores the address as a `subscriber` document in a PRIVATE dataset of the
 * blog's Sanity project, so e-mails are never readable through the public API.
 * The document _id is a hash of the e-mail, which makes repeated signups
 * idempotent without storing the address in the id.
 *
 * Anti-spam layers (all server-side, no third-party service):
 * 1. Origin check: only the site itself (and the current Vercel deployment / localhost).
 * 2. Honeypot field: hidden `website` input that people never fill.
 * 3. Signed form token: the form fetches { t, sig } on load; a submission is
 *    accepted only if the signature is valid and the token is between
 *    MIN_FORM_AGE_MS and MAX_FORM_AGE_MS old (bots that post instantly are rejected).
 * 4. Per-IP rate limit (best effort: memory is per warm serverless instance).
 * 5. E-mail checks: format, disposable-domain list and a DNS MX/A lookup.
 *
 * Environment variables (set in Vercel, never commit them):
 * - SANITY_NEWSLETTER_TOKEN: API token with write access to the dataset (also keys the form signature)
 * - SANITY_NEWSLETTER_DATASET: private dataset name (default: newsletter)
 * - VITE_SANITY_BLOG_PROJECT_ID: blog project id (default: bdmwaevv)
 * - NEWSLETTER_ALLOWED_ORIGINS: extra allowed origins, comma separated (optional)
 */
import { createClient } from '@sanity/client'
import { createHash, createHmac, timingSafeEqual } from 'node:crypto'
import { resolveMx, resolve4 } from 'node:dns/promises'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MIN_FORM_AGE_MS = 3000
const MAX_FORM_AGE_MS = 2 * 60 * 60 * 1000
const RATE_LIMIT = { max: 5, windowMs: 10 * 60 * 1000 }

const DISPOSABLE_DOMAINS = new Set([
  'mailinator.com', 'guerrillamail.com', 'sharklasers.com', '10minutemail.com', 'temp-mail.org',
  'tempmail.com', 'yopmail.com', 'trashmail.com', 'getnada.com', 'dispostable.com',
  'maildrop.cc', 'throwawaymail.com', 'fakeinbox.com', 'mohmal.com',
])

const DEFAULT_ORIGINS = ['https://studioaraci.com.br', 'https://www.studioaraci.com.br']

const hits = new Map()

export default async function handler(req, res) {
  const token = process.env.SANITY_NEWSLETTER_TOKEN
  if (!token) {
    console.error('SANITY_NEWSLETTER_TOKEN is not set')
    return res.status(500).json({ error: 'not_configured' })
  }

  if (req.method === 'GET') {
    const t = Date.now()
    res.setHeader('Cache-Control', 'no-store')
    return res.status(200).json({ t, sig: sign(t, token) })
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST')
    return res.status(405).json({ error: 'method_not_allowed' })
  }

  if (!isAllowedOrigin(req.headers?.origin)) {
    return res.status(403).json({ error: 'forbidden_origin' })
  }

  const body = typeof req.body === 'string' ? safeParse(req.body) : req.body || {}

  // Honeypot: real visitors never fill this hidden field. Answer as if it worked.
  if (body.website) return res.status(200).json({ ok: true })

  const t = Number(body.t)
  if (!Number.isFinite(t) || typeof body.sig !== 'string' || !safeEqual(body.sig, sign(t, token))) {
    return res.status(400).json({ error: 'invalid_token' })
  }
  const age = Date.now() - t
  if (age > MAX_FORM_AGE_MS) return res.status(400).json({ error: 'expired' })
  if (age < MIN_FORM_AGE_MS) return res.status(400).json({ error: 'too_fast' })

  if (isRateLimited(clientIp(req))) {
    return res.status(429).json({ error: 'rate_limited' })
  }

  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
  if (email.length > 254 || !EMAIL_PATTERN.test(email)) {
    return res.status(400).json({ error: 'invalid_email' })
  }
  const domain = email.split('@')[1]
  if (DISPOSABLE_DOMAINS.has(domain) || !(await hasMailServer(domain))) {
    return res.status(400).json({ error: 'invalid_email' })
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

export function sign(t, key) {
  return createHmac('sha256', key).update(String(t)).digest('hex')
}

function safeEqual(a, b) {
  const x = Buffer.from(a)
  const y = Buffer.from(b)
  return x.length === y.length && timingSafeEqual(x, y)
}

export function isAllowedOrigin(origin) {
  if (!origin) return false
  const allowed = new Set([
    ...DEFAULT_ORIGINS,
    ...(process.env.NEWSLETTER_ALLOWED_ORIGINS || '').split(',').map((o) => o.trim()).filter(Boolean),
  ])
  for (const host of [process.env.VERCEL_URL, process.env.VERCEL_BRANCH_URL]) {
    if (host) allowed.add(`https://${host}`)
  }
  if (allowed.has(origin)) return true
  try {
    return new URL(origin).hostname === 'localhost'
  } catch {
    return false
  }
}

function clientIp(req) {
  const forwarded = req.headers?.['x-forwarded-for']
  return (typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : '') || req.socket?.remoteAddress || 'unknown'
}

function isRateLimited(ip, now = Date.now()) {
  const recent = (hits.get(ip) || []).filter((time) => now - time < RATE_LIMIT.windowMs)
  recent.push(now)
  hits.set(ip, recent)
  // Keep the map small on long-lived instances
  if (hits.size > 5000) hits.clear()
  return recent.length > RATE_LIMIT.max
}

/** True when the domain can receive mail. Fails open on DNS errors that say nothing about the domain. */
export async function hasMailServer(domain, mx = resolveMx, a = resolve4) {
  const missing = (error) => error?.code === 'ENOTFOUND' || error?.code === 'ENODATA'
  try {
    if ((await mx(domain)).length > 0) return true
  } catch (error) {
    if (!missing(error)) return true
  }
  try {
    return (await a(domain)).length > 0
  } catch (error) {
    return !missing(error)
  }
}

function safeParse(text) {
  try {
    return JSON.parse(text)
  } catch {
    return {}
  }
}

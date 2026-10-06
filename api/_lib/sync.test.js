// Run with: node --test "api/_lib/*.test.js"
import { test, beforeEach } from 'node:test'
import assert from 'node:assert/strict'
import { syncArticles, STATE_ID } from './syncArticles.js'
import { createHandler } from '../sync-babylovegrowth.js'

const HERO = 'https://media.example.com/hero.jpeg'

const html = (title, hero = HERO) => `<div><article>
  <h1>${title}</h1>
  <p><img src="${hero}" alt="Hero"></p>
  <p>Abertura do artigo.</p>
  <blockquote><p><strong>Em resumo:</strong></p><ul><li>Primeiro</li></ul></blockquote>
  <h2 id="indice">Índice</h2><ul><li>A</li></ul>
  <h2 id="a">Seção A</h2><p>Texto</p>
  <p><img src="https://media.example.com/inline.jpeg" alt="Inline"></p>
</article></div>`

const article = (id, title, extra = {}) => ({
  id,
  title,
  slug: title.toLowerCase().replace(/\W+/g, '-'),
  meta_description: `Descrição de ${title}`,
  hero_image_url: HERO,
  created_at: `2026-0${id}-15T10:00:00.000Z`,
  ...extra,
})

let writes, uploads, posts, state, library, failIds

const client = () => ({
  fetch: async (query) => (query.includes('blg-sync-state') || query.includes('$id') ? state : posts),
  assets: { upload: async (_k, _b, { filename }) => (uploads.push(filename), { _id: `image-${filename}` }) },
  createIfNotExists: async (doc) => writes.push(['createIfNotExists', doc]),
  createOrReplace: async (doc) => {
    writes.push(['createOrReplace', doc])
    if (doc._id === STATE_ID) state = doc
  },
})
const api = async (path) => {
  if (path.startsWith('/v1/articles?')) return library.map(({ content_html, ...summary }) => summary)
  const id = Number(path.split('/').pop())
  if (failIds.has(id)) throw new Error('boom')
  return { content_html: html(library.find((a) => a.id === id).title), ...library.find((a) => a.id === id) }
}
const download = async (url) => ({ buffer: Buffer.from('x'), contentType: 'image/jpeg', filename: url.split('/').pop() })
const run = (extra = {}) => syncArticles({ client: client(), api, download, ...extra })
const created = () => writes.filter(([kind, doc]) => kind === 'createIfNotExists').map(([, doc]) => doc)

beforeEach(() => {
  writes = []
  uploads = []
  posts = []
  state = null
  failIds = new Set()
  library = [article(3, 'Terceiro artigo'), article(2, 'Segundo artigo'), article(1, 'Primeiro artigo')]
})

test('imports new articles with the BabyLoveGrowth date, uploaded images and no placeholders', async () => {
  const result = await run()
  assert.equal(result.imported.length, 3)
  const doc = created().find((d) => d._id === 'post-primeiro-artigo')
  assert.equal(doc.publishedAt, '2026-01-15T10:00:00.000Z')
  assert.equal(doc.excerpt, 'Descrição de Primeiro artigo')
  assert.equal(doc.coverImage.asset._ref, 'image-hero.jpeg')
  assert.deepEqual(doc.tldr, ['Primeiro'])
  assert.ok(!JSON.stringify(doc).includes('_sanityAsset')) // Sanity rejects unresolved placeholders
  assert.equal(doc.body.filter((b) => b._type === 'image').length, 1) // the hero is the cover, not a body image
})

test('never touches posts the blog already has (Studio edits must survive), matched by slug or title', async () => {
  posts = [
    { _id: 'post-terceiro-artigo', title: 'Editado no Studio' }, // same slug, retitled by an editor
    { _id: 'abc', title: 'Segundo artigo' }, // different id, same title
  ]
  const result = await run()
  assert.deepEqual(result.imported, ['post-primeiro-artigo'])
  assert.equal(result.skipped, 2)
  assert.deepEqual(created().map((doc) => doc._id), ['post-primeiro-artigo']) // nothing else written, let alone replaced
})

test('a post deleted in the Studio does not come back', async () => {
  await run()
  posts = [] // everything deleted in the Studio
  writes = []
  const again = await run()
  assert.equal(again.imported.length, 0)
  assert.equal(again.skipped, 3)
})

test('articles already in the blog are remembered, so deleting them later is respected', async () => {
  posts = [{ _id: 'post-primeiro-artigo', title: 'Primeiro artigo' }]
  await run()
  assert.ok(state.importedIds.includes(1))
  posts = []
  assert.ok(!(await run()).imported.includes('post-primeiro-artigo'))
})

test('dry run reports the plan and writes nothing', async () => {
  const result = await run({ dryRun: true })
  assert.equal(result.pending.length, 3)
  assert.deepEqual(writes, [])
})

test('stops starting new articles after the time budget and leaves the rest for the next run', async () => {
  let clock = 0
  const result = await run({ now: () => (clock += 30_000), budgetMs: 40_000 })
  assert.ok(result.imported.length >= 1 && result.pending.length >= 1)
  assert.equal(result.imported.length + result.pending.length, 3)
})

test('one broken article does not block the others, and is reported', async () => {
  failIds.add(2)
  const result = await run()
  assert.equal(result.imported.length, 2)
  assert.match(result.errors[0], /2 segundo-artigo: boom/)
  assert.ok(!state.importedIds.includes(2)) // retried on the next run
})

const call = async (headers, query = {}, overrides = {}) => {
  const res = { setHeader() {}, status(code) { this.code = code; return this }, json(body) { this.body = body } }
  await createHandler({ client: client(), api, download, ...overrides })({ method: 'GET', headers, query }, res)
  return res
}

test('the endpoint refuses callers without the cron secret', async () => {
  Object.assign(process.env, { BABYLOVEGROWTH_API_KEY: 'k', SANITY_BLOG_TOKEN: 't', CRON_SECRET: 'secret' })
  for (const headers of [{}, { authorization: 'Bearer nope' }]) assert.equal((await call(headers)).code, 401)
  assert.deepEqual(writes, [])
  const ok = await call({ authorization: 'Bearer secret' }, { dryRun: '1' })
  assert.equal(ok.code, 200)
  assert.equal(ok.body.dryRun, true)
})

test('the endpoint answers 500 when an article failed, so the failure shows in Vercel', async () => {
  Object.assign(process.env, { BABYLOVEGROWTH_API_KEY: 'k', SANITY_BLOG_TOKEN: 't', CRON_SECRET: 'secret' })
  failIds.add(1)
  assert.equal((await call({ authorization: 'Bearer secret' })).code, 500)
})

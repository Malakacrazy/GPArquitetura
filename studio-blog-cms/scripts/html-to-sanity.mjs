/**
 * Converts BabyLoveGrowth-style article HTML files into Sanity "post" documents (NDJSON),
 * ready for `sanity dataset import`. The conversion itself lives in api/_lib/htmlToPost.js,
 * shared with the BabyLoveGrowth webhook (api/babylovegrowth.js).
 *
 * Usage (needs `npm install` at the repository root, where node-html-parser is installed):
 *   node studio-blog-cms/scripts/html-to-sanity.mjs <out.ndjson> <article.html>... [--categories '{"<slug>":"Categoria"}']
 *   cd studio-blog-cms && npx sanity dataset import <out.ndjson> production --replace
 *
 * The slug is the file name without extension and without a leading "<8 hex>-" upload prefix.
 * Document ids are "post-<slug>", so re-running the import with --replace updates posts in place.
 * Images stay as `image@<url>` references; the importer downloads and uploads them.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { basename } from 'node:path'
import { htmlToPost } from '../../api/_lib/htmlToPost.js'

const args = process.argv.slice(2)
const flag = args.indexOf('--categories')
const categories = flag === -1 ? {} : JSON.parse(args.splice(flag, 2)[1])
const [out, ...files] = args
if (!out || !files.length) {
  console.error("Usage: node studio-blog-cms/scripts/html-to-sanity.mjs <out.ndjson> <article.html>... [--categories '{\"slug\":\"Categoria\"}']")
  process.exit(1)
}

// Newest first in the given order: later files get an earlier date
const now = Date.now()
const docs = files.map((file, i) => {
  const slug = basename(file, '.html').replace(/^[0-9a-f]{8}-/, '')
  let doc
  try {
    doc = htmlToPost(readFileSync(file, 'utf8'), {
      slug,
      category: categories[slug],
      publishedAt: new Date(now - i * 60_000).toISOString(),
    })
  } catch (error) {
    throw new Error(`${file}: ${error.message}`)
  }
  if (!doc.tldr?.length) console.warn(`⚠️  ${slug}: no "Em resumo" block found`)
  if (doc.excerpt.length > 160) {
    console.warn(`⚠️  ${slug}: excerpt is ${doc.excerpt.length} chars (schema limit is 160); the Studio will flag it`)
  }
  return doc
})
writeFileSync(out, docs.map((doc) => JSON.stringify(doc)).join('\n') + '\n')
console.log(`Wrote ${docs.length} posts to ${out}`)

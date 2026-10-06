/**
 * Converts BabyLoveGrowth-style article HTML files into Sanity "post" documents (NDJSON),
 * ready for `sanity dataset import`.
 *
 * Usage (from studio-blog-cms/, after `npm install`):
 *   node scripts/html-to-sanity.mjs <out.ndjson> <article.html>... [--categories '{"<slug>":"Categoria"}']
 *   npx sanity dataset import <out.ndjson> production --replace
 *
 * The slug is the file name without extension and without a leading "<8 hex>-" upload prefix.
 * Document ids are "post-<slug>", so re-running the import with --replace updates posts in place.
 * Images stay as `image@<url>` references; the importer downloads and uploads them.
 *
 * Mapping (matches schemaTypes/post.js and the post page):
 *   <h1>                      -> title            <meta description>   -> excerpt
 *   first <img>               -> coverImage       "Em resumo" quote    -> tldr
 *   "Dica profissional:" <p>  -> callout          <table>              -> table
 *   "Perguntas frequentes"    -> faq              "Fontes"             -> sources
 * Dropped because the site generates them: Índice, Recomendações, CTA banners, the
 * "— Giulia" sign-off and the BabyLoveGrowth footer.
 */
import {readFileSync, writeFileSync} from 'node:fs'
import {basename} from 'node:path'
import {parse} from 'node-html-parser'

const SKIP_SECTIONS = new Set(['indice', 'recomendacoes'])
const SIGN_OFF = /^—\s*Giulia$/

const squash = (text) => text.replace(/\s+/g, ' ')
const plain = (node) => squash(node.text).trim()

/** Inline content of an element -> {children, markDefs} (strong/em/links preserved) */
function inline(node, blockKey) {
  const children = []
  const markDefs = []
  const push = (text, marks) => children.push({_type: 'span', _key: `${blockKey}s${children.length}`, text, marks})

  const walk = (current, marks) => {
    for (const child of current.childNodes) {
      if (child.nodeType === 3) {
        push(squash(child.text), marks)
      } else if (child.nodeType === 1) {
        const tag = child.tagName.toLowerCase()
        if (tag === 'strong' || tag === 'b') walk(child, [...marks, 'strong'])
        else if (tag === 'em' || tag === 'i') walk(child, [...marks, 'em'])
        else if (tag === 'a' && child.getAttribute('href')) {
          const key = `${blockKey}l${markDefs.length}`
          markDefs.push({_key: key, _type: 'link', href: child.getAttribute('href')})
          walk(child, [...marks, key])
        } else walk(child, marks)
      }
    }
  }
  walk(node, [])

  // Trim the block edges and drop spans that end up empty
  if (children[0]) children[0].text = children[0].text.trimStart()
  if (children.at(-1)) children.at(-1).text = children.at(-1).text.trimEnd()
  const kept = children.filter((span) => span.text)
  return {children: kept.length ? kept : [{_type: 'span', _key: `${blockKey}s0`, text: '', marks: []}], markDefs}
}

function convert(file, category, publishedAt) {
  const root = parse(readFileSync(file, 'utf8'))
  const article = root.querySelector('article')
  const slug = basename(file, '.html').replace(/^[0-9a-f]{8}-/, '')

  const doc = {
    _id: `post-${slug}`,
    _type: 'post',
    slug: {_type: 'slug', current: slug},
    excerpt: root.querySelector('meta[name="description"]').getAttribute('content').trim(),
    publishedAt,
    body: [],
    faq: [],
    sources: [],
  }
  if (category) doc.category = category

  let counter = 0
  const key = () => `k${++counter}`
  let section = 'body' // body | faq | sources | skip

  const pushBlock = (node, style = 'normal', listItem) => {
    const blockKey = key()
    const block = {_type: 'block', _key: blockKey, style, ...inline(node, blockKey)}
    if (listItem) Object.assign(block, {listItem, level: 1})
    if (block.children.some((span) => span.text)) doc.body.push(block)
  }

  const image = (img) => ({
    _type: 'image',
    _sanityAsset: `image@${img.getAttribute('src')}`,
    alt: img.getAttribute('alt') || '',
  })

  for (const node of article.childNodes.filter((n) => n.nodeType === 1)) {
    const tag = node.tagName.toLowerCase()

    if (tag === 'h1') {
      doc.title = plain(node)
    } else if (tag === 'hr' || node.getAttribute('data-blg-cta')) {
      continue
    } else if (tag === 'h2') {
      const id = node.getAttribute('id')
      section = SKIP_SECTIONS.has(id) ? 'skip' : id === 'perguntas-frequentes' ? 'faq' : id === 'fontes' ? 'sources' : 'body'
      if (section === 'body') pushBlock(node, 'h2')
    } else if (section === 'faq') {
      if (tag === 'h3') doc.faq.push({_type: 'faqItem', _key: key(), question: plain(node), answer: ''})
      else if (tag === 'p' && doc.faq.length) doc.faq.at(-1).answer = plain(node)
    } else if (section === 'sources') {
      if (tag === 'ul') {
        for (const a of node.querySelectorAll('li a')) {
          doc.sources.push({_type: 'source', _key: key(), title: plain(a), url: a.getAttribute('href')})
        }
      }
    } else if (section === 'skip') {
      continue
    } else if (tag === 'p' && node.querySelector('img') && !plain(node)) {
      const img = node.querySelector('img')
      if (!doc.coverImage) doc.coverImage = image(img) // first image is the hero
      else doc.body.push({...image(img), _key: key()})
    } else if (tag === 'p' && /^Dica profissional:?$/i.test(plain(node.querySelector('strong') || {text: ''}))) {
      const [label, ...rest] = plain(node).split(':')
      doc.body.push({_type: 'callout', _key: key(), label: label.trim(), text: rest.join(':').trim()})
    } else if (tag === 'p') {
      pushBlock(node)
    } else if (tag === 'h3') {
      pushBlock(node, 'h3')
    } else if (tag === 'blockquote') {
      if (/^Em resumo:?$/i.test(plain(node.querySelector('strong') || {text: ''}))) {
        doc.tldr = node.querySelectorAll('li').map(plain)
      } else if (!SIGN_OFF.test(plain(node))) {
        for (const p of node.querySelectorAll('p')) pushBlock(p, 'blockquote')
      }
    } else if (tag === 'ul' || tag === 'ol') {
      for (const li of node.querySelectorAll('li')) pushBlock(li, 'normal', tag === 'ol' ? 'number' : 'bullet')
    } else if (tag === 'table') {
      const rows = node.querySelectorAll('tr').map((tr) => ({
        _type: 'tableRow',
        _key: key(),
        cells: tr.querySelectorAll('th, td').map(plain),
      }))
      doc.body.push({_type: 'table', _key: key(), rows})
    } else {
      throw new Error(`${file}: unhandled <${tag}> in section "${section}"`)
    }
  }

  for (const [name, ok] of [['title', doc.title], ['coverImage', doc.coverImage], ['tldr', doc.tldr?.length]]) {
    if (!ok) throw new Error(`${file}: missing ${name}`)
  }
  if (doc.excerpt.length > 160) {
    console.warn(`⚠️  ${slug}: excerpt is ${doc.excerpt.length} chars (schema limit is 160); the Studio will flag it`)
  }
  for (const empty of ['faq', 'sources']) if (!doc[empty].length) delete doc[empty]
  return doc
}

const args = process.argv.slice(2)
const flag = args.indexOf('--categories')
const categories = flag === -1 ? {} : JSON.parse(args.splice(flag, 2)[1])
const [out, ...files] = args
if (!out || !files.length) {
  console.error("Usage: node scripts/html-to-sanity.mjs <out.ndjson> <article.html>... [--categories '{\"slug\":\"Categoria\"}']")
  process.exit(1)
}

// Newest first in the given order: later files get an earlier date
const now = Date.now()
const docs = files.map((file, i) => {
  const slug = basename(file, '.html').replace(/^[0-9a-f]{8}-/, '')
  return convert(file, categories[slug], new Date(now - i * 60_000).toISOString())
})
writeFileSync(out, docs.map((doc) => JSON.stringify(doc)).join('\n') + '\n')
console.log(`Wrote ${docs.length} posts to ${out}`)

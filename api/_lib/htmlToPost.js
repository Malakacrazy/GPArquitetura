/**
 * Converts a BabyLoveGrowth article (full exported HTML or just the content fragment)
 * into a Sanity "post" document. Shared by the webhook (api/babylovegrowth.js) and the
 * file importer (studio-blog-cms/scripts/html-to-sanity.mjs). The `_` prefix keeps
 * Vercel from exposing this folder as an endpoint.
 *
 * Images come out as `{_type: 'image', _sanityAsset: 'image@<url>', alt}`: the NDJSON importer
 * understands that natively and the webhook swaps it for an uploaded asset reference.
 *
 * Mapping (matches studio-blog-cms/schemaTypes/post.js and the post page):
 *   <h1> / opts.title         -> title            <meta description> / opts.excerpt -> excerpt
 *   hero image                -> coverImage       "Em resumo" quote                 -> tldr
 *   "Dica profissional:" <p>  -> callout          <table>                           -> table
 *   "Perguntas frequentes"    -> faq              "Fontes"                          -> sources
 * Dropped because the site generates them: Índice, Recomendações, CTA banners, the
 * "— Giulia" sign-off and the BabyLoveGrowth footer.
 */
import { parse } from 'node-html-parser'

const SKIP_SECTIONS = new Set(['indice', 'recomendacoes'])
const SIGN_OFF = /^—\s*Giulia$/
const WRAPPERS = new Set(['div', 'article', 'section', 'main', 'body'])

const squash = (text) => text.replace(/\s+/g, ' ')
const plain = (node) => squash(node.text).trim()
const labelOf = (node) => plain(node.querySelector('strong') || { text: '' })

/** Inline content of an element -> {children, markDefs} (strong/em/links preserved) */
function inline(node, blockKey) {
  const children = []
  const markDefs = []
  const push = (text, marks) => children.push({ _type: 'span', _key: `${blockKey}s${children.length}`, text, marks })

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
          markDefs.push({ _key: key, _type: 'link', href: child.getAttribute('href') })
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
  return { children: kept.length ? kept : [{ _type: 'span', _key: `${blockKey}s0`, text: '', marks: [] }], markDefs }
}

/** Unwraps single wrapper elements (<div><article>…</article></div>) so webhook fragments work too */
function contentRoot(root) {
  let current = root.querySelector('article') || root
  for (;;) {
    const elements = current.childNodes.filter((n) => n.nodeType === 1)
    const only = elements.length === 1 ? elements[0] : null
    if (!only || !WRAPPERS.has(only.tagName.toLowerCase()) || only.getAttribute('data-blg-cta')) return current
    current = only
  }
}

/**
 * @param {string} html - full document or content fragment
 * @param {object} [opts]
 * @param {string} opts.slug
 * @param {string} [opts.title]         wins over the <h1>
 * @param {string} [opts.excerpt]       wins over <meta name="description">
 * @param {string} [opts.heroImageUrl]  cover image; otherwise the first image-only paragraph
 * @param {string} [opts.publishedAt]
 * @param {string} [opts.category]
 * @returns {object} Sanity document (without images uploaded)
 */
export function htmlToPost(html, opts = {}) {
  const root = parse(html)
  const container = contentRoot(root)
  const { slug } = opts

  const doc = {
    _id: `post-${slug}`,
    _type: 'post',
    slug: { _type: 'slug', current: slug },
    excerpt: (opts.excerpt || root.querySelector('meta[name="description"]')?.getAttribute('content') || '').trim(),
    publishedAt: opts.publishedAt || new Date().toISOString(),
    body: [],
    faq: [],
    sources: [],
  }
  if (opts.category) doc.category = opts.category
  if (opts.title) doc.title = opts.title

  let counter = 0
  const key = () => `k${++counter}`
  let section = 'body' // body | faq | sources | skip

  const pushBlock = (node, style = 'normal', listItem) => {
    const blockKey = key()
    const block = { _type: 'block', _key: blockKey, style, ...inline(node, blockKey) }
    if (listItem) Object.assign(block, { listItem, level: 1 })
    if (block.children.some((span) => span.text)) doc.body.push(block)
  }

  const image = (src, alt) => ({ _type: 'image', _sanityAsset: `image@${src}`, alt: alt || '' })
  if (opts.heroImageUrl) doc.coverImage = image(opts.heroImageUrl, opts.title)

  for (const node of container.childNodes.filter((n) => n.nodeType === 1)) {
    const tag = node.tagName.toLowerCase()

    if (tag === 'h1') {
      doc.title ||= plain(node)
    } else if (tag === 'hr' || node.getAttribute('data-blg-cta') || ['script', 'style', 'meta', 'title'].includes(tag)) {
      continue
    } else if (tag === 'h2') {
      const id = node.getAttribute('id') || ''
      const text = plain(node)
      section = SKIP_SECTIONS.has(id) || /^(índice|recomendações)$/i.test(text) ? 'skip'
        : id === 'perguntas-frequentes' || /^perguntas frequentes$/i.test(text) ? 'faq'
        : id === 'fontes' || /^fontes$/i.test(text) ? 'sources'
        : 'body'
      if (section === 'body') pushBlock(node, 'h2')
    } else if (section === 'faq') {
      if (tag === 'h3') doc.faq.push({ _type: 'faqItem', _key: key(), question: plain(node), answer: '' })
      else if (tag === 'p' && doc.faq.length) doc.faq.at(-1).answer = plain(node)
    } else if (section === 'sources') {
      if (tag === 'ul') {
        for (const a of node.querySelectorAll('li a')) {
          doc.sources.push({ _type: 'source', _key: key(), title: plain(a), url: a.getAttribute('href') })
        }
      }
    } else if (section === 'skip') {
      continue
    } else if (tag === 'p' && node.querySelector('img') && !plain(node)) {
      const img = node.querySelector('img')
      const src = img.getAttribute('src')
      if (!doc.coverImage) doc.coverImage = image(src, img.getAttribute('alt')) // first image is the hero
      else if (!(opts.heroImageUrl && (src === opts.heroImageUrl || !doc.body.length))) {
        // With a hero URL given, an image before any text is the hero repeated, not a body image
        doc.body.push({ ...image(src, img.getAttribute('alt')), _key: key() })
      }
    } else if (tag === 'p' && /^Dica profissional:?$/i.test(labelOf(node))) {
      const [label, ...rest] = plain(node).split(':')
      doc.body.push({ _type: 'callout', _key: key(), label: label.trim(), text: rest.join(':').trim() })
    } else if (tag === 'p') {
      pushBlock(node)
    } else if (tag === 'h3') {
      pushBlock(node, 'h3')
    } else if (tag === 'blockquote') {
      if (/^Em resumo:?$/i.test(labelOf(node))) {
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
      doc.body.push({ _type: 'table', _key: key(), rows })
    } else {
      throw new Error(`unhandled <${tag}> in section "${section}"`)
    }
  }

  for (const [name, ok] of [['title', doc.title], ['coverImage', doc.coverImage], ['body', doc.body.length]]) {
    if (!ok) throw new Error(`missing ${name}`)
  }
  for (const empty of ['faq', 'sources']) if (!doc[empty].length) delete doc[empty]
  return doc
}

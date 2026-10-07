/**
 * Picks a blog category for an article with Cloudflare Workers AI (the BabyLoveGrowth API sends none).
 * The model sees the categories the blog already uses, reuses one only when it fits well and
 * otherwise invents a new one. Code only checks the shape (short, one line) and reuses the exact
 * spelling of a known category, so a rambling reply can't end up as a category. Any failure resolves to undefined: the post is
 * still imported (without category) and the failure is logged.
 */
const MODEL = '@cf/meta/llama-3.3-70b-instruct-fp8-fast'
const MAX_WORDS = 3
const MAX_CHARS = 30

/** Model answer -> category, or undefined when it isn't a short label */
export const cleanCategory = (answer, known = []) => {
  const label = String(answer).split('\n')[0].replace(/^category:\s*/i, '').replace(/["'.*]/g, '').trim()
  if (!label || label.length > MAX_CHARS || label.split(/\s+/).length > MAX_WORDS) return undefined
  return known.find((name) => name.toLowerCase() === label.toLowerCase()) || label
}

export const createClassifier = ({ accountId, apiToken }, fetchFn = fetch) => async (article, known = []) => {
  try {
    const response = await fetchFn(`https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${MODEL}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [
          {
            role: 'system',
            content: `You categorise blog articles of an architecture studio, in Portuguese. ${known.length ? `Existing categories: ${known.join(', ')}. Reuse one only if it fits the article well; otherwise create a new one` : 'Create a category'} of 1-2 words, as specific as the article's main subject. Answer with the category only.`,
          },
          { role: 'user', content: `Title: ${article.title}\nDescription: ${article.meta_description || ''}` },
        ],
        max_tokens: 12,
      }),
      signal: AbortSignal.timeout(10_000),
    })
    if (!response.ok) throw new Error(`Workers AI ${response.status}`)
    const answer = String((await response.json()).result?.response || '')
    const category = cleanCategory(answer, known)
    if (!category) throw new Error(`unexpected answer "${answer.slice(0, 40)}"`)
    return category
  } catch (error) {
    console.error(`Category classification failed for "${article.title}": ${error.message}`)
    return undefined
  }
}

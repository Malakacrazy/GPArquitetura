// Run with: node --test "api/_lib/*.test.js"
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createClassifier } from './classifyCategory.js'

const reply = (response, ok = true) => async () => ({ ok, status: ok ? 200 : 500, json: async () => ({ result: { response } }) })
const classify = (fetchFn) => createClassifier({ accountId: 'a', apiToken: 't' }, fetchFn)({ title: 'Reforma de apartamento' })

test('accepts a known category even when the model wraps it in text', async () => {
  assert.equal(await classify(reply('Category: Reforma.')), 'Reforma')
})

test('a new category invented by the model is kept', async () => {
  assert.equal(await classify(reply('Paisagismo')), 'Paisagismo')
})

test('a rambling answer never becomes a category', async () => {
  assert.equal(await classify(reply('I think this article is about home renovation and budgets')), undefined)
})

test('an API failure yields no category instead of breaking the import', async () => {
  assert.equal(await classify(reply('', false)), undefined)
})

test('the model is shown the categories in use, and answers are spelled like the existing one', async () => {
  let prompt
  const fetchFn = async (_url, { body }) => {
    prompt = JSON.parse(body).messages[0].content
    return { ok: true, json: async () => ({ result: { response: 'interiores' } }) }
  }
  const category = await createClassifier({ accountId: 'a', apiToken: 't' }, fetchFn)({ title: 'x' }, ['Interiores', 'Processo'])
  assert.match(prompt, /Existing categories: Interiores, Processo/)
  assert.equal(category, 'Interiores')
})

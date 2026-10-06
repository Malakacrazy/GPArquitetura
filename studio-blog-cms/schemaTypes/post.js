export default {
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Main headline (H1). Keep under ~60 characters when possible so it fits in Google results',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      description: 'Click "Generate" →. Becomes studioaraci.com.br/blog/<slug>. Do not change after publishing',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'excerpt',
      title: 'Excerpt / Meta Description',
      type: 'text',
      rows: 3,
      description: 'Shown on the blog list and in Google results. 120–160 characters',
      validation: Rule => Rule.required().max(160)
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: Rule => Rule.required()
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'e.g., Reforma, Interiores, Processo',
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          description: 'Describe the image (accessibility + SEO)'
        }
      ],
      validation: Rule => Rule.required()
    },
    {
      name: 'tldr',
      title: 'Em resumo (TL;DR)',
      type: 'array',
      description: 'Key takeaways shown right after the intro. 3–5 short bullets',
      of: [{type: 'string'}],
      validation: Rule => Rule.max(5)
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'Quote', value: 'blockquote'}
          ]
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Alt text',
              type: 'string'
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string'
            }
          ]
        },
        {
          name: 'callout',
          title: 'Callout (Dica profissional)',
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              initialValue: 'Dica profissional'
            },
            {
              name: 'text',
              title: 'Text',
              type: 'text',
              rows: 3,
              validation: Rule => Rule.required()
            }
          ],
          preview: {
            select: {title: 'label', subtitle: 'text'}
          }
        },
        {
          name: 'table',
          title: 'Table',
          type: 'object',
          fields: [
            {
              name: 'rows',
              title: 'Rows',
              type: 'array',
              description: 'First row is the header. Every row needs the same number of cells',
              of: [
                {
                  name: 'tableRow',
                  title: 'Row',
                  type: 'object',
                  fields: [
                    {
                      name: 'cells',
                      title: 'Cells',
                      type: 'array',
                      of: [{type: 'string'}]
                    }
                  ],
                  preview: {
                    select: {cells: 'cells'},
                    prepare: ({cells}) => ({title: (cells || []).join(' | ')})
                  }
                }
              ],
              validation: Rule => Rule.required().min(2)
            }
          ],
          preview: {
            select: {rows: 'rows'},
            prepare: ({rows}) => ({
              title: 'Table',
              subtitle: ((rows && rows[0] && rows[0].cells) || []).join(' | ')
            })
          }
        }
      ],
      validation: Rule => Rule.required()
    },
    {
      name: 'faq',
      title: 'Perguntas frequentes (FAQ)',
      type: 'array',
      description: 'Question/answer pairs shown after the body (also usable as FAQ structured data)',
      of: [
        {
          name: 'faqItem',
          title: 'Question',
          type: 'object',
          fields: [
            {
              name: 'question',
              title: 'Question',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'answer',
              title: 'Answer',
              type: 'text',
              rows: 4,
              description: 'Plain text, 1–3 sentences',
              validation: Rule => Rule.required()
            }
          ],
          preview: {
            select: {title: 'question', subtitle: 'answer'}
          }
        }
      ]
    },
    {
      name: 'sources',
      title: 'Fontes',
      type: 'array',
      description: 'References cited in the article, listed at the end',
      of: [
        {
          name: 'source',
          title: 'Source',
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: Rule => Rule.required().uri({scheme: ['http', 'https']})
            }
          ],
          preview: {
            select: {title: 'title', subtitle: 'url'}
          }
        }
      ]
    }
  ],

  orderings: [
    {
      title: 'Published, newest first',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}]
    }
  ],

  preview: {
    select: {
      title: 'title',
      media: 'coverImage',
      subtitle: 'category'
    }
  }
}

const SIZES = [
  { title: 'Full width', value: 'full' },
  { title: 'Half', value: 'half' },
  { title: 'One third', value: 'third' }
]

export default {
  name: 'project',
  title: 'Portfolio Project',
  type: 'document',
  fields: [
    // BASIC INFO
    {
      name: 'title',
      title: 'Project Title',
      type: 'string',
      description: 'e.g., House On Rocky Island',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      description: 'Click "Generate" button →',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'architect',
      title: 'Architect/Author Name',
      type: 'string',
      description: 'e.g., Fernanda Marques'
    },
    
    // DATES & LOCATION
    {
      name: 'startYear',
      title: 'Start Year',
      type: 'number',
      description: 'e.g., 2022'
    },
    {
      name: 'completionYear',
      title: 'Completion Year',
      type: 'number',
      description: 'e.g., 2024'
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g., São Paulo, SP'
    },
    {
      name: 'area',
      title: 'Area',
      type: 'string',
      description: 'e.g., 380 m²'
    },
    {
      name: 'photographer',
      title: 'Photographer',
      type: 'string',
      description: 'e.g., Vilson Georges'
    },

    // IMAGES
    {
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      description: 'Full screen background image',
      options: {
        hotspot: true
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'mainImage',
      title: 'Main Project Image',
      type: 'image',
      description: 'First large image in the project page',
      options: {
        hotspot: true
      }
    },
    {
      name: 'galleryGrid1',
      title: 'First Image Grid (3 images)',
      type: 'array',
      description: 'Upload exactly 3 images',
      of: [{
        type: 'image',
        options: { hotspot: true }
      }],
      validation: Rule => Rule.length(3)
    },
    {
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      description: 'Large image in the middle',
      options: {
        hotspot: true
      }
    },
    {
      name: 'galleryGrid2',
      title: 'Second Image Grid (3 images)',
      type: 'array',
      description: 'Upload exactly 3 images',
      of: [{
        type: 'image',
        options: { hotspot: true }
      }],
      validation: Rule => Rule.length(3)
    },

    // FLEXIBLE GALLERY (images + videos, any quantity)
    {
      name: 'gallery',
      title: 'Gallery (images and videos)',
      type: 'array',
      description: 'Any number of images, videos and text blocks, shown after the main image. When filled, it replaces the fixed grids, the featured image above and — if it contains Text items — the two descriptions below.',
      of: [
        {
          type: 'image',
          title: 'Image',
          options: { hotspot: true },
          fields: [
            { name: 'size', title: 'Size', type: 'string', options: { list: SIZES, layout: 'radio' }, initialValue: 'half' },
            { name: 'alt', title: 'Alt text', type: 'string', description: 'Describes the image for accessibility and SEO' }
          ]
        },
        {
          name: 'galleryText',
          title: 'Text',
          type: 'object',
          description: 'A paragraph (or more) placed between images',
          fields: [
            { name: 'text', title: 'Text', type: 'array', of: [{ type: 'block' }] }
          ],
          preview: {
            select: { blocks: 'text' },
            prepare: ({ blocks }) => ({
              title: (blocks || []).flatMap(b => (b.children || []).map(c => c.text)).join(' ').slice(0, 80) || 'Text',
              subtitle: 'Text'
            })
          }
        },
        {
          name: 'galleryVideo',
          title: 'Video',
          type: 'object',
          fields: [
            { name: 'file', title: 'Video file', type: 'file', options: { accept: 'video/*' }, description: 'Upload an MP4 (keep it under ~50 MB)' },
            { name: 'embedUrl', title: 'Or embed URL', type: 'url', description: 'YouTube or Vimeo embed link (used only if no file is uploaded)', validation: Rule => Rule.uri({ scheme: ['https'] }) },
            { name: 'poster', title: 'Poster image', type: 'image', options: { hotspot: true }, description: 'Shown before the video plays' },
            { name: 'size', title: 'Size', type: 'string', options: { list: SIZES, layout: 'radio' }, initialValue: 'full' },
            { name: 'caption', title: 'Caption', type: 'string' }
          ],
          validation: Rule => Rule.custom(v => (v?.file?.asset || v?.embedUrl ? true : 'Upload a video file or paste an embed URL')),
          preview: {
            select: { title: 'caption', media: 'poster' },
            prepare: ({ title, media }) => ({ title: title || 'Video', subtitle: 'Video', media })
          }
        }
      ]
    },

    // TEXT CONTENT
    {
      name: 'description1',
      title: 'First Description',
      type: 'array',
      description: 'First text section (3 paragraphs)',
      of: [{type: 'block'}]
    },
    {
      name: 'description2',
      title: 'Second Description',
      type: 'array',
      description: 'Second text section (3 paragraphs)',
      of: [{type: 'block'}]
    },

    // PORTFOLIO LISTING
    {
      name: 'thumbnailImage',
      title: 'Thumbnail for Portfolio List',
      type: 'image',
      description: 'Image shown in portfolio grid',
      options: {
        hotspot: true
      }
    },
    {
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      description: 'Brief description for portfolio listing'
    },
    
    // SETTINGS
    {
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      description: 'Show on homepage?',
      initialValue: false
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first (e.g., 1, 2, 3...)'
    }
  ],
  
  preview: {
    select: {
      title: 'title',
      media: 'heroImage',
      subtitle: 'architect'
    }
  }
}
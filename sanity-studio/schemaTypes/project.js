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
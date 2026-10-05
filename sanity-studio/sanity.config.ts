import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {portfolioSchemaTypes, blogSchemaTypes} from './schemaTypes'

const plugins = [structureTool(), visionTool()]

export default defineConfig([
  {
    name: 'default',
    title: 'Portfolio CMS',
    basePath: '/portfolio',
    projectId: 'dffchnvy',
    dataset: 'production',
    plugins,
    schema: {types: portfolioSchemaTypes},
  },
  {
    name: 'blog',
    title: 'Blog CMS',
    basePath: '/blog',
    projectId: 'bdmwaevv',
    dataset: 'production',
    plugins,
    schema: {types: blogSchemaTypes},
  },
])

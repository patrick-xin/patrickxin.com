import {
  ComputedFields,
  defineDocumentType,
  makeSource,
} from 'contentlayer/source-files'

import readingTime from 'reading-time'
import mdxOptions from './src/config/mdx'

const computedFields: ComputedFields = {
  readingTime: { type: 'json', resolve: (doc) => readingTime(doc.body.raw) },
  wordCount: {
    type: 'number',
    resolve: (doc) => doc.body.raw.split(/\s+/gu).length,
  },
  slug: {
    type: 'string',
    resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ''),
  },
}

const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: '**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    publishedAt: { type: 'string', required: true },
    description: { type: 'string', required: true },
    isPublished: { type: 'boolean', required: true },
    toc: { type: 'boolean', required: true },
    thumbnail: { type: 'json', required: false },
  },
  computedFields,
}))

const Site = defineDocumentType(() => ({
  name: 'Site',
  filePathPattern: '**/*.mdx',
  contentType: 'mdx',
  fields: {
    author: { type: 'json', required: true },
    site: { type: 'json', required: true },
  },
  computedFields,
}))

const contentLayerConfig = makeSource({
  contentDirPath: 'content',
  documentTypes: [Post, Site],
  mdx: mdxOptions,
})

export default contentLayerConfig

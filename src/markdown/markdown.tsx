import path from 'node:path'

import rehypeShiki, { type RehypeShikiOptions } from '@shikijs/rehype'
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationFocus,
  transformerNotationErrorLevel,
  transformerMetaHighlight,
  transformerMetaWordHighlight,
  transformerNotationWordHighlight,
} from '@shikijs/transformers'
import { transformerTwoslash } from '@shikijs/twoslash'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import { rehypeDefaultCodeLang } from 'rehype-default-code-lang'
import rehypeSlug from 'rehype-slug'
import remarkDirective from 'remark-directive'
import remarkGfm from 'remark-gfm'
import { MDX, type MDXProps } from 'rsc-mdx'

import { rehypeGithubAlert } from './plugins'
import { rendererMdx } from './twoslash/renderMdx'

interface MarkdownProps {
  source: string
  useMDXComponents?: MDXProps['useMDXComponents']
}

export async function Markdown(props: MarkdownProps) {
  const { source, useMDXComponents } = props
  return (
    <MDX
      source={source}
      useMDXComponents={useMDXComponents}
      remarkPlugins={[remarkDirective, remarkGfm]}
      rehypePlugins={[
        rehypeGithubAlert,
        rehypeSlug,
        rehypeAutolinkHeadings,
        [
          rehypeDefaultCodeLang,
          {
            defaultLang: 'text',
          },
        ],
        [
          rehypeShiki,
          {
            parseMetaString: meta => {
              const metaData = meta.split(' ')
              const fileName = metaData.find(item => path.extname(item) !== '')
              return {
                'data-file': fileName,
              }
            },
            themes: {
              light: 'github-light',
              dark: 'dracula-soft',
            },
            transformers: [
              transformerNotationDiff(),
              transformerNotationHighlight(),
              transformerNotationWordHighlight(),
              transformerNotationFocus(),
              transformerNotationErrorLevel(),
              transformerMetaHighlight(),
              transformerMetaWordHighlight(),
              transformerTwoslash({
                renderer: rendererMdx(),
                explicitTrigger: true,
              }),
            ],
          } as RehypeShikiOptions,
        ],
      ]}
    />
  )
}

import path from 'node:path'

import type { ComponentProps } from 'react'

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
import { Blockquote } from './components/blockquote'
import { Heading } from './components/heading'
import { Paragraph } from './components/paragraph'
import { rendererMdx } from './twoslash/renderMdx'

interface MarkdownProps {
  source: string
  useMDXComponents?: MDXProps['useMDXComponents']
}

export async function Markdown(props: MarkdownProps) {
  const { source, useMDXComponents } = props

  const components = () => {
    const mdxComponents = useMDXComponents?.() ?? {}
    const baseComponents = {
      p: Paragraph,
      blockquote: Blockquote,
      h1: (props: ComponentProps<'h1'>) => <Heading as='h1' {...props} />,
      h2: (props: ComponentProps<'h2'>) => <Heading as='h2' {...props} />,
      h3: (props: ComponentProps<'h3'>) => <Heading as='h3' {...props} />,
      h4: (props: ComponentProps<'h4'>) => <Heading as='h4' {...props} />,
      h5: (props: ComponentProps<'h5'>) => <Heading as='h5' {...props} />,
      h6: (props: ComponentProps<'h6'>) => <Heading as='h6' {...props} />,
    }

    return { ...baseComponents, ...mdxComponents }
  }

  return (
    <MDX
      source={source}
      useMDXComponents={components}
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

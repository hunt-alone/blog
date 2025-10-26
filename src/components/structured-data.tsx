import { repoOwner, site } from '~/blog-config'

interface ArticleStructuredDataProps {
  title: string
  description?: string
  publishedTime: string
  modifiedTime: string
  tags: string[]
  articleNumber: number
}

export function ArticleStructuredData(props: ArticleStructuredDataProps) {
  const {
    title,
    description,
    publishedTime,
    modifiedTime,
    tags,
    articleNumber,
  } = props

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description || title,
    author: {
      '@type': 'Person',
      name: repoOwner,
      url: `https://github.com/${repoOwner}`,
    },
    publisher: {
      '@type': 'Organization',
      name: repoOwner,
      logo: {
        '@type': 'ImageObject',
        url: `${site}/icon/android-chrome-512x512.png`,
      },
    },
    datePublished: publishedTime,
    dateModified: modifiedTime,
    keywords: tags.join(', '),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${site}/posts/${articleNumber}`,
    },
    url: `${site}/posts/${articleNumber}`,
  }

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

interface WebsiteStructuredDataProps {
  name: string
  description: string
}

export function WebsiteStructuredData(props: WebsiteStructuredDataProps) {
  const { name, description } = props

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    description,
    url: site,
    author: {
      '@type': 'Person',
      name: repoOwner,
      url: `https://github.com/${repoOwner}`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${site}/posts/all?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

interface BreadcrumbStructuredDataProps {
  items: Array<{
    name: string
    url: string
  }>
}

export function BreadcrumbStructuredData(props: BreadcrumbStructuredDataProps) {
  const { items } = props

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${site}${item.url}`,
    })),
  }

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

import Link from 'next/link'

import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react'

import type { Discussion } from '@discublog/api/interface'

interface PostNavigatorProps {
  previous?: Discussion | null
  next?: Discussion | null
}

const baseLinkStyles =
  'group relative flex-1 rounded-2xl border border-surface-3 bg-white/70 px-5 py-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/50 hover:bg-white dark:border-white/10 dark:bg-white/5'

const labelStyles =
  'mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-color-3 dark:text-color-4'

const titleStyles =
  'line-clamp-2 text-base font-semibold text-slate-900 transition-colors duration-300 group-hover:text-brand dark:text-slate-100 dark:group-hover:text-white'

export const PostNavigator = (props: PostNavigatorProps) => {
  const { previous, next } = props

  if (!previous && !next) {
    return null
  }

  return (
    <nav
      aria-label='上一篇/下一篇'
      className='post-navigator mt-12 flex flex-col gap-4 rounded-3xl border border-transparent bg-surface/40 p-4 backdrop-blur sm:flex-row sm:items-stretch'
    >
      {previous ? (
        <Link
          href={`/posts/${previous.number}`}
          className={`${baseLinkStyles} sm:max-w-[50%]`}
        >
          <span className={labelStyles}>
            <IconArrowLeft className='size-3.5' />
            上一篇
          </span>
          <span className={titleStyles}>{previous.title}</span>
        </Link>
      ) : (
        <div className='hidden flex-1 sm:block' />
      )}
      {next ? (
        <Link
          href={`/posts/${next.number}`}
          className={`${baseLinkStyles} sm:max-w-[50%] sm:text-right`}
        >
          <span className={`${labelStyles} sm:justify-end`}>
            下一篇
            <IconArrowRight className='size-3.5' />
          </span>
          <span className={`${titleStyles} sm:line-clamp-2 sm:text-right`}>
            {next.title}
          </span>
        </Link>
      ) : (
        <div className='hidden flex-1 sm:block' />
      )}
    </nav>
  )
}

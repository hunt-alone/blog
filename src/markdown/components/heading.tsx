import React from 'react'

import { cn } from '@/utils'

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: HeadingTag
}

const headingBase =
  'text-balance font-semibold text-slate-900 first:mt-0 dark:text-slate-100 dark:[text-shadow:0_0_15px_rgba(0,0,0,0.35)]'

const headingSizes: Record<HeadingTag, string> = {
  h1: 'text-3xl tracking-tight lg:text-[1.8rem]',
  h2: 'text-2xl tracking-tight lg:text-[1.6rem]',
  h3: 'text-xl tracking-tight lg:text-1xl',
  h4: 'text-lg lg:text-xl',
  h5: 'text-base',
  h6: 'text-sm uppercase tracking-widest text-slate-500 dark:text-slate-400',
}

export const Heading = (props: HeadingProps) => {
  const { as: Tag = 'h2', className, ...rest } = props

  return (
    <Tag
      className={cn(headingBase, headingSizes[Tag] ?? headingSizes.h3, className)}
      {...rest}
    />
  )
}

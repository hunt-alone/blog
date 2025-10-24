import React from 'react'

import { cn } from '@/utils'

export const Blockquote = ({
  className,
  children,
  ...rest
}: React.BlockquoteHTMLAttributes<HTMLElement>) => {
  return (
    <blockquote
      className={cn(
        'relative my-2 w-full rounded-xl border border-amber-200/60 bg-amber-50/60 px-4 py-3 text-[0.95rem] text-slate-700 shadow-[0_10px_30px_-25px_rgba(250,204,21,0.8)] dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-100',
        'before:absolute before:-left-2 before:top-0 before:h-full before:w-1 before:rounded-full before:bg-gradient-to-b before:from-amber-300 before:to-amber-500 before:content-[""]',
        className,
      )}
      {...rest}
    >
      {children}
    </blockquote>
  )
}

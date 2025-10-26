import Link from 'next/link'

import { IconExternalLink } from '@tabler/icons-react'

import { cn } from '@/utils'

export const MDXLink = ({
  href,
  children,
  className,
  ...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const isExternal = href?.startsWith('http')
  const isAnchor = href?.startsWith('#')

  const baseStyles = cn(
    'inline-flex items-center gap-1 font-medium text-brand',
    'transition-all duration-200',
    'hover:underline hover:underline-offset-4',
    'focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 rounded',
    className,
  )

  if (isExternal) {
    return (
      <a
        href={href}
        target='_blank'
        rel='noopener noreferrer'
        className={baseStyles}
        {...rest}
      >
        {children}
        <IconExternalLink className='inline-block h-3.5 w-3.5 opacity-70' />
      </a>
    )
  }

  if (isAnchor || !href) {
    return (
      <a href={href} className={baseStyles} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={baseStyles} {...rest}>
      {children}
    </Link>
  )
}

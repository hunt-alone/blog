import { Children, isValidElement } from 'react'

import { cn } from '@/utils'

import { List } from './list'

const paragraphBase =
  'my-0 break-words text-[1.05rem] leading-[1.7] text-slate-700 first:mt-0 last:mb-0 dark:text-slate-200 lg:leading-[1.8]'

export const Paragraph = ({
  children,
  className,
  style,
  id,
  ...rest
}: React.HTMLAttributes<HTMLParagraphElement>) => {
  const childArray = Children.toArray(children)
  const containsList = childArray.some(child => {
    if (!isValidElement(child)) {
      return false
    }

    return child.type === List || child.type === 'ul' || child.type === 'ol'
  })

  if (containsList) {
    return (
      <div
        className={cn(className, paragraphBase, 'space-y-4')}
        style={style}
        id={id}
        {...rest}
      >
        {childArray}
      </div>
    )
  }

  return (
    <p className={cn(className, paragraphBase)} style={style} id={id} {...rest}>
      {children}
    </p>
  )
}

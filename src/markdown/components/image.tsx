'use client'

import { useState } from 'react'

import { IconMaximize, IconX } from '@tabler/icons-react'

import { cn } from '@/utils'

interface MDXImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string
  alt?: string
}

export const MDXImage = ({ src, alt, className, ...rest }: MDXImageProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  if (!src) return null

  return (
    <>
      {/* 原始图片容器 - 使用 span 避免在 p 标签内使用块级元素 */}
      <span className='group relative my-8 block overflow-hidden rounded-xl'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt || ''}
          className={cn(
            'w-full cursor-zoom-in transition-all duration-300',
            'group-hover:scale-[1.02]',
            isLoaded ? 'opacity-100' : 'opacity-0',
            className,
          )}
          loading='lazy'
          onLoad={() => setIsLoaded(true)}
          onClick={() => setIsOpen(true)}
          {...rest}
        />

        {/* 加载占位符 */}
        {!isLoaded && (
          <span className='absolute inset-0 block animate-pulse bg-surface-2' />
        )}

        {/* 放大图标 */}
        <button
          onClick={() => setIsOpen(true)}
          className={cn(
            'absolute right-3 top-3 rounded-lg bg-black/50 p-2',
            'text-white opacity-0 backdrop-blur-sm transition-all duration-200',
            'hover:bg-black/70 group-hover:opacity-100',
            'focus:outline-none focus:ring-2 focus:ring-brand',
          )}
          aria-label='View full size'
        >
          <IconMaximize className='h-4 w-4' />
        </button>

        {/* 图片说明 */}
        {alt && (
          <span className='mt-3 block text-center text-sm text-color-3'>
            {alt}
          </span>
        )}
      </span>

      {/* 全屏查看模态框 */}
      {isOpen && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm'
          onClick={() => setIsOpen(false)}
        >
          {/* 关闭按钮 */}
          <button
            onClick={() => setIsOpen(false)}
            className={cn(
              'absolute right-4 top-4 rounded-full bg-white/10 p-3',
              'text-white transition-all hover:bg-white/20',
              'focus:outline-none focus:ring-2 focus:ring-white',
            )}
            aria-label='Close'
          >
            <IconX className='h-6 w-6' />
          </button>

          {/* 全屏图片 */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt || ''}
            className='max-h-[90vh] max-w-[90vw] rounded-lg object-contain'
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </>
  )
}

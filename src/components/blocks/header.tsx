import Link from 'next/link'

import { Block } from '@/components/blocks/block'

export const TransparentHeader = () => (
  <Block
    data-type='header'
    className='group flex items-center justify-center bg-gradient-to-b from-blue-200 to-white text-black dark:from-blue-300/80 dark:to-white/70'
  >
    <Link
      className='flex h-full w-full items-center justify-center text-lg text-gray-200 md:text-2xl'
      aria-label='Go to header page'
      href='/header'
    >
      透明头部
    </Link>
  </Block>
)

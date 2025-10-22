'use client'
import type { MouseEvent } from 'react'

import { useDarkToggle } from 'dark-toggle/react'

interface Doc extends Document {
  startViewTransition: () => void
}

type Tran = {
  ready: Promise<void>
}

export const Toggle = (props: { children: React.ReactNode }) => {
  const { children } = props
  const { isDark, toggle } = useDarkToggle()
  const toggleTheme = (e: MouseEvent) => {
    // 检查是否支持 View Transition API
    const supportsViewTransition = 'startViewTransition' in document

    // 检查用户是否偏好减少动画
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // 更新主题的核心逻辑
    const updateTheme = () => {
      toggle()
      if (!isDark) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }

    // 如果不支持 View Transition 或用户偏好减少动画，直接更新
    if (!supportsViewTransition || prefersReducedMotion) {
      updateTheme()
      return
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const transiton: Tran = (document as Doc).startViewTransition(updateTheme)

    transiton.ready.then(() => {
      const { clientX, clientY } = e
      const radius = Math.hypot(
        Math.max(clientX, innerWidth - clientX),
        Math.max(clientY, innerHeight - clientY),
      )
      const clipPath = [
        `circle(0px at ${clientX}px ${clientY}px)`,
        `circle(${radius}px at ${clientX}px ${clientY}px)`,
      ]
      document.documentElement.animate(
        { clipPath: isDark ? clipPath.reverse() : clipPath },
        {
          duration: 500,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
          pseudoElement: isDark
            ? '::view-transition-old(root)'
            : '::view-transition-new(root)',
        },
      )
    })
  }
  return (
    <button
      className='h-full w-full'
      aria-label='Theme Toggle'
      onClick={toggleTheme}
    >
      {children}
    </button>
  )
}

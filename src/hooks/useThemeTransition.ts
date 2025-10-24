import { useCallback, type MouseEvent } from 'react'

import type { Theme } from 'dark-toggle'

interface TransitionOptions {
  isDark: boolean
  position?: { x: number; y: number }
}

export const useThemeTransition = () => {
  const performTransition = useCallback(
    (
      updateTheme: () => void,
      options: TransitionOptions,
      event?: MouseEvent,
    ) => {
      const { isDark, position } = options

      // 检查是否支持 View Transition API
      const supportsViewTransition =
        typeof document !== 'undefined' && 'startViewTransition' in document

      // 检查用户是否偏好减少动画
      const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches

      // 如果不支持 View Transition 或用户偏好减少动画，直接更新
      if (!supportsViewTransition || prefersReducedMotion) {
        updateTheme()
        return
      }

      const transition = (
        document as Document & {
          startViewTransition: (callback: () => void) => {
            ready: Promise<void>
          }
        }
      ).startViewTransition(updateTheme)

      transition.ready.then(() => {
        // 使用提供的位置或事件位置
        const clientX = position?.x ?? (event as MouseEvent)?.clientX ?? 0
        const clientY = position?.y ?? (event as MouseEvent)?.clientY ?? 0

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
    },
    [],
  )

  const switchTheme = useCallback(
    (
      currentTheme: Theme | null,
      targetTheme: Theme,
      setTheme: (theme: Theme) => void,
      isDark: boolean,
      position?: { x: number; y: number },
    ) => {
      if (currentTheme === targetTheme) {
        return
      }

      const updateTheme = () => {
        setTheme(targetTheme)
        if (targetTheme === 'dark') {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      }

      performTransition(updateTheme, { isDark, position })
    },
    [performTransition],
  )

  return { performTransition, switchTheme }
}

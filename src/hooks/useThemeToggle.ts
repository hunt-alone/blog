import { useCallback, type MouseEvent } from 'react'

import { useDarkToggle } from 'dark-toggle/react'

import { useThemeTransition } from './useThemeTransition'

import type { Theme } from 'dark-toggle'

/**
 * 统一的主题切换 hook
 * 集成了 dark-toggle 和主题过渡动画
 */
export const useThemeToggle = () => {
  const { isDark, theme, setTheme, toggle } = useDarkToggle()
  const { performTransition } = useThemeTransition()

  /**
   * 切换主题（在当前主题和相反主题之间切换）
   * @param event - 鼠标事件，用于确定动画起点
   */
  const handleThemeToggle = useCallback(
    (event?: MouseEvent) => {
      const updateTheme = () => {
        toggle()
        // 切换后的状态会是 !isDark
        const willBeDark = !isDark

        if (willBeDark) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      }

      performTransition(updateTheme, { isDark }, event)
    },
    [isDark, toggle, performTransition],
  )

  /**
   * 设置特定的主题
   * @param targetTheme - 目标主题 ('light' | 'dark' | 'system')
   * @param position - 动画起点位置（可选）
   */
  const handleThemeChange = useCallback(
    (targetTheme: Theme, position?: { x: number; y: number }) => {
      if (theme === targetTheme) {
        return
      }

      const updateTheme = () => {
        setTheme(targetTheme)

        const shouldBeDark =
          targetTheme === 'dark' ||
          (targetTheme === 'system' &&
            window.matchMedia('(prefers-color-scheme: dark)').matches)

        document.documentElement.classList.toggle('dark', shouldBeDark)
      }

      performTransition(updateTheme, { isDark, position }, undefined)
    },
    [theme, setTheme, isDark, performTransition],
  )

  return {
    isDark,
    theme,
    handleThemeToggle,
    handleThemeChange,
  }
}

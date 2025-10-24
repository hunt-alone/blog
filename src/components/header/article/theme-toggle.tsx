'use client'

import { IconCheck, IconSun, IconMoon } from '@tabler/icons-react'
import { type Theme } from 'dark-toggle'
import { useDarkToggle } from 'dark-toggle/react'
import { MenuTrigger } from 'react-aria-components'

import { Menu, MenuItem, Button, Popover } from '@/components/ui'
import { useIsServer } from '@/hooks/useIsServer'

interface Doc extends Document {
  startViewTransition: (callback: () => void) => ViewTransition
}

type Tran = {
  ready: Promise<void>
}

export const ThemeToggle = () => {
  const { isDark, theme, setTheme } = useDarkToggle()
  const isServer = useIsServer()

  if (isServer) {
    return null
  }

  const switchTheme = (theme: Theme) => {
    const oldTheme = document.documentElement.getAttribute('data-theme')
    if (oldTheme === theme) {
      return
    }

    // 检查是否支持 View Transition API
    const supportsViewTransition = 'startViewTransition' in document

    // 检查用户是否偏好减少动画
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    // 更新主题的核心逻辑
    const updateTheme = () => {
      setTheme(theme)
      if (theme === 'dark') {
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
    const transiton: Tran = (document as Doc).startViewTransition(updateTheme)

    transiton.ready.then(() => {
      const { clientX, clientY } = { clientX: innerWidth - 70, clientY: 80 }
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

  const currentTheme: Theme = theme ?? 'system'

  const Icon = isDark ? IconMoon : IconSun
  return (
    <MenuTrigger>
      <Button
        className='rounded p-1.5 outline-none transition-colors hover:bg-surface-1 pressed:bg-surface-1'
        aria-label='Menu'
      >
        <Icon className='size-5 transition-transform duration-300 hover:rotate-12' />
      </Button>
      <Popover placement='bottom right'>
        <Menu
          className='w-[130px]'
          onAction={theme => {
            switchTheme(theme as Theme)
          }}
        >
          {[
            ['Light', 'light'],
            ['Dark', 'dark'],
            ['System', 'system'],
          ].map(([name, theme]) => (
            <MenuItem key={theme} className='flex justify-between' id={theme}>
              {name}
              {theme === currentTheme && (
                <IconCheck className='size-4 text-brand' />
              )}
            </MenuItem>
          ))}
        </Menu>
      </Popover>
    </MenuTrigger>
  )
}

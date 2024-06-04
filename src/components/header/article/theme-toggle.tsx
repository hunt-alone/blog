'use client'

import { IconCheck, IconSun, IconMoon } from '@tabler/icons-react'
import { type Theme } from 'dark-toggle'
import { useDarkToggle } from 'dark-toggle/react'
import { MenuTrigger } from 'react-aria-components'

import { Menu, MenuItem, Button, Popover } from '@/components/ui'
import { useIsServer } from '@/hooks/useIsServer'

interface Doc extends Document {
  startViewTransition: () => void
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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const transiton: Tran = (document as Doc).startViewTransition(() => {
      setTheme(theme)
      if (theme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    })
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
          duration: 300,
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
        <Icon className='size-5' />
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

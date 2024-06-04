'use client'
import type { FC, MouseEvent } from 'react'

import { useDarkToggle } from 'dark-toggle/react'

interface Doc extends Document {
  startViewTransition: () => void
}

type Tran = {
  ready: Promise<void>
}

export const ThemeSwitch: FC = () => {
  const { isDark, setTheme } = useDarkToggle()
  const toggleTheme = (e: MouseEvent) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const transiton: Tran = (document as Doc).startViewTransition(() => {
      setTheme(isDark ? 'light' : 'dark')
      if (!isDark) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    })
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
          duration: 300,
          pseudoElement: isDark
            ? '::view-transition-old(root)'
            : '::view-transition-new(root)',
        },
      )
    })
  }
  return <button onClick={toggleTheme}>1234</button>
}

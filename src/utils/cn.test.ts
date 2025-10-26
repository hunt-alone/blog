import { describe, expect, it } from 'vitest'

import { cn } from './index'

describe('cn utility function', () => {
  it('should merge multiple class names', () => {
    const result = cn('text-sm', 'font-bold', 'text-center')
    expect(result).toBe('text-sm font-bold text-center')
  })

  it('should handle Tailwind conflicts correctly', () => {
    // tailwind-merge 会保留最后一个冲突的类
    const result = cn('px-4 py-2', 'p-6')
    expect(result).toBe('p-6')
  })

  it('should handle conditional classes with clsx', () => {
    const isActive = true
    const isDisabled = false

    const result = cn(
      'base-class',
      isActive && 'active',
      isDisabled && 'disabled',
    )

    expect(result).toContain('base-class')
    expect(result).toContain('active')
    expect(result).not.toContain('disabled')
  })

  it('should handle objects with clsx', () => {
    const result = cn('base', {
      active: true,
      disabled: false,
      'hover:bg-blue': true,
    })

    expect(result).toContain('base')
    expect(result).toContain('active')
    expect(result).toContain('hover:bg-blue')
    expect(result).not.toContain('disabled')
  })

  it('should handle arrays', () => {
    const result = cn(['text-sm', 'font-bold'], 'text-center')
    expect(result).toContain('text-sm')
    expect(result).toContain('font-bold')
    expect(result).toContain('text-center')
  })

  it('should filter out falsy values', () => {
    const result = cn('base', null, undefined, false, '', 0, 'final')
    expect(result).toBe('base final')
  })

  it('should merge Tailwind responsive classes correctly', () => {
    const result = cn('text-sm md:text-base', 'lg:text-lg')
    expect(result).toContain('text-sm')
    expect(result).toContain('md:text-base')
    expect(result).toContain('lg:text-lg')
  })

  it('should handle dark mode classes', () => {
    const result = cn('bg-white dark:bg-black', 'text-black dark:text-white')
    expect(result).toContain('bg-white')
    expect(result).toContain('dark:bg-black')
    expect(result).toContain('text-black')
    expect(result).toContain('dark:text-white')
  })
})

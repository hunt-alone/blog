import { describe, expect, it } from 'vitest'

import { cn, formatDateTime, readingTime } from './index'

describe('Utility Functions', () => {
  describe('cn', () => {
    it('should merge class names correctly', () => {
      const result = cn('text-red-500', 'text-blue-500')
      // tailwind-merge 会移除冲突的类，保留最后一个
      expect(result).toBe('text-blue-500')
    })

    it('should handle conditional classes', () => {
      const result = cn('base-class', false && 'hidden', true && 'visible')
      expect(result).toBe('base-class visible')
    })

    it('should handle undefined and null', () => {
      const result = cn('text-red-500', undefined, null, 'text-blue-500')
      expect(result).toBe('text-blue-500')
    })
  })

  describe('formatDateTime', () => {
    it('should format date correctly', () => {
      const date = new Date('2024-01-15T12:00:00Z')
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }
      const result = formatDateTime(options, date)

      // 结果会根据系统语言环境而变化，所以我们只检查基本格式
      expect(result).toBeTruthy()
      expect(typeof result).toBe('string')
    })
  })

  describe('readingTime', () => {
    it('should calculate reading time for short text', () => {
      const shortText = 'This is a short text.'
      const result = readingTime(shortText.length)
      expect(result).toBe('0.0') // 返回字符串格式
      expect(typeof result).toBe('string')
    })

    it('should calculate reading time for medium text', () => {
      // 假设平均阅读速度是每分钟200字，每个字符等于5个单词
      const mediumText = 'a'.repeat(1000) // 1000/5/200 = 1.0 分钟
      const result = readingTime(mediumText.length)
      expect(result).toBe('1.0')
      expect(typeof result).toBe('string')
    })

    it('should return formatted decimal string', () => {
      // 500 字符 / 5 = 100 单词 / 200 = 0.5 分钟
      const result = readingTime(500)
      expect(result).toBe('0.5')
    })

    it('should accept custom reading speed', () => {
      const result = readingTime(1000, 100, 5) // 更慢的阅读速度
      expect(result).toBe('2.0')
    })
  })
})

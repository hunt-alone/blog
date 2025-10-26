import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ExternalLink } from './index'

describe('ExternalLink', () => {
  it('should render with correct href', () => {
    render(<ExternalLink href='https://example.com' title='Example Link' />)

    const link = screen.getByRole('link')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', 'https://example.com')
  })

  it('should render title text when provided', () => {
    render(<ExternalLink href='https://example.com' title='Visit Site' />)

    expect(screen.getByText('Visit Site')).toBeInTheDocument()
  })

  it('should render icon only when no title', () => {
    render(<ExternalLink href='https://example.com' />)

    const link = screen.getByRole('link')
    expect(link).toBeInTheDocument()
    // 只有一个 SVG 图标
    const svg = link.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('should apply custom className', () => {
    render(<ExternalLink href='https://example.com' className='custom-class' />)

    const link = screen.getByRole('link')
    expect(link).toHaveClass('custom-class')
  })

  it('should have default transition styles', () => {
    render(<ExternalLink href='https://example.com' />)

    const link = screen.getByRole('link')
    expect(link).toHaveClass('transition-all')
    expect(link).toHaveClass('opacity-0')
    expect(link).toHaveClass('group-hover:opacity-100')
  })
})

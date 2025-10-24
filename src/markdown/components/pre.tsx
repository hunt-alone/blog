'use client'

import {
  isValidElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type DetailedHTMLProps,
  type HTMLAttributes,
  type ReactNode,
} from 'react'

import { IconCheck, IconCopy } from '@tabler/icons-react'

import { cn } from '@/utils'

type PreProps = DetailedHTMLProps<
  HTMLAttributes<HTMLPreElement>,
  HTMLPreElement
>

const toPlainText = (node: ReactNode): string => {
  if (node === null || node === undefined) {
    return ''
  }

  if (typeof node === 'string' || typeof node === 'number') {
    return String(node)
  }

  if (Array.isArray(node)) {
    return node.map(toPlainText).join('')
  }

  if (isValidElement(node)) {
    return toPlainText(node.props.children)
  }

  return ''
}

export const Pre = (props: PreProps) => {
  const { className, children, ...rest } = props

  const code = useMemo(() => toPlainText(children).trim(), [children])
  const [copied, setCopied] = useState(false)
  const [copyError, setCopyError] = useState(false)

  useEffect(() => {
    if (!copied) {
      return
    }

    const timer = window.setTimeout(() => setCopied(false), 2000)
    return () => window.clearTimeout(timer)
  }, [copied])

  useEffect(() => {
    if (!copyError) {
      return
    }

    const timer = window.setTimeout(() => setCopyError(false), 2000)
    return () => window.clearTimeout(timer)
  }, [copyError])

  const handleCopy = useCallback(async () => {
    if (!code) {
      return
    }

    if (typeof navigator === 'undefined' || !navigator.clipboard) {
      setCopyError(true)
      return
    }

    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setCopyError(false)
    } catch (error) {
      console.error('Failed to copy code block', error)
      setCopyError(true)
    }
  }, [code])

  const language =
    typeof rest['data-language'] === 'string'
      ? rest['data-language']
      : undefined
  const hasLabel = Boolean(language)

  const feedback = copyError ? '复制失败' : copied ? '复制成功' : '复制代码'
  const Icon = copied ? IconCheck : IconCopy

  return (
    <div className='group relative my-6 first:mt-0 last:mb-0'>
      {hasLabel ? (
        <span className='pointer-events-none absolute left-4 top-4 z-10 select-none rounded-full border border-white/10 bg-white/20 px-3 py-1 text-xs font-medium uppercase tracking-wide text-white backdrop-blur dark:border-white/5 dark:bg-white/10'>
          {language!.toUpperCase()}
        </span>
      ) : null}
      <button
        type='button'
        className='absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/40 text-slate-800 opacity-100 shadow-sm backdrop-blur transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 dark:border-white/10 dark:bg-white/10 dark:text-slate-100 md:opacity-0 md:group-hover:opacity-100'
        onClick={handleCopy}
        disabled={!code}
        aria-label={feedback}
        title={feedback}
      >
        <Icon
          className={cn('size-4 transition-colors', {
            'text-emerald-400': copied,
            'text-red-400': copyError,
          })}
        />
      </button>
      <pre
        {...rest}
        className={cn(
          className,
          hasLabel && 'pt-11',
          'overflow-x-auto rounded-2xl border border-slate-200/80 bg-slate-950/90 p-5 text-[0.95rem] leading-7 text-slate-100 shadow-lg transition dark:border-slate-700/70 dark:bg-slate-900/90',
        )}
      >
        {children}
      </pre>
    </div>
  )
}

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

  const feedback = copyError ? '复制失败' : copied ? '复制成功' : '复制代码'
  const Icon = copied ? IconCheck : IconCopy

  return (
    <div className='group relative my-10 overflow-hidden rounded-3xl border border-slate-200/80 bg-white/70 shadow-[0_24px_60px_-30px_rgba(15,23,42,0.4)] first:mt-0 last:mb-0 dark:border-white/10 dark:bg-white/[0.04]'>
      <div className='flex items-center justify-between border-b border-slate-200/70 bg-gradient-to-b from-white to-white/70 px-6 py-3 text-[0.65rem] font-semibold uppercase tracking-[0.55em] text-slate-500 dark:border-white/5 dark:from-white/10 dark:to-transparent dark:text-white/70'>
        <span>{(language ?? 'code').toUpperCase()}</span>
        <button
          type='button'
          className='inline-flex items-center gap-1 rounded-full border border-slate-300/70 px-3 py-1 text-[0.65rem] font-semibold tracking-[0.25em] text-slate-500 transition hover:border-slate-400 hover:text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 dark:border-white/20 dark:text-white/70 dark:hover:text-white'
          onClick={handleCopy}
          disabled={!code}
        >
          <Icon
            className={cn('size-3.5 transition-colors', {
              'text-emerald-400': copied,
              'text-red-400': copyError,
            })}
          />
          <span>{feedback}</span>
        </button>
      </div>
      <pre
        {...rest}
        className={cn(
          className,
          'overflow-x-auto bg-transparent px-6 py-5 font-mono text-[0.95rem] leading-[1.8] text-slate-900 dark:text-slate-100',
        )}
      >
        {children}
      </pre>
    </div>
  )
}

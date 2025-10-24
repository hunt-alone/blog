'use client'

import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

interface State {
  hasError: boolean
  error: Error | null
}

/**
 * Error Boundary 组件
 * 捕获子组件树中的 JavaScript 错误，并显示备用 UI
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // 记录错误到控制台
    console.error('Error caught by boundary:', error, errorInfo)

    // 调用自定义错误处理器（如果提供）
    this.props.onError?.(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // 如果提供了自定义 fallback，使用它
      if (this.props.fallback) {
        return this.props.fallback
      }

      // 默认的错误 UI
      return (
        <div className='flex min-h-screen flex-col items-center justify-center p-4'>
          <div className='max-w-md space-y-4 rounded-lg border border-red-200 bg-red-50 p-6 dark:border-red-900 dark:bg-red-950'>
            <h1 className='text-2xl font-bold text-red-900 dark:text-red-100'>
              出错了
            </h1>
            <p className='text-red-700 dark:text-red-300'>
              {this.state.error?.message || '发生了一个未知错误'}
            </p>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className='rounded bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600'
            >
              重试
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

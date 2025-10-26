// Google Analytics gtag 类型定义
interface Window {
  gtag?: (
    command: 'event',
    eventName: string,
    eventParameters?: {
      value?: number
      event_label?: string
      non_interaction?: boolean
      [key: string]: unknown
    },
  ) => void
}

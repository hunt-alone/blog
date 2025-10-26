'use client'

import { useReportWebVitals } from 'next/web-vitals'

export function WebVitals() {
  useReportWebVitals(metric => {
    // 只在开发环境打印性能指标
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Web Vitals:', {
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
      })
    }

    // 在生产环境，可以发送到分析服务
    // 例如：Google Analytics, Vercel Analytics 等
    if (process.env.NODE_ENV === 'production') {
      // 示例：发送到 Google Analytics
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', metric.name, {
          value: Math.round(
            metric.name === 'CLS' ? metric.value * 1000 : metric.value,
          ),
          event_label: metric.id,
          non_interaction: true,
        })
      }

      // 或者发送到自定义分析端点
      // fetch('/api/analytics', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(metric),
      // })
    }
  })

  return null
}

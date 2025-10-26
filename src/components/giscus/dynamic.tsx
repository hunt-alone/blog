import dynamic from 'next/dynamic'

// 动态导入 Giscus 评论组件，减少初始加载体积
export const GiscusScript = dynamic(
  () => import('./index').then(mod => ({ default: mod.GiscusScript })),
  {
    loading: () => (
      <div className='mt-32 flex min-h-[200px] items-center justify-center'>
        <div className='flex flex-col items-center gap-4 text-color-3'>
          <div className='h-8 w-8 animate-spin rounded-full border-2 border-brand border-t-transparent' />
          <p className='text-sm'>Loading comments...</p>
        </div>
      </div>
    ),
    ssr: false, // 评论系统不需要 SSR
  },
)

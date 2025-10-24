export default function NotFound() {
  return (
    <main className='m-auto flex min-h-screen flex-col items-center justify-center px-4'>
      <div className='text-center'>
        <h1 className='mb-4 text-6xl font-bold'>404</h1>
        <h2 className='mb-8 text-2xl text-color-2'>文章未找到</h2>
        <p className='mb-8 text-color-3'>
          抱歉，您访问的文章不存在或已被删除。
        </p>
        <a
          href='/'
          className='inline-block rounded-lg bg-brand px-6 py-3 text-white transition-colors hover:bg-brand/90'
        >
          返回首页
        </a>
      </div>
    </main>
  )
}

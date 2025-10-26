import optimizeLocales from '@react-aria/optimize-locales-plugin'
import withBundleAnalyzer from '@next/bundle-analyzer'

/** @type {import('next').NextConfig} */
let nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  // 优化：启用 SWC 编译器优化
  swcMinify: true,
  // 优化：启用实验性功能
  experimental: {
    serverComponentsExternalPackages: [
      'rsc-mdx',
      '@shikijs/twoslash',
      '@shikijs/rehype',
    ],
    // 优化打包大小
    optimizePackageImports: ['@tabler/icons-react'],
  },
  // 配置 headers 以提升安全性和性能
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/icon/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
  webpack(config) {
    config.plugins.push(
      optimizeLocales.webpack({
        locales: ['en-US'],
      }),
    )
    return config
  },
}

if (process.env.ANALYZE === 'true') {
  nextConfig = withBundleAnalyzer()(nextConfig)
}

export default nextConfig


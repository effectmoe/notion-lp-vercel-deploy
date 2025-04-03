/** @type {import('next').NextConfig} */
const nextConfig = {
  // 静的エクスポートは一旦コメントアウト
  // output: 'export',
  
  //basePath設定を戻す
  basePath: '/blog',
  
  images: {
    domains: [
      'via.placeholder.com',
      'prod-files-secure.s3.us-west-2.amazonaws.com',
      's3.us-west-2.amazonaws.com',
      'www.notion.so',
      'images.unsplash.com',
      'notion.so',
      'lh3.googleusercontent.com',
      'secure.notion-static.com',
      'file.notion.so',
      'img.icons8.com'
    ],
    // 画像のサイズ制限を拡大
    minimumCacheTTL: 60,
    formats: ['image/avif', 'image/webp'],
  },
  
  // リライト設定を拡張
  async rewrites() {
    return [
      {
        source: '/api/file-proxy',
        destination: '/api/file-proxy',
      },
      {
        source: '/api/pdf-proxy',
        destination: '/api/pdf-proxy',
      },
      {
        source: '/posts/:path*',
        destination: '/blog/posts/:path*',
      },
    ];
  },
  
  // セキュリティヘッダーを柔軟に設定（コンテンツ表示優先）
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self' * data: blob:; script-src 'self' 'unsafe-inline' 'unsafe-eval' * cdnjs.cloudflare.com; connect-src 'self' *.*notion.com *.amazonaws.com; img-src 'self' data: blob: * *.notion.com *.amazonaws.com https://*; style-src 'self' 'unsafe-inline' * cdnjs.cloudflare.com; font-src 'self' data: *; frame-src 'self' data: blob: *.*youtube.com youtube.com www.youtube.com; media-src 'self' * data: blob: *.notion.com *.amazonaws.com; worker-src 'self' blob:; object-src 'self' data: blob:;",
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
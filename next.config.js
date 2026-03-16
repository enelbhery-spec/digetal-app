/** @type {import('next').NextConfig} */
const nextConfig = {
  // إعدادات الصور الحالية للحفاظ على ظهور صور المنتجات
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co", // تأكد من وضع ID مشروعك هنا أو استخدام *
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
      },
      {
        protocol: "https",
        hostname: "f.nooncdn.com",
      },
    ],
  },

  // إضافة خاصية إعادة التوجيه من Vercel إلى الموقع الأساسي
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'digetal-app-q1mf.vercel.app',
          },
        ],
        destination: 'https://www.extracode.online/:path*',
        permanent: true, // 301 Redirect للأرشفة
      },
    ]
  },
};

module.exports = nextConfig;
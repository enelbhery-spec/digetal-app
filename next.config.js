/** @type {import('next').NextConfig} */

const nextConfig = {

  // ==============================
  // الصور الخارجية
  // ==============================
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
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

  // ==============================
  // Headers SEO
  // ==============================
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "index, follow",
          },
        ],
      },
    ];
  },

  // ==============================
  // الـ Redirects (إدارة التحويلات بالكامل)
  // ==============================
  async redirects() {
    return [
      
      // 1. تحويل كافة روابط متجر "سهل" القديمة نهائياً إلى رئيسية موقعك الجديد
      {
        source: "/sahlcart-store/:path*",
        destination: "/",
        permanent: true,
      },

      // 2. تحويل روابط المنتجات القديمة المحذوفة (1500 منتج) إلى الصفحة الرئيسية
      {
        source: "/products/:slug*",
        destination: "/",
        permanent: true,
      },

      // 3. كود تحويل نطاق Vercel الافتراضي إلى نطاقك الأساسي الفعلي
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "digetal-app-q1mf.vercel.app",
          },
        ],
        destination: "https://www.extracode.online/:path*",
        permanent: true,
      },

    ];
  },

};

module.exports = nextConfig;
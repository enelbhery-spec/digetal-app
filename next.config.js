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
  // Redirect Vercel Domain
  // ==============================

  async redirects() {

    return [

      {
        source: "/:path*",

        has: [
          {
            type: "host",
            value: "digetal-app-q1mf.vercel.app",
          },
        ],

        destination:
          "https://www.extracode.online/:path*",

        permanent: true,
      },

    ];
  },

};

module.exports = nextConfig;
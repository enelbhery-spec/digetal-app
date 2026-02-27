/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
    domains: ["m.media-amazon.com"],
  },
};

module.exports = nextConfig;
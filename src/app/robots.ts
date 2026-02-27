import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/", "/search", "/*?*"],
      },
    ],
    sitemap: "https://digetal-app-q1mf.vercel.app/sitemap.xml",
  };
}
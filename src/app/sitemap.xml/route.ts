import { headers } from "next/headers"

export async function GET() {

  const host = (await headers()).get("host") || "www.extracode.online"
  const protocol = host.includes("localhost") ? "http" : "https"

  const baseUrl = `${protocol}://${host}`

  const pages = [
    {
      url: `${baseUrl}/eg`,
      changefreq: "daily",
      priority: "1.0",
    },
    {
      url: `${baseUrl}/eg/privacy-policy`,
      changefreq: "monthly",
      priority: "0.5",
    },
    {
      url: `${baseUrl}/eg/terms`,
      changefreq: "monthly",
      priority: "0.5",
    },
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `
<url>
<loc>${page.url}</loc>
<lastmod>${new Date().toISOString()}</lastmod>
<changefreq>${page.changefreq}</changefreq>
<priority>${page.priority}</priority>
</url>`
  )
  .join("")}
</urlset>`

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  })
}
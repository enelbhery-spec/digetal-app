import { supabase } from "@/lib/supabase"

export async function GET() {

  const baseUrl = "https://extracode.online"

  /* جلب المنتجات */

  const { data: products } = await supabase
    .from("products")
    .select("id, created_at")

  /* جلب المقالات */

  const { data: articles } = await supabase
    .from("articles")
    .select("slug, created_at")

  let urls = []

  /* الصفحة الرئيسية */

  urls.push(`
  <url>
    <loc>${baseUrl}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  `)

  /* روابط المنتجات */

  products?.forEach((p) => {

    urls.push(`
    <url>
      <loc>${baseUrl}/eg/product/${p.id}</loc>
      <lastmod>${p.created_at}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>
    `)

  })

  /* روابط المقالات */

  articles?.forEach((a) => {

    urls.push(`
    <url>
      <loc>${baseUrl}/eg/articles/${a.slug}</loc>
      <lastmod>${a.created_at}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.7</priority>
    </url>
    `)

  })

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.join("")}
  </urlset>`

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  })
}
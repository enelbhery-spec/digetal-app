import { supabase } from "@/lib/supabase"

export async function GET() {

  const baseUrl = "https://digetal-app-q1mf.vercel.app"
  

  /* جلب المنتجات */

  const { data: products } = await supabase
    .from("products")
    .select("id, created_at")

  /* جلب المقالات */

  const { data: articles } = await supabase
    .from("articles")
    .select("slug, created_at")

  let urls: string[] = []

  const formatDate = (date: string) => {
    return new Date(date).toISOString().split("T")[0]
  }

  /* الصفحة الرئيسية */

  urls.push(`
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${formatDate(new Date().toISOString())}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  `)

  /* روابط المنتجات */

  products?.forEach((p) => {

    const date = p.created_at ? formatDate(p.created_at) : ""

    urls.push(`
    <url>
      <loc>${baseUrl}/eg/product/${p.id}</loc>
      <lastmod>${date}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>
    `)

  })

  /* روابط المقالات */

  articles?.forEach((a) => {

    const date = a.created_at ? formatDate(a.created_at) : ""

    urls.push(`
    <url>
      <loc>${baseUrl}/eg/articles/${a.slug}</loc>
      <lastmod>${date}</lastmod>
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
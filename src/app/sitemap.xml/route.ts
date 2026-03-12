import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET() {

  const baseUrl = "https://www.extracode.online"

  const { data: products } = await supabase
    .from("products")
    .select("slug,country,updated_at")

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

<url>
<loc>${baseUrl}</loc>
<lastmod>${new Date().toISOString()}</lastmod>
</url>

<url>
<loc>${baseUrl}/eg</loc>
<lastmod>${new Date().toISOString()}</lastmod>
</url>

<url>
<loc>${baseUrl}/sa</loc>
<lastmod>${new Date().toISOString()}</lastmod>
</url>
`

  products?.forEach((product) => {
    xml += `
<url>
<loc>${baseUrl}/${product.country}/product/${product.slug}</loc>
<lastmod>${product.updated_at ?? new Date().toISOString()}</lastmod>
</url>`
  })

  xml += `
</urlset>`

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  })
}
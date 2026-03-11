import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET() {

  const baseUrl = "https://www.extracode.online"

  /* 1️⃣ جلب الدول */

  const { data: countries } = await supabase
    .from("products")
    .select("country")

  if (!countries || countries.length === 0) {
    return NextResponse.json({ error: "No countries found" })
  }

  const uniqueCountries = [...new Set(countries.map(c => c.country))]

  let urls: string[] = []

  /* 2️⃣ صفحات الدول */

  uniqueCountries.forEach(country => {
    urls.push(`${baseUrl}/${country}`)
  })

  /* 3️⃣ جلب المنتجات */

  const { data: products } = await supabase
    .from("products")
    .select("slug,country")

  products?.forEach(product => {
    urls.push(`${baseUrl}/${product.country}/product/${product.slug}`)
  })

  /* 4️⃣ جلب المقارنات */

  const { data: comparisons } = await supabase
    .from("comparisons")
    .select("slug,country")

  comparisons?.forEach(compare => {
    urls.push(`${baseUrl}/${compare.country}/compare/${compare.slug}`)
  })

  /* 5️⃣ جلب التصنيفات */

  const { data: categories } = await supabase
    .from("categories")
    .select("slug,country")

  categories?.forEach(category => {
    urls.push(`${baseUrl}/${category.country}/category/${category.slug}`)
  })

  /* إنشاء XML */

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `
<url>
<loc>${url}</loc>
<changefreq>weekly</changefreq>
<priority>0.8</priority>
</url>`
  )
  .join("")}
</urlset>`

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  })
}
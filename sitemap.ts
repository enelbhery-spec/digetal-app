import { MetadataRoute } from "next"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  const baseUrl = "https://www.extracode.online"

  const { data: products } = await supabase
    .from("products")
    .select("slug,country")

  const urls: MetadataRoute.Sitemap = []

  // الصفحة الرئيسية
  urls.push({
    url: baseUrl,
    lastModified: new Date(),
  })

  // صفحات الدول
  urls.push({
    url: `${baseUrl}/eg`,
    lastModified: new Date(),
  })

  urls.push({
    url: `${baseUrl}/sa`,
    lastModified: new Date(),
  })

  // صفحات المنتجات
  if (products) {
    for (const product of products) {
      urls.push({
        url: `${baseUrl}/${product.country}/product/${product.slug}`,
        lastModified: new Date(),
      })
    }
  }

  return urls
}
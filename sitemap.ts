import { MetadataRoute } from "next"
import { supabase } from "@/lib/supabase"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  const baseUrl = "https://extracode.online"

  const { data: products } = await supabase
    .from("products")
    .select("slug,country")

  const urls = products?.map((product) => ({
    url: `${baseUrl}/${product.country}/product/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  })) || []

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      priority: 1,
    },
    ...urls,
  ]
}
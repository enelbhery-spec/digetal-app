import { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.extracode.online";

  // جلب المنتجات
  const { data: products } = await supabase
    .from("products")
    .select("slug,country");

  if (!products) return [];

  const urls: MetadataRoute.Sitemap = [];

  // صفحات الدول
  urls.push({
    url: `${baseUrl}/eg`,
    lastModified: new Date(),
  });

  urls.push({
    url: `${baseUrl}/sa`,
    lastModified: new Date(),
  });

  // صفحات المنتجات
  products.forEach((product) => {
    urls.push({
      url: `${baseUrl}/${product.country}/product/${product.slug}`,
      lastModified: new Date(),
    });
  });

  return urls;
}
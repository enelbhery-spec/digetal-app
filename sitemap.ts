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

  const urls: MetadataRoute.Sitemap = [];

  // الصفحة الرئيسية
  urls.push({
    url: baseUrl,
    lastModified: new Date(),
  });

  // صفحات الدول
  const countries = ["eg", "sa"];

  countries.forEach((country) => {
    urls.push({
      url: `${baseUrl}/${country}`,
      lastModified: new Date(),
    });
  });

  // صفحات المنتجات
  if (products) {
    products.forEach((product) => {
      urls.push({
        url: `${baseUrl}/${product.country}/product/${product.slug}`,
        lastModified: new Date(),
      });
    });
  }

  return urls;
}
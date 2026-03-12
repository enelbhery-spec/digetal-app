import { MetadataRoute } from "next"
import { createClient } from "@supabase/supabase-js"

// إعداد عميل Supabase
// ملاحظة: يفضل استخدام SUPABASE_SERVICE_ROLE_KEY في السيرفر لضمان جلب كافة البيانات
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.extracode.online"

  // 1. تعريف الروابط الثابتة (Static Routes)
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/eg`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/sa`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ]

  try {
    // 2. جلب المنتجات من قاعدة البيانات
    const { data: products, error } = await supabase
      .from("products")
      .select("slug, country, updated_at")
      .limit(1000) // يمكنك زيادة الرقم حسب حجم قاعدة بياناتك

    if (error || !products) {
      console.error("Supabase error:", error)
      return staticRoutes // العودة بالروابط الثابتة فقط في حال الخطأ
    }

    // 3. تحويل المنتجات إلى تنسيق Sitemap
    const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
      url: `${baseUrl}/${product.country}/product/${product.slug}`,
      // نستخدم تاريخ التحديث من الداتا بيز إذا وجد، وإلا نستخدم تاريخ اليوم
      lastModified: product.updated_at ? new Date(product.updated_at) : new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }))

    return [...staticRoutes, ...productRoutes]

  } catch (e) {
    console.error("Sitemap generation error:", e)
    return staticRoutes
  }
}
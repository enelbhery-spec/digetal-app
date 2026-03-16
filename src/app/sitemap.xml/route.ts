import { supabase } from "@/lib/supabase"
import { headers } from "next/headers"

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export async function GET() {
  // التعديل هنا: إضافة await لأن headers() أصبحت Promise في النسخ الجديدة
  const headersList = await headers(); 
  const host = headersList.get("host"); 
  
  // تحديد البروتوكول والدومين ديناميكياً
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const baseUrl = `${protocol}://${host}`;

  /* جلب البيانات من Supabase */
  const { data: products } = await supabase
    .from("products")
    .select("id, created_at, code")
    .order("created_at", { ascending: false })
    .range(0, 5000);

  const { data: articles } = await supabase
    .from("articles")
    .select("slug, created_at")
    .order("created_at", { ascending: false });

  const formatDate = (date: string) => {
    try {
      return new Date(date).toISOString().split("T")[0]
    } catch (e) {
      return new Date().toISOString().split("T")[0]
    }
  }

  let urls: string[] = []

  // 1. الصفحة الرئيسية
  urls.push(`
    <url>
      <loc>${baseUrl}</loc>
      <lastmod>${formatDate(new Date().toISOString())}</lastmod>
      <changefreq>daily</changefreq>
      <priority>1.0</priority>
    </url>
  `);

  // 2. روابط المنتجات
  products?.forEach((p) => {
    const date = p.created_at ? formatDate(p.created_at) : formatDate(new Date().toISOString());
    const countryPath = p.code === 'sa' ? 'sa' : 'eg';
    urls.push(`
    <url>
      <loc>${baseUrl}/${countryPath}/product/${p.id}</loc>
      <lastmod>${date}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>
    `);
  });

  // 3. روابط المقالات
  articles?.forEach((a) => {
    const date = a.created_at ? formatDate(a.created_at) : formatDate(new Date().toISOString());
    urls.push(`
    <url>
      <loc>${baseUrl}/eg/articles/${a.slug}</loc>
      <lastmod>${date}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.7</priority>
    </url>
    `);
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=0, max-age=0, must-revalidate",
    },
  });
}
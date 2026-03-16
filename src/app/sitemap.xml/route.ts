import { supabase } from "@/lib/supabase"

// منع التخزين المؤقت لضمان تحديث السايت ماب مع كل إضافة منتج
export const revalidate = 0;
export const dynamic = 'force-dynamic';

export async function GET() {
  const baseUrl = "https://www.extracode.online"

  /* 1. جلب كافة المنتجات مرتبة من الأحدث للأقدم لضمان الأرشفة السريعة */
  const { data: products, error: pError } = await supabase
    .from("products")
    .select("id, created_at, code, slug")
    .order("created_at", { ascending: false }) // الأحدث أولاً
    .range(0, 5000); 

  /* 2. جلب المقالات */
  const { data: articles, error: aError } = await supabase
    .from("articles")
    .select("slug, created_at")
    .order("created_at", { ascending: false });

  if (pError || aError) {
    console.error("Supabase Fetch Error:", pError || aError);
  }

  const formatDate = (date: string) => {
    try {
      return new Date(date).toISOString().split("T")[0]
    } catch (e) {
      return new Date().toISOString().split("T")[0]
    }
  }

  let urls: string[] = []

  // أ. الصفحة الرئيسية
  urls.push(`
    <url>
      <loc>${baseUrl}</loc>
      <lastmod>${formatDate(new Date().toISOString())}</lastmod>
      <changefreq>daily</changefreq>
      <priority>1.0</priority>
    </url>
  `);

  // ب. روابط المنتجات (دعم كامل لـ sa و eg)
  products?.forEach((p) => {
    const date = p.created_at ? formatDate(p.created_at) : formatDate(new Date().toISOString());
    const countryPath = p.code === 'sa' ? 'sa' : 'eg';
    
    // ملاحظة هندسية: نستخدم الـ id كمعرف أساسي للرابط كما في هيكلة موقعك
    const identifier = p.id; 

    urls.push(`
    <url>
      <loc>${baseUrl}/${countryPath}/product/${identifier}</loc>
      <lastmod>${date}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>
    `);
  });

  // ج. روابط المقالات
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
      "CDN-Cache-Control": "no-store",
    },
  });
}
import { supabase } from "@/lib/supabase"
import { headers } from "next/headers"

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export async function GET() {
  const headersList = await headers(); 
  const host = headersList.get("host"); 
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const baseUrl = `${protocol}://${host}`;

  const formatDate = (date: string) => {
    try {
      return new Date(date).toISOString().split("T")[0]
    } catch (e) {
      return new Date().toISOString().split("T")[0]
    }
  }

  /* 1. جلب البيانات من الجداول المختلفة */
  // جلب المنتجات مع كود الدولة
  const { data: products } = await supabase.from("products").select("id, created_at, code").limit(2000);
  
  // جلب المقالات مع كود الدولة الخاص بها (تأكد أن عمود code موجود في جدول articles)
  const { data: articles } = await supabase.from("articles").select("slug, created_at, code");

  // جلب التصنيفات (لنفترض أن اسم الجدول categories)
  const { data: categories } = await supabase.from("categories").select("slug");

  const countries = ['eg', 'sa'];
  let urls: string[] = [];

  // 1. الصفحات الرئيسية للدول (Priority 1.0)
  countries.forEach(code => {
    urls.push(`
      <url>
        <loc>${baseUrl}/${code}</loc>
        <lastmod>${formatDate(new Date().toISOString())}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
    `);
  });

  // 2. روابط التصنيفات لكل دولة (Priority 0.9)
  countries.forEach(code => {
    categories?.forEach(cat => {
      urls.push(`
        <url>
          <loc>${baseUrl}/${code}/category/${cat.slug}</loc>
          <changefreq>weekly</changefreq>
          <priority>0.9</priority>
        </url>
      `);
    });
  });

  // 3. روابط المنتجات (ديناميكية حسب كود المنتج)
  products?.forEach((p) => {
    const countryPath = p.code?.toLowerCase() || 'eg';
    urls.push(`
      <url>
        <loc>${baseUrl}/${countryPath}/product/${p.id}</loc>
        <lastmod>${formatDate(p.created_at)}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>
    `);
  });

  // 4. روابط المقالات (ديناميكية حسب كود المقال)
  articles?.forEach((a) => {
    const countryPath = a.code?.toLowerCase() || 'eg';
    urls.push(`
      <url>
        <loc>${baseUrl}/${countryPath}/articles/${a.slug}</loc>
        <lastmod>${formatDate(a.created_at)}</lastmod>
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
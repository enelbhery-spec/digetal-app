import { supabase } from "@/lib/supabase";
import { headers } from "next/headers";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export async function GET() {
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const baseUrl = `${protocol}://${host}`;

  const formatDate = (date: string) => {
    try {
      return new Date(date).toISOString().split("T")[0];
    } catch {
      return new Date().toISOString().split("T")[0];
    }
  };

  let urls: string[] = [];
  const countries = ["eg", "sa"];

  // 1. الصفحة الرئيسية (إزالة المسافات الزائدة)
  countries.forEach((code) => {
    urls.push(`<url><loc>${baseUrl}/${code}</loc><lastmod>${formatDate(new Date().toISOString())}</lastmod><changefreq>daily</changefreq><priority>1.0</priority></url>`);
  });

  // 2. التصنيفات
  const { data: categories } = await supabase.from("categories").select("slug");
  countries.forEach((country) => {
    categories?.forEach((cat) => {
      urls.push(`<url><loc>${baseUrl}/${country}/category/${cat.slug}</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>`);
    });
  });

  // 3. المنتجات - تحسين جلب البيانات
  let from = 0;
  const limit = 1000;
  let hasMore = true;

  while (hasMore) {
    const { data: products } = await supabase
      .from("products")
      .select("slug, created_at, code")
      .range(from, from + limit - 1);

    if (!products || products.length === 0) {
      hasMore = false;
    } else {
      products.forEach((p) => {
        const country = p.code?.toLowerCase() || "eg";
        // لاحظ كتابة الـ URL في سطر واحد لضمان عدم وجود مسافات
        urls.push(`<url><loc>${baseUrl}/${country}/product/${p.slug}</loc><lastmod>${formatDate(p.created_at)}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>`);
      });
      from += limit;
      if (products.length < limit) hasMore = false;
    }
    // كرر نفس المنطق للمقالات والمقارنات مع التأكد من إزالة المسافات داخل <loc>
  }

  // ... (تكملة المقالات والمقارنات بنفس الطريقة) ...

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate",
    },
  });
}
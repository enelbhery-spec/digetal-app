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

  let urls: string[] = [];
  const countries = ['eg', 'sa'];

  /* 1. جلب المنتجات (نظام الدفعات لضمان جلب كل السجلات) */
  let products: any[] = [];
  let pFrom = 0;
  let pTo = 999;
  let hasMoreProducts = true;

  while (hasMoreProducts) {
    const { data, error } = await supabase
      .from("products")
      .select("id, created_at, code")
      .range(pFrom, pTo);

    if (data && data.length > 0) {
      products = [...products, ...data];
      pFrom += 1000;
      pTo += 1000;
      if (data.length < 1000) hasMoreProducts = false;
    } else {
      hasMoreProducts = false;
    }
  }

  /* 2. جلب المقالات بنفس النظام */
  let articles: any[] = [];
  let aFrom = 0;
  let aTo = 999;
  let hasMoreArticles = true;

  while (hasMoreArticles) {
    const { data, error } = await supabase
      .from("articles")
      .select("slug, created_at, code")
      .range(aFrom, aTo);

    if (data && data.length > 0) {
      articles = [...articles, ...data];
      aFrom += 1000;
      aTo += 1000;
      if (data.length < 1000) hasMoreArticles = false;
    } else {
      hasMoreArticles = false;
    }
  }

  /* 3. جلب التصنيفات */
  const { data: categories } = await supabase.from("categories").select("slug");

  // --- بناء روابط Sitemap ---

  // روابط الدول الرئيسية
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

  // روابط التصنيفات
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

  // روابط المنتجات (كاملة)
  products.forEach((p) => {
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

  // روابط المقالات (كاملة)
  articles.forEach((a) => {
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
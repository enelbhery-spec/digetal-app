import { supabase } from "@/lib/supabase";
import { headers } from "next/headers";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export async function GET() {

  const headersList = await headers();

  const host = headersList.get("host");

  const protocol =
    process.env.NODE_ENV === "production"
      ? "https"
      : "http";

  const baseUrl = `${protocol}://${host}`;

  // =========================================
  // تنسيق التاريخ
  // =========================================

  const formatDate = (date: string) => {

    try {

      return new Date(date)
        .toISOString()
        .split("T")[0];

    } catch {

      return new Date()
        .toISOString()
        .split("T")[0];
    }
  };

  // =========================================
  // الروابط
  // =========================================

  let urls: string[] = [];

  const countries = ["eg", "sa"];

  // =========================================
  // الصفحة الرئيسية
  // =========================================

  countries.forEach((code) => {

    urls.push(`
      <url>
        <loc>${baseUrl}/${code}</loc>
        <lastmod>${formatDate(new Date().toISOString())}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
    `);
  });

  // =========================================
  // التصنيفات
  // =========================================

  const { data: categories } =
    await supabase
      .from("categories")
      .select("slug");

  countries.forEach((country) => {

    categories?.forEach((cat) => {

      urls.push(`
        <url>
          <loc>${baseUrl}/${country}/category/${cat.slug}</loc>
          <changefreq>weekly</changefreq>
          <priority>0.9</priority>
        </url>
      `);
    });
  });

  // =========================================
  // المنتجات
  // =========================================

  let from = 0;
  let to = 999;

  let hasMoreProducts = true;

  while (hasMoreProducts) {

    const { data: products } =
      await supabase
        .from("products")
        .select(`
          slug,
          created_at,
          code
        `)
        .range(from, to);

    if (!products || products.length === 0) {

      hasMoreProducts = false;

      break;
    }

    products.forEach((product) => {

      const country =
        product.code?.toLowerCase() || "eg";

      urls.push(`
        <url>
          <loc>
            ${baseUrl}/${country}/product/${product.slug}
          </loc>
          <lastmod>
            ${formatDate(product.created_at)}
          </lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.8</priority>
        </url>
      `);
    });

    from += 1000;
    to += 1000;

    if (products.length < 1000) {

      hasMoreProducts = false;
    }
  }

  // =========================================
  // المقالات
  // =========================================

  from = 0;
  to = 999;

  let hasMoreArticles = true;

  while (hasMoreArticles) {

    const { data: articles } =
      await supabase
        .from("articles")
        .select(`
          slug,
          created_at,
          code
        `)
        .range(from, to);

    if (!articles || articles.length === 0) {

      hasMoreArticles = false;

      break;
    }

    articles.forEach((article) => {

      const country =
        article.code?.toLowerCase() || "eg";

      urls.push(`
        <url>
          <loc>
            ${baseUrl}/${country}/articles/${article.slug}
          </loc>
          <lastmod>
            ${formatDate(article.created_at)}
          </lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.7</priority>
        </url>
      `);
    });

    from += 1000;
    to += 1000;

    if (articles.length < 1000) {

      hasMoreArticles = false;
    }
  }

  // =========================================
  // المقارنات
  // =========================================

  from = 0;
  to = 999;

  let hasMoreComparisons = true;

  while (hasMoreComparisons) {

    const { data: comparisons } =
      await supabase
        .from("comparison_articles")
        .select(`
          slug,
          category_slug,
          created_at,
          code
        `)
        .range(from, to);

    if (
      !comparisons ||
      comparisons.length === 0
    ) {

      hasMoreComparisons = false;

      break;
    }

    comparisons.forEach((comp) => {

      const country =
        comp.code?.toLowerCase() || "eg";

      urls.push(`
        <url>
          <loc>
            ${baseUrl}/${country}/product-comparisons/${comp.category_slug}/${comp.slug}
          </loc>
          <lastmod>
            ${formatDate(comp.created_at)}
          </lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.8</priority>
        </url>
      `);
    });

    from += 1000;
    to += 1000;

    if (comparisons.length < 1000) {

      hasMoreComparisons = false;
    }
  }

  // =========================================
  // إنشاء XML
  // =========================================

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>

  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

    ${urls.join("")}

  </urlset>`;

  return new Response(sitemap, {

    headers: {

      "Content-Type": "application/xml",

      "Cache-Control":
        "public, s-maxage=86400, stale-while-revalidate",
    },
  });
}
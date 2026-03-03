import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const baseUrl = "https://www.extracode.online";

// ===== Helper =====
function buildUrl(
  loc: string,
  changefreq = "weekly",
  priority = "0.8"
) {
  const lastMod = new Date().toISOString();

  return `
  <url>
    <loc>${loc}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

// ===== GET =====
export async function GET() {
  let urls = "";

  /* =========================
     1️⃣ الصفحة الرئيسية العامة
  ========================= */
  urls += buildUrl(baseUrl, "daily", "1.0");

  /* =========================
     2️⃣ الدول
  ========================= */
  const { data: countries } = await supabase
    .from("countries")
    .select("slug");

  if (countries) {
    for (const country of countries) {
      const countryBase = `${baseUrl}/${country.slug}`;

      // صفحة الدولة
      urls += buildUrl(countryBase, "daily", "0.9");

      // صفحة المقارنات الرئيسية
      urls += buildUrl(`${countryBase}/compare`, "weekly", "0.8");

      /* =========================
         3️⃣ منتجات الدولة
      ========================= */
      const { data: products } = await supabase
        .from("products")
        .select("slug")
        .eq("country", country.slug);

      products?.forEach((product) => {
        urls += buildUrl(
          `${countryBase}/product/${product.slug}`,
          "weekly",
          "0.8"
        );
      });

      /* =========================
         4️⃣ المقارنات
      ========================= */
      const { data: comparisons } = await supabase
        .from("comparisons")
        .select("slug")
        .eq("country", country.slug);

      comparisons?.forEach((comparison) => {
        urls += buildUrl(
          `${countryBase}/compare/${comparison.slug}`,
          "weekly",
          "0.7"
        );
      });

      /* =========================
         5️⃣ المتاجر
      ========================= */
      const { data: stores } = await supabase
        .from("stores")
        .select("slug")
        .eq("country", country.slug);

      stores?.forEach((store) => {
        urls += buildUrl(
          `${countryBase}/store/${store.slug}`,
          "weekly",
          "0.7"
        );
      });
    }
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls}
  </urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate",
    },
  });
}
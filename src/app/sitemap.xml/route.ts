import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const baseUrl = "https://digetal-app-q1mf.vercel.app";

// ===== Helpers =====
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
     1️⃣ الصفحة الرئيسية
  ========================= */
  urls += buildUrl(baseUrl, "daily", "1.0");

  /* =========================
     2️⃣ صفحات الدول
  ========================= */
  const { data: countries } = await supabase
    .from("countries")
    .select("slug");

  countries?.forEach((country) => {
    urls += buildUrl(`${baseUrl}/${country.slug}`, "daily", "0.9");
  });

  /* =========================
     3️⃣ صفحات المنتجات
  ========================= */
  const { data: products } = await supabase
    .from("products")
    .select("slug");

  products?.forEach((product) => {
    urls += buildUrl(`${baseUrl}/product/${product.slug}`, "weekly", "0.8");
  });

  /* =========================
     4️⃣ صفحات المتاجر (اختياري)
  ========================= */
  const { data: stores } = await supabase
    .from("stores")
    .select("slug");

  stores?.forEach((store) => {
    urls += buildUrl(`${baseUrl}/store/${store.slug}`, "weekly", "0.8");
  });

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
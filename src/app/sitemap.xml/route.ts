import { supabase } from "@/lib/supabase";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const headersList = await headers();

  const host =
    headersList.get("x-forwarded-host") ||
    headersList.get("host") ||
    "www.extracode.online";

  const baseUrl = `https://${host}`;

  const urls: string[] = [];

  // =========================
  // Products
  // =========================

  const { data: products, error: productsError } =
    await supabase
      .from("products")
      .select("product_url, created_at");

  if (productsError) {
    console.error("Products Error:", productsError);
  }

  products?.forEach((product) => {
    if (!product.product_url) return;

    urls.push(`
      <url>
        <loc>${product.product_url}</loc>
        <lastmod>${new Date(
          product.created_at || Date.now()
        ).toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>
    `);
  });

  // =========================
  // Safka Products
  // =========================

  const { data: safkaProducts, error: safkaError } =
    await supabase
      .from("safka_products")
      .select("id, created_at");

  if (safkaError) {
    console.error("Safka Products Error:", safkaError);
  }

  safkaProducts?.forEach((product) => {
    urls.push(`
      <url>
        <loc>${baseUrl}/safka-products/${product.id}</loc>
        <lastmod>${new Date(
          product.created_at || Date.now()
        ).toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>
    `);
  });

  console.log(
    `Sitemap Generated: ${
      (products?.length || 0) +
      (safkaProducts?.length || 0)
    } URLs`
  );

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control":
        "public, s-maxage=86400, stale-while-revalidate",
    },
  });
}
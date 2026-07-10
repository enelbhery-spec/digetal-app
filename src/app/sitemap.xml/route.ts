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
  // Products (المنتجات العادية)
  // =========================
  const { data: products, error: productsError } = await supabase
    .from("products")
    .select("product_url, created_at");

  if (productsError) console.error("Products Error:", productsError);

  products?.forEach((product) => {
    if (!product.product_url) return;
    urls.push(`
      <url>
        <loc>${product.product_url}</loc>
        <lastmod>${new Date(product.created_at || Date.now()).toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>`);
  });

  // =========================
  // Safka Products (منتجات صفقة)
  // =========================
  const { data: safkaProducts, error: safkaError } = await supabase
    .from("safka_products")
    .select("safka_id, name, description, main_image, video_id, created_at");

  if (safkaError) console.error("Safka Products Error:", safkaError);

  safkaProducts?.forEach((product) => {
    if (!product.safka_id) return;
    const image = product.main_image?.startsWith("http") ? product.main_image : `${baseUrl}${product.main_image || "/no-image.png"}`;

    urls.push(`
      <url>
        <loc>${baseUrl}/safka-products/${product.safka_id}</loc>
        <lastmod>${new Date(product.created_at || Date.now()).toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
        ${product.video_id ? `
        <video:video>
          <video:thumbnail_loc>${image}</video:thumbnail_loc>
          <video:title><![CDATA[${product.name || "فيديو المنتج"}]]></video:title>
          <video:description><![CDATA[${(product.description || product.name || "").replace(/<[^>]*>/g, "").substring(0, 500)}]]></video:description>
          <video:player_loc allow_embed="yes">https://www.youtube.com/embed/${product.video_id}</video:player_loc>
          <video:content_loc>https://www.youtube.com/watch?v=${product.video_id}</video:content_loc>
        </video:video>` : ""}
      </url>`);
  });

  // =========================
  // Articles (المقالات التلقائية) - تم الإضافة هنا
  // =========================
  const { data: articles, error: articlesError } = await supabase
    .from("articles")
    .select("slug, created_at");

  if (articlesError) console.error("Articles Error:", articlesError);

  articles?.forEach((article) => {
    if (!article.slug) return;
    urls.push(`
      <url>
        <loc>${baseUrl}/articles/${article.slug}</loc>
        <lastmod>${new Date(article.created_at || Date.now()).toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.6</priority>
      </url>`);
  });

  console.log(
    `Sitemap Generated: ${
      (products?.length || 0) + (safkaProducts?.length || 0) + (articles?.length || 0)
    } URLs`
  );

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${urls.join("\n")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate",
    },
  });
}
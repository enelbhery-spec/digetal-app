import { supabase } from "@/lib/supabase";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const headersList = await headers();
  const host = headersList.get("x-forwarded-host") || headersList.get("host") || "https://digetal-app-theta.vercel.app";
  const baseUrl = `https://${host}`;
  const urls: string[] = [];

  // 1. المنتجات العادية (Products)
  const { data: products } = await supabase.from("products").select("slug, code, created_at");
  products?.forEach((p) => {
    if (p.slug && p.code) {
      urls.push(`<url><loc>${baseUrl}/${p.code}/product/${p.slug}</loc><lastmod>${new Date(p.created_at).toISOString()}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>`);
    }
  });

  // 2. منتجات صفقة (Safka Products + Videos)
  const { data: safkaProducts } = await supabase.from("safka_products").select("safka_id, name, description, main_image, video_id, created_at");
  safkaProducts?.forEach((p) => {
    if (!p.safka_id) return;
    const image = p.main_image?.startsWith("http") ? p.main_image : `${baseUrl}${p.main_image || "/no-image.png"}`;
    
    let videoXml = "";
    if (p.video_id) {
      videoXml = `
        <video:video>
          <video:thumbnail_loc>${image}</video:thumbnail_loc>
          <video:title><![CDATA[${p.name || "فيديو المنتج"}]]></video:title>
          <video:description><![CDATA[${(p.description || p.name || "").replace(/<[^>]*>/g, "").substring(0, 500)}]]></video:description>
          <video:player_loc allow_embed="yes">https://www.youtube.com/embed/${p.video_id}</video:player_loc>
          <video:content_loc>https://www.youtube.com/watch?v=${p.video_id}</video:content_loc>
        </video:video>`;
    }

    urls.push(`<url><loc>${baseUrl}/safka-products/${p.safka_id}</loc><lastmod>${new Date(p.created_at).toISOString()}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority>${videoXml}</url>`);
  });

  // 3. المقالات (Articles)
  const { data: articles } = await supabase.from("articles").select("slug, created_at");
  articles?.forEach((a) => {
    if (a.slug) {
      urls.push(`<url><loc>${baseUrl}/articles/${a.slug}</loc><lastmod>${new Date(a.created_at).toISOString()}</lastmod><changefreq>daily</changefreq><priority>0.6</priority></url>`);
    }
  });

  console.log(`Sitemap Generated: ${urls.length} URLs`);

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
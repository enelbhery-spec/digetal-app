import { supabase } from "@/lib/supabase";
import { headers } from "next/headers";

export const revalidate = 0;
export const dynamic = "force-dynamic";

// 1. تعريف دالة جلب الفيديوهات في مستوى الملف (خارج الـ GET)
async function getSitemapVideos() {
  const API_KEY = process.env.YOUTUBE_API_KEY;
  const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;
  if (!API_KEY || !CHANNEL_ID) return [];

  const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet&order=date&maxResults=50&type=video`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data.items || [];
  } catch { return []; }
}

export async function GET() {
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const baseUrl = `${protocol}://${host}`;

  // 2. تعريف دالة التاريخ هنا لكي تراها المتغيرات
  const formatDate = (date: string) => {
    try {
      return new Date(date).toISOString().split("T")[0];
    } catch {
      return new Date().toISOString().split("T")[0];
    }
  };

  const urls: string[] = []; // تعريف مصفوفة الروابط
  const countries = ["eg", "sa"];

  // 3. إضافة الروابط (نفس منطقك السابق مع التأكد من تعريف urls)
  countries.forEach((code) => {
    urls.push(`<url><loc>${baseUrl}/${code}</loc><lastmod>${formatDate(new Date().toISOString())}</lastmod><changefreq>daily</changefreq><priority>1.0</priority></url>`);
  });

  const { data: categories } = await supabase.from("categories").select("slug");
  countries.forEach((country) => {
    categories?.forEach((cat) => {
      urls.push(`<url><loc>${baseUrl}/${country}/category/${cat.slug}</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>`);
    });
  });

  // إضافة الفيديوهات
  const videos = await getSitemapVideos();
  videos.forEach((v: any) => {
    urls.push(`<url>
      <loc>${baseUrl}/video/${v.id.videoId}</loc>
      <lastmod>${formatDate(v.snippet.publishedAt)}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.7</priority>
    </url>`.replace(/\s+/g, ' ')); // إزالة المسافات الزائدة
  });

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
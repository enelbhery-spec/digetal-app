import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = "https://digetal-app-q1mf.vercel.app";
  const lastMod = new Date().toISOString(); // تاريخ اليوم بتنسيق ISO

  const urls = [
    "/", // الصفحة الرئيسية
    "/products",
    "/delivery/hotline",
    "/delivery/meals",
    "/delivery/OneTapLinksArabic",
    "/delivery/egyptStores",
    "/delivery/ComputerStores",
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `
  <url>
    <loc>${baseUrl}${url === "/" ? "" : url}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${url === "/" ? "1.0" : "0.8"}</priority>
  </url>`
  )
  .join("")}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      // إضافة Cache Control لضمان تحديث الملف دورياً وعدم استهلاكه للموارد بلا داعٍ
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate",
    },
  });
}
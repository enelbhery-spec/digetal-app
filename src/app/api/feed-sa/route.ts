import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function escapeXml(unsafe: string) {
  return unsafe
    ?.replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // 👇 فلترة منتجات السعودية فقط
    const { data: products, error } = await supabase
      .from("products")
      .select("*")
      .eq("country_code", "sa"); // مهم

    if (error) {
      return new NextResponse(error.message, { status: 500 });
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
<channel>
<title>Extracode Saudi Products</title>
<link>https://www.extracode.online</link>
<description>Best deals in Saudi Arabia</description>

${(products || [])
  .filter((p) => p.slug && p.image_url && p.price)
  .map((p) => {
    const productLink = `https://www.extracode.online/sa/product/${p.slug}`;

    return `
<item>
  <g:id>${escapeXml(`sa-${p.id}`)}</g:id>

  <g:title>${escapeXml(p.title)}</g:title>

  <g:description>
    ${escapeXml((p.description || p.title).slice(0, 500))}
  </g:description>

  <g:link>${escapeXml(productLink)}</g:link>

  <g:image_link>${escapeXml(p.image_url)}</g:image_link>

  <!-- 🔥 العملة السعودية -->
  <g:price>${escapeXml(`${p.price} SAR`)}</g:price>

  <g:availability>in stock</g:availability>

  <g:condition>new</g:condition>

  <g:brand>Generic</g:brand>
  <g:identifier_exists>false</g:identifier_exists>

</item>`;
  })
  .join("")}

</channel>
</rss>`;

    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/xml",
      },
    });
  } catch (err: any) {
    return new NextResponse(err.message || "Server Error", {
      status: 500,
    });
  }
}
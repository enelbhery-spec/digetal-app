import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// 🛡️ دالة تنظيف XML
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
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return new NextResponse("Supabase env missing", { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: products, error } = await supabase
      .from("products")
      .select("*");

    if (error) {
      return new NextResponse(error.message, { status: 500 });
    }

    const safeProducts = products || [];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
<channel>
<title>Extracode Products</title>
<link>https://www.extracode.online</link>
<description>Best deals and coupons</description>

${safeProducts
  .filter((p) => p.product_url && p.image_url && p.price)
  .map(
    (p) => `
<item>
  <g:id>${escapeXml(p.id)}</g:id>
  <g:title>${escapeXml(p.title)}</g:title>
  <g:description>${escapeXml(p.description || p.title)}</g:description>
  <g:link>${escapeXml(p.product_url)}</g:link>
  <g:image_link>${escapeXml(p.image_url)}</g:image_link>
  <g:price>${escapeXml(`${p.price} ${p.currency || "EGP"}`)}</g:price>
  <g:availability>in stock</g:availability>
  <g:condition>new</g:condition>
</item>`
  )
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
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

// =========================
// XML ESCAPE
// =========================

function escapeXml(unsafe: string): string {
  if (!unsafe) return "";

  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// =========================
// PRODUCT TYPE
// =========================

interface Product {
  id: string;
  title: string;
  slug: string;
  description?: string;
  image_url: string;
  price: number | string;
  currency?: string;
  code?: string;
}

// =========================
// GET FEED
// =========================

export async function GET() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // =========================
    // GET PRODUCTS
    // =========================

    const { data, error } = await supabase
      .from("safka_products")
      .select("*")
      .eq("status", "active");

    if (error) {
      return new NextResponse(error.message, {
        status: 500,
      });
    }

    const products: Product[] = (data as Product[]) || [];

    // =========================
    // XML BUILD
    // =========================

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
<channel>

<title>ExtraCode Safka Products</title>

<link>https://www.extracode.online</link>

<description>Safka Products Feed</description>

${products
  .filter(
    (p) =>
      p.slug &&
      p.image_url &&
      p.price
  )

  .map((p) => {

    const country = p.code || "eg";

    const productLink =
      `https://www.extracode.online/${country}/safka-products/${p.slug}`;

    return `
<item>

<g:id>${escapeXml(String(p.id))}</g:id>

<g:title>
${escapeXml(p.title || "")}
</g:title>

<g:description>
${escapeXml(
  (p.description || p.title || "").slice(0, 500)
)}
</g:description>

<g:link>
${escapeXml(productLink)}
</g:link>

<g:image_link>
${escapeXml(p.image_url || "")}
</g:image_link>

<g:price>
${escapeXml(`${p.price} ${p.currency || "EGP"}`)}
</g:price>

<g:availability>in_stock</g:availability>

<g:condition>new</g:condition>

<g:brand>ExtraCode</g:brand>

<g:identifier_exists>false</g:identifier_exists>

</item>
`;
  })

  .join("\n")}

</channel>
</rss>`;

    // =========================
    // RESPONSE
    // =========================

    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control":
          "no-store, max-age=0, must-revalidate",
      },
    });

  } catch (err) {

    const errorMessage =
      err instanceof Error
        ? err.message
        : "Server Error";

    return new NextResponse(errorMessage, {
      status: 500,
    });
  }
}
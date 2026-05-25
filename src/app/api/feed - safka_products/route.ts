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

interface SafkaProduct {

  id: string;

  title: string;

  slug: string;

  description?: string;

  image: string;

  price: number | string;

  old_price?: number | string;

  currency?: string;

  availability?: string;

  brand?: string;
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
    // FETCH PRODUCTS
    // =========================

    const { data, error } = await supabase
      .from("safka_products")
      .select("*")
      .eq("status", "active");

    if (error) {

      return new NextResponse(
        error.message,
        {
          status: 500
        }
      );
    }

    const products: SafkaProduct[] =
      (data as SafkaProduct[]) || [];

    // =========================
    // XML
    // =========================

    const xml = `<?xml version="1.0" encoding="UTF-8"?>

<rss version="2.0"
xmlns:g="http://base.google.com/ns/1.0">

<channel>

<title>ExtraCode Safka Products</title>

<link>https://www.extracode.online</link>

<description>
ExtraCode Safka Feed
</description>

${products

  .filter(
    (p) =>
      p.slug &&
      p.image &&
      p.price
  )

  .map((p) => {

    const productUrl =
      `https://www.extracode.online/safka-products/${p.id}`;

    const currency =
      p.currency || "EGP";

    const availability =
      p.availability || "in_stock";

    return `

<item>

<g:id>
${escapeXml(String(p.id))}
</g:id>

<g:title>
${escapeXml(p.title)}
</g:title>

<g:description>
${escapeXml(
  (p.description || p.title)
    .slice(0, 500)
)}
</g:description>

<g:link>
${escapeXml(productUrl)}
</g:link>

<g:image_link>
${escapeXml(p.image)}
</g:image_link>

<g:price>
${escapeXml(`${p.price} ${currency}`)}
</g:price>

${
  p.old_price
    ? `
<g:sale_price>
${escapeXml(`${p.old_price} ${currency}`)}
</g:sale_price>
`
    : ""
}

<g:availability>
${escapeXml(availability)}
</g:availability>

<g:condition>
new
</g:condition>

<g:brand>
${escapeXml(p.brand || "Generic")}
</g:brand>

<g:identifier_exists>
false
</g:identifier_exists>

</item>

`;
  })

  .join("\n")}

</channel>

</rss>`;

    // =========================
    // RESPONSE
    // =========================

    return new NextResponse(
      xml,
      {
        headers: {
          "Content-Type":
            "application/xml; charset=utf-8",

          "Cache-Control":
            "no-store, max-age=0, must-revalidate",
        },
      }
    );

  } catch (err) {

    console.log("FEED ERROR:", err);

    return new NextResponse(
      "Server Error",
      {
        status: 500
      }
    );
  }
}
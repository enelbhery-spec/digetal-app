import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// تحديد أن هذا المسار ديناميكي ولا يتم تخزينه كصفحة ثابتة أثناء الـ Build
export const dynamic = "force-dynamic";

// دالة تنظيف الـ XML
function escapeXml(unsafe: string | number | null | undefined): string {
  if (unsafe === null || unsafe === undefined) return "";
  return String(unsafe)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// تعريف واجهة بيانات المنتج بناءً على جدول safka_products
interface Product {
  id: string | number;
  name: string;
  description?: string;
  main_image: string;
  price: number | string;
  sale_price?: number | string;
  code: string; // يُستخدم كـ slug أو معرف إضافي
}

export async function GET() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // جلب البيانات من جدول safka_products
    const { data, error } = await supabase
      .from("safka_products")
      .select("id, name, description, main_image, price, sale_price, code");

    if (error) {
      return new NextResponse(error.message, { status: 500 });
    }

    const safeProducts: Product[] = (data as Product[]) || [];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
<channel>
<title>Extracode Products</title>
<link>https://www.extracode.online</link>
<description>Best deals and coupons</description>

${safeProducts
  .filter((p) => p.name && p.main_image && (p.sale_price || p.price))
  .map((p) => {
    // نستخدم code أو id للرابط
    const productLink = `https://www.extracode.online/eg/product/${p.code || p.id}`;
    const displayPrice = p.sale_price || p.price;

    return `
<item>
  <g:id>${escapeXml(p.id)}</g:id>
  <g:title>${escapeXml(p.name)}</g:title>
  <g:description>${escapeXml((p.description || p.name).slice(0, 500))}</g:description>
  <g:link>${escapeXml(productLink)}</g:link>
  <g:image_link>${escapeXml(p.main_image)}</g:image_link>
  <g:price>${escapeXml(displayPrice)} EGP</g:price>
  <g:availability>in_stock</g:availability>
  <g:condition>new</g:condition>
  <g:brand>Generic</g:brand>
  <g:identifier_exists>false</g:identifier_exists>
</item>`.trim();
  })
  .join("\n")}

</channel>
</rss>`;

    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "no-store, max-age=0, must-revalidate",
      },
    });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Server Error";
    return new NextResponse(errorMessage, {
      status: 500,
    });
  }
}
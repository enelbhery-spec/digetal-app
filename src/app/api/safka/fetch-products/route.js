import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function GET() {
  const SAFKA_KEY = process.env.SAFKA_API_KEY;

  if (!SAFKA_KEY) {
    return NextResponse.json({ success: false, error: "مفتاح API صفقة غير موجود" }, { status: 500 });
  }

  try {
    const response = await fetch("https://api.safka-eg.com/api/v1/public/products?page=1&size=20", {
      method: "GET",
      headers: { "api-safka-key": SAFKA_KEY, "Content-Type": "application/json" },
    });

    if (!response.ok) throw new Error(`فشل الاتصال بسيرفر صفقة: ${response.status}`);

    const safkaData = await response.json();
    const products = safkaData?.data || [];

    const mappedProducts = products.map((prod) => ({
      safka_id: prod?._id, // تأكد أنه لا يرسل null
      name: prod?.name || "منتج بدون اسم",
      barcode: prod?.barcode || prod?._id,
      price: prod?.sale_price || 0, // تم استخدام sale_price كالسعر الأساسي بناءً على بياناتك
      sale_price: prod?.price || 0, // أو العكس حسب منطق العمل لديك
      main_image: prod?.image,
      images_urls: prod?.images || [],
      description: prod?.description || "",
      media_url: prod?.media_url || "",
      faqs: prod?.faqs || [], // تغيير null إلى مصفوفة فارغة لتجنب أخطاء JSONB
      note: prod?.note || "",
      properties: prod?.properties || [],
      property_id: prod?.properties?.[0]?._id || null,
      // الحقول الافتراضية للجدول الجديد
      created_at: new Date().toISOString(),
    }));

    // حفظ المنتجات باستخدام Upsert
    const { error: supabaseError } = await supabase
      .from("safka_products")
      .upsert(mappedProducts, {
        onConflict: "safka_id",
      });

    if (supabaseError) throw new Error(`فشل الحفظ في سوبابيز: ${supabaseError.message}`);

    return NextResponse.json({
      success: true,
      count: mappedProducts.length,
      message: "تم تحديث المنتجات بنجاح",
    });

  } catch (error) {
    console.error("SAFKA FETCH ERROR:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
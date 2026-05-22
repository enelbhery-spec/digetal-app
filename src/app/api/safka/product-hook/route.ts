import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {

    const body = await req.json();

    console.log(
      "📥 SAFKA WEBHOOK:",
      JSON.stringify(body, null, 2)
    );

    // دعم أكثر من شكل للبيانات
    const product =
      body?.product ||
      body?.data ||
      body;

    const mappedProduct = {

      // بيانات أساسية
      safka_id:
        product?._id || "",

      name:
        product?.name || "",

      barcode:
        product?.barcode || "",

      // الأسعار
      price:
        product?.price || 0,

      sale_price:
        product?.sale_price || 0,

      commission:
        product?.commission || 0,

      // الصور
      main_image:
        product?.image || "",

      images_urls:
        Array.isArray(product?.images)
          ? product.images
          : [],

      // المحتوى
      description:
        product?.description || "",

      note:
        product?.note || "",

      media_url:
        product?.media_url || "",

      // FAQ
      faqs:
        Array.isArray(product?.faqs)
          ? product.faqs
          : [],

      // الخصائص
      properties:
        Array.isArray(product?.properties)
          ? product.properties
          : [],

      // أهم جزء للطلبات
      property_id:
        product?.properties?.[0]?._id ||
        "",

      // حالة المنتج
      is_active: true,
    };

    console.log(
      "📦 FINAL PRODUCT:",
      mappedProduct
    );

    const { error } = await supabase
      .from("safka_products")
      .upsert(
        [mappedProduct],
        {
          onConflict: "safka_id",
        }
      );

    if (error) {

      console.error(
        "❌ SUPABASE ERROR:",
        error
      );

      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        { status: 500 }
      );

    }

    return NextResponse.json({
      success: true,
      message: "تم حفظ المنتج",
    });

  } catch (error: any) {

    console.error(
      "❌ WEBHOOK ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error.message ||
          "حدث خطأ غير متوقع",
      },
      { status: 500 }
    );

  }
}
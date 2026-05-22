import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log(
      "📥 SAFKA WEBHOOK:",
      JSON.stringify(body, null, 2)
    );

    // دعم أكثر من شكل للبيانات القادمة من صفقة
    const product =
      body?.product ||
      body?.data ||
      body;

    // تجهيز المنتج
    const mappedProduct = {
      // بيانات صفقة
      safka_id: product?._id || null,

      name: product?.name || "منتج بدون اسم",

      barcode:
        product?.barcode ||
        product?._id ||
        "",

      price: product?.price || 0,

      sale_price:
        product?.sale_price || 0,

      main_image:
        product?.image || "",

      images_urls: Array.isArray(
        product?.images
      )
        ? product.images
        : [],

      description:
        product?.description || "",

      note: product?.note || "",

      faqs: Array.isArray(product?.faqs)
        ? product.faqs
        : [],

      properties: Array.isArray(
        product?.properties
      )
        ? product.properties
        : [],

      // أعمدة النظام القديم
      slug: slugify(
        product?.name || "product"
      ),

      country: "eg",

      country_code: "eg",

      product_code:
        product?.barcode ||
        product?._id ||
        "",

      status: "active",

      source: "safka",

      created_at:
        new Date().toISOString(),
    };

    console.log(
      "📦 FINAL PRODUCT:",
      mappedProduct
    );

    // حفظ المنتج
    const { error } = await supabase
      .from("safka_products")
      .upsert([mappedProduct], {
        onConflict: "safka_id",
      });

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
      message: "تم حفظ المنتج بنجاح",
      product: mappedProduct,
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
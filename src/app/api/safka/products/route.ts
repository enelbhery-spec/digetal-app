import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// =========================
// GET TEST
// =========================
export async function GET() {

  return NextResponse.json({
    success: true,
    message: "Products Route Working",
  });

}

// =========================
// POST FROM SAFKA
// =========================
export async function POST(request: Request) {

  try {

    const body = await request.json();

    console.log("منتج جديد من صفقة:", body);

    // صفقة أحياناً ترسل product
    // وأحياناً data
    const product =
      body.product ||
      body.data ||
      body;

    if (!product) {

      return NextResponse.json(
        {
          success: false,
          message: "لا يوجد منتج",
        },
        {
          status: 400,
        }
      );

    }

    const mappedProduct = {

      // بيانات صفقة
      safka_id:
        product._id ||
        product.id,

      name:
        product.name || "",

      barcode:
        product.barcode ||
        product._id ||
        product.id,

      price:
        product.sale_price ||
        product.price ||
        null,

      sale_price:
        product.sale_price ||
        null,

      main_image:
        product.image || null,

      images_urls:
        product.images || [],

      description:
        product.description || null,

      media_url:
        product.media_url || null,

      faqs:
        product.faqs || [],

      note:
        product.note || null,

      properties:
        product.properties || [],

      commission:
        product.commission || 0,

      is_active:
        product.is_active ?? true,

      // الحقول اليدوية
      code: null,
      country_id: null,
      brand_id: null,
      category_id: null,

      // المتجر
      store_id: "safka_store",

      // الفيسبوك
      fb_posted: false,
      fb_scheduled: false,
      fb_post_id: null,
      fb_scheduled_time: null,

      // الوقت
      created_at:
        new Date().toISOString(),

    };

    const { error } = await supabase
      .from("safka_products")
      .upsert(
        [mappedProduct],
        {
          onConflict: "safka_id",
        }
      );

    if (error) {

      console.log("SUPABASE ERROR:", error);

      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        {
          status: 500,
        }
      );

    }

    return NextResponse.json(
      {
        success: true,
        message: "تم حفظ المنتج بنجاح",
      },
      {
        status: 200,
      }
    );

  } catch (error: any) {

    console.log("ROUTE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      {
        status: 500,
      }
    );

  }

}
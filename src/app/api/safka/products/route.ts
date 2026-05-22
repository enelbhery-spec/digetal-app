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

    console.log(
      "SAFKA BODY:",
      JSON.stringify(body, null, 2)
    );

    // صفقة ترسل أحيانًا product
    // وأحيانًا data
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

    // =========================
    // تجهيز البيانات
    // =========================
    const mappedProduct = {

      // معرف صفقة
      safka_id:
        product._id ||
        product.id,

      // اسم المنتج
      name:
        product.name || "",

      // باركود
      barcode:
        product.barcode ||
        product._id ||
        product.id,

      // السعر
      price:
        product.sale_price ||
        product.price ||
        null,

      sale_price:
        product.sale_price ||
        null,

      // الصور
      main_image:
        product.image || null,

      images_urls:
        product.images || [],

      // الوصف
      description:
        product.description || null,

      // ميديا
      media_url:
        product.media_url || null,

      // الاسئلة
      faqs:
        product.faqs || [],

      // ملاحظات
      note:
        product.note || null,

      // الخصائص
      properties:
        product.properties || [],

      // حقول إضافية
      code: null,
      country_id: null,
      brand_id: null,
      category_id: null,

      // المتجر
      store_id: "safka_store",

      // فيسبوك
      fb_posted: false,
      fb_scheduled: false,
      fb_post_id: null,
      fb_scheduled_time: null,

      // الوقت
      created_at:
        new Date().toISOString(),

    };

    console.log(
      "MAPPED PRODUCT:",
      JSON.stringify(mappedProduct, null, 2)
    );

    // =========================
    // حفظ المنتج
    // =========================
    const { data, error } = await supabase
      .from("safka_products")
      .upsert(
        [mappedProduct],
        {
          onConflict: "safka_id",
        }
      )
      .select();

    // =========================
    // خطأ
    // =========================
    if (error) {

      console.log(
        "SUPABASE ERROR:",
        error
      );

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

    // =========================
    // نجاح
    // =========================
    console.log(
      "INSERT SUCCESS:",
      data
    );

    return NextResponse.json(
      {
        success: true,
        message: "تم حفظ المنتج بنجاح",
        data,
      },
      {
        status: 200,
      }
    );

  } catch (error: any) {

    console.log(
      "ROUTE ERROR:",
      error
    );

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
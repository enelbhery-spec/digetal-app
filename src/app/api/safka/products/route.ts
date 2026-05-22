import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// =========================
// Supabase
// =========================
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
    message: "Safka Products API Working",
  });

}

// =========================
// POST
// =========================
export async function POST(request: Request) {

  try {

    // =========================
    // استقبال البيانات
    // =========================
    const body = await request.json();

    console.log("BODY:", body);

    // صفقة غالبًا ترسل productId
    const productId =
      body.productId ||
      body.product_id ||
      body.id;

    if (!productId) {

      return NextResponse.json(
        {
          success: false,
          error: "productId missing",
        },
        {
          status: 400,
        }
      );

    }

    // =========================
    // جلب المنتج من صفقة
    // =========================
    const response = await fetch(

      `https://aff.safka-eg.com/api/v1/public/product/${productId}`,

      {
        method: "GET",

        headers: {
          "api-safka-key":
            process.env.API_SAFKA_KEY!,
        },
      }
    );

    const result = await response.json();

    console.log(
      "SAFKA PRODUCT:",
      JSON.stringify(result, null, 2)
    );

    const product =
      result.data ||
      result.product ||
      result;

    if (!product) {

      return NextResponse.json(
        {
          success: false,
          error: "product not found",
        },
        {
          status: 404,
        }
      );

    }

    // =========================
    // تجهيز المنتج
    // =========================
    const mappedProduct = {

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

      code: null,
      country_id: null,
      brand_id: null,
      category_id: null,

      store_id: "safka_store",

      fb_posted: false,
      fb_scheduled: false,
      fb_post_id: null,
      fb_scheduled_time: null,

      created_at:
        new Date().toISOString(),

    };

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

    console.log(
      "INSERT SUCCESS:",
      data
    );

    return NextResponse.json(
      {
        success: true,
        message: "تم حفظ المنتج",
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
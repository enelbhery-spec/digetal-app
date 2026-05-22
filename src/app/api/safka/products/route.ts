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
// POST FROM SAFKA
// =========================
export async function POST(request: Request) {

  try {

    // =========================
    // استقبال البيانات
    // =========================
    const body = await request.json();

    console.log(
      "BODY RECEIVED:",
      JSON.stringify(body, null, 2)
    );

    // =========================
    // استخراج productId
    // =========================
    const productId =

      body.productId ||
      body.product_id ||
      body.id ||
      body._id ||

      body.product?._id ||
      body.product?.id ||

      body.data?._id ||
      body.data?.id;

    // =========================
    // التحقق من وجود ID
    // =========================
    if (!productId) {

      console.log("PRODUCT ID NOT FOUND");

      return NextResponse.json(
        {
          success: false,
          error: "productId missing",
          body,
        },
        {
          status: 400,
        }
      );

    }

    console.log("PRODUCT ID:", productId);

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

        cache: "no-store",
      }
    );

    // =========================
    // التحقق من response
    // =========================
    if (!response.ok) {

      const errorText = await response.text();

      console.log(
        "SAFKA FETCH ERROR:",
        errorText
      );

      return NextResponse.json(
        {
          success: false,
          error: "failed to fetch product from safka",
          details: errorText,
        },
        {
          status: 500,
        }
      );

    }

    // =========================
    // تحويل JSON
    // =========================
    const result = await response.json();

    console.log(
      "SAFKA PRODUCT:",
      JSON.stringify(result, null, 2)
    );

    // =========================
    // استخراج المنتج
    // =========================
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
    // خطأ Supabase
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
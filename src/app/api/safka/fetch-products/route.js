import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL;

const supabaseServiceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(
  supabaseUrl,
  supabaseServiceKey
);

export async function GET() {

  const SAFKA_KEY =
    process.env.SAFKA_API_KEY;

  // التحقق من وجود المفتاح
  if (!SAFKA_KEY) {

    return NextResponse.json(
      {
        success: false,
        error:
          "مفتاح API صفقة غير موجود",
      },
      { status: 500 }
    );

  }

  try {

    /**
     * جلب المنتجات من صفقة
     */
    const response = await fetch(
      "https://api.safka-eg.com/api/v1/public/products?page=1&size=20",
      {
        method: "GET",

        headers: {
          "api-safka-key":
            SAFKA_KEY,

          "Content-Type":
            "application/json",
        },
      }
    );

    // فشل الاتصال
    if (!response.ok) {

      throw new Error(
        `فشل الاتصال بسيرفر صفقة: ${response.status}`
      );

    }

    /**
     * البيانات القادمة من صفقة
     */
    const safkaData =
      await response.json();

    console.log(
      "SAFKA RAW DATA:",
      JSON.stringify(
        safkaData,
        null,
        2
      )
    );

    const products =
      safkaData?.data || [];

    /**
     * تجهيز المنتجات للحفظ
     */
    const mappedProducts =
      products.map((prod) => {

        return {

          /**
           * ID الحقيقي للمنتج
           */
          safka_id:
            prod?._id || null,

          /**
           * الاسم
           */
          name:
            prod?.name || null,

          /**
           * الباركود
           */
          barcode:
            prod?.barcode ||
            prod?._id ||
            null,

          /**
           * السعر الحالي
           */
          price:
            prod?.price ||
            prod?.original_price ||
            null,

          /**
           * السعر قبل الخصم
           */
          sale_price:
            prod?.sale_price ||
            null,

          /**
           * الصورة الرئيسية
           */
          main_image:
            prod?.image || null,

          /**
           * جميع الصور
           */
          images_urls:
            prod?.images || [],

          /**
           * الوصف
           */
          description:
            prod?.description ||
            null,

          /**
           * رابط الوسائط
           */
          media_url:
            prod?.media_url ||
            null,

          /**
           * FAQ
           */
          faqs:
            prod?.faqs || null,

          /**
           * الملاحظات
           */
          note:
            prod?.note || null,

          /**
           * جميع الـ properties
           */
          properties:
            prod?.properties || [],

          /**
           * أول property id
           * مهم جدا لإنشاء الطلب
           */
          property_id:
            prod?.properties?.[0]?._id ||
            null,

          /**
           * حقول التحكم
           */
          code: null,

          country_id: null,

          brand_id: null,

          category_id: null,

          /**
           * مهم:
           * كان يسبب خطأ UUID
           */
          store_id: null,

          /**
           * حقول الفيسبوك
           */
          fb_posted: false,

          fb_scheduled: false,

          fb_post_id: null,

          fb_scheduled_time:
            null,

        };

      });

    console.log(
      "MAPPED PRODUCTS:",
      JSON.stringify(
        mappedProducts,
        null,
        2
      )
    );

    /**
     * حفظ المنتجات
     */
    const {
      error: supabaseError,
    } = await supabase
      .from("safka_products")
      .upsert(
        mappedProducts,
        {
          onConflict:
            "safka_id",
        }
      );

    // فشل الحفظ
    if (supabaseError) {

      throw new Error(
        `فشل الحفظ في سوبابيز: ${supabaseError.message}`
      );

    }

    /**
     * نجاح
     */
    return NextResponse.json({

      success: true,

      count:
        mappedProducts.length,

      message:
        "تم تحديث منتجات صفقة بنجاح",

      products:
        mappedProducts,

    });

  } catch (error) {

    console.error(
      "SAFKA FETCH ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        error:
          error?.message ||
          "حدث خطأ غير متوقع",
      },
      { status: 500 }
    );

  }

}
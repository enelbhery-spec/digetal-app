import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {

  try {

    // =========================
    // ORDER DATA
    // =========================

    const orderData = await request.json();

    console.log("📦 ORDER DATA:");
    console.log(orderData);

    // =========================
    // GET SAFKA API KEY
    // =========================

    const { data: keys, error: keyError } =
      await supabase
        .from("safka_keys")
        .select("api_key")
        .single();

    if (keyError || !keys?.api_key) {

      console.log("❌ API KEY ERROR:", keyError);

      return NextResponse.json(
        {
          success: false,
          errors: [
            {
              msg: "مفتاح صفقة غير موجود"
            }
          ]
        },
        {
          status: 400
        }
      );
    }

    // =========================
    // SEND TO SAFKA
    // =========================

    const response = await fetch(
      "https://public-api.safka-eg.com/api/v1/public/orders/",
      {
        method: "POST",

        headers: {
          "api-safka-key": keys.api_key,
          "Content-Type": "application/json",
        },

        body: JSON.stringify(orderData),
      }
    );

    // =========================
    // RESPONSE
    // =========================

    const result = await response.json();

    console.log("📨 SAFKA RESPONSE:");
    console.log(result);

    console.log("📡 STATUS:", response.status);

    // =========================
    // HANDLE ERROR
    // =========================

    if (!response.ok) {

      return NextResponse.json(
        {
          success: false,
          status: response.status,
          safka: result
        },
        {
          status: response.status
        }
      );
    }

    // =========================
    // SUCCESS
    // =========================

    return NextResponse.json({
      success: true,
      data: result
    });

  } catch (error: any) {

    console.log("❌ SERVER ERROR:");
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        errors: [
          {
            msg:
              error.message ||
              "خطأ في الاتصال بالسيرفر"
          }
        ]
      },
      {
        status: 500
      }
    );
  }
}
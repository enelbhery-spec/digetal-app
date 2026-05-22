import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {

    const body = await request.json();

    const SAFKA_API_KEY =
      process.env.SAFKA_API_KEY;

    if (!SAFKA_API_KEY) {

      return NextResponse.json(
        {
          success: false,
          message: "SAFKA API KEY NOT FOUND",
        },
        { status: 500 }
      );

    }

    // تجهيز البيانات المطلوبة من صفقة
    const payload = {

      client_name:
        body.client_name,

      client_phone1:
        body.client_phone1,

      client_phone2:
        body.client_phone2 || "",

      client_address:
        body.client_address,

      shipping_governorate:
        body.shipping_governorate,

      city:
        body.city || "",

      note:
        body.note || "",

      total:
        body.total,

      commission:
        body.commission || 0,

      items: [
        {
          qty:
            body.qty || 1,

          property:
            body.property_id,

          product:
            body.product_id,
        },
      ],
    };

    console.log(
      "📦 SAFKA ORDER:",
      JSON.stringify(payload, null, 2)
    );

    // إرسال الطلب إلى صفقة
    const response = await fetch(
      "https://api.safka-eg.com/api/v1/public/orders",
      {
        method: "POST",

        headers: {
          "api-safka-key":
            SAFKA_API_KEY,

          "Content-Type":
            "application/json",
        },

        body: JSON.stringify(payload),
      }
    );

    const data =
      await response.json();

    console.log(
      "✅ SAFKA RESPONSE:",
      data
    );

    return NextResponse.json(data);

  } catch (error: any) {

    console.log(
      "❌ CHECKOUT ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error.message ||
          "خطأ في الاتصال بسفقة",
      },
      {
        status: 500,
      }
    );

  }
}
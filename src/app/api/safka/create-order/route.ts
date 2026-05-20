import { NextResponse } from "next/server";

export async function POST(request: Request) {

  try {

    const body = await request.json();

    const {
      client_name,
      client_phone1,
      client_phone2,
      client_address,
      shipping_governorate,
      city,
      note,
      total,
      items
    } = body;

    const SAFKA_KEY =
      process.env.SAFKA_API_KEY;

    if (!SAFKA_KEY) {

      return NextResponse.json(
        {
          success: false,
          error: "SAFKA_API_KEY غير موجود"
        },
        { status: 500 }
      );

    }

    // إرسال الطلب إلى صفقة
    const response = await fetch(
      "https://api.safka-eg.com/api/v1/public/orders",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "api-safka-key": SAFKA_KEY,
        },

        body: JSON.stringify({

          client_name,
          client_phone1,
          client_phone2,
          client_address,

          shipping_governorate,

          city,
          note,
          total,

          items

        }),
      }
    );

    const data =
      await response.json();

    // لو صفقة رجعت خطأ
    if (!response.ok) {

      return NextResponse.json(
        {
          success: false,
          safka_error: data
        },
        { status: response.status }
      );

    }

    // نجاح
    return NextResponse.json({
      success: true,
      order: data
    });

  } catch (error: any) {

    return NextResponse.json(
      {
        success: false,
        error: error.message
      },
      { status: 500 }
    );

  }

}
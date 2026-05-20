import { NextResponse } from "next/server";

export async function POST(request: Request) {

  try {

    // استقبال البيانات القادمة من الفورم
    const body = await request.json();

    // قراءة مفتاح صفقة
    const SAFKA_API_KEY =
      process.env.SAFKA_API_KEY;

    // فحص وجود المفتاح
    if (!SAFKA_API_KEY) {

      console.log(
        "❌ SAFKA_API_KEY غير موجود"
      );

      return NextResponse.json(
        {
          success: false,
          error: "SAFKA_API_KEY غير موجود",
        },
        { status: 500 }
      );

    }

    // طباعة جزء من المفتاح للتأكد
    console.log(
      "✅ KEY EXISTS:",
      SAFKA_API_KEY.substring(0, 15)
    );

    // إرسال الطلب إلى صفقة
    const response = await fetch(
      "https://api.safka-eg.com/api/v1/public/orders",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "api-safka-key":
            SAFKA_API_KEY.trim(),
        },

        body: JSON.stringify(body),
      }
    );

    // قراءة الرد
    const data =
      await response.json();

    // طباعة الرد الكامل
    console.log(
      "📦 SAFKA RESPONSE:"
    );

    console.log(
      JSON.stringify(data, null, 2)
    );

    // إعادة الرد للواجهة
    return NextResponse.json(
      data,
      {
        status: response.status,
      }
    );

  } catch (error: any) {

    console.error(
      "❌ CREATE ORDER ERROR:"
    );

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error:
          error?.message ||
          "حدث خطأ غير معروف",
      },
      { status: 500 }
    );

  }

}

// منع GET
export async function GET() {

  return NextResponse.json(
    {
      success: false,
      message: "Method Not Allowed",
    },
    { status: 405 }
  );

}
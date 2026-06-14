import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1. التحقق من مفتاح الـ API
    const apiKey = process.env.API_SAFKA_KEY;
    if (!apiKey) {
      console.error("❌ خطأ: API_SAFKA_KEY غير موجود في ملف البيئة");
      return NextResponse.json({ success: false, message: "Server Configuration Error" }, { status: 500 });
    }

    // 2. منطق إرسال طلب جديد لـ "صفقة"
    if (body.client_name) {
      console.log("🚀 جاري إرسال الطلب إلى صفقة...");

      const safkaPayload = {
        items: body.items,
        client_name: body.client_name,
        client_phone1: body.client_phone1,
        client_phone2: body.client_phone2 || "",
        client_address: body.client_address,
        shipping_governorate: body.shipping_governorate,
        city: body.city || "",
        total: Number(body.total),
        note: body.note || "",
        page_id: body.page_id || null,
      };

      // ملاحظة: تأكد من الرابط الصحيح (غالباً api.safka-eg.com أو public-api.safka-eg.com)
      const response = await fetch("https://public-api.safka-eg.com/api/v1/public/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-safka-key": apiKey,
        },
        body: JSON.stringify(safkaPayload),
      });

      // قراءة الرد كنص أولاً لتجنب خطأ الـ HTML
      const responseText = await response.text();
      let data;

      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error("❌ الرد من صفقة ليس JSON (قد يكون خطأ سيرفر أو رابط خاطئ):", responseText);
        return NextResponse.json({ success: false, message: "Safka API Error (Invalid Response)" }, { status: 502 });
      }

      // تسجيل الخطأ بالتفصيل في حال الرفض
      if (!response.ok) {
        console.error("❌ رد خادم صفقة الفاشل:", JSON.stringify(data, null, 2));
        return NextResponse.json(data, { status: response.status });
      }

      return NextResponse.json(data, { status: 200 });
    }

    // 3. منطق استقبال الـ Webhook
    console.log("📦 تحديث من صفقة:", JSON.stringify(body, null, 2));
    return NextResponse.json({ success: true, message: "تم استلام التحديث" }, { status: 200 });

  } catch (error) {
    console.error("❌ خطأ في معالجة الطلب:", error);
    return NextResponse.json({ success: false, message: "حدث خطأ داخلي في السيرفر" }, { status: 500 });
  }
}

// منع استخدام GET
export async function GET() {
  return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
}
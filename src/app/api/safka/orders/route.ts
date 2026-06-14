import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1. التحقق من مفتاح الـ API
    const apiKey = process.env.API_SAFKA_KEY;
    if (!apiKey) {
      return NextResponse.json({ success: false, message: "Server Configuration Error" }, { status: 500 });
    }

    // 2. منطق إرسال طلب جديد
    if (body.client_name) {
      
      // تحويل مصفوفة المنتجات للهيكل الصحيح الذي تطلبه صفقة
      const formattedItems = (body.items || []).map((item: any) => ({
        product: String(item.safka_id || item.product_id || item.id), // تأكد من اسم الحقل الذي يرسله فرونت إند
        qty: String(item.quantity || item.qty || 1),
        property: item.property_id || undefined // إذا كان المنتج له خصائص (ألوان/مقاسات)
      }));

      const safkaPayload = {
        client_name: body.client_name,
        client_phone1: body.client_phone1,
        client_phone2: body.client_phone2 || "",
        client_address: body.client_address,
        shipping_governorate: body.shipping_governorate,
        city: body.city || "",
        total: Number(body.total),
        note: body.note || "",
        page_id: body.page_id || null,
        items: formattedItems // إرسال المصفوفة المنسقة
      };

      const response = await fetch("https://public-api.safka-eg.com/api/v1/public/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-safka-key": apiKey,
        },
        body: JSON.stringify(safkaPayload),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("❌ رد خادم صفقة الفاشل:", JSON.stringify(data, null, 2));
        return NextResponse.json(data, { status: response.status });
      }

      return NextResponse.json(data, { status: 200 });
    }

    return NextResponse.json({ success: true, message: "تم الاستلام" }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ success: false, message: "حدث خطأ داخلي" }, { status: 500 });
  }
}
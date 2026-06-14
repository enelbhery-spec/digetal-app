import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { items, client_name, client_phone1, client_address, total, shipping_governorate, city, note } = body;

    // 1. تنقية وتجهيز المنتجات (حل مشكلة التكرار والبيانات الناقصة)
    const groupedItems = items.reduce((acc: any[], item: any) => {
      // التأكد من وجود safka_id
      if (!item.safka_id) return acc;

      const existing = acc.find(i => 
        i.product === String(item.safka_id) && 
        String(i.property || "") === String(item.property_id || "")
      );

      if (existing) {
        existing.qty = String(Number(existing.qty) + Number(item.quantity || 1));
      } else {
        acc.push({
          product: String(item.safka_id),
          property: item.property_id ? String(item.property_id) : undefined,
          qty: String(item.quantity || 1)
        });
      }
      return acc;
    }, []);

    // 2. تجهيز هيكل البيانات النهائي حسب معايير صفقة
    const orderData = {
      client_name: String(client_name),
      client_phone1: String(client_phone1),
      client_phone2: "", 
      client_address: String(client_address),
      total: String(total),
      shipping_governorate: String(shipping_governorate),
      city: String(city),
      note: note || "",
      items: groupedItems
    };

    // 3. الإرسال للرابط الرسمي مع تصحيح اسم الترويسة (Header)
    const response = await fetch("https://api.safka-eg.com/api/v1/public/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // تصحيح الترويسة لتصبح api-safka-key كما طلب النظام في رسالة الخطأ
        "api-safka-key": "sk_535290c581ff6650034afb4ce7aee5cb1e2251cf2e4a27c0e955dcd216ce4a6b"
      },
      body: JSON.stringify(orderData),
    });

    const result = await response.json();

    // 4. معالجة الرد
    if (!response.ok) {
      console.error("❌ فشل الطلب لدى صفقة:", { status: response.status, result });
      return NextResponse.json({ success: false, error: result }, { status: response.status });
    }

    return NextResponse.json({ success: true, data: result });

  } catch (error) {
    console.error("❌ خطأ برمجي في السيرفر:", error);
    return NextResponse.json({ success: false, message: "حدث خطأ غير متوقع" }, { status: 500 });
  }
}
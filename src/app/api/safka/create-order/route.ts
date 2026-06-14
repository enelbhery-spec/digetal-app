import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { items, client_name, client_phone1, client_address, total, shipping_governorate, city, note } = body;

    // 1. تجميع المنتجات (دمج المتكرر منها) - لحل خطأ "منتج متكرر"
    const groupedItems = items.reduce((acc: any[], item: any) => {
      const existing = acc.find(i => i.product === String(item.safka_id) && i.property === String(item.property_id || ""));
      if (existing) {
        existing.qty = String(Number(existing.qty) + Number(item.quantity || 1));
      } else {
        acc.push({
          product: String(item.safka_id),
          property: item.property_id ? String(item.property_id) : undefined, // إرسال undefined يجعله غير موجود في JSON
          qty: String(item.quantity || 1)
        });
      }
      return acc;
    }, []);

    // 2. تجهيز البيانات حسب توثيق صفقة
    const orderData = {
      client_name,
      client_phone1,
      client_phone2: "", // حقل إجباري في نظام صفقة
      client_address,
      total: String(total),
      shipping_governorate: String(shipping_governorate),
      city: String(city),
      note: note || "",
      items: groupedItems
    };

    // 3. إرسال الطلب لصفقة
    const response = await fetch("https://api.safka-eg.com/api/v1/public/orders", {
      method: "POST",
      headers: {
        "api-safaka-key":"sk_535290c581ff6650034afb4ce7aee5cb1e2251cf2e4a27c0e955dcd216ce4a6b", 
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("❌ رد صفقة الفاشل:", result);
      return NextResponse.json({ success: false, safka: result }, { status: response.status });
    }

    return NextResponse.json({ success: true, data: result });

  } catch (error) {
    console.error("❌ خطأ في السيرفر:", error);
    return NextResponse.json({ success: false, message: "حدث خطأ غير متوقع" }, { status: 500 });
  }
}
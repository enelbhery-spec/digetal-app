import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const cartItems = body.items;

    // تحقق من الحقول الأساسية
    if (!body.client_name || !body.client_phone1 || !Array.isArray(cartItems)) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // استخراج الـ IDs من السلة
    const productIds = cartItems.map((i: any) => i.id).filter(Boolean);

    // جلب تفاصيل المنتجات من الداتابيز
    const { data: products, error } = await supabase
      .from("safka_products")
      .select("id, safka_id, property_id")
      .in("id", productIds);

    if (error) throw error;

    // تجهيز الـ items بالشكل المطلوب
    const formattedItems = cartItems.map((item: any) => {
      const dbProduct = products?.find(
        (p) => String(p.id) === String(item.id)
      );

      return {
        product: String(dbProduct?.safka_id || item.safka_id),
        property: dbProduct?.property_id || item.property_id || "",
        qty: String(item.qty || 1),
      };
    });

    // بناء الـ payload النهائي حسب الـ API Docs
    const payload = {
      items: formattedItems,
      client_name: body.client_name,
      client_phone1: body.client_phone1,
      client_phone2: body.client_phone2 || "",
      client_address: body.client_address || "",
      page_id: body.page_id || null,
      total: String(body.total || 0), // Safka API يقبلها كنص
      note: body.note || "",
      shipping_governorate: String(body.shipping_governorate), // لازم يكون الـ _id الخاص بالـ pricing document
      city: String(body.city), // لازم يكون id المدينة
    };

    // اطبع الـ payload للتأكد
    console.log("Payload being sent:", payload);

    // إرسال الطلب لـ Safka API
    const response = await fetch(
      "https://api.safka-eg.com/api/v1/public/orders",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-safka-key": process.env.SAFKA_API_KEY!,
        },
        body: JSON.stringify(payload),
      }
    );

    const result = await response.json();
    return NextResponse.json(result, { status: response.status });
  } catch (error) {
    console.error("خطأ:", error);
    return NextResponse.json(
      { success: false, message: "فشل إرسال الطلب" },
      { status: 500 }
    );
  }
}

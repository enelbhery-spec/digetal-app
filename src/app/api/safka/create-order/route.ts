import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const orderData = await request.json();

    // 1. جلب مفتاح API من قاعدة البيانات
    const { data: keys } = await supabase.from("safka_keys").select("api_key").single();
    
    if (!keys?.api_key) {
      return NextResponse.json({ success: false, errors: [{ msg: "مفتاح الربط غير موجود" }] }, { status: 400 });
    }

    // 2. إرسال الطلب إلى صفقة
    const response = await fetch("https://public-api.safka-eg.com/v1/orders", {
      method: "POST",
      headers: {
        "api-safka-key": keys.api_key,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    const result = await response.json();
    return NextResponse.json(result);

  } catch (error) {
    return NextResponse.json({ success: false, errors: [{ msg: "خطأ في الاتصال بالسيرفر" }] }, { status: 500 });
  }
}
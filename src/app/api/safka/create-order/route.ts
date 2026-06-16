import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// تهيئة Supabase للوصول إلى قاعدة البيانات إذا احتجت للتحقق من المنتجات مستقبلاً
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      items, 
      client_name, 
      client_phone1, 
      client_phone2, 
      client_address, 
      shipping_governorate, 
      city, 
      total, 
      note 
    } = body;

    // 1. التحقق من وجود البيانات الأساسية المطلوبة
    if (!client_name || !client_phone1 || !items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ 
        success: false, 
        message: "بيانات العميل أو السلة ناقصة أو غير صحيحة" 
      }, { status: 400 });
    }

    // 2. تنسيق مصفوفة المنتجات (تأكد أن كل منتج في السلة يحتوي على product و qty)
    const formattedItems = items.map((item: any) => {
      const formatted: any = {
        product: String(item.product || ""),
        qty: String(item.qty || "1"),
      };
      
      // إضافة الخاصية (property) فقط إذا كانت موجودة وليست نصاً فارغاً
      if (item.property && item.property !== "undefined" && item.property !== "null") {
        formatted.property = String(item.property);
      }
      
      return formatted;
    }).filter(item => item.product !== ""); // استبعاد أي منتج مجهول

    // 3. بناء الـ Payload النهائي حسب توثيق صفقة
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
    

    console.log("🚀 الإرسال النهائي لصفقة:", JSON.stringify(payload, null, 2));

    // 4. إرسال الطلب
    const apiKey = process.env.API_SAFKA_KEY;
    if (!apiKey) {
      return NextResponse.json({ success: false, message: "API Key مفقود" }, { status: 500 });
    }

    const response = await fetch("https://api.safka-eg.com/api/v1/public/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
          "api-safka-key": process.env.API_SAFKA_KEY!,
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    // 5. معالجة الرد
    if (!response.ok) {
      console.error("❌ خطأ من صفقة:", result);
      return NextResponse.json({ 
        success: false, 
        message: result.message || "حدث خطأ في منصة صفقة",
        details: result.errors || result 
      }, { status: response.status });
    }

    return NextResponse.json({ success: true, ...result });

  } catch (error: any) {
    console.error("❌ خطأ داخلي في الـ Route:", error);
    return NextResponse.json({ 
      success: false, 
      message: "فشل في معالجة الطلب على السيرفر", 
      error: error.message 
    }, { status: 500 });
  }
}
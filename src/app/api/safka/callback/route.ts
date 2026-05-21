import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// تهيئة عميل Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    // استقبال البيانات القادمة من منصة صفقة
    const body = await request.json();

    console.log("تم استقبال بيانات الربط من صفقة:", body);

    /* البيانات المتوقع استلامها حسب توثيق صفقة:
       {
         api_safka_key,
         name,
         _id,
         productHook,
         orderHook,
         callbackAPI
       }
    */

    // حفظ أو تحديث المفتاح في جدول safka_keys باستخدام upsert
    // هذا يضمن تحديث السجل إذا كان موجوداً مسبقاً بدلاً من إعطاء خطأ
    const { error } = await supabase
      .from("safka_keys")
      .upsert(
        [
          {
            safka_key_id: body._id,
            api_key: body.api_safka_key,
            name: body.name,
            product_hook: body.productHook,
            order_hook: body.orderHook,
            callback_api: body.callbackAPI,
          },
        ],
        { onConflict: "safka_key_id" } // هذا الشرط يحدد المفتاح الفريد لمنع التكرار
      );

    if (error) {
      console.error("خطأ أثناء حفظ مفتاح صفقة في Supabase:", error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    // إرسال رد ناجح للمنصة
    return NextResponse.json(
      {
        success: true,
        message: "تم ربط المفاتيح وتخزينها بنجاح",
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error("خطأ تقني في مسار الـ Callback:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
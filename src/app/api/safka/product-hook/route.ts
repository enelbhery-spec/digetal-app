import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// تهيئة عميل Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    console.log("تم استقبال بيانات المنتج من صفقة:", body);

    /* المفترض أن يرسل الـ Hook بيانات المنتج مثل:
       id, name, price, image, description, category
    */

    // حفظ المنتج في جدول 'products' في Supabase
    // نستخدم upsert لتحديث المنتج إذا كان موجوداً مسبقاً (تجنباً للتكرار)
    const { error } = await supabase
      .from("products")
      .upsert(
        [
          {
            safka_product_id: body.id, // معرف المنتج الفريد من صفقة
            title: body.name,
            price: body.price,
            image_url: body.image,
            description: body.description,
            category: body.category,
            updated_at: new Date().toISOString(),
          },
        ],
        { onConflict: "safka_product_id" }
      );

    if (error) {
      console.error("خطأ أثناء حفظ المنتج في Supabase:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    // الرد بـ 200 ضروري جداً لتأكيد الاستلام لمنصة صفقة
    return NextResponse.json(
      { success: true, message: "تمت مزامنة المنتج بنجاح" },
      { status: 200 }
    );

  } catch (error: any) {
    console.error("خطأ في معالجة الـ Product Hook:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("تحديث جديد من صفقة بخصوص الطلب:", body);

    // هنا نقوم بتحديث حالة الطلب في قاعدة بياناتك بناءً على المعرف القادم
    const { error } = await supabase
      .from("orders")
      .update({ status: body.status, updated_at: new Date().toISOString() })
      .eq("order_id", body.order_id);

    return NextResponse.json({ message: "تم استلام تحديث الطلب بنجاح" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "خطأ في معالجة الـ Order Hook" }, { status: 500 });
  }
}
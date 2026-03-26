import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  try {
    // 🔗 الاتصال بـ Supabase
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_ANON_KEY!
    );

    // 📦 جلب المنتجات
    const { data: products, error } = await supabase
      .from("products")
      .select("*");

    // ❌ لو فيه خطأ
    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    // 🛡️ تأمين البيانات (حل مشكلة null)
    const safeProducts = products || [];

    // 🔥 تجهيز الفيد
    const feed = safeProducts
      .filter((p) => p.product_url && p.image_url && p.price) // فلترة المنتجات الكاملة فقط
      .map((p) => ({
        id: p.id,
        title: p.title,
        description: p.description || p.title,
        link: p.product_url, // 👈 رابط الشراء (مهم جدًا)
        image_link: p.image_url,
        price: `${p.price} ${p.currency || "EGP"}`,
        availability: "in stock",
      }));

    // ✅ إرجاع البيانات
    return NextResponse.json(feed);

  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
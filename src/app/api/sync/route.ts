import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("📥 incoming data:", body);

    let { country, p1_id, p2_id, category_slug } = body;

    // ✅ تحقق
    if (!country || !p1_id || !p2_id) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // ✅ تنظيف البيانات
    country = country.toLowerCase().trim();
    category_slug = (category_slug || "general").toLowerCase().trim();

    // ✅ منع تكرار (A-B = B-A)
    const [first, second] =
      p1_id < p2_id ? [p1_id, p2_id] : [p2_id, p1_id];

    // ✅ slug ثابت
    const comparison_slug = `${first}-vs-${second}`;

    // ✅ حفظ
    const { error } = await supabase
      .from("smart_comparisons")
      .upsert(
        {
          code: country,
          category_slug,
          p1_id: first,
          p2_id: second,
          comparison_slug,
        },
        {
          onConflict: "p1_id,p2_id,code", // ✅ المهم
        }
      );

    if (error) {
      console.error("❌ DB Error:", error.message);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      url: `/${country}/product-comparisons/${category_slug}/${comparison_slug}`,
    });

  } catch (error) {
    console.error("❌ Server Error:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
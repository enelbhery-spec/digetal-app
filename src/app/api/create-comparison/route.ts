import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("📥 incoming data:", body);

    let { country, p1_id, p2_id, category_slug } = body;

    // ✅ تحقق
    if (!country || !p1_id || !p2_id || !category_slug) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // ✅ تنظيف
    country = country.toLowerCase().trim();
    category_slug = category_slug.toLowerCase().trim();

    // ✅ ترتيب IDs بشكل آمن
    const [first, second] = [String(p1_id), String(p2_id)].sort();

    const comparison_slug = `${first}-vs-${second}`;

    // ✅ 1. هل موجود قبل كده؟
    const { data: existing } = await supabase
      .from("smart_comparisons")
      .select("id")
      .eq("p1_id", first)
      .eq("p2_id", second)
      .eq("code", country)
      .maybeSingle();

    if (existing) {
      return NextResponse.json({
        url: `/${country}/product-comparisons/${category_slug}/${comparison_slug}`,
      });
    }

    // ✅ 2. إدخال جديد
    const { error } = await supabase
      .from("smart_comparisons")
      .insert({
        code: country,
        category_slug,
        p1_id: first,
        p2_id: second,
        comparison_slug,
      });

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
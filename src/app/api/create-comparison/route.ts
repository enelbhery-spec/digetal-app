import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("📥 incoming:", body);

    let { country, p1_id, p2_id } = body;

    if (!country || !p1_id || !p2_id) {
      return NextResponse.json(
        { error: "Missing required data" },
        { status: 400 }
      );
    }

    country = country.toLowerCase().trim();

    // ✅ ترتيب IDs (أهم خطوة)
    const [first, second] =
      p1_id < p2_id ? [p1_id, p2_id] : [p2_id, p1_id];

    // ✅ 1. هل المقارنة موجودة بالفعل؟
    const { data: existing } = await supabase
      .from("smart_comparisons")
      .select("id, category_slug")
      .eq("p1_id", first)
      .eq("p2_id", second)
      .eq("code", country)
      .maybeSingle();

    if (existing) {
      return NextResponse.json({
        id: existing.id,
        url: `/${country}/product-comparisons/${existing.id}`
      });
    }

    // ✅ 2. جلب category من المنتج
    const { data: product } = await supabase
      .from("products")
      .select("category_slug")
      .eq("id", first)
      .single();

    const category_slug = product?.category_slug;

    if (!category_slug) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 400 }
      );
    }

    // ✅ 3. إنشاء المقارنة
    const { data, error } = await supabase
      .from("smart_comparisons")
      .insert({
        code: country,
        category_slug,
        p1_id: first,
        p2_id: second,
        is_active: true
      })
      .select("id")
      .single();

    if (error) {
      console.error("❌ DB Error:", error.message);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      id: data.id,
      url: `/${country}/product-comparisons/${data.id}`
    });

  } catch (error) {
    console.error("❌ Server Error:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
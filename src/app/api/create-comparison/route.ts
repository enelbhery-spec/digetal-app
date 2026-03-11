import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { generateSlug } from "@/lib/slug"

export async function POST(req: Request) {
  try {
    const { country, product1_slug, product2_slug } = await req.json()

    const slug = generateSlug(`${product1_slug}-vs-${product2_slug}`)

    // تحقق هل موجودة
    const { data: existing } = await supabase
      .from("comparisons")
      .select("id")
      .eq("slug", slug)
      .single()

    if (!existing) {
      await supabase.from("comparisons").insert({
        country,
        slug,
        product1_slug,
        product2_slug,
      })
    }

    return NextResponse.json({
      url: `/${country}/compare/${slug}`,
    })
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
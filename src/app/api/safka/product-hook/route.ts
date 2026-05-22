import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// تهيئة Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    console.log("BODY:", body);

    // استخراج بيانات المنتج
    const product = body.data || body;

    // حفظ المنتج
    const { data, error } = await supabase
      .from("safka_products")
      .upsert(
        [
          {
            safka_product_id: product.id,
            title: product.name,
            price: product.price,
            image_url: product.image,
            description: product.description,
            category: product.category,
            updated_at: new Date().toISOString(),
          },
        ],
        {
          onConflict: "safka_product_id",
        }
      );

    if (error) {
      console.error("SUPABASE ERROR:", error);

      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        { status: 500 }
      );
    }

    console.log("INSERTED:", data);

    return NextResponse.json(
      {
        success: true,
        message: "تم حفظ المنتج بنجاح",
      },
      { status: 200 }
    );

  } catch (error: any) {

    console.error("HOOK ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
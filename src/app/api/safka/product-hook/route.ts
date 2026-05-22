import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("📥 SAFKA WEBHOOK:", body);

    const product = body?.product || body;

    const { error } = await supabase
      .from("safka_products")
      .upsert([
        {
          safka_id: product?._id,
          name: product?.name || "",
          barcode: product?.barcode || "",
          price: product?.price || 0,
          sale_price: product?.sale_price || 0,
          main_image: product?.image || "",
          images_urls: Array.isArray(product?.images)
            ? product.images
            : [],
          description: product?.description || "",
        },
      ], {
        onConflict: "safka_id",
      });

    if (error) {
      console.error(error);

      return NextResponse.json({
        success: false,
        error: error.message,
      });
    }

    return NextResponse.json({
      success: true,
      message: "تم حفظ المنتج",
    });

  } catch (error: any) {
    console.error(error);

    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}
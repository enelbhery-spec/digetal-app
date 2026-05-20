import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {

  try {

    // البيانات القادمة من صفقة
    const body = await request.json();

    console.log("بيانات صفقة:", body);

    /*
      سيصلك:

      {
        api_safka_key,
        name,
        _id,
        productHook,
        orderHook,
        callbackAPI
      }
    */

    // حفظ المفتاح داخل Supabase
    const { error } = await supabase
      .from("safka_keys")
      .insert([
        {
          safka_key_id: body._id,
          api_key: body.api_safka_key,
          name: body.name,
          product_hook: body.productHook,
          order_hook: body.orderHook,
          callback_api: body.callbackAPI,
        },
      ]);

    if (error) {

      console.log(error);

      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        {
          status: 500,
        }
      );

    }

    return NextResponse.json(
      {
        success: true,
        message: "تم حفظ مفتاح صفقة بنجاح",
      },
      {
        status: 200,
      }
    );

  } catch (error: any) {

    console.log(error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      {
        status: 500,
      }
    );

  }

}
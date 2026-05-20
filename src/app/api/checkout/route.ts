import { NextResponse } from "next/server";

export async function POST(request: Request) {

  try {

    const body = await request.json();

    const SAFKA_API_KEY =
      process.env.SAFKA_API_KEY;

    if (!SAFKA_API_KEY) {
      return NextResponse.json(
        {
          success: false,
          message: "SAFKA API KEY NOT FOUND",
        },
        { status: 500 }
      );
    }

    // البيانات المرسلة لسفقة
    const payload = {
      customer_name: body.customer_name,
      phone: body.phone,
      address: body.address,
      product_id: body.product_id,
      quantity: body.quantity || 1,
    };

    const response = await fetch(
      "https://api.safka-eg.com/v1/orders",
      {
        method: "POST",
        headers: {
          "api-safka-key": SAFKA_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();

    return NextResponse.json(data);

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "خطأ في الاتصال بسفقة",
      },
      {
        status: 500,
      }
    );

  }

}
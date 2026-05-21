import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

  try {

    const body = await req.json();

    const SAFKA_API_KEY =
      process.env.SAFKA_API_KEY;

    if (!SAFKA_API_KEY) {

      return NextResponse.json(
        {
          success: false,
          error: "SAFKA_API_KEY غير موجود",
        },
        {
          status: 500,
        }
      );

    }

    const response = await fetch(
      "https://api.safka-eg.com/api/v1/public/orders",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "api-safka-key": SAFKA_API_KEY,
        },

        body: JSON.stringify(body),
      }
    );

    const data = await response.json();

    console.log("SAFKA ORDER:", data);

    return NextResponse.json(
      data,
      {
        status: response.status,
      }
    );

  } catch (error: any) {

    console.error(error);

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
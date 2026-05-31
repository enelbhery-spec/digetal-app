import { NextResponse } from "next/server";

export async function GET() {
  try {

    const API_SAFKA_KEY =
      process.env.API_SAFKA_KEY;

    if (!API_SAFKA_KEY) {

      return NextResponse.json(
        {
          success: false,
          message: "SAFKA API KEY NOT FOUND",
        },
        { status: 500 }
      );

    }

    const response = await fetch(
      "https://api.safka-eg.com/api/v1/public/price-list?page=1&size=50",
      {
        method: "GET",
        headers: {
          "api-safka-key":
            API_SAFKA_KEY,
          "Content-Type":
            "application/json",
        },
        cache: "no-store",
      }
    );

    const data =
      await response.json();

    return NextResponse.json(data);

  } catch (error: any) {

    console.error(
      "SHIPPING API ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error.message ||
          "Shipping Error",
      },
      {
        status: 500,
      }
    );

  }
}
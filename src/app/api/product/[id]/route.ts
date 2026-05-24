import { NextResponse } from "next/server";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  request: Request,
  { params }: Props
) {
  try {

    const { id } = await params;

    const API_SAFKA_KEY =
      process.env.API_SAFKA_KEY;

    if (!API_SAFKA_KEY) {
      return NextResponse.json(
        {
          success: false,
          error: "API_SAFKA_KEY missing",
        },
        { status: 500 }
      );
    }

    const response = await fetch(
      `https://api.safka-eg.com/api/v1/public/product/${id}`,
      {
        method: "GET",

        headers: {
          "api-safka-key":
            API_SAFKA_KEY.trim(),
        },

        cache: "no-store",
      }
    );

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });

  } catch (error: any) {

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );

  }
}
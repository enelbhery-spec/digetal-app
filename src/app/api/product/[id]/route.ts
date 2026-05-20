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

    const SAFKA_API_KEY =
      process.env.SAFKA_API_KEY;

    if (!SAFKA_API_KEY) {
      return NextResponse.json(
        {
          success: false,
          error: "SAFKA_API_KEY missing",
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
            SAFKA_API_KEY.trim(),
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
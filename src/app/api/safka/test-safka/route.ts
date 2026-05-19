import { NextResponse } from "next/server";

export async function GET() {
  try {
    const SAFKA_API_KEY = process.env.SAFKA_API_KEY;

    if (!SAFKA_API_KEY) {
      return NextResponse.json({ error: "API Key not found in .env" }, { status: 500 });
    }

    const response = await fetch("https://public-api.safka-eg.com/v1/products", {
      method: "GET",
      headers: {
        "api-safka-key": SAFKA_API_KEY,
        "Content-Type": "application/json",
      },
    });

    // استخراج النتيجة
    const result = await response.json().catch(() => ({ message: "Could not parse JSON" }));

    return NextResponse.json({
      status: response.status,
      ok: response.ok,
      data: result
    });
  } catch (error: any) {
    // هذا الجزء سيكشف لنا لماذا يحدث Internal Server Error
    return NextResponse.json({ error: error.message, stack: error.stack }, { status: 500 });
  }
}
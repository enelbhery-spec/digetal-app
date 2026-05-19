import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json(); // بيانات الطلب القادمة من المتصفح
  const SAFKA_API_KEY = process.env.SAFKA_API_KEY;

  try {
    const response = await fetch("https://api.safka-eg.com/v1/orders", {
      method: "POST",
      headers: {
        "api-safka-key": SAFKA_API_KEY || "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: "خطأ في الاتصال بصفقة" }, { status: 500 });
  }
}
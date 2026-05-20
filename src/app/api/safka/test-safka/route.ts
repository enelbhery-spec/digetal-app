import { NextResponse } from "next/server";

export async function GET() {
  try {
    // محاولة الاتصال بـ Google كاختبار للاتصال الخارجي العام
    // إذا نجح هذا، فالمشكلة في الوصول لـ صفقة فقط (IP Whitelist)
    // إذا فشل هذا أيضاً، فالمشكلة في السيرفر نفسه (الاستضافة)
    const googleCheck = await fetch("https://www.google.com");
    
    const response = await fetch("https://public-api.safka-eg.com/v1/products", {
      method: "GET",
      headers: {
        "api-safka-key": process.env.SAFKA_API_KEY || "",
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json({
      google_status: googleCheck.status,
      safka_status: response.status,
      safka_ok: response.ok
    });
  } catch (error: any) {
    return NextResponse.json({ 
        message: "تفاصيل الفشل", 
        error: error.message,
        cause: error.cause?.message 
    }, { status: 500 });
  }
}
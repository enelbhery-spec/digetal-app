import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const apiKey = searchParams.get("api_safka_key");

  if (apiKey) {
    // هنا يجب أن تظهر رسالة للمطور (أنت) لتأكيد استلام المفتاح
    return NextResponse.json({ 
      message: "تم استلام المفتاح بنجاح! يرجى نسخه ووضعه في ملف .env",
      apiKey: apiKey 
    });
  }

  return NextResponse.json({ message: "لم يتم العثور على المفتاح" }, { status: 400 });
}
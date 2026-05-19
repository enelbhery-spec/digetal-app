import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  // نغير الاسم ليكون key_id كما أرسلته صفقة
  const apiKey = searchParams.get("key_id"); 

  if (apiKey) {
    return NextResponse.json({ 
      message: "تم استلام المفتاح بنجاح!", 
      apiKey: apiKey 
    });
  }

  return NextResponse.json({ 
    message: "لم يتم العثور على المفتاح، تأكد من أن الرابط يحتوي على key_id",
    receivedParams: Object.fromEntries(searchParams) // هذا سيعرض لنا كل ما وصل للموقع لنعرف الاسم الصحيح
  }, { status: 400 });
}
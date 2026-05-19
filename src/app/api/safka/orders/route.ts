import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // هنا صفقة سترسل لك بيانات تحديث الطلب
    console.log("تحديث جديد من صفقة:", body);

    // يجب عليك إرجاع استجابة بـ 200 لتخبر صفقة أنك استلمت البيانات بنجاح
    return NextResponse.json({ message: "تم استلام التحديث بنجاح" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "خطأ في استقبال البيانات" }, { status: 500 });
  }
}
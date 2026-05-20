import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {

    // استقبال البيانات القادمة من صفقة
    const body = await req.json();

    console.log("=================================");
    console.log("📦 تحديث جديد من صفقة");
    console.log(JSON.stringify(body, null, 2));
    console.log("=================================");

    /*
      البيانات القادمة تكون مثل:

      {
        event: "order.status.updated",
        order: {
          _id: "...",
          status: "preparing",
          status_ar: "جار التحضير",
          serial_number: "...",
          client_name: "...",
          total: 900
        }
      }
    */

    // نجاح الاستلام
    return NextResponse.json(
      {
        success: true,
        message: "تم استلام بيانات صفقة بنجاح",
      },
      { status: 200 }
    );

  } catch (error) {

    console.error("❌ خطأ webhook صفقة:", error);

    return NextResponse.json(
      {
        success: false,
        message: "حدث خطأ أثناء استقبال البيانات",
      },
      { status: 500 }
    );

  }
}

// منع GET
export async function GET() {
  return NextResponse.json(
    {
      success: false,
      message: "Method Not Allowed",
    },
    { status: 405 }
  );
}
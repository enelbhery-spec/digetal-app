import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {

  // ✅ وضع المطور (اختبار الدولة)
  const devCountry = request.nextUrl.searchParams.get("dev_country");

  // ✅ الدولة الحقيقية
  const realCountry =
    request.headers.get("x-vercel-ip-country") ||
    request.headers.get("cf-ipcountry") ||
    "EG";

  // لو فى اختبار استخدمه
  const country = devCountry || realCountry;

  const response = NextResponse.next();

  response.cookies.set("user_country", country, {
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return response;
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
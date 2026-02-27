import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // لو المستخدم داخل على مسار دولة بالفعل → سيبه يكمل
  if (
    pathname.startsWith("/eg") ||
    pathname.startsWith("/sa") ||
    pathname.startsWith("/ae") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // تحديد الدولة من Vercel
  const ipCountry =
    request.headers.get("x-vercel-ip-country")?.toLowerCase();

  let selectedCountry = "eg"; // default

  if (ipCountry === "sa") selectedCountry = "sa";
  if (ipCountry === "ae") selectedCountry = "ae";

  // إعادة توجيه إلى مسار الدولة
  return NextResponse.redirect(
    new URL(`/${selectedCountry}`, request.url)
  );
}

export const config = {
  matcher: ["/((?!api).*)"],
};
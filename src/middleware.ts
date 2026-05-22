import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {

  const { pathname } = request.nextUrl;

  // ✅ تجاهل API بالكامل
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // ✅ تجاهل ملفات Next الداخلية
  if (
    pathname.startsWith("/_next") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // ✅ لو داخل دولة بالفعل
  if (
    pathname.startsWith("/eg") ||
    pathname.startsWith("/sa") ||
    pathname.startsWith("/ae")
  ) {
    return NextResponse.next();
  }

  // ✅ أولوية الكوكي
  const savedCountry = request.cookies.get("country")?.value;

  if (
    savedCountry &&
    ["eg", "sa", "ae"].includes(savedCountry)
  ) {

    return NextResponse.redirect(
      new URL(`/${savedCountry}${pathname}`, request.url)
    );
  }

  // ✅ تحديد الدولة من IP
  const ipCountry = request.headers
    .get("x-vercel-ip-country")
    ?.toLowerCase();

  let selectedCountry = "eg";

  switch (ipCountry) {

    case "sa":
      selectedCountry = "sa";
      break;

    case "ae":
      selectedCountry = "ae";
      break;

    default:
      selectedCountry = "eg";
  }

  const response = NextResponse.redirect(
    new URL(`/${selectedCountry}${pathname}`, request.url)
  );

  // ✅ حفظ الكوكي
  response.cookies.set("country", selectedCountry, {
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: false,
    sameSite: "lax",
  });

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
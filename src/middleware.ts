import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ✅ تجاهل الملفات الداخلية و API
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // ✅ لو المستخدم داخل بالفعل مسار دولة
  if (
    pathname.startsWith("/eg") ||
    pathname.startsWith("/sa") ||
    pathname.startsWith("/ae")
  ) {
    return NextResponse.next();
  }

  // ✅ 1. الأولوية للكوكي (اختيار المستخدم)
  const savedCountry = request.cookies.get("country")?.value;

  if (savedCountry && ["eg", "sa", "ae"].includes(savedCountry)) {
    return NextResponse.redirect(
      new URL(`/${savedCountry}`, request.url)
    );
  }

  // ✅ 2. تحديد الدولة من IP (Vercel)
  const ipCountry = request.headers
    .get("x-vercel-ip-country")
    ?.toLowerCase();

  let selectedCountry = "eg"; // default

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
    new URL(`/${selectedCountry}`, request.url)
  );

  // ✅ 3. حفظ الاختيار في Cookie
  response.cookies.set("country", selectedCountry, {
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 يوم
    httpOnly: false,
    sameSite: "lax",
  });

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
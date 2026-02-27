import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {

  const url = request.nextUrl.clone();

  /* =========================
     1️⃣ لو المستخدم محدد الدولة
  ========================= */

  if (url.searchParams.has("country")) {
    return NextResponse.next();
  }

  /* =========================
     2️⃣ تحديد الدولة من IP
  ========================= */

  const ipCountry =
    request.headers.get("x-vercel-ip-country")?.toLowerCase();

  // fallback للـ localhost
  const detectedCountry = ipCountry || "eg";

  let selectedCountry = "eg";

  if (detectedCountry === "sa") selectedCountry = "sa";
  if (detectedCountry === "ae") selectedCountry = "ae";

  /* =========================
     3️⃣ إضافة الدولة للرابط
  ========================= */

  url.searchParams.set("country", selectedCountry);

  // ✅ rewrite أفضل من redirect
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/"],
};
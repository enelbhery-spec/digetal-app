"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

export default function Header() {
  const params = useParams();
  const country = params?.country || "eg";

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          href={`/${country}`}
          className="text-2xl font-extrabold text-green-600"
        >
          خصومات و كوبونات
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6 font-semibold text-gray-700">

          {/* رابط المقارنات */}
          <Link
             href={`/${country}/compare`}
            className="hover:text-green-600 transition"
          >
            مقارنات
          </Link>

        </nav>

      </div>
    </header>
  );
}
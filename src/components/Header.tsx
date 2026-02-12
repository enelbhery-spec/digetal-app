"use client";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="text-2xl font-extrabold text-green-600">
          البحث الذكى
        </Link>

        {/* Videos Link */}
        <nav className="flex items-center font-semibold text-gray-700">
          <Link
            href="/videos"
            className="hover:text-green-600 transition"
          >
            الفيديوهات
          </Link>
        </nav>

      </div>
    </header>
  );
}

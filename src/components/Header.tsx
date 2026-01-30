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

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 font-semibold text-gray-700">
          <Link href="/products" className="hover:text-green-600 transition">
            التطبيقات
          </Link>

          <Link href="/how-to-use" className="hover:text-green-600 transition">
            طريقة الاستخدام
          </Link>

          <Link href="/contact" className="hover:text-green-600 transition">
            تواصل معنا
          </Link>
        </nav>

        {/* WhatsApp Button */}
        <a
          href="https://wa.me/201021732703?text=مرحبًا،%20أرغب%20في%20الاستفسار"
          target="_blank"
          className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition"
        >
          واتساب
        </a>

      </div>
    </header>
  );
}

"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

export default function Header() {
  const params = useParams();
  const country = params?.country || "eg";

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo Section */}
        <Link
          href={`/${country}`}
          className="flex flex-col items-start leading-tight"
        >
          <span className="text-2xl font-extrabold text-green-600 tracking-tight">
            إكسترا كود
          </span>
          <span className="text-[10px] uppercase font-bold text-gray-400 tracking-[0.2em] -mt-1">
            Extracode
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6 font-semibold text-gray-700">
          <Link
            href={`/${country}/compare`}
            className="hover:text-green-600 transition text-sm"
          >
           
          </Link>
          
          {/* يمكنك إضافة روابط أخرى هنا مثل: المتاجر، الأقسام */}
        </nav>

      </div>
    </header>
  );
}
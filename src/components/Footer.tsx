"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const country = pathname.split("/")[1] || "eg";

  return (
    <footer className="bg-gray-900 text-gray-300 mt-20" dir="rtl">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* About */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4 italic">
            ExtraCode
          </h3>
          <p className="text-sm leading-relaxed mb-4">
            منصة لعرض أفضل العروض على متجرنا تريند ستور | Trend Store  - عروض جصريه. 
          </p>
        </div>

        {/* سياسات الموقع */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-2">
            سياسات الموقع
          </h4>
          <ul className="space-y-3 text-sm">
            <li>
              <Link href={`/${country}/privacy-policy`} className="hover:text-white transition">
                سياسة الخصوصية
              </Link>
            </li>
            <li>
              <Link href={`/${country}/terms`} className="hover:text-white transition">
                الشروط والأحكام
              </Link>
            </li>
            <li>
              <Link href={`/${country}/shipping`} className="hover:text-white transition">
                سياسة الشحن والتوصيل
              </Link>
            </li>
            <li>
              <Link href={`/${country}/returns`} className="hover:text-white transition">
                سياسة الإرجاع والاستبدال
              </Link>
            </li>
          </ul>
        </div>

        {/* روابط + إفصاح */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-2">
            روابط سريعة
          </h4>

          <ul className="space-y-3 text-sm mb-4">
            <li>
              <Link href={`/${country}`} className="hover:text-white transition">
                الرئيسية
              </Link>
            </li>
            <li>
              <Link href={`/${country}/how-to-use`} className="hover:text-white transition">
                طريقة الاستخدام
              </Link>
            </li>
            <li>
              <Link href={`/${country}/about`} className="hover:text-white transition">
                من نحن
              </Link>
            </li>
          </ul>

          
        </div>

        {/* تواصل */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-2">
            تواصل معنا
          </h4>

          <a
            href="https://wa.me/201000735516"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-full text-center bg-green-600 text-white px-5 py-3 rounded-xl font-bold hover:bg-green-700 transition mb-3 shadow-lg"
          >
            تواصل عبر واتساب
          </a>

          <p className="text-xs text-gray-400 text-center font-mono">
            support@extracode.online
          </p>
        </div>

      </div>

      
    </footer>
  );
}
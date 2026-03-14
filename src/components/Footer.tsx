"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {

  const pathname = usePathname();

  const country = pathname.split("/")[1] || "eg";

  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">

      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* About */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">
            خصومات و كوبونات
          </h3>

          <p className="text-sm leading-relaxed">
            أفضل الخصومات والكوبونات للمتاجر الإلكترونية.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">
            روابط سريعة
          </h4>

          <ul className="space-y-3 text-sm">

            <li>
              <Link href={`/${country}`} className="hover:text-white transition">
                الرئيسية
              </Link>
            </li>

            <li>
              <Link href={`/${country}/products`} className="hover:text-green-500 transition">
                
              </Link>
            </li>

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
              <Link href={`/${country}/how-to-use`} className="hover:text-white transition">
                طريقة الاستخدام
              </Link>
            </li>

          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">
            تواصل معنا
          </h4>

          <a
            href="https://wa.me/201021732703"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-600 text-white px-5 py-3 rounded-xl font-bold hover:bg-green-700 transition"
          >
            واتساب مباشر
          </a>
        </div>

      </div>

      <div className="border-t border-gray-800 text-center py-5 text-sm text-gray-400">
        © {new Date().getFullYear()} ExtraCode
      </div>

    </footer>
  );
}
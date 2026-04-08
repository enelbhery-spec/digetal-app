import React from "react";

// إضافة الميتاداتا لتحسين محركات البحث (SEO)
export const metadata = {
  title: "سياسة الإرجاع - ExtraCode",
  description: "سياسة إرجاع المنتجات واسترداد الأموال عبر أمازون ونون",
};

// يجب استخدام export default لكي يتعرف Next.js على الصفحة كموديول
export default function ReturnsPage() {
  return (
    <div className="container mx-auto px-6 py-12 text-right min-h-screen" dir="rtl">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 border-r-4 border-green-600 pr-4">
          سياسة الإرجاع والاستبدال
        </h1>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">1. إخلاء مسؤولية</h2>
          <p className="leading-relaxed text-gray-600">
            موقع **ExtraCode** هو منصة لعرض التخفيضات والكوبونات. جميع عمليات الشراء تتم على مواقع (أمازون ونون)، وتخضع لسياساتهم الخاصة بالإرجاع.
          </p>
        </section>

        {/* الكود الذي أرسلته قمت بدمجه هنا بشكل صحيح */}
        <section className="mb-8 bg-blue-50 p-6 rounded-xl border border-blue-100">
          <h2 className="text-lg font-bold mb-4 text-blue-900">روابط الإرجاع الرسمية:</h2>
          <ul className="space-y-4">
            <li className="flex items-center">
              <span className="ml-2">📦</span>
              <a 
                href="https://www.amazon.eg/gp/help/customer/display.html?nodeId=G508510" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-700 font-medium hover:underline transition"
              >
                مركز مساعدة أمازون - عمليات الإرجاع ورد الأموال (رابط مباشر)
              </a>
            </li>
            <li className="flex items-center">
              <span className="ml-2">📦</span>
              <a 
                href="https://www.noon.com/egypt-ar/return-policy" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-700 font-medium hover:underline transition"
              >
                سياسة الإرجاع في نون
              </a>
            </li>
          </ul>
        </section>

        <div className="mt-10 p-4 bg-gray-50 rounded-lg text-sm text-gray-500 italic">
          * ملاحظة: يرجى دائماً الدخول إلى حسابك في المتجر والضغط على "طلباتي" لبدء عملية الإرجاع.
        </div>
      </div>
    </div>
  );
}
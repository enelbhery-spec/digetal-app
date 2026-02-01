import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "fبحث حوجل مقارنة بالبحث الذكى",
  description:
    "مقارنة شاملة توضح الفرق بين البحث التقليدي في جوجل والبحث الذكي داخل البحث الذكى للوصول السريع والدقيق إلى الخطوط الساخنة والخدمات.",
};

export default function ArticlePage() {
  return (
    <main className="max-w-4xl mx-auto p-4 leading-relaxed" dir="rtl">
      <h1 className="text-3xl font-bold mb-6">
        الفرق بين البحث في جوجل والبحث داخل البحث الذكى
      </h1>

      <p className="text-gray-700 mb-6">
        في حياتنا اليومية نبحث كثيرًا عن أرقام الخطوط الساخنة والخدمات،
        وغالبًا يكون جوجل هو الخيار الأول. لكن هل هو الأفضل دائمًا؟
      </p>

      <h2 className="text-2xl font-semibold mb-3">
        كيف يعمل البحث في جوجل؟
      </h2>
      <p className="mb-4">
        جوجل محرك بحث عام يعرض آلاف النتائج من مصادر مختلفة، بعضها
        غير رسمي أو غير محدث.
      </p>

      <ul className="list-disc pr-6 mb-6 text-gray-700">
        <li>نتائج كثيرة ومشتتة</li>
        <li>أرقام غير مضمونة</li>
        <li>إعلانات قبل الوصول للنتيجة</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-3">
        كيف يعمل البحث الذكى؟
      </h2>
      <p className="mb-4">
        البحث الذكى مصمم خصيصًا للوصول السريع للأرقام والخدمات
        المعتمدة بدون تشتيت.
      </p>

      <ul className="list-disc pr-6 mb-6 text-gray-700">
        <li>نتائج مباشرة</li>
        <li>أرقام موثوقة</li>
        <li>اتصال فوري بضغطة واحدة</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-3">
        مقارنة سريعة
      </h2>

      <div className="overflow-x-auto mb-8">
        <table className="w-full border text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">المقارنة</th>
              <th className="border p-2">جوجل</th>
              <th className="border p-2">البحث الذكى</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">السرعة</td>
              <td className="border p-2">بطيء</td>
              <td className="border p-2">سريع</td>
            </tr>
            <tr>
              <td className="border p-2">الدقة</td>
              <td className="border p-2">غير مضمونة</td>
              <td className="border p-2">عالية</td>
            </tr>
            <tr>
              <td className="border p-2">الاتصال المباشر</td>
              <td className="border p-2">لا</td>
              <td className="border p-2">نعم</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-semibold mb-3">
        الخلاصة
      </h2>
      <p className="mb-8">
        جوجل مناسب للبحث العام، لكن البحث الذكى هو الحل
        الأفضل عند البحث عن خدمات وأرقام مهمة بسرعة.
      </p>

      <Link
        href="/delivery/hotline"
        className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-bold"
      >
        جرّب البحث الذكي الآن
      </Link>
    </main>
  );
}

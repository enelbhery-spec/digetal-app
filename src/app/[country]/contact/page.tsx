export const metadata = {
  title: "اتصل بنا | ExtraCode",
  description:
    "تواصل مع فريق ExtraCode لأي استفسارات أو دعم بخصوص العروض والمنتجات وروابط التسوق.",
};

export default function Contact() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12 text-right" dir="rtl">
      
      <h1 className="text-3xl font-black text-gray-900 mb-6">
        اتصل بنا
      </h1>

      <p className="text-gray-600 leading-relaxed mb-6">
        نحن هنا لمساعدتك في أي استفسار يتعلق بالعروض أو المنتجات أو روابط التسوق.
        لا تتردد في التواصل معنا وسنقوم بالرد عليك في أقرب وقت ممكن.
      </p>

      {/* صندوق التواصل */}
      <div className="bg-gray-50 border rounded-2xl p-6 shadow-sm">
        
        <p className="mb-4 text-gray-700">
          📧 البريد الإلكتروني:
        </p>

        <a
          href="mailto:support@extracode.online"
          className="block text-lg font-bold text-green-600 hover:underline mb-6"
        >
          support@extracode.online
        </a>

        <p className="text-sm text-gray-500">
          ⏱️ يتم الرد خلال 24 - 48 ساعة
        </p>
      </div>

      {/* ملاحظة مهمة (SEO + ثقة) */}
      <div className="mt-8 text-xs text-gray-400 leading-relaxed">
        <p className="mb-2">
          ⚠️ ملاحظة: نحن منصة تسويق بالعمولة، قد نحصل على عمولة عند الشراء من خلال الروابط دون أي تكلفة إضافية عليك.
        </p>
        <p>
          جميع العلامات التجارية المذكورة تعود لأصحابها.
        </p>
      </div>

    </main>
  );
}
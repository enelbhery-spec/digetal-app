export const metadata = {
  title: "الشروط والأحكام - ExtraCode",
  description: "الشروط والأحكام والسياسات القانونية لموقع ExtraCode للتسويق بالعمولة",
};

export default function Terms() {
  return (
    <div className="container mx-auto px-4 py-8 text-right" dir="rtl">
      <h1 className="text-3xl font-bold mb-6 border-b pb-2">الشروط والأحكام</h1>

      <section className="mb-6">
        <p className="mb-4">
          مرحباً بكم في <strong>ExtraCode</strong>. باستخدامك لهذا الموقع، فإنك تقر بالموافقة على الشروط التالية. إذا كنت لا توافق على أي جزء منها، يرجى التوقف عن استخدام الموقع.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">1. طبيعة الخدمة (إخلاء مسؤولية الأفلييت)</h2>
        <p className="leading-relaxed">
          موقع ExtraCode هو منصة متخصصة في تقديم العروض، الأكواد، ومراجعات المنتجات. نحن نشارك في برامج التسويق بالعمولة (مثل Amazon Associates و Noon Partners). هذا يعني أننا قد نحصل على عمولة عند قيامك بالشراء من خلال الروابط الموجودة في موقعنا، <strong>دون أي تكلفة إضافية عليك</strong>.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">2. دقة المعلومات والأسعار</h2>
        <p className="leading-relaxed">
          نحن نبذل قصارى جهدنا لضمان دقة الأسعار والعروض، ولكن بما أن المنتجات يتم بيعها عبر منصات خارجية، فإن السعر النهائي والتوافر يخضع لسياسة المتجر البائع (أمازون، نون، إلخ). لا نتحمل المسؤولية عن أي تغيير مفاجئ في الأسعار أو نفاذ الكمية.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">3. عمليات الشراء والاسترجاع</h2>
        <p className="leading-relaxed">
          ExtraCode ليس بائعاً مباشراً. جميع عمليات الدفع، الشحن، والاسترجاع تتم مباشرة مع المتجر الذي تمت منه عملية الشراء. أي استفسارات تتعلق بالشحن أو جودة المنتج يجب توجيهها لخدمة عملاء المتجر البائع الأصلي.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">4. الملكية الفكرية</h2>
        <p>
          جميع الشعارات والعلامات التجارية المعروضة (مثل شعار نون أو أمازون) هي ملك لأصحابها الأصليين، وتستخدم هنا لأغراض توضيحية فقط.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">5. التواصل معنا</h2>
        <p>
          لأي استفسارات قانونية، يمكنك التواصل معنا عبر البريد الإلكتروني: 
          <span className="font-mono ml-2">support@extracode.online</span>
        </p>
      </section>
    </div>
  );
}
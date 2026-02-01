import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "دليل التطبيقات والخدمات | استخدام الموقع مجانًا",
  description:
    "دليل شامل للتطبيقات والخدمات التي تهم المستخدم، مثل الخط الساخن، المتاجر، قطع غيار الكمبيوتر، وأدوات البحث الذكي، مع إمكانية الاستخدام المباشر داخل التطبيق.",
};

export default function ServicesPage() {
  return (
    <main style={{ padding: "40px", maxWidth: "900px", margin: "0 auto" }}>
      <h1>دليل التطبيقات والخدمات</h1>

      <p>
        منصة تجمع مجموعة من التطبيقات والخدمات التي تهم المستخدم، مثل دليل
        الخط الساخن، المتاجر، قطع غيار الكمبيوتر، وخدمات البحث الذكي، مع
        إمكانية استخدام كل خدمة مباشرة داخل التطبيق.
      </p>

      <ul>
        <li><a href="/services/hotline">دليل الخط الساخن</a></li>
        <li><a href="/services/stores">المتاجر</a></li>
        <li><a href="/services/tech">قطع غيار وخدمات الكمبيوتر</a></li>
        <li><a href="/services/tools">أدوات وخدمات مساعدة</a></li>
      </ul>
    </main>
  );
}

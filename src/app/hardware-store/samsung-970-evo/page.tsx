import Image from "next/image";
import Link from "next/link";

export default function Samsung970EvoPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10 space-y-20">

      {/* 1️⃣ Hero Section */}
      <section className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold">
          خلي جهازك أسرع 6 مرات 🚀
        </h1>
        <p className="text-gray-600">
          لو جهازك بطيء في الإقلاع أو الألعاب بتعلّق، الحل أبسط مما تتخيل
        </p>
      </section>

      {/* 2️⃣ Problem Section */}
      <section className="bg-gray-50 p-6 rounded-xl space-y-3">
        <h2 className="text-2xl font-semibold">المشكلة 👇</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>ويندوز بيفتح ببطء</li>
          <li>الألعاب بتأخر في التحميل</li>
          <li>البرامج التقيلة بتهنج</li>
        </ul>
      </section>

      {/* 3️⃣ Solution Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">الحل 💡</h2>
        <p className="text-gray-700">
          الترقية إلى SSD NVMe بتفرق فرق حقيقي في الأداء، خصوصًا لو بتستخدم
          جهازك في الألعاب أو الشغل التقيل.
        </p>
      </section>

      {/* 4️⃣ Product Section */}
      <section className="grid md:grid-cols-2 gap-8 items-center">
        <Image
          src="/images/samsung-970.png"
          alt="Samsung 970 EVO PLUS 1TB"
          width={400}
          height={400}
          className="rounded-xl"
        />

        <div className="space-y-4">
          <h3 className="text-xl font-bold">
            Samsung 970 EVO PLUS 1TB NVMe SSD
          </h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>سرعة قراءة وكتابة عالية جدًا</li>
            <li>مثالي للألعاب والمونتاج</li>
            <li>اعتمادية ممتازة من سامسونج</li>
          </ul>
        </div>
      </section>

      {/* 5️⃣ Trust Section */}
      <section className="bg-green-50 p-6 rounded-xl space-y-3">
        <h2 className="text-xl font-semibold">ليه تشتري وانت مطمّن؟ ✅</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>منتج أصلي 100%</li>
          <li>شراء من متجر رسمي</li>
          <li>ضمان معتمد</li>
        </ul>
      </section>

      {/* 6️⃣ CTA Section */}
      <section className="text-center space-y-4">
        <h2 className="text-2xl font-bold">جاهز تفرق الأداء؟ 🔥</h2>

        <Link
          href="https://maximumhardware.store/samsung-970-evo-plus-1tb-m-2-nvme-v-nand-internal-solid-state-drive-ssd?tracking=4yz6vQ0EwyDAoenU2015Q0TGZW6F33PIlo4hTiVRTZFnBW6QOzR94stOEpjiQsz0"
          target="_blank"
          className="inline-block bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition"
        >
          انتقل للشراء من الموقع الرسمي
        </Link>

        <p className="text-sm text-gray-500">
          * سيتم تحويلك إلى متجر Maximum Hardware
        </p>
      </section>

    </main>
  );
}

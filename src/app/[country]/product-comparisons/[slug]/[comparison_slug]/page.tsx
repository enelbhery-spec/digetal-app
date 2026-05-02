import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function ComparisonPage({ params }: any) {
  const { country, slug, comparison_slug } = params;

  // 🔹 جلب المقارنة
  const { data: comparison, error } = await supabase
    .from("smart_comparisons")
    .select("*")
    .eq("comparison_slug", comparison_slug)
    .maybeSingle();

  if (error || !comparison) {
    console.error("❌ comparison error:", error);
    return notFound();
  }

  // 🔹 جلب المنتجات
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .in("id", [comparison.p1_id, comparison.p2_id])
    .eq("code", country);

  if (!products || products.length < 2) {
    return (
      <div className="p-20 text-center font-bold">
        المنتجات غير متوفرة حالياً
      </div>
    );
  }

  const p1 = products.find((p) => p.id === comparison.p1_id);
  const p2 = products.find((p) => p.id === comparison.p2_id);

  // 🔥 تطبيع السعر
  const maxPrice = Math.max(p1?.price || 0, p2?.price || 0);
  const minPrice = Math.min(p1?.price || 0, p2?.price || 0);

  const normalizePrice = (price: number) => {
    if (maxPrice === minPrice) return 1;
    return (maxPrice - price) / (maxPrice - minPrice);
  };

  // 🔥 حساب التقييم الذكي
  const getScore = (p: any) => {
    const rating = (p?.rating || 4) / 5;
    const reviews = Math.min((p?.reviewsCount || 0) / 1000, 1);
    const priceScore = normalizePrice(p?.price || 1);

    return Math.round(
      rating * 50 +     // 50%
      reviews * 30 +    // 30%
      priceScore * 20   // 20%
    );
  };

  const score1 = getScore(p1);
  const score2 = getScore(p2);
  const bestScore = Math.max(score1, score2);

  return (
    <div className="max-w-6xl mx-auto py-10 px-4" dir="rtl">

      {/* 🔙 زر الرجوع */}
      <div className="flex justify-between items-center mb-8">
        <Link
          href={`/${country}/product-comparisons/${slug}`}
          className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-xl text-sm font-bold"
        >
          ⬅ رجوع للمقارنات
        </Link>

        <h1 className="text-xl font-black">
          مقارنة المنتجات
        </h1>
      </div>

      {/* 🔥 الكروت */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {[p1, p2].map((p, i) => {
          const percent = p.id === p1.id ? score1 : score2;
          const isBest = percent === bestScore;

          return (
            <div
              key={i}
              className={`relative bg-white p-6 rounded-3xl shadow-md border transition
              ${isBest ? "border-green-500 shadow-green-100" : "border-gray-100"}`}
            >

              {/* 🔥 الأفضل */}
              {isBest && (
                <div className="absolute top-3 left-3 bg-green-500 text-white text-xs px-3 py-1 rounded-full">
                  الأفضل 🔥
                </div>
              )}

              {/* 🏪 لوجو المتجر (يمين) */}
              <div className="flex justify-end mb-3">
                <img
                  src={p?.brand_logo || "/placeholder-logo.png"}
                  alt="متجر"
                  className="w-10 h-10 object-contain"
                />
              </div>

              {/* 📸 الصورة */}
              <img
                src={p?.image_url}
                alt={p?.title}
                className="h-40 mx-auto mb-4 object-contain"
              />

              {/* 📝 العنوان */}
              <h2 className="font-bold text-sm mb-2 text-center line-clamp-2">
                {p?.title}
              </h2>

              {/* ⭐ التقييم */}
              <div className="text-center text-yellow-500 font-bold mb-2">
                ⭐ {p?.rating || 4.5} / 5
              </div>

              {/* 📊 التقييم الذكي */}
              <div className="text-center text-green-600 font-extrabold text-lg mb-1">
                {percent}%
              </div>

              <div className="w-full bg-gray-100 rounded-full h-2 mb-2 overflow-hidden">
                <div
                  className="bg-green-500 h-2 transition-all duration-500"
                  style={{ width: `${percent}%` }}
                />
              </div>

              <div className="text-center text-xs text-gray-500 mb-3">
                التقييم العام (جودة + سعر + انتشار)
              </div>

              {/* 👁 المشاهدات */}
              <div className="text-center text-xs text-gray-400 mb-2">
                👁 {p?.reviewsCount || 0}
              </div>

              {/* 💰 السعر */}
              <div className="text-center text-2xl font-black text-orange-600 mb-4">
                {p?.price} جنيه
              </div>

              {/* 🛒 زر الشراء */}
              <a
                href={p?.affiliate_link || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-black text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition"
              >
                تسوق الآن 🛒
              </a>

              {/* 💡 توصية ذكية */}
              {percent > 80 && (
                <div className="text-green-600 text-xs font-bold text-center mt-2">
                  اختيار ممتاز 👍
                </div>
              )}

              {percent > 60 && percent <= 80 && (
                <div className="text-yellow-600 text-xs font-bold text-center mt-2">
                  قيمة جيدة 💰
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 📊 مقارنة سريعة */}
      <div className="bg-white rounded-3xl shadow p-6 text-center">
        <h3 className="font-bold mb-4 text-lg">📊 مقارنة سريعة</h3>
        <p className="text-gray-600">
          {p1?.title} VS {p2?.title}
        </p>
      </div>
    </div>
  );
}
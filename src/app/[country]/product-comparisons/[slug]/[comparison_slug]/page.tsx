import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function ComparisonPage({ params }: any) {
  const { country, slug, comparison_slug } = await params;

  // 🔹 جلب المقارنة
  const { data: comparison, error } = await supabase
    .from("smart_comparisons")
    .select("*")
    .eq("comparison_slug", comparison_slug)
    .maybeSingle();

  if (error || !comparison) return notFound();

  // 🔹 جلب المنتجات
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .in("id", [comparison.p1_id, comparison.p2_id])
    .eq("code", country);

  if (!products || products.length < 2) {
    return <div className="p-20 text-center">لا توجد منتجات</div>;
  }

  const p1 = products.find(
    (p) => String(p.id) === String(comparison.p1_id)
  );
  const p2 = products.find(
    (p) => String(p.id) === String(comparison.p2_id)
  );

  if (!p1 || !p2) {
    return <div className="p-20 text-center">خطأ في البيانات</div>;
  }

  // ===============================
  // ✅ 🔥 حل مشكلة المقارنة نهائيًا
  // ===============================

  const normalize = (str: string) =>
    str?.toLowerCase().trim();

  const cat1 = normalize(p1.category_slug || "");
  const cat2 = normalize(p2.category_slug || "");

  const sameCategory = cat1 === cat2;

  // ✅ السماح لو مفيش category
  if (p1.category_slug && p2.category_slug && !sameCategory) {
    return (
      <div className="text-center p-10">
        ❌ لا يمكن مقارنة منتجات مختلفة
        <br />
        <span className="text-gray-500 text-sm">
          {cat1} ≠ {cat2}
        </span>
        <br />
        <Link
          href={`/${country}/product-comparisons/${slug}`}
          className="text-blue-500 underline"
        >
          الرجوع للمقارنات
        </Link>
      </div>
    );
  }

  // ===============================
  // 🔥 الحسابات
  // ===============================

  const maxPrice = Math.max(p1.price || 0, p2.price || 0);
  const minPrice = Math.min(p1.price || 0, p2.price || 0);

  const normalizePrice = (price: number) => {
    if (maxPrice === minPrice) return 1;
    return (maxPrice - price) / (maxPrice - minPrice);
  };

  const getScore = (p: any) => {
    const rating = (p?.rating || 4) / 5;
    const reviews = Math.min((p?.reviewsCount || 0) / 1000, 1);
    const priceScore = normalizePrice(p?.price || 1);

    return Math.round(rating * 50 + reviews * 30 + priceScore * 20);
  };

  const score1 = getScore(p1);
  const score2 = getScore(p2);
  const best = score1 > score2 ? p1 : p2;

  // ===============================
  // 🎨 UI
  // ===============================

  return (
    <div className="max-w-5xl mx-auto py-10 px-4" dir="rtl">

      {/* 🔙 رجوع */}
      <div className="flex justify-between mb-6">
        <Link
          href={`/${country}/product-comparisons/${slug}`}
          className="bg-gray-100 px-4 py-2 rounded-xl"
        >
          رجوع ⬅
        </Link>

        <h1 className="font-bold text-xl">مقارنة المنتجات</h1>
      </div>

      {/* 🔥 الكارت */}
      <div className="bg-white rounded-3xl shadow p-4 overflow-x-auto">

        <table className="w-full text-center text-sm">

          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">العنصر</th>
              <th className="p-2">{p1.title}</th>
              <th className="p-2">{p2.title}</th>
            </tr>
          </thead>

          <tbody>

            {/* 📸 الصور */}
            <tr>
              <td className="p-2 font-bold">الصورة</td>

              <td>
                <img
                  src={p1.image_url || "/placeholder.png"}
                  alt={p1.title || "منتج"}
                  title={p1.title || "منتج"}
                  className="h-24 mx-auto object-contain"
                />
              </td>

              <td>
                <img
                  src={p2.image_url || "/placeholder.png"}
                  alt={p2.title || "منتج"}
                  title={p2.title || "منتج"}
                  className="h-24 mx-auto object-contain"
                />
              </td>
            </tr>

            {/* 💰 السعر */}
            <tr>
              <td className="p-2 font-bold">السعر</td>
              <td className="text-green-600">{p1.price || 0} جنيه</td>
              <td className="text-green-600">{p2.price || 0} جنيه</td>
            </tr>

            {/* ⭐ التقييم */}
            <tr>
              <td className="p-2 font-bold">التقييم</td>
              <td>⭐ {p1.rating || 0}</td>
              <td>⭐ {p2.rating || 0}</td>
            </tr>

            {/* 👁 المراجعات */}
            <tr>
              <td className="p-2 font-bold">المراجعات</td>
              <td>{p1.reviewsCount || 0}</td>
              <td>{p2.reviewsCount || 0}</td>
            </tr>

            {/* 🔥 السكور */}
            <tr className="bg-gray-50">
              <td className="p-2 font-bold">التقييم العام</td>
              <td className="text-green-600 font-bold">{score1}%</td>
              <td className="text-green-600 font-bold">{score2}%</td>
            </tr>

          </tbody>
        </table>

        {/* 🏆 الفائز */}
        <div className="text-center mt-4 font-bold text-green-600">
          🏆 الأفضل: {best.title}
        </div>

        {/* 🛒 الأزرار */}
        <div className="flex gap-2 mt-4">
          <a
            href={p1.product_url || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-black text-white py-2 rounded text-center"
          >
            شراء المنتج 1
          </a>

          <a
            href={p2.product_url || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-gray-800 text-white py-2 rounded text-center"
          >
            شراء المنتج 2
          </a>
        </div>

      </div>
    </div>
  );
}
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';

export default async function ComparisonPage({ params }: { params: any }) {

  const { country, comparison_id } = await params;

  const currentCountry = country.toLowerCase();

  // ✅ 1. نجيب المقارنة بالـ ID مباشرة
  const { data: comparison, error } = await supabase
    .from('featured_comparisons')
    .select('p1_id, p2_id')
    .eq('id', comparison_id)
    .maybeSingle();

  if (error || !comparison) {
    console.error("❌ comparison error:", error);
    return notFound();
  }

  // ✅ 2. نجيب المنتجات بالـ ID
  const { data: products } = await supabase
    .from('products')
    .select(`
      id,
      title,
      image_url,
      price,
      old_price,
      rating,
      reviewsCount,
      product_specs (spec_key, spec_value)
    `)
    .in('id', [comparison.p1_id, comparison.p2_id])
    .eq('code', currentCountry);

  if (!products || products.length === 0) {
    return (
      <div className="p-20 text-center font-bold">
        المنتجات غير موجودة
      </div>
    );
  }

  const p1 = products.find(p => p.id === comparison.p1_id);
  const p2 = products.find(p => p.id === comparison.p2_id);

  // ✅ 3. مقارنة ذكية
  const score1 = (p1?.rating || 0) * (p1?.reviewsCount || 1);
  const score2 = (p2?.rating || 0) * (p2?.reviewsCount || 1);

  const winner =
    score1 > score2 ? "p1" :
    score2 > score1 ? "p2" : "equal";

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 text-right" dir="rtl">

      <h1 className="text-2xl font-black text-center mb-10">
        مقارنة المنتجات
      </h1>

      {/* المنتجات */}
      <div className="grid grid-cols-2 gap-6 mb-10">

        {[p1, p2].map((product, idx) => {

          const isWinner =
            (idx === 0 && winner === "p1") ||
            (idx === 1 && winner === "p2");

          return (
            <div
              key={idx}
              className={`p-6 rounded-[25px] border shadow text-center transition
              ${isWinner ? "border-green-500 bg-green-50 scale-105" : "border-gray-100 bg-white"}
              `}
            >

              {isWinner && (
                <div className="text-green-600 font-bold mb-2">
                  🏆 الأفضل
                </div>
              )}

              <img
                src={product?.image_url || "/placeholder.png"}
                alt={product?.title || "منتج"}
                className="h-40 w-full object-contain mb-4"
              />

              <h3 className="font-bold text-sm mb-2 line-clamp-2">
                {product?.title}
              </h3>

              <div className="text-xl font-black text-orange-600">
                {product?.price?.toLocaleString()} ج.م
              </div>

              {product?.old_price && (
                <div className="text-xs line-through text-gray-400">
                  {product.old_price}
                </div>
              )}

              <div className="mt-2 text-sm text-gray-600">
                ⭐ {product?.rating || 4.5} ({product?.reviewsCount || 0})
              </div>

            </div>
          );
        })}

      </div>

      {/* جدول المواصفات */}
      <div className="bg-white rounded-[25px] border shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-black text-white">
            <tr>
              <th className="p-4">المواصفة</th>
              <th className="p-4">المنتج 1</th>
              <th className="p-4">المنتج 2</th>
            </tr>
          </thead>

          <tbody>
            {Array.from(new Set([
              ...(p1?.product_specs?.map((s:any)=>s.spec_key) || []),
              ...(p2?.product_specs?.map((s:any)=>s.spec_key) || [])
            ])).map((key, i) => (

              <tr key={key} className={i % 2 ? "bg-gray-50" : ""}>
                <td className="p-3 font-bold text-gray-500">{key}</td>

                <td className={winner === "p1" ? "p-3 text-green-600 font-bold" : "p-3"}>
                  {p1?.product_specs?.find((s:any)=>s.spec_key === key)?.spec_value || "-"}
                </td>

                <td className={winner === "p2" ? "p-3 text-green-600 font-bold" : "p-3"}>
                  {p2?.product_specs?.find((s:any)=>s.spec_key === key)?.spec_value || "-"}
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
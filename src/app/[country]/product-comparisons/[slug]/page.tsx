import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { ArrowLeft, ArrowRightLeft, Zap, Info } from 'lucide-react';

interface Props {
  params: Promise<{ country: string; slug: string }>;
}

interface Comparison {
  id: string;
  comparison_slug: string;
  category_slug: string;
}

// ✅ جلب بيانات المنتجين بدون تعقيد
const getProductsData = async (compSlug: string, country: string) => {
  try {
    const [id1, id2] = compSlug.split("-vs-");

    const { data } = await supabase
      .from("products")
      .select("id, title, category_slug")
      .in("id", [id1, id2])
      .eq("code", country);

    if (!data || data.length < 2) return null;

    const p1 = data.find(p => String(p.id) === id1);
    const p2 = data.find(p => String(p.id) === id2);

    if (!p1 || !p2) return null;

    // ✅ الشرط الوحيد: نفس التصنيف
    if (
      p1.category_slug &&
      p2.category_slug &&
      p1.category_slug !== p2.category_slug
    ) {
      return null;
    }

    return {
      product1: p1.title,
      product2: p2.title,
    };

  } catch {
    return null;
  }
};

export default async function CategoryPage({ params }: Props) {
  const { country, slug } = await params;

  const countryCode =
    country.toLowerCase() === "eg" || country.toLowerCase() === "egypt"
      ? "eg"
      : "sa";

  // ✅ جلب المقارنات
  const { data: comparisons } = await supabase
    .from("smart_comparisons")
    .select("*")
    .eq("code", countryCode)
    .eq("category_slug", slug)
    .order("created_at", { ascending: false });

  // ✅ فلترة خفيفة فقط
  const validComparisons = comparisons
    ? (
        await Promise.all(
          comparisons.map(async (comp: Comparison) => {
            const result = await getProductsData(
              comp.comparison_slug,
              countryCode
            );

            if (!result) return null;

            return {
              ...comp,
              ...result,
            };
          })
        )
      ).filter(Boolean)
    : [];

  return (
    <main className="min-h-screen bg-[#F8FAFC] py-16" dir="rtl">
      <div className="max-w-7xl mx-auto px-6">

        {/* 🔥 العنوان */}
        <div className="mb-12 text-right border-r-4 border-[#00A67E] pr-6">
          <h1 className="text-3xl font-black text-slate-900">
            مقارنات <span className="text-[#00A67E]">{slug}</span>
          </h1>
          <p className="text-slate-500 font-bold mt-2 flex items-center gap-2">
            <Info size={16} /> يتم عرض مقارنات من نفس الفئة فقط
          </p>
        </div>

        {/* 🔥 الكروت */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {validComparisons.length > 0 ? (
            validComparisons.map((comp: any) => (
              <Link
                key={comp.id}
                href={`/${country}/product-comparisons/${slug}/${comp.comparison_slug}`}
                className="group bg-white rounded-[2rem] shadow border hover:shadow-xl transition flex flex-col overflow-hidden"
              >

                {/* Header */}
                <div className="bg-slate-900 p-4 flex justify-between items-center group-hover:bg-[#00A67E] transition">
                  <span className="text-white text-xs font-bold uppercase">
                    {slug}
                  </span>
                  <ArrowRightLeft size={18} className="text-white" />
                </div>

                {/* Body */}
                <div className="p-6 text-center flex-grow flex flex-col justify-center gap-4">

                  <h2 className="font-bold text-sm text-slate-800 line-clamp-2">
                    {comp.product1}
                  </h2>

                  <div className="flex items-center gap-3">
                    <div className="h-[1px] bg-gray-200 flex-1"></div>
                    <span className="text-[#00A67E] font-bold text-xs">
                      VS
                    </span>
                    <div className="h-[1px] bg-gray-200 flex-1"></div>
                  </div>

                  <h2 className="font-bold text-sm text-slate-800 line-clamp-2">
                    {comp.product2}
                  </h2>
                </div>

                {/* Footer */}
                <div className="p-4 border-t flex justify-between items-center text-sm">
                  <span className="text-gray-400 flex items-center gap-1">
                    <Zap size={14} className="text-yellow-500" />
                    تحليل ذكي
                  </span>

                  <span className="flex items-center gap-1 font-bold">
                    مقارنة كاملة
                    <ArrowLeft size={16} />
                  </span>
                </div>

              </Link>
            ))
          ) : (
            <div className="col-span-3 text-center py-20">
              لا توجد مقارنات حالياً
            </div>
          )}

        </div>
      </div>
    </main>
  );
}
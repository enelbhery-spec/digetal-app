import { supabase } from "@/lib/supabase";
import Link from "next/link";

interface Props {
  params: Promise<{ country: string }>;
}

export default async function Page({ params }: Props) {
  const { country } = await params;
  const currentCountry = country.toLowerCase().trim();

  // ✅ 1. هات التصنيفات اللي فيها مقارنات فقط
  const { data: comparisons } = await supabase
    .from("smart_comparisons")
    .select("category_slug")
    .eq("code", currentCountry);

  if (!comparisons || comparisons.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">لا توجد مقارنات حالياً</h2>
      </div>
    );
  }

  // ✅ 2. إزالة التكرار
  const uniqueSlugs = [...new Set(comparisons.map(c => c.category_slug))];

  // ✅ 3. هات بيانات التصنيفات من جدول categories
  const { data: categories } = await supabase
    .from("categories")
    .select("id, title, slug")
    .in("slug", uniqueSlugs);

  return (
    <div className="max-w-6xl mx-auto py-16 px-6" dir="rtl">

      <h1 className="text-3xl font-black mb-10 text-center">
        مركز المقارنات
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        {categories?.map((cat) => (
          <Link
            key={cat.id}
            href={`/${currentCountry}/product-comparisons/${cat.slug}`}
            className="group p-6 bg-white border rounded-2xl shadow hover:shadow-xl transition text-center"
          >
            <span className="font-bold text-gray-800 group-hover:text-[#00A67E]">
              {cat.title}
            </span>
          </Link>
        ))}

      </div>

    </div>
  );
}
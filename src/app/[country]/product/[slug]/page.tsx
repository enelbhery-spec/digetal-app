import { createClient } from "@supabase/supabase-js";
import { Metadata } from "next";
import ProductCard from "@/components/ProductCard";

type Props = {
  params: Promise<{ slug: string; country: string }>;
};

// إنشاء عميل Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

/* ======================
    SEO
====================== */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, country } = await params;

  // جلب بيانات القسم بدلاً من المنتج
  const { data: category } = await supabase
    .from("categories")
    .select("title")
    .eq("slug", slug)
    .single();

  if (!category) return { title: "القسم غير موجود" };

  return {
    title: `عروض ${category.title} في ${country === 'sa' ? 'السعودية' : 'مصر'} | إكسترا كود`,
    description: `استكشف أفضل عروض وكوبونات خصم على ${category.title} في ${country}.`,
  };
}

/* ======================
    الصفحة
====================== */
export default async function CategoryPage({ params }: Props) {
  const { slug, country } = await params;

  // 1. جلب بيانات القسم بناءً على الـ slug
  const { data: category } = await supabase
    .from("categories")
    .select("id, title")
    .eq("slug", slug)
    .single();

  if (!category) {
    return <div className="text-center p-10 text-xl font-bold">هذا القسم غير موجود حالياً.</div>;
  }

  // 2. جلب ID الدولة لفلترة المنتجات
  const { data: countryData } = await supabase
    .from("countries")
    .select("id")
    .eq("code", country)
    .single();

  const countryId = countryData?.id;

  // 3. جلب جميع المنتجات التابعة لهذا القسم وفي هذه الدولة
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .eq("category_id", category.id)
    .eq("country_id", countryId)
    .order('created_at', { ascending: false });

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* رأس الصفحة */}
      <div className="mb-10 border-r-4 border-green-600 pr-4">
        <h1 className="text-3xl font-black text-gray-900">
          عروض {category.title}
        </h1>
        <p className="text-gray-500 mt-2">
          تم العثور على {products?.length || 0} منتج في {country === 'sa' ? 'المملكة العربية السعودية' : 'جمهورية مصر العربية'}
        </p>
      </div>

      {/* شبكة المنتجات */}
      {products && products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((item) => (
            <ProductCard
              key={item.id}
              product={item}
              country={country}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
          <p className="text-gray-400 text-lg">قريباً.. سنضيف عروضاً جديدة في قسم {category.title}</p>
        </div>
      )}
    </div>
  );
}
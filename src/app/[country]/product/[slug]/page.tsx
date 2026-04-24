import { createClient } from "@supabase/supabase-js";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

// --- يجب أن يكون هذا التعريف موجوداً في بداية الملف خارج الدالة ---
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Props = {
  params: Promise<{ slug: string; country: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { data: product } = await supabase
    .from("products")
    .select("title, description")
    .eq("slug", slug)
    .single();

  if (!product) return { title: "المنتج غير موجود" };

  return {
    title: `${product.title} | إكسترا كود`,
    description: product.description,
  };
}

export default async function ProductDetailsPage({ params }: Props) {
  const { slug, country } = await params;

  // 1. جلب بيانات المنتج الحالي
  const { data: product } = await supabase
    .from("products")
    .select("*, categories(title)")
    .eq("slug", slug)
    .single();

  if (!product) notFound();

  // 2. جلب المنتجات المشابهة (نفس القسم، استثناء الحالي)
  const { data: relatedProducts } = await supabase
    .from("products")
    .select("title, slug, price, image_url")
    .eq("category_id", product.category_id)
    .neq("slug", slug)
    .limit(8);

  return (
    <main className="max-w-7xl mx-auto p-6" dir="rtl">
      {/* قسم تفاصيل المنتج */}
      <div className="bg-white rounded-[3rem] shadow-sm border border-gray-100 overflow-hidden mb-12">
        <div className="grid md:grid-cols-2 gap-10 p-8 md:p-12">
          {/* صورة المنتج */}
          <div className="bg-gray-50 rounded-[2.5rem] flex items-center justify-center p-6 border border-gray-50">
            <img 
              src={product.image_url} 
              alt={product.title} 
              className="max-h-[400px] object-contain transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* تفاصيل المنتج */}
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-xs font-black">
                {product.categories?.title || "قسم عام"}
              </span>
            </div>

            <h1 className="text-3xl font-black text-gray-900 mb-6 leading-tight">
              {product.title}
            </h1>

            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-4xl font-black text-green-600">
                {product.price.toLocaleString()} {country === 'sa' ? 'ر.س' : 'ج.م'}
              </span>
              {product.old_price && (
                <span className="text-xl text-gray-400 line-through font-bold">
                  {product.old_price.toLocaleString()}
                </span>
              )}
            </div>

            <p className="text-gray-600 leading-relaxed mb-10 font-medium">
              {product.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href={product.affiliate_link}
                target="_blank"
                rel="nofollow sponsored noopener noreferrer"
                className="flex-1 bg-green-600 text-white text-center py-5 rounded-2xl font-black text-xl shadow-lg shadow-green-100 transition-all hover:bg-green-700 active:scale-95"
              >
                اشتري الآن ⚡
              </a>
              <Link 
                href={`/${country}`}
                className="px-8 py-5 border-2 border-gray-100 text-gray-400 text-center rounded-2xl font-bold transition-all hover:bg-gray-50"
              >
                رجوع
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* قسم منتجات مشابهة */}
      {relatedProducts && relatedProducts.length > 0 && (
        <section className="mt-16 pb-12">
          <h2 className="text-2xl font-black text-gray-900 mb-8 mr-4">
            منتجات مشابهة قد تعجبك ✨
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((rel) => (
              <Link 
                key={rel.slug} 
                href={`/${country}/product/${rel.slug}`}
                className="group bg-white p-4 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all"
              >
                <div className="aspect-square bg-gray-50 rounded-[1.5rem] overflow-hidden mb-4 flex items-center justify-center p-4">
                  <img 
                    src={rel.image_url} 
                    alt={rel.title} 
                    className="max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-bold text-gray-800 text-sm line-clamp-2 mb-2 min-h-[40px]">
                  {rel.title}
                </h3>
                <div className="text-green-600 font-black">
                  {rel.price.toLocaleString()} {country === 'sa' ? 'ر.س' : 'ج.م'}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
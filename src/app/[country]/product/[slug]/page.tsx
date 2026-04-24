import { createClient } from "@supabase/supabase-js";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

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

  // 2. جلب المنتجات المشابهة (نفس القسم، استثناء الحالي، بحد أقصى 8)
  const { data: relatedProducts } = await supabase
    .from("products")
    .select("title, slug, price, image_url")
    .eq("category_id", product.category_id)
    .neq("slug", slug)
    .limit(8);

  return (
    <main className="max-w-7xl mx-auto px-4 py-6 md:p-6" dir="rtl">
      {/* قسم تفاصيل المنتج - حاوية مرنة للموبايل */}
      <div className="bg-white rounded-[2rem] md:rounded-[3rem] shadow-sm border border-gray-100 overflow-hidden mb-8 md:mb-12">
        <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-10 p-5 md:p-12">
          
          {/* صورة المنتج - مقاس متجاوب */}
          <div className="bg-gray-50 rounded-[1.5rem] md:rounded-[2.5rem] flex items-center justify-center p-4 md:p-8 border border-gray-50 aspect-square">
            <img 
              src={product.image_url} 
              alt={product.title} 
              className="max-h-[300px] md:max-h-[400px] w-full object-contain transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* تفاصيل المنتج */}
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-3 md:mb-4">
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] md:text-xs font-black">
                {product.categories?.title || "قسم عام"}
              </span>
            </div>

            <h1 className="text-xl md:text-3xl font-black text-gray-900 mb-4 md:mb-6 leading-tight">
              {product.title}
            </h1>

            <div className="flex items-baseline gap-3 md:gap-4 mb-6 md:mb-8">
              <span className="text-2xl md:text-4xl font-black text-green-600">
                {product.price.toLocaleString()} {country === 'sa' ? 'ر.س' : 'ج.م'}
              </span>
              {product.old_price && (
                <span className="text-base md:text-xl text-gray-400 line-through font-bold">
                  {product.old_price.toLocaleString()}
                </span>
              )}
            </div>

            <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-8 md:mb-10 font-medium">
              {product.description}
            </p>

            {/* أزرار الأكشن - عرض كامل على الموبايل */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <a 
                href={product.affiliate_link}
                target="_blank"
                rel="nofollow sponsored noopener noreferrer"
                className="flex-1 bg-green-600 text-white text-center py-4 md:py-5 rounded-xl md:rounded-2xl font-black text-lg md:text-xl shadow-lg shadow-green-100 transition-all active:scale-95"
              >
                اشتري الآن ⚡
              </a>
              <Link 
                href={`/${country}`}
                className="px-8 py-4 md:py-5 border-2 border-gray-100 text-gray-400 text-center rounded-xl md:rounded-2xl font-bold transition-all hover:bg-gray-50"
              >
                رجوع
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* قسم منتجات مشابهة - شبكة محسنة للموبايل (2 في كل صف) */}
      {relatedProducts && relatedProducts.length > 0 && (
        <section className="mt-8 md:mt-16 pb-12">
          <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-6 md:mb-8 mr-2 md:mr-4">
            منتجات مشابهة قد تعجبك ✨
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {relatedProducts.map((rel) => (
              <Link 
                key={rel.slug} 
                href={`/${country}/product/${rel.slug}`}
                className="group bg-white p-3 md:p-4 rounded-[1.5rem] md:rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col h-full"
              >
                <div className="aspect-square bg-gray-50 rounded-[1.2rem] md:rounded-[1.5rem] overflow-hidden mb-3 flex items-center justify-center p-3">
                  <img 
                    src={rel.image_url} 
                    alt={rel.title} 
                    className="max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-bold text-gray-800 text-[11px] md:text-sm line-clamp-2 mb-2 min-h-[32px] md:min-h-[40px] flex-grow">
                  {rel.title}
                </h3>
                <div className="text-green-600 font-black text-sm md:text-base mt-auto">
                  {rel.price.toLocaleString()} <span className="text-[10px] md:text-xs font-medium">{country === 'sa' ? 'ر.س' : 'ج.م'}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Props = {
  params: Promise<{
    country: string;
  }>;
};

export default async function ComparisonArticlesPage({
  params,
}: Props) {

  const { country } =
    await params;

  // =====================================================
  // جلب المقالات
  // =====================================================

  const {
    data: articles,
  } = await supabase
    .from(
      "comparison_articles"
    )
    .select("*")
    .eq("published", true)
    .order("created_at", {
      ascending: false,
    });

  return (
    <div
      className="min-h-screen bg-slate-50 py-10 px-4"
      dir="rtl"
    >

      <div className="max-w-7xl mx-auto">

        {/* العنوان */}
        <div className="text-center mb-12">

          <h1 className="text-4xl md:text-5xl font-black text-slate-900">

            مقالات المقارنات

          </h1>

          <p className="mt-4 text-slate-500 text-lg">

            أحدث مقارنات المنتجات والأسعار والتقييمات

          </p>

        </div>

        {/* لا توجد مقالات */}
        {(!articles ||
          articles.length === 0) && (

          <div className="bg-white rounded-3xl p-10 text-center shadow">

            <h2 className="text-2xl font-black text-slate-700">

              لا توجد مقالات حالياً

            </h2>

          </div>
        )}

        {/* المقالات */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {articles?.map(
            (article) => (

              <Link
                key={article.id}
                href={`/${country}/comparison-articles/${encodeURIComponent(article.slug)}`}
                className="bg-white rounded-[2rem] overflow-hidden border border-slate-200 shadow hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >

                {/* الصورة */}
                <div className="relative">

                  <img
                    src={
                      article.image ||
                      "/no-image.png"
                    }
                    alt={
                      article.title
                    }
                    className="w-full h-64 object-cover"
                  />

                  {/* شارة */}
                  <div className="absolute top-4 right-4 bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-black shadow-lg">

                    مقارنة

                  </div>

                </div>

                {/* المحتوى */}
                <div className="p-6">

                  {/* التصنيف */}
                  <div className="mb-4">

                    <span className="bg-slate-100 text-slate-700 px-4 py-2 rounded-xl text-sm font-bold">

                      {
                        article.category_slug
                      }

                    </span>

                  </div>

                  {/* العنوان */}
                  <h2 className="text-xl font-black text-slate-900 leading-relaxed line-clamp-2 min-h-[70px]">

                    {article.title}

                  </h2>

                  {/* الوصف */}
                  <p className="mt-4 text-slate-500 leading-8 line-clamp-3 min-h-[90px]">

                    {
                      article.excerpt
                    }

                  </p>

                  {/* زر */}
                  <div className="mt-6">

                    <div className="bg-[#07122F] hover:bg-black text-white text-center py-4 rounded-2xl font-black transition-all">

                      قراءة المقال

                    </div>

                  </div>

                </div>

              </Link>
            )
          )}

        </div>

      </div>

    </div>
  );
}
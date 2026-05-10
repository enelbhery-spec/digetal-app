import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

import { supabase } from "@/lib/supabase";

type Props = {
  params: Promise<{
    country: string;
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: Props) {

  const { slug } =
    await params;

  const decodedSlug =
    decodeURIComponent(slug);

  const {
    data: article,
  } = await supabase
    .from(
      "comparison_articles"
    )
    .select("*")
    .eq(
      "slug",
      decodedSlug
    )
    .single();

  if (!article) {

    return {
      title:
        "المقال غير موجود",
    };
  }

  return {

    title:
      article.seo_title ||
      article.title,

    description:
      article.seo_description ||
      article.excerpt,

    openGraph: {

      title:
        article.seo_title ||
        article.title,

      description:
        article.seo_description ||
        article.excerpt,

      images: [
        article.image,
      ],
    },
  };
}

export default async function ComparisonArticlePage({
  params,
}: Props) {

  const {
    slug,
    country,
  } = await params;

  const decodedSlug =
    decodeURIComponent(slug);

  // =====================================================
  // جلب المقال
  // =====================================================

  const {
    data: article,
  } = await supabase
    .from(
      "comparison_articles"
    )
    .select("*")
    .eq(
      "slug",
      decodedSlug
    )
    .eq("published", true)
    .single();

  if (!article) {

    notFound();
  }

  // =====================================================
  // زيادة المشاهدات
  // =====================================================

  await supabase
    .from(
      "comparison_articles"
    )
    .update({
      views:
        (article.views || 0) + 1,
    })
    .eq("id", article.id);

  // =====================================================
  // جلب المنتجين
  // =====================================================

  const {
    data: products,
  } = await supabase
    .from("products")
    .select("*")
    .in("id", [
      article.p1_id,
      article.p2_id,
    ]);

  const p1 =
    products?.find(
      (p) =>
        String(p.id) ===
        String(article.p1_id)
    );

  const p2 =
    products?.find(
      (p) =>
        String(p.id) ===
        String(article.p2_id)
    );

  // =====================================================
  // مقالات مشابهة
  // =====================================================

  const {
    data: relatedArticles,
  } = await supabase
    .from(
      "comparison_articles"
    )
    .select("*")
    .eq(
      "category_slug",
      article.category_slug
    )
    .neq("id", article.id)
    .limit(4);

  return (
    <div
      className="min-h-screen bg-slate-50 py-10 px-4"
      dir="rtl"
    >

      <div className="max-w-5xl mx-auto">

        {/* الصورة */}
        <div className="overflow-hidden rounded-[2rem] shadow-xl bg-white">

          <img
            src={
              article.image ||
              "/no-image.png"
            }
            alt={article.title}
            className="w-full h-[250px] md:h-[500px] object-cover"
          />

        </div>

        {/* المحتوى */}
        <div className="bg-white rounded-[2rem] shadow-xl p-6 md:p-10 mt-8">

          {/* التصنيف */}
          <div className="mb-6">

            <span className="bg-orange-100 text-orange-600 px-5 py-2 rounded-2xl font-black">

              {
                article.category_slug
              }

            </span>

          </div>

          {/* العنوان */}
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-relaxed">

            {article.title}

          </h1>

          {/* معلومات */}
          <div className="flex flex-wrap items-center gap-4 mt-6 text-slate-500 font-bold">

            <span>

              👁 {article.views || 0} مشاهدة

            </span>

            <span>

              📅 {
                new Date(
                  article.created_at
                ).toLocaleDateString(
                  "ar-EG"
                )
              }

            </span>

          </div>

          {/* الوصف */}
          <p className="mt-8 text-xl leading-[2.3] text-slate-700 font-medium">

            {
              article.excerpt
            }

          </p>

          {/* المحتوى */}
          <div className="mt-10 prose prose-lg max-w-none leading-[2.4] text-slate-800">

            <ReactMarkdown
              components={{

                a: ({
                  node,
                  ...props
                }) => (

                  <a
                    {...props}
                    target="_blank"
                    rel="nofollow sponsored"
                    className="text-blue-600 font-bold hover:underline"
                  />

                ),

                table: ({
                  node,
                  ...props
                }) => (

                  <div className="overflow-x-auto">

                    <table
                      {...props}
                      className="w-full border border-slate-200 rounded-xl overflow-hidden"
                    />

                  </div>

                ),

                th: ({
                  node,
                  ...props
                }) => (

                  <th
                    {...props}
                    className="bg-slate-100 p-3 border"
                  />

                ),

                td: ({
                  node,
                  ...props
                }) => (

                  <td
                    {...props}
                    className="p-3 border"
                  />

                ),

              }}
            >

              {article.content}

            </ReactMarkdown>

          </div>

          {/* المنتجات */}
          {(p1 || p2) && (

            <div className="mt-14">

              <h2 className="text-3xl font-black mb-8 text-slate-900">

                شراء المنتجات

              </h2>

              <div className="grid md:grid-cols-2 gap-6">

                {/* المنتج الأول */}
                {p1 && (

                  <div className="bg-slate-50 border border-slate-200 rounded-[2rem] p-6">

                    <img
                      src={
                        p1.image_url ||
                        "/no-image.png"
                      }
                      alt={p1.title}
                      className="w-52 h-52 object-contain mx-auto"
                    />

                    <h3 className="mt-6 text-xl font-black leading-relaxed text-center">

                      {p1.title}

                    </h3>

                    <div className="mt-4 text-center">

                      <span className="text-green-600 text-3xl font-black">

                        {
                          Number(
                            p1.price || 0
                          ).toLocaleString()
                        }

                      </span>

                    </div>

                    <a
                      href={
                        p1.product_url ||
                        "#"
                      }
                      target="_blank"
                      rel="nofollow sponsored"
                      className="block mt-6 bg-black hover:bg-slate-800 text-white text-center py-4 rounded-2xl font-black text-lg transition-all"
                    >

                      شراء المنتج الأول

                    </a>

                  </div>
                )}

                {/* المنتج الثاني */}
                {p2 && (

                  <div className="bg-slate-50 border border-slate-200 rounded-[2rem] p-6">

                    <img
                      src={
                        p2.image_url ||
                        "/no-image.png"
                      }
                      alt={p2.title}
                      className="w-52 h-52 object-contain mx-auto"
                    />

                    <h3 className="mt-6 text-xl font-black leading-relaxed text-center">

                      {p2.title}

                    </h3>

                    <div className="mt-4 text-center">

                      <span className="text-green-600 text-3xl font-black">

                        {
                          Number(
                            p2.price || 0
                          ).toLocaleString()
                        }

                      </span>

                    </div>

                    <a
                      href={
                        p2.product_url ||
                        "#"
                      }
                      target="_blank"
                      rel="nofollow sponsored"
                      className="block mt-6 bg-orange-500 hover:bg-orange-600 text-white text-center py-4 rounded-2xl font-black text-lg transition-all"
                    >

                      شراء المنتج الثاني

                    </a>

                  </div>
                )}

              </div>

            </div>
          )}

        </div>

        {/* مقالات مشابهة */}
        {relatedArticles &&
          relatedArticles.length >
            0 && (

          <div className="mt-14">

            <h2 className="text-3xl font-black mb-8 text-slate-900">

              مقالات مشابهة

            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              {relatedArticles.map(
                (
                  item: any
                ) => (

                  <Link
                    key={item.id}
                    href={`/${country}/comparison-articles/${encodeURIComponent(item.slug)}`}
                    className="bg-white rounded-[2rem] overflow-hidden border border-slate-200 shadow hover:shadow-2xl transition-all"
                  >

                    <img
                      src={
                        item.image ||
                        "/no-image.png"
                      }
                      alt={
                        item.title
                      }
                      className="w-full h-56 object-cover"
                    />

                    <div className="p-5">

                      <h3 className="font-black text-xl leading-relaxed line-clamp-2">

                        {item.title}

                      </h3>

                      <div className="mt-5 bg-[#07122F] text-white text-center py-3 rounded-2xl font-black">

                        قراءة المقال

                      </div>

                    </div>

                  </Link>
                )
              )}

            </div>

          </div>
        )}

      </div>

    </div>
  );
}
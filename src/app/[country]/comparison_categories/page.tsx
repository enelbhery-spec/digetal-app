"use client";

import Link from "next/link";

import {
  useEffect,
  useState,
} from "react";

import {
  useRouter,
  useSearchParams,
  useParams,
} from "next/navigation";

import { supabase } from "@/lib/supabase";

type Comparison = {
  id: string;

  p1_title: string;
  p2_title: string;

  p1_image: string;
  p2_image: string;

  comparison_slug: string;

  category_slug: string;

  category_name?: string;

  code?: string;
};

export default function ComparisonCategoriesPage() {

  const router =
    useRouter();

  const searchParams =
    useSearchParams();

  const params =
    useParams();

  // ✅ الدولة الحالية
  const country =
    String(params?.country || "eg");

  const initialPage =
    Number(
      searchParams.get("page")
    ) || 1;

  const [currentPage, setCurrentPage] =
    useState(initialPage);

  const ITEMS_PER_PAGE = 50;

  const [comparisons, setComparisons] =
    useState<Comparison[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [totalPages, setTotalPages] =
    useState(1);

  useEffect(() => {

    fetchComparisons();

  }, [currentPage, country]);

  const fetchComparisons =
    async () => {

      setLoading(true);

      const from =
        (currentPage - 1) *
        ITEMS_PER_PAGE;

      const to =
        from +
        ITEMS_PER_PAGE -
        1;

      // ✅ فلترة حسب الدولة
      const {
        data,
        count,
        error,
      } = await supabase
        .from("smart_comparisons")
        .select("*", {
          count: "exact",
        })
        .eq("code", country)
        .order("created_at", {
          ascending: false,
        })
        .range(from, to);

      if (!error && data) {

        const formatted =
          await Promise.all(

            data.map(
              async (item: any) => {

                const {
                  data: products,
                } = await supabase
                  .from("products")
                  .select(
                    "id,title,image_url"
                  )
                  .in("id", [
                    item.p1_id,
                    item.p2_id,
                  ]);

                const p1 =
                  products?.find(
                    (p) =>
                      String(p.id) ===
                      String(item.p1_id)
                  );

                const p2 =
                  products?.find(
                    (p) =>
                      String(p.id) ===
                      String(item.p2_id)
                  );

                return {
                  ...item,

                  p1_title:
                    p1?.title ||
                    "منتج 1",

                  p2_title:
                    p2?.title ||
                    "منتج 2",

                  p1_image:
                    p1?.image_url ||
                    "/no-image.png",

                  p2_image:
                    p2?.image_url ||
                    "/no-image.png",
                };
              }
            )
          );

        setComparisons(
          formatted
        );

        setTotalPages(
          Math.ceil(
            (count || 0) /
              ITEMS_PER_PAGE
          )
        );
      }

      setLoading(false);
    };

  const goToPage = (
    page: number
  ) => {

    setCurrentPage(page);

    router.push(
      `?page=${page}`
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (loading) {

    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-black">

        جاري تحميل المقارنات...

      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-slate-50 py-10 px-4"
      dir="rtl"
    >

      <div className="max-w-7xl mx-auto">

        {/* العنوان */}
        <div className="text-center mb-10">

          <h1 className="text-4xl font-black text-slate-900 mb-3">

            أحدث المقارنات

          </h1>

          <p className="text-slate-500 text-lg">

            تصفح أحدث المقارنات الذكية بين المنتجات

          </p>

        </div>

        {/* الكروت */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {comparisons.map(
            (item) => (

              <Link
                key={item.id}
                href={`/${country}/product-comparisons/${item.category_slug}/${item.comparison_slug}`}
                className="bg-white rounded-[2rem] overflow-hidden border border-slate-200 shadow hover:shadow-2xl transition-all"
              >

                {/* التصنيف */}
                <div className="bg-orange-500 text-white text-center py-4 font-black text-lg">

                  {item.category_slug}

                </div>

                {/* المنتجات */}
                <div className="p-5">

                  <div className="flex items-center justify-between gap-4">

                    {/* المنتج الأول */}
                    <div className="w-1/2 text-center">

                      <img
                        src={
                          item.p1_image
                        }
                        alt={
                          item.p1_title
                        }
                        className="w-32 h-32 object-contain mx-auto"
                      />

                      <h2 className="font-black text-sm mt-3 line-clamp-2">

                        {item.p1_title}

                      </h2>

                    </div>

                    {/* VS */}
                    <div className="w-14 h-14 rounded-full bg-orange-500 text-white flex items-center justify-center font-black text-lg shadow-lg">

                      VS

                    </div>

                    {/* المنتج الثاني */}
                    <div className="w-1/2 text-center">

                      <img
                        src={
                          item.p2_image
                        }
                        alt={
                          item.p2_title
                        }
                        className="w-32 h-32 object-contain mx-auto"
                      />

                      <h2 className="font-black text-sm mt-3 line-clamp-2">

                        {item.p2_title}

                      </h2>

                    </div>

                  </div>

                  {/* الزر */}
                  <div className="mt-6">

                    <div className="bg-[#07122F] text-white text-center py-4 rounded-2xl font-black text-lg">

                      مشاهدة المقارنة

                    </div>

                  </div>

                </div>

              </Link>
            )
          )}

        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 mt-12 flex-wrap">

          {/* السابق */}
          {currentPage > 1 && (

            <button
              onClick={() =>
                goToPage(
                  currentPage - 1
                )
              }
              title="الصفحة السابقة"
              className="px-5 py-3 rounded-2xl bg-slate-200 hover:bg-slate-300 font-black transition"
            >

              السابق

            </button>
          )}

          {/* الأرقام */}
          {Array.from({
            length: totalPages,
          }).map((_, index) => {

            const page =
              index + 1;

            return (

              <button
                key={page}
                onClick={() =>
                  goToPage(
                    page
                  )
                }
                title={`الانتقال إلى الصفحة ${page}`}
                className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black transition-all ${
                  currentPage ===
                  page
                    ? "bg-orange-500 text-white"
                    : "bg-white border border-slate-300 hover:bg-slate-100"
                }`}
              >

                {page}

              </button>
            );
          })}

          {/* التالي */}
          {currentPage <
            totalPages && (

            <button
              onClick={() =>
                goToPage(
                  currentPage + 1
                )
              }
              title="الصفحة التالية"
              className="px-5 py-3 rounded-2xl bg-slate-200 hover:bg-slate-300 font-black transition"
            >

              التالي

            </button>
          )}

        </div>

      </div>

    </div>
  );
}
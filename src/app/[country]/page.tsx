import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ExtraCodeProductCard from "@/components/market/ExtraCodeProductCard";
import SafkaProductCard from "@/components/market/SafkaProductCard";
import Pagination from "@/components/Pagination";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ country: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

interface DBProduct {
  id: string | number;
  description?: string;
  excerpt?: string;
  seo_description?: string;
  category_slug?: string;
  created_at: string;
  [key: string]: any;
}

const allowedCountries = ["eg", "sa"];

export async function generateMetadata({ params }: { params: Promise<{ country: string }> }): Promise<Metadata> {
  const { country } = await params;
  const countryName = country === "sa" ? "السعودية" : "مصر";
  return {
    title: `متجر إكسترا كود الحصري في ${countryName}`,
    description: `أحدث المنتجات والعروض في ${countryName}.`,
  };
}

export default async function CountryPage({ params, searchParams }: Props) {
  const { country } = await params;
  const sParams = await searchParams;
  const countrySlug = country.toLowerCase().trim();

  const pageExtra = Number(sParams?.pageExtra) || 1;
  const extraLimit = 12;
  const categoryFilter = typeof sParams?.category === "string" ? sParams.category : null;

  if (!allowedCountries.includes(countrySlug)) notFound();

  // 1. جلب التصنيفات النشطة
  const [activeProductsCats, activeSafkaCats] = await Promise.all([
    supabase.from("products").select("category_slug").eq("code", countrySlug).eq("brand_slug", "extracode"),
    supabase.from("safka_products").select("category_slug").eq("code", countrySlug)
  ]);

  const rawSlugs = [...(activeProductsCats.data || []), ...(activeSafkaCats.data || [])].map(p => p.category_slug).filter(Boolean);
  const activeCategorySlugs = Array.from(new Set(rawSlugs));

  const { data: activeCategories } = await supabase
    .from("categories")
    .select("id, title, slug")
    .in("slug", activeCategorySlugs);

  // 2. جلب المنتجات المدمجة
  let combinedProducts: any[] = [];
  let extraTotalPages = 0;

  try {
    let regularQuery = supabase.from("products").select("*").eq("code", countrySlug).eq("brand_slug", "extracode");
    let safkaQuery = supabase.from("safka_products").select("*").eq("code", countrySlug);

    if (categoryFilter) {
      regularQuery = regularQuery.eq("category_slug", categoryFilter);
      safkaQuery = safkaQuery.eq("category_slug", categoryFilter);
    }

    const [regularRes, safkaRes] = await Promise.all([
      regularQuery.order("created_at", { ascending: false }),
      safkaQuery.order("created_at", { ascending: false })
    ]);

    const allProducts = [
      ...(regularRes.data || []).map(p => ({ ...p, isSafka: false })),
      ...(safkaRes.data || []).map(p => ({ ...p, isSafka: true }))
    ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    const extraFrom = (pageExtra - 1) * extraLimit;
    combinedProducts = allProducts.slice(extraFrom, extraFrom + extraLimit);
    extraTotalPages = Math.ceil(allProducts.length / extraLimit);
  } catch (err) {
    console.error("Error loading products:", err);
  }

  return (
    <main className="bg-gray-50 min-h-screen pb-20" dir="rtl">
      <div className="max-w-7xl mx-auto px-6 pt-12 text-center">
        <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight">🛍️ متجر إكسترا كود </h1>
      </div>

      {(activeCategories || []).length > 0 && (
        <div className="max-w-7xl mx-auto px-6 mt-10 flex gap-3 flex-wrap justify-center">
          <Link href={`/${countrySlug}`} className={`px-6 py-2.5 rounded-xl font-bold border ${!categoryFilter ? "bg-emerald-600 text-white" : "bg-white border-gray-200"}`}>كل المنتجات</Link>
          {(activeCategories || []).map((cat: any) => (
            <Link key={cat.id} href={`/${countrySlug}?category=${cat.slug}`} className={`px-5 py-2.5 rounded-xl font-bold border ${categoryFilter === cat.slug ? "bg-emerald-600 text-white" : "bg-white border-gray-200"}`}>
              {cat.title}
            </Link>
          ))}
        </div>
      )}

      <section className="max-w-7xl mx-auto px-6 mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {combinedProducts.map((product) => (
            product.isSafka ? (
              <SafkaProductCard key={`safka-${product.id}`} product={product} />
            ) : (
              <ExtraCodeProductCard key={`regular-${product.id}`} product={product} country={countrySlug} />
            )
          ))}
        </div>

        {extraTotalPages > 1 && (
          <div className="mt-16 flex justify-center">
            <Pagination currentPage={pageExtra} totalPages={extraTotalPages} baseUrl={`/${countrySlug}?category=${categoryFilter || ""}&pageExtra=`} />
          </div>
        )}
      </section>
    </main>
  );
}
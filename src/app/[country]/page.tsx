import type { Metadata } from "next";
import Categories from "@/components/Categories";
import ProductCard from "@/components/ProductCard";
import { supabase } from "@/lib/supabase";

type Props = {
  params: Promise<{ country: string }>;
};

/* =========================
   Dynamic SEO Metadata
========================= */

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {

  const resolvedParams = await params;
  const countrySlug = resolvedParams.country.toLowerCase().trim();

  const { data: countryData } = await supabase
    .from("countries")
    .select("id,name,code,currency")
    .eq("code", countrySlug)
    .single();

  if (!countryData) {
    return {
      title: "الدولة غير موجودة",
      description: "هذه الدولة غير متاحة حالياً.",
      robots: { index: false, follow: false },
    };
  }

  const baseUrl = "https://digital-app-q1mf.vercel.app";

  return {
    title: `كوبونات نون وأمازون ${countryData.name} | خصومات محدثة يوميًا`,
    description: `احصل على أحدث كوبونات نون وكود خصم أمازون في ${countryData.name} بخصومات حصرية محدثة يوميًا.`,
    alternates: {
      canonical: `${baseUrl}/${countrySlug}`,
    },
    robots: { index: true, follow: true },
  };
}

/* =========================
   الصفحة
========================= */

export default async function CountryPage({ params }: Props) {

  const resolvedParams = await params;
  const countrySlug = resolvedParams.country.toLowerCase().trim();

  /* 1️⃣ جلب الدولة */

  const { data: countryData, error: countryError } = await supabase
    .from("countries")
    .select("id,name,code,currency")
    .eq("code", countrySlug)
    .single();

  if (countryError || !countryData) {
    return (
      <div className="text-center py-20 text-xl">
        الدولة غير موجودة
      </div>
    );
  }

  /* 2️⃣ جلب المنتجات */

  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("country_id", countryData.id)
    .order("created_at", { ascending: false })
    .limit(12);

  return (
    <main className="bg-gray-50 min-h-screen">

      <section className="text-center py-14 bg-white shadow-sm">
        <h1 className="text-3xl font-bold">
          أفضل عروض {countryData.name}
        </h1>
        <p className="mt-3 text-gray-600">
          أحدث كوبونات وخصومات التسوق في {countryData.name}
        </p>
      </section>

      <section className="max-w-6xl mx-auto p-6 grid md:grid-cols-3 gap-6">
        {products?.length ? (
          products.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-3 text-center py-10 text-gray-500">
            لا توجد منتجات حالياً
          </div>
        )}
      </section>

    </main>
  );
}
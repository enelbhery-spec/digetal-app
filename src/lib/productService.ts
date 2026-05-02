import { supabase } from '@/lib/supabase';

export interface Product {
  id: string | number;
  title: string;
  price: number;
  image_url: string;
  slug?: string;
  category_slug?: string;
  code: string;
  rating: number;
  created_at: string;
  old_price?: number;
  currency?: string;
  reviewsCount?: number;
  brand_logo?: string;
  coupon_code?: string;
  product_url?: string;
  affiliate_link?: string;
  sold_estimate?: number;

  categories?: {
    title?: string;
    slug?: string;
  };
}

export const fetchAllTopRatedProducts = async (
  countryCode: string,
  page: number = 1,
  pageSize: number = 9
) => {
  try {
    // ✅ تنظيف الكود
    const cleanCountry =
      countryCode?.toLowerCase() === "egypt"
        ? "eg"
        : countryCode?.toLowerCase().trim();

    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    // 🔥 الاستعلام الأساسي (منتجات مميزة حقيقية)
    const { data, error, count } = await supabase
      .from("products")
      .select("*", { count: "exact" })
      .eq("code", cleanCountry)
      .eq("status", "done")

      // ✅ فلترة احترافية
      .gte("rating", 4.0)
      .gte("reviewsCount", 1000)

      // 🔥 جاهز للمستقبل
      // .gte("sold_estimate", 500)

      .not("image_url", "is", null)

      // ✅ ترتيب ذكي
      .order("rating", { ascending: false })
      .order("reviewsCount", { ascending: false })
      .order("created_at", { ascending: false })

      .range(from, to);

    // ❌ خطأ
    if (error) {
      console.error("❌ Supabase Error:", error.message);
      throw error;
    }

    // ⚠️ لو مفيش نتائج (Fallback ذكي)
    if (!data || data.length === 0) {
      console.warn("⚠️ No strong products, using fallback...");

      const { data: fallbackData, count: fallbackCount } = await supabase
        .from("products")
        .select("*", { count: "exact" })
        .eq("code", cleanCountry)
        .eq("status", "done")
        .not("image_url", "is", null)

        // fallback أخف شوية
        .gte("rating", 4)

        .order("rating", { ascending: false })
        .order("reviewsCount", { ascending: false })
        .range(from, to);

      return {
        products: fallbackData || [],
        totalCount: fallbackCount || 0,
      };
    }

    // ✅ النتيجة الأساسية
    return {
      products: data,
      totalCount: count || 0,
    };

  } catch (err: any) {
    console.error(
      "❌ fetchAllTopRatedProducts Error:",
      err?.message || "Unknown Error"
    );

    return {
      products: [],
      totalCount: 0,
    };
  }
};
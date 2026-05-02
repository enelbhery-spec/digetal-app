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
  coupon_code?: string;
  product_url?: string;
  affiliate_link?: string;
  sold_estimate?: number;

  // ✅ البراند (المهم)
  brands?: {
    logo?: string;
    slug?: string;
  };

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
    // ✅ تنظيف الدولة
    const cleanCountry =
      countryCode?.toLowerCase() === "egypt"
        ? "eg"
        : countryCode?.toLowerCase().trim();

    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    // 🔥 الاستعلام الأساسي مع JOIN على brands
    const { data, error, count } = await supabase
      .from("products")
      .select(
        `
        *,
        brands:brand_id (
          logo,
          slug
        )
      `,
        { count: "exact" }
      )
      .eq("code", cleanCountry)
      .eq("status", "done")
      .gte("rating", 4.2)
      .gte("reviewsCount", 1300)
      .not("image_url", "is", null)
      .order("rating", { ascending: false })
      .order("reviewsCount", { ascending: false })
      .order("created_at", { ascending: false })
      .range(from, to);

    // ❌ خطأ
    if (error) {
      console.error("❌ Supabase Error:", error.message);
      throw error;
    }

    // ⚠️ fallback لو مفيش بيانات قوية
    if (!data || data.length === 0) {
      console.warn("⚠️ No strong products, using fallback...");

      const { data: fallbackData, count: fallbackCount } = await supabase
        .from("products")
        .select(
          `
          *,
          brands:brand_id (
            logo,
            slug
          )
        `,
          { count: "exact" }
        )
        .eq("code", cleanCountry)
        .eq("status", "done")
        .not("image_url", "is", null)
        .gte("rating", 4)
        .order("rating", { ascending: false })
        .order("reviewsCount", { ascending: false })
        .range(from, to);

      return {
        products: fallbackData || [],
        totalCount: fallbackCount || 0,
      };
    }

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
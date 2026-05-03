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
    // ✅ دعم مصر + السعودية
    const cleanCountry = (() => {
      const c = countryCode?.toLowerCase().trim();

      if (!c) return "eg";

      // مصر
      if (c === "eg" || c === "egypt") return "eg";

      // السعودية
      if (
        c === "sa" ||
        c === "ksa" ||
        c === "saudi" ||
        c === "saudi-arabia" ||
        c === "saudi_arabia"
      ) {
        return "sa";
      }

      return c;
    })();

    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    // ✅ شروط مختلفة عشان السعودية تظهر
    const minRating = cleanCountry === "sa" ? 4 : 4.2;
    const minReviews = cleanCountry === "sa" ? 200 : 1000;

    // 🔥 الاستعلام الأساسي
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
      .not("image_url", "is", null)
      .gte("rating", minRating)
      .gte("reviewsCount", minReviews)
      .order("rating", { ascending: false })
      .order("reviewsCount", { ascending: false })
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) {
      console.error("❌ Supabase Error:", error.message);
      throw error;
    }

    // ⚠️ fallback لو مفيش بيانات
    if (!data || data.length === 0) {
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
        .gte("rating", 3.8)
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
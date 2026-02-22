"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

interface Product {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  price: number;
  old_price?: number | null; // optional
  rating?: number | null;
  affiliate_url: string;
  created_at: string;
}

export default function AmazonProductsPreview() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const { data, error } = await supabase
      .from("amazon_products")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setProducts(data as Product[]);
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <section className="py-20 text-center">
        <p className="text-gray-500 text-lg">جاري تحميل المنتجات...</p>
      </section>
    );
  }

  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-14 text-center">
          🔥 أفضل عروض أمازون اليوم
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => {

            const price = Number(product.price) || 0;
            const oldPrice =
              product.old_price !== undefined &&
              product.old_price !== null
                ? Number(product.old_price)
                : null;

            const hasDiscount =
              oldPrice !== null && oldPrice > price;

            const discount =
              hasDiscount
                ? Math.round(((oldPrice - price) / oldPrice) * 100)
                : null;

            const rating = product.rating ?? 0;

            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition duration-300 flex flex-col overflow-hidden relative group"
              >
                {/* نسبة الخصم */}
                {discount !== null && (
                  <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                    خصم {discount}%
                  </span>
                )}

                {/* صورة */}
                <div className="bg-gray-100 h-52 flex items-center justify-center p-4 overflow-hidden">
                  <img
                    src={product.image_url}
                    alt={product.title}
                    className="max-h-full object-contain transition duration-300 group-hover:scale-110"
                  />
                </div>

                {/* المحتوى */}
                <div className="p-5 flex flex-col flex-grow">

                  <h3 className="text-sm font-semibold line-clamp-2 min-h-[40px] mb-2">
                    {product.title}
                  </h3>

                  {product.description && (
                    <p className="text-gray-500 text-xs line-clamp-2 mb-3">
                      {product.description}
                    </p>
                  )}

                  {/* التقييم */}
                  {rating > 0 && (
                    <div className="flex items-center mb-3 text-yellow-500 text-sm">
                      {"★".repeat(Math.floor(rating))}
                      {"☆".repeat(5 - Math.floor(rating))}
                      <span className="text-gray-400 text-xs ml-2">
                        ({rating})
                      </span>
                    </div>
                  )}

                  {/* السعر */}
                  <div className="mb-4 flex items-center gap-3">
                    <span className="text-xl font-bold text-green-600">
                      {price.toLocaleString()} ج.م
                    </span>

                    {oldPrice !== null && (
                      <span className="text-gray-400 line-through text-sm">
                        {oldPrice.toLocaleString()} ج.م
                      </span>
                    )}
                  </div>

                  {/* زر */}
                  <a
                    href={product.affiliate_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto bg-yellow-500 hover:bg-yellow-600 text-white text-center py-3 rounded-xl transition font-semibold shadow"
                  >
                    عرض على أمازون
                  </a>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
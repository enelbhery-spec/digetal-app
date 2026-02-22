"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

interface Product {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  price: string;
  old_price: string | null;
  rating: number | null;
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
      <section className="py-16 text-center">
        <p className="text-gray-500">جاري تحميل المنتجات...</p>
      </section>
    );
  }

  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold mb-10 text-center">
          🔥 أفضل عروض أمازون اليوم
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {products.map((product) => {
            const price = parseFloat(product.price);
            const oldPrice = product.old_price
              ? parseFloat(product.old_price)
              : null;

            const hasDiscount =
              oldPrice !== null && oldPrice > price;

            const discount =
              hasDiscount
                ? Math.round(((oldPrice! - price) / oldPrice!) * 100)
                : null;

            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition duration-300 p-5 flex flex-col relative group"
              >
                {/* Badge خصم */}
                {discount && (
                  <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
                    خصم {discount}%
                  </span>
                )}

                {/* صورة */}
                <div className="h-44 flex items-center justify-center mb-4">
                  <img
                    src={product.image_url}
                    alt={product.title}
                    className="max-h-full object-contain group-hover:scale-105 transition duration-300"
                  />
                </div>

                {/* عنوان */}
                <h3 className="text-sm font-semibold line-clamp-2 mb-2 min-h-[40px]">
                  {product.title}
                </h3>
                {product.description && (
                 <p className="text-gray-600 text-xs mt-1 line-clamp-2">
                {product.description}
              </p>
        )}

                {/* سعر */}
                <div className="mb-2">
                  <span className="text-green-600 text-lg font-bold">
                    {price} ج.م
                  </span>

                  {hasDiscount && (
                    <span className="text-gray-400 line-through ml-2 text-sm">
                      {oldPrice} ج.م
                    </span>
                  )}
                </div>

                {/* تقييم */}
                {product.rating !== null && (
                  <div className="text-yellow-500 text-sm mb-3">
                    ⭐ {product.rating} / 5
                  </div>
                )}

                {/* زر */}
                <a
                  href={product.affiliate_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto bg-green-600 text-white text-center py-2 rounded-xl hover:bg-green-700 transition font-medium"
                >
                  عرض التفاصيل
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
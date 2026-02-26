"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

interface Product {
  id: string;
  name: string;
  description: string | null;
  image_url: string;
  price: number;
  currency: string;
  affiliate_link: string;
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
      .from("products")
      .select("*")
      .eq("country_id", "df9bf885-5638-40f1-a9f2-b9954192e4c3") // مصر
      .order("created_at", { ascending: false })
      .limit(8);

    if (error) {
      console.error(error);
    }

    if (data) {
      setProducts(data as Product[]);
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <section className="py-20 text-center">
        <p className="text-gray-500 text-lg">جاري تحميل أفضل العروض...</p>
      </section>
    );
  }

  if (!products.length) {
    return (
      <section className="py-20 text-center">
        <p className="text-gray-500 text-lg">
          لا توجد عروض متاحة حاليًا 🔎
        </p>
      </section>
    );
  }

  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            🔥 أفضل عروض أمازون اليوم
          </h2>
          <p className="text-gray-600">
            أحدث المنتجات المحدثة يوميًا
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition duration-300 flex flex-col overflow-hidden group"
            >
              <div className="bg-gray-100 h-52 flex items-center justify-center p-4 overflow-hidden">
                <img
                  src={product.image_url}
                  alt={product.name}
                  loading="lazy"
                  className="max-h-full object-contain transition duration-300 group-hover:scale-110"
                />
              </div>

              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-sm font-semibold line-clamp-2 min-h-[40px] mb-3">
                  {product.name}
                </h3>

                <div className="mb-4">
                  <span className="text-xl font-bold text-green-600">
                    {Number(product.price).toLocaleString()} {product.currency}
                  </span>
                </div>

                <a
                  href={product.affiliate_link}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="mt-auto bg-yellow-500 hover:bg-yellow-600 text-white text-center py-3 rounded-xl transition font-semibold shadow"
                >
                  تسوق الآن
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
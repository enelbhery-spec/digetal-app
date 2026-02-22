"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function amazon_products() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // ===============================
  // جلب منتجات امازون من Supabase
  // ===============================
  useEffect(() => {
    async function fetchamazon_products() {
      console.log("🛒 Fetching Amazon Products...");

      const { data, error } = await supabase
        .from("amazon_products")
        .select("*")
        .eq("category", "amazon") // ✅ منتجات امازون فقط
        .order("created_at", { ascending: false });

      if (error) {
        console.log("❌ Supabase Error:", error);
      }

      if (data) {
        console.log("✅ AMAZON DATA:", data);
        setProducts(data);
      }

      setLoading(false);
    }

    fetchamazon_products();
  }, []);

  // ===============================
  // Loading
  // ===============================
  if (loading)
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        جاري تحميل منتجات أمازون...
      </div>
    );

  // ===============================
  // UI
  // ===============================
  return (
    <main style={{ padding: 30 }}>
      <h1 style={{ textAlign: "center" }}>🛒 منتجات أمازون</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))",
          gap: 20,
          marginTop: 30,
        }}
      >
        {products.map((item, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #eee",
              borderRadius: 12,
              padding: 15,
              background: "#fff",
              boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
              transition: "0.3s",
            }}
          >
            {/* صورة المنتج */}
            <img
              src={item.image}
              alt={item.title}
              style={{
                width: "100%",
                height: 220,
                objectFit: "contain",
              }}
            />

            {/* عنوان */}
            <h3
              style={{
                fontSize: 15,
                marginTop: 10,
                minHeight: 50,
              }}
            >
              {item.title}
            </h3>

            {/* السعر */}
            {item.price && (
              <p style={{ fontSize: 18 }}>
                💰 <b>{item.price}</b>
              </p>
            )}

            {/* زر امازون */}
            <a href={item.url} target="_blank">
              <button
                style={{
                  background: "#ff9900",
                  border: "none",
                  color: "black",
                  padding: "10px",
                  width: "100%",
                  borderRadius: 8,
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                عرض على أمازون
              </button>
            </a>
          </div>
        ))}
      </div>
    </main>
  );
}
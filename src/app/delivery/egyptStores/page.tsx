"use client";

import React, { useState } from "react";

/* ================== TYPES ================== */
type StoreItem = {
  name: string;
  category: string;
  url: string;
};

/* ================== DATA ================== */
const data: StoreItem[] = [
  { name: "جوميا", category: "تسوق عام", url: "https://www.jumia.com.eg" },
  { name: "نون", category: "تسوق عام", url: "https://www.noon.com/egypt-ar" },
  { name: "أمازون مصر", category: "تسوق عام", url: "https://amzn.to/4kPzDL8" },

  { name: "كارفور مصر", category: "سوبر ماركت", url: "https://www.carrefouregypt.com" },
  { name: "سبينيس", category: "سوبر ماركت", url: "https://www.spinneys-egypt.com" },

  { name: "بي تك", category: "إلكترونيات", url: "https://www.btech.com" },
  { name: "2B", category: "إلكترونيات", url: "https://2b.com.eg" },
  { name: "راية شوب", category: "إلكترونيات", url: "https://www.rayashop.com" },

  { name: "تاون تيم", category: "ملابس", url: "https://townteam.com" },
  { name: "ديفاكتو", category: "ملابس", url: "https://www.defacto.com.eg" },
  { name: "H&M مصر", category: "ملابس", url: "https://www.hm.com/eg" },

  { name: "رنين", category: "أدوات منزلية", url: "https://www.raneen.com" },
  { name: "IKEA مصر", category: "أثاث", url: "https://www.ikea.com/eg/ar" },

  { name: "صيدليات العزبي", category: "صيدليات", url: "https://www.elezabypharmacy.com" },

  { name: "OLX Egypt", category: "إعلانات مبوبة", url: "https://www.olx.com.eg" }
];

/* ================== CATEGORIES ================== */
const categories = [
  "تسوق عام",
  "سوبر ماركت",
  "إلكترونيات",
  "ملابس",
  "أثاث",
  "صيدليات",
  "إعلانات مبوبة"
];

export default function EgyptStoresProduct() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const normalizedQuery = query.trim().toLowerCase();
  const isSearching = normalizedQuery.length >= 1;

  let results: StoreItem[] = [];

  // 🔍 البحث له الأولوية
  if (isSearching) {
    results = data.filter((item) =>
      item.name.toLowerCase().includes(normalizedQuery)
    );
  }
  // 🧩 نتائج الأيقونات
  else if (activeCategory) {
    results = data.filter(
      (item) => item.category === activeCategory
    );
  }

  return (
    <div style={styles.container} dir="rtl">
      <h1 style={styles.title}>🛒 دليل المتاجر الإلكترونية في مصر</h1>

      <p style={styles.description}>
        اختر تصنيفًا أو ابدأ بكتابة اسم المتجر
      </p>

      {/* البحث */}
      <input
        type="text"
        placeholder="اكتب اسم المتجر (مثال: جوميا)"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setActiveCategory(null); // ❌ إلغاء الأيقونات عند البحث
        }}
        style={styles.input}
      />

      {/* الأيقونات */}
      {!isSearching && (
        <div style={styles.tabs}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setQuery("");
              }}
              style={{
                ...styles.tab,
                background:
                  activeCategory === cat ? "#16a34a" : "#fff",
                color:
                  activeCategory === cat ? "#fff" : "#333",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* رسالة البداية */}
      {!isSearching && !activeCategory && (
        <p style={styles.hint}>
          👆 اختر تصنيفًا أو استخدم البحث
        </p>
      )}

      {/* لا نتائج */}
      {(isSearching || activeCategory) && results.length === 0 && (
        <p style={styles.empty}>❌ لا توجد نتائج</p>
      )}

      {/* النتائج */}
      {results.map((item, index) => (
        <div
          key={index}
          style={styles.card}
          onClick={() => window.open(item.url, "_blank")}
        >
          <div style={styles.name}>{item.name}</div>
          <div style={styles.category}>{item.category}</div>
        </div>
      ))}
    </div>
  );
}

/* ================== STYLES ================== */
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: "100vh",
    background: "#f4f6f8",
    padding: "16px",
    fontFamily: "Tahoma, Arial, sans-serif"
  },
  title: {
    textAlign: "center",
    marginBottom: "8px"
  },
  description: {
    textAlign: "center",
    color: "#555",
    marginBottom: "16px"
  },
  input: {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid #ccc",
    fontSize: "16px",
    marginBottom: "14px",
    textAlign: "right"
  },
  tabs: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    justifyContent: "center",
    marginBottom: "20px"
  },
  tab: {
    padding: "8px 14px",
    borderRadius: "20px",
    border: "1px solid #ddd",
    cursor: "pointer",
    fontSize: "14px"
  },
  card: {
    background: "#fff",
    padding: "12px",
    borderRadius: "10px",
    marginBottom: "10px",
    boxShadow: "0 2px 6px rgba(0,0,0,.1)",
    cursor: "pointer"
  },
  name: {
    fontWeight: "bold",
    fontSize: "16px"
  },
  category: {
    fontSize: "13px",
    color: "#666"
  },
  empty: {
    textAlign: "center",
    color: "#999",
    marginTop: "20px"
  },
  hint: {
    textAlign: "center",
    color: "#aaa",
    marginTop: "30px"
  }
};

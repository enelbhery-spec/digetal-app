"use client";

import React, { useState } from "react";

type StoreItem = {
  name: string;
  category: string;
  url: string;
};

const data: StoreItem[] = [
  { name: "جوميا", category: "تسوق عام", url: "https://www.jumia.com.eg" },
  { name: "نون", category: "تسوق عام", url: "https://www.noon.com/egypt-ar" },
  { name: "أمازون مصر", category: "تسوق عام", url: "https://www.amazon.eg" },
  { name: "كارفور مصر", category: "سوبر ماركت", url: "https://www.carrefouregypt.com" },
  { name: "سبينيس", category: "سوبر ماركت", url: "https://www.spinneys-egypt.com" },

  { name: "بي تك", category: "إلكترونيات", url: "https://www.btech.com" },
  { name: "2B", category: "إلكترونيات", url: "https://2b.com.eg" },
  { name: "راية شوب", category: "إلكترونيات", url: "https://www.rayashop.com" },
  { name: "إكسترا", category: "إلكترونيات", url: "https://www.extra.com.eg" },
  { name: "شارب مصر", category: "إلكترونيات", url: "https://www.sharp.eg" },

  { name: "تاون تيم", category: "ملابس", url: "https://townteam.com" },
  { name: "ديفاكتو", category: "ملابس", url: "https://www.defacto.com.eg" },
  { name: "LC Waikiki", category: "ملابس", url: "https://www.lcwaikiki.com/eg-EG" },
  { name: "Max Fashion", category: "ملابس", url: "https://www.maxfashion.com/eg/ar" },
  { name: "H&M مصر", category: "ملابس", url: "https://www.hm.com/eg" },

  { name: "رنين", category: "أدوات منزلية", url: "https://www.raneen.com" },
  { name: "هوم سنتر", category: "أثاث ومنزل", url: "https://www.homecentre.com/eg/ar" },
  { name: "IKEA مصر", category: "أثاث", url: "https://www.ikea.com/eg/ar" },
  { name: "Pan Emirates", category: "أثاث", url: "https://www.panemirates.com/eg" },

  { name: "صيدليات العزبي", category: "صيدليات", url: "https://www.elezabypharmacy.com" },
  { name: "صيدليات سيف", category: "صيدليات", url: "https://seifpharmacy.com" },
  { name: "صيدليات 19011", category: "صيدليات", url: "https://19011.com" },

  { name: "Jiji Egypt", category: "إعلانات مبوبة", url: "https://jiji.eg" },
  { name: "OLX Egypt", category: "إعلانات مبوبة", url: "https://www.olx.com.eg" }
];

const EgyptStoresProduct: React.FC = () => {
  const [query, setQuery] = useState<string>("");

  const results = data.filter(
    (item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={styles.container} dir="rtl">
      <h2 style={styles.title}>🔍 بحث عن المتاجر الإلكترونية في مصر</h2>

      <input
        type="text"
        placeholder="اكتب اسم المتجر أو التصنيف"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={styles.input}
      />

      <div>
        {query &&
          results.map((item, index) => (
            <div
              key={index}
              style={styles.card}
              onClick={() => window.open(item.url, "_blank")}
            >
              <div style={styles.name}>{item.name}</div>
              <div style={styles.category}>{item.category}</div>
            </div>
          ))}

        {query && results.length === 0 && (
          <div style={styles.empty}>لا توجد نتائج مطابقة</div>
        )}
      </div>
    </div>
  );
};

export default EgyptStoresProduct;

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: "100vh",
    background: "#f4f6f8",
    padding: "16px",
    fontFamily: "Tahoma, Arial, sans-serif"
  },
  title: {
    textAlign: "center",
    marginBottom: "12px"
  },
  input: {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid #ccc",
    fontSize: "16px",
    marginBottom: "15px",
    textAlign: "right"
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
  }
};

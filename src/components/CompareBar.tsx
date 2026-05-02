"use client";

import { useCompare } from "@/context/CompareContext";

export default function CompareBar({ country }: { country: string }) {
  const { items, clear } = useCompare();

  if (items.length < 2) return null;

  const handleCompare = async () => {
    const res = await fetch("/api/create-comparison", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        country,
        p1_id: items[0].id,
        p2_id: items[1].id,
        category_slug: items[0]?.category_slug
      })
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black text-white p-4 flex justify-between items-center z-50">
      <span>
        تم اختيار {items.length} منتجات
      </span>

      <div className="flex gap-3">
        <button onClick={clear} className="bg-gray-600 px-4 py-2 rounded">
          مسح
        </button>

        <button
          onClick={handleCompare}
          className="bg-green-500 px-4 py-2 rounded font-bold"
        >
          🔥 قارن الآن
        </button>
      </div>
    </div>
  );
}
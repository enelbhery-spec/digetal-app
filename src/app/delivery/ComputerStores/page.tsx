"use client";

import { useState } from "react";

type Store = {
  id: number;
  name: string;
  type: string;
  url: string;
};

const stores: Store[] = [
  {id: 1, name: "Maximum Hardware", type: "تجميعات وقطع غيار", url: "https://maximumhardware.store" },
  { id: 2, name: "High End Store", type: "كمبيوتر جيمينج", url: "https://highend-store.com" },
  { id: 3, name: "Arab Hardware Store", type: "قطع غيار", url: "https://store.arabhardware.net" },

];



export default function ComputerStores() {
  const [search, setSearch] = useState("");

  const filtered = stores.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-xl font-bold text-center mb-4">
        🖥️ دليل متاجر الكمبيوتر وقطع الغيار
      </h1>

      <input
        className="w-full border p-2 rounded mb-4"
        placeholder="ابحث عن متجر أو نوع الخدمة..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ul className="space-y-3">
        {filtered.map((store) => (
          <li key={store.id} className="border rounded p-3 flex justify-between items-center">
            <div>
              <p className="font-semibold">{store.name}</p>
              <p className="text-sm text-gray-600">{store.type}</p>
            </div>
            <a href={store.url} target="_blank" className="bg-blue-600 text-white px-4 py-1 rounded">
              زيارة
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

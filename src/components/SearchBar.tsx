"use client";

import { useEffect, useRef, useState } from "react";
import { Search, Loader2 } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type SearchResult = {
  id: string;
  title: string;
  url: string;
  image?: string;
};

export default function SearchBar() {
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [open, setOpen] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (keyword.trim().length < 2) {
      setResults([]);
      setOpen(false);
      return;
    }

    const timer = setTimeout(() => {
      searchProducts();
    }, 350);

    return () => clearTimeout(timer);
  }, [keyword]);

  async function searchProducts() {
    setLoading(true);

    // منتجات صفقة
    const { data: safka } = await supabase
      .from("safka_products")
      .select("safka_id,name,main_image")
      .ilike("name", `%${keyword}%`)
      .limit(5);

    // المنتجات العادية
    const { data: normal } = await supabase
      .from("products")
      .select("id,title,main_image,product_url")
      .ilike("title", `%${keyword}%`)
      .limit(5);

    const safkaResults: SearchResult[] =
      safka?.map((item: any) => ({
        id: item.safka_id,
        title: item.name,
        image: item.main_image,
        url: `/safka-products/${item.safka_id}`,
      })) || [];

    const normalResults: SearchResult[] =
      normal?.map((item: any) => ({
        id: item.id,
        title: item.title,
        image: item.main_image,
        url: item.product_url,
      })) || [];

    setResults([...safkaResults, ...normalResults]);

    setLoading(false);
    setOpen(true);
  }

  return (
    <div
      ref={wrapperRef}
      className="relative max-w-3xl mx-auto mb-8"
    >
      <div className="relative">
        <Search
          size={20}
          className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          dir="rtl"
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="ابحث عن اسم المنتج..."
          className="w-full rounded-full border border-slate-300 bg-white py-4 pr-14 pl-5 text-lg outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition"
        />

        {loading && (
          <Loader2
            className="absolute left-5 top-1/2 -translate-y-1/2 animate-spin text-emerald-600"
            size={20}
          />
        )}
      </div>

      {open && results.length > 0 && (
        <div className="absolute z-50 mt-3 w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">

          {results.map((item) => (
            <Link
              key={item.id}
              href={item.url}
              onClick={() => setOpen(false)}
              className="flex items-center gap-4 p-4 hover:bg-slate-50 transition"
            >
              <img
                src={item.image || "/no-image.png"}
                alt={item.title}
                className="w-14 h-14 rounded-xl object-cover border"
              />

              <div className="flex-1">
                <div className="font-bold text-slate-900 line-clamp-2">
                  {item.title}
                </div>
              </div>
            </Link>
          ))}

        </div>
      )}
    </div>
  );
}
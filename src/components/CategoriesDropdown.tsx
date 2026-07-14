"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Menu, ChevronDown, Grid2x2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

type Category = {
  id: string;
  title: string;
  slug: string;
  icon_url?: string | null;
};

export default function CategoriesDropdown() {
  const params = useParams();
  const country = (params?.country as string) || "eg";

  const [categories, setCategories] = useState<Category[]>([]);
  const [open, setOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadCategories() {
      const { data } = await supabase
        .from("categories")
        .select("id,title,slug,icon_url")
        .order("title");

      if (data) {
        setCategories(data);
      }
    }

    loadCategories();
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);

    return () =>
      document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-full border bg-white px-4 py-2 text-sm font-bold hover:bg-gray-100 transition"
      >
        <Menu size={18} />
        التصنيفات
        <ChevronDown size={16} />
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border overflow-hidden z-50">

          <div className="bg-emerald-600 text-white px-4 py-3 font-bold">
            جميع التصنيفات
          </div>

          <div className="max-h-[420px] overflow-y-auto">

            <Link
              href={`/${country}`}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition border-b"
            >
              <Grid2x2
                size={18}
                className="text-emerald-600"
              />
              الكل
            </Link>

            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/${country}?category=${cat.slug}`}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition border-b"
              >
                {cat.icon_url ? (
                  <img
                    src={cat.icon_url}
                    alt={cat.title}
                    className="w-6 h-6 object-contain"
                  />
                ) : (
                  <Grid2x2
                    size={18}
                    className="text-gray-500"
                  />
                )}

                <span>{cat.title}</span>
              </Link>
            ))}

          </div>
        </div>
      )}
    </div>
  );
}
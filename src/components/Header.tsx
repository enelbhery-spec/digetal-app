"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import CartIcon from "./CartIcon";
import { useCartStore } from "@/store/useCart";
import CategoriesDropdown from "@/components/CategoriesDropdown";

interface Video {
  title: string;
  videoId: string;
  thumbnail?: string;
}

export default function Header() {
  const params = useParams();
  const country = (params?.country as string) || "eg";

  // السلة
  const { items, toggleCart } = useCartStore();

  const [videoData, setVideoData] = useState<Video>({
    title: "جاري تحميل أحدث فيديو...",
    videoId: "",
  });

  useEffect(() => {
    async function fetchLatestVideo() {
      try {
        const res = await fetch("/api/youtube");
        const data = await res.json();

        if (Array.isArray(data) && data.length > 0) {
          setVideoData(data[0]);
        }
      } catch {
        setVideoData({
          title: "تابع أحدث فيديوهاتنا على يوتيوب",
          videoId: "",
        });
      }
    }

    fetchLatestVideo();
  }, []);

  const videoLink = videoData.videoId
    ? `https://www.youtube.com/watch?v=${videoData.videoId}`
    : "https://www.youtube.com/channel/UCgak46GjPPsFsVB5QnzD7pQ";

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between gap-4">

        {/* الفيديو */}
        <div className="flex items-center gap-3 bg-gray-50 border rounded-full px-3 py-1.5 flex-1 max-w-[55%] hover:shadow transition">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>

            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
          </span>

          <Link
            href={videoLink}
            target="_blank"
            className="text-xs font-semibold text-gray-800 truncate flex-1 hover:text-red-600 transition"
          >
            {videoData.title}
          </Link>
        </div>

        {/* التصنيفات + السلة + اللوجو */}
        <div className="flex items-center gap-3">

          {/* القائمة المنسدلة */}
          <CategoriesDropdown />

          {/* السلة */}
          <CartIcon
            itemCount={items.length}
            onClick={() => toggleCart(true)}
          />

          {/* اللوجو */}
          <Link
            href={`/${country}`}
            className="flex flex-col items-end leading-tight group"
          >
            <span className="text-xl md:text-2xl font-extrabold text-green-600 tracking-tight">
              تريند ستور
            </span>

            <span className="text-[9px] md:text-[10px] uppercase font-bold text-gray-400 tracking-[0.2em] -mt-1">
              Extracode
            </span>
          </Link>

        </div>

      </div>
    </header>
  );
}
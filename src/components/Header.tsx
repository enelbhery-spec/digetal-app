"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Video {
  title: string;
  videoId: string;
  thumbnail?: string;
}

export default function Header() {
  const params = useParams();
  const country = params?.country || "eg";

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

        {/* 🎬 قسم الفيديو */}
        <div className="flex items-center gap-3 bg-gray-50 border rounded-full px-3 md:px-4 py-2 flex-1 max-w-[60%] hover:shadow transition">

          {/* 🔴 Live indicator */}
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
          </span>

          {/* 🖼️ صورة الفيديو */}
          {videoData.thumbnail && (
            <img
              src={videoData.thumbnail}
              alt={videoData.title}
              className="w-12 h-8 object-cover rounded hidden sm:block"
            />
          )}

          {/* 📝 العنوان (قابل للضغط) */}
          <Link
            href={videoLink}
            target="_blank"
            className="text-xs md:text-sm font-semibold text-gray-800 truncate flex-1 hover:text-red-600 transition"
          >
            <span className="text-red-600 font-bold ml-1 text-[11px]">
              فيديو جديد:
            </span>
            {videoData.title}
          </Link>

          {/* ▶️ زر المشاهدة */}
          <Link
            href={videoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-xs md:text-sm font-bold py-1.5 px-3 md:px-4 rounded-full transition-all duration-300 shadow hover:scale-105"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
              <path d="M8 5v14l11-7z" />
            </svg>
            <span>شاهد الآن</span>
          </Link>
        </div>

        {/* 🟢 اللوجو */}
        <Link
          href={`/${country}`}
          className="flex flex-col items-end leading-tight group"
        >
          <span className="text-2xl md:text-3xl font-extrabold text-green-600 tracking-tight">
            إكسترا كود
          </span>
          <span className="text-[10px] md:text-xs uppercase font-bold text-gray-400 tracking-[0.2em] -mt-1 group-hover:tracking-[0.25em] transition-all">
            Extracode
          </span>
        </Link>

      </div>
    </header>
  );
}
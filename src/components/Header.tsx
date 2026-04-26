"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const params = useParams();
  const country = params?.country || "eg";

  // حالة لتخزين بيانات الفيديو من الـ API
  const [videoData, setVideoData] = useState({ title: "جاري التحميل...", videoId: "" });

  useEffect(() => {
    async function fetchLatestVideo() {
      try {
        // تأكد من صحة مسار الـ API الخاص بك
        const res = await fetch("/api/youtube");
        const data = await res.json();
        if (data.title) {
          setVideoData(data);
        }
      } catch (e) {
        console.error("خطأ في جلب بيانات اليوتيوب");
        // نص احتياطي في حال فشل الـ API
        setVideoData({ title: "تابع أحدث عروضنا على يوتيوب", videoId: "" });
      }
    }
    fetchLatestVideo();
  }, []);

  return (
    // الخلفية بيضاء لتماثل الصورة الأصلية
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm w-full">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">

        {/* --- قسم الفيديو على اليسار --- */}
        <div className="flex items-center gap-3 overflow-hidden border border-gray-200 rounded-full px-4 py-1.5 bg-gray-50 flex-1 max-w-[50%]">
          {/* نقطة "Live" كعنصر بصري جذاب */}
          <span className="relative flex h-3 w-3 flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
          </span>
          
          <p className="text-xs md:text-sm font-semibold truncate text-gray-800 tracking-wide flex-1">
            <span className="text-red-600 font-bold ml-1.5 text-[11px]">فيديو جديد:</span>
            {videoData.title}
          </p>

          <Link 
            href={videoData.videoId ? `https://www.youtube.com/watch?v=${videoData.videoId}` : "https://youtube.com/@extracode"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-[10px] md:text-xs font-bold py-1 px-3 rounded-full transition-all duration-300 flex-shrink-0"
          >
            {/* أيقونة تشغيل صغيرة */}
            <svg viewBox="0 0 24 24" className="w-3 h-3 md:w-4 md:h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
            </svg>
            <span>شاهد الآن</span>
          </Link>
        </div>


        {/* --- قسم اللوجو على اليمين --- (مستوحى بدقة من الصورة) */}
        <Link
          href={`/${country}`}
          className="flex flex-col items-end leading-tight group"
        >
          <span className="text-3xl font-extrabold text-green-600 tracking-tighter">
            إكسترا كود
          </span>
          <span className="text-xs uppercase font-bold text-gray-400 tracking-[0.2em] -mt-1 group-hover:tracking-[0.25em] transition-all">
            Extracode
          </span>
        </Link>

      </div>
    </header>
  );
}
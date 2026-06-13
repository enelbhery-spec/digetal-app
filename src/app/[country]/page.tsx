import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ExtraCodeProductCard from "@/components/market/ExtraCodeProductCard";
import SafkaProductCard from "@/components/market/SafkaProductCard";
import Pagination from "@/components/Pagination";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { Play } from "lucide-react";

export const dynamic = "force-dynamic";

// دالة جلب الفيديوهات مع نظام الصفحات
async function getChannelVideos(page: number, pageToken?: string) {
  const API_KEY = process.env.YOUTUBE_API_KEY;
  const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;
  
  if (!API_KEY || !CHANNEL_ID) return { items: [], nextPageToken: null, totalPages: 0 };

  const publishedAfter = "2026-06-10T00:00:00Z";
  const limit = 6;
  
  // نرسل pageToken إذا كان موجوداً للانتقال للصفحة التالية
  const tokenParam = pageToken ? `&pageToken=${pageToken}` : "";
  const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${limit}&type=video&publishedAfter=${publishedAfter}${tokenParam}`;
  
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    const data = await res.json();
    return {
      items: data.items || [],
      nextPageToken: data.nextPageToken || null,
      prevPageToken: data.prevPageToken || null,
      totalResults: data.pageInfo?.totalResults || 0
    };
  } catch (err) {
    console.error("Error fetching YouTube videos:", err);
    return { items: [], nextPageToken: null, totalPages: 0 };
  }
}

type Props = {
  params: Promise<{ country: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function CountryPage({ params, searchParams }: Props) {
  const { country } = await params;
  const sParams = await searchParams;
  const countrySlug = country.toLowerCase().trim();

  // استقبال صفحة الفيديوهات من الرابط
  const videoPage = Number(sParams?.videoPage) || 1;
  const videoToken = typeof sParams?.vToken === "string" ? sParams.vToken : undefined;

  // جلب البيانات
  const [activeProductsCats, activeSafkaCats, videoData] = await Promise.all([
    supabase.from("products").select("category_slug").eq("code", countrySlug).eq("brand_slug", "extracode"),
    supabase.from("safka_products").select("category_slug").eq("code", countrySlug),
    getChannelVideos(videoPage, videoToken)
  ]);

  // ... (نفس منطق جلب المنتجات السابق) ...
  // (ملاحظة: لضيق المساحة، افترضت أنك ستضع منطق جلب المنتجات هنا كما هو في كودك الأصلي)

  return (
    <main className="bg-gray-50 min-h-screen pb-20" dir="rtl">
      {/* ... (باقي كود الهيدر والتصنيفات والمنتجات) ... */}

      {/* قسم الفيديوهات مع العداد */}
      {videoData.items.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 mt-20 py-16 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-center mb-10 text-gray-900 flex items-center justify-center gap-2">
            <Play className="text-red-600" /> شاهد تجارب العملاء
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {videoData.items.map((video: any) => (
              <div key={video.id.videoId} className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100">
                <div className="aspect-video bg-black rounded-2xl overflow-hidden mb-4">
                  <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${video.id.videoId}`} allowFullScreen />
                </div>
                <h3 className="font-bold text-center text-gray-700 line-clamp-2">{video.snippet.title}</h3>
              </div>
            ))}
          </div>

          {/* عداد صفحات الفيديوهات */}
          <div className="mt-12 flex justify-center gap-4">
            {videoData.prevPageToken && (
              <Link href={`/${countrySlug}?videoPage=${videoPage - 1}&vToken=${videoData.prevPageToken}`} className="px-6 py-2 bg-white border rounded-xl">السابق</Link>
            )}
            {videoData.nextPageToken && (
              <Link href={`/${countrySlug}?videoPage=${videoPage + 1}&vToken=${videoData.nextPageToken}`} className="px-6 py-2 bg-emerald-600 text-white rounded-xl">التالي</Link>
            )}
          </div>
        </section>
      )}
    </main>
  );
}
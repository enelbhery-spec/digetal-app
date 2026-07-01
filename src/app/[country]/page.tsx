import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ExtraCodeProductCard from "@/components/market/ExtraCodeProductCard";
import SafkaProductCard from "@/components/market/SafkaProductCard";
import Pagination from "@/components/Pagination";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { Play } from "lucide-react";
import SearchBar from "@/components/SearchBar";

export const dynamic = "force-dynamic";

async function getChannelVideos(pageToken?: string) {
  const API_KEY = process.env.YOUTUBE_API_KEY;
  const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;
  if (!API_KEY || !CHANNEL_ID) return { items: [], nextPageToken: null, prevPageToken: null };

  const publishedAfter = "2026-06-10T00:00:00Z";
  const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=6&type=video&publishedAfter=${publishedAfter}${pageToken ? `&pageToken=${pageToken}` : ""}`;
  
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    const data = await res.json();
    return { items: data.items || [], nextPageToken: data.nextPageToken || null, prevPageToken: data.prevPageToken || null };
  } catch { return { items: [], nextPageToken: null, prevPageToken: null }; }
}

type Props = {
  params: Promise<{ country: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function CountryPage({ params, searchParams }: Props) {
  const { country } = await params;
  const sParams = await searchParams;
  const countrySlug = country.toLowerCase().trim();
  
  const pageExtra = Number(sParams?.pageExtra) || 1;
  const vToken = typeof sParams?.vToken === "string" ? sParams.vToken : undefined;
  const categoryFilter = typeof sParams?.category === "string" ? sParams.category : null;

  const [activeProductsCats, activeSafkaCats, videoData] = await Promise.all([
    supabase.from("products").select("category_slug").eq("code", countrySlug).eq("brand_slug", "extracode"),
    supabase.from("safka_products").select("category_slug").eq("code", countrySlug),
    getChannelVideos(vToken)
  ]);

  const activeCategorySlugs = Array.from(new Set([...(activeProductsCats.data || []), ...(activeSafkaCats.data || [])].map(p => p.category_slug).filter(Boolean)));
  const { data: activeCategories } = await supabase.from("categories").select("id, title, slug").in("slug", activeCategorySlugs);

  let combinedProducts: any[] = [];
  let extraTotalPages = 0;
  
  try {
    let regularQuery = supabase.from("products").select("*").eq("code", countrySlug).eq("brand_slug", "extracode");
    let safkaQuery = supabase.from("safka_products").select("*").eq("code", countrySlug);
    if (categoryFilter) { regularQuery = regularQuery.eq("category_slug", categoryFilter); safkaQuery = safkaQuery.eq("category_slug", categoryFilter); }
    
    const [regularRes, safkaRes] = await Promise.all([regularQuery, safkaQuery]);
    const allProducts = [...(regularRes.data || []).map(p => ({ ...p, isSafka: false })), ...(safkaRes.data || []).map(p => ({ ...p, isSafka: true }))].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    
    extraTotalPages = Math.ceil(allProducts.length / 12);
    combinedProducts = allProducts.slice((pageExtra - 1) * 12, pageExtra * 12);
  } catch (err) { console.error(err); }

  return (
    <main className="bg-gray-50 min-h-screen pb-20" dir="rtl">
<div className="text-center pt-12">
  <h1 className="text-3xl md:text-5xl font-black">
    🛍️ تريند ستور مصر
  </h1>

  {/* شريط البحث */}
  <div className="max-w-3xl mx-auto mt-8 px-4">
    <SearchBar />
  </div>
</div>
      <div className="flex gap-3 flex-wrap justify-center mt-10 px-6">
        <Link href={`/${countrySlug}`} className={`px-6 py-2 rounded-xl border ${!categoryFilter ? "bg-emerald-600 text-white" : "bg-white"}`}>الكل</Link>
        {activeCategories?.map((cat: any) => <Link key={cat.id} href={`/${countrySlug}?category=${cat.slug}`} className={`px-5 py-2 rounded-xl border ${categoryFilter === cat.slug ? "bg-emerald-600 text-white" : "bg-white"}`}>{cat.title}</Link>)}
      </div>

      <section className="max-w-7xl mx-auto px-6 mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {combinedProducts.map((p) => p.isSafka ? <SafkaProductCard key={`safka-${p.id}`} product={p} /> : <ExtraCodeProductCard key={`reg-${p.id}`} product={p} country={countrySlug} />)}
      </section>

      {extraTotalPages > 1 && <div className="mt-10 flex justify-center"><Pagination currentPage={pageExtra} totalPages={extraTotalPages} baseUrl={`/${countrySlug}?category=${categoryFilter || ""}&pageExtra=`} /></div>}

      {videoData.items.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 mt-20 py-16 border-t">
          <h2 className="text-2xl font-bold text-center mb-10 flex items-center justify-center gap-2"><Play className="text-red-600" /> شاهد تجارب العملاء</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {videoData.items.map((v: any) => (
              <div key={v.id.videoId} className="bg-white p-4 rounded-3xl shadow-sm border">
                <iframe className="w-full aspect-video rounded-xl mb-4" src={`https://www.youtube.com/embed/${v.id.videoId}`} allowFullScreen />
                <h3 className="font-bold text-center line-clamp-2">{v.snippet.title}</h3>
              </div>
            ))}
          </div>
          <div className="mt-12 flex justify-center gap-4">
            {videoData.prevPageToken && <Link href={`/${countrySlug}?vToken=${videoData.prevPageToken}`} className="px-6 py-2 bg-white border rounded-xl">السابق</Link>}
            {videoData.nextPageToken && <Link href={`/${countrySlug}?vToken=${videoData.nextPageToken}`} className="px-6 py-2 bg-emerald-600 text-white rounded-xl">التالي</Link>}
          </div>
        </section>
      )}
    </main>
  );
}
"use client";

import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SmartSearchPreview() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data, error } = await supabase
          .from('amazon_products')
          .select('*')
          // أضفنا Mobiles هنا لأن السكريبت يرفع بهذا الاسم
          .in('category', ['Mobiles', 'deals', 'market']) 
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (data) setItems(data);
      } catch (err) {
        console.error("خطأ في جلب البيانات:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // إذا كان جاري التحميل أو لا توجد بيانات، لا تظهر شيئاً
  if (loading || items.length === 0) return null;

  // تقسيم البيانات: الأخبار للشريط العلوي، والمنتجات للشبكة
  const marketInfo = items.filter(i => i.category === 'market' || i.category === 'Mobiles').slice(0, 5);
  const productDeals = items.filter(i => i.category === 'Mobiles' || i.category === 'deals').slice(0, 6);

  return (
    <section className="bg-white">
      {/* 1. الشريط الإخباري (Ticker) */}
      <div className="bg-black text-white py-3 overflow-hidden border-b border-amber-500/30">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...marketInfo, ...marketInfo].map((info, index) => (
            <div key={index} className="flex items-center mx-10">
              <span className="text-amber-500 ml-2">●</span>
              <span className="font-bold ml-2 leading-none">{info.source || 'تحديث'}:</span>
              <span className="text-gray-300 leading-none">{info.title.slice(0, 50)}...</span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. شبكة المنتجات */}
      <div className="py-16 max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div className="text-center md:text-right">
            <h2 className="text-3xl font-bold text-gray-800">⚡ صيد المحرك الذكي الآن</h2>
            <p className="text-gray-500 mt-2">عروض حقيقية من أمازون وجوميا تم تحديثها الآن</p>
          </div>
          <Link href="\smart-search" className="bg-green-600 text-white px-8 py-3 rounded-full font-bold hover:bg-green-700 shadow-lg transition transform hover:scale-105">
            دخول المحرك الكامل ←
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productDeals.map((deal) => (
            <div key={deal.id} className="bg-white border border-gray-100 rounded-3xl p-4 shadow-sm hover:shadow-2xl transition-all group flex flex-col justify-between">
              
              {/* صورة المنتج */}
              <div className="relative w-full h-64 mb-4 rounded-2xl overflow-hidden bg-gray-50">
                <img 
                  src={deal.image_url || "/placeholder.png"} 
                  alt={deal.title}
                  className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2">
                  <span className="bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-lg shadow-md">
                    {deal.source}
                  </span>
                </div>
              </div>

              {/* تفاصيل المنتج */}
              <div className="px-2">
                <h3 className="font-bold text-gray-800 mb-4 line-clamp-2 h-12 group-hover:text-green-600 transition-colors">
                  {deal.title}
                </h3>

                <div className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400 font-medium">السعر الحالي</span>
                    <span className="text-xl font-black text-green-600">
                      {deal.price_deal || deal.price} <small className="text-[10px]">EGP</small>
                    </span>
                  </div>
                  <a 
                    href={deal.affiliate_link || "#"} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-gray-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-green-600 transition-all active:scale-95"
                  >
                    عرض العرض
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: fit-content;
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
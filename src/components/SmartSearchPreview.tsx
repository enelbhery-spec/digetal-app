"use client"; // 👈 أضيفي هذا السطر هنا لحل المشكلة فوراً

import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SmartSearchPreview() {
  const [items, setItems] = useState<any[]>([]);

  // بما أننا أصبحنا Client Component، يفضل جلب البيانات باستخدام useEffect 
  // لضمان استقرار العرض، أو يمكنكِ ترك الكود كما هو إذا كنتِ تفضلين السرعة
  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase
        .from('universal_search')
        .select('*')
        .in('category', ['deals', 'market']) 
        .order('created_at', { ascending: false });
      if (data) setItems(data);
    }
    fetchData();
  }, []);

  if (!items || items.length === 0) return null;

  const marketInfo = items.filter(i => i.category === 'market');
  const productDeals = items.filter(i => i.category === 'deals').slice(0, 6);

  return (
    <section className="bg-white">
      {/* الشريط الإخباري (Ticker) */}
      <div className="bg-black text-white py-3 overflow-hidden border-b border-amber-500/30">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...marketInfo, ...marketInfo].map((info, index) => (
            <a 
              key={index} 
              href={info.main_value} 
              target="_blank" 
              className="flex items-center mx-10 hover:text-amber-400 transition"
            >
              <span className="text-amber-500 ml-2">●</span>
              <span className="font-bold ml-2">{info.title}:</span>
              <span className="text-gray-300">{info.description}</span>
            </a>
          ))}
        </div>
      </div>

      {/* شبكة المنتجات */}
      <div className="py-16 max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div className="text-center md:text-right">
            <h2 className="text-3xl font-bold text-gray-800">⚡ صيد المحرك الذكي الآن</h2>
            <p className="text-gray-500 mt-2">عروض حقيقية بخصومات تبدأ من 10% إلى 70%</p>
          </div>
          <Link href="/smart-search" className="bg-green-600 text-white px-8 py-3 rounded-full font-bold hover:bg-green-700 shadow-lg transition">
            دخول المحرك الكامل ←
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productDeals.map((deal) => (
            <div key={deal.id} className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
              <div className="flex justify-between items-start mb-4">
                <span className="bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-lg">
                  لقطة اليوم
                </span>
                <span className="text-xs font-bold text-gray-400">
                   {deal.description?.split(' - ')[0].replace('🔥 ', '') || 'عرض'}
                </span>
              </div>

              <h3 className="font-bold text-gray-800 mb-6 line-clamp-2 h-12 group-hover:text-green-600">
                {deal.title}
              </h3>

              <div className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400 font-medium">السعر الآن</span>
                  <span className="text-2xl font-black text-green-600">
                    {deal.price_deal} <small className="text-[10px]">EGP</small>
                  </span>
                </div>
                <a 
                  href={deal.main_value} 
                  target="_blank" 
                  className="bg-gray-900 text-white px-5 py-2 rounded-xl text-sm font-bold hover:scale-105 transition"
                >
                  تسوق الآن
                </a>
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
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </section>
  );
}
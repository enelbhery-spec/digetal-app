"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export default function SmartSearchPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      // تعديل الاستعلام ليشمل Mobiles لضمان ظهور الـ 50 منتج
      const { data } = await supabase
        .from('universal_search')
        .select('*')
        .in('category', ['Mobiles', 'deals', 'market', 'jobs'])
        .order('created_at', { ascending: false });
      
      if (data) setItems(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  // تعديل الفلترة لتشمل الموبايلات في قسم العروض
  const marketData = items.filter(i => i.category === 'market' && i.title);
  const deals = items.filter(i => (i.category === 'deals' || i.category === 'Mobiles') && i.price_deal);
  const jobs = items.filter(i => i.category === 'jobs' && i.title);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-slate-500 font-bold animate-pulse text-xl">جاري فحص المحرك الذكي...</div>
    </div>
  );

  return (
    <main className="min-h-screen bg-slate-50 pb-12 font-sans" dir="rtl">
      
      {/* --- شريط التحديثات اللحظية --- */}
      {marketData.length > 0 && (
        <div className="bg-slate-900 text-yellow-400 py-3 overflow-hidden border-b border-yellow-500/20">
          <div className="flex whitespace-nowrap animate-marquee">
            {[...marketData, ...marketData].map((m, idx) => (
              <div key={idx} className="flex items-center gap-2 mx-10">
                <span className="font-bold">{m.title}:</span>
                <span className="text-white">{m.description}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <header className="mb-12 text-center">
          <h1 className="text-3xl font-black text-slate-800 mb-2">المحرك الذكي للنتائج المباشرة</h1>
          <p className="text-slate-500">تم العثور على {deals.length} عرض متاح الآن</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* العمود الأساسي: العروض المتاحة */}
          {deals.length > 0 ? (
            <section className="lg:col-span-8">
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                ⚡ عروض الموبايلات واللقطات المباشرة
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {deals.map((deal) => (
                  <div key={deal.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 hover:shadow-lg transition group">
                    
                    {/* إضافة صورة المنتج لأنها متوفرة الآن */}
                    <div className="relative h-48 w-full mb-4 bg-gray-50 rounded-xl overflow-hidden">
                      <img 
                        src={deal.image_url || "/placeholder.png"} 
                        alt={deal.title}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute top-2 left-2">
                        <span className="bg-white/90 backdrop-blur text-slate-800 text-[10px] font-bold px-2 py-1 rounded shadow-sm border border-slate-100">
                          {deal.source}
                        </span>
                      </div>
                    </div>

                    <h3 className="font-bold text-slate-800 line-clamp-2 mb-4 h-12 text-sm">
                      {deal.title}
                    </h3>
                    
                    <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-slate-400 font-bold">السعر المباشر</span>
                        <span className="text-xl font-black text-green-600">
                          {deal.price_deal} <small className="text-[10px]">EGP</small>
                        </span>
                      </div>
                      <a 
                        href={deal.affiliate_link || deal.main_value} 
                        target="_blank" 
                        className="bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-blue-600 transition"
                      >
                        تصفح العرض ←
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ) : (
            <div className="lg:col-span-8 bg-white p-10 rounded-2xl text-center border border-dashed text-slate-400">
              جاري تحديث العروض.. تأكد من تشغيل سكريبت البايثون.
            </div>
          )}

          {/* العمود الجانبي */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-blue-600 rounded-2xl p-6 text-white shadow-xl shadow-blue-200">
              <h3 className="font-bold mb-2 flex items-center gap-2">
                ℹ️ دليل المحرك
              </h3>
              <p className="text-xs opacity-90 leading-relaxed">
                هذه النتائج يتم سحبها لحظياً من أمازون وجوميا. السعر الموضح هو السعر النهائي وقت الفحص الذكي.
              </p>
            </div>

            {jobs.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <h2 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">💼 وظائف شاغرة</h2>
                <div className="space-y-4">
                  {jobs.map((job) => (
                    <div key={job.id} className="p-3 rounded-lg bg-slate-50 hover:bg-blue-50 transition">
                      <h4 className="font-bold text-sm text-slate-700">{job.title}</h4>
                      <a href={job.main_value} target="_blank" className="text-blue-600 text-[10px] font-bold mt-2 inline-block">تصفح الوظيفة ←</a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-marquee {
          display: flex;
          width: fit-content;
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </main>
  );
}
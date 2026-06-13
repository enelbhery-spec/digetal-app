// app/video/[videoId]/page.tsx
export default function VideoPage({ params }: { params: { videoId: string } }) {
  const { videoId } = params;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-10 flex flex-col items-center" dir="rtl">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl overflow-hidden">
        
        {/* مشغل الفيديو */}
        <div className="aspect-video w-full bg-black">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>

        {/* معلومات أسفل الفيديو */}
        <div className="p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">شاهد المراجعة الكاملة قبل الشراء</h1>
          <p className="text-gray-600 mb-8">استخدم كود الخصم المذكور في الفيديو للحصول على أفضل سعر.</p>
          
          <a 
            href="/" // ضع هنا رابط متجرك أو صفحة المنتج
            className="block w-full py-4 bg-emerald-600 text-white text-center rounded-2xl font-bold hover:bg-emerald-700 transition"
          >
            العودة للمتجر والشراء الآن
          </a>
        </div>
      </div>
    </div>
  );
}
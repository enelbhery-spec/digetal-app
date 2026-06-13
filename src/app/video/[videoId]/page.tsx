// src/app/video/[videoId]/page.tsx

type Props = {
  params: Promise<{ videoId: string }>;
};

export default async function VideoPage({ params }: Props) {
  // استخراج الـ videoId باستخدام await كما يتطلب Next.js 15
  const { videoId } = await params;

  // تعريف بيانات الـ Schema Markup لتحسين الأرشفة في جوجل
  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": "مراجعة المنتج - تريند ستور",
    "description": "شاهد المراجعة الكاملة للمنتج قبل الشراء مع كود خصم حصري.",
    "thumbnailUrl": `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    "uploadDate": new Date().toISOString(),
    "contentUrl": `https://www.youtube.com/watch?v=${videoId}`,
    "embedUrl": `https://www.youtube.com/embed/${videoId}`
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-10 flex flex-col items-center" dir="rtl">
      {/* حقن بيانات الـ Schema في الصفحة ليقرأها محرك البحث */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
      />

      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl overflow-hidden">
        
        {/* مشغل الفيديو */}
        <div className="aspect-video w-full bg-black relative">
          <iframe
            className="w-full h-full absolute inset-0"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            title="مراجعة المنتج - شاهد التجربة الكاملة"
          />
        </div>

        {/* معلومات أسفل الفيديو */}
        <div className="p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">شاهد المراجعة الكاملة قبل الشراء</h1>
          <p className="text-gray-600 mb-8">
            لقد قمنا بتجهيز هذه المراجعة لتوضيح تفاصيل المنتج. 
            استخدم كود الخصم المذكور في الفيديو للحصول على أفضل سعر متاح حالياً.
          </p>
          
          <a 
            href="/eg" 
            className="block w-full py-4 bg-emerald-600 text-white text-center rounded-2xl font-bold hover:bg-emerald-700 transition-all duration-300 shadow-lg shadow-emerald-200"
          >
            العودة للمتجر والشراء الآن
          </a>
        </div>
      </div>
    </div>
  );
}
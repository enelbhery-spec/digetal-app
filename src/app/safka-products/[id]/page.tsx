import BuyNowButton from "./BuyNowButton";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import ProductTracker from "./ProductTracker"; // استيراد مكون التتبع الجديد

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductDetailsPage({ params }: Props) {
  const { id } = await params;

  // جلب المنتج من قاعدة البيانات
  const { data: product, error } = await supabase
    .from("safka_products")
    .select(`
        id,
        safka_id,
        property_id,
        name,
        images_urls,
        description,
        price,
        sale_price,
        barcode,
        video_id
      `)
    .eq("safka_id", id)
    .single();

  if (error || !product) {
    notFound();
  }

  // تجهيز البيانات للحسابات
  const images = Array.isArray(product.images_urls) ? product.images_urls : [];
  const mainImage = images[0] || "/no-image.png";

  const costPrice = Number(product.price ?? 0);
  const salePrice = Number(product.sale_price ?? 0);
  const finalPrice = salePrice > 0 ? salePrice : costPrice;

  const discount =
    costPrice > salePrice && salePrice > 0
      ? Math.round(((costPrice - salePrice) / costPrice) * 100)
      : 0;
      const siteUrl = "https://www.extracode.online";

  const productUrl = `${siteUrl}/safka-products/${product.safka_id}`;
  const thumbnailUrl = mainImage;

  const videoEmbedUrl = product.video_id
    ? `https://www.youtube.com/embed/${product.video_id}`
    : "";

  const videoWatchUrl = product.video_id
    ? `https://www.youtube.com/watch?v=${product.video_id}`
    : "";
  

  return (
    <main className="min-h-screen bg-[#f5f5f5] py-5 sm:py-10 px-3 sm:px-4">
      {/* تضمين مكون التتبع وتمرير الـ ID الخاص بالمنتج */}
      <ProductTracker productId={product.id} />

      {product.video_id && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "VideoObject",
              name: product.name,
              description:
                product.description
                  ?.replace(/<[^>]*>/g, "")
                  .substring(0, 300) || product.name,
              thumbnailUrl: [thumbnailUrl],
              uploadDate: new Date().toISOString(),
              embedUrl: videoEmbedUrl,
              contentUrl: videoWatchUrl,
              url: productUrl,
              publisher: {
                "@type": "Organization",
                name: "تريند ستور",
                logo: {
                  "@type": "ImageObject",
                  url: `${siteUrl}/logo.png`,
                },
              },
            }),
          }}
        />
      )}

      <div className="max-w-7xl mx-auto">
        <div className="bg-white w-full rounded-[2rem] shadow-sm overflow-hidden border border-slate-100">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-10 p-4 sm:p-6 lg:p-10">
            
            {/* الصورة */}
            <div className="relative bg-white rounded-[2rem] border border-slate-100 overflow-hidden h-[320px] sm:h-[420px] lg:h-[550px] flex items-center justify-center order-1 lg:order-2">
              {discount > 0 && (
                <div className="absolute top-5 left-5 z-20 bg-red-500 text-white text-sm font-black px-4 py-2 rounded-2xl shadow-lg">
                  خصم {discount}%
                </div>
              )}
              <img
                src={mainImage}
                alt={product.name || "product"}
                className="w-full h-full object-contain p-4 sm:p-8 transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* البيانات */}
            <div className="flex flex-col order-2 lg:order-1" dir="rtl">
              <div className="flex items-center gap-3 mb-5 flex-wrap">
                <span className="bg-emerald-600 text-white text-sm font-bold px-4 py-2 rounded-xl">
                  تريند ستور
                </span>
                {product.barcode && (
                  <span className="bg-[#FF7A00] text-white text-sm font-bold px-4 py-2 rounded-xl">
                    كود: {product.barcode}
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 leading-relaxed mb-6">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 flex-wrap mb-8">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950">
                  {finalPrice.toLocaleString()}
                </span>
                <span className="text-xl sm:text-2xl font-bold text-slate-600">ج.م</span>
                {costPrice > salePrice && salePrice > 0 && (
                  <span className="text-slate-400 line-through text-lg sm:text-2xl">
                    {costPrice.toLocaleString()} ج.م
                  </span>
                )}
              </div>

              {product.description && (
                <div className="mb-8">
                  <h2 className="text-xl sm:text-2xl font-black mb-4 text-slate-900">
                    وصف المنتج
                  </h2>
                  <div className="bg-slate-50 border border-slate-100 rounded-3xl p-4 sm:p-6">
                    <div
                      className="prose prose-sm sm:prose-base lg:prose-lg max-w-none text-right leading-8 sm:leading-9"
                      dangerouslySetInnerHTML={{ __html: product.description }}
                    />
                  </div>
                </div>
              )}

              {/* فيديو المنتج */}
              {product.video_id && (
                <div className="mt-8">
                  <h2 className="text-xl sm:text-2xl font-black mb-4 text-slate-900">
                    🎥 فيديو المنتج
                  </h2>

                  <div className="overflow-hidden rounded-[2rem] border border-slate-200 shadow-lg bg-black">
                    <div className="relative w-full pb-[56.25%]">
                      <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src={`https://www.youtube.com/embed/${product.video_id}`}
                        title={product.name || "فيديو المنتج"}
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* زر الشراء */}
              <div className="mt-8">
                <BuyNowButton
                  productId={product.id}
                  safka_id={product.safka_id}
                  property_id={product.property_id}
                  name={product.name}
                  price={costPrice}
                  sale_price={finalPrice}
                  image={mainImage}
                  category="منتجات متنوعة"
                />
              </div>            
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
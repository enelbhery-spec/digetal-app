import { supabase } from "@/lib/supabase";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

type Store = {
  id: string; // uuid
  name: string;
  slug: string;
};

type Product = {
  id: string;
  title: string;
  description?: string;
  price: number;
  rating?: number;
  image_url?: string;
  affiliate_url?: string;
};

export default async function StorePage({ params }: PageProps) {
  // ✅ مهم جداً في Next 15
  const { slug } = await params;

  // 🔹 جلب بيانات المتجر بالـ slug
  const { data: store, error: storeError } = await supabase
    .from("stores")
    .select("*")
    .eq("slug", slug)
    .single<Store>();

  if (storeError || !store) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500 text-xl">
        المتجر غير موجود
      </div>
    );
  }

  // 🔹 جلب المنتجات المرتبطة بالمتجر
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("store_id", store.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
  }

  const products: Product[] = data || [];

  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* عنوان المتجر */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold mb-3">
            {store.name}
          </h1>
          <p className="text-gray-500 text-lg">
            تصفح جميع المنتجات المتاحة
          </p>
        </div>

        {/* لو مفيش منتجات */}
        {products.length === 0 && (
          <div className="text-center text-gray-500 py-20 text-lg">
            لا توجد منتجات حالياً
          </div>
        )}

        {/* المنتجات */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => {
            const productLink = product.affiliate_url?.trim();

            const finalLink =
              productLink && productLink.startsWith("http")
                ? productLink
                : productLink
                ? `https://${productLink}`
                : null;

            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-5 flex flex-col"
              >
                {/* صورة المنتج */}
                <div className="h-48 flex items-center justify-center mb-4 bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={
                      product.image_url ||
                      "https://via.placeholder.com/300x300?text=No+Image"
                    }
                    alt={product.title}
                    className="max-h-full object-contain"
                  />
                </div>

                {/* عنوان المنتج */}
                <h3 className="font-bold text-lg mb-2 line-clamp-2 min-h-[56px]">
                  {product.title}
                </h3>

                {/* وصف */}
                {product.description && (
                  <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                    {product.description}
                  </p>
                )}

                {/* السعر */}
                <p className="text-green-600 font-bold text-xl mb-2">
                  EGP {product.price}
                </p>

                {/* التقييم */}
                {product.rating && (
                  <p className="text-yellow-500 text-sm mb-4">
                    ⭐ {product.rating} / 5
                  </p>
                )}

                {/* زر الشراء */}
                {finalLink ? (
                  <a
                    href={finalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto block text-center bg-yellow-400 text-black py-2 rounded-xl font-bold hover:bg-yellow-500 transition duration-300"
                  >
                    اشتري الآن
                  </a>
                ) : (
                  <button
                    disabled
                    className="mt-auto bg-gray-300 text-gray-600 py-2 rounded-xl font-bold cursor-not-allowed"
                  >
                    الرابط غير متوفر
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
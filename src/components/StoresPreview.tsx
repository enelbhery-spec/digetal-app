import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function StoresPreview() {
  const { data: stores } = await supabase
    .from("stores")
    .select("*")
    .order("created_at", { ascending: false });

  if (!stores || stores.length === 0) return null;

  // نحسب عدد المنتجات لكل متجر
  const storesWithCount = await Promise.all(
    stores.map(async (store: any) => {
      let count = 0;

      if (store.products_table) {
        const { count: productCount } = await supabase
          .from(store.products_table)
          .select("*", { count: "exact", head: true });

        count = productCount || 0;
      }

      return { ...store, count };
    })
  );

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* العنوان */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold mb-4">
            المتاجر المتاحة
          </h2>
          <p className="text-gray-500 text-lg">
            تصفح المنتجات من أفضل المنصات بسهولة
          </p>
        </div>

        {/* الكروت */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">

          {storesWithCount.map((store: any) => (
            <div
              key={store.id}
              className="group bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border"
            >
              <Link href={`/store/${store.slug}`}>

                <div className="p-10 text-center">

                  {/* اللوجو */}
                  {store.logo && (
                    <img
                      src={store.logo}
                      alt={store.name}
                      className="h-24 mx-auto object-contain mb-6 group-hover:scale-105 transition"
                    />
                  )}

                  {/* اسم المتجر */}
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-green-600 transition">
                    {store.name}
                  </h3>

                  {/* عدد المنتجات */}
                  <p className="text-gray-500 mb-6">
                    {store.count} منتج متاح
                  </p>

                  {/* زر الدخول */}
                  <div className="inline-block bg-green-600 text-white px-8 py-3 rounded-xl font-semibold group-hover:bg-green-700 transition">
                    دخول المتجر
                  </div>

                </div>

              </Link>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
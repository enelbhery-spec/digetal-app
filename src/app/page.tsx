import Categories from "../components/Categories";
import ProductCard from "../components/ProductCard";
import { createClient } from "@supabase/supabase-js";

export default async function Home() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // ✅ جلب كل المنتجات مباشرة
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
  }

  return (
    <main className="bg-gray-50 text-gray-800">

      {/* Hero */}
      <section className="bg-green-600 text-white py-20 text-center">
        <h1 className="text-4xl font-bold">
          أفضل تخفيضات وخصومات أمازون مصر - نون السعودية
        </h1>
      </section>

      {/* المنتجات */}
      <section className="py-20 max-w-7xl mx-auto px-6">

        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product: any) => (
              <ProductCard
                key={product.id}
                product={{
                  id: product.id,
                  title: product.title ?? "",
                  description: product.description ?? "",
                  image: product.image_url ?? "",
                  category: product.category ?? "",
                  product_url: product.product_url ?? "#",
                  price: product.price,
                  currency: product.currency,
                }}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            لا توجد منتجات حالياً
          </p>
        )}

      </section>

      <Categories />

    </main>
  );
}
import { createClient } from "@supabase/supabase-js";
import ProductCard from "@/components/ProductCard";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function StorePage({ params }: PageProps) {
  const { slug } = await params; // ✅ مهم جداً في Next 15

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .eq("category", slug);

  if (error) {
    console.log(error);
  }

  return (
    <main className="bg-gray-50 text-gray-800 min-h-screen py-20 px-6">
      <h1 className="text-3xl font-bold mb-10 text-center">
        منتجات {slug}
      </h1>

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
                link: product.affiliate_url ?? "#",
                price: product.price,
                old_price: product.old_price,
                rating: product.rating,
                currency: product.currency,
              }}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          لا توجد منتجات في هذا القسم
        </p>
      )}
    </main>
  );
}
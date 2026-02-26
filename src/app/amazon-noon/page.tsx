import { createClient } from "@supabase/supabase-js";

export default async function AmazonNoonPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // ✅ جلب المنتجات مع اسم المتجر
  const { data: products, error } = await supabase
    .from("products")
    .select(`
      id,
      slug,
      price,
      currency,
      stores (
        name,
        slug,
        logo_url
      )
    `)
    .order("id", { ascending: false });

  if (error) {
    console.log(error);
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <h1 className="text-3xl font-bold mb-8 text-center">
        امازون - مصر و نون السعودية
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products?.map((product: any) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-md p-5 hover:shadow-xl transition"
          >
            {/* 🔵 Badge المتجر */}
            <div className="mb-3">
              <span
                className={`text-xs px-3 py-1 rounded-full text-white
                ${
                  product.stores?.slug === "amazon"
                    ? "bg-yellow-500"
                    : "bg-blue-600"
                }`}
              >
                {product.stores?.name}
              </span>
            </div>

            {/* 📝 اسم المنتج */}
            <h2 className="font-semibold mb-3 text-gray-800">
              {product.slug}
            </h2>

            {/* 💰 السعر */}
            <p className="text-green-600 font-bold text-lg">
              {product.price} {product.currency}
            </p>

            {/* 🟢 زر */}
            <button className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
              افتح المتجر
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
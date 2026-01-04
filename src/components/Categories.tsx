import Link from "next/link";
import { products } from "@/data/products";

export default function Categories() {
  // تجميع المنتجات حسب القسم
  const categories = products.reduce<Record<string, typeof products>>(
    (acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = [];
      }
      acc[product.category].push(product);
      return acc;
    },
    {}
  );

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          الأقسام
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Object.entries(categories).map(([categoryName, items]) => (
            <div
              key={categoryName}
              className="bg-gray-50 rounded-2xl p-6 shadow hover:shadow-lg transition"
            >
              {/* عنوان القسم */}
              <h3 className="text-xl font-bold text-green-600 mb-4">
                {categoryName}
              </h3>

              {/* المنتجات */}
              <ul className="space-y-3">
                {items.map((product) => (
                  <li key={product.id}>
                    <Link
                      href={product.link}
                      className="block text-gray-700 hover:text-green-600 font-medium"
                    >
                      → {product.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

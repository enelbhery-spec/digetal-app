import Image from "next/image";
import { products } from "@/data/products";

export default function ProductsPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">

      <h1 className="text-3xl font-extrabold mb-10 text-center">
        المنتجات الرقمية
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow p-6"
          >
            {/* الصورة */}
            <Image
              src={product.image}
              alt={product.title}
              width={200}
              height={200}
              className="rounded-xl mb-4 mx-auto"
            />

            <h3 className="text-xl font-bold mb-2 text-center">
              {product.title}
            </h3>

            <p className="text-gray-600 mb-4 text-center">
              {product.description}
            </p>

            {/* زر الفتح */}
            {product.link && (
              <a
                href={product.link}
                className="block text-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
              >
                افتح المنتج
              </a>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";

export default function HomeProducts() {
  const featured = products.slice(0, 3);

  return (
    <section className="mt-10">
      <div className="grid gap-6 md:grid-cols-3">
        {featured.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-sm border p-4 hover:shadow-md transition"
          >
            <div className="relative h-40 w-full mb-4">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-contain"
              />
            </div>

            <h3 className="font-bold text-lg mb-2 text-gray-800">
              {product.title}
            </h3>

            <p className="text-sm text-gray-600 mb-4">
              {product.description}
            </p>

            <Link
              href={product.slug}
              className="inline-block text-green-600 font-semibold hover:underline"
            >
              عرض المنتج →
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

import Link from "next/link";
import { Product } from "@/data/products";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  return (
    <div className="bg-white rounded-xl border shadow-sm p-6 flex flex-col">
      <h3 className="text-lg font-bold mb-2">{product.title}</h3>

      <p className="text-gray-600 text-sm mb-4 flex-grow">
        {product.description}
      </p>

      <Link
        href={product.link}
        className="bg-green-600 text-white px-4 py-2 rounded-lg text-center hover:bg-green-700 transition"
      >
        افتح المنتج
      </Link>
    </div>
  );
}

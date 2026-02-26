interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  link: string;
  price?: number;
  currency?: string;
}

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">

      {/* صورة المنتج */}
      <div className="h-48 bg-gray-100 flex items-center justify-center">
        {product.image ? (
          <img
            src={product.image}
            alt={product.title}
            className="h-full object-contain"
          />
        ) : (
          <span className="text-gray-400">لا توجد صورة</span>
        )}
      </div>

      <div className="p-4">

        {/* العنوان */}
        <h3 className="font-bold text-lg mb-2 line-clamp-2">
          {product.title}
        </h3>

        {/* الوصف */}
        <p className="text-gray-500 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* السعر */}
        {product.price && (
          <p className="text-green-600 font-bold mb-3">
            {product.price} {product.currency}
          </p>
        )}

        {/* زر الشراء */}
        <a
          href={product.link}
          target="_blank"
          className="block text-center bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
        >
          عرض المنتج
        </a>

      </div>
    </div>
  );
}
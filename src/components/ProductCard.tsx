interface Product {
  id: string;
  title: string;
  description: string;
  image_url: string; // مطابق لاسم العمود في الداتابيز
  category: string;
  product_url: string;
  price?: number;
  old_price?: number;
  rating?: number;
  currency?: string;
}

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">

      {/* صورة المنتج */}
      <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.title}
            className="h-full w-full object-contain p-2"
            loading="lazy"
          />
        ) : (
          <span className="text-gray-400 text-sm">
            لا توجد صورة
          </span>
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
          href={product.product_url}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
        >
          عرض المنتج
        </a>

      </div>
    </div>
  );
}
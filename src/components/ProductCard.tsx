interface Product {
  id: string;
  title: string;
  description: string;
  image_url: string;
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

  // حساب نسبة الخصم
  const discount =
    product.old_price &&
    product.price &&
    product.old_price > product.price
      ? Math.round(
          ((product.old_price - product.price) / product.old_price) * 100
        )
      : null;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 relative">

      {/* Badge الخصم */}
      {discount && (
        <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-lg shadow">
          خصم {discount}%
        </div>
      )}

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
          <div className="mb-3">

            {/* السعر الحالي */}
            <div className="text-green-600 font-bold text-lg">
              {product.price} {product.currency}
            </div>

            {/* السعر القديم */}
            {discount && (
              <div className="flex items-center gap-2 mt-1">
                <span className="line-through text-gray-400 text-sm">
                  {product.old_price} {product.currency}
                </span>
                <span className="text-red-600 text-sm font-semibold">
                  -{discount}%
                </span>
              </div>
            )}

          </div>
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
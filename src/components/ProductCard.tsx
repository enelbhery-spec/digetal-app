"use client"

type Props = {
  product: any
  country: string
}

export default function ProductCard({ product, country }: Props) {

  const price = product.price || 0
  const oldPrice = product.old_price || 0

  const discount =
    oldPrice > price
      ? Math.round(((oldPrice - price) / oldPrice) * 100)
      : 0

  return (

    <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition overflow-hidden border relative">

      {/* عرض مميز */}

      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
        عرض مميز
      </div>

      {/* الخصم */}

      {discount > 0 && (
        <div className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
          خصم {discount}%
        </div>
      )}

      {/* صورة المنتج */}

      <div className="p-6 flex justify-center bg-gray-50 h-52">

        <img
          src={product.image_url}
          alt={product.title}
          className="h-44 object-contain hover:scale-105 transition"
          onError={(e: any) => {
            e.currentTarget.src = "/no-image.png"
          }}
        />

      </div>

      {/* المحتوى */}

      <div className="p-4">

        <h3 className="text-sm font-semibold leading-6 h-12 overflow-hidden">
          {product.title}
        </h3>

        {/* التقييم */}

        <div className="text-yellow-500 text-sm mt-2">
          ⭐⭐⭐⭐☆
          <span className="text-gray-500 text-xs mr-1">(تقييم جيد)</span>
        </div>

        {/* الأسعار */}

        <div className="mt-2 flex items-center gap-2">

          {price > 0 && (
            <span className="text-green-600 font-bold text-lg">
              {price.toLocaleString()} ج.م
            </span>
          )}

          {oldPrice > 0 && (
            <span className="text-gray-400 line-through text-sm">
              {oldPrice.toLocaleString()} ج.م
            </span>
          )}

        </div>

        {/* الأزرار */}

        <div className="mt-4 flex gap-2">

          {/* زر التفاصيل */}

          <a
            href={`/${country}/product/${product.slug}`}
            className="w-1/2 bg-gray-200 text-black text-sm py-3 rounded-lg text-center font-semibold hover:bg-gray-300 transition"
          >
            التفاصيل
          </a>

          {/* زر العرض */}

          <a
            href={product.product_url}
            target="_blank"
            rel="nofollow sponsored"
            className="w-1/2 bg-green-600 text-white text-sm py-3 rounded-lg text-center font-semibold hover:bg-green-700 transition"
          >
            شاهد العرض
          </a>

        </div>

      </div>

    </div>

  )
}
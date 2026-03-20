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

  const saving = oldPrice > price ? oldPrice - price : 0

  const currency = country === "sa" ? "ر.س" : "ج.م"

  return (

    <div className="bg-white rounded-xl shadow-sm hover:shadow-2xl transition overflow-hidden border relative group">

      {/* 🔥 عرض مميز */}
      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded z-10">
        عرض مميز
      </div>

      {/* 💰 نسبة الخصم */}
      {discount > 0 && (
        <div className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded z-10">
          خصم {discount}%
        </div>
      )}

      {/* 🖼️ الصورة */}
      <div className="w-full h-52 bg-gray-100 flex items-center justify-center overflow-hidden">

        <img
          src={product.image_url}
          alt={product.title}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-300"
          onError={(e: any) => {
            e.currentTarget.src = "/no-image.png"
          }}
        />

      </div>

      {/* 📦 المحتوى */}
      <div className="p-4">

        {/* العنوان */}
        <h3 className="text-sm font-semibold leading-6 h-12 overflow-hidden">
          {product.title}
        </h3>

        {/* ⭐ تقييم */}
        <div className="text-yellow-500 text-sm mt-2">
          ⭐⭐⭐⭐☆
          <span className="text-gray-500 text-xs mr-1">(تقييم ممتاز)</span>
        </div>

        {/* 💸 وفر فلوس */}
        {saving > 0 && (
          <div className="text-green-700 text-xs mt-1 font-bold">
            وفرت {saving.toLocaleString()} {currency}
          </div>
        )}

        {/* 💵 السعر */}
        <div className="mt-2 flex items-center gap-2">

          {price > 0 && (
            <span className="text-green-600 font-bold text-lg">
              {price.toLocaleString()} {currency}
            </span>
          )}

          {oldPrice > 0 && (
            <span className="text-gray-400 line-through text-sm">
              {oldPrice.toLocaleString()} {currency}
            </span>
          )}

        </div>

        {/* 🔘 الأزرار */}
        <div className="mt-4 flex gap-2">

          <a
            href={`/${country}/product/${product.slug}`}
            className="w-1/2 bg-gray-200 text-black text-sm py-3 rounded-lg text-center font-semibold hover:bg-gray-300 transition"
          >
            التفاصيل
          </a>

          <a
            href={product.product_url}
            target="_blank"
            rel="nofollow sponsored"
            className="w-1/2 bg-green-600 text-white text-sm py-3 rounded-lg text-center font-semibold hover:bg-green-700 transition"
          >
            شاهد العرض 🔥
          </a>

        </div>

      </div>

    </div>
  )
}
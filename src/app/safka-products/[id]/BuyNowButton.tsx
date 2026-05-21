"use client";

import { useState } from "react";

type Props = {
  productId: string;
  price: number;
};

export default function BuyNowButton({ productId, price }: Props) {
  const [loading, setLoading] = useState(false);

  async function handleBuy() {
    setLoading(true);
    try {
      const response = await fetch("/api/safka/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_name: "عميل تجريبي",
          client_phone1: "01090111151",
          client_address: "القاهرة",
          shipping_governorate: "64878fe6dc16090c1858e698",
          city: "336",
          note: "طلب من موقع اكسترا كود",
          total: price,
          items: [
            {
              qty: "1",
              product: productId,
            },
          ],
        }),
      });

      const data = await response.json();

      console.log("SAFKA ORDER RESPONSE:", data);

      if (data?.success) {
        // إذا أرجعت صفقة رابط دفع، قم بتوجيه المستخدم إليه مباشرة
        if (data?.data?.payment_url) {
          window.location.href = data.data.payment_url;
        } else {
          alert("✅ تم إرسال الطلب بنجاح");
        }
      } else {
        // عرض رسالة الخطأ القادمة من صفقة إذا وجدت
        const errorMessage = data?.errors?.[0]?.msg || "فشل إرسال الطلب، يرجى المحاولة لاحقاً";
        alert(errorMessage);
      }
    } catch (err) {
      console.error("Order Error:", err);
      alert("حدث خطأ تقني أثناء محاولة إرسال الطلب");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleBuy}
      disabled={loading}
      className="w-full bg-slate-950 hover:bg-emerald-600 text-white py-5 rounded-3xl text-center text-lg font-bold flex items-center justify-center transition-all active:scale-95 disabled:opacity-60"
    >
      {loading ? "جارِ إرسال الطلب..." : "شراء المنتج الآن"}
    </button>
  );
}
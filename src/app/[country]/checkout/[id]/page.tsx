"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function CheckoutPage() {
  const params = useParams();

  const productId = String(params?.id || "");

  const [product, setProduct] = useState<any>(null);

  const [shippingData, setShippingData] =
    useState<any[]>([]);

  const [selectedGov, setSelectedGov] =
    useState<any>(null);

  const [selectedCity, setSelectedCity] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [sending, setSending] =
    useState(false);

  // بيانات العميل
  const [clientName, setClientName] =
    useState("");

  const [phone1, setPhone1] =
    useState("");

  const [phone2, setPhone2] =
    useState("");

  const [address, setAddress] =
    useState("");

  const [note, setNote] =
    useState("");

  useEffect(() => {
    loadData();
  }, [productId]);

  async function loadData() {
    try {
      const { data } = await supabase
        .from("safka_products")
        .select(`
          name,
          price,
          sale_price,
          images_urls,
          property_id,
          safka_id
        `)
        .eq("safka_id", productId)
        .single();

      setProduct(data);

      const shippingRes =
        await fetch("/api/shipping");

      const shippingJson =
        await shippingRes.json();

      if (shippingJson?.data) {
        setShippingData(
          shippingJson.data
        );
      }
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <div className="p-10 text-center">
        جاري التحميل...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-10 text-center text-red-500">
        المنتج غير موجود
      </div>
    );
  }

  const image =
    product.images_urls?.[0] ||
    "/no-image.png";

  const productPrice =
    Number(product.sale_price || 0) > 0
      ? Number(product.sale_price)
      : Number(product.price);

  const shippingPrice =
    Number(selectedGov?.price || 0);

  const total =
    productPrice + shippingPrice;

  const cities =
    selectedGov?.cities || [];

  async function submitOrder() {
    if (
      !clientName ||
      !phone1 ||
      !address ||
      !selectedGov ||
      !selectedCity
    ) {
      alert(
        "يرجى استكمال البيانات"
      );
      return;
    }

    try {
      setSending(true);

      const response = await fetch(
        "/api/checkout",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
  client_name: clientName,

  client_phone1: phone1,

  client_phone2: phone2,

  client_address: address,

  shipping_governorate:
    selectedGov._id,

  city:
    Number(selectedCity),

  note,

  total,

  commission: 0,

 

            product_id:
              product.safka_id,

            property_id:
              product.property_id,

            qty: 1,
          }),
        }
      );

      const data =
        await response.json();

      console.log(data);

      if (data?.success) {
        alert(
          "✅ تم إرسال الطلب بنجاح"
        );
      } else {
        alert(
          data?.message ||
            "فشل إرسال الطلب"
        );
      }
    } catch (err) {
      console.log(err);

      alert(
        "حدث خطأ أثناء إرسال الطلب"
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 py-10">

      <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 shadow-sm">

        <h1 className="text-3xl font-black text-center mb-8">
          إتمام الطلب
        </h1>

        <div className="flex flex-col items-center gap-4 mb-10">

          <img
            src={image}
            alt={product.name}
            className="w-60 h-60 object-contain"
          />

          <h2 className="text-2xl font-bold text-center">
            {product.name}
          </h2>

          <div className="text-3xl font-black text-emerald-600">
            {productPrice} ج.م
          </div>

        </div>

        <div className="space-y-4">

          <input
            type="text"
            placeholder="الاسم بالكامل"
            value={clientName}
            onChange={(e) =>
              setClientName(
                e.target.value
              )
            }
            className="w-full border rounded-xl p-3"
          />

          <input
            type="text"
            placeholder="رقم الهاتف"
            value={phone1}
            onChange={(e) =>
              setPhone1(
                e.target.value
              )
            }
            className="w-full border rounded-xl p-3"
          />

          <input
            type="text"
            placeholder="رقم هاتف بديل"
            value={phone2}
            onChange={(e) =>
              setPhone2(
                e.target.value
              )
            }
            className="w-full border rounded-xl p-3"
          />

          <textarea
            placeholder="العنوان بالتفصيل"
            value={address}
            onChange={(e) =>
              setAddress(
                e.target.value
              )
            }
            className="w-full border rounded-xl p-3"
          />

          <select
            className="w-full border rounded-xl p-3"
            value={selectedGov?._id || ""}
            onChange={(e) => {

              const gov =
                shippingData.find(
                  (item) =>
                    item._id ===
                    e.target.value
                );

              setSelectedGov(gov);

              setSelectedCity("");
            }}
          >
            <option value="">
              اختر المحافظة
            </option>

            {shippingData.map(
              (gov) => (
                <option
                  key={gov._id}
                  value={gov._id}
                >
                  {gov.governorateNameAr}
                  {" - "}
                  {gov.price}
                  ج.م
                </option>
              )
            )}
          </select>

          <select
            value={selectedCity}
            onChange={(e) =>
              setSelectedCity(
                e.target.value
              )
            }
            disabled={!selectedGov}
            className="w-full border rounded-xl p-3"
          >
            <option value="">
              اختر المدينة
            </option>

            {cities.map((city: any) => (
  <option
    key={city.id}
    value={city.id}
  >
    {city.city_name_ar}
  </option>
))}
          </select>

          <textarea
            placeholder="ملاحظات الطلب"
            value={note}
            onChange={(e) =>
              setNote(
                e.target.value
              )
            }
            className="w-full border rounded-xl p-3"
          />

        </div>

        <div className="mt-8 border rounded-2xl p-5 bg-slate-50">

          <div className="flex justify-between mb-3">
            <span>
              سعر المنتج
            </span>

            <span>
              {productPrice} ج.م
            </span>
          </div>

          <div className="flex justify-between mb-3">
            <span>الشحن</span>

            <span>
              {shippingPrice} ج.م
            </span>
          </div>

          <hr />

          <div className="flex justify-between mt-4 text-2xl font-black">
            <span>
              الإجمالي
            </span>

            <span>
              {total} ج.م
            </span>
          </div>

        </div>

        <button
          onClick={submitOrder}
          disabled={sending}
          className="
            w-full
            mt-8
            bg-emerald-600
            hover:bg-emerald-700
            text-white
            py-4
            rounded-2xl
            font-bold
          "
        >
          {sending
            ? "جاري إرسال الطلب..."
            : "تأكيد الطلب"}
        </button>

      </div>

    </main>
  );
}
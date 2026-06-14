"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/store/useCart";

export default function CheckoutPage() {
  const { items, clearCart, removeItem } = useCartStore();
  const [shippingData, setShippingData] = useState<any[]>([]);
  const [selectedGov, setSelectedGov] = useState<any>(null);
  const [selectedCity, setSelectedCity] = useState<any>(null);
  const [formData, setFormData] = useState({ 
    client_name: "", client_phone1: "", client_address: "", note: "" 
  });
  const [sending, setSending] = useState(false);

  // حساب الإجماليات
  const productsTotal = items.reduce((sum, item) => sum + (Number(item.price) * Number(item.quantity || 1)), 0);
  const shippingCost = selectedGov ? Number(selectedGov.price || 0) : 0;
  const grandTotal = productsTotal + shippingCost;

  useEffect(() => {
    fetch("/api/shipping")
      .then(res => res.json())
      .then(json => setShippingData(json.data || []));
  }, []);

  async function submitOrder(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedGov || !selectedCity) return alert("يرجى اختيار المحافظة والمدينة");
    setSending(true);

    const orderPayload = {
      items: items.map(item => ({
        qty: String(item.quantity || 1),
        property: String(item.property_id || ""),
        product: String(item.safka_id)
      })),
      client_name: formData.client_name,
      client_phone1: formData.client_phone1,
      client_phone2: "",
      client_address: formData.client_address,
      page_id: null,
      total: String(grandTotal),
      note: formData.note || "",
      shipping_governorate: String(selectedGov._id),
      city: String(selectedCity.id)
    };

    try {
      const res = await fetch("/api/safka/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });
      const result = await res.json();
      if (res.ok) {
        alert("✅ تم إنشاء الطلب بنجاح!");
        clearCart();
      } else {
        alert("خطأ من صفقة: " + (result.errors?.[0]?.msg || "حدث خطأ"));
      }
    } catch (err: any) {
      alert("خطأ في الاتصال: " + err.message);
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-3xl" dir="rtl">
      <h1 className="text-2xl font-bold mb-6 text-center">إتمام الطلب</h1>
      
      <div className="space-y-4 mb-6">
        {items.map((item, i) => (
          <div key={i} className="flex gap-4 items-center border-b pb-4">
            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
            <div className="flex-1">
              <p className="font-bold">{item.name}</p>
              <p>{Number(item.price).toLocaleString()} ج.م</p>
            </div>
            <button onClick={() => removeItem(item.id, item.property_id)} className="text-red-500 text-sm">حذف</button>
          </div>
        ))}
      </div>

      {/* نموذج إدخال البيانات أولاً */}
      <form onSubmit={submitOrder} className="space-y-4">
        <input className="w-full p-3 border rounded-xl" placeholder="الاسم" required onChange={e => setFormData({...formData, client_name: e.target.value})} />
        <input className="w-full p-3 border rounded-xl" placeholder="الهاتف" required onChange={e => setFormData({...formData, client_phone1: e.target.value})} />
        
        <select className="w-full p-3 border rounded-xl" required onChange={e => {
            const gov = shippingData.find(g => g._id === e.target.value);
            setSelectedGov(gov);
            setSelectedCity(null);
        }}>
          <option value="">اختر المحافظة</option>
          {shippingData.map(g => <option key={g._id} value={g._id}>{g.governorateNameAr}</option>)}
        </select>

        {selectedGov && (
          <select className="w-full p-3 border rounded-xl" required onChange={e => {
            const city = selectedGov.cities.find((c: any) => String(c.id) === e.target.value);
            setSelectedCity(city);
          }}>
            <option value="">اختر المدينة</option>
            {selectedGov.cities.map((c: any) => <option key={c.id} value={c.id}>{c.city_name_ar}</option>)}
          </select>
        )}

        <input className="w-full p-3 border rounded-xl" placeholder="العنوان بالتفصيل" required onChange={e => setFormData({...formData, client_address: e.target.value})} />
        <textarea className="w-full p-3 border rounded-xl" placeholder="ملاحظات" onChange={e => setFormData({...formData, note: e.target.value})} />

        {/* ملخص الأسعار يظهر هنا بعد البيانات وقبل زر التأكيد */}
        <div className="bg-gray-50 p-4 rounded-xl space-y-2 font-bold border border-gray-200">
          <div className="flex justify-between text-gray-600"><span>إجمالي المنتجات:</span><span>{productsTotal.toLocaleString()} ج.م</span></div>
          <div className="flex justify-between text-gray-600"><span>قيمة الشحن:</span><span>{selectedGov ? `${shippingCost.toLocaleString()} ج.م` : "يحدد بعد اختيار المحافظة"}</span></div>
          <div className="flex justify-between border-t pt-2 text-lg text-black"><span>الإجمالي النهائي:</span><span>{grandTotal.toLocaleString()} ج.م</span></div>
        </div>

        <button disabled={sending} className="w-full bg-black text-white p-4 rounded-2xl font-bold">
          {sending ? "جاري الإرسال..." : "تأكيد الطلب"}
        </button>
      </form>
    </main>
  );
}
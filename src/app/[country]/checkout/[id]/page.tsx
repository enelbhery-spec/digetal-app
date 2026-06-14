"use client";

import { useEffect, useState, use } from "react";
import { useCartStore } from "@/store/useCart";

export default function CheckoutPage({ params }: { params: Promise<{ id: string }> }) {
  const { items } = useCartStore();
  const [shippingData, setShippingData] = useState<any[]>([]);
  const [selectedGov, setSelectedGov] = useState<any>(null);
  const [selectedCity, setSelectedCity] = useState<any>(null);
  
  const [formData, setFormData] = useState({ 
    client_name: "", 
    client_phone1: "", 
    client_address: "", 
    note: "" 
  });
  
  const [sending, setSending] = useState(false);

  // التأكد من أن الأسعار أرقام لتجنب NaN
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
      client_name: formData.client_name,
      client_phone1: formData.client_phone1,
      client_address: formData.client_address,
      shipping_governorate: selectedGov._id,
      city: selectedCity.id, // نرسل الـ id الخاص بالمدينة كما في مثال الـ API
      items: items.map(item => ({
        product: item.safka_id,
        property: item.property_id || null,
        qty: String(item.quantity || 1) // الـ API يتوقعها string
      })),
      total: String(grandTotal), // الـ API يتوقعها string
      note: formData.note
    };

    try {
      const res = await fetch("/api/v1/public/orders", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "api-safka-key": process.env.NEXT_PUBLIC_SAFKA_API_KEY || ""
        },
        body: JSON.stringify(orderPayload),
      });

      const result = await res.json();
      if (result.success) {
        alert("✅ تم إنشاء الطلب بنجاح! رقم الطلب: " + result.data.serial_number);
      } else {
        alert("خطأ: " + JSON.stringify(result));
      }
    } catch (err) {
      alert("حدث خطأ أثناء الاتصال بالخادم");
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-3xl">
      <h1 className="text-2xl font-bold mb-6 text-center">إتمام الطلب</h1>
      
      <div className="space-y-4 mb-6">
        {items.map((item, i) => (
          <div key={i} className="flex gap-4 items-center border-b pb-4">
            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
            <div>
              <p className="font-bold">{item.name}</p>
              <p>{Number(item.price).toLocaleString()} ج.م × {item.quantity || 1}</p>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={submitOrder} className="space-y-4">
        <input className="w-full p-3 border rounded-xl" placeholder="الاسم" required onChange={e => setFormData({...formData, client_name: e.target.value})} />
        <input className="w-full p-3 border rounded-xl" placeholder="الهاتف" required onChange={e => setFormData({...formData, client_phone1: e.target.value})} />
        
        <select className="w-full p-3 border rounded-xl" onChange={e => setSelectedGov(shippingData.find(g => g._id === e.target.value))}>
          <option value="">اختر المحافظة</option>
          {shippingData.map(g => <option key={g._id} value={g._id}>{g.governorateNameAr}</option>)}
        </select>

        {selectedGov && (
          <select className="w-full p-3 border rounded-xl" onChange={e => setSelectedCity(selectedGov.cities.find((c: any) => c.id == e.target.value))}>
            <option value="">اختر المدينة</option>
            {selectedGov.cities.map((c: any) => <option key={c.id} value={c.id}>{c.city_name_ar}</option>)}
          </select>
        )}

        <input className="w-full p-3 border rounded-xl" placeholder="العنوان بالتفصيل" required onChange={e => setFormData({...formData, client_address: e.target.value})} />
        <textarea className="w-full p-3 border rounded-xl" placeholder="ملاحظات" onChange={e => setFormData({...formData, note: e.target.value})} />

        <div className="bg-gray-50 p-4 rounded-xl space-y-2 text-sm">
          <div className="flex justify-between"><span>إجمالي المنتجات:</span> <span>{productsTotal.toLocaleString()} ج.م</span></div>
          <div className="flex justify-between text-emerald-600"><span>الشحن:</span> <span>{shippingCost.toLocaleString()} ج.م</span></div>
          <div className="flex justify-between font-bold text-lg border-t pt-2"><span>الإجمالي:</span> <span>{grandTotal.toLocaleString()} ج.م</span></div>
        </div>

        <button disabled={sending} className="w-full bg-black text-white p-4 rounded-2xl font-bold">
          {sending ? "جاري الإرسال..." : "تأكيد الطلب"}
        </button>
      </form>
    </main>
  );
}
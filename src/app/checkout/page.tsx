"use client";
import { useState } from "react";

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const orderData = {
      customer_name: formData.get("name"),
      phone: formData.get("phone"),
      address: formData.get("address"),
      // أضف هنا بيانات المنتجات من السلة الخاصة بك
    };

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const result = await res.json();
      if (res.ok) {
        alert("تم إرسال الطلب لصفقة بنجاح!");
      } else {
        alert("حدث خطأ: " + result.message);
      }
    } catch (error) {
      alert("فشل الاتصال بالسيرفر");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "50px", maxWidth: "500px", margin: "auto" }}>
      <h1>إتمام الطلب</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="الاسم الكريم" required style={{ display: "block", width: "100%", margin: "10px 0" }} />
        <input name="phone" placeholder="رقم الهاتف" required style={{ display: "block", width: "100%", margin: "10px 0" }} />
        <input name="address" placeholder="العنوان" required style={{ display: "block", width: "100%", margin: "10px 0" }} />
        <button type="submit" disabled={loading}>
          {loading ? "جاري الإرسال..." : "تأكيد الطلب"}
        </button>
      </form>
    </div>
  );
}
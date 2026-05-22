export async function sendOrderToSafka(orderData: any) {
  const API_SAFKA_KEY = process.env.API_SAFKA_KEY;

  const response = await fetch("https://api.safka-eg.com/v1/orders", { // تأكد من الرابط الصحيح في docs
    method: "POST",
    headers: {
      "api-safka-key": API_SAFKA_KEY || "",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "حدث خطأ أثناء إرسال الطلب");
  }

  return response.json();
}
export async function sendOrderToSafka(orderData: any) {

  try {

    const response = await fetch(
      "https://public-api.safka-eg.com/api/v1/public/orders/",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "api-safka-key": process.env.API_SAFKA_KEY || "",
        },

        body: JSON.stringify(orderData),
      }
    );

    const data = await response.json();

    console.log("SAFKA RESPONSE:", data);

    if (!response.ok) {

      throw new Error(
        data?.message ||
        "فشل إرسال الطلب إلى صفقة"
      );
    }

    return data;

  } catch (error: any) {

    console.error("SAFKA ERROR:", error);

    throw new Error(
      error.message ||
      "حدث خطأ أثناء الاتصال بصفقة"
    );
  }
}
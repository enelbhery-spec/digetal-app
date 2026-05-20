"use client";

import { useParams } from "next/navigation";

export default function CheckoutPage() {

  const params = useParams();

  return (
    <div className="p-10 text-5xl font-black">

      صفحة الطلب

      <br />

      Product ID:

      {String(params?.id)}

    </div>
  );
}
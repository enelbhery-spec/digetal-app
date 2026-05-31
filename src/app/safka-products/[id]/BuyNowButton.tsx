"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  productId: string;
  propertyId: string;
  price: number;
};

export default function BuyNowButton({
  productId,
}: Props) {

  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  async function handleBuy() {

    setLoading(true);

    router.push(
      `/checkout/${productId}`
    );

  }

  return (

    <button
      onClick={handleBuy}
      disabled={loading}
      className="
        w-full
        bg-slate-950
        hover:bg-emerald-600
        text-white
        py-5
        rounded-3xl
        text-center
        text-lg
        font-bold
        flex
        items-center
        justify-center
        transition-all
        active:scale-95
        disabled:opacity-60
      "
    >

      {loading
        ? "جارِ التحويل..."
        : "شراء المنتج الآن"}

    </button>

  );

}
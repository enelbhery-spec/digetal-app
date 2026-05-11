"use client";

import { useState } from "react";
import {
  Copy,
  Check,
  TicketPercent,
  ShoppingBag,
} from "lucide-react";

const coupons = [
  {
    code: "HLWAC",
    discount: "خصم 25%",
    desc: "على منتجات مختارة من نون السعودية",
  },

  {
    code: "CYODP",
    discount: "خصم 15%",
    desc: "للطلبات الجديدة",
  },

  {
    code: "OSSQD",
    discount: "خصم 20%",
    desc: "عند الشراء بحد أدنى",
  },
];

export default function NoonCouponsSection() {

  const [copied, setCopied] =
    useState("");

  const handleCopy = (
    code: string
  ) => {

    navigator.clipboard.writeText(
      code
    );

    setCopied(code);

    setTimeout(() => {
      setCopied("");
    }, 2000);
  };

  return (
    <section className="mb-8 rounded-[2rem] border border-orange-100 bg-gradient-to-br from-orange-50 via-white to-yellow-50 p-5 md:p-8 shadow-sm">

      {/* العنوان */}
      <div className="mb-6 text-center">

        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-bold text-orange-600">

          <TicketPercent size={18} />

          كوبونات نون السعودية

        </div>

        <h2 className="text-2xl md:text-4xl font-black text-slate-900 leading-tight">

          وفر أكثر مع أفضل
          أكواد خصم نون 🔥

        </h2>

        <p className="mt-3 text-sm md:text-base text-slate-500">

          أحدث كوبونات نون السعودية
          المحدثة يومياً على إكسترا كود

        </p>

      </div>

      {/* الكوبونات */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {coupons.map((coupon) => (

          <div
            key={coupon.code}
            className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
          >

            <div className="mb-3 flex items-center justify-between">

              <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-extrabold text-green-700">

                {coupon.discount}

              </span>

              <ShoppingBag
                className="text-orange-500"
                size={22}
              />

            </div>

            <h3 className="mb-2 text-2xl font-black tracking-widest text-slate-900">

              {coupon.code}

            </h3>

            <p className="mb-5 text-sm leading-relaxed text-slate-500">

              {coupon.desc}

            </p>

            <button
              onClick={() =>
                handleCopy(coupon.code)
              }
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-orange-500 py-3 text-sm font-bold text-white transition-all hover:bg-orange-600 active:scale-95"
            >

              {copied === coupon.code ? (
                <>
                  <Check size={18} />
                  تم النسخ
                </>
              ) : (
                <>
                  <Copy size={18} />
                  نسخ الكود
                </>
              )}

            </button>

          </div>
        ))}

      </div>

      {/* زر نون */}
      <div className="mt-8 text-center">

        <a
          href="https://www.noon.com/saudi-ar/"
          rel="nofollow sponsored noopener noreferrer"
          
      
          className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-8 py-4 text-sm md:text-base font-black text-white transition-all hover:bg-orange-500"
        >

          <ShoppingBag size={20} />

          تسوق الآن من نون السعودية

        </a>

      </div>

    </section>
  );
}
'use client'; // ضروري جداً لأننا نستخدم useEffect و DOM

import { useEffect } from 'react';

export default function AdComponent() {
  useEffect(() => {
    // التأكد من أن الكود يعمل فقط في جانب العميل (Browser)
    const script = document.createElement('script');
    script.src="https://pl28375236.effectivegatecpm.com/68452107c89d06df62ec5e7bed215ec8/invoke.js";
    script.async = true;
    script.setAttribute('data-cfasync', 'false');

    // البحث عن المكان المخصص لوضع الإعلان
    const container = document.getElementById('container-68452107c89d06df62ec5e7bed215ec8');
    if (container && !container.hasChildNodes()) {
      container.appendChild(script);
    }
  }, []);

// داخل ملف AdComponent.tsx
return (
  <div className="my-10 w-full flex flex-col items-center bg-gray-50 p-4 rounded-xl border border-dashed border-gray-300">
    <span className="text-gray-400 text-[10px] mb-4 uppercase tracking-widest">محتوى إعلاني</span>

    {/* تحديد عرض أقصى للحاوية لكي لا تفرش الصور بعرض الشاشة كله */}
    <div id="container-68452107c89d06df62ec5e7bed215ec8"></div> className="max-w-[350px] overflow-hidden rounded-lg shadow-sm">
      {/* الإعلان سيظهر هنا بداخل مساحة محددة ومنظمة */}
    </div>
  </div>
);
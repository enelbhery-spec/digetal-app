"use client";

import { useState } from "react";
import AppInstallLoader from "@/components/AppInstallLoader";
import DeviceLock from "@/components/DeviceLock";
import AdComponent from "@/components/AdComponent";

/* ================== DATA ================== */
const hotlines = [
  /* ===== البنوك (30) ===== */
    { name: "البنك الأهلي المصري", phone: "19623" },
    { name: "بنك مصر", phone: "19888" },
    { name: "بنك القاهرة", phone: "16990" },
    { name: "البنك التجاري الدولي CIB", phone: "19666" },
    { name: "بنك الإسكندرية", phone: "19033" },
    { name: "بنك فيصل الإسلامي", phone: "19851" },
    { name: "بنك HSBC", phone: "19007" },
    { name: "بنك QNB", phone: "19700" },
    { name: "بنك أبوظبي الإسلامي", phone: "19951" },
    { name: "بنك أبوظبي الأول", phone: "16555" },
    { name: "بنك البركة", phone: "19373" },
    { name: "بنك SAIB", phone: "16668" },
    { name: "بنك قناة السويس", phone: "19093" },
    { name: "كريدي أجريكول", phone: "19191" },
    { name: "الإمارات دبي الوطني", phone: "16664" },
    { name: "البنك العربي الأفريقي", phone: "19555" },
    { name: "بنك التعمير والإسكان", phone: "19995" },
    { name: "بنك ناصر الاجتماعي", phone: "16868" },
    { name: "البنك الزراعي المصري", phone: "19080" },
    { name: "بنك الكويت الوطني", phone: "19336" },
    { name: "بنك المشرق", phone: "19677" },
    { name: "بنك الاستثمار العربي", phone: "16664" },
    { name: "بنك التنمية الصناعية", phone: "16606" },
    { name: "بنك مصر إيران", phone: "19888" },
    { name: "بنك بلوم", phone: "19233" },
    { name: "بنك الاتحاد الوطني", phone: "16777" },
    { name: "بنك ABC", phone: "19123" },
    { name: "بنك عودة", phone: "19222" },
    { name: "البنك المركزي المصري", phone: "16747" },
    { name: "شكاوى البنوك", phone: "16747" },

    /* ===== الاتصالات والدفع (20) ===== */
    { name: "فودافون", phone: "888" },
    { name: "فودافون كاش", phone: "7001" },
    { name: "اورنج", phone: "110" },
    { name: "اورنج كاش", phone: "7115" },
    { name: "اتصالات", phone: "333" },
    { name: "اتصالات كاش", phone: "777" },
    { name: "WE", phone: "111" },
    { name: "انستاباي", phone: "15989" },
    { name: "فوري", phone: "16421" },
    { name: "أمان", phone: "16233" },
    { name: "مصاري", phone: "16994" },
    { name: "Bee", phone: "16818" },
    { name: "خدمات الدفع الإلكتروني", phone: "16421" },
    { name: "الدعم الفني إنترنت", phone: "155" },
    { name: "خدمة العملاء الاتصالات", phone: "155" },
    { name: "شكاوى الاتصالات", phone: "155" },
    { name: "دعم المحافظ الإلكترونية", phone: "7001" },
    { name: "خدمة العملاء فودافون", phone: "888" },
    { name: "خدمة العملاء أورنج", phone: "110" },
    { name: "خدمة العملاء WE", phone: "111" },

    /* ===== الطوارئ (15) ===== */
    { name: "الشرطة", phone: "122" },
    { name: "النجدة", phone: "122" },
    { name: "الإسعاف", phone: "123" },
    { name: "المطافئ", phone: "180" },
    { name: "هيئة الإسعاف", phone: "123" },
    { name: "طوارئ الكهرباء", phone: "121" },
    { name: "طوارئ الغاز", phone: "129" },
    { name: "طوارئ المياه", phone: "125" },
    { name: "المرور", phone: "136" },
    { name: "الكوارث والطوارئ", phone: "114" },
    { name: "وزارة الداخلية", phone: "108" },
    { name: "وزارة الصحة", phone: "105" },
    { name: "الإسعاف الخاص", phone: "16474" },
    { name: "ونش إنقاذ", phone: "01200000000" },
    { name: "الطوارئ البيئية", phone: "19808" },

    /* ===== الخدمات الحكومية (20) ===== */
    { name: "حماية المستهلك", phone: "19588" },
    { name: "التموين", phone: "16528" },
    { name: "الشكاوى الحكومية", phone: "16528" },
    { name: "هيئة البريد المصري", phone: "16789" },
    { name: "وزارة التضامن", phone: "16439" },
    { name: "التأمين الصحي", phone: "19588" },
    { name: "الضرائب", phone: "16395" },
    { name: "الجمارك", phone: "16210" },
    { name: "وزارة التعليم", phone: "19996" },
    { name: "الرقابة الإدارية", phone: "16100" },
    { name: "هيئة المجتمعات العمرانية", phone: "15999" },
    { name: "السكك الحديدية", phone: "15047" },
    { name: "المطار", phone: "16747" },
    { name: "مياه الشرب", phone: "125" },
    { name: "الكهرباء", phone: "121" },
    { name: "الغاز الطبيعي", phone: "129" },
    { name: "المرور الذكي", phone: "136" },
    { name: "خدمة المواطنين", phone: "16528" },
    { name: "الدعم الحكومي", phone: "16528" },
    { name: "الشكاوى العامة", phone: "16528" },

    /* ===== منصات وخدمات (15) ===== */
    { name: "مصر للطيران", phone: "1717" },
    { name: "أوبر", phone: "01202222222" },
    { name: "كريم", phone: "01234567890" },
    { name: "طلبات", phone: "19511" },
    { name: "جاهز", phone: "19515" },
    { name: "نون", phone: "16358" },
    { name: "جوميا", phone: "19586" },
    { name: "أمازون مصر", phone: "08000262966" },
    { name: "سوق دوت كوم", phone: "16232" },
    { name: "خدمة التوصيل", phone: "19511" },
    { name: "خدمة العملاء نون", phone: "16358" },
    { name: "خدمة العملاء جوميا", phone: "19586" },
    { name: "خدمة العملاء أمازون", phone: "08000262966" },
    { name: "خدمة النقل الذكي", phone: "136" },
    { name: "الدعم الفني العام", phone: "155" }

];

/* ================== PAGE ================== */
export default function HotlinePage() {
  const [query, setQuery] = useState("");

  const normalizedQuery = query.replace(/\s+/g, "").toLowerCase();

  const filtered =
    normalizedQuery.length < 2
      ? []
      : hotlines.filter((h) =>
          h.name.replace(/\s+/g, "").toLowerCase().includes(normalizedQuery)
        );

  return (
    <DeviceLock>
      <AppInstallLoader>
        <div className="min-h-screen bg-gray-50 px-4 py-10">
          <div className="max-w-xl mx-auto bg-white rounded-2xl shadow p-6">

            <h1 className="text-2xl font-extrabold mb-4 text-center">
              📞 دليل الخطوط الساخنة
            </h1>

            <p className="text-gray-600 mb-6 text-center text-sm">
              <br />
              يُفضّل إضافته للشاشة الرئيسية لاستخدامه كتطبيق
            </p>

            {/* البحث */}
            <input
              type="text"
              placeholder="اكتب اسم الجهة (بنك – إسعاف – كهرباء...)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full p-3 border rounded-xl mb-4 text-right focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <AdComponent />

            {/* رسائل إرشادية */}
            {query.trim() === "" && (
              <p className="text-center text-gray-400 text-sm">
                🔎 ابدأ بكتابة اسم الجهة
              </p>
            )}

            {query.trim().length === 1 && (
              <p className="text-center text-gray-400 text-sm">
                ✍️ اكتب حرفين على الأقل
              </p>
            )}

            {query.trim().length >= 2 && filtered.length === 0 && (
              <p className="text-center text-red-500 text-sm">
                ❌ لا توجد نتائج
              </p>
            )}

            {/* النتائج */}
            <div className="space-y-3 mt-4">
              {filtered.map((item, index) => (
                <div key={index} className="border rounded-xl p-4 text-center">
                  <h3 className="font-bold mb-1">{item.name}</h3>

                  <p className="text-green-600 font-bold text-lg">
                    {item.phone}
                  </p>

                  <a
                    href={`tel:${item.phone}`}
                    className="block mt-2 bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition"
                  >
                    📞 اتصال مباشر
                  </a>
                </div>
              ))}
            </div>

            <p className="text-xs text-gray-400 mt-8 text-center">
              🔒 هذا المنتج مخصص للاستخدام الشخصي فقط
              <br />
              لا يُسمح بمشاركة الرابط
            </p>

          </div>
        </div>
      </AppInstallLoader>
    </DeviceLock>
  );
}

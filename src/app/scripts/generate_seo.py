from supabase import create_client
import os
from dotenv import load_dotenv

# تحميل env
load_dotenv()

SUPABASE_URL = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_KEY = os.getenv("NEXT_PUBLIC_SUPABASE_ANON_KEY")

# تحقق من القيم
if not SUPABASE_URL or not SUPABASE_KEY:
    raise Exception("❌ تأكد من ملف .env - القيم غير موجودة")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# 🔧 دالة تحويل لأي رقم
def to_float(value):
    try:
        return float(value)
    except:
        return 0

# جلب المنتجات
products = supabase.table("products").select("*").execute().data

for product in products:

    # 🧹 تنظيف البيانات
    title = str(product.get("title", "")).strip()
    country = str(product.get("country", "مصر")).strip()

    price = to_float(product.get("price"))
    old_price = to_float(product.get("old_price"))

    # ✂️ اختصار العنوان
    short_title = title[:55]

    # 💰 حساب الخصم
    discount = 0
    saving = 0

    if old_price > price and old_price > 0:
        discount = round(((old_price - price) / old_price) * 100)
        saving = old_price - price

    # 🧠 توليد Title ذكي
    if discount > 0:
        seo_title = f"{short_title} خصم {discount}% | أفضل سعر"
    else:
        seo_title = f"{short_title} | أفضل سعر اليوم"

    # ✍️ توليد Description احترافي
    if discount > 0:
        seo_description = (
            f"{title} بخصم {discount}% وفر {int(saving)}. "
            f"أفضل سعر في {country} مع عروض حصرية وتحديث يومي. اطلب الآن قبل نفاد الكمية."
        )
    else:
        seo_description = (
            f"{title} بأفضل سعر في {country}. "
            f"اكتشف أحدث العروض والخصومات الحصرية مع تحديث يومي. اطلب الآن قبل انتهاء الكمية."
        )

    # 🚀 تحديث الداتابيز
    supabase.table("products").update({
        "seo_title": seo_title,
        "seo_description": seo_description
    }).eq("id", product["id"]).execute()

    print(f"✔ تم تحديث: {title[:40]}")

print("✅ تم تحديث جميع المنتجات بنجاح")
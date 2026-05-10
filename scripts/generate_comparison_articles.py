import re
import os

from datetime import datetime
from dotenv import load_dotenv
from supabase import create_client


# =========================================================
# تحميل env.local
# =========================================================

BASE_DIR = os.path.dirname(
    os.path.dirname(
        os.path.abspath(__file__)
    )
)

load_dotenv(
    os.path.join(BASE_DIR, ".env.local")
)

SUPABASE_URL = os.getenv(
    "NEXT_PUBLIC_SUPABASE_URL"
)

SUPABASE_KEY = os.getenv(
    "SUPABASE_SERVICE_ROLE_KEY"
)

if not SUPABASE_URL:
    raise Exception("❌ SUPABASE_URL غير موجود")

if not SUPABASE_KEY:
    raise Exception("❌ SUPABASE_KEY غير موجود")


# =========================================================
# الاتصال
# =========================================================

supabase = create_client(
    SUPABASE_URL,
    SUPABASE_KEY
)

print("✅ Supabase Connected")


# =========================================================
# slug
# =========================================================

def slugify(text):

    text = text.lower().strip()

    text = re.sub(
        r"[^\w\s-]",
        "",
        text
    )

    text = re.sub(
        r"\s+",
        "-",
        text
    )

    return re.sub(
        r"-+",
        "-",
        text
    )


# =========================================================
# تنسيق السعر
# =========================================================

def format_price(value):

    try:
        return f"{float(value):,.0f}"
    except:
        return "0"


# =========================================================
# حساب الخصم
# =========================================================

def calc_discount(price, old_price):

    try:

        price = float(price or 0)

        old_price = float(old_price or 0)

        if old_price > price and old_price > 0:

            return round(
                (
                    (old_price - price)
                    / old_price
                ) * 100
            )

        return 0

    except:

        return 0


# =========================================================
# إنشاء المقال
# =========================================================

def generate_markdown(p1, p2):

    p1_price = float(
        p1.get("price") or 0
    )

    p2_price = float(
        p2.get("price") or 0
    )

    p1_rating = float(
        p1.get("rating") or 0
    )

    p2_rating = float(
        p2.get("rating") or 0
    )

    p1_reviews = int(
        p1.get("reviewsCount") or 0
    )

    p2_reviews = int(
        p2.get("reviewsCount") or 0
    )

    p1_discount = calc_discount(
        p1_price,
        p1.get("old_price")
    )

    p2_discount = calc_discount(
        p2_price,
        p2.get("old_price")
    )

    best = (
        p1["title"]
        if p1_rating >= p2_rating
        else p2["title"]
    )

    cheaper = (
        p1["title"]
        if p1_price <= p2_price
        else p2["title"]
    )

    # ✅ تحديد العملة حسب الدولة
    currency = (
        "ر.س"
        if p1.get("code", "").lower() == "sa"
        else "ج.م"
    )

    return f"""
# مقارنة بين {p1["title"]} و {p2["title"]}

## نظرة سريعة

في هذه المقارنة نستعرض الفرق بين المنتجين من حيث السعر والتقييم وعدد المراجعات والقيمة مقابل السعر لمساعدتك في اختيار الأنسب.

---

## مقارنة الأسعار

| المنتج | السعر |
|---|---|
| {p1["title"]} | {format_price(p1_price)} {currency} |
| {p2["title"]} | {format_price(p2_price)} {currency} |

يعتبر {cheaper} الخيار الأرخص بين المنتجين.

---

## مقارنة التقييمات

| المنتج | التقييم |
|---|---|
| {p1["title"]} | ⭐ {p1_rating} |
| {p2["title"]} | ⭐ {p2_rating} |

حصل {best} على تقييمات أفضل من المستخدمين.

---

## عدد المراجعات

| المنتج | عدد المراجعات |
|---|---|
| {p1["title"]} | {format_price(p1_reviews)} |
| {p2["title"]} | {format_price(p2_reviews)} |

كلما زاد عدد المراجعات أصبحت التقييمات أكثر موثوقية.

---

## الخصومات

| المنتج | نسبة الخصم |
|---|---|
| {p1["title"]} | {p1_discount}% |
| {p2["title"]} | {p2_discount}% |

---

## أي المنتجين أفضل؟

بعد تحليل السعر والتقييمات والمراجعات نجد أن:

# 🏆 {best}

هو الأفضل من حيث تجربة المستخدم والتقييم العام.

---

## شراء المنتجات

إذا كنت ترغب في مشاهدة تفاصيل المنتج الأول ومعرفة أحدث سعر متوفر حاليًا يمكنك
[الضغط هنا لعرض المنتج]({p1.get("product_url", "#")}).

أما إذا كنت تريد الاطلاع على مواصفات المنتج الثاني والعروض الحالية الخاصة به يمكنك
[الضغط هنا لعرض المنتج]({p2.get("product_url", "#")}).

---

## الخلاصة

إذا كنت تبحث عن أعلى تقييم وتجربة استخدام أفضل فقد يكون {best} هو الخيار الأنسب.

أما إذا كان السعر هو العامل الأهم بالنسبة لك فإن {cheaper} يقدم قيمة جيدة مقابل التكلفة.
""".strip()


# =========================================================
# جلب المقارنات
# =========================================================

comparisons = (
    supabase
    .table("smart_comparisons")
    .select("*")
    .execute()
).data or []

print(f"✅ عدد المقارنات: {len(comparisons)}")


# =========================================================
# معالجة المقارنات
# =========================================================

for comp in comparisons:

    comparison_id = comp["id"]

    print(f"\n🔄 مقارنة: {comparison_id}")

    # =====================================================
    # جلب المنتجات
    # =====================================================

    products = (
        supabase
        .table("products")
        .select("*")
        .in_(
            "id",
            [
                comp["p1_id"],
                comp["p2_id"]
            ]
        )
        .execute()
    ).data or []

    if len(products) < 2:

        print("❌ منتجات ناقصة")

        continue

    p1 = next(
        (
            p for p in products
            if str(p["id"])
            == str(comp["p1_id"])
        ),
        None
    )

    p2 = next(
        (
            p for p in products
            if str(p["id"])
            == str(comp["p2_id"])
        ),
        None
    )

    if not p1 or not p2:

        print("❌ لم يتم العثور على المنتجين")

        continue

    # =====================================================
    # تحديد الدولة
    # =====================================================

    p1_code = (
        p1.get("code", "eg")
        .lower()
        .strip()
    )

    p2_code = (
        p2.get("code", "eg")
        .lower()
        .strip()
    )

    # =====================================================
    # منع مقارنة منتجات من دول مختلفة
    # =====================================================

    if p1_code != p2_code:

        print("❌ المنتجات من دول مختلفة")

        continue

    code = p1_code

    # =====================================================
    # منع التكرار
    # =====================================================

    exists = (
        supabase
        .table("comparison_articles")
        .select("id")
        .eq(
            "comparison_id",
            comparison_id
        )
        .eq(
            "code",
            code
        )
        .limit(1)
        .execute()
    )

    if exists.data:

        print(f"⏭ موجود بالفعل للدولة: {code}")

        continue

    # =====================================================
    # إنشاء المقال
    # =====================================================

    title = (
        f"مقارنة بين "
        f"{p1['title']} "
        f"و "
        f"{p2['title']}"
    )

    slug = slugify(
        f"{p1['slug']}-vs-{p2['slug']}"
    )

    content = generate_markdown(
        p1,
        p2
    )

    insert_data = {

        "comparison_id":
            comparison_id,

        "p1_id":
            comp["p1_id"],

        "p2_id":
            comp["p2_id"],

        "views":
            0,

        "published":
            True,

        "created_at":
            datetime.utcnow().isoformat(),

        "category_slug":
            comp.get(
                "category_slug"
            ) or "general",

        # ✅ الدولة
        "code":
            code,

        "seo_title":
            f"{title} | الفرق والسعر وأيهما أفضل",

        "seo_description":
            f"تعرف على الفرق بين {p1['title']} و {p2['title']} من حيث السعر والتقييم والمراجعات.",

        "title":
            title,

        "slug":
            slug,

        "excerpt":
            f"مقارنة تفصيلية بين {p1['title']} و {p2['title']} لمعرفة الأفضل من حيث السعر والتقييم.",

        "content":
            content,

        "image":
            p1.get("image_url")
            or p2.get("image_url")
            or "",
    }

    result = (
        supabase
        .table("comparison_articles")
        .insert(insert_data)
        .execute()
    )

    if result.data:

        print(
            f"✅ تم إنشاء: {title} | الدولة: {code}"
        )

    else:

        print(
            f"❌ فشل إنشاء: {title}"
        )

print("\n🎉 تم الانتهاء بنجاح")
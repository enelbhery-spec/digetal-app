import os
from openai import OpenAI
from supabase import create_client
from dotenv import load_dotenv
import re

load_dotenv()

# مفاتيح
OPENAI_KEY = os.getenv("OPENAI_API_KEY")
SUPABASE_URL = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_KEY = os.getenv("NEXT_PUBLIC_SUPABASE_ANON_KEY")

client = OpenAI(api_key=OPENAI_KEY)
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

topics_file = r"C:\articles\topics.txt"


def slugify(text):
    text = text.lower()
    text = re.sub(r"[^\w\s-]", "", text)
    text = re.sub(r"\s+", "-", text)
    return text


with open(topics_file, "r", encoding="utf-8") as f:
    topics = f.readlines()


for topic in topics:

    topic = topic.strip()

    if not topic:
        continue

    slug = slugify(topic)

    # تحقق هل المقال موجود
    existing = supabase.table("articles").select("id").eq("slug", slug).execute()

    if existing.data:
        print("المقال موجود:", topic)
        continue

    print("جاري إنشاء مقال:", topic)

    prompt = f"""
اكتب مقال SEO احترافي باللغة العربية عن:
{topic}

الشروط:
- 900 كلمة
- عناوين فرعية
- نصائح للمستخدم
- خاتمة
- استخدم Markdown
"""

    response = client.chat.completions.create(
        model="gpt-4.1-mini",
        messages=[
            {"role": "user", "content": prompt}
        ]
    )

    content = response.choices[0].message.content

    data = {
        "title": topic,
        "slug": slug,
        "content": content
    }

    supabase.table("articles").insert(data).execute()

    print("تم نشر المقال:", topic)
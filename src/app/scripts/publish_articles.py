import os
import re
from supabase import create_client
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_KEY = os.getenv("NEXT_PUBLIC_SUPABASE_ANON_KEY")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

articles_folder = r"C:\articles"


def generate_slug(text):
    text = text.lower()
    text = re.sub(r"[^\w\s-]", "", text)
    text = re.sub(r"\s+", "-", text)
    return text.strip()


for filename in os.listdir(articles_folder):

    if filename.endswith(".md"):

        filepath = os.path.join(articles_folder, filename)

        with open(filepath, "r", encoding="utf-8") as f:
            lines = f.readlines()

        title = ""
        slug = ""
        content = ""

        for line in lines:

            line_clean = line.strip()

            if line_clean.startswith("title:"):
                title = line_clean.replace("title:", "").strip()

            elif line_clean.startswith("slug:"):
                slug = line_clean.replace("slug:", "").strip()

            else:
                content += line

        # إذا لم يوجد slug نولده من اسم الملف
        if not slug:
            slug = generate_slug(filename.replace(".md", ""))

        # إذا لم يوجد title نستخدم اسم الملف
        if not title:
            title = filename.replace(".md", "")

        data = {
            "title": title,
            "slug": slug,
            "content": content
        }

        existing = supabase.table("articles").select("id").eq("slug", slug).execute()

        try:

            if existing.data:

                supabase.table("articles") \
                    .update(data) \
                    .eq("slug", slug) \
                    .execute()

                print("تم تحديث المقال:", title)

            else:

                supabase.table("articles") \
                    .insert(data) \
                    .execute()

                print("تم نشر المقال:", title)

        except Exception as e:

            print("خطأ أثناء النشر:", e)
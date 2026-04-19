import time
import re
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium_stealth import stealth
from supabase import create_client

# 1. إعدادات Supabase
SUPABASE_URL = "https://addlrxwxjquowcmkyyqg.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkZGxyeHd4anF1b3djbWt5eXFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExODg5MTAsImV4cCI6MjA4Njc2NDkxMH0.Ba5lUtyfN1SUye1kZ-tmOKrs3fFxA993YXSqVOuR4aA"
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

def run_deep_fixer():
    # جلب المنتجات التي صورتها null (التي جمعها الكود الأول)
    response = supabase.table("products").select("id, product_url, category_id").is_("image_url", "null").execute()
    products = response.data

    if not products:
        print("✅ لا توجد منتجات تحتاج لتحديث (الخانات ممتلئة فعلاً).")
        return

    print(f"🔍 جاري العمل على {len(products)} منتج...")

    options = Options()
    options.add_argument("--window-size=1920,1080")
    options.add_argument("--disable-gpu")
    options.add_argument("--no-sandbox")
    
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
    
    stealth(driver,
        languages=["ar-SA", "en-US"],
        vendor="Google Inc.",
        platform="Win32",
        fix_hairline=True,
    )

    try:
        for item in products:
            p_id = item['id']
            p_url = item['product_url']
            
            print(f"🌐 زيارة: {p_url}")
            try:
                driver.get(p_url)
                # زيادة وقت الانتظار لـ 12 ثانية لضمان تحميل السعر الحقيقي في مصر
                time.sleep(12) 

                # جافا سكريبت مطور للبحث عن السعر في أكثر من مكان
                data = driver.execute_script("""
                    let priceElem = document.querySelector('.priceNow') || 
                                    document.querySelector('[data-qa="display-price"]') ||
                                    document.querySelector('.amount');
                                    
                    let titleElem = document.querySelector('h1') || 
                                    document.querySelector('[data-qa="product-name"]');

                    return {
                        title: titleElem ? titleElem.innerText : null,
                        price: priceElem ? priceElem.innerText.replace(/[^0-9.]/g, '') : null,
                        image: document.querySelector('meta[property="og:image"]')?.content,
                        desc: document.querySelector('meta[name="description"]')?.content
                    };
                """)

                if data['price'] and data['title']:
                    real_price = float(data['price'])
                    real_title = data['title'].strip()
                    real_image = data['image']
                    real_desc = data['desc'][:300] if data['desc'] else f"تسوق {real_title} الآن."

                    # تحديث الداتابيز
                    supabase.table("products").update({
                        "title": real_title[:150],
                        "price": real_price,
                        "old_price": real_price,
                        "image_url": real_image,
                        "description": real_desc
                    }).eq("id", p_id).execute()
                    
                    print(f"✅ تم بنجاح: {real_title[:20]}... | السعر: {real_price} SAR")
                else:
                    print("⚠️ لم يتم العثور على البيانات، جرب زيادة الـ sleep أو التأكد من الرابط.")

                time.sleep(3) # راحة بسيطة لتجنب البلوك

            except Exception as e:
                print(f"❌ خطأ في منتج {p_id}: {e}")
                continue

    finally:
        driver.quit()
        print("\n✨ انتهى التحديث العميق للبيانات.")

if __name__ == "__main__":
    run_deep_fixer()
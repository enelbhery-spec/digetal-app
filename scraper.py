import os
import re
import time
import requests
from bs4 import BeautifulSoup
from supabase import create_client
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager

# ==============================
# SUPABASE CONFIG (قراءة من البيئة السحابية)
# ==============================
SUPABASE_URL = os.environ.get("SUPABASE_URL", "https://addlrxwxjquowcmkyyqg.supabase.co")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkZGxyeHd4anF1b3djbWt5eXFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExODg5MTAsImV4cCI6MjA4Njc2NDkxMH0.Ba5lUtyfN1SUye1kZ-tmOKrs3fFxA993YXSqVOuR4aA") # ضع مفتاحك هنا للاختبار المحلي فقط

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# ==============================
# SETTINGS
# ==============================
CATEGORY = "Mobiles"
SEARCH_QUERY = "iphone"
HEADERS = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}

def clean_price(price_text):
    if not price_text: return 0.0
    numbers = re.sub(r"[^\d.]", "", price_text)
    try:
        return float(numbers)
    except:
        return 0.0

# ==============================
# SCRAPE JUMIA
# ==============================
def scrape_jumia():
    print("🔎 جاري فحص جوميا...")
    products = []
    url = f"https://www.jumia.com.eg/catalog/?q={SEARCH_QUERY}"
    
    try:
        response = requests.get(url, headers=HEADERS, timeout=15)
        soup = BeautifulSoup(response.text, "html.parser")
        items = soup.find_all("article", class_="prd")

        for item in items[:25]:
            name = item.find("h3", class_="name")
            price = item.find("div", class_="prc")
            link = item.find("a", href=True)
            image = item.find("img")

            if name and price:
                price_text = price.text.strip()
                p_val = clean_price(price_text)
                img_url = image.get("data-src") or image.get("src") or ""
                
                products.append({
                    "title": name.text.strip(),
                    "category": CATEGORY,
                    "main_value": f"JUMIA: {price_text}",
                    "description": f"موبايل {SEARCH_QUERY} متاح الآن في جوميا مصر",
                    "price_deal": p_val,
                    "affiliate_link": "https://www.jumia.com.eg" + link["href"],
                    "image_url": img_url,
                    "is_active": True
                })
    except Exception as e:
        print(f"❌ خطأ في جوميا: {e}")
    
    return products

# ==============================
# SCRAPE AMAZON
# ==============================
def scrape_amazon():
    print("🔎 جاري فحص أمازون...")
    products = []
    
    chrome_options = Options()
    chrome_options.add_argument("--headless=new") # ضروري للسيرفرات
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--disable-blink-features=AutomationControlled")
    chrome_options.add_argument(f"user-agent={HEADERS['User-Agent']}")

    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)
    driver.implicitly_wait(10)

    try:
        driver.get(f"https://www.amazon.eg/s?k={SEARCH_QUERY}")
        items = driver.find_elements(By.CSS_SELECTOR, "div[data-component-type='s-search-result']")

        for item in items[:25]:
            try:
                name = item.find_element(By.CSS_SELECTOR, "h2").text
                price_whole = item.find_element(By.CSS_SELECTOR, "span.a-price-whole").text
                link = item.find_element(By.CSS_SELECTOR, "a.a-link-normal").get_attribute("href")
                img = item.find_element(By.CSS_SELECTOR, "img.s-image").get_attribute("src")

                p_val = clean_price(price_whole)
                
                products.append({
                    "title": name[:100],
                    "category": CATEGORY,
                    "main_value": f"AMAZON: {price_whole} EGP",
                    "description": f"أفضل سعر لـ {SEARCH_QUERY} على أمازون مصر",
                    "price_deal": p_val,
                    "affiliate_link": link.split("?")[0], # تنظيف الرابط
                    "image_url": img,
                    "is_active": True
                })
            except: continue
    finally:
        driver.quit()
    return products

# ==============================
# MAIN RUNNER
# ==============================
if __name__ == "__main__":
    all_data = []
    all_data.extend(scrape_jumia())
    all_data.extend(scrape_amazon())

    if all_data:
        print(f"✅ تم تجميع {len(all_data)} منتج.")
        
        # إزالة التكرار بناءً على الرابط
        unique_data = {p["affiliate_link"]: p for p in all_data}.values()
        
        try:
            # مسح القديم الخاص بالموبايلات فقط عشان ميمسحش اللابتوب
            supabase.table("universal_search").delete().eq("category", CATEGORY).execute()
            
            # رفع الجديد
            supabase.table("universal_search").insert(list(unique_data)).execute()
            print("🚀 تم التحديث في سوبابيز بنجاح!")
        except Exception as e:
            print(f"❌ فشل الرفع: {e}")
    else:
        print("⚠️ لم يتم العثور على منتجات.")
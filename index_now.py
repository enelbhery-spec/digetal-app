import json
import os
from supabase import create_client
from google.oauth2 import service_account
from googleapiclient.discovery import build

# --- 1. إعدادات Supabase ---
SUPABASE_URL = "https://addlrxwxjquowcmkyyqg.supabase.co"
# تأكد أن المفتاح يبدأ بـ sb_secret مباشرة
SUPABASE_KEY = "sb_secret_bxKT2k33ojAtK671L_2M_A_gROnH7Xf" 
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# --- 2. إعدادات Google Indexing API ---
JSON_KEY_FILE = 'service_account.json'
scopes = ['https://www.googleapis.com/auth/indexing']
credentials = service_account.Credentials.from_service_account_file(JSON_KEY_FILE, scopes=scopes)
indexing_service = build('indexing', 'v3', credentials=credentials)

# اسم الملف الذي سيحفظ الروابط التي تمت أرشفتها بنجاح
LOG_FILE = "indexed_urls.txt"

def load_indexed_urls():
    """قراءة الروابط التي تم إرسالها سابقاً من ملف الذاكرة"""
    if os.path.exists(LOG_FILE):
        with open(LOG_FILE, "r") as f:
            return set(line.strip() for line in f)
    return set()

def save_indexed_url(url):
    """إضافة الرابط الناجح إلى ملف الذاكرة"""
    with open(LOG_FILE, "a") as f:
        f.write(url + "\n")

def get_new_urls():
    """جلب الروابط من Supabase وتصفية الروابط المرسلة سابقاً"""
    urls = []
    indexed_before = load_indexed_urls()
    try:
        # جلب البيانات (استخدمنا country_id كما هو موجود في قاعدتك)
        result = supabase.table('products').select('id, country_id').execute()
        
        if result.data:
            for item in result.data:
                country = item.get('country_id', 'eg')
                product_id = item.get('id')
                
                if product_id:
                    url = f"https://www.extracode.online/{country}/product/{product_id}"
                    # التصفية: إذا لم يكن الرابط في ملف الذاكرة، أضفه للقائمة
                    if url not in indexed_before:
                        urls.append(url)
            
            print(f"✅ وجدنا {len(urls)} رابط جديد لم يُرسل من قبل.")
        else:
            print("⚠️ لا توجد منتجات في قاعدة البيانات حالياً.")
            
    except Exception as e:
        print(f"❌ خطأ في الاتصال بـ Supabase: {e}")
    return urls

def send_to_google(url_list):
    """إرسال الروابط لجوجل مع التوقف الذكي عند انتهاء الكوتا"""
    print(f"🔄 جاري إرسال الروابط (سيتم التوقف تلقائياً عند استنفاد الـ 200 طلب اليومي)...")
    success_count = 0
    
    for index, url in enumerate(url_list, 1):
        body = {'url': url, 'type': 'URL_UPDATED'}
        try:
            indexing_service.urlNotifications().publish(body=body).execute()
            print(f"[{index}] 🚀 نجح الإرسال: {url}")
            
            # حفظ الرابط في الملف فور نجاحه لضمان عدم تكراره غداً
            save_indexed_url(url)
            success_count += 1
            
        except Exception as e:
            if "Quota exceeded" in str(e):
                print(f"\n🛑 توقف السكريبت: وصلت للحد الأقصى المسموح به اليوم من جوجل.")
                print(f"إجمالي ما تم إرساله اليوم بنجاح: {success_count} رابط.")
                print("يرجى إعادة تشغيل السكريبت غداً لإكمال الباقي.")
                break
            else:
                print(f"[{index}] ⚠️ خطأ في الرابط {url}: {e}")

if __name__ == "__main__":
    # 1. جلب الروابط الجديدة فقط
    links_to_send = get_new_urls()
    
    # 2. البدء في الإرسال
    if links_to_send:
        send_to_google(links_to_send)
    else:
        print("🎉 كل الروابط الحالية تمت أرشفتها بنجاح مسبقاً!")
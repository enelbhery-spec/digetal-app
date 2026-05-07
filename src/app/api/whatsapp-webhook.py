import os
import json
import requests
from flask import Flask, request, jsonify
from supabase import create_client, Client

app = Flask(__name__)

# --- 1. الإعدادات وتأمين البيانات ---
# يتم سحب هذه القيم من إعدادات Vercel (Environment Variables) لضمان أمان المفاتيح
FB_VERIFY_TOKEN = "ahmed_shawki_2026"  # الكلمة السرية للتحقق مع Meta
WA_TOKEN = os.environ.get("WHATSAPP_TOKEN") 
PHONE_NUMBER_ID = os.environ.get("PHONE_NUMBER_ID")
SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")

# إعداد اتصال Supabase للوصول إلى قاعدة البيانات
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

@app.route('/api/whatsapp-webhook', methods=['GET', 'POST'])
def webhook():
    # --- 2. مرحلة التحقق (GET) ---
    # هذه الخطوة يطلبها فيسبوك عند الضغط على "تحقق وحفظ" للتأكد من ملكيتك للرابط
    if request.method == 'GET':
        mode = request.args.get('hub.mode')
        token = request.args.get('hub.verify_token')
        challenge = request.args.get('hub.challenge')

        if mode == 'subscribe' and token == FB_VERIFY_TOKEN:
            return challenge, 200
        return 'Forbidden', 403

    # --- 3. مرحلة معالجة الرسائل الواردة (POST) ---
    # يتم تنفيذ هذا الجزء عندما يرسل أي مستخدم رسالة إلى رقم الواتساب الخاص بك
    if request.method == 'POST':
        data = request.get_json()
        
        try:
            # استخراج محتوى الرسالة ورقم هاتف المستخدم
            entry = data.get('entry', [{}])[0]
            changes = entry.get('changes', [{}])[0]
            value = changes.get('value', {})
            messages = value.get('messages', [{}])
            
            if messages:
                message = messages[0]
                user_phone = message.get('from') # رقم الموبايل الذي أرسل الرسالة
                user_text = message.get('text', {}).get('body', '').strip() # الكود الذي كتبه المستخدم

                # البحث في Supabase عن المنتج المطابق لهذا الكود
                # ملاحظة: تأكد أن اسم الجدول 'products' والعمود 'code'
                query = supabase.table("products").select("*").eq("code", user_text).maybe_single().execute()
                product = query.data

                if product:
                    # صياغة الرد في حالة العثور على المنتج
                    response_text = (
                        f"✅ تم العثور على المنتج:\n\n"
                        f"🔗 الرابط: {product['link']}\n"
                        f"💰 السعر: {product['price']} ج.م"
                    )
                else:
                    # الرد في حالة عدم وجود الكود في قاعدة البيانات
                    response_text = "عذراً، هذا الكود غير صحيح أو لم يعد متاحاً حالياً. يرجى التأكد من الكود المكتوب على الإعلان."

                # إرسال الرسالة إلى المستخدم عبر واجهة برمجة تطبيقات واتساب
                send_whatsapp_message(user_phone, response_text)
                
        except Exception as e:
            # تسجيل أي أخطاء تظهر أثناء المعالجة (تظهر في Vercel Logs)
            print(f"Error processing message: {e}")
            
        return jsonify({"status": "success"}), 200

def send_whatsapp_message(to, text):
    """دالة مساعدة لإرسال الرسائل النصية عبر WhatsApp Cloud API"""
    url = f"https://graph.facebook.com/v18.0/{PHONE_NUMBER_ID}/messages"
    headers = {
        "Authorization": f"Bearer {WA_TOKEN}",
        "Content-Type": "application/json"
    }
    payload = {
        "messaging_product": "whatsapp",
        "to": to,
        "type": "text",
        "text": {"body": text}
    }
    # إرسال الطلب لفيسبوك
    response = requests.post(url, json=payload, headers=headers)
    return response.json()

if __name__ == '__main__':
    # للتشغيل المحلي (اختياري)
    app.run(port=5000)
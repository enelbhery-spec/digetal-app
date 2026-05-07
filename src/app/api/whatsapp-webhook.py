import os
import json
import requests
from flask import Flask, request, jsonify
from supabase import create_client, Client

app = Flask(__name__)

# الإعدادات - سيتم سحبها من Environment Variables في Vercel للأمان
FB_VERIFY_TOKEN = "ahmed_shawki_2026" # الكلمة التي كتبتها في لوحة التحكم
WA_TOKEN = os.environ.get("EAF5Q30cZAzwUBRbdU4xpgs3TpjLA7zoN1JGetwhEBhoTkHexlEsEoxAgCHPXHJ7zsjsv6LTMtSRNlh7FZAiPvqo8f5dd9aWpy49J1ZCgvZBdFqEf63KrzVLzIPEW9fEFulV4eQZCQ9Ln0OO2vvTU7UZC4wZBGnYCWZA6GeRZA3DZBKwxaoDRsBsPEvveVy2SO5BPdhLRCXLGb33Py7LcUPJGwp6I736nS3gutJGQ3dYFXeX1VRjTzJOF3rVJSgPQ7oE5moYvMlWssXl2u32t3lWgZDZD") # رمز الوصول الدائم أو المؤقت
PHONE_NUMBER_ID = os.environ.get("1065458009989076")
SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")

# إعداد اتصال Supabase
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

@app.route('/api/whatsapp-webhook', methods=['GET', 'POST'])
def webhook():
    # 1. مرحلة التحقق من فيسبوك (GET)
    if request.method == 'GET':
        mode = request.args.get('hub.mode')
        token = request.args.get('hub.verify_token')
        challenge = request.args.get('hub.challenge')

        if mode == 'subscribe' and token == FB_VERIFY_TOKEN:
            return challenge, 200
        return 'Forbidden', 403

    # 2. مرحلة استقبال ومعالجة الرسائل (POST)
    if request.method == 'POST':
        data = request.get_json()
        
        try:
            # استخراج نص الرسالة ورقم المرسل
            message_obj = data['entry'][0]['changes'][0]['value']['messages'][0]
            user_phone = message_obj['from']
            user_text = message_obj['text']['body'].strip() # كود المنتج المرسل

            # البحث في Supabase عن المنتج باستخدام الكود
            # نفترض أن الجدول اسمه 'products' والعمود اسمه 'code'
            query = supabase.table("products").select("*").eq("code", user_text).maybe_single().execute()
            product = query.data

            if product:
                # إذا وجدنا المنتج، نجهز رسالة الرد
                response_text = f"✅ تم العثور على المنتج:\n\n🔗 الرابط: {product['link']}\n💰 السعر: {product['price']} ج.م"
            else:
                # إذا لم نجد الكود
                response_text = "عذراً، هذا الكود غير صحيح أو انتهى العرض الخاص به. تأكد من الكود مرة أخرى."

            # إرسال الرد عبر WhatsApp Cloud API
            send_whatsapp_message(user_phone, response_text)

        except Exception as e:
            print(f"Error: {e}")
            
        return jsonify({"status": "success"}), 200

def send_whatsapp_message(to, text):
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
    requests.post(url, json=payload, headers=headers)

if __name__ == '__main__':
    app.run(port=5000)
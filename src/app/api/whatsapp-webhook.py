import os
import json
import requests
from flask import Flask, request, jsonify
from supabase import create_client, Client

app = Flask(__name__)

# --- الإعدادات ---
# الكلمة السرية للتحقق (يجب أن تطابق ما كتبته في فيسبوك)
FB_VERIFY_TOKEN = "ahmed_shawki_2026" 

# استبدل هذه القيم بأسماء المتغيرات في Vercel أو ضع القيم مباشرة كنص
WA_TOKEN = os.environ.get("WHATSAPP_TOKEN") 
PHONE_NUMBER_ID = os.environ.get("PHONE_NUMBER_ID")
SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")

# إعداد اتصال Supabase
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

@app.route('/api/whatsapp-webhook', methods=['GET', 'POST'])
def webhook():
    # 1. مرحلة التحقق (GET) - هذا ما يحتاجه فيسبوك الآن
    if request.method == 'GET':
        mode = request.args.get('hub.mode')
        token = request.args.get('hub.verify_token')
        challenge = request.args.get('hub.challenge')

        if mode == 'subscribe' and token == FB_VERIFY_TOKEN:
            return challenge, 200
        return 'Forbidden', 403

    # 2. مرحلة استقبال الرسائل (POST)
    if request.method == 'POST':
        data = request.get_json()
        try:
            # استخراج البيانات
            entry = data.get('entry', [{}])[0]
            changes = entry.get('changes', [{}])[0]
            value = changes.get('value', {})
            messages = value.get('messages', [{}])[0]
            
            if messages:
                user_phone = messages.get('from')
                user_text = messages.get('text', {}).get('body', '').strip()

                # البحث في Supabase
                query = supabase.table("products").select("*").eq("code", user_text).maybe_single().execute()
                product = query.data

                if product:
                    response_text = f"✅ تم العثور على المنتج:\n\n🔗 الرابط: {product['link']}\n💰 السعر: {product['price']} ج.م"
                else:
                    response_text = "عذراً، هذا الكود غير صحيح. تأكد من الكود المكتوب على الصورة."

                send_whatsapp_message(user_phone, response_text)
        except Exception as e:
            print(f"Error processing message: {e}")
            
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
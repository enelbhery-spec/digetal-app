import os
import json
import requests
from flask import Flask, request, jsonify
from supabase import create_client, Client

app = Flask(__name__)

# إعدادات Supabase و WhatsApp من Environment Variables
url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
supabase: Client = create_client(url, key)

WHATSAPP_TOKEN = os.environ.get("WHATSAPP_TOKEN")
PHONE_NUMBER_ID = os.environ.get("PHONE_NUMBER_ID")
VERIFY_TOKEN = os.environ.get("VERIFY_TOKEN")

def send_whatsapp_message(to, text):
    url = f"https://graph.facebook.com/v18.0/{PHONE_NUMBER_ID}/messages"
    headers = {
        "Authorization": f"Bearer {WHATSAPP_TOKEN}",
        "Content-Type": "application/json"
    }
    data = {
        "messaging_product": "whatsapp",
        "to": to,
        "type": "text",
        "text": {"body": text}
    }
    response = requests.post(url, headers=headers, json=data)
    return response.json()

@app.route("/api/whatsapp-webhook", methods=["GET", "POST"])
def webhook():
    if request.method == "GET":
        mode = request.args.get("hub.mode")
        token = request.args.get("hub.verify_token")
        challenge = request.args.get("hub.challenge")
        if mode == "subscribe" and token == VERIFY_TOKEN:
            return challenge, 200
        return "Verification failed", 403

    if request.method == "POST":
        data = request.get_json()
        try:
            if "messages" in data["entry"][0]["changes"][0]["value"]:
                message = data["entry"][0]["changes"][0]["value"]["messages"][0]
                sender_phone = message["from"]
                user_text = message["text"]["body"].strip().upper() # تحويل الكود لحروف كبيرة للبحث

                # 1. قائمة كلمات التحية باللغة العربية والإنجليزية
                greetings = ['HI', 'HELLO', 'سلام', 'اهلا', 'مرحبا', 'ازيك', 'تفعيل', 'بدء']
                
                if any(greet in user_text for greet in greetings):
                    welcome_msg = (
                        "أهلاً بك في إكسترا كود! 🌸\n\n"
                        "للحصول على تفاصيل أي منتج، من فضلك أرسل 'كود المنتج'.\n\n"
                        "مثال: أرسل الرقم 1234 لتصلك التفاصيل والخصم فوراً."
                    )
                    send_whatsapp_message(sender_phone, welcome_msg)
                
                else:
                    # 2. البحث عن الكود في جدول المنتجات (تم تعديل العمود ليكون code)
                    result = supabase.table("products").select("*").eq("code", user_text).execute()
                    
                    if result.data:
                        product = result.data[0]
                        # تنسيق العملة حسب الموجود في الجدول
                        currency = product.get('currency', 'EGP')
                        
                        response_msg = (
                            f"✅ تم العثور على عرض لـ:\n"
                            f"📌 {product['title']}\n\n"
                            f"💰 السعر: {product['price']} {currency}\n"
                            f"🏷️ الكود: {product['code']}\n"
                            f"🔗 رابط الشراء: {product['product_url']}\n\n"
                            f"تسوق ممتع مع إكسترا كود! 🛒"
                        )
                    else:
                        response_msg = "عذراً، لم نتمكن من العثور على عرض لهذا الكود. تأكد من كتابة الكود بشكل صحيح. 🧐"
                    
                    send_whatsapp_message(sender_phone, response_msg)

        except Exception as e:
            print(f"Error: {e}")
        
        return jsonify({"status": "ok"}), 200

if __name__ == "__main__":
    app.run(port=5000)
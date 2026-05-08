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
    """دالة إرسال الرسائل عبر API واتساب"""
    api_url = f"https://graph.facebook.com/v18.0/{PHONE_NUMBER_ID}/messages"
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
    response = requests.post(api_url, headers=headers, json=data)
    print(f"WhatsApp API Response: {response.json()}")
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
                
                if "text" in message:
                    # تحويل رسالة العميل لحروف صغيرة لتطابق eg-1001 و sa-1001
                    user_text = message["text"]["body"].strip().lower()
                    print(f"User Message: {user_text} from {sender_phone}")

                    # 1. قائمة كلمات التحية
                    greetings = ['hi', 'hello', 'سلام', 'اهلا', 'مرحبا', 'ازيك', 'تفعيل', 'بدء']
                    
                    if any(greet in user_text for greet in greetings):
                        welcome_msg = (
                            "أهلاً بك في إكسترا كود! 🌸\n\n"
                            "للحصول على تفاصيل أي منتج، من فضلك أرسل 'كود المنتج' المكتوب في المنشور.\n\n"
                            "مثال: أرسل eg-1001 لتصلك التفاصيل والخصم فوراً."
                        )
                        send_whatsapp_message(sender_phone, welcome_msg)
                    
                    else:
                        # 2. البحث في العمود الجديد (offer_no) بدلاً من (code)
                        print(f"Searching for offer_no: {user_text} in Supabase...")
                        result = supabase.table("products").select("*").eq("offer_no", user_text).execute()
                        
                        if result.data:
                            product = result.data[0]
                            currency = product.get('currency', 'EGP')
                            
                            response_msg = (
                                f"✅ تم العثور على عرض لـ:\n"
                                f"📌 {product['title']}\n\n"
                                f"💰 السعر: {product['price']} {currency}\n"
                                f"🏷️ رقم العرض: {product['offer_no']}\n"
                                f"🔗 رابط الشراء: {product['product_url']}\n\n"
                                f"تسوق ممتع مع إكسترا كود! 🛒"
                            )
                        else:
                            response_msg = (
                                "عذراً، لم نتمكن من العثور على هذا الكود.\n"
                                "تأكد من كتابة الكود كما هو في المنشور (مثلاً: eg-1001)."
                            )
                        
                        send_whatsapp_message(sender_phone, response_msg)

        except Exception as e:
            print(f"CRITICAL ERROR: {str(e)}")
        
        return jsonify({"status": "ok"}), 200

if __name__ == "__main__":
    app.run(port=5000)
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const configFilePath = path.join(__dirname, '..', 'src', 'lib', 'seo-config.json');

async function autoUpdateSEO() {
  try {
    console.log("جارٍ قراءة الملف من:", configFilePath);
    
    if (!fs.existsSync(configFilePath)) {
      throw new Error("الملف غير موجود في المسار: " + configFilePath);
    }

    const currentConfig = JSON.parse(fs.readFileSync(configFilePath, 'utf8'));

    const prompt = `أنت خبير SEO محترف. قم بتحديث ملف JSON هذا ليكون متوافقاً مع أفضل ممارسات البحث في مصر لعام 2026. 
    حافظ على نفس هيكلية الملف تماماً. أضف كلمات مفتاحية تريند وحدّث العناوين بناءً على رواج التجارة الإلكترونية في مصر.
    الملف الحالي: ${JSON.stringify(currentConfig)}.
    أعطني الـ JSON المحدث فقط بدون أي مقدمات أو شرح.`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile", 
      response_format: { type: "json_object" },
    });

    const rawText = chatCompletion.choices[0].message.content;
    const updatedConfig = JSON.parse(rawText);

    // كتابة الملف
    fs.writeFileSync(configFilePath, JSON.stringify(updatedConfig, null, 2));
    console.log("تم تحديث الملف بنجاح باستخدام Groq!");

    // --- التعديل الجديد: طباعة الكلمات المفتاحية المحدثة ---
    if (updatedConfig.keywords) {
      console.log("\n--- الكلمات المفتاحية (Keywords) المضافة/المحدثة ---");
      console.log(Array.isArray(updatedConfig.keywords) ? updatedConfig.keywords.join(", ") : updatedConfig.keywords);
      console.log("------------------------------------------------\n");
    }

    // النشر (Git)
    console.log("جارٍ رفع التعديلات...");
    execSync('git add src/lib/seo-config.json');
    execSync('git commit -m "chore: auto-update SEO metadata via Groq [skip ci]"');
    execSync('git push');
    
    console.log("تم النشر بنجاح!");

  } catch (error) {
    console.error("حدث خطأ أثناء التنفيذ:", error.message);
  }
}

autoUpdateSEO();
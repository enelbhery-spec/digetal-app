import { NextResponse } from 'next/server';
import { chromium } from 'playwright';

export async function POST(request) {
  try {
    // استقبال اسم المنتج من الـ Frontend أو قاعدة البيانات
    const { productName } = await request.json();
    
    // بناء رابط البحث الخاص بأمازون بناءً على اسم المنتج
    const searchUrl = `https://www.amazon.eg/s?k=${encodeURIComponent(productName)}`;

    const browser = await chromium.launch({ 
      headless: true, 
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' 
    });

    const context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'
    });
    
    const page = await context.newPage();
    
    try {
      await page.goto(searchUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
      await page.waitForTimeout(3000); 

      const data = await page.evaluate(() => {
        // نختار أول نتيجة بحث فقط (الأكثر صلة)
        const firstItem = document.querySelector('.s-result-item');
        
        const title = firstItem?.querySelector('h2')?.innerText || "لم يتم العثور على اسم";
        const price = firstItem?.querySelector('.a-price .a-offscreen')?.innerText || "السعر غير متاح";
        
        return { title, price };
      });

      await browser.close();
      return NextResponse.json({ success: true, data });

    } catch (err) {
      await browser.close();
      return NextResponse.json({ error: "فشل في سحب المنتج: " + err.message }, { status: 500 });
    }

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
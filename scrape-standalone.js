const { chromium } = require('playwright');

async function testScrape() {
  console.log("جاري محاولة فتح المتصفح...");
  
  try {
    const browser = await chromium.launch({ 
      headless: false, // جعلناها false لتظهر لك نافذة الكروم وتتأكد أنه يعمل
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' 
    });
    
    const page = await browser.newPage();
    console.log("تم فتح المتصفح بنجاح!");
    
    await page.goto('https://www.google.com');
    console.log("تم الوصول لجوجل!");
    
    await browser.close();
    console.log("تم الإغلاق بنجاح.");
  } catch (err) {
    console.error("حدث خطأ:", err.message);
  }
}

testScrape();
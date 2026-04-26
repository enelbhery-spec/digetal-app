// الاستماع لحدث استلام الإشعار من السيرفر
self.addEventListener("push", (event) => {
  const data = event.data ? event.data.json() : { title: "عرض جديد!", body: "تحقق من أحدث الكوبونات في إكسترا كود" };

  const options = {
    body: data.body,
    icon: "/icon-192x192.png", // تأكد من وجود أيقونة موقعك بهذا المسار
    badge: "/icon-192x192.png",
    data: { url: data.url || "/" }, // الرابط الذي سيفتح عند الضغط
    vibrate: [200, 100, 200], // اهتزاز الموبايل عند الاستلام
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// ماذا يحدث عندما يضغط المستخدم على الإشعار؟
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url) // يفتح التطبيق على صفحة المنتج الجديد
  );
});

self.addEventListener("install", () => {
  console.log("ExtraCode Service Worker Installed");
  self.skipWaiting();
});
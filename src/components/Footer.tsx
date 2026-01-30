export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* About */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">
            Digital Store
          </h3>
          <p className="text-sm leading-relaxed">
            متجر متخصص في  المنتجات الرقمية الجاهزة للاستخدام.
            استخدم التطبيق  فورًا - بكل سهولة وأمان.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">
            روابط سريعة
          </h4>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="/" className="hover:text-white transition">
                الرئيسية
              </a>
            </li>
            <li>
              <a href="/products" className="hover:text-green-600 transition">
                المنتجات
              </a>
            </li>

            <li>
  <a href="/privacy-policy" className="hover:text-white transition">
    سياسة الخصوصية
  </a>
</li>
<li>
  <a href="/terms" className="hover:text-white transition">
    الشروط والأحكام
  </a>
</li>
<li>
  <a href="/how-to-use" className="hover:text-white transition">
    طريقة الاستخدام
  </a>
</li>


            <li>
              <a
                href="https://wa.me/201021732703"
                target="_blank"
                className="hover:text-white transition"
              >
                تواصل عبر واتساب
              </a>
            </li>


          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">
            تواصل معنا
          </h4>
          <p className="text-sm mb-3">
            للدعم أو الاستفسار:
          </p>
          <a
            href="https://wa.me/201234567890?text"
            target="_blank"
            className="inline-block bg-green-600 text-white px-5 py-3 rounded-xl font-bold hover:bg-green-700 transition"
          >
            واتساب مباشر
          </a>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 text-center py-5 text-sm text-gray-400">
        © {new Date().getFullYear()} Digital Store — جميع الحقوق محفوظة
      </div>
    </footer>
  );
}

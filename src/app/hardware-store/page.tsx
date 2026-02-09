import Image from "next/image";
import { products } from "@/lib/products";

export const metadata = {
  title: "متجر الهاردوير",
};

export default function HardwareStorePage(): JSX.Element {
  return (
    <main style={{ padding: 16, background: "#f5f5f5", minHeight: "100vh" }}>
      <header style={{ marginBottom: 16 }}>
        <h1>🛒 متجر الهاردوير</h1>
        <p>اختيارات موثوقة – شراء مباشر من الموقع الرسمي</p>
      </header>

      <div
        style={{
          background: "#e8f5e9",
          padding: 12,
          borderRadius: 8,
          marginBottom: 16,
        }}
      >
        🔒 الشراء يتم من موقع Maximum Hardware الرسمي <br />
        📦 التطبيق وسيط ولا يتدخل في الدفع أو التوصيل
      </div>

      <section style={{ display: "grid", gap: 16 }}>
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              background: "#fff",
              padding: 16,
              borderRadius: 12,
            }}
          >
            <Image
              src={product.image}
              alt={product.name}
              width={300}
              height={200}
              style={{ objectFit: "contain" }}
              priority
            />

            <h3 style={{ marginTop: 12 }}>{product.name}</h3>

            <ul>
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>

            <p style={{ color: "#777" }}>السعر حسب الموقع</p>

            <a
              href="https://maximumhardware.store/samsung-970-evo-plus-1tb-m-2-nvme-v-nand-internal-solid-state-drive-ssd?tracking=4yz6vQ0EwyDAoenU2015Q0TGZW6F33PIlo4hTiVRTZFnBW6QOzR94stOEpjiQsz0"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                textAlign: "center",
                background: "#1976d2",
                color: "#fff",
                padding: 10,
                borderRadius: 8,
                textDecoration: "none",
                marginTop: 10,
              }}
            >
              اشترِ الآن
            </a>

            <p
              style={{
                fontSize: 12,
                textAlign: "center",
                color: "#777",
                marginTop: 6,
              }}
            >
              شراء آمن من الموقع الرسمي
            </p>
          </div>
        ))}
      </section>
    </main>
  );
}

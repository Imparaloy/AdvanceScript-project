import Link from "next/link";

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "#f8fafc",
        padding: "24px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "#fff",
          borderRadius: "16px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          padding: "24px",
          textAlign: "center",
        }}
      >
        <h1 style={{ marginTop: 0 }}>Adv Script Shop</h1>
        <p style={{ color: "#52525b", marginBottom: "20px" }}>
          เลือกหน้าที่ต้องการทดสอบ
        </p>
        <div style={{ display: "grid", gap: "10px" }}>
          <Link href="/cart">ไปหน้าตะกร้าสินค้า</Link>
          <Link href="/confirm">ไปหน้ายืนยันคำสั่งซื้อ</Link>
        </div>
      </div>
    </main>
  );
}

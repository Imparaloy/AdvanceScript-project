"use client";

import { useState } from "react";
import Link from "next/link";
import "./cart.css";

type CartItem = {
  id: number;
  name: string;
  price: number;
  qty: number;
  image: string;
};

const initialItems: CartItem[] = [
  { id: 1, name: "เสื้อยืด Oversize สีขาว", price: 390, qty: 2, image: "👕" },
  { id: 2, name: "กางเกงขายาว Cargo", price: 850, qty: 1, image: "👖" },
  { id: 3, name: "รองเท้า Sneaker สีดำ", price: 1290, qty: 1, image: "👟" },
];

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>(initialItems);

  const updateQty = (id: number, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty + delta } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = subtotal >= 1000 ? 0 : 60;
  const total = subtotal + shipping;

  return (
    <div className="cart-page">
      {/* Header */}
      <header className="cart-header">
        <div className="cart-header-inner">
          <Link href="/" className="cart-back-link">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            กลับหน้าหลัก
          </Link>
          <h1 className="cart-header-title">ตะกร้าสินค้า</h1>
          <span className="cart-header-count">{items.length} รายการ</span>
        </div>
      </header>

      <main className="cart-main">
        {items.length === 0 ? (
          /* Empty state */
          <div className="cart-empty">
            <span className="cart-empty-icon">🛒</span>
            <div>
              <p className="cart-empty-title">ตะกร้าว่างเปล่า</p>
              <p className="cart-empty-desc">เพิ่มสินค้าในตะกร้าเพื่อดำเนินการต่อ</p>
            </div>
            <Link href="/" className="cart-primary-link">
              เลือกซื้อสินค้า
            </Link>
          </div>
        ) : (
          <div className="cart-grid">
            {/* Items list */}
            <div className="cart-items">
              {items.map((item) => (
                <div key={item.id} className="cart-item">
                  {/* Product image */}
                  <div className="cart-item-image">
                    {item.image}
                  </div>

                  {/* Info */}
                  <div className="cart-item-info">
                    <p className="cart-item-name">{item.name}</p>
                    <p className="cart-item-total">
                      ฿{(item.price * item.qty).toLocaleString()}
                    </p>
                    <p className="cart-item-price">฿{item.price.toLocaleString()} / ชิ้น</p>
                  </div>

                  {/* Quantity controls */}
                  <div className="cart-item-actions">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="cart-remove-btn"
                      aria-label="ลบสินค้า"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 6 6 18M6 6l12 12" />
                      </svg>
                    </button>
                    <div className="cart-qty">
                      <button
                        onClick={() => updateQty(item.id, -1)}
                        aria-label="ลด"
                      >
                        −
                      </button>
                      <span>{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.id, 1)}
                        aria-label="เพิ่ม"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order summary */}
            <div className="cart-summary-wrap">
              <div className="cart-summary">
                <h2>สรุปคำสั่งซื้อ</h2>
                <div className="cart-summary-lines">
                  <div className="cart-summary-line">
                    <span>ราคาสินค้า</span>
                    <span>฿{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="cart-summary-line">
                    <span>ค่าจัดส่ง</span>
                    <span className={shipping === 0 ? "cart-free-shipping" : ""}>
                      {shipping === 0 ? "ฟรี" : `฿${shipping}`}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="cart-summary-note">ซื้อครบ ฿1,000 รับฟรีค่าจัดส่ง</p>
                  )}
                </div>
                <div className="cart-summary-total">
                  <span>ยอดรวม</span>
                  <strong>฿{total.toLocaleString()}</strong>
                </div>
                <Link
                  href={{
                    pathname: "/confirm",
                    query: { total: total },
                  }}
                  className="cart-submit-link"
                >
                  ดำเนินการต่อ →
                </Link>
                <Link href="/" className="cart-secondary-link">
                  เลือกซื้อสินค้าต่อ
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

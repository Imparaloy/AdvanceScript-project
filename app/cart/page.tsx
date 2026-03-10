"use client";

import { useState } from "react";
import Link from "next/link";

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
    <div className="min-h-screen bg-zinc-50 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white px-4 py-4 shadow-sm">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-zinc-900"
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
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            กลับหน้าหลัก
          </Link>
          <h1 className="text-lg font-semibold text-zinc-900">
            ตะกร้าสินค้า
          </h1>
          <span className="text-sm text-zinc-500">{items.length} รายการ</span>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8">
        {items.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center gap-6 rounded-2xl bg-white py-24 text-center shadow-sm">
            <span className="text-7xl">🛒</span>
            <div>
              <p className="text-xl font-semibold text-zinc-800">
                ตะกร้าว่างเปล่า
              </p>
              <p className="mt-1 text-sm text-zinc-500">
                เพิ่มสินค้าในตะกร้าเพื่อดำเนินการต่อ
              </p>
            </div>
            <Link
              href="/"
              className="rounded-full bg-zinc-900 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700"
            >
              เลือกซื้อสินค้า
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
            {/* Items list */}
            <div className="flex flex-1 flex-col gap-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                >
                  {/* Product image */}
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-zinc-100 text-4xl">
                    {item.image}
                  </div>

                  {/* Info */}
                  <div className="flex flex-1 flex-col gap-1 min-w-0">
                    <p className="truncate text-sm font-medium text-zinc-900">
                      {item.name}
                    </p>
                    <p className="text-base font-semibold text-zinc-900">
                      ฿{(item.price * item.qty).toLocaleString()}
                    </p>
                    <p className="text-xs text-zinc-400">
                      ฿{item.price.toLocaleString()} / ชิ้น
                    </p>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex shrink-0 flex-col items-end gap-3">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-zinc-300 transition-colors hover:text-red-400"
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
                    <div className="flex items-center gap-2 rounded-full border border-zinc-200 px-1 py-0.5">
                      <button
                        onClick={() => updateQty(item.id, -1)}
                        className="flex h-7 w-7 items-center justify-center rounded-full text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
                        aria-label="ลด"
                      >
                        −
                      </button>
                      <span className="w-6 text-center text-sm font-semibold text-zinc-900">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQty(item.id, 1)}
                        className="flex h-7 w-7 items-center justify-center rounded-full text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
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
            <div className="w-full lg:w-72 shrink-0">
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-base font-semibold text-zinc-900">
                  สรุปคำสั่งซื้อ
                </h2>
                <div className="flex flex-col gap-3 border-b border-zinc-100 pb-4">
                  <div className="flex justify-between text-sm text-zinc-600">
                    <span>ราคาสินค้า</span>
                    <span>฿{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-zinc-600">
                    <span>ค่าจัดส่ง</span>
                    <span className={shipping === 0 ? "text-green-600" : ""}>
                      {shipping === 0 ? "ฟรี" : `฿${shipping}`}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-zinc-400">
                      ซื้อครบ ฿1,000 รับฟรีค่าจัดส่ง
                    </p>
                  )}
                </div>
                <div className="flex justify-between py-4 font-semibold text-zinc-900">
                  <span>ยอดรวม</span>
                  <span className="text-lg">฿{total.toLocaleString()}</span>
                </div>
                <Link
                  href={{
                    pathname: "/confirm",
                    query: { total: total },
                  }}
                  className="block w-full rounded-full bg-zinc-900 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-zinc-700"
                >
                  ดำเนินการต่อ →
                </Link>
                <Link
                  href="/"
                  className="mt-3 block text-center text-xs text-zinc-400 transition-colors hover:text-zinc-600"
                >
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

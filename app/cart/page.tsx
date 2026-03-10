"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { useEffect } from "react";

export default function CartPage() {
  const { items, removeItem, updateQty, subtotal } = useCart();

  const shipping = subtotal >= 1000 ? 0 : 60;
  const total = subtotal + shipping;

  useEffect (() => {
    const storedCart = localStorage.getItem("cart");
  }, []);

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-pink-900 mb-8">🛒 ตะกร้าสินค้า</h1>

        {items.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center shadow-md">
            <span className="text-7xl block mb-6">🧁</span>
            <p className="text-xl font-semibold text-pink-900 mb-2">ตะกร้าว่างเปล่า</p>
            <p className="text-pink-600/60 mb-6">เพิ่มขนมในตะกร้าเพื่อดำเนินการสั่งซื้อ</p>
            <Link
              href="/menu"
              className="inline-block bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 hover:scale-105"
            >
              ไปดูเมนู →
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Items */}
            <div className="flex-1 flex flex-col gap-4">
              {items.map((item) => (
                <div
                  key={item.name}
                  className="bg-white rounded-2xl p-4 shadow-md flex items-center gap-4 hover:shadow-lg transition-shadow"
                >
                  <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-pink-50">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-pink-900 truncate">{item.name}</h3>
                    <p className="text-pink-500 font-semibold">฿{item.price} บาท</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => updateQty(item.name, -1)}
                      className="w-8 h-8 rounded-full border border-pink-200 text-pink-600 hover:bg-pink-50 flex items-center justify-center transition-colors"
                    >
                      −
                    </button>
                    <span className="w-8 text-center font-semibold text-pink-900">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.name, 1)}
                      className="w-8 h-8 rounded-full border border-pink-200 text-pink-600 hover:bg-pink-50 flex items-center justify-center transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <p className="font-bold text-pink-900 w-24 text-right shrink-0">
                    ฿{(item.price * item.qty).toLocaleString()}
                  </p>
                  <button
                    onClick={() => removeItem(item.name)}
                    className="text-pink-300 hover:text-red-500 transition-colors shrink-0"
                    aria-label="ลบ"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="w-full lg:w-80 shrink-0">
              <div className="bg-white rounded-2xl p-6 shadow-md sticky top-24">
                <h2 className="text-lg font-bold text-pink-900 mb-4">สรุปคำสั่งซื้อ</h2>
                <div className="flex flex-col gap-3 border-b border-pink-100 pb-4">
                  <div className="flex justify-between text-sm text-pink-700/70">
                    <span>ราคาสินค้า</span>
                    <span>฿{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-pink-700/70">
                    <span>ค่าจัดส่ง</span>
                    <span className={shipping === 0 ? "text-green-600 font-medium" : ""}>
                      {shipping === 0 ? "ฟรี" : `฿${shipping}`}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-pink-400">ซื้อครบ ฿1,000 ฟรีค่าจัดส่ง</p>
                  )}
                </div>
                <div className="flex justify-between py-4 font-bold text-pink-900">
                  <span>ยอดรวม</span>
                  <span className="text-xl text-pink-500">฿{total.toLocaleString()}</span>
                </div>
                <Link
                  href={{ pathname: "/confirm", query: { total } }}
                  className="block w-full bg-pink-500 hover:bg-pink-600 text-white text-center font-bold py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-lg shadow-pink-300/30"
                >
                  ดำเนินการต่อ →
                </Link>
                <Link
                  href="/menu"
                  className="block text-center text-sm text-pink-400 hover:text-pink-600 mt-3 transition-colors"
                >
                  เลือกซื้อสินค้าต่อ
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

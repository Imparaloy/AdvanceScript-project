"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

type PaymentMethod = "cod" | "credit" | "qr";

function ConfirmContent() {
  const params = useSearchParams();
  const total = Number(params.get("total") ?? 0);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    district: "",
    province: "",
    postcode: "",
  });

  const [payment, setPayment] = useState<PaymentMethod>("cod");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  const validate = () => {
    const e: Partial<typeof form> = {};
    if (!form.name.trim()) e.name = "กรุณากรอกชื่อ-นามสกุล";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "กรุณากรอกอีเมลให้ถูกต้อง";
    if (!form.phone.trim() || !/^\d{9,10}$/.test(form.phone.replace(/-/g, "")))
      e.phone = "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง";
    if (!form.address.trim()) e.address = "กรุณากรอกที่อยู่";
    if (!form.province.trim()) e.province = "กรุณากรอกจังหวัด";
    if (!form.postcode.trim() || !/^\d{5}$/.test(form.postcode))
      e.postcode = "รหัสไปรษณีย์ต้องเป็นตัวเลข 5 หลัก";
    return e;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length > 0) {
      setErrors(e2);
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-zinc-50 px-4 text-center font-sans">
        <div className="w-full max-w-md rounded-2xl bg-white p-10 shadow-sm">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-50 text-5xl">
            ✅
          </div>
          <h2 className="mb-2 text-2xl font-bold text-zinc-900">
            สั่งซื้อสำเร็จ!
          </h2>
          <p className="text-sm text-zinc-500">
            ขอบคุณ <span className="font-medium text-zinc-800">{form.name}</span>{" "}
            สำหรับการสั่งซื้อ
          </p>
          <p className="mt-1 text-sm text-zinc-500">
            เราจะส่งยืนยันไปที่{" "}
            <span className="font-medium text-zinc-800">{form.email}</span>
          </p>

          <div className="my-6 rounded-xl bg-zinc-50 p-4 text-left">
            <div className="flex justify-between text-sm text-zinc-600">
              <span>ยอดชำระ</span>
              <span className="font-semibold text-zinc-900">
                ฿{total.toLocaleString() || "—"}
              </span>
            </div>
            <div className="mt-2 flex justify-between text-sm text-zinc-600">
              <span>วิธีชำระ</span>
              <span className="font-medium text-zinc-800">
                {payment === "cod"
                  ? "เก็บเงินปลายทาง"
                  : payment === "credit"
                  ? "บัตรเครดิต/เดบิต"
                  : "QR Code พร้อมเพย์"}
              </span>
            </div>
          </div>

          <Link
            href="/"
            className="block w-full rounded-full bg-zinc-900 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-zinc-700"
          >
            กลับหน้าหลัก
          </Link>
        </div>
      </div>
    );
  }

  const paymentOptions: { value: PaymentMethod; label: string; icon: string; desc: string }[] = [
    { value: "cod", label: "เก็บเงินปลายทาง", icon: "💵", desc: "ชำระเมื่อได้รับสินค้า" },
    { value: "credit", label: "บัตรเครดิต/เดบิต", icon: "💳", desc: "Visa, Mastercard, JCB" },
    { value: "qr", label: "QR Code พร้อมเพย์", icon: "📲", desc: "สแกนจ่ายผ่านแอปธนาคาร" },
  ];

  const inputClass = (field: keyof typeof form) =>
    `w-full rounded-xl border px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition-colors focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 ${
      errors[field] ? "border-red-400 bg-red-50" : "border-zinc-200 bg-zinc-50"
    }`;

  return (
    <div className="min-h-screen bg-zinc-50 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white px-4 py-4 shadow-sm">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <Link
            href="/cart"
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
            ตะกร้าสินค้า
          </Link>
          <h1 className="text-lg font-semibold text-zinc-900">ยืนยันคำสั่งซื้อ</h1>
          <div className="w-24" />
        </div>
      </header>

      {/* Steps */}
      <div className="border-b border-zinc-100 bg-white px-4 py-3">
        <div className="mx-auto flex max-w-3xl items-center justify-center gap-3 text-xs font-medium">
          <span className="flex items-center gap-1.5 text-zinc-400">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-200 text-[10px] font-bold text-zinc-500">
              1
            </span>
            ตะกร้า
          </span>
          <span className="text-zinc-300">›</span>
          <span className="flex items-center gap-1.5 text-zinc-900">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-900 text-[10px] font-bold text-white">
              2
            </span>
            ยืนยันคำสั่งซื้อ
          </span>
          <span className="text-zinc-300">›</span>
          <span className="flex items-center gap-1.5 text-zinc-400">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-200 text-[10px] font-bold text-zinc-500">
              3
            </span>
            เสร็จสิ้น
          </span>
        </div>
      </div>

      <main className="mx-auto max-w-3xl px-4 py-8">
        <form onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
            {/* Left column */}
            <div className="flex flex-1 flex-col gap-5">
              {/* Shipping info */}
              <section className="rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="mb-5 flex items-center gap-2 text-base font-semibold text-zinc-900">
                  <span className="text-lg">📦</span> ข้อมูลการจัดส่ง
                </h2>
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-zinc-600">
                      ชื่อ-นามสกุล <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="กรอกชื่อ-นามสกุล"
                      className={inputClass("name")}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-zinc-600">
                        อีเมล <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="example@email.com"
                        className={inputClass("email")}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                      )}
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-zinc-600">
                        เบอร์โทรศัพท์ <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="0812345678"
                        className={inputClass("phone")}
                      />
                      {errors.phone && (
                        <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-zinc-600">
                      ที่อยู่ <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      rows={2}
                      placeholder="บ้านเลขที่ ถนน ซอย"
                      className={`${inputClass("address")} resize-none`}
                    />
                    {errors.address && (
                      <p className="mt-1 text-xs text-red-500">{errors.address}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-zinc-600">
                        แขวง/ตำบล
                      </label>
                      <input
                        name="district"
                        value={form.district}
                        onChange={handleChange}
                        placeholder="แขวง/ตำบล"
                        className={inputClass("district")}
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-zinc-600">
                        จังหวัด <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="province"
                        value={form.province}
                        onChange={handleChange}
                        placeholder="จังหวัด"
                        className={inputClass("province")}
                      />
                      {errors.province && (
                        <p className="mt-1 text-xs text-red-500">{errors.province}</p>
                      )}
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-zinc-600">
                        รหัสไปรษณีย์ <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="postcode"
                        value={form.postcode}
                        onChange={handleChange}
                        placeholder="10xxx"
                        maxLength={5}
                        className={inputClass("postcode")}
                      />
                      {errors.postcode && (
                        <p className="mt-1 text-xs text-red-500">{errors.postcode}</p>
                      )}
                    </div>
                  </div>
                </div>
              </section>

              {/* Payment method */}
              <section className="rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="mb-5 flex items-center gap-2 text-base font-semibold text-zinc-900">
                  <span className="text-lg">💳</span> วิธีการชำระเงิน
                </h2>
                <div className="flex flex-col gap-3">
                  {paymentOptions.map((opt) => (
                    <label
                      key={opt.value}
                      className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition-colors ${
                        payment === opt.value
                          ? "border-zinc-900 bg-zinc-50 ring-2 ring-zinc-900/10"
                          : "border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={opt.value}
                        checked={payment === opt.value}
                        onChange={() => setPayment(opt.value)}
                        className="sr-only"
                      />
                      <span className="text-2xl">{opt.icon}</span>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-zinc-900">{opt.label}</p>
                        <p className="text-xs text-zinc-500">{opt.desc}</p>
                      </div>
                      <div
                        className={`h-4 w-4 rounded-full border-2 transition-colors ${
                          payment === opt.value
                            ? "border-zinc-900 bg-zinc-900"
                            : "border-zinc-300"
                        }`}
                      />
                    </label>
                  ))}
                </div>
              </section>
            </div>

            {/* Right column: Summary */}
            <div className="w-full lg:w-72 shrink-0">
              <div className="sticky top-24 rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-base font-semibold text-zinc-900">
                  สรุปคำสั่งซื้อ
                </h2>

                {total > 0 && (
                  <div className="mb-4 space-y-2 border-b border-zinc-100 pb-4">
                    <div className="flex justify-between text-sm text-zinc-600">
                      <span>ราคาสินค้า</span>
                      <span>฿{(total >= 1000 ? total : total - 60).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm text-zinc-600">
                      <span>ค่าจัดส่ง</span>
                      <span className={total >= 1000 ? "text-green-600" : ""}>
                        {total >= 1000 ? "ฟรี" : "฿60"}
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex justify-between py-2 font-semibold text-zinc-900">
                  <span>ยอดรวม</span>
                  <span className="text-xl">
                    {total > 0 ? `฿${total.toLocaleString()}` : "—"}
                  </span>
                </div>

                <div className="mt-4 rounded-xl bg-zinc-50 px-4 py-3 text-xs text-zinc-500">
                  วิธีชำระ:{" "}
                  <span className="font-medium text-zinc-700">
                    {payment === "cod"
                      ? "เก็บเงินปลายทาง"
                      : payment === "credit"
                      ? "บัตรเครดิต/เดบิต"
                      : "QR Code พร้อมเพย์"}
                  </span>
                </div>

                <button
                  type="submit"
                  className="mt-4 w-full rounded-full bg-zinc-900 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-700 active:scale-[0.98]"
                >
                  ยืนยันคำสั่งซื้อ
                </button>
                <Link
                  href="/cart"
                  className="mt-3 block text-center text-xs text-zinc-400 transition-colors hover:text-zinc-600"
                >
                  แก้ไขตะกร้าสินค้า
                </Link>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}

export default function ConfirmPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center text-zinc-400">กำลังโหลด...</div>}>
      <ConfirmContent />
    </Suspense>
  );
}

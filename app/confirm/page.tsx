"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import "./confirm.css";

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
      <div className="confirm-success-wrap">
        <div className="confirm-success-card">
          <div className="confirm-success-icon">
            ✅
          </div>
          <h2>สั่งซื้อสำเร็จ!</h2>
          <p className="confirm-success-text">
            ขอบคุณ <strong>{form.name}</strong>{" "}
            สำหรับการสั่งซื้อ
          </p>
          <p className="confirm-success-text">
            เราจะส่งยืนยันไปที่{" "}
            <strong>{form.email}</strong>
          </p>

          <div className="confirm-success-info">
            <div className="confirm-success-line">
              <span>ยอดชำระ</span>
              <strong>
                ฿{total.toLocaleString() || "—"}
              </strong>
            </div>
            <div className="confirm-success-line">
              <span>วิธีชำระ</span>
              <strong>
                {payment === "cod"
                  ? "เก็บเงินปลายทาง"
                  : payment === "credit"
                  ? "บัตรเครดิต/เดบิต"
                  : "QR Code พร้อมเพย์"}
              </strong>
            </div>
          </div>

          <Link href="/" className="confirm-home-link">
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
    errors[field] ? "confirm-input error" : "confirm-input";

  const textareaClass = (field: keyof typeof form) =>
    errors[field] ? "confirm-textarea error" : "confirm-textarea";

  const paymentLabel =
    payment === "cod"
      ? "เก็บเงินปลายทาง"
      : payment === "credit"
      ? "บัตรเครดิต/เดบิต"
      : "QR Code พร้อมเพย์";

  return (
    <div className="confirm-page">
      {/* Header */}
      <header className="confirm-header">
        <div className="confirm-header-inner">
          <Link href="/cart" className="confirm-back-link">
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
          <h1 className="confirm-header-title">ยืนยันคำสั่งซื้อ</h1>
          <div className="confirm-header-space" />
        </div>
      </header>

      {/* Steps */}
      <div className="confirm-steps">
        <div className="confirm-steps-inner">
          <span className="confirm-step">
            <span className="confirm-step-dot">
              1
            </span>
            ตะกร้า
          </span>
          <span className="confirm-chevron">›</span>
          <span className="confirm-step active">
            <span className="confirm-step-dot">
              2
            </span>
            ยืนยันคำสั่งซื้อ
          </span>
          <span className="confirm-chevron">›</span>
          <span className="confirm-step">
            <span className="confirm-step-dot">
              3
            </span>
            เสร็จสิ้น
          </span>
        </div>
      </div>

      <main className="confirm-main">
        <form onSubmit={handleSubmit} noValidate>
          <div className="confirm-grid">
            {/* Left column */}
            <div className="confirm-left">
              {/* Shipping info */}
              <section className="confirm-card">
                <h2 className="confirm-card-title">
                  <span>📦</span> ข้อมูลการจัดส่ง
                </h2>
                <div className="confirm-fields">
                  <div>
                    <label className="confirm-label">
                      ชื่อ-นามสกุล <span className="confirm-required">*</span>
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="กรอกชื่อ-นามสกุล"
                      className={inputClass("name")}
                    />
                    {errors.name && <p className="confirm-error">{errors.name}</p>}
                  </div>

                  <div className="confirm-row-2">
                    <div>
                      <label className="confirm-label">
                        อีเมล <span className="confirm-required">*</span>
                      </label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="example@email.com"
                        className={inputClass("email")}
                      />
                      {errors.email && <p className="confirm-error">{errors.email}</p>}
                    </div>
                    <div>
                      <label className="confirm-label">
                        เบอร์โทรศัพท์ <span className="confirm-required">*</span>
                      </label>
                      <input
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="0812345678"
                        className={inputClass("phone")}
                      />
                      {errors.phone && <p className="confirm-error">{errors.phone}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="confirm-label">
                      ที่อยู่ <span className="confirm-required">*</span>
                    </label>
                    <textarea
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      rows={2}
                      placeholder="บ้านเลขที่ ถนน ซอย"
                      className={textareaClass("address")}
                    />
                    {errors.address && <p className="confirm-error">{errors.address}</p>}
                  </div>

                  <div className="confirm-row-3">
                    <div>
                      <label className="confirm-label">
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
                      <label className="confirm-label">
                        จังหวัด <span className="confirm-required">*</span>
                      </label>
                      <input
                        name="province"
                        value={form.province}
                        onChange={handleChange}
                        placeholder="จังหวัด"
                        className={inputClass("province")}
                      />
                      {errors.province && <p className="confirm-error">{errors.province}</p>}
                    </div>
                    <div>
                      <label className="confirm-label">
                        รหัสไปรษณีย์ <span className="confirm-required">*</span>
                      </label>
                      <input
                        name="postcode"
                        value={form.postcode}
                        onChange={handleChange}
                        placeholder="10xxx"
                        maxLength={5}
                        className={inputClass("postcode")}
                      />
                      {errors.postcode && <p className="confirm-error">{errors.postcode}</p>}
                    </div>
                  </div>
                </div>
              </section>

              {/* Payment method */}
              <section className="confirm-card">
                <h2 className="confirm-card-title">
                  <span>💳</span> วิธีการชำระเงิน
                </h2>
                <div className="confirm-pay-list">
                  {paymentOptions.map((opt) => (
                    <label
                      key={opt.value}
                      className={`confirm-pay-item ${payment === opt.value ? "active" : ""}`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={opt.value}
                        checked={payment === opt.value}
                        onChange={() => setPayment(opt.value)}
                      />
                      <span className="confirm-pay-icon">{opt.icon}</span>
                      <div className="confirm-pay-meta">
                        <p className="confirm-pay-title">{opt.label}</p>
                        <p className="confirm-pay-desc">{opt.desc}</p>
                      </div>
                      <div className="confirm-pay-check" />
                    </label>
                  ))}
                </div>
              </section>
            </div>

            {/* Right column: Summary */}
            <div className="confirm-right">
              <div className="confirm-summary">
                <h2>สรุปคำสั่งซื้อ</h2>

                {total > 0 && (
                  <div className="confirm-summary-lines">
                    <div className="confirm-summary-line">
                      <span>ราคาสินค้า</span>
                      <span>฿{(total >= 1000 ? total : total - 60).toLocaleString()}</span>
                    </div>
                    <div className="confirm-summary-line">
                      <span>ค่าจัดส่ง</span>
                      <span className={total >= 1000 ? "confirm-green" : ""}>
                        {total >= 1000 ? "ฟรี" : "฿60"}
                      </span>
                    </div>
                  </div>
                )}

                <div className="confirm-total">
                  <span>ยอดรวม</span>
                  <span className="confirm-total-value">
                    {total > 0 ? `฿${total.toLocaleString()}` : "—"}
                  </span>
                </div>

                <div className="confirm-pay-selected">
                  วิธีชำระ: <strong>{paymentLabel}</strong>
                </div>

                <button
                  type="submit"
                  className="confirm-submit"
                >
                  ยืนยันคำสั่งซื้อ
                </button>
                <Link href="/cart" className="confirm-edit-link">
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
    <Suspense fallback={<div className="confirm-loading">กำลังโหลด...</div>}>
      <ConfirmContent />
    </Suspense>
  );
}

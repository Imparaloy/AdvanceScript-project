const Footer = () => {
  return (
    <footer className="bg-pink-900 text-pink-100 py-12 px-4">
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold text-white mb-3">🧁 Sweety Bakery</h3>
          <p className="text-pink-200/70 text-sm">
            ร้านขนมหวานโฮมเมด อบสดใหม่ทุกวัน หวานละมุนส่งตรงถึงมือคุณ
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-3">เวลาเปิดทำการ</h4>
          <p className="text-pink-200/70 text-sm">จันทร์ - เสาร์: 08:00 - 20:00</p>
          <p className="text-pink-200/70 text-sm">อาทิตย์: 09:00 - 18:00</p>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-3">ติดต่อเรา</h4>
          <p className="text-pink-200/70 text-sm">📞 02-xxx-xxxx</p>
          <p className="text-pink-200/70 text-sm">📧 hello@sweetybakery.com</p>
          <p className="text-pink-200/70 text-sm">📍 กรุงเทพมหานคร</p>
        </div>
      </div>
      <div className="max-w-5xl mx-auto mt-8 pt-6 border-t border-pink-700/50 text-center text-pink-300/60 text-sm">
        © 2026 Sweety Bakery. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
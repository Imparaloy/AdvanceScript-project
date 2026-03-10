const features = [
  {
    icon: "🧁",
    title: "โฮมเมดทุกชิ้น",
    description: "เราทำขนมทุกชิ้นด้วยมือ ใส่ใจทุกรายละเอียด",
  },
  {
    icon: "🌿",
    title: "วัตถุดิบคัดสรร",
    description: "เลือกใช้วัตถุดิบคุณภาพดี ปลอดภัย ได้มาตรฐาน",
  },
  {
    icon: "🚚",
    title: "จัดส่งทุกวัน",
    description: "สดใหม่ทุกวัน จัดส่งถึงหน้าบ้านคุณ",
  },
];
const Feature = () => {
    return (
        <>
            <section id="about" className="py-20 px-4">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-pink-900 mb-4">
                        ทำไมต้องเลือกเรา?
                    </h2>
                    <p className="text-center text-pink-600/70 mb-12 text-lg">
                        เราใส่ใจในทุกขั้นตอนการทำขนม
                    </p>

                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((feature) => (
                            <div
                                key={feature.title}
                                className="bg-white rounded-2xl p-8 text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="text-5xl mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-bold text-pink-900 mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-pink-700/60">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}
export default Feature
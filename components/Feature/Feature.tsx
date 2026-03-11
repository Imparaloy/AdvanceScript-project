const features = [
  {
    title: "โฮมเมดทุกชิ้น",
    description: "เราทำขนมทุกชิ้นด้วยมือ ใส่ใจทุกรายละเอียด",
  },
  {
    title: "วัตถุดิบคัดสรร",
    description: "เลือกใช้วัตถุดิบคุณภาพดี ปลอดภัย ได้มาตรฐาน",
  },
  {
    title: "จัดส่งทุกวัน",
    description: "สดใหม่ทุกวัน จัดส่งถึงหน้าบ้านคุณ",
  },
];
const Feature = () => {
    return (
        <>
            <section id="about" className="py-20 px-4">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
                        ทำไมต้องเลือกเรา?
                    </h2>
                    <p className="text-center text-gray-500 mb-12 text-lg">
                        เราใส่ใจในทุกขั้นตอนการทำขนม
                    </p>

                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((feature) => (
                            <div
                                key={feature.title}
                                className="bg-white rounded-2xl p-8 text-center border border-gray-200"
                            >
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-500">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}
export default Feature
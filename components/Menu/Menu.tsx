import CardMenu from "@/components/Card/CardMenu";
import menuItems from "@/data/menu.json";

const Menu = () => {
    return (
        <>

            <section id="menu" className="py-20 px-4 bg-white/50">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-pink-900 mb-4">
                        เมนูยอดนิยม 🍩
                    </h2>
                    <p className="text-center text-pink-600/70 mb-12 text-lg">
                        ขนมโฮมเมดสดใหม่ทุกวัน อร่อยทุกคำ
                    </p>

                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
                        {menuItems.map((item) => (
                            <CardMenu key={item.name} name={item.name} description={item.description} price={item.price} image={item.image} />
                        ))}

                    </div>
                </div>
            </section>
        </>
    )
}
export default Menu
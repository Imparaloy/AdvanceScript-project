import menuItem from "@/data/menu.json";
import CardMenu from "@/components/Card/CardMenu";
import Head from "next/head";
const MenuPage = () => {
    return (
        <div className="min-h-screen py-10 px-20">
            <Head>
                <title>เมนู | Sweety Bakery</title>
                <meta name="description" content="เมนูขนมหวานโฮมเมดจาก Sweety Bakery สดใหม่ทุกวัน" />
            </Head>
            <h1 className="text-3xl font-bold text-center text-pink-900 mb-8">เมนู</h1>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
                {menuItem.map((item) => (
                    <CardMenu
                        key={item.name}
                        name={item.name}
                        description={item.description}
                        price={item.price}
                        image={item.image}
                    />
                ))}
            </div>


        </div>
    )
}
export default MenuPage
import menuItems from "@/data/menu.json";
import { notFound } from "next/navigation";
import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";

interface MenuDetailPageProps {
  params: Promise<{ name: string }>;
}

const MenuDetailPage = async ({ params }: MenuDetailPageProps) => {
  const { name } = await params;
  const decodedName = decodeURIComponent(name);
  const item = menuItems.find((m) => m.name === decodedName);

  if (!item) {
    notFound();
  }

  const otherItems = menuItems.filter((m) => m.name !== item.name);

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm">
          <Link href="/" className="text-pink-400 hover:text-pink-600 transition-colors">
            หน้าแรก
          </Link>
          <span className="mx-2 text-pink-300">/</span>
          <Link href="/menu" className="text-pink-400 hover:text-pink-600 transition-colors">
            เมนู
          </Link>
          <span className="mx-2 text-pink-300">/</span>
          <span className="text-pink-700 font-medium">{item.name}</span>
        </nav>

        {/* Main Detail Card */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-xl">
          <div className="flex flex-col md:flex-row">
            {/* Image */}
            <div className="md:w-1/2 relative group">
              <div className="aspect-square md:aspect-auto md:h-full">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Info */}
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center gap-5">
              <span className="inline-block bg-pink-100 text-pink-600 text-xs font-semibold px-3 py-1 rounded-full w-fit">
                🧁 Homemade
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-pink-900">
                {item.name}
              </h1>
              <p className="text-pink-700/70 text-lg leading-relaxed">
                {item.description}
              </p>

              <div className="border-t border-pink-100 pt-5 mt-2">
                <p className="text-sm text-pink-400 mb-1">ราคา</p>
                <p className="text-4xl font-bold text-pink-500">
                  ฿{item.price}
                  <span className="text-base font-normal text-pink-400 ml-1">บาท</span>
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-2">
                <AddToCartButton
                  name={item.name}
                  price={item.price}
                  image={item.image}
                />
                <Link
                  href="/menu"
                  className="flex-1 text-center border-2 border-pink-300 text-pink-600 hover:bg-pink-50 font-semibold py-3 px-6 rounded-full transition-all duration-300 text-lg"
                >
                  ← กลับไปดูเมนู
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Other Menu Items */}
        {otherItems.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-pink-900 mb-6">
              เมนูอื่นที่น่าสนใจ 🍰
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
              {otherItems.map((other) => (
                <Link
                  key={other.name}
                  href={`/menu/${encodeURIComponent(other.name)}`}
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div className="h-40 overflow-hidden">
                    <img
                      src={other.image}
                      alt={other.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-bold text-pink-900">{other.name}</h3>
                    <p className="text-lg font-bold text-pink-500 mt-1">฿{other.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default MenuDetailPage;

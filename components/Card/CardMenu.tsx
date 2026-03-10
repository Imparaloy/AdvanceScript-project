import Link from "next/link";
interface CardMenuProps {
    name: string,
    description: string,
    price: number,
    image: string,
}
const CardMenu = (props: CardMenuProps) => {
  return (
    <div className="bg-white w-full rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group flex flex-col">
      <div className="relative h-48 overflow-hidden bg-pink-50">
        <img
          src={props.image}
          alt={props.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="p-4 text-center flex-1 flex flex-col gap-1">
        <h3 className="text-lg font-bold text-pink-900">{props.name}</h3>
        <p className="text-sm text-pink-600">{props.description}</p>
        <p className="text-xl font-bold text-pink-500 mt-auto pt-2">฿{props.price} บาท</p>
      </div>
      <div className="px-4 pb-4">
        <Link href={`/menu/${encodeURIComponent(props.name)}`}>
          <button className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300">
            รายละเอียด
          </button>
        </Link>
      </div>
    </div>
  )
}
export default CardMenu
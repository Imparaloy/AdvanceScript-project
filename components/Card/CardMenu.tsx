import Link from "next/link";
interface CardMenuProps {
    name: string,
    description: string,
    price: number,
    image: string,
}
const CardMenu = (props: CardMenuProps) => {
  return (
    <div className="bg-white w-full rounded-2xl overflow-hidden border border-gray-200 flex flex-col">
      <div className="relative h-48 overflow-hidden bg-gray-50">
        <img
          src={props.image}
          alt={props.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 text-center flex-1 flex flex-col gap-1">
        <h3 className="text-lg font-bold text-gray-900">{props.name}</h3>
        <p className="text-sm text-gray-500">{props.description}</p>
        <p className="text-xl font-bold text-gray-900 mt-auto pt-2">฿{props.price} บาท</p>
      </div>
      <div className="px-4 pb-4">
        <Link href={`/menu/${encodeURIComponent(props.name)}`}>
          <button className="w-full bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300 cursor-pointer">
            รายละเอียด
          </button>
        </Link>
      </div>
    </div>
  )
}
export default CardMenu
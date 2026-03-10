import Link from "next/link";
import CartIcon from "@/components/CartIcon";

const navLinks = [
  { name: "หน้าแรก", href: "/" },
  { name: "เมนู", href: "/menu" },
  { name: "เกี่ยวกับเรา", href: "#about" },
];

const Navbar = () => {
  return (

    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/">
          <h1 className="text-2xl font-bold text-pink-700">
            Sweety Bakery
          </h1>
        </Link>
        <ul className="flex space-x-8">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className="text-pink-800/80 hover:text-pink-600 font-medium transition-colors duration-200"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        <CartIcon />
      </div>
    </nav>
  );
};

export default Navbar;
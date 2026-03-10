"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

const CartIcon = () => {
  const { totalItems } = useCart();

  return (
    <Link href="/cart" className="relative">
      <ShoppingCart className="text-pink-800/80 hover:text-pink-600 transition-colors" />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
          {totalItems}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;

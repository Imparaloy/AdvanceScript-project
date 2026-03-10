"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";

interface AddToCartButtonProps {
  name: string;
  price: number;
  image: string;
}

const AddToCartButton = ({ name, price, image }: AddToCartButtonProps) => {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem({ name, price, image });
    setAdded(true);
  };

  return (
    <button
      onClick={handleAdd}
      className='flex-1 border border-pink-400 font-bold py-3 px-6 rounded-full transition-all duration-300 text-lg hover:scale-105 shadow-lg'
    >
      {"สั่งซื้อเลย"}
    </button>
  );
};

export default AddToCartButton;

"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// ── Types ──────────────────────────────────────────────

export type CartItem = {
  name: string;
  price: number;
  image: string;
  qty: number;
};

type NewCartItem = Omit<CartItem, "qty">;

type CartContextType = {
  items: CartItem[];
  addItem: (item: NewCartItem) => void;
  removeItem: (name: string) => void;
  updateQty: (name: string, delta: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
};

// ── Constants ──────────────────────────────────────────

const STORAGE_KEY = "sweety-bakery-cart";

// ── Context & Hook ─────────────────────────────────────

const CartContext = createContext<CartContextType | null>(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};

// ── Helpers ────────────────────────────────────────────

function loadCartFromStorage(): CartItem[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveCartToStorage(items: CartItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

// ── Provider ───────────────────────────────────────────

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(loadCartFromStorage);

  useEffect(() => {
    saveCartToStorage(items);
  }, [items]);

  const addItem = (newItem: NewCartItem) => {
    setItems((prev) => {
      const exists = prev.some((item) => item.name === newItem.name);
      if (exists) {
        return prev.map((item) =>
          item.name === newItem.name ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...newItem, qty: 1 }];
    });
  };

  const removeItem = (name: string) => {
    setItems((prev) => prev.filter((item) => item.name !== name));
  };

  const updateQty = (name: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => (item.name === name ? { ...item, qty: item.qty + delta } : item))
        .filter((item) => item.qty > 0)
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQty, clearCart, totalItems, subtotal }}
    >
      {children}
    </CartContext.Provider>
  );
};

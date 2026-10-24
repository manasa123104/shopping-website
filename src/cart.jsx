import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);
const KEY = "field-bag";

function readBag() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readBag);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(items));
  }, [items]);

  const count = items.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  function add(product, { size, color, qty = 1 }) {
    const key = `${product.id}|${color}|${size}`;
    setItems((prev) => {
      const found = prev.find((item) => item.key === key);
      if (found) {
        return prev.map((item) =>
          item.key === key ? { ...item, qty: Math.min(10, item.qty + qty) } : item
        );
      }
      return [
        ...prev,
        {
          key,
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          size,
          color,
          qty: Math.min(10, qty),
        },
      ];
    });
    setOpen(true);
  }

  function updateQty(key, qty) {
    setItems((prev) => {
      if (qty <= 0) return prev.filter((item) => item.key !== key);
      return prev.map((item) =>
        item.key === key ? { ...item, qty: Math.min(10, qty) } : item
      );
    });
  }

  function remove(key) {
    setItems((prev) => prev.filter((item) => item.key !== key));
  }

  function clear() {
    setItems([]);
  }

  return (
    <CartContext.Provider
      value={{ items, open, setOpen, count, subtotal, add, updateQty, remove, clear }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("useCart must be used within CartProvider");
  return value;
}

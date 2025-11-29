// src/components/CartContext.jsx

import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem("aadhi_cart");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("aadhi_cart", JSON.stringify(cart));
  }, [cart]);

  const addItem = (item) => {
    setCart(prev => {
      const found = prev.find(p => p.name === item.name);
      if (found) {
        return prev.map(p => p.name === item.name ? { ...p, qty: p.qty + item.qty } : p);
      }
      return [...prev, item];
    });
  };

  const updateQty = (name, qty) => {
    setCart(prev => prev.map(p => p.name === name ? { ...p, qty } : p));
  };

  const removeItem = (name) => {
    setCart(prev => prev.filter(p => p.name !== name));
  };

  const clearCart = () => {
    setCart([]);
  };

  const value = { cart, addItem, updateQty, removeItem, clearCart };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

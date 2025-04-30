"use client";

import { useState, useEffect, useCallback } from "react";

export interface CartItem {
  id: string;
  quantity: number;
}

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState<number>(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart) as CartItem[];
        setCartItems(parsedCart);
        setCartCount(parsedCart.reduce((acc, item) => acc + item.quantity, 0));
      } catch (e) {
        console.error("Failed to parse cart data from localStorage");
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    localStorage.setItem("cart", JSON.stringify(cartItems));
    setCartCount(cartItems.reduce((acc, item) => acc + item.quantity, 0));
  }, [cartItems]);

  const addToCart = useCallback((productId: string, quantity: number = 1) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === productId);

      if (existingItem) {
        return prev.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      } else {
        return [...prev, { id: productId, quantity }];
      }
    });
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      return removeFromCart(productId);
    }

    setCartItems((prev) => {
      const item = prev.find((item) => item.id === productId);

      if (!item) {
        return [...prev, { id: productId, quantity }];
      }

      return prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      );
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  return {
    cartItems,
    cartCount,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  };
}

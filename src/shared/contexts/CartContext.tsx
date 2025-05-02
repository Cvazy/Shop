"use client";

import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { useCart, CartItem } from "../hooks";

interface CartContextProps {
  cartItems: CartItem[];
  cartCount: number;
  addToCart: (productId: string, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;

  cartButtonRef: React.RefObject<HTMLButtonElement>;
  triggerCartAnimation: (
    productElement: HTMLElement,
    productImage: string,
  ) => void;
  animationProductElement: HTMLElement | null;
  animationProductImage: string;
  isAnimating: boolean;
  setIsAnimating: (value: boolean) => void;
}

const CartContext = createContext<CartContextProps | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    cartItems,
    cartCount,
    addToCart: addToCartBase,
    updateQuantity: updateQuantityBase,
    removeFromCart: removeFromCartBase,
    clearCart: clearCartBase,
  } = useCart();

  const cartButtonRef = useRef<HTMLButtonElement>(null);
  const [animationProductElement, setAnimationProductElement] =
    useState<HTMLElement | null>(null);
  const [animationProductImage, setAnimationProductImage] =
    useState<string>("");
  const [isAnimating, setIsAnimating] = useState(false);

  const lastAnimationTimeRef = useRef<number>(0);

  const addToCart = useCallback(
    (productId: string, quantity: number = 1) => {
      addToCartBase(productId, quantity);
    },
    [addToCartBase],
  );

  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      updateQuantityBase(productId, quantity);
    },
    [updateQuantityBase],
  );

  const removeFromCart = useCallback(
    (productId: string) => {
      removeFromCartBase(productId);
    },
    [removeFromCartBase],
  );

  const clearCart = useCallback(
    () => {
      clearCartBase();
    },
    [clearCartBase],
  );

  useEffect(() => {
    if (isAnimating && cartButtonRef.current) {
      cartButtonRef.current.classList.add("cart-button-highlight");

      const timer = setTimeout(() => {
        cartButtonRef.current?.classList.remove("cart-button-highlight");
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  const triggerCartAnimation = useCallback(
    (productElement: HTMLElement, productImage: string) => {
      if (!productImage) {
        console.warn("Product image is empty. Animation skipped.");
        return;
      }

      if (!productElement) {
        console.warn("Product element is null. Animation skipped.");
        return;
      }

      if (!cartButtonRef.current) {
        console.warn("Cart button reference is null. Animation skipped.");
        return;
      }

      const now = Date.now();
      if (now - lastAnimationTimeRef.current < 300) {
        console.log("Animation skipped due to rate limiting");
        return;
      }
      lastAnimationTimeRef.current = now;

      setIsAnimating(false);

      requestAnimationFrame(() => {
        setAnimationProductElement(productElement);
        setAnimationProductImage(productImage);
        setIsAnimating(true);
      });
    },
    []
  );

  const contextValue = useMemo(() => ({
    cartItems,
    cartCount,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartButtonRef,
    triggerCartAnimation,
    animationProductElement,
    animationProductImage,
    isAnimating,
    setIsAnimating,
  }), [
    cartItems,
    cartCount,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    triggerCartAnimation,
    animationProductElement,
    animationProductImage,
    isAnimating,
  ]);

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }

  return context;
};

"use client";

import { useCartContext } from "@/shared/contexts/CartContext";
import { CartAnimation } from "../CartAnimation/CartAnimation";
import { useEffect, useState } from "react";

export const CartAnimationWrapper = () => {
  const {
    cartButtonRef,
    animationProductElement,
    animationProductImage,
    isAnimating,
    setIsAnimating,
  } = useCartContext();

  // Храним последние значения для анимации даже после сброса состояния
  const [lastElement, setLastElement] = useState<HTMLElement | null>(null);
  const [lastImage, setLastImage] = useState<string>("");
  
  // Обновляем последние значения при изменении текущих
  useEffect(() => {
    if (isAnimating && animationProductElement) {
      setLastElement(animationProductElement);
    }
    if (isAnimating && animationProductImage) {
      setLastImage(animationProductImage);
    }
  }, [isAnimating, animationProductElement, animationProductImage]);

  // Скрываем анимацию по завершению и для очистки ресурсов
  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 1200); // чуть больше времени, чем длительность анимации
      return () => clearTimeout(timer);
    }
  }, [isAnimating, setIsAnimating]);

  // Не показываем ничего, если нет анимации или нет целевого элемента
  if (!isAnimating || !cartButtonRef.current) {
    return null;
  }

  // Используем последние известные значения или текущие
  const elementToUse = animationProductElement || lastElement;
  const imageToUse = animationProductImage || lastImage;

  // Проверяем, что все необходимые данные для анимации есть
  if (!elementToUse || !imageToUse) {
    return null;
  }

  return (
    <CartAnimation
      startElement={elementToUse}
      targetElement={cartButtonRef.current}
      productImage={imageToUse}
    />
  );
};

export default CartAnimationWrapper; 
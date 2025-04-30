"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { EnumTokens } from "@/shared/services/Auth/auth-token.service";

interface CartAnimationProps {
  startElement: HTMLElement | null;
  targetElement: HTMLElement | null;
  productImage: string;
}

export const CartAnimation = ({
  startElement,
  targetElement,
  productImage,
}: CartAnimationProps) => {
  const [imagePosition, setImagePosition] = useState({ left: 0, top: 0 });
  const [elementSize, setElementSize] = useState({ width: 0, height: 0 });
  const controls = useAnimation();
  const [mounted, setMounted] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Для отладки
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log("Animation product image:", productImage);
    }
  }, [productImage]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Предзагрузка изображения
  useEffect(() => {
    if (!productImage) return;
    
    const img = new window.Image();
    img.onload = () => setImageLoaded(true);
    img.onerror = (e) => {
      console.error("Failed to load image for animation:", e);
      // Всё равно отображаем анимацию даже если картинка не загрузилась
      setImageLoaded(true);
    };
    img.src = productImage;
  }, [productImage]);

  useEffect(() => {
    if (!startElement || !targetElement || animationStarted) return;

    const startRect = startElement.getBoundingClientRect();
    const targetRect = targetElement.getBoundingClientRect();

    // Проверяем, что у нас есть валидные размеры элементов
    if (startRect.width === 0 || targetRect.width === 0) return;

    // Устанавливаем начальную позицию и размер анимации
    setImagePosition({
      left: startRect.left + startRect.width / 2 - 50, // Центрируем картинку
      top: startRect.top + startRect.height / 2 - 50,  // Центрируем картинку
    });

    // Помечаем, что анимация началась, чтобы избежать повторного запуска
    setAnimationStarted(true);

    // Рассчитываем точки для дуги
    const deltaX = targetRect.left - startRect.left + targetRect.width / 2 - 50;
    const deltaY = targetRect.top - startRect.top + targetRect.height / 2 - 50;
    
    // Высота дуги
    const arcHeight = -Math.min(150, Math.abs(deltaY) * 0.5);

    // Запускаем анимацию с небольшой задержкой
    setTimeout(() => {
      // Анимация по дуге - используем keyframes для Y координаты
      controls.start({
        x: deltaX,
        y: [0, arcHeight, deltaY],
        scale: [1, 0.8, 0.1],
        opacity: [1, 1, 0],
        transition: {
          duration: 0.8,
          times: [0, 0.5, 1], // Временные точки для каждого ключевого кадра
          ease: "easeOut"
        }
      });
    }, 10);
  }, [startElement, targetElement, controls, animationStarted]);

  if (!mounted || !startElement || !targetElement) return null;

  return createPortal(
    <motion.div
      initial={{ 
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0
      }}
      animate={controls}
      style={{
        position: "fixed",
        left: imagePosition.left,
        top: imagePosition.top,
        width: 100, // Фиксированный размер для картинки
        height: 100, // Фиксированный размер для картинки
        zIndex: 9999,
        pointerEvents: "none",
        background: "transparent", // Прозрачный фон
        transformOrigin: "center center",
      }}
      onAnimationComplete={() => {}}
    >
      {/* Только изображение товара без фона */}
      {productImage && (
        <motion.img 
          initial={{ scale: 1 }}
          animate={{ rotate: [0, -5, 5, -5, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          src={productImage}
          alt="Product being added to cart"
          style={{ 
            width: "100%",
            height: "100%",
            objectFit: "contain",
            filter: "drop-shadow(0 0 10px rgba(255, 255, 255, 0.3))"
          }}
          onError={(e) => {
            console.error("Image failed to load in animation", e);
            e.currentTarget.style.display = "none";
          }}
        />
      )}
    </motion.div>,
    document.body,
  );
};

export default CartAnimation;

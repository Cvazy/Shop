"use client";

import React, { useEffect, useState, useMemo, Suspense, lazy } from "react";
import ScrollVelocity from "@/components/ScrollVelocity/ScrollVelocity";
import { Switcher } from "@/shared";

// Используем ленивую загрузку для тяжелого компонента Lanyard
const Lanyard = lazy(() => import("@/components/Lanyard/Lanyard"));

// Плейсхолдер для Lanyard при загрузке
const LanyardPlaceholder = () => (
  <div className="w-full h-screen bg-black"></div>
);

export const Footer = () => {
  const [isScrollBlocked, setIsScrollBlocked] = useState<boolean>(false);
  const [isClient, setIsClient] = useState(false);
  const [isInView, setIsInView] = useState(false);

  // Устанавливаем флаг клиентского рендера
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Обработка блокировки прокрутки
  useEffect(() => {
    if (!isClient) return;
    
    const bodyStyle = document.body.style;
    const htmlStyle = document.documentElement.style;
    
    if (isScrollBlocked) {
      // Сохраняем предыдущие значения (на всякий случай)
      const prevBodyOverflow = bodyStyle.overflow;
      const prevHtmlOverflow = htmlStyle.overflow;
      const prevBodyTouchAction = bodyStyle.touchAction;
      const prevHtmlTouchAction = htmlStyle.touchAction;

      bodyStyle.overflow = "hidden";
      htmlStyle.overflow = "hidden"; // Часто нужно для обеих
      bodyStyle.touchAction = "none";
      htmlStyle.touchAction = "none"; // И для html тоже
      
      // Возвращаем стили при разблокировке или размонтировании
      return () => {
        bodyStyle.overflow = prevBodyOverflow; 
        htmlStyle.overflow = prevHtmlOverflow;
        bodyStyle.touchAction = prevBodyTouchAction;
        htmlStyle.touchAction = prevHtmlTouchAction;
      }
    } else {
        // Если не заблокировано, убедимся, что стили сброшены
        // (Это необязательно, если функция очистки выше всегда вызывается)
        bodyStyle.overflow = ""; 
        htmlStyle.overflow = "";
        bodyStyle.touchAction = "";
        htmlStyle.touchAction = "";
    }
  }, [isScrollBlocked, isClient]);

  const handleToggle = () => {
    setIsScrollBlocked(prev => !prev);
  };

  // Используем IntersectionObserver для определения видимости компонента
  useEffect(() => {
    if (!isClient) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );
    
    const footerElement = document.querySelector('footer');
    if (footerElement) {
      observer.observe(footerElement);
    }
    
    return () => {
      if (footerElement) {
        observer.unobserve(footerElement);
      }
    };
  }, [isClient]);

  // Мемоизируем настройки для Lanyard
  const lanyardProps = useMemo(() => ({
    position: [0, 0, 20] as [number, number, number],
    gravity: [0, -40, 0] as [number, number, number]
  }), []);

  return (
    <footer className="min-h-dvh w-full bg-background h-max relative z-10">
      <div className="flex flex-col items-center gap-10 w-full h-full">
        <div className="py-8 w-full md:py-10 xl:py-12">
          <ScrollVelocity
            texts={["AlcoShop"]}
            className="custom-scroll-text text-foreground mr-10"
          />
        </div>
      </div>

      <div className="w-full h-full relative">
        <div className="absolute z-10 top-14 right-2 lg:hidden">
          <div className="flex flex-col items-start gap-2.5">
            <div className="flex items-center gap-2 flex-nowrap">
              <p className="text-foreground font-bold text-lg">
                Block scroll
              </p>

              <Switcher
                initialValue={isScrollBlocked}
                onChange={handleToggle}
              />
            </div>

            <p className="text-gray font-medium text-xs">
              For the clip to work correctly
            </p>
          </div>
        </div>
        
        <div className="w-full h-full grayscale">
          {/* Рендерим Lanyard только на клиенте и только когда компонент виден */}
          {isClient && (
            <Suspense fallback={<LanyardPlaceholder />}>
              {isInView && <Lanyard {...lanyardProps} />}
            </Suspense>
          )}
          {!isClient && <LanyardPlaceholder />}
        </div>
      </div>
    </footer>
  );
};

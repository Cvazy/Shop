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
    
    if (isScrollBlocked) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    }
    
    return () => {
      // Восстанавливаем прокрутку при размонтировании
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
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

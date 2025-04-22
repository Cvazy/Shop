"use client";

import React, { Suspense, useEffect, useState } from "react";

// Импортируем компонент с помощью ленивой загрузки
const MainBanner = React.lazy(() =>
  import("@/widgets").then((module) => ({
    default: module.MainBanner,
  })),
);

// Компонент-плейсхолдер для загрузки
const BannerPlaceholder = () => (
  <div className="w-full h-screen bg-black flex items-center justify-center"></div>
);

export default function ClientHome() {
  const [isMounted, setIsMounted] = useState(false);

  // SSR-совместимая загрузка
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <BannerPlaceholder />;
  }

  return (
    <div className={"w-full h-full"}>
      <Suspense fallback={<BannerPlaceholder />}>
        <MainBanner />
      </Suspense>
    </div>
  );
}

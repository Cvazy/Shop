"use client";

import React, { Suspense, useEffect, useState } from "react";

const MainBanner = React.lazy(() =>
  import("@/widgets").then((module) => ({
    default: module.MainBanner,
  })),
);

const BannerPlaceholder = () => (
  <div className="w-full h-screen bg-black flex items-center justify-center animate-pulse"></div>
);

export default function ClientHome() {
  const [isMounted, setIsMounted] = useState(false);

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

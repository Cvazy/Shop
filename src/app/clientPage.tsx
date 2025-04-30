"use client";

import React, { Suspense, useEffect, useState } from "react";
import { ContactUs, Difference, Gallery } from "@/widgets";

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

      <div
        className={
          "flex flex-col items-center px-7 w-full sm:px-8 lg:px-10 xl:px-12"
        }
      >
        <div className={"max-w-limit w-full"}>
          <Difference />
        </div>

        <Gallery />

        <div className={"max-w-limit w-full"}>
          <ContactUs />
        </div>
      </div>
    </div>
  );
}

"use client";

import ScrollVelocity from "@/components/ScrollVelocity/ScrollVelocity";
import Lanyard from "@/components/Lanyard/Lanyard";
import { Switcher } from "@/shared";
import { useEffect, useState } from "react";

export const Footer = () => {
  const [isScrollBlocked, setIsScrollBlocked] = useState<boolean>(false);

  useEffect(() => {
    if (isScrollBlocked) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    }
  }, []);

  const handleToggle = () => {
    const newState = !isScrollBlocked;
    setIsScrollBlocked(newState);

    if (typeof document !== "undefined") {
      if (newState) {
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
      }
    }
  };

  return (
    <footer className={"min-h-dvh w-full bg-background h-max relative z-10"}>
      <div className={"flex flex-col items-center gap-10 w-full h-full"}>
        <div className={"py-8 w-full md:py-10 xl:py-12"}>
          <ScrollVelocity
            texts={["AlcoShop"]}
            className="custom-scroll-text text-foreground mr-10"
          />
        </div>
      </div>

      <div className={"w-full h-full relative"}>
        <div className={"absolute z-10 top-5 right-2 lg:hidden"}>
          <div className={"flex flex-col items-start gap-2.5"}>
            <div className={"flex items-center gap-2 flex-nowrap"}>
              <p className={"text-foreground font-bold text-lg"}>
                Block scroll
              </p>

              <Switcher
                initialValue={isScrollBlocked}
                onChange={handleToggle}
              />
            </div>

            <p className={"text-gray font-medium text-xs"}>
              For the clip to work correctly
            </p>
          </div>
        </div>
        <div className={"w-full h-full grayscale"}>
          <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
        </div>
      </div>
    </footer>
  );
};

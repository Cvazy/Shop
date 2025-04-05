"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Navigation } from "@/widgets";
import ShinyText from "@/components/ShinyText/ShinyText";
import StarBorder from "@/components/StarBorder/StarBorder";
import Link from "next/link";

export const MobileMenu = ({
  isOpen,
  toggleMenu,
}: {
  isOpen: boolean;
  toggleMenu: () => void;
}) => {
  const [menuHeight, setMenuHeight] = useState(0);

  useEffect(() => {
    document.documentElement.style.overflowY = isOpen ? "hidden" : "auto";
    document.documentElement.style.touchAction = isOpen ? "none" : "auto";

    document.body.style.overflowY = isOpen ? "hidden" : "auto";
    document.body.style.touchAction = isOpen ? "none" : "auto";

    return () => {
      document.documentElement.style.overflowY = "auto";
      document.documentElement.style.touchAction = "auto";

      document.body.style.overflowY = "auto";
      document.body.style.touchAction = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    const updateHeight = () => {
      const height = window.visualViewport?.height ?? window.innerHeight;
      setMenuHeight(isOpen ? height : 0);
    };

    updateHeight(); // Устанавливаем сразу
    window.visualViewport?.addEventListener("resize", updateHeight);

    return () => {
      window.visualViewport?.removeEventListener("resize", updateHeight);
    };
  }, [isOpen]);

  return (
    <motion.div
      initial={{ height: 0 }}
      animate={{ height: menuHeight }}
      transition={{ duration: 0.5, ease: "easeInOut", delay: isOpen ? 0 : 0.5 }}
      className={
        "absolute top-0 left-0 w-full bg-foreground z-30 overflow-hidden lg:hidden"
      }
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.5, delay: isOpen ? 0.5 : 0 }}
        className={"w-full h-full"}
      >
        <div className={"pb-10 px-30px w-full h-full main-p"}>
          <div className={"flex justify-center px-7 w-full h-full sm:px-8"}>
            <div className={"max-w-limit w-full"}>
              <div
                className={
                  "flex flex-col items-start justify-between gap-4 w-full h-full"
                }
              >
                <Navigation toggleMenu={toggleMenu} />

                <Link href={"/shop"} className={"w-full"} onClick={toggleMenu}>
                  <StarBorder className={"w-full"}>
                    <ShinyText text="Go shop!" disabled={false} speed={3} />
                  </StarBorder>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

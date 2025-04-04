"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import FlowingMenu from "@/components/FlowingMenu/FlowingMenu";

export const MobileMenu = ({ isOpen }: { isOpen: boolean }) => {
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

  const demoItems = [
    {
      link: "#",
      text: "Mojave",
      image: "https://picsum.photos/600/400?random=1",
    },
    {
      link: "#",
      text: "Sonoma",
      image: "https://picsum.photos/600/400?random=2",
    },
    {
      link: "#",
      text: "Monterey",
      image: "https://picsum.photos/600/400?random=3",
    },
    {
      link: "#",
      text: "Sequoia",
      image: "https://picsum.photos/600/400?random=4",
    },
  ];

  return (
    <motion.div
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
        <div className={"pt-[132px] pb-10 px-30px w-full h-full md:pt-36"}>
          <div
            className={
              "flex flex-col items-start justify-between gap-4 w-full h-full"
            }
          ></div>
        </div>
      </motion.div>
    </motion.div>
  );
};

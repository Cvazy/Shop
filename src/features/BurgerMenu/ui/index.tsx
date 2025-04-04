"use client";

import { motion } from "framer-motion";

interface IBurgerMenuButton {
  isOpen: boolean;
  onClick: () => void;
}

export const BurgerMenuButton = ({ isOpen, onClick }: IBurgerMenuButton) => {
  return (
    <button type={"button"} onClick={onClick} className={"w-10 h-10 relative"}>
      <motion.div
        animate={{
          rotate: isOpen ? 45 : 0,
          y: isOpen ? 0 : -10,
        }}
        className={"absolute w-8 h-0.5 rounded-full bg-white left-1"}
      />

      <motion.div
        animate={{ opacity: isOpen ? 0 : 1 }}
        className={"absolute w-8 h-0.5 rounded-full bg-white left-1 top-5"}
      />

      <motion.div
        animate={{
          rotate: isOpen ? -45 : 0,
          y: isOpen ? 0 : 10,
        }}
        className={"absolute w-8 h-0.5 rounded-full bg-white left-1"}
      />
    </button>
  );
};

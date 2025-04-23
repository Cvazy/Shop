import { motion } from "framer-motion";

export const FilterToggleIcon = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#333] relative z-20">
      <motion.div
        className="w-6 flex flex-col gap-[6px] items-center"
        initial={false}
      >
        <motion.span
          className="w-full h-[2px] bg-white block origin-center"
          animate={{
            rotate: isOpen ? 45 : 0,
            y: isOpen ? 8 : 0,
          }}
          transition={{ duration: 0.2 }}
        />
        <motion.span
          className="w-full h-[2px] bg-white block"
          animate={{
            opacity: isOpen ? 0 : 1,
            x: isOpen ? -20 : 0,
          }}
          transition={{ duration: 0.2 }}
        />
        <motion.span
          className="w-full h-[2px] bg-white block origin-center"
          animate={{
            rotate: isOpen ? -45 : 0,
            y: isOpen ? -8 : 0,
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </div>
  );
};

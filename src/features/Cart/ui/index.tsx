"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartContext } from "@/shared";
import "./styles.css";

export const CartButton = () => {
  const { cartCount, cartButtonRef } = useCartContext();

  return (
    <Link href={"/cart"}>
      <button
        ref={cartButtonRef}
        className={
          "flex items-center justify-center relative w-10 h-10 rounded-[10px] button-gradient transition-all duration-500 hover:scale-105"
        }
      >
        <Image src={"/icons/cart.svg"} alt={"Cart"} width={24} height={24} />

        <span
          className={
            "flex items-center justify-center bg-background text-foreground font-semibold rounded-full w-4 min-w-4 aspect-square absolute text-xs -top-2 -right-2"
          }
        >
          {cartCount}
        </span>
      </button>
    </Link>
  );
};

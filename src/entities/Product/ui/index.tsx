import styles from "./Product.module.css";
import Image from "next/image";
import StarBorder from "@/components/StarBorder/StarBorder";
import ShinyText from "@/components/ShinyText/ShinyText";
import Link from "next/link";
import { useState } from "react";

export const Product = () => {
  const [isActive, setIsActive] = useState(false);

  const handleCardClick = () => {
    const isTouchDevice =
      typeof window !== "undefined" &&
      window.matchMedia("(hover: none)").matches;

    if (isTouchDevice) {
      setIsActive(!isActive);
    }
  };

  return (
    <div
      className={`${styles.card} ${isActive ? styles.active : ""}`}
      onClick={handleCardClick}
    >
      <div className={styles.wave}></div>
      <div className={styles.wave}></div>
      <div className={styles.wave}></div>

      <div className={styles.img}>
        <Image
          width={300}
          height={300}
          src={"/products/item2.png"}
          alt={"Product"}
          loading={"lazy"}
          draggable={false}
          className={"w-full h-full"}
        />
      </div>

      <div className={styles.textBox}>
        <p className={`${styles.text} ${styles.head}`}>Jack Daniels</p>

        <span>Whisky</span>

        <p className={`${styles.text} ${styles.price}`}>3.654 ₽</p>

        <Link href={"/shop"} className={"w-full"}>
          <StarBorder className={"w-full"} textClassName={"!py-2.5"}>
            <ShinyText text={"Go shop!"} disabled={false} speed={3} />
          </StarBorder>
        </Link>
      </div>
    </div>
  );
};

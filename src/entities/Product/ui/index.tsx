"use client";

import styles from "./Product.module.css";
import StarBorder from "@/components/StarBorder/StarBorder";
import ShinyText from "@/components/ShinyText/ShinyText";
import Link from "next/link";
import { useState } from "react";
import { formatNumberWithDots, IProductEnhanced } from "@/entities";
import { CustomImage, extractMediaPath, imageLoader } from "@/shared";

export const Product = ({
  product_name,
  images,
  price,
  typeName,
}: IProductEnhanced) => {
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
      <div className={styles.img}>
        <CustomImage
          width={300}
          height={300}
          src={extractMediaPath(images[0].image)}
          alt={images[0].alt_text}
          loader={imageLoader}
          loading={"lazy"}
          draggable={false}
          className={"w-full h-full"}
        />
      </div>

      <div className={styles.textBox}>
        <p className={`${styles.text} ${styles.head}`}>{product_name}</p>

        <span>{typeName}</span>

        <p className={`${styles.text} ${styles.price}`}>
          {formatNumberWithDots(price)} ₽
        </p>

        <Link href={"/shop"} className={"w-full"}>
          <StarBorder className={"w-full"} textClassName={"!py-2.5"}>
            <ShinyText text={"Go shop!"} disabled={false} speed={3} />
          </StarBorder>
        </Link>
      </div>
    </div>
  );
};

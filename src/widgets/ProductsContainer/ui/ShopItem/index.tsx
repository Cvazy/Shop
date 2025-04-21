"use client";

import styles from "./ShopItem.module.css";
import ShinyText from "@/components/ShinyText/ShinyText";
import StarBorder from "@/components/StarBorder/StarBorder";
import { formatNumberWithDots, IProductEnhanced } from "@/entities";
import { useEffect, useState } from "react";
import { CustomImage, extractMediaPath, imageLoader } from "@/shared";

export const ShopItem = ({
  product_name,
  images,
  price,
  typeName,
}: IProductEnhanced) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const getValues = (index: number) => {
    if (!isMounted) return { i: 1, j: 1 };

    return {
      i: Math.floor(Math.random() * 20 + 5),
      j: (Math.random() * 1.5 + 0.5).toFixed(1),
    };
  };

  return (
    <div className={styles.card}>
      {[...Array(10)].map((_, index) => {
        const values = getValues(index);
        return (
          <div
            key={index}
            style={{
              "--i": values.i,
              "--j": values.j,
            }}
            className={styles.blub}
          />
        );
      })}

      <div className={"p-4 w-full xl:p-6"}>
        <div className={"flex flex-col items-start gap-6 w-full"}>
          <div
            className={
              "flex justify-center max-w-1/2 aspect-square relative z-10 w-full"
            }
          >
            <CustomImage
              width={200}
              height={200}
              src={extractMediaPath(images[0].image)}
              alt={images[0].alt_text}
              loader={imageLoader}
              loading={"lazy"}
              draggable={false}
              className={"w-auto h-full"}
            />
          </div>

          <div className={"flex flex-col items-center gap-4 w-full"}>
            <div className={"flex flex-col items-start gap-1 w-full"}>
              <ShinyText
                text={product_name}
                className={"font-semibold text-xl md:text-2xl"}
                disabled={false}
                speed={3}
              />

              <ShinyText
                text={typeName}
                className={"text-sm md:text-base"}
                disabled={false}
                speed={3}
              />
            </div>

            <div
              className={
                "flex items-center justify-between gap-4 flex-nowrap w-full"
              }
            >
              <p
                className={
                  "text-[#b5b5b5a4] text-left text-base font-medium whitespace-nowrap md:text-lg"
                }
              >
                {formatNumberWithDots(price)} ₽
              </p>

              <StarBorder className={"w-fit"} textClassName={"!py-2.5"}>
                <ShinyText text={"Shop"} disabled={false} speed={3} />
              </StarBorder>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.moon}>
        <div className={`${styles.crater} ${styles.cr1}`}></div>
        <div className={`${styles.crater} ${styles.cr2}`}></div>
        <div className={`${styles.crater} ${styles.cr3}`}></div>
      </div>
    </div>
  );
};

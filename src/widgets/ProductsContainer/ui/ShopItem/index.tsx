"use client";

import styles from "./ShopItem.module.css";
import ShinyText from "@/components/ShinyText/ShinyText";
import StarBorder from "@/components/StarBorder/StarBorder";
import { formatNumberWithDots, IProductEnhanced } from "@/entities";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import {
  CustomImage,
  extractMediaPath,
  imageLoader,
  useCartContext,
} from "@/shared";
import Counter from "@/components/Counter/Counter";

export const ShopItem = memo<IProductEnhanced>(
  ({ product_name, images, price, typeName, id }) => {
    const [value, setValue] = useState<number>(1);
    const [isAddedToCart, setIsAddedToCart] = useState<boolean>(false);
    const [isMounted, setIsMounted] = useState<boolean>(false);
    const productRef = useRef<HTMLDivElement>(null);

    const { addToCart, updateQuantity, removeFromCart, triggerCartAnimation } =
      useCartContext();

    useEffect(() => {
      setIsMounted(true);
    }, []);

    const getValues = useCallback(
      (index: number) => {
        if (!isMounted) return { i: 1, j: 1 };

        return {
          i: 5 + ((index * 2) % 20),
          j: (0.5 + ((index * 0.1) % 1.5)).toFixed(1),
        };
      },
      [isMounted],
    );

    const getFullImageUrl = useCallback((image: string) => {
      if (image.startsWith("http")) return image;
      return `${process.env.NEXT_PUBLIC_SERVER_URL}${extractMediaPath(image)}`;
    }, []);

    const triggerAnimation = useCallback(() => {
      if (productRef.current && images.length > 0) {
        const imageUrl = getFullImageUrl(images[0].image);
        triggerCartAnimation(productRef.current, imageUrl);
      }
    }, [getFullImageUrl, images, triggerCartAnimation, productRef]);

    const handleAddToCart = useCallback(() => {
      if (!isAddedToCart) {
        addToCart(id as string, 1);
        setIsAddedToCart(true);
        triggerAnimation();
      }
    }, [addToCart, id, isAddedToCart, triggerAnimation, setIsAddedToCart]);

    const handleIncrease = useCallback(
      (event: React.MouseEvent) => {
        event.stopPropagation();
        const newValue = value + 1;
        setValue(newValue);

        updateQuantity(id as string, newValue);
        triggerAnimation();
      },
      [id, updateQuantity, setValue, value, triggerAnimation],
    );

    const handleDecrease = useCallback(
      (event: React.MouseEvent) => {
        event.stopPropagation();
        const newValue = value - 1;

        if (newValue <= 0) {
          removeFromCart(id as string);
          setIsAddedToCart(false);
          setValue(1);
        } else {
          setValue(newValue);
          updateQuantity(id as string, newValue);
        }
      },
      [id, removeFromCart, setIsAddedToCart, setValue, updateQuantity, value],
    );

    return (
      <div className={styles.card} ref={productRef}>
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
                  "flex flex-col items-start justify-between gap-4 flex-nowrap w-full sm:items-center sm:flex-row"
                }
              >
                <p
                  className={
                    "text-[#b5b5b5a4] text-left text-base font-medium whitespace-nowrap md:text-lg"
                  }
                >
                  {formatNumberWithDots(price)} ₽
                </p>

                <div className={"h-10 w-full sm:w-fit"}>
                  <StarBorder
                    as={"div"}
                    onClick={handleAddToCart}
                    className={"w-full h-full"}
                    textClassName={`!py-2.5 ${isAddedToCart ? "!px-2" : ""} h-full flex items-center justify-center`}
                  >
                    {isAddedToCart ? (
                      <div
                        className={
                          "flex justify-center items-center gap-2 flex-nowrap"
                        }
                      >
                        <button
                          type={"button"}
                          className={
                            "flex items-center justify-center w-5 min-w-5 aspect-square text-xl"
                          }
                          onClick={handleDecrease}
                        >
                          -
                        </button>

                        <Counter
                          value={value}
                          places={[10, 1]}
                          fontSize={20}
                          padding={5}
                          textColor={"#fafafa"}
                          fontWeight={900}
                        />

                        <button
                          type={"button"}
                          className={
                            "flex items-center justify-center w-5 min-w-5 aspect-square text-xl"
                          }
                          onClick={handleIncrease}
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <ShinyText text={"Shop"} disabled={false} speed={3} />
                    )}
                  </StarBorder>
                </div>
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
  },
);

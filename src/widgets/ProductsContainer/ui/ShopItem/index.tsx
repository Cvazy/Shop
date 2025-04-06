import styles from "./ShopItem.module.css";
import Image from "next/image";
import ShinyText from "@/components/ShinyText/ShinyText";
import StarBorder from "@/components/StarBorder/StarBorder";

export const ShopItem = () => {
  const getRandomValue = () => Math.floor(Math.random() * 20 + 5);
  const getRandomMultiplier = () => (Math.random() * 1.5 + 0.5).toFixed(1);

  return (
    <div className={styles.card}>
      {[...Array(10)].map((_, index) => (
        <div
          key={index}
          style={{
            "--i": getRandomValue(),
            "--j": getRandomMultiplier(),
          }}
          className={styles.blub}
        />
      ))}

      <div className={"p-4 w-full xl:p-6"}>
        <div className={"flex flex-col items-start gap-6 w-full"}>
          <div
            className={
              "flex justify-center max-w-1/2 aspect-square relative z-10 w-full"
            }
          >
            <Image
              width={200}
              height={200}
              src={"/products/item2.png"}
              alt={"Product Item 2"}
              loading={"lazy"}
              draggable={false}
              className={"w-auto h-full"}
            />
          </div>

          <div className={"flex flex-col items-center gap-4 w-full"}>
            <div className={"flex flex-col items-start gap-1 w-full"}>
              <ShinyText
                text={"Jack Daniels"}
                className={"font-semibold text-xl md:text-2xl"}
                disabled={false}
                speed={3}
              />

              <ShinyText
                text={"Whisky"}
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
                3.654 ₽
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

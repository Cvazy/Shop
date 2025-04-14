import LiquidChrome from "@/components/LiquidChrome/LiquidChrome";
import { InputWithLabel } from "@/shared";

export const ShopFilter = () => {
  return (
    <div
      className={
        "w-full h-20 relative rounded-xl lg:h-full lg:col-span-1 lg:rounded-2xl"
      }
    >
      <LiquidChrome
        baseColor={[0.1, 0.1, 0.1]}
        speed={1}
        amplitude={0.6}
        className={
          "hidden rounded-xl opacity-20 absolute inset-0 lg:block lg:rounded-2xl"
        }
      />

      <div className={"relative z-10 w-full h-full"}>
        <div className={"flex flex-col gap-6 p-4 w-full"}>
          <InputWithLabel />

          <div></div>
        </div>
      </div>
    </div>
  );
};

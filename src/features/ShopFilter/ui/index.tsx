import LiquidChrome from "@/components/LiquidChrome/LiquidChrome";

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
        interactive={true}
        className={"hidden rounded-xl opacity-20 lg:block lg:rounded-2xl"}
      />

      <div className={"relative z-10 w-full h-full"}></div>
    </div>
  );
};

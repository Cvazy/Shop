import { ShopItem } from "./ShopItem";

export const ProductsContainer = () => {
  return (
    <div
      className={"grid grid-cols-2 gap-4 w-full md:grid-cols-3 lg:col-span-3"}
    >
      <ShopItem />
      <ShopItem />
      <ShopItem />
      <ShopItem />
      <ShopItem />
      <ShopItem />
      <ShopItem />
    </div>
  );
};

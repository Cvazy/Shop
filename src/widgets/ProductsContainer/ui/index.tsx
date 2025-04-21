"use client";

import { ShopItem } from "./ShopItem";
import { useQuery } from "@tanstack/react-query";
import { ICatalogResponse, IProductEnhanced, productService } from "@/entities";
import { useProducts } from "@/shared";

export const ProductsContainer = ({
  filteredProducts,
}: {
  filteredProducts: IProductEnhanced[] | undefined;
}) => {
  return (
    <div
      className={
        "flex flex-col items-center gap-5 w-full lg:gap-8 lg:col-span-3"
      }
    >
      {filteredProducts && filteredProducts.length > 0 ? (
        <div className={"grid grid-cols-2 gap-4 w-full md:grid-cols-3"}>
          {filteredProducts?.map((product) => (
            <ShopItem key={product.id} {...product} />
          ))}
        </div>
      ) : (
        <p
          className={
            "text-center font-medium text-white text-lg w-full md:text-xl xl:text-2xl"
          }
        >
          Здесь пока ничего нет, но скоро здесь будет много интересного!
        </p>
      )}

      <div></div>
    </div>
  );
};

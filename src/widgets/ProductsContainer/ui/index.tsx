"use client";

import { ShopItem } from "./ShopItem";
import { IProductEnhanced } from "@/entities";
import { Pagination } from "@/features";

interface IProductsContainerProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  filteredProducts: IProductEnhanced[] | undefined;
}

export const ProductsContainer = ({
  totalPages,
  currentPage,
  onPageChange,
  filteredProducts,
}: IProductsContainerProps) => {
  return (
    <div
      className={
        "flex flex-col items-center gap-5 w-full z-[1] lg:gap-8 lg:col-span-3"
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

      {totalPages > 0 && totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

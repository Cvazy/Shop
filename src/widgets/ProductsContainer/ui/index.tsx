"use client";

import { ShopItem } from "./ShopItem";
import { useQuery } from "@tanstack/react-query";
import { ICatalogResponse, productService } from "@/entities";

export const ProductsContainer = () => {
  const { data, isLoading } = useQuery<ICatalogResponse>({
    queryKey: ["products"],
    queryFn: () => productService.getAllProducts(),
  });

  const { results } = data || {};

  return (
    <div
      className={"grid grid-cols-2 gap-4 w-full md:grid-cols-3 lg:col-span-3"}
    >
      {results &&
        results?.map((product) => <ShopItem key={product.id} {...product} />)}
    </div>
  );
};

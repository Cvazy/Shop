"use client";

import GridMotion from "@/components/GridMotion/GridMotion";
import { Loader } from "@/shared";
import { useProducts } from "@/shared/hooks";

export const MainBanner = () => {
  const { filteredProducts, isLoading } = useProducts();

  if (isLoading) return <Loader />;

  return (
    <section className={"flex justify-center items-center w-full h-dvh"}>
      {filteredProducts && <GridMotion items={filteredProducts} />}
    </section>
  );
};

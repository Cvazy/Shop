"use client";

import GridMotion from "@/components/GridMotion/GridMotion";
import { Loader, useProducts } from "@/shared";

export const MainBanner = () => {
  const { enhancedProducts, isLoading } = useProducts();

  if (isLoading) return <Loader />;

  return (
    <section className={"flex justify-center items-center w-full h-dvh"}>
      {enhancedProducts && <GridMotion items={enhancedProducts} />}
    </section>
  );
};

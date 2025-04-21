"use client";

import { ShopFilter } from "@/features";
import { ProductsContainer } from "@/widgets";
import { useProducts } from "@/shared";

export const ShopContent = () => {
  const {
    filteredProducts,
    filtersData,
    selectedSegments,
    selectedTypes,
    toggleFilter,
    setSearchTerm,
  } = useProducts();

  return (
    <>
      <ShopFilter
        filtersData={filtersData}
        selectedSegments={selectedSegments}
        selectedTypes={selectedTypes}
        toggleFilter={toggleFilter}
        onSearchChange={setSearchTerm}
      />

      <ProductsContainer filteredProducts={filteredProducts} />
    </>
  );
};

// useProducts.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import {
  ICatalogResponse,
  IFiltersResponse,
  IProductEnhanced,
  productService,
} from "@/entities";
import { useEffect, useMemo, useState } from "react";

export const useProducts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const [selectedTypes, setSelectedTypes] = useState<Set<number>>(new Set());
  const [selectedSegments, setSelectedSegments] = useState<Set<number>>(
    new Set(),
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm.trim());
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const {
    data: productsData,
    isLoading: isProductsLoading,
    isFetching: isProductsFetching,
  } = useQuery({
    queryKey: ["products", debouncedSearchTerm],
    queryFn: () => productService.getAllProducts(debouncedSearchTerm),
  });

  const { data: filtersData, isLoading: isFiltersLoading } = useQuery({
    queryKey: ["filters"],
    queryFn: () => productService.getAllFilters(),
  });

  const enhancedProducts: IProductEnhanced[] = useMemo(() => {
    if (!productsData?.results || !filtersData) return [];

    return productsData.results.map((product) => ({
      ...product,
      typeName:
        filtersData.types.find((t) => t.id === product.type)?.name ||
        "Неизвестный тип",
      segmentName:
        filtersData.segments.find((s) => s.id === product.segment)?.name ||
        "Неизвестный сегмент",
    }));
  }, [productsData, filtersData]);

  const filteredProducts: IProductEnhanced[] = useMemo(() => {
    return enhancedProducts.filter((product) => {
      const typeMatch =
        selectedTypes.size === 0 || selectedTypes.has(product.type);
      const segmentMatch =
        selectedSegments.size === 0 || selectedSegments.has(product.segment);

      return typeMatch && segmentMatch;
    });
  }, [enhancedProducts, selectedTypes, selectedSegments]);

  const toggleFilter = (type: "type" | "segment", id: number) => {
    const set = type === "type" ? selectedTypes : selectedSegments;
    const newSet = new Set(set);

    newSet.has(id) ? newSet.delete(id) : newSet.add(id);

    if (type === "type") {
      setSelectedTypes(newSet);
    } else {
      setSelectedSegments(newSet);
    }
  };

  return {
    filteredProducts,
    enhancedProducts,
    filtersData,
    isLoading: isProductsLoading || isFiltersLoading,
    isFetching: isProductsFetching,
    selectedTypes,
    selectedSegments,
    searchTerm,
    setSearchTerm,
    toggleFilter,
  };
};

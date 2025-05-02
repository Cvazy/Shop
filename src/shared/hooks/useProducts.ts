"use client";

import { useQuery } from "@tanstack/react-query";
import { ICatalogResponse, IProductEnhanced, productService } from "@/entities";
import { useEffect, useMemo, useState } from "react";

const ITEMS_PER_PAGE = 5;

export const useProducts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTypes, setSelectedTypes] = useState<Set<number>>(new Set());
  const [selectedSegments, setSelectedSegments] = useState<Set<number>>(
    new Set(),
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm.trim());
      setCurrentPage(1);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedTypes, selectedSegments]);

  const { data: filtersData, isLoading: isFiltersLoading } = useQuery({
    queryKey: ["filters"],
    queryFn: () => productService.getAllFilters(),
    staleTime: Infinity,
  });

  const {
    data: productsData,
    isLoading: isProductsLoading,
    isFetching: isProductsFetching,
  } = useQuery<ICatalogResponse, Error>({
    queryKey: [
      "products",
      debouncedSearchTerm,
      currentPage,
      Array.from(selectedTypes).sort(),
      Array.from(selectedSegments).sort(),
    ],
    queryFn: () =>
      productService.getAllProducts({
        searchTerm: debouncedSearchTerm,
        page: currentPage,
        types: selectedTypes,
        segments: selectedSegments,
      }),
    placeholderData: (previousData) => previousData,
    staleTime: 5 * 60 * 1000,
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
  }, [productsData?.results, filtersData]);

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

  const totalProductsCount = productsData?.count ?? 0;
  const totalPages = Math.ceil(totalProductsCount / ITEMS_PER_PAGE);

  return {
    filteredProducts: enhancedProducts,
    filtersData,
    isLoading: isProductsLoading || isFiltersLoading,
    isFetching: isProductsFetching,
    selectedTypes,
    selectedSegments,
    searchTerm,
    setSearchTerm,
    toggleFilter,
    currentPage,
    setCurrentPage,
    totalPages,
    totalProductsCount,
  };
};

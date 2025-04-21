import { ICatalogResponse, IFiltersResponse } from "../types";

export const productService = {
  async getAllProducts(searchTerm?: string) {
    const url = new URL(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/catalog/products`,
    );

    if (searchTerm && searchTerm?.trim()) {
      url.searchParams.set("search", searchTerm.trim());
    }

    const response = await fetch(url.toString(), {
      next: {
        tags: ["products"],
        revalidate: 3600,
      },
    });

    return response.json() as Promise<ICatalogResponse>;
  },

  async getAllFilters() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/catalog/filters`,
      {
        next: {
          tags: ["filters"],
          revalidate: Infinity,
        },
      },
    );

    return response.json() as Promise<IFiltersResponse>;
  },
};

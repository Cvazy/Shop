import { ICatalogResponse, IFiltersResponse } from "../types";

interface GetAllProductsParams {
  searchTerm?: string;
  page?: number;
  types?: Set<number>;
  segments?: Set<number>;
}

export const productService = {
  async getAllProducts({
    searchTerm,
    page,
    types,
    segments,
  }: GetAllProductsParams = {}) {
    const url = new URL(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/catalog/products`,
    );

    if (searchTerm && searchTerm?.trim()) {
      url.searchParams.set("search", searchTerm.trim());
    }

    if (page) {
      url.searchParams.set("page", page.toString());
    }

    if (types && types.size > 0) {
      url.searchParams.set("type", Array.from(types).join(","));
    }

    if (segments && segments.size > 0) {
      url.searchParams.set("segment", Array.from(segments).join(","));
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

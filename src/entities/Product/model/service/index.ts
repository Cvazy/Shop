import { ICatalogResponse } from "../types";

export const productService = {
  async getAllProducts() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/catalog/products`,
      {
        next: {
          tags: ["products"],
          revalidate: 3600,
        },
      },
    );

    return response.json() as Promise<ICatalogResponse>;
  },
};

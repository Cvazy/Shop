import { IComparisons } from "../types";

export const comparisonService = {
  async getAllComparisons() {
    const url = new URL(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/comparisons`,
    );

    const response = await fetch(url.toString(), {
      next: {
        tags: ["comparisons"],
        revalidate: 3600,
      },
    });

    return response.json() as Promise<IComparisons[]>;
  },
};

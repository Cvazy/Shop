import { IHowItsWork } from "../types";

export const howItWorkService = {
  async getAllHowItWorks() {
    const url = new URL(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/info/how-it-works`,
    );

    const response = await fetch(url.toString(), {
      next: {
        tags: ["howItWorks"],
        revalidate: 3600,
      },
    });

    return response.json() as Promise<IHowItsWork[]>;
  },
};

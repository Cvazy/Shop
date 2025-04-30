import { IGallery } from "../types";

export const galleryService = {
  async getAllImagesForGallery() {
    const url = new URL(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/gallery`);

    const response = await fetch(url.toString(), {
      next: {
        tags: ["gallery"],
        revalidate: 3600,
      },
    });

    return response.json() as Promise<IGallery[]>;
  },
};

import { IGallery } from "@/app/home";
import { CONTAINER_TYPES } from "../constants";

export const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap
  }
};

export const distributeImagesAcrossColumns = (
  images: IGallery[],
  totalColumns: number,
  minImagesPerColumn: number,
  maxImagesPerColumn: number,
) => {
  const columns: { images: IGallery[]; size: number }[] = new Array(
    totalColumns,
  )
    .fill(null)
    .map(() => ({ images: [], size: 0 }));
  const imagesCopy = [...images];

  let imageIndex = 0;
  let lastImageIndex: number[] = new Array(totalColumns).fill(-1);

  while (columns.some((column) => column.images.length < maxImagesPerColumn)) {
    for (let columnIndex = 0; columnIndex < totalColumns; columnIndex++) {
      if (columns[columnIndex].images.length < maxImagesPerColumn) {
        let newImageIndex = imageIndex;
        while (newImageIndex === lastImageIndex[columnIndex]) {
          newImageIndex = Math.floor(Math.random() * imagesCopy.length);
        }

        lastImageIndex[columnIndex] = newImageIndex;

        columns[columnIndex].images.push(imagesCopy[newImageIndex]);

        imageIndex++;
        if (imageIndex >= imagesCopy.length) imageIndex = 0;
      }
    }
  }

  columns.forEach((column) => {
    column.size = Math.floor(Math.random() * CONTAINER_TYPES.length);
  });

  return columns;
};

export const distributeColumnsRandomly = (
  columns: { images: IGallery[]; size: number }[],
) => {
  let lastSize: number | null = null;
  const rearrangedColumns: { images: IGallery[]; size: number }[] = [];

  while (columns.length > 0) {
    const columnIndex = columns.findIndex((column) => {
      const isSameSize = lastSize === column.size;
      if (isSameSize) return false;
      lastSize = column.size;
      return true;
    });

    rearrangedColumns.push(columns[columnIndex]);
    columns.splice(columnIndex, 1);
  }

  return rearrangedColumns;
};

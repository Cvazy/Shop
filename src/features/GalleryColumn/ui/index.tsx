import { GalleryItem, IGallery } from "@/entities";
import { memo } from "react";

export const GalleryColumn = memo(({ columns }: { columns: any[] }) => {
  return (
    <>
      {columns.map((column, columnIndex) => {
        const containerType = column?.size;

        return (
          <div
            key={`column-${columnIndex}`}
            className="flex flex-col gap-4 w-fit h-fit"
          >
            {column?.images?.map((image: IGallery, imageIndex: number) => (
              <GalleryItem
                key={imageIndex}
                imageIndex={imageIndex}
                containerType={containerType}
                image={image}
              />
            ))}
          </div>
        );
      })}
    </>
  );
});

"use client";

import { memo, useState } from "react";
import { CustomImage, imageLoader } from "@/shared";
import { CONTAINER_TYPES } from "@/widgets";
import { IGallery } from "@/entities";

interface IGalleryItemProps {
  image: IGallery;
  imageIndex: number;
  containerType: any;
}

export const GalleryItem = memo(
  ({ image, imageIndex, containerType }: IGalleryItemProps) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`w-fit h-fit ${isHovered ? "opacity-100" : "opacity-50"}`}
      >
        <CustomImage
          key={`${image.id}-${imageIndex}`}
          width={CONTAINER_TYPES[containerType]?.width || 100}
          height={CONTAINER_TYPES[containerType]?.height || 100}
          src={image.image}
          alt={image.description}
          loader={imageLoader}
          loading={"lazy"}
          className={CONTAINER_TYPES[containerType]?.className || ""}
        />
      </div>
    );
  },
);

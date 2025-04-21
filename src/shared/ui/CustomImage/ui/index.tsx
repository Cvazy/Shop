"use client";
import React, { FC, memo, useState } from "react";
import Image, { ImageProps } from "next/image";

interface CustomImageProps extends ImageProps {
  className?: string;
  containerClassName?: string;
}

export const CustomImage: FC<CustomImageProps> = memo(
  ({ src, alt, className, containerClassName, ...props }) => {
    const [isLoading, setLoading] = useState(true);

    return (
      <div className={`relative ${className} ${containerClassName}`}>
        {isLoading && (
          <div className="absolute inset-0 bg-gray animate-pulse rounded-lg"></div>
        )}
        <Image
          {...props}
          src={src || ""}
          alt={alt || ""}
          className={`${className} transition-opacity duration-500 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          onLoad={() => setLoading(false)}
        />
      </div>
    );
  },
);

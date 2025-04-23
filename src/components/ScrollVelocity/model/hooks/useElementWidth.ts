import React, { useLayoutEffect, useState } from "react";

export const useElementWidth = (
  ref: React.RefObject<HTMLElement | null>,
): number => {
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    function updateWidth() {
      if (ref.current) {
        if ("offsetWidth" in ref.current) {
          setWidth(ref.current.offsetWidth);
        }
      }
    }

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [ref]);

  return width;
};

"use client";

import { useEffect, useRef, FC, useState, useMemo, memo } from "react";
import { gsap } from "gsap";
import { IProductEnhanced, Product } from "@/entities";

interface GridMotionProps {
  items?: IProductEnhanced[];
  gradientColor?: string;
}

const GridMotion: FC<GridMotionProps> = ({
  items = [],
  gradientColor = "black",
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mouseXRef = useRef<number>(0);
  const [isMounted, setIsMounted] = useState(false);
  const rowAnimations = useRef<any[]>([]);

  const rowsCount = 4;
  const columnsCount = 12;
  const totalItems = rowsCount * columnsCount;

  const combinedItems = useMemo(
    () =>
      items.length
        ? Array.from({ length: totalItems }, (_, i) => items[i % items.length])
        : Array.from({ length: totalItems }, () => ""),
    [items, totalItems],
  );

  useEffect(() => {
    setIsMounted(true);
    rowRefs.current = Array(rowsCount).fill(null);
    mouseXRef.current = window.innerWidth / 2;

    gsap.ticker.lagSmoothing(0);

    const handleMouseMove = (e: MouseEvent) => {
      mouseXRef.current = e.clientX;
    };

    const baseDuration = 0.8;
    const inertiaFactors = [0.6, 0.4, 0.3, 0.2];

    const updateMotion = () => {
      const maxMoveAmount = 300;

      rowRefs.current.forEach((row, index) => {
        if (!row || !rowAnimations.current[index]) return;

        const direction = index % 2 === 0 ? 1 : -1;
        const moveAmount =
          ((mouseXRef.current / window.innerWidth) * maxMoveAmount -
            maxMoveAmount / 2) *
          direction;

        rowAnimations.current[index](moveAmount);
      });
    };

    setTimeout(() => {
      rowAnimations.current = rowRefs.current.map((row, index) =>
        row
          ? gsap.quickTo(row, "x", {
              duration:
                baseDuration + inertiaFactors[index % inertiaFactors.length],
              ease: "power3.out",
            })
          : () => {},
      );
    }, 0);

    const removeAnimationLoop = gsap.ticker.add(updateMotion);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      removeAnimationLoop();

      rowAnimations.current.forEach((animation) => {
        if (animation && typeof animation.revert === "function") {
          animation.revert();
        }
      });
      rowAnimations.current = [];
    };
  }, []);

  if (!isMounted) return null;

  return (
    <div ref={gridRef} className="h-full w-full overflow-hidden">
      <section
        className="w-full h-screen overflow-hidden relative flex items-center justify-center"
        style={{
          background: `radial-gradient(circle, ${gradientColor} 0%, transparent 100%)`,
        }}
      >
        <div className="gap-4 flex-none relative w-[150vw] h-[150vh] grid grid-rows-4 grid-cols-1 rotate-[-15deg] origin-bottom z-[2] lg:origin-center">
          {Array.from({ length: rowsCount }).map((_, rowIndex) => (
            <div
              key={rowIndex}
              className="flex justify-between gap-4 w-max"
              style={{ willChange: "transform" }}
              ref={(el) => {
                rowRefs.current[rowIndex] = el;
              }}
            >
              {Array.from({ length: columnsCount }).map((_, itemIndex) => {
                const content = combinedItems[
                  rowIndex * columnsCount + itemIndex
                ] as IProductEnhanced;
                return (
                  <div
                    key={`${rowIndex}-${itemIndex}`}
                    className="relative w-full h-full aspect-square"
                  >
                    {content ? <Product {...content} /> : null}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default GridMotion;

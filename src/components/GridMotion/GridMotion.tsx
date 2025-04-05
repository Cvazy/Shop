"use client";

import { useEffect, useRef, FC, useState } from "react";
import { gsap } from "gsap";
import Link from "next/link";

interface GridMotionProps {
  items?: string[];
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

  const rowsCount = 4;
  const columnsCount = 12;
  const totalItems = rowsCount * columnsCount;

  // Дублируем элементы для заполнения сетки
  const combinedItems = items.length
    ? Array.from({ length: totalItems }, (_, i) => items[i % items.length])
    : Array.from({ length: totalItems }, (_, i) => "");

  useEffect(() => {
    setIsMounted(true);
    mouseXRef.current = window.innerWidth / 2;

    gsap.ticker.lagSmoothing(0);

    const handleMouseMove = (e: MouseEvent) => {
      mouseXRef.current = e.clientX;
    };

    const updateMotion = () => {
      const maxMoveAmount = 300;
      const baseDuration = 0.8;
      const inertiaFactors = [0.6, 0.4, 0.3, 0.2];

      rowRefs.current.forEach((row, index) => {
        if (row) {
          const direction = index % 2 === 0 ? 1 : -1;
          const moveAmount =
            ((mouseXRef.current / window.innerWidth) * maxMoveAmount -
              maxMoveAmount / 2) *
            direction;

          gsap.to(row, {
            x: moveAmount,
            duration:
              baseDuration + inertiaFactors[index % inertiaFactors.length],
            ease: "power3.out",
            overwrite: "auto",
          });
        }
      });
    };

    const removeAnimationLoop = gsap.ticker.add(updateMotion);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      removeAnimationLoop();
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
              style={{ willChange: "transform, filter" }}
              ref={(el) => (rowRefs.current[rowIndex] = el)}
            >
              {Array.from({ length: columnsCount }).map((_, itemIndex) => {
                const content =
                  combinedItems[rowIndex * columnsCount + itemIndex];
                return (
                  <Link
                    href={"/shop"}
                    key={`${rowIndex}-${itemIndex}`}
                    className="relative aspect-square w-full h-full md:min-w-72 xl:min-w-96"
                  >
                    <div className="relative w-full h-full overflow-hidden rounded-[10px] bg-[#111] flex items-center justify-center text-white text-[1.5rem]">
                      <div
                        className="w-full h-full bg-cover bg-center absolute top-0 left-0"
                        style={{ backgroundImage: `url(${content})` }}
                      />
                    </div>
                  </Link>
                );
              })}
            </div>
          ))}
        </div>
        <div className="relative w-full h-full top-0 left-0 pointer-events-none"></div>
      </section>
    </div>
  );
};

export default GridMotion;

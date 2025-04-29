"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { CallToAction, HowItsWorkElement } from "./components";
import { useQuery } from "@tanstack/react-query";
import { howItWorkService } from "@/entities";
import { Loader, Subtitle } from "@/shared";

const lerp = (start: number, end: number, factor: number): number => {
  return start * (1 - factor) + end * factor;
};

export const HowItsWork = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["howItsWorks"],
    queryFn: () => howItWorkService.getAllHowItWorks(),
  });

  const lineRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);

  const [lineProgress, setLineProgress] = useState(0);
  const targetLineProgress = useRef(0);
  const lerpAnimationIdRef = useRef<number | null>(null);
  const scrollAnimationIdRef = useRef<number | null>(null);

  const setBlockRef = (el: HTMLDivElement | null, index: number) => {
    if (el) {
      blockRefs.current[index] = el;
    }
  };

  const animateLine = useCallback(() => {
    setLineProgress((prevProgress) => {
      if (Math.abs(prevProgress - targetLineProgress.current) < 0.001) {
        lerpAnimationIdRef.current = null;
        return targetLineProgress.current;
      }
      const nextProgress = lerp(prevProgress, targetLineProgress.current, 0.5);
      lerpAnimationIdRef.current = requestAnimationFrame(animateLine);
      return nextProgress;
    });
  }, []);

  const handleScroll = useCallback(() => {
    if (!containerRef.current) {
      scrollAnimationIdRef.current = requestAnimationFrame(handleScroll);
      return;
    }

    const containerRect = containerRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    const scrollRange = viewportHeight + containerRect.height;
    let currentScroll = viewportHeight - containerRect.top;

    if (scrollRange <= 0) {
      targetLineProgress.current = 0;
    } else {
      let rawProgress = currentScroll / scrollRange;
      targetLineProgress.current = Math.min(1, Math.max(0, rawProgress));
    }

    if (lerpAnimationIdRef.current === null) {
      lerpAnimationIdRef.current = requestAnimationFrame(animateLine);
    }

    scrollAnimationIdRef.current = requestAnimationFrame(handleScroll);
  }, [animateLine]);

  useEffect(() => {
    scrollAnimationIdRef.current = requestAnimationFrame(handleScroll);

    return () => {
      if (
        scrollAnimationIdRef.current !== null &&
        typeof scrollAnimationIdRef.current === "number"
      ) {
        cancelAnimationFrame(scrollAnimationIdRef.current);
      }

      if (
        lerpAnimationIdRef.current !== null &&
        typeof lerpAnimationIdRef.current === "number"
      ) {
        cancelAnimationFrame(lerpAnimationIdRef.current);
      }
    };
  }, [handleScroll]);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: "0px 0px -50% 0px",
      threshold: 0,
    };

    const handleIntersection: IntersectionObserverCallback = (entries) => {
      setActiveIndices((currentIndices) => {
        const currentActiveIndicesSet = new Set(currentIndices);
        let indicesChanged = false;
        entries.forEach((entry) => {
          const targetElement = entry.target as HTMLElement;
          const indexStr = targetElement.dataset.index;
          if (indexStr === undefined) return;
          const index = parseInt(indexStr, 10);

          if (entry.isIntersecting) {
            if (!currentActiveIndicesSet.has(index)) {
              currentActiveIndicesSet.add(index);
              indicesChanged = true;
            }
          } else {
            if (currentActiveIndicesSet.has(index)) {
              currentActiveIndicesSet.delete(index);
              indicesChanged = true;
            }
          }
        });

        return indicesChanged
          ? Array.from(currentActiveIndicesSet).sort((a, b) => a - b)
          : currentIndices;
      });
    };

    const observer = new IntersectionObserver(
      handleIntersection,
      observerOptions as IntersectionObserverInit,
    );

    const currentBlocks = blockRefs.current.filter(
      (el) => el !== null,
    ) as HTMLDivElement[];
    currentBlocks.forEach((el, index) => {
      el.dataset.index = index.toString();
      observer.observe(el);
    });

    return () => {
      currentBlocks.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, [data]);

  if (isLoading) return <Loader />;

  return (
    <div className={"block_wrapper"}>
      <div className={"flex flex-col items-center gap-[60px] w-full"}>
        <Subtitle text={"How it`s works"} />

        <div
          ref={containerRef}
          className={"flex gap-[26px] relative w-full lg:gap-0"}
        >
          <div
            ref={lineRef}
            className={
              "no-transition w-[2px] h-auto lg:absolute lg:left-1/2 lg:right-1/2 lg:top-0 lg:bottom-0"
            }
          >
            <div className={"relative w-[2px] h-full bg-gray"}>
              <div
                className={"absolute top-0 left-0 w-[2px] h-full bg-white"}
                style={{
                  transform: `scaleY(${lineProgress})`,
                  transformOrigin: "top",
                  willChange: "transform",
                }}
              ></div>
            </div>
          </div>

          <div
            className={
              "flex flex-col gap-[200px] w-full h-full lg:gap-[280px] xl:gap-[335px]"
            }
          >
            {data &&
              data.length > 0 &&
              data?.map(({ id, title, description }, index) => (
                <div
                  key={id}
                  ref={(el) => setBlockRef(el, index)}
                  className={`flex justify-start ${index % 2 === 0 ? "lg:justify-end" : "self-end"} w-full lg:w-[46%] transition-opacity duration-500 ease-in-out`}
                  style={{
                    opacity: activeIndices.includes(index) ? "100%" : "20%",
                  }}
                >
                  <HowItsWorkElement
                    index={index}
                    title={title}
                    description={description}
                  />
                </div>
              ))}
          </div>
        </div>

        <CallToAction />
      </div>
    </div>
  );
};

import { useState, useEffect, useRef, MouseEvent, TouchEvent } from "react";
import Image from "next/image";
import styles from "./PhotosDifference.module.css";
import { CustomImage, imageLoader } from "@/shared";

interface IPhotosDifferenceProps {
  onOpacityChange: () => void;
  handleSliderMove(percentage: number): void;
  DefaultPhotoPath: string;
  AIPhotoPath: string;
}

export const PhotosDifference = ({
  onOpacityChange,
  handleSliderMove,
  DefaultPhotoPath,
  AIPhotoPath,
}: IPhotosDifferenceProps) => {
  const [isInteracting, setIsInteracting] = useState<boolean>(false);

  const [lineAnimate, setLineAnimate] = useState<boolean>(false);
  const [addShadow, setAddShadow] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [shift, setShift] = useState<number | string>("50%");
  const [hasHovered, setHasHovered] = useState<boolean>(false);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const beforeRef = useRef<HTMLDivElement | null>(null);
  const changeRef = useRef<HTMLDivElement | null>(null);

  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 768px)").matches;

  useEffect(() => {
    if (isMobile) {
      document.documentElement.style.overflowY = isInteracting
        ? "hidden"
        : "auto";
      document.documentElement.style.touchAction = isInteracting
        ? "none"
        : "auto";

      document.body.style.overflowY = isInteracting ? "hidden" : "auto";
      document.body.style.touchAction = isInteracting ? "none" : "auto";
    }

    return () => {
      if (isMobile) {
        document.documentElement.style.overflowY = "auto";
        document.documentElement.style.touchAction = "auto";

        document.body.style.overflowY = "auto";
        document.body.style.touchAction = "auto";
      }
    };
  }, [isInteracting, isMobile]);

  const updateSlider = (clientX: number) => {
    if (!sliderRef.current || !beforeRef.current || !changeRef.current) return;

    const rect = sliderRef.current?.getBoundingClientRect();
    const maxShift = rect.width;
    const newShift = Math.max(0, Math.min(clientX - rect.left, maxShift));
    const shiftPercentage = (newShift / maxShift) * 100;

    setShift(newShift);
    handleSliderMove(shiftPercentage);

    if (shiftPercentage >= 90 || shiftPercentage <= 10) {
      setAddShadow(true);
    } else {
      setAddShadow(false);
    }

    onOpacityChange();

    if (beforeRef.current) {
      if ("style" in beforeRef.current) {
        beforeRef.current.style.width = "100%";
        beforeRef.current.style.clip = `rect(0, ${newShift}px, auto, 0)`;
      }
    }

    if (changeRef.current) {
      if ("style" in changeRef.current) {
        changeRef.current.style.left = `${newShift}px`;
      }
    }
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (isActive) {
      updateSlider(e.clientX);
    }
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (isActive && e.touches[0]) {
      updateSlider(e.touches[0].clientX);
    }
  };

  const handleEnd = () => {
    setIsActive(false);
    setIsInteracting(false);
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleStart = () => {
      setIsActive(true);
      setHasHovered(false);
      setIsInteracting(true);
    };

    slider.addEventListener("mousedown", handleStart);
    slider.addEventListener("touchstart", handleStart, { passive: true });
    window.addEventListener("mouseup", handleEnd);
    window.addEventListener("touchend", handleEnd);

    return () => {
      slider.removeEventListener("mousedown", handleStart);
      slider.removeEventListener("touchstart", handleStart);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchend", handleEnd);
    };
  }, []);

  useEffect(() => {
    if (!changeRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            setLineAnimate(true);
          } else {
            entry.target.classList.remove("visible");
            setLineAnimate(false);
          }
        });
      },
      {
        threshold: 0.5,
      },
    );

    if (changeRef.current) {
      observer.observe(changeRef.current);
    }

    return () => {
      if (changeRef.current) {
        observer.unobserve(changeRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (!hasHovered && typeof shift !== "number") {
      setHasHovered(true);
    }
  };

  return (
    <div
      className="flex items-center justify-center max-w-[636px] aspect-square px-6 py-14 w-full lg:w-1/2 lg:my-4 lg:p-0"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseEnter={handleMouseEnter}
    >
      <div ref={sliderRef} className="max-w-[517px] aspect-square w-full">
        <div className={`z-0 relative w-full h-full`}>
          <div
            ref={beforeRef}
            className="no-transition before w-1/2 absolute h-full left-0 top-0 z-10"
          >
            {DefaultPhotoPath.length > 0 && (
              <CustomImage
                width={290}
                height={290}
                src={DefaultPhotoPath}
                alt={"Photo Image"}
                loading={"lazy"}
                loader={imageLoader}
                className={
                  "max-w-[517px] aspect-square w-full h-full overflow-hidden select-none object-cover object-left absolute top-0 block rounded-l-full"
                }
              />
            )}
          </div>

          <div
            ref={changeRef}
            style={{
              left: `${shift}px`,
            }}
            onMouseEnter={() => setAddShadow(true)}
            onMouseLeave={() => setAddShadow(false)}
            className={`flex absolute justify-center top-0 z-30 w-[2px] h-full left-1/2 no-transition ${styles.ChangeDriver} ${addShadow ? "after:shadow-[0_0_8px_#fafafa] before:shadow-[0_0_8px_#fafafa]" : ""} ${lineAnimate ? "before:!scale-y-125 before:lg:!scale-y-100 before:xl:!scale-y-125 after:!scale-y-125 after:lg:!scale-y-100 after:xl:!scale-y-125" : "before:!scale-y-0 after:!scale-y-0"}`}
          >
            <div
              data-cursor-text={
                hasHovered ? "Move the slider to compare" : undefined
              }
              data-type-block={"noLink"}
              className="flex justify-center items-center absolute top-[43.5%] ml-[0.03rem] cursor-pointer w-[115px] h-[58px] no-transition md:w-[124px] md:h-[68px]"
            >
              <Image
                width={124}
                height={68}
                src="/icons/toddler.svg"
                alt="Toddler"
                className="w-[115px] h-[58px] select-none no-transition pointer-events-none md:w-[124px] md:h-[68px]"
                loading="lazy"
              />
            </div>
          </div>

          <div
            className="no-transition after"
            data-cursor-text={
              hasHovered ? "Move the slider to compare" : undefined
            }
            data-type-block={"noLink"}
          >
            {AIPhotoPath.length > 0 && (
              <CustomImage
                width={290}
                height={290}
                src={AIPhotoPath}
                alt={"AI Image"}
                loading={"lazy"}
                loader={imageLoader}
                className={
                  "max-w-[517px] aspect-square w-full absolute object-cover select-none top-0 block rounded-r-full"
                }
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

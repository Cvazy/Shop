import { Billet, GalleryContainer } from "./components";
import SplitText from "@/components/SplitText/SplitText";
import { ActionButton } from "@/shared";
import Link from "next/link";
import StarBorder from "@/components/StarBorder/StarBorder";
import ShinyText from "@/components/ShinyText/ShinyText";

export const Gallery = () => {
  return (
    <div className={"relative h-[150vh] w-screen"}>
      <Billet />

      <GalleryContainer />

      <div
        className={
          "relative z-30 pointer-events-none no-transition h-[150vh] w-screen"
        }
      >
        <div
          className={
            "flex items-center justify-center no-transition h-[150vh] w-screen"
          }
        >
          <div
            className={
              "flex flex-col items-center gap-10 no-transition py-40 sticky top-0 bottom-0 px-10 w-full md:py-120"
            }
          >
            <SplitText
              text="Difference in Visuals."
              className={
                "h-20 text-4xl text-white text-center no-transition !leading-none sm:h-12 sm:text-[40px] md:h-14 md:text-5xl lg:h-16 lg:text-6xl xl:h-20 xl:text-[64px]"
              }
              delay={25}
              animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
              animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
              easing="easeOutCubic"
              threshold={0.1}
              rootMargin="-50px"
            />

            <div className={"block pointer-events-auto lg:hidden"}>
              <Link href={"/shop"} className={"w-full"}>
                <StarBorder className={"w-full"} textClassName={"!py-2.5"}>
                  <ShinyText text={"Go shop!"} disabled={false} speed={3} />
                </StarBorder>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

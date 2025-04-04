import Link from "next/link";
import { GooeyNav } from "@/widgets";
import GlitchText from "@/components/GlitchText/GlitchText";

export const Header = () => {
  return (
    <header
      className={
        "fixed top-0 left-0 z-20 px-7 w-full h-[132px] sm:px-8 md:h-36 lg:px-10 xl:px-12 xl:h-[152px]"
      }
    >
      <div className={"flex justify-center w-full"}>
        <div className={"max-w-limit w-full"}>
          <div className={"py-10 w-full"}>
            <div className={"flex items-center justify-between gap-5 w-full"}>
              <Link href={"/"}>
                <GlitchText
                  speed={4}
                  className={"text-5xl font-semibold md:text-6xl xl:text-7xl"}
                >
                  alco
                </GlitchText>
              </Link>

              <GooeyNav
                items={[
                  { label: "Home", href: "/" },
                  { label: "About", href: "/about" },
                  { label: "Contact", href: "/contact" },
                ]}
                animationTime={600}
                colors={[1, 2, 3, 1, 2, 3, 1, 4]}
                timeVariance={300}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

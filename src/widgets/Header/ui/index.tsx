"use client";

import Link from "next/link";
import { GooeyNav, MobileMenu } from "@/widgets";
import GlitchText from "@/components/GlitchText/GlitchText";
import { useState } from "react";
import { BurgerMenuButton } from "@/features";

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header
      className={
        "fixed top-0 left-0 z-30 px-7 w-full h-[132px] sm:px-8 md:h-36 lg:px-10 xl:px-12 xl:h-[152px]"
      }
    >
      <MobileMenu isOpen={isMobileMenuOpen} />

      <div className={"flex justify-center relative z-40 w-full"}>
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

              <div className={"hidden lg:block"}>
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

              <div className={"block lg:hidden"}>
                <BurgerMenuButton
                  isOpen={isMobileMenuOpen}
                  onClick={toggleMenu}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

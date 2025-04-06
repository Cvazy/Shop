"use client";

import Link from "next/link";
import { HeaderNav, MobileMenu } from "@/widgets";
import { useState } from "react";
import { BurgerMenuButton } from "@/features";
import { Logo } from "@/shared";

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header
      className={
        "absolute top-0 left-0 z-20 px-7 w-full h-[132px] sm:px-8 md:h-36 lg:px-10 xl:px-12 xl:h-[152px]"
      }
    >
      <MobileMenu isOpen={isMobileMenuOpen} toggleMenu={toggleMenu} />

      <div className={"flex justify-center relative z-40 w-full"}>
        <div className={"max-w-limit w-full"}>
          <div className={"py-10 w-full"}>
            <div className={"flex items-center justify-between gap-5 w-full"}>
              <Link href={"/"}>
                <Logo />
              </Link>

              <div className={"hidden lg:block"}>
                <HeaderNav
                  items={[
                    { label: "Home", href: "/" },
                    { label: "Shop", href: "/shop" },
                    { label: "About", href: "/about" },
                  ]}
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

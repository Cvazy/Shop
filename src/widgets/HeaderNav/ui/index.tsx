"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface IHeaderNav {
  items: { label: string; href: string }[];
}

export const HeaderNav = ({ items }: IHeaderNav) => {
  const pathname = usePathname();

  return (
    <nav
      className="flex relative"
      style={{ transform: "translate3d(0,0,0.01px)" }}
    >
      <ul
        className="flex gap-8 list-none p-0 px-4 m-0 relative z-[3]"
        style={{
          color: "white",
          textShadow: "0 1px 1px hsl(205deg 30% 10% / 0.2)",
        }}
      >
        {items.map(({ label, href }, index) => (
          <li
            key={index}
            className={`flex rounded-xl relative cursor-pointer transition-[background-color_color_box-shadow] duration-300 ease shadow-[0_0_0.5px_1.5px_transparent] ${
              pathname === href
                ? "text-foreground bg-white"
                : "bg-transparent text-white"
            }`}
          >
            <Link href={href} className={"outline-none py-2 px-4"}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

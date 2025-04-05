import { NavItem } from "./NavItem";

export const Navigation = ({ toggleMenu }: { toggleMenu: () => void }) => {
  return (
    <nav className={"w-full"}>
      <ul
        className={
          "flex flex-col items-start gap-5 p-0 m-0 list-none w-full md:gap-8"
        }
      >
        <NavItem toggleMenu={toggleMenu} text={"About"} link={"/about"} />

        <NavItem toggleMenu={toggleMenu} text={"Contact"} link={"/contact"} />

        <NavItem toggleMenu={toggleMenu} text={"Shop"} link={"/shop"} />

        <NavItem toggleMenu={toggleMenu} text={"Authorize"} link={"/auth"} />
      </ul>
    </nav>
  );
};

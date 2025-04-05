import Link from "next/link";

interface INavItemProps {
  text: string;
  link: string;
  toggleMenu: () => void;
}

export const NavItem = ({ text, link, toggleMenu }: INavItemProps) => {
  return (
    <li onClick={toggleMenu} className={`flex items-center h-nav_item`}>
      <Link
        href={link}
        className={`font-inter font-medium uppercase text-gray text-40px leading-42px hover:text-background transition-all duration-300 whitespace-nowrap text-left`}
      >
        {text}
      </Link>
    </li>
  );
};

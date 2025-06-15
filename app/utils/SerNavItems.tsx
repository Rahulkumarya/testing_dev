"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

export const NavItemsData = [
  { name: "Home", url: "/services" },
  { name: "AddServices", url: "/services/component/addservices" },
  { name: "About", url: "/services/component/about" },
  { name: "Policy", url: "/services/component/policy" },
  { name: "FAQ", url: "/services/component/faq" },

];

type Props = {
  isMobile: boolean;
};

const NavItems: React.FC<Props> = ({ isMobile }) => {
  const pathname = usePathname(); // ✅ read current route

  // helper to decide if this item is active
  const isActive = (url: string) => {
    // exact match:
    return pathname === url;
    // or for “starts with” (e.g. child routes):
    // return pathname.startsWith(url);
  };

  const renderDesktop = () => (
    <div className="hidden 800px:flex md:flex lg:flex sm:flex text-black">
      {NavItemsData.map((item) => (
        <Link href={item.url} key={item.name} passHref>
          <span
            className={`
              text-[18px] px-6 font-Poppins font-[400]
              ${
                isActive(item.url)
                  ? "dark:text-[#37a39a] text-blue-500"
                  : "text-black"
              }
            `}
          >
            {item.name}
          </span>
        </Link>
      ))}
    </div>
  );

  const renderMobile = () => (
    <div className="flex flex-col mt-5 ml-5 my-2 gap-4 800px:hidden sm:hidden lg:hidden md:hidden">
      <div className="w-full text-center py-6">
        <Link href="/" passHref>
          <span className="text-[25px] font-Poppins font-[500] text-black">
            UronHealth
          </span>
        </Link>
      </div>
      {NavItemsData.map((item) => (
        <Link href={item.url} key={item.name} passHref>
          <span
            className={`
              text-[18px] py-2 font-Poppins font-[400]
              ${
                isActive(item.url)
                  ? "dark:text-[#37a39a] text-blue-500"
                  : "text-black"
              }
            `}
          >
            {item.name}
          </span>
        </Link>
      ))}
    </div>
  );

  return (
    <>
      {renderDesktop()}
      {isMobile && renderMobile()}
    </>
  );
};

export default NavItems;

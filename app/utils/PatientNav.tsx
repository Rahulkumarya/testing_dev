"use client"
import Link from "next/link";
import React from "react";
import SoSButton from "./sos/SosButton";

export type NavItem = {
  name: string;
  url?: string; // only for real links
  action?: React.ReactNode; // for buttons or custom components
};

export const NavItemsData: NavItem[] = [
  { name: "Home", url: "/" },
  { name: "Insurance", url: "/patient/insurance" },
  { name: "Appointment", url: "/patient/appointment" },
  { name: "FAQ", url: "/patient/faq" },
  {
    name: "SoS",
    action: <SoSButton />,
  },
];

type Props = {
  activeItem: number;
  isMobile: boolean;
};

const NavItems: React.FC<Props> = ({ activeItem, isMobile }) => {
  const renderItem = (item: NavItem, index: number) => {
    // If there's a custom action, render it directly
    if (item.action) {
      return (
        <span key={index} className="px-6">
          {item.action}
        </span>
      );
    }
    if (item.url) {
      return (
        <Link href={item.url} key={index} passHref>
          <span
            className={`${
              activeItem === index
                ? "dark:text-[#37a39a] text-[crimson]"
                : " text-black"
            } text-[18px] px-6 font-Poppins font-[400]`}
          >
            {item.name}
          </span>
        </Link>
      );
    }
    return null;
  };

  return (
    <>
      <div className="hidden 800px:flex md:flex lg:flex sm:flex text-black">
        {NavItemsData &&
          NavItemsData.map((item, index) => renderItem(item, index))}
      </div>
      {isMobile && (
        <div className="flex flex-col mt-5 ml-5 my-2 gap-4 800px:hidden sm:hidden lg:hidden md:hidden">
          <div className="w-full text-center py-6">
            <Link href={"/"} passHref>
              <span
                className={`text-[25px] font-Poppins font-[500] text-black `}
              >
                UronHealth
              </span>
            </Link>
          </div>
          {NavItemsData &&
            NavItemsData.map((item, index) => {
              if (item.action) {
                return (
                  <span key={index} className="py-2">
                    {item.action}
                  </span>
                );
              }
              if (item.url) {
                return (
                  <Link href={item.url} key={index} passHref>
                    <span
                      className={`${
                        activeItem === index
                          ? "dark:text-[#37a39a] text-[crimson]"
                          : " text-black"
                      } text-[18px] py-2 font-Poppins font-[400]`}
                    >
                      {item.name}
                    </span>
                  </Link>
                );
              }
              return null;
            })}
        </div>
      )}
    </>
  );
};

export default NavItems;

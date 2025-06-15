"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import NavItems from "../../utils/PatientNav";
import { useSelector } from "react-redux";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useSocialAuthMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
import { RootState } from "@/redux/store";
import LoginPage from "./register/page";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);
  const { data } = useSession();
  const [socialAuth, { isSuccess }] = useSocialAuthMutation();

  // Social login effect
  useEffect(() => {
    if (!user && data?.user) {
      socialAuth({
        email: data.user.email || '',
        name: data.user.name || '',
        avatar: data.user.image || '',
      });
    }
    if (isSuccess) {
      toast.success("Login Successfully");
    }
  }, [data, isSuccess, socialAuth, user]);

  // Sticky header on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".dropdown-avatar")) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Close mobile sidebar when clicking overlay
  const handleCloseSidebar = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget.id === "screen") {
      setOpenSidebar(false);
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 bg-blue-50 shadow-sm border-b h-[80px]">
        <div className="container mx-auto px-4 h-full">
          <div
            className={`flex justify-between items-center h-full transition-all duration-300 ${
              isScrolled ? "shadow-sm" : ""
            }`}
          >
            <Link
              href="/"
              className="text-[25px] font-Poppins font-[500] text-black"
            >
              UronHealth
            </Link>

            <div className="flex items-center space-x-4">
              <NavItems activeItem={0} isMobile={false} />

              {/* Mobile menu toggle */}
              <div className="800px:hidden sm:hidden md:hidden lg:hidden block ">
                <HiOutlineMenuAlt3
                  size={25}
                  className="cursor-pointer text-black"
                  onClick={() => setOpenSidebar(true)}
                />
              </div>

              {/* User avatar or login icon */}
              {user ? (
                <div className="relative dropdown-avatar flex items-center space-x-2">
                  <Image
                    src={user.avatar || "/assests/avatar.png"}
                    alt="User Avatar"
                    width={30}
                    height={30}
                    className="rounded-full cursor-pointer"
                    onClick={() => setShowDropdown((prev) => !prev)}
                  />
                  <span className="text-gray-700 hidden sm:block md:block lg:block">{user.name}</span>

                  {showDropdown && (
                    <div className="absolute mt-2 w-44 bg-white rounded-md shadow-lg border z-50 text-black top-7 right-4">
                      <Link
                        href="/profile"
                        className="px-4 py-2 hover:bg-gray-100 block"
                      >
                        Profile
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <HiOutlineUserCircle
                  size={25}
                  className="cursor-pointer text-black"
                  onClick={() => setOpen(true)}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sidebar */}
      {openSidebar && (
        <div
          className="fixed w-full h-screen top-0 left-0 z-[99999] bg-opacity-50"
          id="screen"
          onClick={handleCloseSidebar}
        >
          <div className="w-[70%] fixed z-[100000] h-screen bg-white top-0 right-0 text-black">
            <NavItems activeItem={0} isMobile={true} />
          </div>
        </div>
      )}

      {/* Render LoginPage when `open` is true */}
      {open && <LoginPage />}
    </>
  );
};

export default Header;



//remove dark mode
"use client";
import Link from "next/link";
import React, { FC, useState, useEffect } from "react";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";

import NavItems from "../../utils/SerNavItems";
import CustomModel from "../../utils/CustomModel";
import Login from "./Auth/LoginForm";
import SignUp from "./Auth/SignUpForm";
import Verification from "./Auth/VerificationForm";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import avatar from "../../../public/assests/avatar.png";
import { useSession } from "next-auth/react";
import { useSocialAuthMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
import { useLogoutMutation } from "@/redux/features/auth/authApi";
import { useRouter } from "next/navigation";
type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route: string;
  setRoute: (route: string) => void;
  logOutHandler: () => void;
};

const Header: FC<Props> = ({ open, setOpen, activeItem, route, setRoute, }) => {
    const [active, setActive] = useState(false);
    const [openSidebar, setOpenSidebar] = useState(false);
    const dispatch = useDispatch();
    const { user } = useSelector((state: any) => state.auth);
    const { data } = useSession();
    const [socialAuth, { isSuccess, error }] = useSocialAuthMutation();
    const [showDropdown, setShowDropdown] = useState(false);
const [logout,{isLoading}]=useLogoutMutation()
const router=useRouter();

    const handleLogout = async() => {
      try {
        const res=await logout().unwrap();
        console.log(`response logout`,res);
        // Optionally redirect or show a message after logout
        router.push("/");
      } catch (err) {
        console.error("Failed to logout:", err);
      }
      };

    

    useEffect(() => {
        if (!user && data) {
            socialAuth({
                emal: data?.user?.email,
                name: data?.user?.name,
                avatar: data.user?.image,
            });
        }
        if (isSuccess) {
            toast.success("Login Successfully");
        }
    }, [data, isSuccess, socialAuth, user]);


    //handle close after login pop
    useEffect(() => {
      const handleClickOutside = (e: any) => {
        if (!e.target.closest(".dropdown-avatar")) {
          setShowDropdown(false);
        }
      };

      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }, []);
    useEffect(() => {
        const handleScroll = () => {
            setActive(window.scrollY > 80);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleClose = (e: any) => {
        if (e.target.id === "screen") {
            setOpenSidebar(false);
        }
    };

    return (
      <div className="w-full relative container mx-auto">
        <div
          className={`${
            active
              ? " fixed top-0 left-0 w-full h-[80px] z-[80] border-t-0 border-l-0 border-r-0 border-b md:border-b-0 sm:border-b-0  shadow-x md:shadow-blue-50 lg:shadow-amber-50 transition duration-500" // MOD: removed dark mode and set bg to white
              : "w-full border-t-0 border-l-0 border-r-0 sm:border-b-0 md:border-b-0  h-[80px] z-[80] shadow" // MOD: removed dark class
          }`}
        >
          <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
            <div className="w-full h-[80px] flex items-center justify-between p-3">
              <div>
                <Link
                  href="/"
                  className="text-[25px] font-Poppins font-[500] text-black "
                >
                  UronHealth
                </Link>
              </div>
              <div className="flex items-center text-black">
                <NavItems activeItem={activeItem} isMobile={false} />

                {/* //   only for mobile for responsiveness*/}
                <div className="800px:hidden block md:hidden sm:hidden lg:hidden">
                  <HiOutlineMenuAlt3
                    size={25}
                    className="cursor-pointer  text-black"
                    onClick={() => setOpenSidebar(true)}
                  />
                </div>
                {user ? (
                  <div className="relative dropdown-avatar">
                    <Image
                      src={user.avatar ? user.avatar : avatar}
                      alt="User Avatar"
                      className="w-[30px] h-[30px] rounded-full cursor-pointer"
                      onClick={() => setShowDropdown((prev) => !prev)} // Toggle on click
                    />

                    {showDropdown && (
                      <div className="absolute right-0 mt-2 w-44 bg-white rounded-md shadow-lg border z-50 text-black">
                        <Link
                          href="services/dashboard"
                          className="px-4 py-2 hover:bg-gray-100 block"
                        >
                          Dashboard
                        </Link>
                        <Link
                          href="/profile"
                          className="px-4 py-2 hover:bg-gray-100 block"
                        >
                          Profile
                        </Link>
                        <Link
                          href="/settings"
                          className="px-4 py-2 hover:bg-gray-100 block"
                        >
                          Settings
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="text-left w-full px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <HiOutlineUserCircle
                    size={25}
                    className="hidden 800px:block md:block lg:block sm:block cursor-pointer text-black"
                    onClick={() => setOpen(true)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* mobile sidebar */}
        {openSidebar && (
          <div
            className="fixed w-full h-screen top-0 left-0 z-[99999] bg-white text-black" // MOD: removed dark:bg-[unset]
            onClick={handleClose}
            id="screen"
          >
            <div className="w-[70%] fixed z-[999999999] h-screen bg-white top-0 right-0 text-black">
              {" "}
              {/* MOD: removed dark:bg-slate-900 */}
              <NavItems activeItem={activeItem} isMobile={true} />
              <HiOutlineUserCircle
                size={25}
                className="cursor-pointer ml-5 my-2 text-black" // MOD: removed dark:text-white
                onClick={() => setOpen(true)}
              />
              <br />
              <br />
              <p className="text-[16px] px-2 pl-5 text-black">
                {" "}
                {/* MOD: removed dark:text-white */}
                Copyright &copy; 2025 UronHealth
              </p>
            </div>
          </div>
        )}

        {/* auth modals */}
        {route === "Login" && open && (
          <CustomModel
            open={open}
            setOpen={setOpen}
            setRoute={setRoute}
            activeItem={activeItem}
            component={Login}
          />
        )}
        {route === "Sign-up" && open && (
          <CustomModel
            open={open}
            setOpen={setOpen}
            setRoute={setRoute}
            activeItem={activeItem}
            component={SignUp}
          />
        )}
        {route === "Verification" && open && (
          <CustomModel
            open={open}
            setOpen={setOpen}
            setRoute={setRoute}
            activeItem={activeItem}
            component={Verification}
          />
        )}
      </div>
    );
};

export default Header;

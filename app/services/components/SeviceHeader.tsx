

// //remove dark mode
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

import { useSession } from "next-auth/react";
import { useSocialAuthMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
import { useLogoutMutation } from "@/redux/features/auth/authApi";
import { useRouter } from "next/navigation";
import {resetOnboarding} from "@/redux/features/onboarding/onboardingSlice"
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

console.log(`user register data serviceheader `,user)
    const handleLogout = async() => {
      try {
        const res=await logout().unwrap();
        console.log(`response logout`,res);
        dispatch(resetOnboarding());   //onboarding reset after logout 
        // Optionally redirect or show a message after logout
        router.push("/services");
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



    // const [showDropdown, setShowDropdown] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 0);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);
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
      <div className="fixed top-0 left-0 w-full z-50 bg-blue-50 shadow-sm border-b h-[80px]">
        <div className="w-full relative container mx-auto px-4 h-full">
          <div
            className={`flex justify-between items-center h-full transition-all duration-300 ${
              isScrolled ? "shadow-sm" : ""
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
                  <NavItems activeItem={0} isMobile={false} />

                  {/* if user don't login then shows after login hidden */}
                  {user ? (
                    <Link href="/services/selling/register">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition duration-300 mr-4 hidden">
                        Start Selling
                      </button>
                    </Link>
                  ) : (
                    <Link href="/services/selling/register">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition duration-300 mr-4">
                        Start Selling
                      </button>
                    </Link>
                  )}

                  {/* //   only for mobile for responsiveness*/}
                  {/* <div className="800px:hidden block md:hidden sm:hidden lg:hidden">
                    <HiOutlineMenuAlt3
                      size={25}
                      className="cursor-pointer  text-black "
                      onClick={() => setOpenSidebar(true)}
                    />
                  </div> */}
                  {user ? (
                    <div className="relative dropdown-avatar">
                      <Image
                        src={user.avatar ? user.avatar :"/assests/avatar.png"}
                        alt="User Avatar"
                        className="w-[30px] h-[30px] rounded-full cursor-pointer"
                        onClick={() => setShowDropdown((prev) => !prev)} // Toggle on click
                      />

                      {showDropdown && (
                        <div className="absolute right-0 mt-2 w-44 bg-white rounded-md shadow-lg border z-50 text-black">
                          <Link
                            href="/services/dashboard"
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
                    <>
                      <HiOutlineUserCircle
                        size={25}
                        className="hidden  cursor-pointer text-black"
                        onClick={() => setOpen(true)}
                      />

                      <Link href="">
                        <button
                          className="bg-white text-blue-600 border border-blue-600 hover:bg-blue-50 font-semibold py-2 px-4 rounded-xl shadow-sm transition duration-300 mr-2"
                          onClick={() => setOpen(true)}
                        >
                          Login
                        </button>
                      </Link>
                    </>
                  )}

                  <div className="800px:hidden block md:hidden sm:hidden lg:hidden">
                    <HiOutlineMenuAlt3
                      size={25}
                      className="cursor-pointer  text-black "
                      onClick={() => setOpenSidebar(true)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* mobile sidebar */}
          {openSidebar && (
            <div
              className="fixed w-full h-screen top-0 left-0 z-[99999]  bg-opacity-50" // MOD: removed dark:bg-[unset]
              onClick={handleClose}
              id="screen"
            >
              <div className="w-[70%] fixed z-[999999999] h-screen bg-white top-0 right-0  text-black">
                {" "}
                {/* MOD: removed dark:bg-slate-900 */}
                <NavItems activeItem={0} isMobile={true} />
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
      </div>
    );
};

export default Header;
















// "use client";

// import Link from "next/link";
// import React, { FC, useState, useEffect } from "react";
// import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
// import NavItems from "../../utils/SerNavItems";
// import Image from "next/image";
// import avatar from "../../../public/assests/avatar.png";
// import { useDispatch, useSelector } from "react-redux";
// import { useSession } from "next-auth/react";
// import {
//   useSocialAuthMutation,
//   useLogoutMutation,
// } from "@/redux/features/auth/authApi";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";

// type Props = {
//   open: boolean;
//   setOpen: (open: boolean) => void;
//   activeItem: number;
//   route: string;
//   setRoute: (route: string) => void;
//   logOutHandler: () => void;
// };

// const Header: FC<Props> = ({ open, setOpen, activeItem, route, setRoute }) => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [openSidebar, setOpenSidebar] = useState(false);

//   const dispatch = useDispatch();
//   const { user } = useSelector((state: any) => state.auth);
//   const { data } = useSession();
//   const [socialAuth, { isSuccess }] = useSocialAuthMutation();
//   const [logout] = useLogoutMutation();
//   const router = useRouter();

//   // Social auth handling
//   useEffect(() => {
//     if (!user && data) {
//       socialAuth({
//         email: data?.user?.email,
//         name: data?.user?.name,
//         avatar: data?.user?.image,
//       });
//     }

//     if (isSuccess) {
//       toast.success("Login Successfully");
//     }
//   }, [data, isSuccess, socialAuth, user]);

//   // Sticky header effect
//   useEffect(() => {
//     const onScroll = () => {
//       setIsScrolled(window.scrollY > 0);
//     };
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (e: any) => {
//       if (!e.target.closest(".dropdown-avatar")) {
//         setShowDropdown(false);
//       }
//     };
//     document.addEventListener("click", handleClickOutside);
//     return () => document.removeEventListener("click", handleClickOutside);
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await logout().unwrap();
//       router.push("/");
//     } catch (err) {
//       console.error("Logout failed:", err);
//     }
//   };

//   const handleCloseSidebar = (e: any) => {
//     if (e.target.id === "screen") {
//       setOpenSidebar(false);
//     }
//   };

//   return (
//     <header className="fixed top-0 left-0 w-full z-50 bg-blue-50 shadow-sm border-b h-[80px]">
//       <div className="w-full relative container mx-auto px-4 h-full">
//         <div
//           className={`flex justify-between items-center h-full transition-all duration-300 ${
//             isScrolled ? "shadow-sm" : ""
//           }`}
//         >
//           {/* Logo */}
//           <Link
//             href="/"
//             className="text-[25px] font-semibold text-black font-Poppins"
//           >
//             UronHealth
//           </Link>

//           {/* Desktop Nav */}
//           <div className="hidden 800px:flex sm:flex md:flex lg:flex items-center text-black">
//             <NavItems activeItem={activeItem} isMobile={false} />
//           </div>

//           {/* Mobile Menu */}
//           <div className="800px:hidden md:hidden sm:hidden lg:hidden">
//             <HiOutlineMenuAlt3
//               size={25}
//               className="cursor-pointer text-black"
//               onClick={() => setOpenSidebar(true)}
//             />
//           </div>

//           {/* User Avatar or Login Icon */}
//           <div className="flex items-center gap-4 text-black">
//             {user ? (
//               <div className="relative dropdown-avatar">
//                 <Image
//                   src={user.avatar || avatar}
//                   alt="User"
//                   width={30}
//                   height={30}
//                   className="rounded-full cursor-pointer"
//                   onClick={() => setShowDropdown((prev) => !prev)}
//                 />
//                 {showDropdown && (
//                   <div className="absolute right-0 mt-2 w-44 bg-white rounded-md shadow-md border z-50">
//                     <Link
//                       href="/services/dashboard"
//                       className="px-4 py-2 block hover:bg-gray-100"
//                     >
//                       Dashboard
//                     </Link>
//                     <Link
//                       href="/profile"
//                       className="px-4 py-2 block hover:bg-gray-100"
//                     >
//                       Profile
//                     </Link>
//                     <Link
//                       href="/settings"
//                       className="px-4 py-2 block hover:bg-gray-100"
//                     >
//                       Settings
//                     </Link>
//                     <button
//                       onClick={handleLogout}
//                       className="w-full text-left px-4 py-2 hover:bg-gray-100"
//                     >
//                       Logout
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <HiOutlineUserCircle
//                 size={25}
//                 className="cursor-pointer"
//                 onClick={() => setOpen(true)}
//               />
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Mobile Sidebar */}
//       {openSidebar && (
//         <div
//           className="fixed top-0 left-0 w-full h-screen z-[9999] bg-opacity-30"
//           id="screen"
//           onClick={handleCloseSidebar}
//         >
//           <div className="w-[70%] h-full bg-white absolute top-0 right-0 z-[10000]">
//             <NavItems activeItem={activeItem} isMobile={true} />
//           </div>
//         </div>
//       )}


      
//     </header>
//   );
// };

// export default Header;

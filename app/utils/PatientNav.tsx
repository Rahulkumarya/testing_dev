


// "use client";
// import Link from "next/link";
// import React from "react";
// import { usePathname } from "next/navigation"; // ✅ import hook
// import SoSButton from "./sos/SosButton";

// export type NavItem = {
//   name: string;
//   url?: string;
//   action?: React.ReactNode;
// };

// export const NavItemsData: NavItem[] = [
//   { name: "Home", url: "/" },
//   { name: "Insurance", url: "/patient/component/insurance" },
//   { name: "Appointment", url: "/patient/component/appointment" },
//   { name: "FAQ", url: "/patient/faq" },
//   {
//     name: "SoS",
//     action: <SoSButton />,
//   },
// ];

// type Props = {
//   isMobile: boolean;
// };

// const NavItems: React.FC<Props> = ({ isMobile }) => {
//   const pathname = usePathname(); // ✅ get current route

//   const renderItem = (item: NavItem) => {
//     if (item.action) {
//       return (
//         <span key={item.name} className="px-6">
//           {item.action}
//         </span>
//       );
//     }

//     if (item.url) {
//       const isActive = pathname === item.url;

//       return (
//         <Link href={item.url} key={item.name} passHref>
//           <span
//             className={`${
//               isActive ? "dark:text-[#37a39a]  text-blue-500" : "text-black" //text-[crimson]
//             } text-[18px] px-6 font-Poppins font-[400]`}
//           >
//             {item.name}
//           </span>
//         </Link>
//       );
//     }

//     return null;
//   };

//   return (
//     <>
//       <div className="hidden 800px:flex md:flex lg:flex sm:flex text-black">
//         {NavItemsData.map((item) => renderItem(item))}
//       </div>

//       {isMobile && (
//         <div className="flex flex-col mt-5 ml-5 my-2 gap-4 800px:hidden sm:hidden lg:hidden md:hidden">
//           <div className="w-full text-center py-6">
//             <Link href={"/"} passHref>
//               <span className="text-[25px] font-Poppins font-[500] text-black">
//                 UronHealth
//               </span>
//             </Link>
//           </div>
//           {NavItemsData.map((item) => {
//             if (item.action) {
//               return (
//                 <span key={item.name} className="py-2">
//                   {item.action}
//                 </span>
//               );
//             }

//             if (item.url) {
//               const isActive = pathname === item.url;

//               return (
//                 <Link href={item.url} key={item.name} passHref>
//                   <span
//                     className={`${
//                       isActive
//                         ? "dark:text-[#37a39a] text-[crimson]"
//                         : "text-black"
//                     } text-[18px] py-2 font-Poppins font-[400]`}
//                   >
//                     {item.name}
//                   </span>
//                 </Link>
//               );
//             }

//             return null;
//           })}
//         </div>
//       )}
//     </>
//   );
// };

// export default NavItems;




"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import SoSButton from "./sos/SosButton";
import NotificationBell from "./sos/NotificationBell"; // ✅ NotificationBell import
import { store } from "../../redux/store"; // ✅ Redux hook
import { useSelector } from "react-redux"; // ✅ useSelector import
export type NavItem = {
  name: string;
  url?: string;
  action?: React.ReactNode;
};

export const NavItemsData: NavItem[] = [
  { name: "Home", url: "/" },
{name:"Contact Us", url:"/patient/contact"},
  { name: "FAQ", url: "/patient/faq" },
  {
    name: "SoS",
    action: <SoSButton />,
  },
];

type Props = {
  isMobile: boolean;
};

const NavItems: React.FC<Props> = ({ isMobile }) => {
  const pathname = usePathname();
  const user = useSelector((state: store) => state.auth.user);


  const userId=user?._id;
  // Render individual nav items or custom actions
  const renderItem = (item: NavItem) => {
    if (item.action) {
      return (
        <span key={item.name} className="px-6">
          {item.action}
        </span>
      );
    }

    if (item.url) {
      const isActive = pathname === item.url;

      return (
        <Link href={item.url} key={item.name} passHref>
          <span
            className={`${
              isActive ? "dark:text-[#37a39a] text-blue-500" : "text-black"
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
      {/* ----------- Desktop Navigation ----------- */}
      <div className="hidden sm:flex md:flex lg:flex text-black items-center gap-2">
        {NavItemsData.map((item) => renderItem(item))}

        {/* ✅ Notification bell shown only after login */}
        {userId && (
          <div className="ml-2">
            <NotificationBell userId={userId} />
          </div>
        )}
      </div>

      {/* ----------- Mobile Navigation ----------- */}
      {isMobile && (
        <div className="flex flex-col mt-5 ml-5 my-2 gap-4 sm:hidden lg:hidden md:hidden">
          {/* Mobile Logo */}
          <div className="w-full text-center py-6">
            <Link href="/" passHref>
              <span className="text-[25px] font-Poppins font-[500] text-black">
                UronHealth
              </span>
            </Link>
          </div>

          {/* Mobile Nav Items */}
          {NavItemsData.map((item) => {
            if (item.action) {
              return (
                <span key={item.name} className="py-2">
                  {item.action}
                </span>
              );
            }

            if (item.url) {
              const isActive = pathname === item.url;

              return (
                <Link href={item.url} key={item.name} passHref>
                  <span
                    className={`${
                      isActive
                        ? "dark:text-[#37a39a] text-[crimson]"
                        : "text-black"
                    } text-[18px] py-2 font-Poppins font-[400]`}
                  >
                    {item.name}
                  </span>
                </Link>
              );
            }

            return null;
          })}

          {/* ✅ Notification bell for mobile */}
          {userId && (
            <div className="mt-2">
              <NotificationBell userId={userId} />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default NavItems;

"use client";
import React from "react";
import { useNavBar } from "../context/navBarContext";
import Link from "next/link";
import Image from "next/image";

const NavBar = () => {
   const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useNavBar();

   return (
      <aside
         className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-bee-dark-100 dark:bg-bee-dark-800 dark:border-bee-dark-400 text-bee-dark-600 h-screen transition-all duration-300 ease-in-out z-50 border-r border-bee-dark-300 
        ${
           isExpanded || isMobileOpen
              ? "w-[290px]"
              : isHovered
                ? "w-[290px]"
                : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
         onMouseEnter={() => !isExpanded && setIsHovered(true)}
         onMouseLeave={() => setIsHovered(false)}
      >
         <div
            className={`py-8 flex  ${
               !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
            }`}
         >
            <Link href="/" className="flex items-center gap-0 mt-1 p-2">
               {isExpanded || isHovered || isMobileOpen ? (
                  <>
                     <Image
                        src="/image/logo.svg"
                        alt="Logo"
                        className="w-16"
                        width={60}
                        height={60}
                     />
                     <h1 className="text-3xl font-bold italic dark:text-white">
                        BeeFleet
                     </h1>
                  </>
               ) : (
                  <Image
                     src="/image/logo.svg"
                     alt="Logo"
                     width={60}
                     height={60}
                  />
               )}
            </Link>
         </div>
      </aside>
   );
};

export default NavBar;

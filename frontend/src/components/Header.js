"use client";
import React, { useState, useEffect } from "react";
import { useNavBar } from "@/context/navBarContext";
import Btn from "@/elements/btn";
import Icon from "@/elements/Icon";
import Link from "next/link";

const Header = () => {
   const { isMobileOpen, toggleNavBar, toggleMobileNavBar } = useNavBar();
   const handleToggle = () => {
      if (window.innerWidth >= 1024) {
         toggleNavBar();
      } else {
         toggleMobileNavBar();
      }
   };

   const [isAuthenticated, setIsAuthenticated] = useState(false);
   const [userName, setUserName] = useState("");

   useEffect(() => {
      const token = localStorage.getItem("token");
      const name = localStorage.getItem("name");

      if (token) {
         setIsAuthenticated(true);
      }

      if (name) {
         setUserName(name);
      }
   }, []);


   return (
      <header className="sticky top-0 flex w-full z-40 bg-bee-dark-100 border-b border-bee-dark-300 dark:border-bee-dark-400 dark:bg-bee-dark-800 lg:border-b">
         <div className="flex flex-col items-center justify-between grow lg:flex-row lg:px-6">
            <div className="flex items-center justify-between w-full gap-2 px-3 py-3 border-b border-bee-dark-100 dark:border-bee-dark-400 sm:gap-4 lg:justify-normal lg:border-b-0 lg:px-0 lg:py-4">
               <Btn variant="secondary" type="button" onClick={handleToggle}>
                  {isMobileOpen ? (
                     <Icon name="xMark" className="h-7" />
                  ) : (
                     <Icon name="closeLeft" className="h-7" strokeWidth={1.5} />
                  )}
               </Btn>
            </div>
            <div className="flex items-center gap-2 2xsm:gap-3">
               {!isAuthenticated ? (
                  <Link href="/login">
                     <Btn variant="primary" texto="Login" />
                  </Link>
               ) : (
                  <p>Olá, {userName}!</p>
               )}
            </div>
         </div>
      </header>
   );
};

export default Header;

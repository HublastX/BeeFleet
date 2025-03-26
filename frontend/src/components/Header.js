"use client";
import React from "react";
import { useNavBar } from "@/context/navBarContext";
import Modal from "./ModalLoginManager";
import Btn from "@/elements/btn";
import Icon from "@/elements/Icon";

const Header = () => {
   const { isMobileOpen, toggleNavBar, toggleMobileNavBar } = useNavBar();
   const handleToggle = () => {
      if (window.innerWidth >= 1024) {
         toggleNavBar();
      } else {
         toggleMobileNavBar();
      }
   };
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
         </div>
         <div className="flex items-center gap-2 2xsm:gap-3 pr-2">
            <Modal />
         </div>
      </header>
   );
};

export default Header;

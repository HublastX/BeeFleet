"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

const NavBarContext = createContext(undefined);

export const useNavBar = () => {
   const context = useContext(NavBarContext);
   if (!context) {
      throw new Error("useNavBar must be used within a NavBarProvider");
   }
   return context;
};

export const NavBarProvider = ({ children }) => {
   const [isExpanded, setIsExpanded] = useState(true);
   const [isMobileOpen, setIsMobileOpen] = useState(false);
   const [isMobile, setIsMobile] = useState(false);
   const [isHovered, setIsHovered] = useState(false);
   const [activeItem, setActiveItem] = useState(null);
   const [openSubmenu, setOpenSubmenu] = useState(null);

   useEffect(() => {
      const handleResize = () => {
         const mobile = window.innerWidth < 768;
         setIsMobile(mobile);
         if (!mobile) setIsMobile(false);
      };

      handleResize();
      window.addEventListener("resize", handleResize);
      return () => {
         window.removeEventListener("resize", handleResize);
      };
   }, []);

   const toggleNavBar = () => {
      setIsExpanded((prev) => !prev);
   };

   const toggleMobileNavBar = () => {
      setIsMobileOpen((prev) => !prev);
   };

   const toggleSubmenu = (item) => {
      setOpenSubmenu((prev) => (prev === item ? null : item));
   };

   return (
      <NavBarContext.Provider
         value={{
            isExpanded: isMobile ? false : isExpanded,
            isMobileOpen,
            isHovered,
            activeItem,
            openSubmenu,
            toggleNavBar,
            toggleMobileNavBar,
            setIsHovered,
            setActiveItem,
            toggleSubmenu,
         }}
      >
         {children}
      </NavBarContext.Provider>
   );
};

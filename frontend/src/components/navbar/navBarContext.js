"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";

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
   const { gestor } = useAuth();

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
      if (gestor) {  
         setIsExpanded((prev) => !prev);
      }
   };

   const toggleMobileNavBar = () => {
      setIsMobileOpen((prev) => !prev);
   };

   const toggleSubmenu = (item) => {
      if (gestor) { 
         setOpenSubmenu((prev) => (prev === item ? null : item));
      }
   };

   const handleHover = (hoverState) => {
      if (gestor) {  
         setIsHovered(hoverState);
      }
   };

   return (
      <NavBarContext.Provider
         value={{
            isExpanded: isMobile ? false : (gestor ? isExpanded : false),
            isMobileOpen,
            isHovered,
            activeItem,
            openSubmenu,
            toggleNavBar,
            toggleMobileNavBar,
            setIsHovered: handleHover,
            setActiveItem,
            toggleSubmenu,
         }}
      >
         {children}
      </NavBarContext.Provider>
   );
};

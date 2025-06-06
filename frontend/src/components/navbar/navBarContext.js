"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { trackUIInteraction, trackNavigation } from "@/utils/analytics";

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
         const newState = !isExpanded;
         setIsExpanded(newState);
         trackUIInteraction("navbar", newState ? "expand" : "collapse", {
            device: isMobile ? "mobile" : "desktop",
         });
      }
   };

   const toggleMobileNavBar = () => {
      const newState = !isMobileOpen;
      setIsMobileOpen(newState);
      trackUIInteraction("navbar_mobile", newState ? "open" : "close");
   };

   const toggleSubmenu = (item) => {
      if (gestor) {
         const newState = openSubmenu === item ? null : item;
         setOpenSubmenu(newState);
         if (newState) {
            trackUIInteraction("submenu", "open", { menu_item: item });
         }
      }
   };

   const handleHover = (hoverState) => {
      if (gestor) {
         setIsHovered(hoverState);
         if (hoverState) {
            trackUIInteraction("navbar", "hover");
         }
      }
   };

   const handleActiveItemChange = (newItem) => {
      if (activeItem !== newItem) {
         trackNavigation(activeItem, newItem);
         setActiveItem(newItem);
      }
   };

   return (
      <NavBarContext.Provider
         value={{
            isExpanded: isMobile ? false : gestor ? isExpanded : false,
            isMobileOpen,
            isHovered,
            activeItem,
            openSubmenu,
            toggleNavBar,
            toggleMobileNavBar,
            setIsHovered: handleHover,
            setActiveItem: handleActiveItemChange,
            toggleSubmenu,
         }}
      >
         {children}
      </NavBarContext.Provider>
   );
};

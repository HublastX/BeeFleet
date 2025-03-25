import { useNavBar } from "../context/navBarContext";
import React from "react";

const Backdrop = () => {
   const { isMobileOpen, toggleMobileNavBar } = useNavBar();

   if (!isMobileOpen) return null;

   return (
      <div
         className="fixed inset-0 z-40 bg-gray-900/50 lg:hidden"
         onClick={toggleMobileNavBar}
      />
   );
};

export default Backdrop;

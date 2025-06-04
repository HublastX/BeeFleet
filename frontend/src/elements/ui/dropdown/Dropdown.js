"use client";
import React from "react";
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Dropdown = ({ isOpen, onClose, children, className = "" }) => {
   const dropdownRef = useRef(null);

   useEffect(() => {
      const handleClickOutside = (event) => {
         if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target) &&
            !event.target.closest(".dropdown-toggle")
         ) {
            onClose();
         }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, [onClose]);

   return (
      <AnimatePresence>
         {isOpen && (
            <motion.div
               ref={dropdownRef}
               initial={{ opacity: 0, y: -10, scale: 0.95 }}
               animate={{ opacity: 1, y: 0, scale: 1 }}
               exit={{ opacity: 0, y: -10, scale: 0.95 }}
               transition={{ type: "spring", stiffness: 300, damping: 20 }}
               className={`absolute z-40 right-0 mt-2 rounded-xl border border-gray-200 shadow-theme-lg dark:border-gray-800 ${className}`}
            >
               {children}
            </motion.div>
         )}
      </AnimatePresence>
   );
};

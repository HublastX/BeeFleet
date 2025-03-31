"use client";
import React, { useState } from "react";
import Icon from "./Icon";
import { Dropdown } from "./ui/dropdown/Dropdown";
import { DropdownItem } from "./ui/dropdown/DropdownItem";

export default function Select({
   name,
   lista,
   icon,
   onSelect,
}) {
   const [isOpen, setIsOpen] = useState(false);

   function toggleDropdown(e) {
      e.stopPropagation();
      setIsOpen((prev) => !prev);
   }

   function closeDropdown() {
      setIsOpen(false);
   }

   const handleSelect = (value) => {
      onSelect(value);
      closeDropdown();
   };

   return (
      <div className="relative">
         <button
            onClick={toggleDropdown}
            className="px-4 py-2 border rounded-md text-bee-dark-600 dark:text-bee-dark-100 bg-white dark:bg-bee-dark-800 border-bee-dark-300 dark:border-bee-dark-400 focus:outline-none focus:ring-2 focus:ring-bee-yellow-700 flex items-center gap-2"
         >
            <Icon name={icon} className="w-5 h-5 " strokeWidth={2} />
            {name}
         </button>

         <Dropdown
            isOpen={isOpen}
            onClose={closeDropdown}
            className="absolute right-0 mt-[17px] flex w-[260px] flex-col rounded-2xl border border-bee-dark-300 bg-white p-3 shadow-theme-lg dark:border-bee-dark-600 dark:bg-bee-dark-400"
         >
            <ul className="flex flex-col gap-1 pt-4 pb-3 border-b border-bee-dark-300 dark:border-bee-dark-800">
               {lista.map((li, index) => (
                  <DropdownItem
                     key={index}
                     onItemClick={() => handleSelect(li)}
                     className="flex items-center gap-3 px-3 py-2 font-medium text-bee-dark-600 rounded-lg group text-theme-sm hover:bg-bee-alert-600 dark:text-white dark:hover:bg-bee-alert-600"
                  >
                     {li}
                  </DropdownItem>
               ))}
            </ul>
         </Dropdown>
      </div>
   );
}

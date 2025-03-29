"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Dropdown } from "@/elements/ui/dropdown/Dropdown";
import { DropdownItem } from "@/elements/ui/dropdown/DropdownItem";
import Btn from "@/elements/btn";
import Icon from "@/elements/Icon";

export default function NotificationDropdown() {
   const [isOpen, setIsOpen] = useState(false);
   const [notifying, setNotifying] = useState(true);

   function toggleDropdown() {
      setIsOpen(!isOpen);
   }

   function closeDropdown() {
      setIsOpen(false);
   }

   const handleClick = () => {
      toggleDropdown();
      setNotifying(false);
   };
   return (
      <div className="relative">
         <Btn
            variant="secondary"
            onClick={handleClick}
            className="dropdown-toggle"
         >
            <span
               className={`absolute right-0 top-0.5 z-10 h-2 w-2 rounded-full bg-bee-alert-300 ${
                  !notifying ? "hidden" : "flex"
               }`}
            >
               <span className="absolute inline-flex w-full h-full bg-orange-400 rounded-full opacity-75 animate-ping"></span>
            </span>
            <Icon name="sino" className="w-7 h-7" />
         </Btn>

         <Dropdown
            isOpen={isOpen}
            onClose={closeDropdown}
            className="absolute -right-[240px] mt-[17px] flex h-[480px] w-[350px] flex-col justify-between rounded-2xl border border-bee-dark-300 bg-bee-dark-100 p-3 shadow-theme-lg dark:border-bee-dark-800 dark:bg-bee-dark-400 sm:w-[361px] lg:right-0"
         >
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-bee-dark-300 ">
               <h5 className="text-lg font-semibold text-bee-dark-600 dark:text-white">
                  Notificação
               </h5>

               <button
                  onClick={toggleDropdown}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
               >
                  <Icon name="xMark" />
               </button>
            </div>
            <ul className="flex flex-col h-auto overflow-y-auto custom-scrollbar">
               <li>
                  <DropdownItem
                     onItemClick={closeDropdown}
                     className="flex gap-3 rounded-lg p-3 px-4.5 py-3  hover:bg-bee-alert-600"
                  >
                     <span className="relative block w-full h-10 rounded-full z-1 max-w-10">
                        <Icon name="UserCircle" />
                        <span className="absolute bottom-0 right-0 z-10 h-2.5 w-full max-w-2.5 rounded-full border-[1.5px] border-white bg-bee-alert-100 dark:border-gray-900"></span>
                     </span>

                     <span className="block text-left">
                        <span className="mb-1.5 space-x-1 block text-theme-sm text-gray-500 dark:text-gray-400">
                           <span className="font-medium text-gray-800 dark:text-white/90">
                              Luizinho fotocopia
                           </span>
                           <span>fez um pedido para retirar carro</span>
                        </span>

                        <span className="flex items-center gap-2 text-gray-500 text-theme-xs dark:text-gray-400">
                           <span>5 min ago</span>
                        </span>
                     </span>
                  </DropdownItem>
               </li>

               <li>
                  <DropdownItem
                     onItemClick={closeDropdown}
                     className="flex gap-3 rounded-lg p-3 px-4.5 py-3  hover:bg-bee-alert-600"
                  >
                     <span className="relative block w-full h-10 rounded-full z-1 max-w-10">
                        <Image
                           width={40}
                           height={40}
                           src="/web-app-manifest-192x192.png"
                           alt="User"
                           className="w-full overflow-hidden rounded-full"
                        />
                        <span className="absolute bottom-0 right-0 z-10 h-2.5 w-full max-w-2.5 rounded-full border-[1.5px] border-white bg-bee-alert-100 dark:border-gray-900"></span>
                     </span>

                     <span className="block text-left">
                        <span className="mb-1.5 block space-x-1  text-theme-sm text-gray-500 dark:text-gray-400">
                           <span className="font-medium text-gray-800 dark:text-white/90">
                              Alena Franci
                           </span>
                           <span> fez um pedido para retirar carro</span>
                        </span>

                        <span className="flex items-center gap-2 text-gray-500 text-theme-xs dark:text-gray-400">
                           <span>8 min ago</span>
                        </span>
                     </span>
                  </DropdownItem>
               </li>

               <li>
                  <DropdownItem
                     onItemClick={closeDropdown}
                     className="flex gap-3 rounded-lg p-3 px-4.5 py-3  hover:bg-bee-alert-600"
                     href="#"
                  >
                     <span className="relative block w-full h-10 rounded-full z-1 max-w-10">
                        <Image
                           width={40}
                           height={40}
                           src="/image/logo.png"
                           alt="User"
                           className="w-full overflow-hidden rounded-full"
                        />
                        <span className="absolute bottom-0 right-0 z-10 h-2.5 w-full max-w-2.5 rounded-full border-[1.5px] border-white bg-bee-alert-300 dark:border-gray-900"></span>
                     </span>

                     <span className="block text-left">
                        <span className="mb-1.5 block space-x-1 text-theme-sm text-gray-500 dark:text-gray-400">
                           <span className="font-medium text-gray-800 dark:text-white/90">
                              Jocelyn Kenter
                           </span>
                           <span>fez um pedido para devolver carro</span>
                        </span>

                        <span className="flex items-center gap-2 text-gray-500 text-theme-xs dark:text-gray-400">
                           <span>15 min ago</span>
                        </span>
                     </span>
                  </DropdownItem>
               </li>
            </ul>

            <Link href="/">
               <Btn
                  variant="primary"
                  texto="Ver todas as notificações"
                  className="block px-4 py-2 mt-3 text-sm font-medium w-full"
               />
            </Link>
         </Dropdown>
      </div>
   );
}

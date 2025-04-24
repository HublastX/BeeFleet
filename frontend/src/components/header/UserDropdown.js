import { useState } from "react";
import { Dropdown } from "../../elements/ui/dropdown/Dropdown";
import { DropdownItem } from "../../elements/ui/dropdown/DropdownItem";
import Icon from "@/elements/Icon";
import Image from "next/image";
import useAuth  from "@/hooks/useAuth";

export default function UserDropdown() {
   const [isOpen, setIsOpen] = useState(false);
   const { gestor, logout } = useAuth(); 
   function toggleDropdown(e) {
      e.stopPropagation();
      setIsOpen((prev) => !prev);
   }

   function closeDropdown() {
      setIsOpen(false);
   }

   if (!gestor) return null;


   return (
      <div className="relative">
         <button
            onClick={toggleDropdown}
            className="flex items-center text-bee-dark-600 dark:text-bee-alert-500 dropdown-toggle"
         >
            <span className="mr-3 overflow-hidden rounded-full h-11 w-11">
               {!gestor.image ? (
                  <Icon name="UserCircle" />
               ) : (
                  <Image src={gestor.image} alt="Profile" width={100} height={100} className="object-cover h-full w-full" />
               )}
            </span>

            <span className="hidden md:block mr-1 font-medium text-theme-sm">
               {gestor.name}
            </span>

            <Icon
               name="prabaixo"
               className={`w-4 h-4 stroke-gray-500 dark:stroke-gray-400 transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
               }`}
               strokeWidth={3}
            />
         </button>

         <Dropdown
            isOpen={isOpen}
            onClose={closeDropdown}
            className="absolute min-w-60 px-5 right-0 mt-[18px] mr-[-15px] flex flex-col rounded-b-2xl rounded-t-none border border-bee-dark-300 bg-bee-dark-100 p-3 shadow-theme-lg dark:border-bee-dark-400 dark:bg-bee-dark-800"
         >
            <div className="dark:text-bee-alert-500 text-bee-dark-600">
               <span className="block font-medium">{gestor.name}</span>
               <span className="mt-0.5 block text-theme-xs">{gestor.email}</span>
            </div>
            <ul className="flex flex-col gap-1 pt-4 pb-3 border-b border-bee-dark-300 dark:border-bee-dark-400">
               <li>
                  <DropdownItem
                     onItemClick={closeDropdown}
                     tag="a"
                     href="/profile"
                     className="flex items-center gap-3 px-3 py-2 font-medium text-bee-dark-600 rounded-lg group text-theme-sm hover:bg-bee-alert-500 dark:text-bee-alert-500 dark:hover:bg-bee-alert-600"
                  >
                     <Icon
                        name="UserCircle"
                        className="w-6 h-6"
                        strokeWidth={1.5}
                     />
                     Editar perfil
                  </DropdownItem>
               </li>
            </ul>
            <button
               onClick={() => logout()} 
               className="flex items-center gap-3 px-3 py-2 mt-3 font-medium text-bee-dark-600 rounded-lg group text-theme-sm hover:bg-bee-alert-500 dark:text-bee-alert-500 dark:hover:bg-bee-alert-600"
            >
               <Icon name="sair" className="w-6 h-6" strokeWidth={1.5} />
               Sair
            </button>
         </Dropdown>
      </div>
   );
}

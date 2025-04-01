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

   const { name, photo, email } = gestor;

   return (
      <div className="relative">
         <button
            onClick={toggleDropdown}
            className="flex items-center text-bee-dark-600 dark:text-bee-alert-500 dropdown-toggle"
         >
            <span className="mr-3 overflow-hidden rounded-full h-11 w-11">
               {!photo ? (
                  <Icon name="UserCircle" />
               ) : (
                  <Image src={photo} alt="Profile" />
               )}
            </span>

            <span className="block mr-1 font-medium text-theme-sm">
               {name}
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
            className="absolute px-7 right-0 mt-[17px] flex  flex-col rounded-2xl border border-bee-dark-300 bg-white p-3 shadow-theme-lg dark:border-bee-dark-600 dark:bg-bee-dark-400"
         >
            <div className="dark:text-white text-bee-dark-600">
               <span className="block font-medium">{name}</span>
               <span className="mt-0.5 block text-theme-xs">{email}</span>
            </div>
            <ul className="flex flex-col gap-1 pt-4 pb-3 border-b border-bee-dark-300 dark:border-bee-dark-800">
               <li>
                  <DropdownItem
                     onItemClick={closeDropdown}
                     tag="a"
                     href="/profile"
                     className="flex items-center gap-3 px-3 py-2 font-medium text-bee-dark-600 rounded-lg group text-theme-sm hover:bg-bee-alert-600 dark:text-white dark:hover:bg-bee-alert-600"
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
               className="flex items-center gap-3 px-3 py-2 mt-3 font-medium text-bee-dark-600 rounded-lg group text-theme-sm hover:bg-bee-alert-600 dark:text-bee-alert-500 dark:hover:bg-bee-alert-600"
            >
               <Icon name="sair" className="w-6 h-6" strokeWidth={1.5} />
               Sair
            </button>
         </Dropdown>
      </div>
   );
}

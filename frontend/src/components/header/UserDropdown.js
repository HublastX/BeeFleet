import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dropdown } from "../../elements/ui/dropdown/Dropdown";
import { DropdownItem } from "../../elements/ui/dropdown/DropdownItem";
import Icon from "@/elements/Icon";
import Image from "next/image";
import useAuth from "@/hooks/useAuth";
import useTheme from "@/hooks/useTheme";

export default function UserDropdown() {
   const [isOpen, setIsOpen] = useState(false);
   const { gestor, logout } = useAuth();
   const { theme, toggleTheme } = useTheme();

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
         <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={toggleDropdown}
            className="flex items-center text-bee-dark-600 dark:text-bee-alert-500 dropdown-toggle"
         >
            <motion.span
               className="mr-3 overflow-hidden rounded-full h-11 w-11"
               whileHover={{ rotate: 10 }}
               transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
               {!gestor.image ? (
                  <Icon name="UserCircle" />
               ) : (
                  <Image
                     src={gestor.image}
                     alt="Profile"
                     width={100}
                     height={100}
                     className="object-cover h-full w-full"
                  />
               )}
            </motion.span>

            <span className="block mr-1 font-medium text-theme-sm">
               {gestor.name}
            </span>

            <motion.div
               animate={{ rotate: isOpen ? 180 : 0 }}
               transition={{ duration: 0.2 }}
            >
               <Icon
                  name="prabaixo"
                  className="w-4 h-4 stroke-gray-500 dark:stroke-gray-400"
                  strokeWidth={3}
               />
            </motion.div>
         </motion.button>

         <AnimatePresence>
            {isOpen && (
               <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ type: "spring", damping: 20 }}
                  className="absolute min-w-60 px-5 right-0 mt-[18px] mr-[-15px] flex flex-col rounded-b-2xl rounded-t-none border border-bee-dark-300 bg-bee-dark-100 p-3 shadow-theme-lg dark:border-bee-dark-400 dark:bg-bee-dark-800"
               >
                  <motion.div
                     initial={{ opacity: 0, x: -20 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: 0.1 }}
                     className="dark:text-bee-alert-500 text-bee-dark-600"
                  >
                     <span className="block font-medium">{gestor.name}</span>
                     <span className="mt-0.5 block text-theme-xs">
                        {gestor.email}
                     </span>
                  </motion.div>
                  <motion.ul className="flex flex-col gap-1 pt-4 pb-3 border-b border-bee-dark-300 dark:border-bee-dark-400">
                     <motion.li
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                     >
                        <motion.div
                           whileHover={{ scale: 1.02, x: 5 }}
                           whileTap={{ scale: 0.98 }}
                        >
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
                              Perfil
                           </DropdownItem>
                        </motion.div>
                     </motion.li>
                     <li>
                        <DropdownItem
                           onItemClick={() => {
                              toggleTheme();
                              closeDropdown();
                           }}
                           className="flex items-center gap-3 px-3 py-2 w-full font-medium text-bee-dark-600 rounded-lg group text-theme-sm hover:bg-bee-alert-500 dark:text-bee-alert-500 dark:hover:bg-bee-alert-600"
                        >
                           <Icon
                              name={
                                 theme === "system"
                                    ? "computer"
                                    : theme === "dark"
                                      ? "sun"
                                      : "moon"
                              }
                              className="w-6 h-6"
                           />
                           {theme === "system"
                              ? "Tema do sistema"
                              : theme === "dark"
                                ? "Modo claro"
                                : "Modo escuro"}
                        </DropdownItem>
                     </li>
                  </motion.ul>
                  <button
                     onClick={() => logout()}
                     className="flex items-center gap-3 px-3 py-2 mt-3 font-medium text-bee-dark-600 rounded-lg group text-theme-sm hover:bg-bee-alert-500 dark:text-bee-alert-500 dark:hover:bg-bee-alert-600"
                  >
                     <Icon name="sair" className="w-6 h-6" strokeWidth={1.5} />
                     Sair
                  </button>
               </motion.div>
            )}
         </AnimatePresence>
      </div>
   );
}

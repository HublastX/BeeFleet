import React from "react";
import { useNavBar } from "@/components/navbar/navBarContext";
import useAuth from "@/hooks/useAuth";
import UserDropdown from "./header/UserDropdown";
import Btn from "@/elements/btn";
import Icon from "@/elements/Icon";
import Link from "next/link";
import HeaderSkeleton from "@/elements/ui/skeleton/HeaderSkeleton";

const Header = () => {
   const { isMobileOpen, toggleNavBar, toggleMobileNavBar } = useNavBar();
   const handleToggle = () => {
      if (window.innerWidth >= 1024) {
         toggleNavBar();
      } else {
         toggleMobileNavBar();
      }
   };

   const { gestor, erro, carregando } = useAuth();

   return (
      <header className="sticky top-0 flex w-full z-40 bg-bee-dark-100 border-b border-bee-dark-300 dark:border-bee-dark-400 dark:bg-bee-dark-800 lg:border-b">
         <div className="flex items-center justify-between grow flex-row px-6">
            <div className="flex items-center gap-2  border-bee-dark-100 dark:border-bee-dark-400 justify-between border-b-0 px-0 py-4">
               <Btn
                  variant="secondary"
                  type="button"
                  onClick={handleToggle}
                  className={`${!gestor ? "cursor-not-allowed" : ""}`}
                  aria-label={isMobileOpen ? "Fechar menu lateral" : "Abrir menu lateral"}
                  aria-expanded={isMobileOpen}
                  aria-controls="menu-lateral"
                  disabled={!gestor}
               >
                  {isMobileOpen ? (
                     <Icon name="xMark" className="h-7" aria-hidden="true" />
                  ) : (
                     <Icon name="closeLeft" className="h-7" strokeWidth={1.5} aria-hidden="true" />
                  )}
               </Btn>
            </div>

            <div className="flex items-center justify-end gap-2 py-4 px-0">
            {carregando ? (
                  <HeaderSkeleton />
               ) : (
                  <>
                     {gestor ? (
                        <>
                           <UserDropdown />
                        </>
                     ) : (
                        <div className="flex gap-2">
                           <Link href="/login">
                              <Btn variant="primary" texto="Login" />
                           </Link>
                           <Link href="/register">
                              <Btn variant="outline" texto="Registre-se" />
                           </Link>
                        </div>
                     )}
                  </>
               )}
            </div>
         </div>
      </header>
   );
};

export default Header;

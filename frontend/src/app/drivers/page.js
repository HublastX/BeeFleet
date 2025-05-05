"use client";
import withAuth from "@/utils/withAuth";
import Link from "next/link";
import Btn from "@/elements/btn";
import Table from "../../components/table/userTable";
import { useState } from "react";
import InputText from "@/elements/inputText";
import Icon from "@/elements/Icon";
import Cards from "@/components/cardList/driverCard";
function Driver() {
   const [view, setView] = useState("cards");
   const [searchTerm, setSearchTerm] = useState("");
   return (
      <div>
         <div className="p-2 mb-3 flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
            {/* Botão e ícones (lado esquerdo e direito no desktop) */}
            <div className="flex items-center justify-between md:justify-start gap-2 md:gap-4 w-full md:w-auto">
               <Link href="/drivers/create">
                  <Btn
                     texto="Novo Motorista"
                     variant="primary"
                     className="flex gap-3 text-nowrap cursor-pointer"
                  >
                     <Icon name="addUser" className="size-6" />
                  </Btn>
               </Link>

               {/* Ícones no mobile */}
               <div className="flex gap-2 md:hidden">
                  <Btn variant="secondary" onClick={() => setView("table")}>
                     <Icon name="table" className="size-6" />
                  </Btn>
                  <Btn variant="secondary" onClick={() => setView("cards")}>
                     <Icon name="identidade" className="size-6" />
                  </Btn>
               </div>
            </div>

            {/* Input que cresce no desktop */}
            <div className="w-full md:flex-1">
               <InputText
                  variant="withIcon"
                  icon="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
               />
            </div>

            {/* Ícones no desktop */}
            <div className="hidden md:flex gap-2">
               <Btn variant="secondary" onClick={() => setView("table")}>
                  <Icon name="table" className="size-8" />
               </Btn>
               <Btn variant="secondary" onClick={() => setView("cards")}>
                  <Icon name="identidade" className="size-8" />
               </Btn>
            </div>
         </div>

         <div className="space-y-6 border-t border-bee-dark-300 dark:border-bee-dark-400 py-5 sm:px-3 md:px-5 lg:px-6">
            {view === "table" && <Table searchTerm={searchTerm} />}
            {view === "cards" && <Cards searchTerm={searchTerm} />}
         </div>
      </div>
   );
}
export default withAuth(Driver);
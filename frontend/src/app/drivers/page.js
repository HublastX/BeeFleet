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
         <div className="p-2 mb-3 flex flex-row items-center gap-6">
            <Link href="/drivers/create" className="hidden md:flex">
               <Btn
                  texto="Novo Motorista"
                  variant="primary"
                  className="flex gap-3 text-nowrap cursor-pointer"
               >
                  <Icon name="addUser" className="size-6" />
               </Btn>
            </Link>

            <div className="w-full md:flex-1">
               <InputText
                  variant="withIcon"
                  icon="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
               />
            </div>

            <div className="flex gap-2">
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

         <Link href="/drivers/create" className="md:hidden flex">
            <span className="fixed bottom-0 right-0 m-4 z-50 p-6 bg-bee-purple-600 hover:bg-bee-purple-700 shadow-xl text-white rounded-full transition-colors duration-300">
               <Icon name="addUser" className="size-6" />
            </span>
         </Link>
      </div>
   );
}
export default withAuth(Driver);

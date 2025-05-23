"use client";
import withAuth from "@/utils/withAuth";
import Link from "next/link";
import Btn from "@/elements/btn";
import Table from "../../components/table/userTable";
import { useState } from "react";
import InputText from "@/elements/inputText";
import Icon from "@/elements/Icon";
import Cards from "@/components/cardList/driverCard";
import CreateUserModal from "./create/page";

function Driver() {
   const [view, setView] = useState("cards");
   const [searchTerm, setSearchTerm] = useState("");
   const [showCarModal, setShowCarModal] = useState(false);

   return (
      <div>
         <div className="p-2 mb-3 flex flex-row items-center gap-6">
            <Btn
               texto="Novo Motorista"
               variant="primary"
               onClick={() => setShowCarModal(true)}
               className=" gap-3 text-nowrap cursor-pointer hidden md:flex"
            >
               <Icon name="addUser" className="size-6" />
            </Btn>

            <div className="w-full md:flex-1">
               <InputText
                  variant="withIcon"
                  icon="search"
                  placeholder="Pesquise por nome/telefone ou CNH do motorista"
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

         <div className="md:hidden flex">
            <button
               onClick={() => setShowCarModal(true)}
               className="fixed bottom-0 right-0 m-4 z-50 p-6 bg-bee-purple-600 hover:bg-bee-purple-700 shadow-xl text-white rounded-full transition-colors duration-300"
            >
               <Icon name="addUser" className="size-6" />
            </button>
         </div>
         {showCarModal && (
            <CreateUserModal onClose={() => setShowCarModal(false)} />
         )}
      </div>
   );
}
export default withAuth(Driver);

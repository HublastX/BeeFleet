"use client";
import React, { useState } from "react";
import withAuth from "@/utils/withAuth";
import Btn from "@/elements/btn";
import Table from "../../components/table/carTable";
import Icon from "@/elements/Icon";
import Cards from "../../components/cardList/carCard";
import InputText from "@/elements/inputText";
import Link from "next/link";

function Cars() {
   const [view, setView] = useState("cards");
   const [searchTerm, setSearchTerm] = useState("");

   return (
      <div>
         <div className="p-2 mb-3 flex flex-row items-center gap-6">
            <Link href="/cars/create">
               <Btn
                  texto="Novo veículo"
                  aria-label="Criar novo veículo"
                  variant="primary"
                  className="gap-3 text-nowrap cursor-pointer hidden md:flex"
               >
                  <Icon name="carPlus" className="size-6" />
               </Btn>
            </Link>
            <div className="w-full md:flex-1">
               <InputText
                  variant="withIcon"
                  icon="search"
                  aria-controls="Pesquise por placa, marca ou modelo do veículo"
                  aria-label="Pesquise por placa, marca ou modelo do veículo"
                  placeholder="Pesquise por placa, marca ou modelo do veículo"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
               />
            </div>

            <div className="flex gap-2">
               <Btn
                  variant="secondary"
                  aria-label="Visualizar como tabela"
                  aria-pressed={view === "table"}
                  onClick={() => setView("table")}
               >
                  <Icon name="table" className="size-8" />
               </Btn>
               <Btn
                  variant="secondary"
                  aria-label="Visualizar como cards"
                  aria-pressed={view === "cards"}
                  onClick={() => setView("cards")}
               >
                  <Icon name="identidade" className="size-8" />
               </Btn>
            </div>
         </div>

         <div className="space-y-6 border-t border-bee-dark-300 dark:border-bee-dark-400 py-5 sm:px-3 md:px-5 lg:px-6">
            {view === "table" && <Table searchTerm={searchTerm} />}
            {view === "cards" && <Cards searchTerm={searchTerm} />}
         </div>

         <div className="md:hidden flex">
            <Link
               href="/cars/create"
               aria-controls="Novo veículo"
               aria-label="Novo veículo"
               className="fixed bottom-0 right-0 m-4 z-50 p-6 bg-bee-purple-600 hover:bg-bee-purple-700 shadow-xl text-white rounded-full transition-colors duration-300"
            >
               <Icon name="carPlus" className="size-6" />
            </Link>
         </div>
      </div>
   );
}

export default withAuth(Cars);

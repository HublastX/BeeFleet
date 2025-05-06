"use client";
import React from "react";
import withAuth from "@/utils/withAuth";
import Saida from "@/components/eventForm/saida";

function Events() {
   return (
      <div>
         <div className="flex justify-between border-b items-center border-bee-dark-300 dark:border-bee-dark-400 pb-3">
            <h2 className="text-3xl font-bold mb-6 ">
               Gerenciar Evento
            </h2>
            <select
               name="eventType"
               className="border h-fit border-bee-dark-300 dark:border-bee-dark-400 py-3 px-4 rounded dark:bg-bee-dark-800 bg-bee-dark-100"
            >
               <option value="1">Chegada</option>
               <option value="2">Saída</option>
            </select>
         </div>
         <Saida />
      </div>
   );
}

export default withAuth(Events);

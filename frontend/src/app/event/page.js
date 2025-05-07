"use client";
import React, { useState } from "react";
import withAuth from "@/utils/withAuth";
import Saida from "@/components/eventForm/saida";

function Events() {
   const [tipoEvento, setTipoEvento] = useState("");

   return (
      <div>
         <div className="flex justify-between border-b items-center border-bee-dark-300 dark:border-bee-dark-400 pb-3">
            <h2 className="text-3xl font-bold mb-6">Gerenciar Evento</h2>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5">
               <h1 className="text-base font-medium text-bee-dark-700 dark:text-white">
                  Tipo de evento:
               </h1>

               <label className="flex items-center gap-2 cursor-pointer text-sm text-bee-dark-700 dark:text-white">
                  <input
                     type="radio"
                     name="tipoEvento"
                     value="chegada"
                     checked={tipoEvento === "chegada"}
                     onChange={(e) => setTipoEvento(e.target.value)}
                     className="accent-bee-primary-500"
                  />
                  Chegada
               </label>

               <label className="flex items-center gap-2 cursor-pointer text-sm text-bee-dark-700 dark:text-white">
                  <input
                     type="radio"
                     name="tipoEvento"
                     value="saida"
                     checked={tipoEvento === "saida"}
                     onChange={(e) => setTipoEvento(e.target.value)}
                     className="accent-bee-primary-500"
                  />
                  Saída
               </label>
            </div>
         </div>
         {!tipoEvento && (
            <div className="mt-4 text-bee-dark-600 dark:text-bee-light-200">
               aqui vem uma pequena explicacao de como funciona um evento
            </div>
         )}

         {tipoEvento === "saida" && <Saida />}
      </div>
   );
}

export default withAuth(Events);

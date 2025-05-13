"use client";
import React, { useEffect, useState } from "react";
import withAuth from "@/utils/withAuth";
import Saida from "@/components/eventForm/saida";
import Chegada from "@/components/eventForm/chegada";
import { useSearchParams } from "next/navigation";

function Events() {
   const [tipoEvento, setTipoEvento] = useState("");
   const searchParams = useSearchParams();

   useEffect(() => {
      const tipo = searchParams.get("tipo");
      if (["saida", "chegada"].includes(tipo)) {
         setTipoEvento(tipo);
      } else {
         setTipoEvento("");
      }
   }, [searchParams]);
   return (
      <div>
         <div className="md:flex justify-between border-b items-center border-bee-dark-300 dark:border-bee-dark-400 pb-3">
            <h2 className="text-3xl font-bold md:mb-0 mb-3">Gerenciar Evento</h2>
            <div className="flex items-start gap-2">
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
                Nesta tela, você pode gerenciar os eventos de <strong>chegada</strong> e <strong>saída</strong> de motoristas.
                Selecione uma das opções acima para visualizar ou registrar os dados correspondentes e manter o controle das operações em tempo real.
             </div>
        )}

         {tipoEvento === "saida" && <Saida />}
         {tipoEvento === "chegada" && <Chegada />}
      </div>
   );
}

export default withAuth(Events);

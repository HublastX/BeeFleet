"use client";
import React, { useEffect, useState } from "react";
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
             <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 shadow-sm text-sm text-gray-700 mt-6">
                 <p className="mb-2">
                    1. Esta área é onde você gerencia os eventos de <span className="font-semibold text-black">chegada</span> e <span className="font-semibold text-black">saída</span> dos motoristas.
                </p>
                 <p className="mb-2">
                    2. Use o filtro no topo da página para escolher qual tipo de evento você quer visualizar. Isso ajuda a manter o controle das operações de forma organizada e prática.
                </p>
                <p>
                    3. Não esquece de revisar os dados com frequência pra garantir que tudo esteja atualizado e certinho com a operação da frota.
                </p>
            </div>

        )}

         {tipoEvento === "saida" && <Saida />}
         {tipoEvento === "chegada" && <Chegada />}
      </div>
   );
}

export default Events;

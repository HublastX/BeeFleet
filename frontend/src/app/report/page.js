"use client";
import ReportCar from "@/components/reportsForm/reportCar";
import ReportDriver from "@/components/reportsForm/reportDriver";
import ReportEvent from "@/components/reportsForm/reportEvent";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Relatorios() {
   const [selectedReport, setSelectedReport] = useState("");
   const searchParams = useSearchParams();

   useEffect(() => {
      const tipo = searchParams.get("tipo");
      if (["carro", "motorista", "evento"].includes(tipo)) {
         setSelectedReport(tipo);
      } else {
         setSelectedReport("");
      }
   }, [searchParams]);


   return (
      <div>
         <div className="flex justify-between flex-row border-b border-bee-dark-300 dark:border-bee-dark-400 pb-4">
            <h1 className="text-3xl font-bold text-center self-center">
               Relatórios
            </h1>
            <div>
               <h2 className="text-lg font-semibold">
                  Selecione o tipo de relatório:
               </h2>

               <select
                  className="border border-bee-dark-300 dark:border-bee-dark-400 rounded px-3 py-2 bg-white dark:bg-bee-dark-800 w-full md:w-fit"
                  value={selectedReport}
                  onChange={(e) => setSelectedReport(e.target.value)}
               >
                  <option value="">Escolha uma opção</option>
                  <option value="carro">Carro</option>
                  <option value="motorista">Motorista</option>
                  <option value="evento">Evento</option>
               </select>
            </div>
         </div>
         <div>
            {selectedReport === "carro" && <ReportCar />}
            {selectedReport === "motorista" && <ReportDriver />}
            {selectedReport === "evento" && <ReportEvent />}
         </div>
      </div>
   );
}

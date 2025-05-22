"use client";
import ReportCar from "@/components/reportsForm/reportCar";
import ReportDriver from "@/components/reportsForm/reportDriver";
import ReportEvent from "@/components/reportsForm/reportEvent";
import ReportProfile from "@/components/reportsForm/reportProfile";
import { useState } from "react";

export default function ReportContent() {
   const [selectedReport, setSelectedReport] = useState("carro"); // "carro" como padrão

   return (
      <div>
         <div className="flex justify-between flex-row border-b border-bee-dark-300 dark:border-bee-dark-400 pb-4">
            <h1 className="text-3xl font-bold text-center self-center">
               Relatórios
            </h1>
            <div >
               <h2 className="text-lg font-semibold mb-3">
                  Selecione o relatório:
               </h2>
               <div className="flex flex-wrap gap-4">
                  {[
                     { value: "carro", label: "Carro" },
                     { value: "motorista", label: "Motorista" },
                     { value: "evento", label: "Evento" },
                     { value: "pessoal", label: "Pessoal" },
                  ].map((option) => (
                     <label
                        key={option.value}
                        className="flex items-center gap-2 cursor-pointer"
                     >
                        <input
                           type="radio"
                           value={option.value}
                           checked={selectedReport === option.value}
                           onChange={() => setSelectedReport(option.value)}
                           className="h-4 w-4 text-bee-main focus:ring-bee-main"
                        />
                        <span>{option.label}</span>
                     </label>
                  ))}
               </div>
            </div>
         </div>

         <div className="mt-4">
            {selectedReport === "carro" && <ReportCar />}
            {selectedReport === "motorista" && <ReportDriver />}
            {selectedReport === "evento" && <ReportEvent />}
            {selectedReport === "pessoal" && <ReportProfile />}
         </div>
      </div>
   );
}

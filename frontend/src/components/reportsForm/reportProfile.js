"use client";
import Btn from "@/elements/btn";
import Icon from "@/elements/Icon";
import InputText from "@/elements/inputText";
import { useState } from "react";

export default function ReportProfile() {
   const [timePeriodEnabled, setTimePeriodEnabled] = useState(false);
   const [startDateOption, setStartDateOption] = useState("creation");
   const [endDateOption, setEndDateOption] = useState("current");
   const [customStartDate, setCustomStartDate] = useState("");
   const [customEndDate, setCustomEndDate] = useState("");
   const [formError, setFormError] = useState("");

   const handleSubmit = (e) => {
      e.preventDefault();
      setFormError("");

      let startDate, endDate;

      if (timePeriodEnabled) {
         if (startDateOption === "creation") {
            // Aqui você pode definir a data de criação do perfil, se disponível
            startDate = "2020-01-01";
         } else if (startDateOption === "custom" && customStartDate) {
            startDate = customStartDate;
         } else {
            const defaultDate = new Date();
            defaultDate.setDate(defaultDate.getDate() - 30);
            startDate = defaultDate.toISOString().split("T")[0];
         }

         if (endDateOption === "current") {
            endDate = new Date().toISOString().split("T")[0];
         } else if (endDateOption === "custom" && customEndDate) {
            endDate = customEndDate;
         } else {
            endDate = new Date().toISOString().split("T")[0];
         }
      } else {
         const endDateObj = new Date();
         const startDateObj = new Date();
         startDateObj.setDate(startDateObj.getDate() - 30);

         startDate = startDateObj.toISOString().split("T")[0];
         endDate = endDateObj.toISOString().split("T")[0];
      }

      if (new Date(startDate) > new Date(endDate)) {
         setFormError("A data final deve ser maior que a data inicial");
         return;
      }

      // Chame aqui a função de geração do relatório de perfil
      // Exemplo: generateProfileReport({ startDate, endDate });
   };

   return (
      <div className="max-w-4xl mx-auto p-4">
         <h1 className="text-2xl font-bold mb-6 flex items-center">
            <Icon name="report" className="size-6 mr-2" />
            Relatório do Perfil
         </h1>
         <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Seção Período */}
            <div className="bg-bee-dark-100 dark:bg-bee-dark-800 rounded-lg p-6 shadow">
               <h2 className="text-xl font-bold flex gap-2 items-center mb-2">
                  <Icon name="calendar" className="size-5" /> Período do
                  Relatório
               </h2>
               <div className="mt-3 space-y-4">
                  <label className="inline-flex items-center">
                     <input
                        type="checkbox"
                        className="form-checkbox border border-bee-dark-300 dark:border-bee-dark-400 rounded"
                        checked={timePeriodEnabled}
                        onChange={(e) => setTimePeriodEnabled(e.target.checked)}
                     />
                     <span className="ml-2">
                        Filtrar por período específico
                     </span>
                  </label>
                  {timePeriodEnabled && (
                     <div className="pl-0 md:pl-6 space-y-6 mt-4">
                        <div className="space-y-2">
                           <h3 className="text-base font-semibold">
                              Data Inicial
                           </h3>
                           <div className="flex flex-col sm:flex-row gap-3">
                              <label className="inline-flex items-center">
                                 <input
                                    type="radio"
                                    className="form-radio border border-bee-dark-300 dark:border-bee-dark-400"
                                    name="startDateOption"
                                    value="creation"
                                    checked={startDateOption === "creation"}
                                    onChange={() =>
                                       setStartDateOption("creation")
                                    }
                                 />
                                 <span className="ml-2">Data de criação</span>
                              </label>
                              <label className="inline-flex items-center">
                                 <input
                                    type="radio"
                                    className="form-radio border border-bee-dark-300 dark:border-bee-dark-400"
                                    name="startDateOption"
                                    value="custom"
                                    checked={startDateOption === "custom"}
                                    onChange={() =>
                                       setStartDateOption("custom")
                                    }
                                 />
                                 <span className="ml-2">Data manual</span>
                              </label>
                           </div>
                           {startDateOption === "custom" && (
                              <div className="pl-0 md:pl-6 w-full md:w-56">
                                 <InputText
                                    type="date"
                                    className="w-full"
                                    value={customStartDate}
                                    onChange={(e) =>
                                       setCustomStartDate(e.target.value)
                                    }
                                 />
                              </div>
                           )}
                        </div>
                        <div className="space-y-2">
                           <h3 className="text-base font-semibold">
                              Data Final
                           </h3>
                           <div className="flex flex-col sm:flex-row gap-3">
                              <label className="inline-flex items-center">
                                 <input
                                    type="radio"
                                    className="form-radio border border-bee-dark-300 dark:border-bee-dark-400"
                                    name="endDateOption"
                                    value="current"
                                    checked={endDateOption === "current"}
                                    onChange={() => setEndDateOption("current")}
                                 />
                                 <span className="ml-2">Data atual</span>
                              </label>
                              <label className="inline-flex items-center">
                                 <input
                                    type="radio"
                                    className="form-radio border border-bee-dark-300 dark:border-bee-dark-400"
                                    name="endDateOption"
                                    value="custom"
                                    checked={endDateOption === "custom"}
                                    onChange={() => setEndDateOption("custom")}
                                 />
                                 <span className="ml-2">Data manual</span>
                              </label>
                           </div>
                           {endDateOption === "custom" && (
                              <div className="pl-0 md:pl-6 w-full md:w-56">
                                 <InputText
                                    type="date"
                                    className="w-full"
                                    value={customEndDate}
                                    onChange={(e) =>
                                       setCustomEndDate(e.target.value)
                                    }
                                 />
                              </div>
                           )}
                        </div>
                     </div>
                  )}
               </div>
            </div>

            {/* Mensagens de erro */}
            {formError && (
               <div className="text-red-500 text-sm font-bold mt-2">
                  {formError}
               </div>
            )}

            {/* Botões */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
               <Btn
                  type="button"
                  texto="Cancelar"
                  onClick={() => window.history.back()}
                  className="flex-[1] py-3 border border-red-400 bg-red-400 hover:bg-red-500"
               />
               <Btn
                  type="submit"
                  texto="Gerar Relatório"
                  className="flex-[2] py-3 bg-bee-purple-500 hover:bg-bee-purple-600 text-lg"
               />
            </div>
         </form>
      </div>
   );
}

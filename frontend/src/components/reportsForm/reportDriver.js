"use client";
import Btn from "@/elements/btn";
import Icon from "@/elements/Icon";
import InputText from "@/elements/inputText";
import { useState } from "react";

export default function ReportDriver() {
   const [reportType, setReportType] = useState("single");
   const [timePeriodEnabled, setTimePeriodEnabled] = useState(false);
   const [startDateOption, setStartDateOption] = useState("creation");
   const [endDateOption, setEndDateOption] = useState("current");
   const [customStartDate, setCustomStartDate] = useState("");
   const [customEndDate, setCustomEndDate] = useState("");

   const [criterioDriver, setCriterioDriver] = useState("name");
   const [driverInput, setDriverInput] = useState("");
   const [selectedDriver, setSelectedDriver] = useState(null);
   const [driverError, setDriverError] = useState(false);
   const [driverStatusError, setDriverStatusError] = useState("");

   return (
      <form
         onSubmit={handleSubmit}
         className="space-y-6 md:space-y-8 mt-4 md:mt-6"
      >
         <div className="flex flex-col gap-6 md:gap-8">
            <div className="w-full">
               <h2 className="text-xl md:text-2xl font-bold flex gap-2 items-center">
                  <Icon name="report" className="size-5 md:size-6" /> Tipo de
                  Relatório
               </h2>
               <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 mb-3 md:mb-4">
                  Selecione se deseja um relatório de um motorista específico ou de
                  todos os motoristas
               </p>
               <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                  <label className="inline-flex items-center">
                     <input
                        type="radio"
                        className="form-radio border border-bee-dark-300 dark:border-bee-dark-400"
                        name="reportType"
                        value="single"
                        checked={reportType === "single"}
                        onChange={() => setReportType("single")}
                     />
                     <span className="ml-2">Motorista específico</span>
                  </label>
                  <label className="inline-flex items-center">
                     <input
                        type="radio"
                        className="form-radio border border-bee-dark-300 dark:border-bee-dark-400"
                        name="reportType"
                        value="all"
                        checked={reportType === "all"}
                        onChange={() => setReportType("all")}
                     />
                     <span className="ml-2">Todos os motoristas</span>
                  </label>
               </div>
            </div>

            {reportType === "single" && (
               <div className="w-full relative">
                  <h2 className="text-xl md:text-2xl font-bold flex gap-2 items-center">
                     <Icon name="user" className="size-5 md:size-6" /> Motorista
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 mb-3 md:mb-4">
                     Você pode pesquisar por nome, telefone ou CNH
                  </p>
                  <div className="flex flex-col md:flex-row gap-3 w-full items-start md:items-end">
                     <div className="w-full md:w-auto flex flex-col">
                        <label className="font-medium mb-1">Buscar por:</label>
                        <select
                           value={criterioDriver}
                           onChange={(e) => {
                              setCriterioDriver(e.target.value);
                              setDriverInput("");
                              setSelectedDriver(null);
                              setDriverError(false);
                              setDriverStatusError("");
                           }}
                           className="border border-bee-dark-300 dark:border-bee-dark-400 rounded px-3 py-2 bg-white dark:bg-bee-dark-800 w-full md:w-40"
                        >
                           <option value="name">Nome</option>
                           <option value="phone">Telefone</option>
                           <option value="cnh">CNH</option>
                        </select>
                     </div>
                     <div className="flex-1 w-full min-w-0">
                        <InputText
                           type="text"
                           value={driverInput}
                           onChange={(e) => {
                              setDriverInput(e.target.value);
                              setSelectedDriver(null);
                              setDriverError(false);
                              setDriverStatusError("");
                           }}
                           placeholder={`Digite ${
                              criterioDriver === "name"
                                 ? "o nome"
                                 : criterioDriver === "phone"
                                   ? "o telefone"
                                   : "a CNH"
                           } do motorista`}
                           className={`${driverError || driverStatusError ? "border-red-500" : ""} w-full`}
                        />
                        {driverError && (
                           <p className="text-red-500 text-sm font-bold mt-2">
                              Motorista não encontrado. Verifique os dados ou
                              cadastre um novo motorista.
                           </p>
                        )}
                        {driverStatusError && (
                           <p className="text-red-500 text-sm font-bold mt-2">
                              {driverStatusError}
                           </p>
                        )}
                     </div>
                  </div>
               </div>
            )}

            <hr className="border-bee-dark-300 dark:border-bee-dark-400 my-2 md:my-4" />

            <div className="w-full">
               <h2 className="text-xl md:text-2xl font-bold flex gap-2 items-center">
                  <Icon name="calendar" className="size-5 md:size-6" /> Período
                  do Relatório
               </h2>
               <div className="mt-3 md:mt-4 space-y-4">
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
                           <h3 className="text-base md:text-lg font-semibold">
                              Data Inicial
                           </h3>
                           <div className="space-y-3 pl-0 md:pl-4">
                              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
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
                                       disabled={reportType === "all"} 
                                    />
                                    <span
                                       className={`ml-2 ${reportType === "all" ? "text-gray-400 dark:text-gray-500" : ""}`}
                                    >
                                       Data de criação
                                    </span>
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
                        </div>

                        <div className="space-y-2">
                           <h3 className="text-base md:text-lg font-semibold">
                              Data Final
                           </h3>
                           <div className="space-y-3 pl-0 md:pl-4">
                              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                                 <label className="inline-flex items-center">
                                    <input
                                       type="radio"
                                       className="form-radio border border-bee-dark-300 dark:border-bee-dark-400"
                                       name="endDateOption"
                                       value="current"
                                       checked={endDateOption === "current"}
                                       onChange={() =>
                                          setEndDateOption("current")
                                       }
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
                                       onChange={() =>
                                          setEndDateOption("custom")
                                       }
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
                     </div>
                  )}
               </div>
            </div>
         </div>

         <hr className="border-bee-dark-300 dark:border-bee-dark-400 my-2 md:my-4" />

         <div className="flex flex-row gap-3 md:gap-4">
            <Btn
               type="button"
               texto="Cancelar"
               onClick={() => window.history.back()}
               className="w-full flex-[1] border border-red-400 bg-red-400 hover:bg-red-500 py-2 md:py-3"
            />
            <Btn
               type="submit"
               texto="Gerar Relatório"
               className="w-full flex-[2] py-2 md:py-3 px-4 text-base md:text-lg"
               disabled={reportType === "single" && !selectedDriver}
            />
         </div>
      </form>
   );
}
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
      <div className="max-w-4xl mx-auto p-4">
         <h1 className="text-2xl font-bold mb-6 flex items-center">
            Relatório de Motorista
         </h1>
         <form className="space-y-6">
            {/* Seção Tipo de Relatório */}
            <div className="bg-bee-dark-100 dark:bg-bee-dark-800 rounded-lg p-6 shadow">
               <h2 className="text-xl font-bold flex gap-2 items-center mb-2">
                  <Icon name="reports" className="size-5" /> Tipo de Relatório
               </h2>
               <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Selecione se deseja um relatório de um motorista específico ou
                  de todos os motoristas
               </p>
               <div className="flex flex-col sm:flex-row gap-3">
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

            {/* Seção Motorista */}
            {reportType === "single" && (
               <div className="bg-bee-dark-100 dark:bg-bee-dark-800 rounded-lg p-6 shadow">
                  <h2 className="text-xl font-bold flex gap-2 items-center mb-2">
                     <Icon name="user" className="size-5" /> Motorista
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                     Você pode pesquisar por nome, telefone ou CNH
                  </p>
                  <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                     <label className="font-medium min-w-[120px]">
                        Buscar por:
                     </label>
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
                     <div className="relative w-full">
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
                  disabled={reportType === "single" && !selectedDriver}
               />
            </div>
         </form>
      </div>
   );
}

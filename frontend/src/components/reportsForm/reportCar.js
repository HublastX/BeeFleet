"use client";
import Btn from "@/elements/btn";
import Icon from "@/elements/Icon";
import InputText from "@/elements/inputText";
import useCar from "@/hooks/useCar";
import useReports from "@/hooks/useReports";
import Link from "next/link";
import { useState, useEffect } from "react";
import CarReportPreview from "../reports/driver";

export default function ReportCar() {
   const { carro } = useCar();
   const { getAllCarUsageReport, carregando, erro, relatorio } = useReports();
   const [reportType, setReportType] = useState("single");
   const [timePeriodEnabled, setTimePeriodEnabled] = useState(false);
   const [startDateOption, setStartDateOption] = useState("creation");
   const [endDateOption, setEndDateOption] = useState("current");
   const [customStartDate, setCustomStartDate] = useState("");
   const [customEndDate, setCustomEndDate] = useState("");

   const [criterioCarro, setCriterioCarro] = useState("plate");
   const [carroInput, setCarroInput] = useState("");
   const [selectedCarro, setSelectedCarro] = useState(null);
   const [carroError, setCarroError] = useState(false);
   const [carroStatusError, setCarroStatusError] = useState("");
   const [formError, setFormError] = useState("");

   const carrosFiltrados = carro?.filter((c) => {
      const valor = carroInput.toLowerCase();
      if (criterioCarro === "plate")
         return c.plate.toLowerCase().includes(valor);
      if (criterioCarro === "renavam")
         return c.renavam?.toLowerCase().includes(valor);
      if (criterioCarro === "chassi")
         return c.chassis?.toLowerCase().includes(valor);
      return false;
   });

   useEffect(() => {
      if (!carrosFiltrados?.length && carroInput) {
         setCarroError(true);
      } else {
         setCarroError(false);
      }
   }, [carroInput, carrosFiltrados]);

   const selecionarCarro = (c) => {
      setSelectedCarro(c);
      setCarroInput(c[criterioCarro]);
      setCarroError(false);
      setCarroStatusError("");
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setFormError("");

      if (reportType === "single" && !selectedCarro) {
         setFormError("Selecione um carro para gerar o relatório.");
         return;
      }

      if (reportType === "all") {
         await getAllCarUsageReport();
      } else if (reportType === "single" && selectedCarro) {
         await getAllCarUsageReport(selectedCarro.id);
      }
   };

   return (
      <div className="max-w-4xl mx-auto p-4">
         <h1 className="text-2xl font-bold mb-6 flex items-center">
            Relatório de Carro
         </h1>
         <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Seção Tipo de Relatório */}
            <div className="bg-bee-dark-100 dark:bg-bee-dark-800 rounded-lg p-6 shadow">
               <h2 className="text-xl font-bold flex gap-2 items-center mb-2">
                  <Icon name="reports" className="size-5" /> Tipo de Relatório
               </h2>
               <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Selecione se deseja um relatório de um carro específico ou de
                  todos os carros
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
                     <span className="ml-2">Carro específico</span>
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
                     <span className="ml-2">Todos os carros</span>
                  </label>
               </div>
            </div>
            {/* Seção Carro */}
            {reportType === "single" && (
               <div className="bg-bee-dark-100 dark:bg-bee-dark-800 rounded-lg p-6 shadow">
                  <h2 className="text-xl font-bold flex gap-2 items-center mb-2">
                     <Icon name="car" className="size-5" /> Carro
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                     Você pode pesquisar por placa, RENAVAM ou chassi
                  </p>
                  <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                     <label className="font-medium min-w-[120px]">
                        Buscar por:
                     </label>
                     <select
                        value={criterioCarro}
                        onChange={(e) => {
                           setCriterioCarro(e.target.value);
                           setCarroInput("");
                           setSelectedCarro(null);
                           setCarroError(false);
                           setCarroStatusError("");
                        }}
                        className="border border-bee-dark-300 dark:border-bee-dark-400 rounded px-3 py-2 bg-white dark:bg-bee-dark-800 w-full md:w-40"
                     >
                        <option value="plate">Placa</option>
                        <option value="renavam">RENAVAM</option>
                        <option value="chassi">Chassi</option>
                     </select>
                     <div className="relative w-full">
                        <InputText
                           type="text"
                           value={carroInput}
                           onChange={(e) => {
                              setCarroInput(e.target.value);
                              setSelectedCarro(null);
                              setCarroError(false);
                              setCarroStatusError("");
                           }}
                           placeholder={`Digite a ${
                              criterioCarro === "plate"
                                 ? "placa"
                                 : criterioCarro === "renavam"
                                   ? "RENAVAM"
                                   : "chassi"
                           } do carro`}
                           className={`${carroError || carroStatusError ? "border-red-500" : ""} w-full`}
                        />
                        {carroInput &&
                           !selectedCarro &&
                           carrosFiltrados?.length > 0 && (
                              <ul className="absolute z-20 top-full left-0 right-0 bg-bee-dark-100 dark:bg-bee-dark-800 border border-bee-dark-300 dark:border-bee-dark-400 rounded shadow mt-1 max-h-48 overflow-auto">
                                 {carrosFiltrados.map((c) => (
                                    <li
                                       key={c.id}
                                       onClick={() => selecionarCarro(c)}
                                       className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                       {criterioCarro === "plate"
                                          ? c.plate
                                          : criterioCarro === "renavam"
                                            ? c.renavam
                                            : c.chassis}
                                    </li>
                                 ))}
                              </ul>
                           )}
                     </div>
                  </div>
                  {carroError && (
                     <p className="text-red-500 text-sm font-bold mt-2">
                        Esse carro ainda não foi cadastrado. Deseja adicionar?{" "}
                        <Link
                           href="cars/create"
                           className="text-bee-purple-500"
                        >
                           Adicione agora
                        </Link>
                     </p>
                  )}
                  {carroStatusError && (
                     <p className="text-red-500 text-sm font-bold mt-2">
                        {carroStatusError}
                     </p>
                  )}
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
            {/* Mensagens de erro */}
            {formError && (
               <div className="text-red-500 text-sm font-bold mt-2">
                  {formError}
               </div>
            )}
            {erro && (
               <div className="text-red-500 text-sm font-bold mt-2">{erro}</div>
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
                  texto={carregando ? "Gerando..." : "Gerar Relatório"}
                  className="flex-[2] py-3 bg-bee-purple-500 hover:bg-bee-purple-600 text-lg"
                  disabled={
                     (reportType === "single" && !selectedCarro) || carregando
                  }
               />
            </div>
            {relatorio && (
               <div className="mt-10">
                  <CarReportPreview reportData={relatorio} />
               </div>
            )}
         </form>
      </div>
   );
}

"use client";
import Btn from "@/elements/btn";
import Icon from "@/elements/Icon";
import InputText from "@/elements/inputText";
import useDrivers from "@/hooks/useDrivers";
import useReports from "@/hooks/useReports";
import { useState, useEffect } from "react";
import DriverReportPreview from "../reports/DriverReportPreview";

export default function ReportDriver() {
   const { motoristas } = useDrivers();
   const { getAllDriversUsageReport, carregando, erro, relatorio } =
      useReports();
   const [reportType, setReportType] = useState("single");
   const [criterioDriver, setCriterioDriver] = useState("name");
   const [driverInput, setDriverInput] = useState("");
   const [selectedDriver, setSelectedDriver] = useState(null);
   const [driverError, setDriverError] = useState(false);
   const [driverStatusError, setDriverStatusError] = useState("");
   const [formError, setFormError] = useState("");
   const [modalAberto, setModalAberto] = useState(false);

   // Filtro de motoristas
   const driversFiltrados = motoristas?.filter((d) => {
      const valor = driverInput.toLowerCase();
      if (criterioDriver === "name")
         return d.name.toLowerCase().includes(valor);
      if (criterioDriver === "phone")
         return d.phone?.toLowerCase().includes(valor);
      if (criterioDriver === "cnh") return d.cnh?.toLowerCase().includes(valor);
      return false;
   });

   useEffect(() => {
      if (!driversFiltrados?.length && driverInput) {
         setDriverError(true);
      } else {
         setDriverError(false);
      }
   }, [driverInput, driversFiltrados]);

   const selecionarDriver = (d) => {
      setSelectedDriver(d);
      setDriverInput(d[criterioDriver]);
      setDriverError(false);
      setDriverStatusError("");
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setFormError("");

      if (reportType === "single" && !selectedDriver) {
         setFormError("Selecione um motorista para gerar o relatório.");
         return;
      }

      if (reportType === "all") {
         await getAllDriversUsageReport();
      } else if (reportType === "single" && selectedDriver) {
         await getAllDriversUsageReport(selectedDriver.id);
      }

      setModalAberto(true);
   };

   return (
      <div className="max-w-4xl mx-auto p-4">
         <h1 className="text-2xl font-bold mb-6 flex items-center">
            Relatório de Motorista
         </h1>
         <form className="space-y-6" onSubmit={handleSubmit}>
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
                        {driverInput &&
                           !selectedDriver &&
                           driversFiltrados?.length > 0 && (
                              <ul className="absolute z-20 top-full left-0 right-0 bg-bee-dark-100 dark:bg-bee-dark-800 border border-bee-dark-300 dark:border-bee-dark-400 rounded shadow mt-1 max-h-48 overflow-auto">
                                 {driversFiltrados.map((d) => (
                                    <li
                                       key={d.id}
                                       onClick={() => selecionarDriver(d)}
                                       className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                       {criterioDriver === "name"
                                          ? d.name
                                          : criterioDriver === "phone"
                                            ? d.phone
                                            : d.cnh}
                                    </li>
                                 ))}
                              </ul>
                           )}
                     </div>
                  </div>
                  {driverError && (
                     <p className="text-red-500 text-sm font-bold mt-2">
                        Motorista não encontrado. Verifique os dados ou cadastre
                        um novo motorista.
                     </p>
                  )}
                  {driverStatusError && (
                     <p className="text-red-500 text-sm font-bold mt-2">
                        {driverStatusError}
                     </p>
                  )}
               </div>
            )}
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
                     (reportType === "single" && !selectedDriver) || carregando
                  }
               />
            </div>
         </form>
         {modalAberto && relatorio && (
            <div className="fixed inset-0 z-50 flex print:items-start items-center justify-center bg-black/60">
               <div
                  className="relative bg-white rounded-lg"
                  style={{
                     maxHeight: "90vh",
                     overflowY: "auto",
                  }}
               >
                  <button
                     className="absolute print:hidden top-4 right-4 text-2xl font-bold text-gray-500 hover:text-red-500"
                     onClick={() => setModalAberto(false)}
                     aria-label="Fechar"
                  >
                     ×
                  </button>
                  <DriverReportPreview reportData={relatorio} />
               </div>
            </div>
         )}
      </div>
   );
}

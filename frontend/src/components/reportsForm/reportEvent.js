"use client";
import Btn from "@/elements/btn";
import Icon from "@/elements/Icon";
import InputText from "@/elements/inputText";
import useEvents from "@/hooks/useEvent";
import useReports from "@/hooks/useReports";
import { useState, useEffect } from "react";
import EventReportPreview from "../reports/EventReportPreview";

export default function ReportEvent() {
   const { eventos } = useEvents();
   const { getAllEventsUsageReport, carregando, erro, relatorio } =
      useReports();
   const [reportType, setReportType] = useState("single");
   const [specificType, setSpecificType] = useState("ativos"); // New state for specific types
   const [criterioEvento, setCriterioEvento] = useState("name");
   const [eventoInput, setEventoInput] = useState("");
   const [selectedEvento, setSelectedEvento] = useState(null);
   const [eventoError, setEventoError] = useState(false);
   const [eventoStatusError, setEventoStatusError] = useState("");
   const [formError, setFormError] = useState("");
   const [modalAberto, setModalAberto] = useState(false);

   // Filtro de eventos
   const eventosFiltrados = eventos?.filter((e) => {
      const valor = eventoInput.toLowerCase();
      if (criterioEvento === "name")
         return e.name?.toLowerCase().includes(valor);
      if (criterioEvento === "type")
         return e.type?.toLowerCase().includes(valor);
      if (criterioEvento === "id") return String(e.id).includes(valor);
      return false;
   });

   useEffect(() => {
      if (!eventosFiltrados?.length && eventoInput) {
         setEventoError(true);
      } else {
         setEventoError(false);
      }
   }, [eventoInput, eventosFiltrados]);

   const selecionarEvento = (e) => {
      setSelectedEvento(e);
      setEventoInput(e[criterioEvento]);
      setEventoError(false);
      setEventoStatusError("");
   };

   const handleSubmit = async (ev) => {
      ev.preventDefault();
      setFormError("");

      if (reportType === "single" && !selectedEvento) {
         setFormError("Selecione um evento para gerar o relatório.");
         return;
      }

      if (reportType === "all") {
         await getAllEventsUsageReport();
      } else if (reportType === "single" && selectedEvento) {
         await getAllEventsUsageReport(selectedEvento.id);
      } else if (reportType === "specific") {
         await getAllEventsUsageReport(null, specificType);
      }

      setModalAberto(true);
   };

   return (
      <div className="max-w-4xl mx-auto p-4">
         <h1 className="text-2xl font-bold mb-6 flex items-center">
            Relatório de Evento
         </h1>
         <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Seção Tipo de Relatório */}
            <div className="bg-bee-dark-100 dark:bg-bee-dark-800 rounded-lg p-6 shadow">
               <h2 className="text-xl font-bold flex gap-2 items-center mb-2">
                  <Icon name="reports" className="size-5" /> Tipo de Relatório
               </h2>
               <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Selecione se deseja um relatório de um evento específico ou de
                  todos os eventos
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
                     <span className="ml-2">Evento específico</span>
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
                     <span className="ml-2">Todos os eventos</span>
                  </label>
                  <label className="inline-flex items-center">
                     <input
                        type="radio"
                        className="form-radio border border-bee-dark-300 dark:border-bee-dark-400"
                        name="reportType"
                        value="specific"
                        checked={reportType === "specific"}
                        onChange={() => setReportType("specific")}
                     />
                     <span className="ml-2">Tipo específico</span>
                  </label>
               </div>
            </div>

            {/* Seção Tipo Específico */}
            {reportType === "specific" && (
               <div className="bg-bee-dark-100 dark:bg-bee-dark-800 rounded-lg p-6 shadow">
                  <h2 className="text-xl font-bold flex gap-2 items-center mb-2">
                     <Icon name="filter" className="size-5" /> Critério Específico
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                     Selecione o critério para o relatório
                  </p>
                  <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                     <label className="font-medium min-w-[100px]">
                        Tipo:
                     </label>
                     <select
                        value={specificType}
                        onChange={(e) => setSpecificType(e.target.value)}
                        className="border border-bee-dark-300 dark:border-bee-dark-400 rounded px-3 py-2 bg-white dark:bg-bee-dark-800 w-full md:w-60"
                     >
                        <option value="ativos">Ativos</option>
                        <option value="return">Finalizado</option>
                        <option value="periodo">Período de tempo</option>
                        <option value="motorista">Motorista</option>
                        <option value="carro">Carro</option>
                        <option value="gestor">Gestor</option>
                     </select>
                  </div>
               </div>
            )}

            {/* Seção Evento */}
            {reportType === "single" && (
               <div className="bg-bee-dark-100 dark:bg-bee-dark-800 rounded-lg p-6 shadow">
                  <h2 className="text-xl font-bold flex gap-2 items-center mb-2">
                     <Icon name="calendar" className="size-5" /> Evento
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                     Você pode pesquisar por nome, tipo ou ID do evento
                  </p>
                  <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                     <label className="font-medium min-w-[100px]">
                        Buscar por:
                     </label>
                     <select
                        value={criterioEvento}
                        onChange={(e) => setCriterioEvento(e.target.value)}
                        className="border border-bee-dark-300 dark:border-bee-dark-400 rounded px-3 py-2 bg-white dark:bg-bee-dark-800 w-full md:w-60"
                     >
                        <option value="name">Nome</option>
                        <option value="type">Tipo</option>
                        <option value="id">ID</option>
                     </select>
                     <div className="relative w-full">
                        <InputText
                           type="text"
                           value={eventoInput}
                           onChange={(e) => {
                              setEventoInput(e.target.value);
                              setSelectedEvento(null);
                              setEventoError(false);
                              setEventoStatusError("");
                           }}
                           placeholder={`Digite o ${
                              criterioEvento === "name"
                                 ? "nome"
                                 : criterioEvento === "type"
                                   ? "tipo"
                                   : "ID"
                           } do evento`}
                           className={`${eventoError || eventoStatusError ? "border-red-500" : ""} w-full`}
                        />
                        {eventoInput &&
                           !selectedEvento &&
                           eventosFiltrados?.length > 0 && (
                              <ul className="absolute z-20 top-full left-0 right-0 bg-bee-dark-100 dark:bg-bee-dark-800 border border-bee-dark-300 dark:border-bee-dark-400 rounded shadow mt-1 max-h-48 overflow-auto">
                                 {eventosFiltrados.map((e) => (
                                    <li
                                       key={e.id}
                                       onClick={() => selecionarEvento(e)}
                                       className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                       {criterioEvento === "name"
                                          ? e.name
                                          : criterioEvento === "type"
                                            ? e.type
                                            : e.id}
                                    </li>
                                 ))}
                              </ul>
                           )}
                     </div>
                  </div>
                  {eventoError && (
                     <p className="text-red-500 text-sm font-bold mt-2">
                        Evento não encontrado. Verifique os dados ou cadastre um
                        novo evento.
                     </p>
                  )}
                  {eventoStatusError && (
                     <p className="text-red-500 text-sm font-bold mt-2">
                        {eventoStatusError}
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
                     (reportType === "single" && !selectedEvento) || carregando
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
                  <EventReportPreview reportData={relatorio} />
               </div>
            </div>
         )}
      </div>
   );
}
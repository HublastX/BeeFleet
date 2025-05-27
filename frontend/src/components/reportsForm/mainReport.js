"use client";
import Btn from "@/elements/btn";
import Icon from "@/elements/Icon";
import InputText from "@/elements/inputText";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ReportList from "../profileList/reportList";
import useCar from "@/hooks/useCar";
import useDrivers from "@/hooks/useDrivers";
import useAuth from "@/hooks/useAuth";
import useEvents from "@/hooks/useEvent";
import useReports from "@/hooks/useReports";
import GenericReport from "../reports/GenericReport";

export default function ReportForm() {
   const router = useRouter();
   const [dateRangeOption, setDateRangeOption] = useState("all");
   const [searchCriteria, setSearchCriteria] = useState("none");
   const [showSummary, setShowSummary] = useState(false);
   const [openReportList, setOpenReportList] = useState(false);
   const [selectedItem, setSelectedItem] = useState(null);

   const { carro } = useCar();
   const { motoristas } = useDrivers();
   const { gestores } = useAuth();
   const { events } = useEvents();
   const { getFullReport } = useReports();

   const retornado = events?.filter((e) => e.eventType === "RETURN");

   const toggleSummary = () => {
      setShowSummary(!showSummary);
   };

   const getListCount = () => {
      switch (searchCriteria) {
         case "carro":
            return carro.length;
         case "motorista":
            return motoristas.length;
         case "manager":
            return gestores.length;
         case "event":
            return retornado.length;
         default:
            return "";
      }
   };

   const [isReportOpen, setIsReportOpen] = useState(false);
   const [reportData, setReportData] = useState(null);
   const [reportFilters, setReportFilters] = useState({
      dateRange: "all",
      searchCriteria: "",
      selectedItem: null,
   });
   const [rangeStart, setRangeStart] = useState("");
   const [rangeEnd, setRangeEnd] = useState("");

   const handleSubmit = async (e) => {
      e.preventDefault();

      const filters = {
         dateRange: dateRangeOption,
         searchCriteria,
         selectedItem,
         startDate: dateRangeOption === "range" ? rangeStart : null,
         endDate: dateRangeOption === "range" ? rangeEnd : null,
      };

      try {
         const data = await getFullReport(filters);

         const encodedData = encodeURIComponent(JSON.stringify(data));
         const encodedFilters = encodeURIComponent(JSON.stringify(filters));

         router.push(
            `/report/result?data=${encodedData}&filters=${encodedFilters}`
         );
      } catch (error) {
         console.error("Erro ao gerar relatório:", error);
      }
   };

   return (
      <div className="max-w-4xl mx-auto p-4 overflow-y-auto max-h-[80vh]">
         <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Seção Período */}
            <div className="bg-white dark:bg-bee-dark-800 rounded-lg p-6 ">
               <div className="flex items-center gap-3 mb-4">
                  <Icon name="calendar" className="size-6" />
                  <h2 className="text-xl font-bold">Período</h2>
               </div>

               <div className="space-y-4">
                  <div className="flex flex-wrap gap-4">
                     <label className="inline-flex items-center">
                        <input
                           type="radio"
                           name="dateRangeOption"
                           value="all"
                           checked={dateRangeOption === "all"}
                           onChange={() => setDateRangeOption("all")}
                        />
                        <span className="ml-2">Todas as datas</span>
                     </label>

                     <label className="inline-flex items-center">
                        <input
                           type="radio"
                           name="dateRangeOption"
                           value="range"
                           checked={dateRangeOption === "range"}
                           onChange={() => setDateRangeOption("range")}
                        />
                        <span className="ml-2">Intervalo personalizado</span>
                     </label>

                     <label className="inline-flex items-center">
                        <input
                           type="radio"
                           name="dateRangeOption"
                           value="today"
                           checked={dateRangeOption === "today"}
                           onChange={() => setDateRangeOption("today")}
                        />
                        <span className="ml-2">Hoje</span>
                     </label>
                  </div>

                  {dateRangeOption === "range" && (
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                           <label className="block mb-2 font-medium">De</label>
                           <InputText
                              type="date"
                              className="w-full"
                              value={rangeStart}
                              onChange={(e) => setRangeStart(e.target.value)}
                           />
                        </div>
                        <div>
                           <label className="block mb-2 font-medium">Até</label>
                           <InputText
                              type="date"
                              className="w-full"
                              value={rangeEnd}
                              onChange={(e) => setRangeEnd(e.target.value)}
                           />
                        </div>
                     </div>
                  )}
               </div>
            </div>

            {/* Seção Filtros */}
            <div className="bg-white dark:bg-bee-dark-800 rounded-lg p-6 ">
               <div className="flex flex-col items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                     <Icon name="filtro" className="size-6" strokeWidth={2} />
                     <h2 className="text-xl font-bold">Filtros</h2>
                     <p className="italic text-bee-alert-300">*Opcional</p>
                  </div>
                  <p className="text-gray-400 text-sm italic">
                     ao selecionar um filtro, voce pode selecionar um item
                     expecifico
                  </p>
               </div>

               <div className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                     <label className="font-medium text-nowrap min-w-[100px]">
                        Filtrar por:
                     </label>
                     <select
                        value={searchCriteria}
                        onChange={(e) => {
                           setSearchCriteria(e.target.value);
                           setSelectedItem(null);
                        }}
                        className="border border-bee-dark-300 dark:border-bee-dark-400 rounded px-3 py-2 bg-white dark:bg-bee-dark-800 w-full md:w-40"
                     >
                        <option value="none">Não filtrar</option>
                        <option value="carro">Veículo</option>
                        <option value="motorista">Motorista</option>
                        <option value="manager">Gestor</option>
                        <option value="event">Evento</option>
                     </select>
                     <div className="flex-1 w-full">
                        <Btn
                           type="button"
                           variant="cancel"
                           onClick={() => setOpenReportList(true)}
                           className="max-w-48 min-w-48 text-nowrap"
                        >
                           {selectedItem
                              ? selectedItem.name ||
                                selectedItem.plate ||
                                (selectedItem.checkoutEventId
                                   ? `${selectedItem.checkoutEventId.substring(0, 5)}...`
                                   : "")
                              : searchCriteria !== "none"
                                ? `Selecionar ${
                                     {
                                        carro: "veículo",
                                        motorista: "motorista",
                                        manager: "gestor",
                                        event: "evento",
                                     }[searchCriteria]
                                  }`
                                : "Selecionar item"}
                        </Btn>
                     </div>
                  </div>
               </div>
            </div>

            {/* Resumo */}
            <div className="bg-bee-dark-100 dark:bg-gray-800 rounded-lg p-6 ">
               <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={toggleSummary}
               >
                  <div className="flex items-center gap-3">
                     <h2 className="text-xl font-bold">Resumo do Relatório</h2>
                  </div>
                  <Icon
                     name={!showSummary ? "prabaixo" : "pracima"}
                     className="size-6"
                     strokeWidth={2}
                  />
               </div>

               {showSummary && (
                  <div className="mt-4 p-4 space-y-4">
                     <div className="grid grid-cols-1 gap-5">
                        <div>
                           <h4 className="font-medium mb-2">
                              Período Selecionado
                           </h4>
                           <p>
                              {dateRangeOption === "all"
                                 ? "Todas as datas"
                                 : dateRangeOption === "today"
                                   ? "Hoje"
                                   : "Intervalo personalizado"}
                           </p>
                        </div>
                        <div>
                           <h4 className="font-medium mb-2">Filtro Aplicado</h4>
                           <p>
                              {searchCriteria === "carro"
                                 ? "Veículo: "
                                 : searchCriteria === "motorista"
                                   ? "Motorista: "
                                   : searchCriteria === "manager"
                                     ? "Gestor: "
                                     : searchCriteria === "event"
                                       ? "Evento: "
                                       : "Nenhum filtro aplicado"}
                              {selectedItem
                                 ? selectedItem.name ||
                                   selectedItem.plate ||
                                   (selectedItem.checkoutEventId
                                      ? `${selectedItem.checkoutEventId.substring(0, 15)}...`
                                      : "")
                                 : ""}
                           </p>
                        </div>
                     </div>
                  </div>
               )}
            </div>

            {/* botao*/}
            <div className="mt-6 pt-6 border-t-2 border-bee-dark-300 dark:border-bee-dark-400 flex justify-end gap-3">
               <Btn
                  type="button"
                  texto="Cancelar"
                  variant="cancel"
                  onClick={() => router.back()}
               />
               <Btn type="submit" texto="Gerar Relatório" />
            </div>
         </form>

         <ReportList
            open={openReportList}
            onClose={() => setOpenReportList(false)}
            onSelect={(item) => {
               setSelectedItem(item);
               setOpenReportList(false);
            }}
            selectedItem={selectedItem}
            tipo={
               searchCriteria === "carro"
                  ? "carros"
                  : searchCriteria === "motorista"
                    ? "motoristas"
                    : searchCriteria === "manager"
                      ? "gestores"
                      : searchCriteria === "event"
                        ? "eventos"
                        : ""
            }
         />

      </div>
   );
}

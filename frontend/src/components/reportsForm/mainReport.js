"use client";
import Btn from "@/elements/btn";
import Icon from "@/elements/Icon";
import InputText from "@/elements/inputText";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import ReportList from "../profileList/reportList";
import useAuth from "@/hooks/useAuth";
import useCar from "@/hooks/useCar";
import useDrivers from "@/hooks/useDrivers";
import useEvents from "@/hooks/useEvent";

export default function ReportForm() {
   const router = useRouter();
   const searchParams = useSearchParams();
   const { gestor } = useAuth();
   const { getCar } = useCar();
   const { getDriver } = useDrivers();
   const { getEvent } = useEvents();
   const [dateRangeOption, setDateRangeOption] = useState("all");
   const [searchCriteria, setSearchCriteria] = useState("all");
   const [showSummary, setShowSummary] = useState(false);
   const [openReportList, setOpenReportList] = useState(false);
   const [selectedItem, setSelectedItem] = useState(null);
   const [rangeStart, setRangeStart] = useState("");
   const [rangeEnd, setRangeEnd] = useState("");
   const [dateError, setDateError] = useState("");

   useEffect(() => {
      const filterType = searchParams.get("filterType");
      const filterId = searchParams.get("filterId");

      if (filterType) {
         setSearchCriteria(filterType);

         if (filterId) {
            if (filterType === "manager" && gestor && gestor.id === filterId) {
               setSelectedItem({
                  id: gestor.id,
                  name: gestor.name,
               });
            } else if (filterType === "carro") {
               const fetchCar = async () => {
                  try {
                     const carData = await getCar(filterId);
                     if (carData) {
                        setSelectedItem({
                           id: carData.id,
                           plate: carData.plate,
                        });
                     }
                  } catch (error) {
                     console.error("Erro ao buscar dados do carro:", error);
                  }
               };
               fetchCar();
            } else if (filterType === "motorista") {
               const fetchDriver = async () => {
                  try {
                     const driverData = await getDriver(filterId);
                     if (driverData) {
                        setSelectedItem({
                           id: driverData.id,
                           name: driverData.name,
                        });
                     }
                  } catch (error) {
                     console.error("Erro ao buscar dados do motorista:", error);
                  }
               };
               fetchDriver();
            } else if (filterType === "event") {
               const fetchEvent = async () => {
                  try {
                     const eventData = await getEvent(filterId);
                     if (eventData) {
                        setSelectedItem({
                           id: eventData.id,
                           checkoutEventId: eventData.id,
                        });
                     }
                  } catch (error) {
                     console.error("Erro ao buscar dados do evento:", error);
                  }
               };
               fetchEvent();
            }
         }
      }
   }, [searchParams, gestor, getCar, getDriver, getEvent]);

   const toggleSummary = () => {
      setShowSummary(!showSummary);
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      setDateError("");

      if (dateRangeOption === "range") {
         if (rangeStart && rangeEnd) {
            const startDate = new Date(rangeStart);
            const endDate = new Date(rangeEnd);
            const today = new Date();
            today.setHours(23, 59, 59, 999);
            if (endDate < startDate) {
               setDateError(
                  "A data final não pode ser menor que a data inicial"
               );
               return;
            }

            if (endDate > today) {
               setDateError("A data final não pode ser maior que hoje");
               return;
            }
         }
      }

      const params = new URLSearchParams();

      params.append("period", dateRangeOption);
      if (dateRangeOption === "range") {
         if (rangeStart) params.append("startDate", rangeStart);
         if (rangeEnd) params.append("endDate", rangeEnd);
      }

      params.append("filterType", searchCriteria);

      if (selectedItem) {
         params.append("filterId", selectedItem.id);
      }

      router.push(`/report/result?${params.toString()}`);
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
                              max={new Date().toISOString().split("T")[0]}
                           />
                        </div>
                        {dateError && (
                           <div className="col-span-2">
                              <p className="text-red-500 text-sm">
                                 {dateError}
                              </p>
                           </div>
                        )}
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
                        <option value="all">Buscar por tudo</option>
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
                              : searchCriteria !== "all"
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

"use client";
import React from "react";
import {
   Table,
   TableBody,
   TableCell,
   TableHeader,
   TableRow,
} from "../../elements/ui/table";
import Link from "next/link";
import TableSkeleton from "@/elements/ui/skeleton/TableSkeleton";
import useAuth from "@/hooks/useAuth";
import useEvents from "@/hooks/useEvent";
import Icon from "@/elements/Icon";
import Pagination from "./Pagination";
import { useState, useEffect } from "react";
import DeleteConfirmation from "../ConfirmDeleteModal";
import InputText from "@/elements/inputText";

export default function EventTable() {
   const { events, carregando, erro, deleteEvent } = useEvents();
   const { gestores } = useAuth();
   const [searchTerm, setSearchTerm] = useState("");
   const [aba, setAba] = useState("ATIVOS");

   console.log("Eventos:", events);

   // Eventos ativos
   const eventosCheckoutAtivos = events
      .filter(
         (event) =>
            event.eventType === "CHECKOUT" &&
            event.status === "ACTIVE" &&
            (!searchTerm ||
               event.car?.plate
                  ?.toLowerCase()
                  .includes(searchTerm.toLowerCase()) ||
               event.driver?.name
                  ?.toLowerCase()
                  .includes(searchTerm.toLowerCase()))
      )
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

   // Eventos finalizados
   const eventosCheckoutFinalizados = events
      .filter(
         (event) =>
            event.eventType === "RETURN" &&
            (!searchTerm ||
               event.car?.plate
                  ?.toLowerCase()
                  .includes(searchTerm.toLowerCase()) ||
               event.driver?.name
                  ?.toLowerCase()
                  .includes(searchTerm.toLowerCase()))
      )
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

   // Paginação
   const [currentPage, setCurrentPage] = useState(1);
   const itemsPerPage = 5;
   const eventosFiltrados =
      aba === "ATIVOS" ? eventosCheckoutAtivos : eventosCheckoutFinalizados;
   const totalPages = Math.ceil(eventosFiltrados.length / itemsPerPage);
   const startIndex = (currentPage - 1) * itemsPerPage;
   const currentEvents = eventosFiltrados.slice(
      startIndex,
      startIndex + itemsPerPage
   );

   useEffect(() => {
      setCurrentPage(1);
   }, [searchTerm, aba]);

   const [modalAberto, setModalAberto] = useState(false);
   const [eventoParaDeletar, setEventoParaDeletar] = useState(null);

   function abrirModalDeletar(evento) {
      setEventoParaDeletar(evento);
      setModalAberto(true);
   }

   function confirmarDelete() {
      if (eventoParaDeletar) {
         deleteEvent(eventoParaDeletar.id);
         setModalAberto(false);
         setEventoParaDeletar(null);
      }
   }

   if (carregando) return <TableSkeleton />;
   if (erro)
      return (
         <div className="text-center font-bold text-xl">
            <p className="text-bee-alert-300 mb-6">Erro: {erro}</p>
            <TableSkeleton />
         </div>
      );

   return (
      <div className="overflow-hidden rounded-lg border border-bee-dark-300 dark:border-bee-dark-400 w-full">
         <div className="flex gap-1 px-6 pt-3 bg-bee-dark-100 dark:bg-bee-dark-800 border-b border-bee-dark-300 dark:border-bee-dark-400">
            <button
               className={`font-semibold text-md px-4 py-2 rounded-t-lg transition-all ${aba === "ATIVOS" ? " text-bee-yellow-600 border-t border-l border-r border-bee-dark-300 dark:border-bee-dark-400" : "text-bee-dark-500 dark:text-bee-dark-300 hover:bg-bee-alert-500 dark:hover:bg-bee-alert-600"}`}
               onClick={() => setAba("ATIVOS")}
            >
               Ativos
            </button>
            <button
               className={`font-semibold text-md px-4 py-2 rounded-t-lg transition-all ${aba === "FINALIZADOS" ? "text-bee-yellow-600 border-t border-l border-r border-bee-dark-300 dark:border-bee-dark-400" : "text-bee-dark-500 dark:text-bee-dark-300 hover:bg-bee-alert-500 dark:hover:bg-bee-alert-600"}`}
               onClick={() => setAba("FINALIZADOS")}
            >
               Finalizados
            </button>
         </div>
         <div className="flex flex-row gap-3 p-4 border-b border-bee-dark-300 dark:border-bee-dark-400 bg-bee-dark-100 dark:bg-bee-dark-800">
            <div className="flex-1">
               <InputText
                  type="text"
                  variant="withIcon"
                  icon="search"
                  placeholder="Buscar por placa ou motorista..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
               />
            </div>
            {/* <Btn variant="secondary">
               <Icon name="filtro" className="size-7" />
            </Btn> */}
         </div>
         <div className="w-full overflow-x-auto lg:overflow-hidden no-scrollbar">
            <Table className="min-w-max md:min-w-full">
               <TableHeader className="border-b-2 border-bee-dark-300 dark:border-bee-dark-400 bg-bee-dark-100 dark:bg-bee-dark-800">
                  <TableRow>
                     <TableCell
                        isHeader
                        className="px-6 py-3 text-start font-medium text-bee-dark-700 dark:text-gray-200"
                     >
                        Placa do Carro
                     </TableCell>
                     <TableCell
                        isHeader
                        className="px-6 py-3 text-start font-medium text-bee-dark-700 dark:text-gray-200"
                     >
                        Motorista
                     </TableCell>
                     <TableCell
                        isHeader
                        className="px-6 py-3 text-start font-medium text-bee-dark-700 dark:text-gray-200"
                     >
                        Liberado por
                     </TableCell>
                     {aba === "ATIVOS" ? (
                        <>
                           <TableCell
                              isHeader
                              className="px-6 py-3 text-start font-medium text-bee-dark-700 dark:text-gray-200"
                           >
                              Data/Hora da saída
                           </TableCell>
                           <TableCell
                              isHeader
                              className="shadow-lg lg:shadow-none px-2 py-3 text-center font-medium text-bee-dark-700 dark:text-gray-200 bg-bee-dark-100 dark:bg-bee-dark-800 z-10 sticky right-0"
                           >
                              Finalizar
                           </TableCell>
                        </>
                     ) : (
                        <>
                           <TableCell
                              isHeader
                              className="px-6 py-3 text-start font-medium text-bee-dark-700 dark:text-gray-200"
                           >
                              Início
                           </TableCell>
                           <TableCell
                              isHeader
                              className="px-6 py-3 text-start font-medium text-bee-dark-700 dark:text-gray-200"
                           >
                              Fim
                           </TableCell>
                           <TableCell
                              isHeader
                              className="shadow-lg lg:shadow-none py-3 text-center font-medium text-bee-dark-700 dark:text-gray-200 bg-bee-dark-100 dark:bg-bee-dark-800 z-10 sticky right-21 w-20 min-w-[6rem]"
                           >
                              Relatorio
                           </TableCell>
                           <TableCell
                              isHeader
                              className=" py-3 text-center font-medium text-bee-dark-700 dark:text-gray-200 bg-bee-dark-100 dark:bg-bee-dark-800 z-10 sticky right-0 w-20 min-w-[6rem]"
                           >
                              Apagar
                           </TableCell>
                        </>
                     )}
                  </TableRow>
               </TableHeader>
               <TableBody className="divide-y divide-bee-dark-300 dark:divide-bee-dark-400 bg-bee-dark-100 dark:bg-bee-dark-800">
                  {currentEvents.map((event) => (
                     <TableRow
                        key={`cars/${event.carId}-${event.id}`}
                        className="hover:bg-bee-alert-500 dark:hover:bg-bee-alert-600 transition-colors"
                     >
                        <TableCell className="px-6 py-4 text-bee-dark-800 dark:text-bee-dark-100">
                           <Link
                              href={`/cars/${event.carId}`}
                              className="underline hover:text-bee-yellow-600 transition-colors"
                           >
                              {event.car?.plate || "Não informado"}
                           </Link>
                        </TableCell>
                        <TableCell className="px-6 py-4 text-bee-dark-800 dark:text-bee-dark-100">
                           <Link
                              href={`/drivers/${event.driverId}`}
                              className="underline hover:text-bee-yellow-600 transition-colors"
                           >
                              {event.driver?.name || "Não informado"}
                           </Link>
                        </TableCell>
                        <TableCell className="px-6 py-4 text-bee-dark-800 dark:text-bee-dark-100">
                           {gestores.find((g) => g.id === event.managerId)
                              ?.name || (
                              <span className="italic text-bee-alert-500 dark:text-bee-alert-400">
                                 Gestor não encontrado
                              </span>
                           )}
                        </TableCell>
                        {aba === "ATIVOS" ? (
                           <>
                              <TableCell className="px-6 py-4 text-bee-dark-600 dark:text-bee-dark-300">
                                 {event.createdAt
                                    ? new Date(event.createdAt).toLocaleString(
                                         "pt-BR"
                                      )
                                    : "-"}
                              </TableCell>
                              <TableCell className="shadow-lg lg:shadow-none py-4 text-center border-l border-bee-dark-300 dark:border-bee-dark-400 bg-bee-dark-100 dark:bg-bee-dark-800 z-10 sticky right-0">
                                 <Link
                                    href={`/event?tipo=chegada&carroId=${event.carId}`}
                                    className="inline-flex items-center justify-center w-9 h-9 rounded-full hover:bg-bee-yellow-100 dark:hover:bg-bee-dark-700 transition-colors"
                                 >
                                    <Icon
                                       strokeWidth={2}
                                       name="evento"
                                       className="size-6 text-bee-yellow-600 hover:text-bee-yellow-700"
                                    />
                                 </Link>
                              </TableCell>
                           </>
                        ) : (
                           <>
                              <TableCell className="px-6 py-4 text-bee-dark-600 dark:text-bee-dark-300">
                                 {event.createdAt
                                    ? new Date(event.createdAt).toLocaleString(
                                         "pt-BR"
                                      )
                                    : "-"}
                              </TableCell>
                              <TableCell className="px-6 py-4 text-bee-dark-600 dark:text-bee-dark-300">
                                 {event.endedAt
                                    ? new Date(event.endedAt).toLocaleString(
                                         "pt-BR"
                                      )
                                    : "-"}
                              </TableCell>
                              <TableCell className="shadow-lg lg:shadow-none py-4 text-center border-l border-bee-dark-300 dark:border-bee-dark-400 bg-bee-dark-100 dark:bg-bee-dark-800 z-10 sticky right-21 w-20 min-w-[6rem]">
                                 <Link
                                    href="/report"
                                    className="inline-flex p-1 items-center justify-center rounded-full hover:bg-bee-yellow-100  transition-colors"
                                 >
                                    <Icon
                                       strokeWidth={2}
                                       name="reports"
                                       className="size-6 text-bee-yellow-600"
                                    />
                                 </Link>
                              </TableCell>
                              <TableCell className=" py-4 text-center bg-bee-dark-100 dark:bg-bee-dark-800 z-10 sticky right-0 w-20 min-w-[6rem]">
                                 <button
                                    aria-label="Deletar evento"
                                    onClick={() => abrirModalDeletar(event)}
                                    className="inline-flex p-1 items-center justify-center rounded-full hover:bg-bee-alert-400  transition-colors"
                                 >
                                    <Icon
                                       strokeWidth={2}
                                       name="trash"
                                       className="size-6 text-bee-alert-300"
                                    />
                                 </button>
                              </TableCell>
                           </>
                        )}
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </div>
            {!carregando && !erro && totalPages > 1 && (
               <div className="flex justify-end px-6 py-3 border-t border-bee-dark-300 dark:border-bee-dark-400 bg-bee-dark-100 dark:bg-bee-dark-800">
                  <Pagination
                     currentPage={currentPage}
                     totalPages={totalPages}
                     onPageChange={setCurrentPage}
                     totalItems={eventosFiltrados.length}
                  />
               </div>
            )}
         {modalAberto && (
            <DeleteConfirmation
               link={confirmarDelete}
               tipo="Evento"
               onClose={() => setModalAberto(false)}
            />
         )}
      </div>
   );
}

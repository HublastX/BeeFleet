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

export default function EventTable({ searchTerm }) {
   const { events, carregando, erro } = useEvents();
   const { gestores } = useAuth();

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

   const [currentPage, setCurrentPage] = useState(1);
   const itemsPerPage = 5;
   const totalPages = Math.ceil(eventosCheckoutAtivos.length / itemsPerPage);
   const startIndex = (currentPage - 1) * itemsPerPage;
   const currentEvents = eventosCheckoutAtivos.slice(
      startIndex,
      startIndex + itemsPerPage
   );

   useEffect(() => {
      setCurrentPage(1);
   }, [searchTerm]);

   if (carregando) return <TableSkeleton />;
   if (erro)
      return (
         <div className="text-center font-bold text-xl">
            <p className="text-bee-alert-300 mb-6">Erro: {erro}</p>
            <TableSkeleton />
         </div>
      );
   if (eventosCheckoutAtivos.length === 0)
      return (
         <div className="flex items-center justify-center p-6 w-full h-full">
            <div className="text-center font-semibold text-xl ">
               Nenhum evento de saída ativo encontrado
            </div>
         </div>
      );

   return (
      <div className="overflow-hidden rounded-2xl border border-bee-dark-300 bg-bee-dark-50 dark:border-bee-dark-400 dark:bg-bee-dark-900 shadow-lg w-full min-w-max">
         <div className="px-6 py-4 bg-bee-dark-100 dark:bg-bee-dark-800 flex items-center gap-2">
            <span className="font-bold text-lg">
               Eventos ativos no momento
            </span>
         </div>
         <div className="w-full overflow-x-auto">
            <Table className="min-w-full">
               <TableHeader className="border-b border-bee-dark-300 dark:border-bee-dark-400 bg-bee-dark-100 dark:bg-bee-dark-800">
                  <TableRow>
                     <TableCell isHeader className="px-6 py-4 text-start">
                        Placa do Carro
                     </TableCell>
                     <TableCell isHeader className="px-6 py-4 text-start">
                        Motorista
                     </TableCell>
                     <TableCell isHeader className="px-6 py-4 text-start">
                        Liberado por
                     </TableCell>
                     <TableCell isHeader className="px-6 py-4 text-start">
                        Data/Hora
                     </TableCell>
                     <TableCell isHeader className="px-0 py-4 text-center">
                        Finalizar
                     </TableCell>
                     <TableCell isHeader className="px-0 py-4 text-center">
                        Apagar
                     </TableCell>
                  </TableRow>
               </TableHeader>
               <TableBody className="divide-y divide-bee-dark-300 dark:divide-bee-dark-400 bg-bee-dark-100 dark:bg-bee-dark-800">
                  {eventosCheckoutAtivos.map((event) => (
                     <TableRow
                        key={`cars/${event.carId}`}
                        className="hover:bg-bee-alert-500 dark:hover:bg-bee-alert-600 transition"
                     >
                        <TableCell className="px-6 py-4">
                           <Link
                              href={`/cars/${event.carId}`}
                              className="underline"
                           >
                              {event.car?.plate || "Não informado"}
                           </Link>
                        </TableCell>
                        <TableCell className="px-6 py-4">
                           <Link
                              href={`drivers/${event.driverId}`}
                              className="underline"
                           >
                              {event.driver?.name || "Não informado"}
                           </Link>
                        </TableCell>
                        <TableCell className="px-6 py-4">
                           {gestores.find((g) => g.id === event.managerId)
                              ?.name || (
                              <span className="italic text-bee-alert-400">
                                 Gestor não encontrado
                              </span>
                           )}
                        </TableCell>
                        <TableCell className="px-6 py-4">
                           {event.createdAt
                              ? new Date(event.createdAt).toLocaleString(
                                   "pt-BR"
                                )
                              : "-"}
                        </TableCell>
                        <TableCell className="py-4 text-center border-l border-bee-dark-300 dark:border-bee-dark-400 text-bee-yellow-600 hover:text-bee-yellow-700 transition">
                           <Link
                              href={`event?tipo=chegada&carroId=${event.carId}`}
                           >
                              <Icon
                                 strokeWidth={2}
                                 name="evento"
                                 className="w-7 h-7 mx-auto"
                              />
                           </Link>
                        </TableCell>
                        <TableCell className="py-4 text-center">
                           <button
                              //   onClick={() => abrirModalDeletar(carro)}
                              className="inline-block text-bee-alert-300 hover:text-bee-alert-400 bg-transparent hover:bg-transparent shadow-transparent cursor-pointer transition"
                           >
                              <Icon
                                 strokeWidth={2}
                                 name="trash"
                                 className="w-7 h-7 mx-auto"
                              />
                           </button>
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
            {!carregando && !erro && totalPages > 1 && (
               <div className="flex justify-end md:px-6 px-2 py-4 sm:justify-center">
                  <Pagination
                     currentPage={currentPage}
                     totalPages={totalPages}
                     onPageChange={setCurrentPage}
                     totalItems={eventosCheckoutAtivos.length}
                  />
               </div>
            )}
         </div>
      </div>
   );
}

"use client";
import React from "react";
import {
   Table,
   TableBody,
   TableCell,
   TableHeader,
   TableRow,
} from "../../elements/ui/table";
import useEvents from "@/hooks/useEvent";
import useDrivers from "@/hooks/useDrivers";
import { useParams } from "next/navigation";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import useAuth from "@/hooks/useAuth";

export default function DetailCarTable() {
   const { events } = useEvents();
   const { id } = useParams();
   const { motoristas } = useDrivers();
   const { gestores } = useAuth();

   const carEvents = events
      .filter((event) => event.carId === id)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

   const formatDate = (dateString) => {
      const date = new Date(dateString);
      return format(date, "dd/MM/yyyy, HH'h'mm", { locale: ptBR });
   };

   const getManagerName = (managerId) => {
      const manager = gestores.find((g) => g.id === managerId);
      return manager ? manager.name : "Gestor não encontrado";
   };

   const getDriverName = (driverId) => {
      const driver = motoristas.find((d) => d.id === driverId);
      return driver ? driver.name : "Motorista não encontrado";
   };

   const translateStatus = (eventType) => {
      return eventType === "CHECKOUT" ? "Saída" : "Chegada";
   };

   return carEvents.length > 0 ? (
      <div className="hidden md:flex overflow-x-auto rounded-xl border border-bee-dark-300 bg-bee-dark-100 dark:border-bee-dark-400 dark:bg-bee-dark-800">
         <Table className="min-w-[500px] text-sm sm:text-base">
            {/* Table Header */}
            <TableHeader className="border-b border-bee-dark-300 dark:border-bee-dark-400 text-bee-dark-600 dark:text-bee-alert-500">
               <TableRow>
                  <TableCell
                     isHeader
                     className="px-3 py-2 sm:px-5 sm:py-3 text-start whitespace-nowrap"
                  >
                     Tipo
                  </TableCell>
                  <TableCell
                     isHeader
                     className="px-3 py-2 sm:px-5 sm:py-3 text-start whitespace-nowrap"
                  >
                     Motorista
                  </TableCell>
                  <TableCell
                     isHeader
                     className="px-3 py-2 sm:px-5 sm:py-3 text-start whitespace-nowrap"
                  >
                     Data
                  </TableCell>
                  <TableCell
                     isHeader
                     className="px-3 py-2 sm:px-5 sm:py-3 text-start whitespace-nowrap"
                  >
                     Registrado por
                  </TableCell>
               </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-bee-dark-300 dark:divide-bee-dark-400">
               {carEvents.map((event) => (
                  <TableRow
                     key={event.id}
                     className="dark:hover:bg-bee-alert-600 hover:bg-bee-alert-500"
                  >
                     <TableCell className={`px-3 py-2 sm:px-4 sm:py-3 text-start dark:text-bee-alert-500 whitespace-nowrap ${translateStatus(event.eventType) === "Chegada" ? "text-bee-alert-100" : "text-bee-alert-300"}`}>
                        {translateStatus(event.eventType)}
                     </TableCell>
                     <TableCell className="px-3 py-2 sm:px-4 sm:py-3 text-bee-dark-600 text-start dark:text-bee-alert-500 whitespace-nowrap">
                        {getDriverName(event.driverId)}
                     </TableCell>
                     <TableCell className="px-3 py-2 sm:px-4 sm:py-3 text-bee-dark-600 text-start dark:text-bee-alert-500 whitespace-nowrap">
                        {formatDate(event.createdAt)}
                     </TableCell>
                     <TableCell className="px-3 py-2 sm:px-4 sm:py-3 text-bee-dark-600 text-start dark:text-bee-alert-500 whitespace-nowrap">
                        {getManagerName(event.managerId)}
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </div>
   ) : (
      <div className="text-center text-bee-dark-600 dark:text-bee-alert-500 py-4">
         Ainda não há nenhum evento registrado com este carro.
      </div>);
}

"use client";
import React from "react";
import {
   Table,
   TableBody,
   TableCell,
   TableHeader,
   TableRow,
} from "../../elements/ui/table";
import useAuth from "@/hooks/useAuth";
import Image from "next/image";
import TableSkeleton from "@/elements/ui/skeleton/TableSkeleton";
import Icon from "@/elements/Icon";

function formatarData(dataISO) {
   const data = new Date(dataISO);
   return new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "full",
      timeStyle: "short",
   }).format(data);
}
export default function ManagersTable() {
   const { gestores, carregando, erro } = useAuth();

   if (carregando) return <TableSkeleton />;
   if (erro)
      return (
         <div className="text-center font-bold text-xl">
            <p className="text-bee-alert-300 mb-6">Erro: {erro}</p>{" "}
            <TableSkeleton />{" "}
         </div>
      );
   if (gestores.length === 0)
      return (
         <div className="flex items-center justify-center p-6 w-full h-full">
            <div className="text-center font-semibold text-xl ">
               Nenhum gestor foi encontrado
            </div>
         </div>
      );

   return (
      <div className="w-screen -mx-4 px-4 md:w-full lg:m-0 flex items-center justify-center">
         <div className="w-full overflow-x-auto rounded-xl border border-bee-dark-300 bg-bee-dark-100 dark:border-bee-dark-400 dark:bg-bee-dark-800">
            <Table className="w-full lg:min-w-[500px] text-sm sm:text-base">
               {/* Table Header */}
               <TableHeader className="border-b border-bee-dark-300 dark:border-bee-dark-400 text-bee-dark-600 dark:text-bee-alert-500">
                  <TableRow>
                     <TableCell
                        isHeader
                        className="px-3 py-2 sm:px-5 sm:py-3 text-start whitespace-nowrap"
                     >
                        Nome
                     </TableCell>
                     <TableCell
                        isHeader
                        className="px-3 py-2 sm:px-5 sm:py-3 text-start whitespace-nowrap"
                     >
                        Email
                     </TableCell>
                     <TableCell
                        isHeader
                        className="px-3 py-2 sm:px-5 sm:py-3 text-start whitespace-nowrap"
                     >
                        Total de eventos
                     </TableCell>
                     <TableCell
                        isHeader
                        className="px-3 py-2 sm:px-5 sm:py-3 text-start whitespace-nowrap"
                     >
                        Data de entrada
                     </TableCell>
                  </TableRow>
               </TableHeader>

               {/* Table Body */}
               <TableBody className="divide-y divide-bee-dark-300 dark:divide-bee-dark-400">
                  {gestores.map((gestor) => (
                     <TableRow
                        key={gestor.id}
                        className="dark:hover:bg-bee-alert-600 hover:bg-bee-alert-500"
                     >
                        <TableCell className="px-3 py-2 sm:px-4 sm:py-3 text-bee-dark-600 text-start dark:text-bee-alert-500 whitespace-nowrap">
                           <div className="flex row gap-3">
                              {gestor.image ? (
                                 <div className="w-10 h-10 rounded-full overflow-hidden relative">
                                    <Image
                                       src={gestor.image}
                                       alt="img"
                                       fill
                                       unoptimized
                                       className="object-cover"
                                    />
                                 </div>
                              ) : (
                                 <div className="w-10 h-10 rounded-full overflow-hidden relative">
                                    <Icon name="UserCircle" />
                                 </div>
                              )}
                              {gestor.name}
                           </div>
                        </TableCell>
                        <TableCell className="px-3 py-2 sm:px-4 sm:py-3 text-bee-dark-600 text-start dark:text-bee-alert-500 whitespace-nowrap">
                           {gestor.email}
                        </TableCell>
                        <TableCell className="px-3 py-2 sm:px-4 sm:py-3 text-bee-dark-600 text-start dark:text-bee-alert-500 whitespace-nowrap">
                           {gestor.event}
                        </TableCell>
                        <TableCell className="px-3 py-2 sm:px-4 sm:py-3 text-bee-dark-600 text-start dark:text-bee-alert-500 whitespace-nowrap">
                           {formatarData(gestor.createdAt)}
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </div>
      </div>
   );
}

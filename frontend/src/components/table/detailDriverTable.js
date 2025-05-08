"use client";
import React from "react";
import {
   Table,
   TableBody,
   TableCell,
   TableHeader,
   TableRow,
} from "../../elements/ui/table";

export default function DetailDriverTable() {
   return (
      <div className="hidden md:flex overflow-x-auto rounded-xl border border-bee-dark-300 bg-bee-dark-100 dark:border-bee-dark-400 dark:bg-bee-dark-800">
         <Table className="min-w-[500px] text-sm sm:text-base">
            {/* Table Header */}
            <TableHeader className="border-b border-bee-dark-300 dark:border-bee-dark-400 text-bee-dark-600 dark:text-bee-alert-500">
               <TableRow>
                  <TableCell isHeader className="px-3 py-2 sm:px-5 sm:py-3 text-start whitespace-nowrap">
                     Tipo
                  </TableCell>
                  <TableCell isHeader className="px-3 py-2 sm:px-5 sm:py-3 text-start whitespace-nowrap">
                     Carro
                  </TableCell>
                  <TableCell isHeader className="px-3 py-2 sm:px-5 sm:py-3 text-start whitespace-nowrap">
                     Data
                  </TableCell>
                  <TableCell isHeader className="px-3 py-2 sm:px-5 sm:py-3 text-start whitespace-nowrap">
                     Registrado por
                  </TableCell>
               </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-bee-dark-300 dark:divide-bee-dark-400">
               <TableRow className="dark:hover:bg-bee-alert-600 hover:bg-bee-alert-500">
                  <TableCell className="px-3 py-2 sm:px-4 sm:py-3 text-bee-dark-600 text-start dark:text-bee-alert-500 whitespace-nowrap">
                     Saída
                  </TableCell>
                  <TableCell className="px-3 py-2 sm:px-4 sm:py-3 text-bee-dark-600 text-start dark:text-bee-alert-500 whitespace-nowrap">
                     HB20 - ABC1234
                  </TableCell>
                  <TableCell className="px-3 py-2 sm:px-4 sm:py-3 text-bee-dark-600 text-start dark:text-bee-alert-500 whitespace-nowrap">
                     03/05/2025, 14h
                  </TableCell>
                  <TableCell className="px-3 py-2 sm:px-4 sm:py-3 text-bee-dark-600 text-start dark:text-bee-alert-500 whitespace-nowrap">
                     Davi Brito
                  </TableCell>
               </TableRow>
            </TableBody>
         </Table>
      </div>
   );
}

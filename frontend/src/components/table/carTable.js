"use client";
import React, { useState } from "react";
import {
   Table,
   TableBody,
   TableCell,
   TableHeader,
   TableRow,
} from "../../elements/ui/table";
import Link from "next/link";
import Badge from "../../elements/ui/badge/Badge";
import useCar from "@/hooks/useCar";
import Icon from "@/elements/Icon";
import Pagination from "./Pagination";
import TableSkeleton from "@/elements/ui/table/TableSkeleton";

export default function CarTable() {
   const { carro, carregando, erro, deleteCar } = useCar();
   const [ordenarPorStatus, setOrdenarPorStatus] = useState(false);
   const [ordenarPorNome, setOrdenarPorNome] = useState(false);
   const CarrosOrdenados = (() => {
      let copia = [...carro];

      if (ordenarPorStatus) {
         copia.sort((a, b) => b.isAvailable - a.isAvailable);
      }

      if (ordenarPorNome) {
         copia.sort((a, b) => a.model.localeCompare(b.model));
      }

      return copia;
   })();

   const [currentPage, setCurrentPage] = useState(1);
   const itemsPerPage = 2;
   const totalPages = Math.ceil((carro?.length || 0) / itemsPerPage);
   const startIndex = (currentPage - 1) * itemsPerPage;
   const currentCar = CarrosOrdenados.slice(
      startIndex,
      startIndex + itemsPerPage
   );

   return (
      <div className="overflow-hidden rounded-xl border border-bee-dark-300 bg-white dark:border-bee-dark-400 dark:bg-bee-dark-800">
         {carregando && (
            <div className="p-4">
               <TableSkeleton />
            </div>
         )}
         {erro && (
            <div className="p-4">
               <TableSkeleton />
               <p className="text-bee-alert-300">Erro: {erro}</p>
            </div>
         )}
         <div className="max-w-full overflow-x-auto">
            <div>
               {!carregando && !erro && (
                  <Table>
                     {/*  table header */}
                     <TableHeader className="border-b border-bee-dark-300 dark:border-bee-dark-400 text-bee-dark-600 dark:text-bee-alert-500">
                        <TableRow>
                           <TableCell
                              isHeader
                              className="px-5 py-3 text-start text-theme-xs md:table-cell"
                           >
                              <div
                                 onClick={() =>
                                    setOrdenarPorNome((prev) => !prev)
                                 }
                                 className="cursor-pointer hover:underline w-fit"
                              >
                                 Carro
                              </div>
                           </TableCell>

                           <TableCell
                              isHeader
                              className="px-5 py-3 text-start text-theme-xs hidden md:table-cell"
                           >
                              Placa
                           </TableCell>
                           <TableCell
                              isHeader
                              className="px-5 py-3 text-start text-theme-xs hidden md:table-cell"
                           >
                              <div
                                 onClick={() => {
                                    setOrdenarPorStatus((prev) => !prev);
                                 }}
                                 className="cursor-pointer hover:underline"
                              >
                                 Status
                              </div>
                           </TableCell>

                           <TableCell
                              isHeader
                              className="px-3 py-3 text-center text-theme-xs "
                           >
                              Vizualizar
                           </TableCell>
                           <TableCell
                              isHeader
                              className="px-3 py-3 text-center text-theme-xs"
                           >
                              Deletar
                           </TableCell>
                        </TableRow>
                     </TableHeader>

                     {/* Table Body */}
                     <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                        {currentCar.map((carro) => (
                           <TableRow
                              key={carro.id}
                              className="hover:bg-bee-alert-500 hover:dark:bg-bee-dark-400"
                           >
                              <TableCell className="block md:hidden px-5 py-4 text-start">
                                 <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 overflow-hidden rounded-full">
                                       <Icon name="truck" />
                                    </div>
                                    <div>
                                       <span
                                          className={`font-medium text-theme-sm ${
                                             carro.isAvailable
                                                ? "text-green-600 dark:text-green-400"
                                                : "text-red-600 dark:text-red-400"
                                          }`}
                                       >
                                          {carro.model}
                                       </span>
                                    </div>
                                 </div>
                              </TableCell>

                              <TableCell className="hidden md:table-cell px-5 py-4 sm:px-6 text-start">
                                 <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 overflow-hidden rounded-full">
                                       <Icon name="truck" />
                                    </div>
                                    <div>
                                       <span className="block font-medium text-bee-dark-600 text-theme-sm dark:text-bee-dark-100">
                                          {carro.model}
                                       </span>
                                    </div>
                                 </div>
                              </TableCell>

                              <TableCell className="hidden md:table-cell px-4 py-3 text-bee-dark-600 text-start font-bold dark:text-bee-dark-100">
                                 {carro.plate}
                              </TableCell>

                              <TableCell className="hidden md:table-cell px-4 py-3 text-bee-dark-600 text-c font-bold dark:text-bee-dark-100">
                                 <Badge
                                    size="sm"
                                    color={
                                       carro.isAvailable ? "success" : "error"
                                    }
                                 >
                                    {carro.isAvailable
                                       ? "Disponível"
                                       : "Indisponível"}
                                 </Badge>
                              </TableCell>

                              <TableCell className="px-4 py-3 text-center border-l border-bee-dark-300 dark:border-bee-dark-400">
                                 <Link
                                    href={`/cars/${carro.id}`}
                                    className="inline-block text-bee-yellow-500 hover:text-bee-yellow-700"
                                 >
                                    <Icon
                                       strokeWidth={1.5}
                                       name="eye"
                                       className="w-8 h-8 mx-auto"
                                    />
                                 </Link>
                              </TableCell>

                              <TableCell className="px-4 py-3 text-center">
                                 <Link
                                    href="/"
                                    onClick={() => deleteCar(carro.id)}
                                    className="inline-block text-bee-alert-300 hover:text-bee-alert-400"
                                 >
                                    <Icon
                                       strokeWidth={1.5}
                                       name="trash"
                                       className="w-8 h-8 mx-auto"
                                    />
                                 </Link>
                              </TableCell>
                           </TableRow>
                        ))}
                     </TableBody>
                  </Table>
               )}

               {/* paginacao */}
               {!carregando && !erro && totalPages > 1 && (
                  <div className="flex justify-end md:px-6 px-2 py-4 sm:justify-center">
                     <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                        totalMotoristas={carro.length}
                     />
                  </div>
               )}
            </div>
         </div>
      </div>
   );
}

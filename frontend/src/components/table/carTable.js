"use client";
import React, { useEffect, useState } from "react";
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
import TableSkeleton from "@/elements/ui/skeleton/TableSkeleton";
import Image from "next/image";
import DeleteConfirmation from "../ConfirmDeleteModal";

export default function CarTable({ searchTerm }) {
   const { carro, carregando, erro, deleteCar } = useCar();
   const [ordenarPorStatus, setOrdenarPorStatus] = useState(false);
   const [ordenarPorNome, setOrdenarPorNome] = useState(false);
   const CarrosOrdenados = (() => {
      let copia = [...carro];

      copia.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

      if (ordenarPorStatus) {
         copia.sort((a, b) => b.isAvailable - a.isAvailable);
      }

      if (ordenarPorNome) {
         copia.sort((a, b) => a.model.localeCompare(b.model));
      }

      return copia;
   })();

   const carrosFiltrados = CarrosOrdenados.filter((carro) => {
      if (!searchTerm) return true;
      const termo = searchTerm.toLowerCase();
      return (
         carro.model.toLowerCase().includes(termo) ||
         carro.plate.toLowerCase().includes(termo)
      );
   });

   const [currentPage, setCurrentPage] = useState(1);
   const itemsPerPage = 5;
   const totalPages = Math.ceil(carrosFiltrados.length / itemsPerPage);
   const startIndex = (currentPage - 1) * itemsPerPage;
   const currentCar = carrosFiltrados.slice(
      startIndex,
      startIndex + itemsPerPage
   );

   const [modalAberto, setModalAberto] = useState(false);
   const [carroParaDeletar, setCarroParaDeletar] = useState(null);

   function abrirModalDeletar(carro) {
      setCarroParaDeletar(carro);
      setModalAberto(true);
   }

   function confirmarDelete() {
      if (carroParaDeletar) {
         deleteCar(carroParaDeletar.id);
         setModalAberto(false);
         setCarroParaDeletar(null);
      }
   }

   useEffect(() => {
      setCurrentPage(1);
   }, [searchTerm]);

   if (carregando) return <TableSkeleton />;
   if (erro)
      return (
         <div className="text-center font-bold text-xl">
            <p className="text-bee-alert-300 mb-6">Erro: {erro}</p>{" "}
            <TableSkeleton />{" "}
         </div>
      );
   if (currentCar.length === 0)
      return (
         <div className="flex items-center justify-center p-6 w-full h-full">
            <div className="text-center font-semibold text-xl ">
               Nenhum gestor foi encontrado
            </div>
         </div>
      );

   return (
      <div className="overflow-hidden rounded-xl border border-bee-dark-300 bg-bee-dark-100 dark:border-bee-dark-400 dark:bg-bee-dark-800">
         <div className="max-w-full overflow-x-auto">
            <div>
               {!carregando && !erro && (
                  <Table>
                     {/*  table header */}
                     <TableHeader className="border-b border-bee-dark-300 dark:border-bee-dark-400 text-bee-dark-600 dark:text-bee-alert-500">
                        <TableRow>
                           <TableCell
                              isHeader
                              className="px-5 py-3 text-start md:table-cell "
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
                              className="px-5 py-3 text-start hidden md:table-cell"
                           >
                              Placa
                           </TableCell>
                           <TableCell
                              isHeader
                              className="px-5 py-3 text-start hidden md:table-cell"
                           >
                              Odometro
                           </TableCell>
                           <TableCell
                              isHeader
                              className="px-5 py-3 text-start hidden md:table-cell"
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
                              className="px-3 md:px-1 py-3 text-center "
                           >
                              Vizualizar
                           </TableCell>
                           <TableCell
                              isHeader
                              className="px-3 md:px-1 py-3 text-center"
                           >
                              Deletar
                           </TableCell>
                        </TableRow>
                     </TableHeader>

                     {/* Table Body */}
                     <TableBody className="divide-y divide-bee-dark-300 dark:divide-bee-dark-400">
                        {currentCar.map((carro) => (
                           <TableRow
                              key={carro.id}
                              className="dark:hover:bg-bee-alert-600 hover:bg-bee-alert-500"
                           >
                              <TableCell className="block md:hidden px-5 py-4 text-start">
                                 <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 overflow-hidden rounded-full">
                                       {carro.image ? (
                                          <Image
                                             src={carro.image}
                                             alt={`Imagem do carro ${carro.model}`}
                                             width={100}
                                             height={100}
                                             objectFit="cover"
                                             className="w-full h-full object-cover"
                                          />
                                       ) : (
                                          <Icon name="car" />
                                       )}
                                    </div>
                                    <div>
                                       <span
                                          className={`font-medium ${
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
                                    <div className="w-12 h-12 overflow-hidden rounded-full">
                                       {carro.image ? (
                                          <Image
                                             src={carro.image}
                                             alt={`Imagem do carro ${carro.model}`}
                                             width={100}
                                             height={100}
                                             objectFit="cover"
                                             className="w-full h-full object-cover"
                                          />
                                       ) : (
                                          <Icon name="car" />
                                       )}
                                    </div>
                                    <div>
                                       <span className="block text-bee-dark-600 dark:text-bee-alert-500">
                                          {carro.model}
                                       </span>
                                    </div>
                                 </div>
                              </TableCell>

                              <TableCell className="hidden md:table-cell px-4 py-3 text-bee-dark-600 text-start dark:text-bee-alert-500">
                                 {carro.plate}
                              </TableCell>
                              <TableCell className="hidden md:table-cell px-4 py-3 text-bee-dark-600 text-start dark:text-bee-alert-500">
                                 {carro.odometer} km
                              </TableCell>

                              <TableCell className="hidden md:table-cell px-4 py-3 text-bee-dark-600 dark:text-bee-alert-500">
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

                              <TableCell className="py-3 text-center border-l border-bee-dark-300 dark:border-bee-dark-400">
                                 <Link
                                    href={`/cars/${carro.id}`}
                                    className="inline-block text-bee-yellow-500 hover:text-bee-yellow-700"
                                 >
                                    <Icon
                                       strokeWidth={2}
                                       name="eye"
                                       className="w-8 h-8 mx-auto"
                                    />
                                 </Link>
                              </TableCell>

                              <TableCell className=" py-3 text-center">
                                 <button
                                    onClick={() => abrirModalDeletar(carro)}
                                    className="inline-block text-bee-alert-300 hover:text-bee-alert-400 bg-transparent hover:bg-transparent shadow-transparent cursor-pointer"
                                 >
                                    <Icon
                                       strokeWidth={2}
                                       name="trash"
                                       className="w-8 h-8 mx-auto"
                                    />
                                 </button>
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
                        totalItems={carro.length}
                     />
                  </div>
               )}
            </div>
         </div>
         {modalAberto && (
            <DeleteConfirmation
               link={confirmarDelete}
               tipo="carro"
               onClose={() => setModalAberto(false)}
            />
         )}
      </div>
   );
}

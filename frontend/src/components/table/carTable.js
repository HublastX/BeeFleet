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
   if (currentCar.length === 0 && !erro && !carregando)
      return (
         <div className="flex flex-col items-center justify-center p-12 w-full h-full bg-white dark:bg-bee-dark-800 rounded-xl border border-dashed border-bee-dark-300 dark:border-bee-dark-400">
            <Icon
               name="car"
               className="size-16 text-gray-400 dark:text-gray-500 mb-4"
            />
            <div className="text-center">
               <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                  Nenhum veículo encontrado
               </h3>
               <p className="text-gray-500 dark:text-gray-400 mt-1">
                  {searchTerm
                     ? "Tente ajustar sua busca"
                     : "Adicione um novo veículo para começar"}
               </p>
            </div>
         </div>
      );

   return (
      <div className="overflow-hidden rounded-xl border border-bee-dark-300 bg-bee-dark-100 dark:border-bee-dark-400 dark:bg-bee-dark-800">
         <div className="w-full overflow-x-auto lg:overflow-hidden no-scrollbar">
            <div>
               {!carregando && !erro && (
                  <Table>
                     {/*  table header */}
                     <TableHeader className="border-b border-bee-dark-300 dark:border-bee-dark-400 text-bee-dark-600 dark:text-bee-alert-500">
                        <TableRow>
                           <TableCell
                              isHeader
                              className="px-5 py-3 text-start font-medium text-bee-dark-700 dark:text-gray-200"
                           >
                              <div
                                 onClick={() =>
                                    setOrdenarPorNome((prev) => !prev)
                                 }
                                 className="cursor-pointer hover:underline w-fit"
                              >
                                 Veículo
                              </div>
                           </TableCell>

                           <TableCell
                              isHeader
                              className="px-5 py-3 text-start font-medium text-bee-dark-700 dark:text-gray-200"
                           >
                              Placa
                           </TableCell>
                           <TableCell
                              isHeader
                              className="px-5 py-3 text-start font-medium text-bee-dark-700 dark:text-gray-200"
                           >
                              Odometro
                           </TableCell>
                           <TableCell
                              isHeader
                              className="px-5 py-3 text-start font-medium text-bee-dark-700 dark:text-gray-200"
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
                              className="shadow-lg lg:shadow-none px-2 py-3 text-center font-medium text-bee-dark-700 dark:text-gray-200 bg-bee-dark-100 dark:bg-bee-dark-800 z-10 sticky right-0"
                           >
                              Deletar
                           </TableCell>
                        </TableRow>
                     </TableHeader>

                     {/* Table Body */}
                     <TableBody className="divide-y divide-bee-dark-300 dark:divide-bee-dark-400 bg-bee-dark-100 dark:bg-bee-dark-800">
                        {currentCar.map((carro) => (
                           <TableRow
                              key={carro.id}
                              className="dark:hover:bg-bee-alert-600 hover:bg-bee-alert-500"
                           >
                              <TableCell className="p-0">
                                 <Link
                                    href={`/cars/${carro.id}`}
                                    className="px-5 py-4 text-start flex items-center gap-3 h-full w-full hover:text-inherit"
                                 >
                                    <div className="w-12 h-12 overflow-hidden rounded-full">
                                       {carro.image ? (
                                          <Image
                                             src={carro.image}
                                             alt={`Imagem do veículo ${carro.model}`}
                                             width={100}
                                             height={100}
                                             objectFit="cover"
                                             unoptimized
                                             className="w-full h-full object-cover"
                                          />
                                       ) : (
                                          <Icon name="car" />
                                       )}
                                    </div>
                                    <div>
                                       <span className="block text-bee-dark-600 dark:text-bee-alert-500">
                                          {carro.brand} {carro.model}
                                       </span>
                                    </div>
                                 </Link>
                              </TableCell>

                              <TableCell className="p-0">
                                 <Link
                                    href={`/cars/${carro.id}`}
                                    className="px-4 py-3 text-bee-dark-600 text-start dark:text-bee-alert-500 flex items-center h-full w-full hover:text-inherit"
                                 >
                                    {carro.plate}
                                 </Link>
                              </TableCell>

                              <TableCell className="p-0">
                                 <Link
                                    href={`/cars/${carro.id}`}
                                    className="px-4 py-3 text-bee-dark-600 text-start dark:text-bee-alert-500 flex items-center h-full w-full hover:text-inherit"
                                 >
                                    {carro.odometer} km
                                 </Link>
                              </TableCell>

                              <TableCell className="p-0">
                                 <Link
                                    href={`/cars/${carro.id}`}
                                    className="px-4 py-3 text-bee-dark-600 dark:text-bee-alert-500 flex items-center h-full w-full hover:text-inherit"
                                 >
                                    <Badge
                                       size="sm"
                                       color={
                                          carro.isAvailable
                                             ? "success"
                                             : "error"
                                       }
                                    >
                                       {carro.isAvailable
                                          ? "Disponível"
                                          : "Indisponível"}
                                    </Badge>
                                 </Link>
                              </TableCell>

                              <TableCell className="shadow-lg lg:shadow-none py-3 text-center bg-bee-dark-100 dark:bg-bee-dark-800 z-10 sticky right-0">
                                 <button
                                    onClick={() => abrirModalDeletar(carro)}
                                    className="inline-flex items-center justify-center w-9 h-9 rounded-full hover:bg-bee-alert-400 dark:hover:bg-bee-dark-700 transition-colors"
                                 >
                                    <Icon
                                       strokeWidth={2}
                                       name="trash"
                                       className="size-6 text-bee-alert-300"
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
                  <div className="flex justify-end px-6 py-3 border-t border-bee-dark-300 dark:border-bee-dark-400 bg-bee-dark-100 dark:bg-bee-dark-800">
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
               tipo="veículo"
               onClose={() => setModalAberto(false)}
            />
         )}
      </div>
   );
}

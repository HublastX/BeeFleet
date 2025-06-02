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
import useDrivers from "@/hooks/useDrivers";
import Icon from "@/elements/Icon";
import Image from "next/image";
import Pagination from "./Pagination";
import TableSkeleton from "@/elements/ui/skeleton/TableSkeleton";
import DeleteConfirmation from "../ConfirmDeleteModal";

export default function UserTable({ searchTerm }) {
   const { motoristas, carregando, erro, deleteDriver } = useDrivers();
   const [ordenarPorStatus, setOrdenarPorStatus] = useState(false);
   const [ordenarPorNome, setOrdenarPorNome] = useState(false);
   const motoristasOrdenados = (() => {
      let copia = [...motoristas];

      copia.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

      if (ordenarPorStatus) {
         copia.sort((a, b) => b.isAvailable - a.isAvailable);
      }

      if (ordenarPorNome) {
         copia.sort((a, b) => a.name.localeCompare(b.name));
      }

      return copia;
   })();

   const motoristaFiltrado = motoristasOrdenados.filter((motorista) => {
      if (!searchTerm) return true;
      const termo = searchTerm.toLowerCase();
      return (
         motorista.name.toLowerCase().includes(termo) ||
         motorista.phone.toLowerCase().includes(termo) ||
         motorista.license.toLowerCase().includes(termo)
      );
   });

   const [currentPage, setCurrentPage] = useState(1);
   const itemsPerPage = 5;
   const totalPages = Math.ceil((motoristas?.length || 0) / itemsPerPage);
   const startIndex = (currentPage - 1) * itemsPerPage;
   const currentDrivers = motoristaFiltrado.slice(
      startIndex,
      startIndex + itemsPerPage
   );

   const [modalAberto, setModalAberto] = useState(false);
   const [motoristaParaDeletar, setMotoristaParaDeletar] = useState(null);

   function abrirModalDeletar(motorista) {
      setMotoristaParaDeletar(motorista);
      setModalAberto(true);
   }

   async function confirmarDelete() {
      if (motoristaParaDeletar) {
         try {
            await deleteDriver(motoristaParaDeletar.id, "Motivo da remoção");
            setModalAberto(false);
            setMotoristaParaDeletar(null);
         } catch (error) {
            console.error("Falha ao deletar:", error);
         }
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
   if (currentDrivers.length === 0 && !erro && !carregando)
      return (
         <div className="flex flex-col items-center justify-center p-12 w-full h-full bg-white dark:bg-bee-dark-800 rounded-xl border border-dashed border-bee-dark-300 dark:border-bee-dark-400">
            <Icon
               name="user"
               className="size-16 text-gray-400 dark:text-gray-500 mb-4"
            />
            <div className="text-center">
               <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                  Nenhum motorista encontrado
               </h3>
               <p className="text-gray-500 dark:text-gray-400 mt-1">
                  {searchTerm
                     ? "Tente ajustar sua busca"
                     : "Adicione um novo motorista para começar"}
               </p>
            </div>
         </div>
      );

   return (
      <div className="overflow-hidden rounded-lg border border-bee-dark-300 dark:border-bee-dark-400">
         <div className="w-full overflow-x-auto lg:overflow-hidden no-scrollbar">
            <Table className="min-w-max md:min-w-full">
               {/*  table header */}
               <TableHeader className="border-b-2 border-bee-dark-300 dark:border-bee-dark-400 bg-bee-dark-100 dark:bg-bee-dark-800">
                  <TableRow>
                     <TableCell
                        isHeader
                        className="px-5 py-3 text-start font-medium text-bee-dark-700 dark:text-gray-200"
                     >
                        <div
                           onClick={() => setOrdenarPorNome((prev) => !prev)}
                           className="cursor-pointer hover:underline w-fit"
                        >
                           Motorista
                        </div>
                     </TableCell>

                     <TableCell
                        isHeader
                        className="px-5 py-3 text-start font-medium text-bee-dark-700 dark:text-gray-200"
                     >
                        Telefone
                     </TableCell>
                     <TableCell
                        isHeader
                        className="px-5 py-3 text-start font-medium text-bee-dark-700 dark:text-gray-200"
                     >
                        CNH
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
                  {currentDrivers.map((motorista) => (
                     <TableRow
                        key={motorista.id}
                        className="hover:bg-bee-alert-500 hover:dark:bg-bee-alert-600"
                     >
                        <TableCell className="p-0">
                           <Link
                              href={`/drivers/${motorista.id}`}
                              className="px-5 py-4 text-start flex items-center gap-3 h-full w-full hover:text-inherit"
                           >
                              <div className="w-10 h-10 overflow-hidden rounded-full">
                                 {!motorista.image ? (
                                    <Icon name="UserCircle" />
                                 ) : (
                                    <Image
                                       src={motorista.image}
                                       width={200}
                                       height={200}
                                       className="w-full h-full object-cover"
                                       alt="img do motorista"
                                    />
                                 )}
                              </div>
                              <div>
                                 <span className="block text-bee-dark-600 dark:text-bee-alert-500">
                                    {motorista.name}
                                 </span>
                              </div>
                           </Link>
                        </TableCell>

                        <TableCell className="p-0">
                           <Link
                              href={`/drivers/${motorista.id}`}
                              className="px-5 py-4 text-bee-dark-600 text-start dark:text-bee-alert-500 flex items-center h-full w-full hover:text-inherit"
                           >
                              {motorista.phone}
                           </Link>
                        </TableCell>

                        <TableCell className="p-0">
                           <Link
                              href={`/drivers/${motorista.id}`}
                              className="px-5 py-3 text-bee-dark-600 text-start dark:text-bee-alert-500 flex items-center h-full w-full hover:text-inherit"
                           >
                              {motorista.license}
                           </Link>
                        </TableCell>

                        <TableCell className="p-0">
                           <Link
                              href={`/drivers/${motorista.id}`}
                              className="px-5 py-3 text-bee-dark-600 dark:text-bee-alert-500 flex items-center h-full w-full hover:text-inherit"
                           >
                              <Badge
                                 size="sm"
                                 color={
                                    motorista.isAvailable ? "success" : "error"
                                 }
                              >
                                 {motorista.isAvailable
                                    ? "Disponível"
                                    : "Indisponível"}
                              </Badge>
                           </Link>
                        </TableCell>

                        <TableCell className="shadow-lg lg:shadow-none py-3 text-center bg-bee-dark-100 dark:bg-bee-dark-800 z-10 sticky right-0 border-l border-bee-dark-300 dark:border-bee-dark-400">
                           <button
                              onClick={() => abrirModalDeletar(motorista)}
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

            {/* paginacao */}
            {!carregando && !erro && totalPages > 1 && (
               <div className="flex justify-end px-6 py-3 border-t border-bee-dark-300 dark:border-bee-dark-400 bg-bee-dark-100 dark:bg-bee-dark-800">
                  <Pagination
                     currentPage={currentPage}
                     totalPages={totalPages}
                     onPageChange={setCurrentPage}
                     totalItems={motoristas.length}
                  />
               </div>
            )}
         </div>

         {modalAberto && (
            <DeleteConfirmation
               link={confirmarDelete}
               tipo="motorista"
               onClose={() => setModalAberto(false)}
            />
         )}
      </div>
   );
}

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
                              className="px-5 py-3 text-start md:table-cell"
                           >
                              <div
                                 onClick={() =>
                                    setOrdenarPorNome((prev) => !prev)
                                 }
                                 className="cursor-pointer hover:underline w-fit"
                              >
                                 Motorista
                              </div>
                           </TableCell>

                           <TableCell
                              isHeader
                              className="px-5 py-3 text-start hidden md:table-cell"
                           >
                              Telefone
                           </TableCell>
                           <TableCell
                              isHeader
                              className="px-5 py-3 text-start hidden md:table-cell"
                           >
                              CNH
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
                              className="px-3 md:px-1 py-3 text-center"
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
                        {currentDrivers.map((motorista) => (
                           <TableRow
                              key={motorista.id}
                              className="hover:bg-bee-alert-500 hover:dark:bg-bee-alert-600"
                           >
                              <TableCell className="block md:hidden px-5 py-4 text-start">
                                 <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 overflow-hidden rounded-full">
                                       {!motorista.image ? (
                                          <Icon name="UserCircle" />
                                       ) : (
                                          <Image
                                             src={motorista.image}
                                             width={100}
                                             height={100}
                                             className="w-full h-full object-cover"
                                             alt="img do motorista"
                                          />
                                       )}
                                    </div>
                                    <div>
                                       <span
                                          className={`font-medium  ${
                                             motorista.isAvailable
                                                ? "text-green-600 dark:text-green-400"
                                                : "text-red-600 dark:text-red-400"
                                          }`}
                                       >
                                          {motorista.name}
                                       </span>
                                    </div>
                                 </div>
                              </TableCell>

                              <TableCell className="hidden md:table-cell px-5 py-4 sm:px-6 text-start">
                                 <div className="flex items-center gap-3">
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
                                       <span className="block  text-bee-dark-600 dark:text-bee-alert-500">
                                          {motorista.name}
                                       </span>
                                    </div>
                                 </div>
                              </TableCell>

                              <TableCell className="hidden md:table-cell px-4 py-3 text-bee-dark-600 text-start  dark:text-bee-alert-500">
                                 {motorista.phone}
                              </TableCell>
                              <TableCell className="hidden md:table-cell px-4 py-3 text-bee-dark-600 text-start  dark:text-bee-alert-500">
                                 {motorista.license}
                              </TableCell>

                              <TableCell className="hidden md:table-cell px-4 py-3 text-bee-dark-600 dark:text-bee-alert-500">
                                 <Badge
                                    size="sm"
                                    color={
                                       motorista.isAvailable
                                          ? "success"
                                          : "error"
                                    }
                                 >
                                    {motorista.isAvailable
                                       ? "Disponível"
                                       : "Indisponível"}
                                 </Badge>
                              </TableCell>

                              <TableCell className="py-3 text-center border-l border-bee-dark-300 dark:border-bee-dark-400">
                                 <Link
                                    href={`/drivers/${motorista.id}`}
                                    className="inline-block text-bee-yellow-500 hover:text-bee-yellow-700"
                                 >
                                    <Icon
                                       strokeWidth={2}
                                       name="eye"
                                       className="w-8 h-8 mx-auto"
                                    />
                                 </Link>
                              </TableCell>
                              <TableCell className="py-3 text-center">
                                 <button
                                    onClick={() => abrirModalDeletar(motorista)}
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
                        totalItems={motoristas.length}
                     />
                  </div>
               )}
            </div>
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

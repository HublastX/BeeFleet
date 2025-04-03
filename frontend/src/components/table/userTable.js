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
import InputText from "@/elements/inputText";
import Image from "next/image";
import Select from "@/elements/select";
import useDrivers from "@/hooks/useDrivers";

// const tableData = [
//    {
//       id: 1,
//       motorista: {
//          image: "/web-app-manifest-192x192.png",
//          name: "Lindsey Curtis",
//       },
//       telefone: "(74) 3683-3138",
//       status: "Ativo",
//    },
//    {
//       id: 2,
//       motorista: {
//          image: "/web-app-manifest-192x192.png",
//          name: "Kaiya George",
//       },
//       telefone: "(71) 2327-6526",
//       status: "Pendente",
//    },
//    {
//       id: 3,
//       motorista: {
//          image: "/web-app-manifest-192x192.png",
//          name: "Zain Geidt",
//       },
//       telefone: "(74) 3495-1215",
//       status: "Ativo",
//    },
//    {
//       id: 4,
//       motorista: {
//          image: "/web-app-manifest-192x192.png",
//          name: "Abram Schleifer",
//       },
//       telefone: "(77) 2420-8536",
//       status: "Inativo",
//    },
//    {
//       id: 5,
//       motorista: {
//          image: "/web-app-manifest-192x192.png",
//          name: "Carla George",
//       },
//       telefone: "(73) 3655-2723",
//       status: "Ativo",
//    },
// ];

export default function UserTable() {
   const { motoristas, carregando, erro } = useDrivers();

   // const [statusFilter, setStatusFilter] = useState("Todos");
   // const [searchQuery, setSearchQuery] = useState("");

   // const filteredData = tableData.filter((driver) => {
   //    const matchesStatus =
   //       statusFilter === "Todos" || driver.status === statusFilter;
   //    const matchesName = driver.motorista.name
   //       .toLowerCase()
   //       .includes(searchQuery.toLowerCase());
   //    return matchesStatus && matchesName;
   // });

   return (
      <div className="overflow-hidden rounded-xl border border-bee-dark-300 bg-white dark:border-bee-dark-400 dark:bg-bee-dark-800">
         {carregando && <p>Carregando motoristas...</p>}
         {erro && <p style={{ color: "red" }}>Erro: {erro}</p>}
         <div className="max-w-full overflow-x-auto">
            {/* <div className="p-3 flex row justify-between">
               <h1 className="font-black text-2xl">Motoristas</h1>
               <div className="w-full flex row justify-end gap-3">
                  <InputText
                     variant="withIcon"
                     icon="search"
                     strokeWidth={3}
                     placeholder="pesquisar..."
                     onChange={(e) => setSearchQuery(e.target.value)}
                  />

                  <Select
                     name="Filtro"
                     icon="filtro"
                     lista={["Todos", "Ativo", "Pendente", "Inativo"]}
                     className="ml-4"
                     onSelect={setStatusFilter}
                  />
               </div>
            </div> */}
            <div>
               <Table>
                  {/*  table header */}
                  <TableHeader className="border-b border-bee-dark-300 dark:border-bee-dark-400 text-bee-dark-600 dark:text-bee-alert-500">
                     <TableRow>
                        <TableCell
                           isHeader
                           className="px-5 py-3 text-start text-theme-xs"
                        >
                           Motorista
                        </TableCell>
                        <TableCell
                           isHeader
                           className="px-5 py-3 text-start text-theme-xs"
                        >
                           Telefone
                        </TableCell>
                        <TableCell
                           isHeader
                           className="px-5 py-3 text-start text-theme-xs"
                        >
                           Vizualizar
                        </TableCell>
                     </TableRow>
                  </TableHeader>

                  {/* Table Body */}
                  {!carregando && !erro && (
                     <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                        {motoristas.map((motorista) => (
                           <TableRow
                              key={motorista.id}
                              className="hover:bg-bee-alert-500 hover:dark:bg-bee-dark-400"
                           >
                              <TableCell className="px-5 py-4 sm:px-6 text-start">
                                 <div className="flex items-center gap-3">
                                    {/* <div className="w-10 h-10 overflow-hidden rounded-full">
                                       <Image
                                          width={40}
                                          height={40}
                                          src={motorista.name}
                                          alt={motorista.name}
                                       />
                                    </div> */}
                                    <div>
                                       <span className="block font-medium text-bee-dark-600 text-theme-sm dark:text-bee-dark-100">
                                       {motorista.name} 
                                       </span>
                                    </div>
                                 </div>
                              </TableCell>
                              <TableCell className="px-4 py-3 text-bee-dark-600 text-start font-bold dark:text-bee-dark-100">
                                 {motorista.phone}
                              </TableCell>
                              <TableCell className="px-4 py-3">
                                 <Link
                                    href="/viewDriver"
                                    className="text-bee-yellow-700 underline font-bold text-lg"
                                 >
                                    Vizualizar
                                 </Link>
                              </TableCell>
                           </TableRow>
                        ))}
                     </TableBody>
                  )}
               </Table>
            </div>
         </div>
      </div>
   );
}

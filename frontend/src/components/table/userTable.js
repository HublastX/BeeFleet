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
import Badge from "../../elements/ui/badge/Badge";
import useDrivers from "@/hooks/useDrivers";
import Icon from "@/elements/Icon";

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

   return (
      <div className="overflow-hidden rounded-xl border border-bee-dark-300 bg-white dark:border-bee-dark-400 dark:bg-bee-dark-800">
         {carregando && <p>Carregando motoristas...</p>}
         {erro && <p style={{ color: "red" }}>Erro: {erro}</p>}
         <div className="max-w-full overflow-x-auto">
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
                           className="px-5 py-3 text-start text-theme-xs hidden md:table-cell"
                        >
                           Telefone
                        </TableCell>
                        <TableCell
                           isHeader
                           className="px-5 py-3 text-start text-theme-xs hidden md:table-cell"
                        >
                           Status
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
                              <TableCell className="block md:hidden px-5 py-4 text-start">
                                 <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 overflow-hidden rounded-full">
                                       <Icon name="UserCircle" />
                                    </div>
                                    <div>
                                       <span
                                          className={`font-medium text-theme-sm ${
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
                                       <Icon name="UserCircle" />
                                    </div>
                                    <div>
                                       <span className="block font-medium text-bee-dark-600 text-theme-sm dark:text-bee-dark-100">
                                          {motorista.name}
                                       </span>
                                    </div>
                                 </div>
                              </TableCell>

                              <TableCell className="hidden md:table-cell px-4 py-3 text-bee-dark-600 text-start font-bold dark:text-bee-dark-100">
                                 {motorista.phone}
                              </TableCell>

                              <TableCell className="hidden md:table-cell px-4 py-3 text-bee-dark-600 text-start font-bold dark:text-bee-dark-100">
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
